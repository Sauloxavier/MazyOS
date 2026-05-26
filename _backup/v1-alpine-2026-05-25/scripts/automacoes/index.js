#!/usr/bin/env node
// =====================================================================
// Worker de Automações — Marco Xavier
// Lê regras configuradas no painel (tabela `automacoes`) e executa
// a cada CICLO_MS. Roda 24/7 na VM.
//
// Tipos suportados:
//   boas_vindas       — eleitor novo cadastrado X min atrás
//   fup               — atendimento parado em status Y há X dias
//   reativacao        — eleitor sem contato há X dias
//   aniversario       — eleitor faz aniversário hoje (ou em X dias)
//   resposta_keyword  — (não roda por cron, depende do atendimento-ia)
//
// Ações suportadas:
//   enviar_whatsapp   — manda pelo WAHA (respeita janela de horário)
//   criar_compromisso — agenda lembrete N dias depois
//   mudar_envolvimento — atualiza envolvimento do eleitor
// =====================================================================

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const cfg = {
  wahaUrl:     (process.env.WAHA_URL || '').replace(/\/+$/, ''),
  wahaApiKey:  process.env.WAHA_API_KEY || '',
  wahaSession: process.env.WAHA_SESSION || 'default',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_SERVICE_KEY || '',
  cicloMs:     Number(process.env.CICLO_MS || 300000), // 5min default
};

for (const k of ['wahaUrl', 'supabaseUrl', 'supabaseKey']) {
  if (!cfg[k]) { console.error(`[fatal] ${k} faltando no .env`); process.exit(1); }
}

const sb = createClient(cfg.supabaseUrl, cfg.supabaseKey, { auth: { persistSession: false } });

// ============ Helpers ============
async function wahaSendText(chatIdOrTelefone, texto) {
  const headers = { 'Content-Type': 'application/json' };
  if (cfg.wahaApiKey) headers['X-Api-Key'] = cfg.wahaApiKey;
  const tel = String(chatIdOrTelefone).replace(/\D/g, '');
  const chatId = tel.includes('@') ? tel : `${tel.startsWith('55') ? tel : '55' + tel}@c.us`;
  const res = await fetch(cfg.wahaUrl + '/api/sendText', {
    method: 'POST', headers,
    body: JSON.stringify({ session: cfg.wahaSession, chatId, text: texto }),
  });
  if (!res.ok) throw new Error(`WAHA ${res.status}: ${await res.text()}`);
  return res.json();
}

function aplicarTemplate(conteudo, eleitor, extra = {}) {
  const primeiroNome = (eleitor?.nome || '').split(' ')[0];
  return String(conteudo || '')
    .replace(/\{\{nome\}\}/g, primeiroNome)
    .replace(/\{\{nome_completo\}\}/g, eleitor?.nome || '')
    .replace(/\{\{bairro\}\}/g, eleitor?.bairro || '')
    .replace(/\{\{vereador\}\}/g, extra.vereador || 'Marco Xavier');
}

async function getTemplate(templateId) {
  if (!templateId) return null;
  const { data } = await sb.from('config').select('valor').eq('chave', 'mensagens_padrao').maybeSingle();
  return (data?.valor || []).find(t => t.id === templateId) || null;
}

function dentroDaJanela(janela) {
  if (!janela || (typeof janela.de !== 'number' && typeof janela.ate !== 'number')) return true;
  const h = new Date().getHours();
  return h >= (janela.de ?? 0) && h <= (janela.ate ?? 23);
}

async function logExecucao({ automacaoId, eleitorId, demandaId, status, detalhe }) {
  await sb.from('automacao_log').insert({
    automacao_id: automacaoId,
    eleitor_id:   eleitorId || null,
    demanda_id:   demandaId || null,
    status, detalhe,
  });
  // Atualiza contadores
  const patch = {
    ultima_execucao: new Date().toISOString(),
  };
  if (status === 'sucesso') {
    await sb.rpc('inc_automacao_exec', { p_id: automacaoId, p_falha: false }).catch(() => {});
  } else if (status === 'falha') {
    await sb.rpc('inc_automacao_exec', { p_id: automacaoId, p_falha: true }).catch(() => {});
  }
  // Fallback se a função não existir: update direto
  await sb.from('automacoes').update(patch).eq('id', automacaoId);
}

async function jaExecutouPra(automacaoId, eleitorId, janelaHoras = 24) {
  const corte = new Date(Date.now() - janelaHoras * 3600000).toISOString();
  const { data } = await sb.from('automacao_log')
    .select('id').eq('automacao_id', automacaoId).eq('eleitor_id', eleitorId)
    .gte('executado_em', corte).limit(1);
  return !!(data && data.length);
}

// ============ Executores por tipo ============
async function executarAcao(automacao, eleitor, extra = {}) {
  const acao = automacao.acao || {};
  if (acao.tipo === 'enviar_whatsapp') {
    if (!dentroDaJanela(acao.so_horario)) {
      return { status: 'pulado', detalhe: 'Fora da janela de horário' };
    }
    if (!eleitor.telefone) {
      return { status: 'pulado', detalhe: 'Eleitor sem telefone' };
    }
    let conteudo = acao.conteudo_custom || '';
    if (acao.template_id) {
      const t = await getTemplate(acao.template_id);
      if (t) conteudo = t.conteudo;
    }
    if (!conteudo.trim()) return { status: 'pulado', detalhe: 'Sem conteúdo definido' };
    const msg = aplicarTemplate(conteudo, eleitor, extra);
    await wahaSendText(eleitor.telefone, msg);
    // Marca último contato
    await sb.from('eleitores').update({ ultimo_contato: new Date().toISOString() }).eq('id', eleitor.id);
    return { status: 'sucesso', detalhe: `WhatsApp enviado pra ${eleitor.nome}` };
  }
  if (acao.tipo === 'criar_compromisso') {
    const data = new Date();
    data.setDate(data.getDate() + (acao.dias_depois || 0));
    const titulo = aplicarTemplate(acao.titulo || 'Lembrete', eleitor);
    await sb.from('compromissos').insert({
      titulo,
      data: data.toISOString().slice(0, 10),
      eleitor_id: eleitor.id,
      cor: '#6366f1',
      descricao: `Criado pela automação "${automacao.nome}"`,
    });
    return { status: 'sucesso', detalhe: `Compromisso "${titulo}" agendado` };
  }
  if (acao.tipo === 'mudar_envolvimento') {
    await sb.from('eleitores').update({ envolvimento: acao.para }).eq('id', eleitor.id);
    return { status: 'sucesso', detalhe: `Envolvimento → ${acao.para}` };
  }
  return { status: 'falha', detalhe: 'Tipo de ação desconhecido' };
}

async function rodarBoasVindas(a) {
  const espera = (a.gatilho?.esperar_minutos || 0) * 60000;
  const limite = new Date(Date.now() - espera).toISOString();
  const { data: eleitores } = await sb.from('eleitores')
    .select('*').lt('criado_em', limite).order('criado_em', { ascending: false }).limit(50);
  for (const e of (eleitores || [])) {
    if (!e.telefone) continue;
    if (await jaExecutouPra(a.id, e.id, 24 * 365)) continue; // 1x na vida
    try {
      const r = await executarAcao(a, e);
      await logExecucao({ automacaoId: a.id, eleitorId: e.id, ...r });
    } catch (err) {
      await logExecucao({ automacaoId: a.id, eleitorId: e.id, status: 'falha', detalhe: err.message });
    }
  }
}

async function rodarFup(a) {
  const dias = a.gatilho?.dias_sem_movimento || 3;
  const status = a.gatilho?.status_demanda || 'Em andamento';
  const corte = new Date(Date.now() - dias * 86400000).toISOString();
  const { data: demandas } = await sb.from('demandas')
    .select('*, eleitores(*)').eq('status', status).lt('atualizado_em', corte).limit(100);
  for (const d of (demandas || [])) {
    const eleitor = d.eleitores;
    if (!eleitor || !eleitor.telefone) continue;
    if (await jaExecutouPra(a.id, eleitor.id, dias * 24)) continue;
    try {
      const r = await executarAcao(a, eleitor);
      await logExecucao({ automacaoId: a.id, eleitorId: eleitor.id, demandaId: d.id, ...r });
    } catch (err) {
      await logExecucao({ automacaoId: a.id, eleitorId: eleitor.id, demandaId: d.id, status: 'falha', detalhe: err.message });
    }
  }
}

async function rodarReativacao(a) {
  const dias = a.gatilho?.dias_sem_contato || 30;
  const env = a.gatilho?.envolvimento;
  const corte = new Date(Date.now() - dias * 86400000).toISOString();
  let q = sb.from('eleitores').select('*').or(`ultimo_contato.is.null,ultimo_contato.lt.${corte}`).limit(100);
  if (env) q = q.eq('envolvimento', env);
  const { data: eleitores } = await q;
  for (const e of (eleitores || [])) {
    if (!e.telefone) continue;
    if (await jaExecutouPra(a.id, e.id, dias * 24)) continue;
    try {
      const r = await executarAcao(a, e);
      await logExecucao({ automacaoId: a.id, eleitorId: e.id, ...r });
    } catch (err) {
      await logExecucao({ automacaoId: a.id, eleitorId: e.id, status: 'falha', detalhe: err.message });
    }
  }
}

async function rodarAniversario(a) {
  const diasAntes = a.gatilho?.dias_antes || 0;
  const alvo = new Date();
  alvo.setDate(alvo.getDate() + diasAntes);
  const mm = String(alvo.getMonth() + 1).padStart(2, '0');
  const dd = String(alvo.getDate()).padStart(2, '0');
  // Pega todos eleitores e filtra em memória (Supabase não tem MM-DD direto)
  const { data: eleitores } = await sb.from('eleitores').select('*').not('nascimento', 'is', null).limit(1000);
  for (const e of (eleitores || [])) {
    if (!e.nascimento) continue;
    const [, m, d] = e.nascimento.split('-');
    if (m !== mm || d !== dd) continue;
    if (await jaExecutouPra(a.id, e.id, 24 * 300)) continue; // 1x por ano
    if (!e.telefone) continue;
    try {
      const r = await executarAcao(a, e);
      await logExecucao({ automacaoId: a.id, eleitorId: e.id, ...r });
    } catch (err) {
      await logExecucao({ automacaoId: a.id, eleitorId: e.id, status: 'falha', detalhe: err.message });
    }
  }
}

const EXECUTORES = {
  boas_vindas: rodarBoasVindas,
  fup:         rodarFup,
  reativacao:  rodarReativacao,
  aniversario: rodarAniversario,
  // resposta_keyword roda dentro do atendimento-ia
};

// ============ Loop principal ============
async function ciclo() {
  try {
    const { data: regras } = await sb.from('automacoes').select('*').eq('ativo', true);
    console.log(`[${new Date().toISOString()}] checando ${(regras || []).length} regra(s) ativa(s)`);
    for (const r of (regras || [])) {
      const exec = EXECUTORES[r.tipo];
      if (!exec) { console.log(`  - skip "${r.nome}": tipo ${r.tipo} não rodável aqui`); continue; }
      try {
        console.log(`  ▶ ${r.tipo}: ${r.nome}`);
        await exec(r);
      } catch (err) {
        console.error(`  ✗ ${r.nome}:`, err.message);
      }
    }
  } catch (err) {
    console.error('[ciclo]', err.message);
  }
}

console.log(`⚙️  Worker de Automações iniciado.
  Supabase: ${cfg.supabaseUrl}
  WAHA:     ${cfg.wahaUrl}
  Ciclo:    ${cfg.cicloMs}ms (${Math.round(cfg.cicloMs / 60000)} min)
`);

ciclo();
setInterval(ciclo, cfg.cicloMs);
