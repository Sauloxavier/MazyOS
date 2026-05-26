// Parser CSV simples com suporte a aspas
export function parseCSVLine(line: string, sep = ','): string[] {
  const out: string[] = []
  let cur = ''
  let inQ = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (inQ) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++ }
      else if (c === '"') inQ = false
      else cur += c
    } else {
      if (c === '"') inQ = true
      else if (c === sep) { out.push(cur); cur = '' }
      else cur += c
    }
  }
  out.push(cur)
  return out
}

export function detectarSeparador(linha: string): string {
  return linha.split(';').length > linha.split(',').length ? ';' : ','
}

// Lê arquivo como ArrayBuffer + corrige encoding win1252 → utf-8 se detectar mojibake
export async function lerCSV(file: File): Promise<{ linhas: string[]; sep: string }> {
  const buf = await file.arrayBuffer()
  let text = new TextDecoder('utf-8').decode(buf)
  if (/Ã[§£¡©­ºªµ]/.test(text) || /Â|â€/.test(text)) {
    text = new TextDecoder('windows-1252').decode(buf)
  }
  const linhas = text.replace(/^﻿/, '').split(/\r?\n/).filter(l => l.trim())
  const sep = linhas.length > 0 ? detectarSeparador(linhas[0]) : ','
  return { linhas, sep }
}

export function parseDataBr(s: string | null | undefined): string | null {
  if (!s) return null
  const t = s.trim()
  if (/^\d{4}-\d{2}-\d{2}/.test(t)) return t.slice(0, 10)
  const m = t.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/)
  if (!m) return null
  let [, d, mo, y] = m
  if (y.length === 2) y = (parseInt(y) > 30 ? '19' : '20') + y
  return `${y}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}`
}
