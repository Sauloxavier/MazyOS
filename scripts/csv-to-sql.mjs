#!/usr/bin/env node
// Converte dados/1A-tarefas-historicas.csv → 2 SQLs prontos pra Supabase
// Uso: node scripts/csv-to-sql.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CSV_PATH = join(ROOT, 'dados', '1A-tarefas-historicas.csv');
const OUT_ELEITORES = join(ROOT, 'dados', 'sql', '01-eleitores.sql');
const OUT_DEMANDAS = join(ROOT, 'dados', 'sql', '02-demandas.sql');

const text = readFileSync(CSV_PATH, 'utf8');
const linhas = text.replace(/^﻿/, '').split(/\r?\n/).filter(l => l && l.trim());
if (linhas.length < 2) { console.error('CSV vazio'); process.exit(1); }

// Parser CSV simples com suporte a aspas
function parseCSV(linha, sep = ',') {
  const out = [];
  let cur = '', inQ = false;
  for (let i = 0; i < linha.length; i++) {
    const c = linha[i];
    if (inQ) {
      if (c === '"' && linha[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') inQ = false;
      else cur += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === sep) { out.push(cur); cur = ''; }
      else cur += c;
    }
  }
  out.push(cur);
  return out;
}

// header: " ,Status,Assessoria,Data de início,Nome ,Telefone,Pedido,Observaçao,Grupo,Data Termino"
// índices fixos baseados na ordem do CSV
const IDX = {
  categoria:   0,
  status:      1,
  assessoria:  2,
  dataInicio:  3,
  nome:        4,
  telefone:    5,
  pedido:      6,
  observacao:  7,
  grupo:       8,
  dataTermino: 9,
};

const mapStatus = (s) => {
  const t = (s || '').toLowerCase().trim();
  if (t.includes('conclu')) return 'Resolvida';
  if (t.includes('andamento')) return 'Em andamento';
  if (t.includes('não iniciada') || t.includes('nao iniciada')) return 'Aberta';
  if (t.includes('pulada') || t.includes('cancel')) return 'Cancelada';
  return 'Aberta';
};

const normalizarTelefone = (s) => {
  const num = (s || '').replace(/\D/g, '');
  if (!num) return null;
  return num.startsWith('55') ? num : '55' + num;
};

const parseDataBr = (s) => {
  if (!s) return null;
  s = s.trim();
  // 11/05/2023 ou 11/05/23
  const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
  if (!m) return null;
  let [_, d, mo, y] = m;
  if (y.length === 2) y = (parseInt(y) > 30 ? '19' : '20') + y;
  const yy = parseInt(y);
  if (yy < 2000 || yy > 2030) return null;
  return `${y}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}`;
};

const sqlString = (s) => {
  if (s === null || s === undefined || s === '') return 'NULL';
  return `'${String(s).replace(/'/g, "''").trim()}'`;
};
const sqlArray = (arr) => {
  if (!arr || arr.length === 0) return "ARRAY[]::text[]";
  return `ARRAY[${arr.map(s => `'${s.replace(/'/g, "''")}'`).join(',')}]`;
};

// Parse linhas
const registros = [];
for (let i = 1; i < linhas.length; i++) {
  const cols = parseCSV(linhas[i]);
  const nome = (cols[IDX.nome] || '').trim().replace(/\s+/g, ' ');
  if (!nome) continue;
  registros.push({
    categoria:   (cols[IDX.categoria] || '').trim(),
    status:      mapStatus(cols[IDX.status]),
    assessoria:  (cols[IDX.assessoria] || '').trim(),
    dataInicio:  parseDataBr(cols[IDX.dataInicio]) || '2023-01-01',
    nome,
    telefone:    normalizarTelefone(cols[IDX.telefone]),
    pedido:      (cols[IDX.pedido] || '').trim(),
    observacao:  (cols[IDX.observacao] || '').trim(),
    grupo:       (cols[IDX.grupo] || '').trim(),
    dataTermino: parseDataBr(cols[IDX.dataTermino]),
  });
}

// Agrupa por (nome+telefone) → eleitor único
const eleitoresMap = new Map();
const demandas = [];

for (const r of registros) {
  const chave = `${r.nome.toLowerCase()}__${r.telefone || ''}`;
  let eleitor = eleitoresMap.get(chave);
  if (!eleitor) {
    eleitor = {
      id: randomUUID(),
      nome: r.nome,
      telefone: r.telefone,
      nichos: new Set(),
      envolvimento: 'Conquistado', // já foi atendido pelo gabinete
    };
    eleitoresMap.set(chave, eleitor);
  }
  if (r.grupo) eleitor.nichos.add(r.grupo);

  demandas.push({
    id: randomUUID(),
    eleitorId: eleitor.id,
    tipo: r.categoria || 'Outro',
    status: r.status,
    descricao: r.pedido || r.categoria || 'Atendimento histórico',
    data: r.dataInicio,
    notas: [r.observacao, r.assessoria ? `Assessoria: ${r.assessoria}` : ''].filter(Boolean).join('\n'),
    origem: 'Importação histórico (1A)',
  });
}

// Gera SQL de eleitores
const eleitores = [...eleitoresMap.values()];
const sqlEleitores = [
  '-- ============================================================',
  '-- ELEITORES — histórico do gabinete (1A-Tarefas)',
  `-- Total: ${eleitores.length} eleitores únicos`,
  `-- Gerado em ${new Date().toISOString()}`,
  '-- ============================================================',
  'BEGIN;',
  '',
  ...eleitores.map(e => {
    return `INSERT INTO eleitores (id, nome, telefone, envolvimento, nichos, obs) VALUES (`
      + `'${e.id}', `
      + `${sqlString(e.nome)}, `
      + `${sqlString(e.telefone)}, `
      + `${sqlString(e.envolvimento)}, `
      + `${sqlArray([...e.nichos])}, `
      + `'Importado de 1A-Tarefas em ${new Date().toISOString().slice(0,10)}'`
      + `) ON CONFLICT (id) DO NOTHING;`;
  }),
  '',
  'COMMIT;',
  '',
].join('\n');

// Gera SQL de demandas
const sqlDemandas = [
  '-- ============================================================',
  '-- DEMANDAS / ATENDIMENTOS — histórico do gabinete (1A-Tarefas)',
  `-- Total: ${demandas.length} demandas`,
  `-- ⚠ Rode 01-eleitores.sql ANTES — as demandas referenciam os IDs dos eleitores`,
  `-- Gerado em ${new Date().toISOString()}`,
  '-- ============================================================',
  'BEGIN;',
  '',
  ...demandas.map(d => {
    return `INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES (`
      + `'${d.id}', `
      + `'${d.eleitorId}', `
      + `${sqlString(d.tipo)}, `
      + `${sqlString(d.status)}, `
      + `${sqlString(d.descricao)}, `
      + `${sqlString(d.data)}, `
      + `${sqlString(d.notas)}, `
      + `${sqlString(d.origem)}`
      + `) ON CONFLICT (id) DO NOTHING;`;
  }),
  '',
  'COMMIT;',
  '',
].join('\n');

writeFileSync(OUT_ELEITORES, sqlEleitores, 'utf8');
writeFileSync(OUT_DEMANDAS, sqlDemandas, 'utf8');

console.log(`✓ Gerados:`);
console.log(`  • ${OUT_ELEITORES}`);
console.log(`    └ ${eleitores.length} eleitores`);
console.log(`  • ${OUT_DEMANDAS}`);
console.log(`    └ ${demandas.length} demandas`);
console.log('');
console.log('Próximo passo:');
console.log('  1. Abre o Supabase → SQL Editor');
console.log('  2. Cola 01-eleitores.sql → Run');
console.log('  3. Cola 02-demandas.sql → Run');
