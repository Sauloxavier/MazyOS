import { supabase } from '@/lib/supabase'

export interface Propositura {
  id: string
  tipo: string
  numero: string | null
  ano: number
  titulo: string
  descricao: string | null
  status: string
  data_protocolo: string | null
  data_aprovacao: string | null
  coautores: string | null
  link_pdf: string | null
  observacoes: string | null
  criado_em: string
}

export interface PropositulaInsert {
  id?: string
  tipo: string
  numero?: string | null
  ano: number
  titulo: string
  descricao?: string | null
  status?: string
  data_protocolo?: string | null
  data_aprovacao?: string | null
  coautores?: string | null
  link_pdf?: string | null
  observacoes?: string | null
}

export interface Emenda {
  id: string
  numero: string | null
  ano: number
  tipo: string
  titulo: string
  descricao: string | null
  area: string | null
  valor: number | null
  beneficiario: string | null
  status: string
  data_protocolo: string | null
  propositura_id: string | null
  observacoes: string | null
}

export interface EmendaInsert {
  id?: string
  numero?: string | null
  ano: number
  tipo: string
  titulo: string
  descricao?: string | null
  area?: string | null
  valor?: number | null
  beneficiario?: string | null
  status?: string
  data_protocolo?: string | null
  observacoes?: string | null
}

export async function listarProposituras(): Promise<Propositura[]> {
  const { data, error } = await (supabase.from('proposituras' as any) as any)
    .select('*')
    .order('ano', { ascending: false })
    .order('numero', { ascending: false, nullsFirst: true })
  if (error) return []
  return (data ?? []) as Propositura[]
}

export async function salvarPropositura(p: PropositulaInsert & { id?: string }): Promise<Propositura> {
  if (p.id) {
    const { data, error } = await (supabase.from('proposituras' as any) as any).update(p).eq('id', p.id).select().single()
    if (error) throw error
    return data as Propositura
  }
  const { data, error } = await (supabase.from('proposituras' as any) as any).insert(p).select().single()
  if (error) throw error
  return data as Propositura
}

export async function deletarPropositura(id: string): Promise<void> {
  const { error } = await (supabase.from('proposituras' as any) as any).delete().eq('id', id)
  if (error) throw error
}

export async function listarEmendas(): Promise<Emenda[]> {
  const { data, error } = await (supabase.from('emendas' as any) as any)
    .select('*')
    .order('ano', { ascending: false })
  if (error) return []
  return (data ?? []) as Emenda[]
}

export async function salvarEmenda(e: EmendaInsert & { id?: string }): Promise<Emenda> {
  if (e.id) {
    const { data, error } = await (supabase.from('emendas' as any) as any).update(e).eq('id', e.id).select().single()
    if (error) throw error
    return data as Emenda
  }
  const { data, error } = await (supabase.from('emendas' as any) as any).insert(e).select().single()
  if (error) throw error
  return data as Emenda
}

export async function deletarEmenda(id: string): Promise<void> {
  const { error } = await (supabase.from('emendas' as any) as any).delete().eq('id', id)
  if (error) throw error
}
