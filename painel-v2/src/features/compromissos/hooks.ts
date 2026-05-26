import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listarCompromissos, salvarCompromisso, deletarCompromisso, type Compromisso, type CompromissoInsert } from './api'

const KEY = ['compromissos'] as const

export function useCompromissos() {
  return useQuery<Compromisso[]>({ queryKey: KEY, queryFn: listarCompromissos, staleTime: 60_000 })
}
export function useSalvarCompromisso() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (c: CompromissoInsert & { id?: string }) => salvarCompromisso(c),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}
export function useDeletarCompromisso() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deletarCompromisso,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}
