import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { BarChart3, MapPin, Building2 } from 'lucide-react'
import { useEleitores } from '@/features/eleitores/hooks'
import { useDemandas } from '@/features/demandas/hooks'

export const Route = createFileRoute('/_authed/painel-geral')({
  component: PainelGeralPage,
})

function PainelGeralPage() {
  const { data: eleitores } = useEleitores()
  const { data: demandas } = useDemandas()

  const counts = useMemo(() => {
    const total = eleitores?.length ?? 0
    const totalDemandas = demandas?.length ?? 0
    const abertas = (demandas ?? []).filter(d => d.status === 'Aberta' || d.status === 'Em andamento').length
    const trintaDias = Date.now() - 30 * 24 * 3600 * 1000
    const resolvidasMes = (demandas ?? []).filter(d =>
      d.status === 'Resolvida' && new Date(d.data || 0).getTime() >= trintaDias
    ).length
    return { total, totalDemandas, abertas, resolvidasMes }
  }, [eleitores, demandas])

  const porBairro = useMemo(() => {
    const map = new Map<string, number>()
    for (const d of demandas ?? []) {
      const eleitor = eleitores?.find(e => e.id === d.eleitor_id)
      const bairro = eleitor?.bairro ?? 'Sem bairro'
      map.set(bairro, (map.get(bairro) ?? 0) + 1)
    }
    return [...map.entries()]
      .map(([key, total]) => ({ key, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10)
  }, [eleitores, demandas])

  const porOrgao = useMemo(() => {
    const map = new Map<string, number>()
    for (const d of demandas ?? []) {
      const o = d.orgao_responsavel ?? 'Não definido'
      map.set(o, (map.get(o) ?? 0) + 1)
    }
    return [...map.entries()]
      .map(([key, total]) => ({ key, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10)
  }, [demandas])

  const maxBairro = Math.max(...porBairro.map(r => r.total), 1)
  const maxOrgao = Math.max(...porOrgao.map(r => r.total), 1)

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <BarChart3 className="w-8 h-8 text-marco-azul" /> Painel Geral
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Stat label="Contatos totais" valor={counts.total} cor="text-marco-azul" />
        <Stat label="Atendimentos totais" valor={counts.totalDemandas} cor="text-marco-azul" />
        <Stat label="Abertos / em andamento" valor={counts.abertas} cor="text-amber-600" />
        <Stat label="Resolvidos (30d)" valor={counts.resolvidasMes} cor="text-emerald-600" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <BarChart titulo="Atendimentos por bairro" icon={MapPin} rows={porBairro} max={maxBairro} cor="bg-marco-azul" />
        <BarChart titulo="Atendimentos por órgão" icon={Building2} rows={porOrgao} max={maxOrgao} cor="bg-marco-amarelo" />
      </div>
    </div>
  )
}

function Stat({ label, valor, cor }: { label: string; valor: number; cor: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 ring-soft">
      <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{label}</div>
      <div className={`text-3xl font-black mt-1 ${cor}`}>{valor}</div>
    </div>
  )
}

function BarChart({
  titulo, icon: Icon, rows, max, cor,
}: {
  titulo: string
  icon: typeof MapPin
  rows: Array<{ key: string; total: number }>
  max: number
  cor: string
}) {
  return (
    <div className="bg-white rounded-2xl ring-soft p-4 sm:p-6">
      <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
        <Icon className="w-4 h-4" /> {titulo}
      </h2>
      <div className="space-y-2">
        {rows.length === 0 ? (
          <div className="text-sm text-slate-400 py-4 text-center">Sem dados</div>
        ) : (
          rows.map(row => (
            <div key={row.key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="truncate pr-2">{row.key}</span>
                <span className="text-slate-500 font-bold flex-shrink-0">{row.total}</span>
              </div>
              <div className="bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className={`${cor} h-full`} style={{ width: `${(row.total / max) * 100}%` }} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
