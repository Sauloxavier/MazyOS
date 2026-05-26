import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listarDemandas, salvarDemanda, moverDemandaStatus, deletarDemanda } from './api'
import type { Demanda, DemandaInsert } from '@/lib/database.types'

const KEY = ['demandas'] as const

export function useDemandas() {
  return useQuery<Demanda[]>({
    queryKey: KEY,
    queryFn: listarDemandas,
    staleTime: 60_000,
  })
}

export function useSalvarDemanda() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (d: DemandaInsert & { id?: string }) => salvarDemanda(d),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}

export function useMoverDemanda() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => moverDemandaStatus(id, status),
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: KEY })
      const previous = qc.getQueryData<Demanda[]>(KEY)
      if (previous) {
        qc.setQueryData<Demanda[]>(KEY, previous.map(d => d.id === id ? { ...d, status } : d))
      }
      return { previous }
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) qc.setQueryData(KEY, context.previous)
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}

export function useDeletarDemanda() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deletarDemanda,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}
