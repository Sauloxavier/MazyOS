#!/usr/bin/env node
// =====================================================================
// Notícias de Limeira — coletor de pautas
// Busca em Google News RSS + sites locais e salva em JSON.
// Útil pra alimentar o gabinete com pautas do dia e respaldar posts
// do mandato.
//
// Uso:
//   node index.js                      # busca padrão (Limeira-SP)
//   node index.js "Câmara Limeira"     # busca custom
//   node index.js --topico saude       # tópico pré-definido (saude/educacao/seguranca/obras/cultura)
//   node index.js --salvar             # salva resultado em arquivo + Supabase
//   node index.js --dias 3             # só notícias dos últimos N dias
//
// Saída: notícias-YYYY-MM-DD.json no diretório atual
// =====================================================================

const fs = require('fs');
const path = require('path');

// Tópicos pré-configurados — cada um é uma query
const TOPICOS = {
  geral:     'Limeira SP',
  saude:     'Limeira SP (saúde OR UBS OR hospital OR posto)',
  educacao:  'Limeira SP (educação OR escola OR creche)',
  seguranca: 'Limeira SP (segurança OR polícia OR violência OR roubo)',
  obras:     'Limeira SP (obras OR asfalto OR buraco OR iluminação)',
  cultura:   'Limeira SP (cultura OR turismo OR esporte)',
  camara:    '"Câmara Municipal" Limeira SP',
  prefeitura:'"Prefeitura de Limeira"',
};

function parseArgs() {
  const out = { query: null, topico: null, salvar: false, dias: 7 };
  const args = process.argv.slice(2);
  let restante = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--topico') { out.topico = args[++i]; }
    else if (a === '--salvar') { out.salvar = true; }
    else if (a === '--dias') { out.dias = Number(args[++i]) || 7; }
    else { restante.push(a); }
  }
  if (restante.length) out.query = restante.join(' ');
  if (!out.query && out.topico && TOPICOS[out.topico]) out.query = TOPICOS[out.topico];
  if (!out.query) out.query = TOPICOS.geral;
  return out;
}

// ============ Google News RSS ============
async function buscarGoogleNews(query) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}+when:14d&hl=pt-BR&gl=BR&ceid=BR:pt-419`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MazyOSNoticias/1.0)' },
  });
  if (!res.ok) throw new Error(`Google News ${res.status}`);
  const xml = await res.text();
  return parseRSS(xml, 'google_news');
}

// Parser de RSS bem simples (sem dependência externa)
function parseRSS(xml, fonte) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const fieldRegex = (tag) => new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i');
  let m;
  while ((m = itemRegex.exec(xml)) !== null) {
    const bloco = m[1];
    const get = (tag) => {
      const f = bloco.match(fieldRegex(tag));
      if (!f) return '';
      let v = f[1].trim();
      // Remove CDATA
      v = v.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();
      return v;
    };
    items.push({
      titulo: get('title'),
      link: get('link'),
      fonte: get('source') || fonte,
      publicadoEm: get('pubDate'),
      descricao: get('description').replace(/<[^>]+>/g, '').slice(0, 300),
    });
  }
  return items;
}

function filtrarPorDias(itens, dias) {
  if (!dias || dias <= 0) return itens;
  const corte = Date.now() - dias * 86400000;
  return itens.filter(i => {
    const d = new Date(i.publicadoEm || 0).getTime();
    return d && d >= corte;
  });
}

function deduplicar(itens) {
  const seen = new Set();
  return itens.filter(i => {
    const key = i.titulo.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 50);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function salvarSupabase(itens, query) {
  // Opcional: salva em uma tabela 'noticias' (criar a migration se quiser)
  // Pra não criar tabela nova, salva como item de config (jsonb) com a query como chave
  try {
    require('dotenv').config();
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
      console.log('[supabase] sem credenciais — pulando salvamento remoto');
      return;
    }
    const { createClient } = require('@supabase/supabase-js');
    const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, { auth: { persistSession: false } });
    const chave = 'noticias_' + query.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 40);
    await sb.from('config').upsert({
      chave,
      valor: {
        atualizadoEm: new Date().toISOString(),
        query,
        total: itens.length,
        itens: itens.slice(0, 30),
      },
    }, { onConflict: 'chave' });
    console.log(`[supabase] salvo em config['${chave}']`);
  } catch (err) {
    console.warn('[supabase] não salvou:', err.message);
  }
}

async function main() {
  const args = parseArgs();
  console.log(`📰 Buscando: "${args.query}" (últimos ${args.dias} dias)`);

  let itens = [];
  try {
    itens = await buscarGoogleNews(args.query);
    console.log(`  ✓ Google News: ${itens.length} resultado(s)`);
  } catch (err) {
    console.error('  ✗ Google News falhou:', err.message);
  }

  itens = filtrarPorDias(itens, args.dias);
  itens = deduplicar(itens);
  itens.sort((a, b) => new Date(b.publicadoEm).getTime() - new Date(a.publicadoEm).getTime());

  console.log(`\n📋 ${itens.length} notícia(s) relevante(s):\n`);
  itens.slice(0, 15).forEach((i, idx) => {
    const data = i.publicadoEm ? new Date(i.publicadoEm).toLocaleDateString('pt-BR') : '?';
    console.log(`  ${idx + 1}. [${data}] ${i.titulo}`);
    console.log(`     ${i.fonte}`);
    console.log(`     ${i.link}\n`);
  });

  if (args.salvar) {
    const out = {
      query: args.query,
      topico: args.topico,
      buscadoEm: new Date().toISOString(),
      total: itens.length,
      itens,
    };
    const arquivo = `noticias-limeira-${new Date().toISOString().slice(0, 10)}${args.topico ? '-' + args.topico : ''}.json`;
    const caminho = path.join(process.cwd(), arquivo);
    fs.writeFileSync(caminho, JSON.stringify(out, null, 2));
    console.log(`💾 Salvo em ${caminho}`);
    await salvarSupabase(itens, args.query);
  }

  // Exporta como função pra ser usada por outros scripts
  return itens;
}

// Função reutilizável
async function buscarNoticias(query, opts = {}) {
  const itens = await buscarGoogleNews(query);
  const filtrados = filtrarPorDias(itens, opts.dias || 7);
  return deduplicar(filtrados).sort((a, b) => new Date(b.publicadoEm).getTime() - new Date(a.publicadoEm).getTime());
}

if (require.main === module) {
  main().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { buscarNoticias, buscarGoogleNews, TOPICOS };
