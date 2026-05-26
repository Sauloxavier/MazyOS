import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { TrendingUp, Target, Calendar } from 'lucide-react'
import { useEleitores } from '@/features/eleitores/hooks'
import { useConfig } from '@/features/config/hooks'

export const Route = createFileRoute('/_authed/envolvimento')({
  component: EnvolvimentoPage,
})

const STATUS_ENV = [
  { id: 'Não trabalhado', cor: '#3B82F6', bg: 'bg-blue-500' },
  { id: 'Em prospecção', cor: '#10B981', bg: 'bg-emerald-500' },
  { id: 'Conquistado', cor: '#A855F7', bg: 'bg-purple-500' },
  { id: 'Perdido', cor: '#F43F5E', bg: 'bg-rose-500' },
] as const

function EnvolvimentoPage() {
  const { data: eleitores } = useEleitores()
  const { data: config } = useConfig()

  const total = eleitores?.length ?? 0
  const pipeline = useMemo(() => {
    if (!eleitores) return []
    return STATUS_ENV.map(s => {
      const count = eleitores.filter(e => (e.envolvimento ?? 'Não trabalhado') === s.id).length
      return { ...s, count, pct: total > 0 ? (count / total) * 100 : 0 }
    })
  }, [eleitores, total])

  const conquistados = pipeline.find(p => p.id === 'Conquistado')?.count ?? 0
  const metaConquistados = Math.max(1, Math.round(total * 0.3))
  const pctMeta = Math.min(100, (conquistados / metaConquistados) * 100)

  const diasEleicao = useMemo(() => {
    if (!config?.proxima_eleicao) return null
    const alvo = new Date(config.proxima_eleicao)
    const dias = Math.round((alvo.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return dias
  }, [config])

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <TrendingUp className="w-8 h-8 text-marco-azul" /> Envolvimento
      </h1>

      {/* Countdown */}
      {diasEleicao !== null && (
        <div className="bg-white rounded-2xl ring-soft p-6 sm:p-8 mb-6 flex flex-col lg:flex-row items-center gap-6">
          <div className="flex-1 text-center lg:text-left">
            <div className="text-slate-500 text-lg">
              Próximas <span className="bg-marco-azul/10 text-marco-azul font-bold px-3 py-0.5 rounded-full">eleições</span> em
            </div>
            <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-marco-azul mt-2">{diasEleicao}</div>
            <div className="text-xl font-bold text-slate-500 -mt-2">DIAS</div>
          </div>
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-marco-azul to-marco-azul-esc flex items-center justify-center text-white">
            <Calendar className="w-16 h-16" />
          </div>
        </div>
      )}

      {/* Meta de conquistados + pipeline */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-2xl ring-soft p-6 flex flex-col items-center">
          <div className="text-sm font-bold text-slate-500 mb-2 flex items-center gap-1">
            <Target className="w-4 h-4" /> Meta de conquistados (30%)
          </div>
          <div className="relative w-40 h-40">
            <svg className="w-40 h-40 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="#F1F5F9" strokeWidth="10" fill="none" />
              <circle
                cx="50" cy="50" r="42"
                stroke="#1E5BBA" strokeWidth="10" fill="none"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * pctMeta / 100)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-black text-marco-azul">{pctMeta.toFixed(1)}%</div>
              <div className="text-xs text-slate-500">Concluído</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="text-2xl font-black text-slate-800">
              {conquistados} <span className="text-slate-400 text-base">/ {metaConquistados}</span>
            </div>
            <div className="text-xs text-slate-500">eleitores conquistados</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl ring-soft p-6 lg:col-span-2">
          <h3 className="font-bold text-slate-700 mb-5">Pipeline detalhado</h3>
          <div className="space-y-4">
            {pipeline.map(row => (
              <div key={row.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: row.cor }} />
                    <span className="font-medium text-slate-700">{row.id}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-bold text-slate-800">{row.count}</span>
                    <span className="text-slate-400"> ({row.pct.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.cor }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-marco-azul/5 border border-marco-azul/20 rounded-2xl p-5 text-sm text-slate-700">
        💡 <strong>Como mover eleitores no pipeline:</strong> abre a ficha do eleitor em <a href="/eleitores" className="underline font-semibold">Eleitores</a> e muda o campo "Envolvimento".
        <strong> Conquistado</strong> = já votou em Marco ou se comprometeu publicamente.
        <strong> Em prospecção</strong> = está sendo trabalhado.
        <strong> Perdido</strong> = se posicionou contra.
      </div>
    </div>
  )
}
