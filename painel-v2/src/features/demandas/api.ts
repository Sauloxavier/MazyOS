import { supabase } from '@/lib/supabase'
import type { Demanda, DemandaInsert } from '@/lib/database.types'

export async function listarDemandas(): Promise<Demanda[]> {
  const { data, error } = await supabase
    .from('demandas')
    .select('*')
    .order('data', { ascending: false })
  if (error) throw error
  return (data ?? []) as Demanda[]
}

export async function salvarDemanda(d: DemandaInsert & { id?: string }): Promise<Demanda> {
  if (d.id) {
    const { data, error } = await (supabase.from('demandas') as any).update(d).eq('id', d.id).select().single()
    if (error) throw error
    return data as Demanda
  }
  const { data, error } = await (supabase.from('demandas') as any).insert(d).select().single()
  if (error) throw error
  return data as Demanda
}

export async function moverDemandaStatus(id: string, status: string): Promise<void> {
  const { error } = await (supabase.from('demandas') as any).update({ status }).eq('id', id)
  if (error) throw error
}

export async function deletarDemanda(id: string): Promise<void> {
  const { error } = await supabase.from('demandas').delete().eq('id', id)
  if (error) throw error
}
