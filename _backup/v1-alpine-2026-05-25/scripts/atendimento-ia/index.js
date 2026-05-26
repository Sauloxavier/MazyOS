#!/usr/bin/env node
// =====================================================================
// Atendimento por IA — Marco Xavier
// Faz polling no WAHA pra pegar mensagens novas, classifica com ChatGPT
// (OpenAI) e responde automaticamente quando o flag 'atendimento_ia_ativo'
// está ligado no Supabase. Cria/atualiza eleitor e atendimento no painel.
// =====================================================================
//
// Rodar:
//   cp .env.example .env  # preencha as variáveis
//   npm install
//   node index.js
//
// Produção (24/7):
//   pm2 start index.js --name atendimento-ia
//   pm2 save
// =====================================================================

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const cfg = {
  wahaUrl:        (process.env.WAHA_URL || '').replace(/\/+$/, ''),
  wahaApiKey:     process.env.WAHA_API_KEY || '',
  wahaSession:    process.env.WAHA_SESSION || 'default',
  supabaseUrl:    process.env.SUPABASE_URL || '',
  supabaseKey:    process.env.SUPABASE_SERVICE_KEY || '',
  openaiApiKey:   process.env.OPENAI_API_KEY || '',
  openaiModel:    process.env.OPENAI_MODEL || 'gpt-4o-mini',
  pollIntervalMs: Number(process.env.POLL_INTERVAL_MS || 15000),
  maxRespostasPorChat: Number(process.env.MAX_RESPOSTAS_POR_CHAT || 5),
};

const required = ['wahaUrl', 'supabaseUrl', 'supabaseKey', 'openaiApiKey'];
for (const k of required) {
  if (!cfg[k]) { console.error(`[fatal] ${k} faltando no .env`); process.exit(1); }
}

const sb = createClient(cfg.supabaseUrl, cfg.supabaseKey, { auth: { persistSession: false } });
const respostasPorChat = new Map(); // anti-loop in-memory

// ============ WAHA helpers ============
async function wahaFetch(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  if (cfg.wahaApiKey) headers['X-Api-Key'] = cfg.wahaApiKey;
  const res = await fetch(cfg.wahaUrl + path, { ...opts, headers });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`WAHA ${res.status} em ${path}: ${txt.slice(0, 200)}`);
  }
  return res.json();
}
async function listarChats() {
  return wahaFetch(`/api/${cfg.wahaSession}/chats?limit=30`);
}
async function listarMensagens(chatId, limit = 10) {
  return wahaFetch(`/api/${cfg.wahaSession}/chats/${encodeURIComponent(chatId)}/messages?limit=${limit}`);
}
async function enviarTexto(chatId, texto) {
  return wahaFetch('/api/sendText', {
    method: 'POST',
    body: JSON.stringify({ session: cfg.wahaSession, chatId, text: texto }),
  });
}

// ============ Supabase helpers ============
async function getFlagAtivo() {
  const { data } = await sb.from('config').select('valor').eq('chave', 'atendimento_ia_ativo').maybeSingle();
  return !!(data?.valor);
}
async function getPrompt() {
  const { data } = await sb.from('config').select('valor').eq('chave', 'atendimento_ia_prompt').maybeSingle();
  return (data?.valor || 'Você é um assistente do gabinete do vereador.');
}
async function getModelo() {
  const { data } = await sb.from('config').select('valor').eq('chave', 'openai_model').maybeSingle();
  return (data?.valor || cfg.openaiModel);
}
async function atualizarStatus({ ativo, msgsRespondidas }) {
  await sb.from('config').upsert({
    chave: 'atendimento_ia_status',
    valor: {
      ativo,
      ultimaAtividade: new Date().toISOString(),
      msgsRespondidas,
    },
  }, { onConflict: 'chave' });
}
async function acharOuCriarEleitor({ nome, telefone }) {
  const telLimpo = (telefone || '').replace(/\D/g, '');
  if (!telLimpo) return null;
  const { data: existente } = await sb.from('eleitores').select('*').ilike('telefone', `%${telLimpo.slice(-8)}%`).limit(1).maybeSingle();
  if (existente) return existente;
  const { data: novo } = await sb.from('eleitores').insert({
    nome: nome || `Contato ${telLimpo.slice(-4)}`,
    telefone: telefone,
    cidade: 'Limeira',
    uf: 'SP',
    envolvimento: 'Em prospecção',
    obs: 'Criado automaticamente pelo atendimento IA',
  }).select().single();
  return novo;
}
async function registrarConversaIA({ eleitorId, chatId, mensagemRecebida, respostaIA }) {
  // Cria/atualiza demanda do tipo "Atendimento IA"
  const { data: existente } = await sb.from('demandas')
    .select('*').eq('chat_id', chatId).order('criado_em', { ascending: false }).limit(1).maybeSingle();
  const linhaLog = `[${new Date().toISOString()}]\n👤 Eleitor: ${mensagemRecebida}\n🤖 IA: ${respostaIA}\n`;
  if (existente) {
    await sb.from('demandas').update({
      notas: ((existente.notas || '') + '\n\n' + linhaLog).slice(0, 50000),
      status: existente.status === 'Resolvida' ? 'Em andamento' : existente.status,
    }).eq('id', existente.id);
    return existente.id;
  } else {
    const { data } = await sb.from('demandas').insert({
      eleitor_id: eleitorId,
      tipo: 'Outro',
      status: 'Em andamento',
      origem: 'WhatsApp',
      classificacao: 'Atendimento',
      descricao: mensagemRecebida.slice(0, 500),
      notas: 'Atendimento iniciado pela IA\n\n' + linhaLog,
      chat_id: chatId,
    }).select().single();
    return data?.id;
  }
}

// ============ OpenAI API ============
async function chamarOpenAI({ system, mensagens, modelo }) {
  const messages = system ? [{ role: 'system', content: system }, ...mensagens] : mensagens;
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cfg.openaiApiKey}`,
    },
    body: JSON.stringify({
      model: modelo,
      max_tokens: 800,
      messages,
    }),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`OpenAI ${res.status}: ${txt.slice(0, 300)}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

// ============ Lógica principal ============
let msgsRespondidasTotal = 0;
const ultimoMsgPorChat = new Map();

function isFromContact(msg) {
  // msg.fromMe === false e msg.from não é status@broadcast
  return msg && msg.fromMe === false && msg.from && !String(msg.from).includes('status@');
}
function escolherSystemPrompt(promptBase, eleitor) {
  let p = promptBase;
  if (eleitor?.nome) p += `\n\nNome do eleitor: ${eleitor.nome}.`;
  if (eleitor?.bairro) p += `\nBairro: ${eleitor.bairro}.`;
  p += `\n\nIMPORTANTE: Se a pessoa apresentar uma demanda concreta (problema no bairro, pedido de ajuda, denúncia), responda de forma acolhedora MAS NÃO PROMETA NADA — diga que a equipe vai analisar e retornar. Responda em no máximo 4 linhas. Não use markdown.`;
  return p;
}

async function ciclo() {
  try {
    const ativo = await getFlagAtivo();
    if (!ativo) {
      await atualizarStatus({ ativo: false, msgsRespondidas: msgsRespondidasTotal });
      return;
    }
    const promptBase = await getPrompt();
    const modelo = await getModelo();

    const chats = await listarChats();
    for (const chat of chats) {
      if (chat.id?.includes('status@') || chat.id?.includes('@g.us')) continue; // ignora grupos e status
      try {
        const msgs = await listarMensagens(chat.id, 5);
        const naoLidas = msgs.filter(isFromContact).reverse(); // mais antiga primeiro
        if (!naoLidas.length) continue;
        const ultima = naoLidas[naoLidas.length - 1];
        const ultimaConhecida = ultimoMsgPorChat.get(chat.id);
        if (ultimaConhecida === ultima.id?._serialized || ultimaConhecida === ultima.id) continue;
        ultimoMsgPorChat.set(chat.id, ultima.id?._serialized || ultima.id);

        // Anti-loop: no máximo N respostas por chat por sessão do script
        const n = respostasPorChat.get(chat.id) || 0;
        if (n >= cfg.maxRespostasPorChat) {
          console.log(`[skip] chat ${chat.id} já atingiu limite (${n})`);
          continue;
        }

        const telefone = chat.id.replace('@c.us', '');
        const eleitor = await acharOuCriarEleitor({
          nome: chat.name || ultima.notifyName || '',
          telefone,
        });

        const system = escolherSystemPrompt(promptBase, eleitor);
        const historicoFormatado = naoLidas.map(m => ({
          role: 'user',
          content: m.body || '[mídia]',
        }));
        if (!historicoFormatado.length) continue;

        const resposta = await chamarOpenAI({ system, mensagens: historicoFormatado, modelo });
        if (!resposta) continue;

        await enviarTexto(chat.id, resposta);
        respostasPorChat.set(chat.id, n + 1);
        msgsRespondidasTotal++;
        await registrarConversaIA({
          eleitorId: eleitor?.id,
          chatId: chat.id,
          mensagemRecebida: ultima.body || '[mídia]',
          respostaIA: resposta,
        });
        console.log(`[ok] ${chat.name || telefone}: respondido (${resposta.length} chars)`);
      } catch (err) {
        console.warn(`[chat ${chat.id}] erro:`, err.message);
      }
    }

    await atualizarStatus({ ativo: true, msgsRespondidas: msgsRespondidasTotal });
  } catch (err) {
    console.error('[ciclo] erro:', err.message);
  }
}

console.log(`🤖 Atendimento IA iniciado.
  WAHA:      ${cfg.wahaUrl} (sessão ${cfg.wahaSession})
  Supabase:  ${cfg.supabaseUrl}
  Modelo:    ${cfg.openaiModel}
  Intervalo: ${cfg.pollIntervalMs}ms
  Limite:    ${cfg.maxRespostasPorChat} respostas/chat por sessão
`);

ciclo();
setInterval(ciclo, cfg.pollIntervalMs);
