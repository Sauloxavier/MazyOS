import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listarEleitores, salvarEleitor, deletarEleitor } from './api'
import type { Eleitor, EleitorInsert } from '@/lib/database.types'

const KEY = ['eleitores'] as const

export function useEleitores() {
  return useQuery<Eleitor[]>({
    queryKey: KEY,
    queryFn: listarEleitores,
    staleTime: 60_000,
  })
}

export function useSalvarEleitor() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (e: EleitorInsert & { id?: string }) => salvarEleitor(e),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}

export function useDeletarEleitor() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deletarEleitor,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}
