import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { lerConfig, salvarConfigBatch, type AppConfig } from './api'

const KEY = ['config'] as const

export function useConfig() {
  return useQuery<AppConfig>({
    queryKey: KEY,
    queryFn: lerConfig,
    staleTime: 5 * 60_000,
  })
}

export function useSalvarConfig() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (updates: Partial<AppConfig>) => salvarConfigBatch(updates),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}
