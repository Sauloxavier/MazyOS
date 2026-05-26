import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  listarProposituras, salvarPropositura, deletarPropositura,
  listarEmendas, salvarEmenda, deletarEmenda,
  type Propositura, type Emenda, type PropositulaInsert, type EmendaInsert,
} from './api'

const KEY_P = ['proposituras'] as const
const KEY_E = ['emendas'] as const

export function useProposituras() {
  return useQuery<Propositura[]>({ queryKey: KEY_P, queryFn: listarProposituras, staleTime: 60_000 })
}
export function useSalvarPropositura() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (p: PropositulaInsert & { id?: string }) => salvarPropositura(p),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY_P }),
  })
}
export function useDeletarPropositura() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deletarPropositura,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY_P }),
  })
}

export function useEmendas() {
  return useQuery<Emenda[]>({ queryKey: KEY_E, queryFn: listarEmendas, staleTime: 60_000 })
}
export function useSalvarEmenda() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (e: EmendaInsert & { id?: string }) => salvarEmenda(e),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY_E }),
  })
}
export function useDeletarEmenda() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deletarEmenda,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY_E }),
  })
}
