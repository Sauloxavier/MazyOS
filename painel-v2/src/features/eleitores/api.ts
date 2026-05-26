import { supabase } from '@/lib/supabase'
import type { Eleitor, EleitorInsert } from '@/lib/database.types'

export async function listarEleitores(): Promise<Eleitor[]> {
  const { data, error } = await supabase
    .from('eleitores')
    .select('*')
    .order('nome', { ascending: true })
  if (error) throw error
  return (data ?? []) as Eleitor[]
}

export async function buscarEleitor(id: string): Promise<Eleitor | null> {
  const { data, error } = await supabase.from('eleitores').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data as Eleitor | null
}

export async function salvarEleitor(e: EleitorInsert & { id?: string }): Promise<Eleitor> {
  if (e.id) {
    const { data, error } = await (supabase.from('eleitores') as any).update(e).eq('id', e.id).select().single()
    if (error) throw error
    return data as Eleitor
  }
  const { data, error } = await (supabase.from('eleitores') as any).insert(e).select().single()
  if (error) throw error
  return data as Eleitor
}

export async function deletarEleitor(id: string): Promise<void> {
  const { error } = await supabase.from('eleitores').delete().eq('id', id)
  if (error) throw error
}
