import { supabase } from '@/lib/supabase'

export interface Compromisso {
  id: string
  titulo: string
  data: string
  hora: string | null
  local: string | null
  descricao: string | null
  cor: string
  eleitor_id: string | null
  criado_em: string
}

export interface CompromissoInsert {
  id?: string
  titulo: string
  data: string
  hora?: string | null
  local?: string | null
  descricao?: string | null
  cor?: string
  eleitor_id?: string | null
}

export async function listarCompromissos(): Promise<Compromisso[]> {
  const { data, error } = await (supabase.from('compromissos' as any) as any)
    .select('*')
    .order('data', { ascending: true })
  if (error) return []
  return (data ?? []) as Compromisso[]
}

export async function salvarCompromisso(c: CompromissoInsert & { id?: string }): Promise<Compromisso> {
  if (c.id) {
    const { data, error } = await (supabase.from('compromissos' as any) as any).update(c).eq('id', c.id).select().single()
    if (error) throw error
    return data as Compromisso
  }
  const { data, error } = await (supabase.from('compromissos' as any) as any).insert(c).select().single()
  if (error) throw error
  return data as Compromisso
}

export async function deletarCompromisso(id: string): Promise<void> {
  const { error } = await (supabase.from('compromissos' as any) as any).delete().eq('id', id)
  if (error) throw error
}
