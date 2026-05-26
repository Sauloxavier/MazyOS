import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function iniciais(nome: string | null | undefined): string {
  const partes = (nome ?? '').trim().split(/\s+/)
  return ((partes[0]?.[0] ?? '') + (partes[partes.length - 1]?.[0] ?? '')).toUpperCase() || '?'
}

export function chatIdDe(telefone: string | null | undefined): string | null {
  const num = (telefone ?? '').replace(/\D/g, '')
  if (!num) return null
  const numero = num.startsWith('55') ? num : '55' + num
  return numero + '@c.us'
}

export function formatTelefone(telefone: string | null | undefined): string {
  const num = (telefone ?? '').replace(/\D/g, '')
  if (!num) return ''
  // 5519999998888 -> +55 (19) 99999-8888
  if (num.length === 13 && num.startsWith('55')) {
    return `+55 (${num.slice(2, 4)}) ${num.slice(4, 9)}-${num.slice(9)}`
  }
  if (num.length === 11) {
    return `(${num.slice(0, 2)}) ${num.slice(2, 7)}-${num.slice(7)}`
  }
  return num
}
