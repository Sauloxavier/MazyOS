import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { BrainCircuit, Sparkles, Loader2 } from 'lucide-react'
import { useEleitores } from '@/features/eleitores/hooks'
import { useDemandas } from '@/features/demandas/hooks'
import { useConfig } from '@/features/config/hooks'
import { N8nClient } from '@/lib/n8n'

export const Route = createFileRoute('/_authed/pro/analise')({
  component: AnalisePage,
})

function AnalisePage() {
  const { data: eleitores } = useEleitores()
  const { data: demandas } = useDemandas()
  const { data: config } = useConfig()
  const [analise, setAnalise] = useState<string | null>(null)
  const [gerando, setGerando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  async function gerar() {
    if (!config) return
    setGerando(true)
    setErro(null)
    setAnalise(null)

    // Calcula métricas do mandato
    const totalEleitores = eleitores?.length ?? 0
    const conquistados = (eleitores ?? []).filter(e => e.envolvimento === 'Conquistado').length
    const demandasAbertas = (demandas ?? []).filter(d => d.status === 'Aberta' || d.status === 'Em andamento').length
    const demandasResolvidas = (demandas ?? []).filter(d => d.status === 'Resolvida').length

    const bairros = new Map<string, number>()
    for (const d of demandas ?? []) {
      const eleitor = eleitores?.find(e => e.id === d.eleitor_id)
      const b = eleitor?.bairro ?? 'sem bairro'
      bairros.set(b, (bairros.get(b) ?? 0) + 1)
    }
    const topBairros = [...bairros.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k]) => k)

    const tipos = new Map<string, number>()
    for (const d of demandas ?? []) tipos.set(d.tipo, (tipos.get(d.tipo) ?? 0) + 1)
    const topTipos = [...tipos.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k]) => k)

    const client = new N8nClient(config)
    const r = await client.call<{ analise: string }>('analiseIA', {
      dados: {
        totalEleitores,
        demandasAbertas,
        demandasResolvidas,
        topBairros,
        topTipos,
        conquistados,
        metaConquistados: Math.round(totalEleitores * 0.3),
      },
      openaiKey: config.openai_api_key,
      openaiModel: config.openai_model,
    })

    setGerando(false)
    if (r.ok && r.data?.analise) {
      setAnalise(r.data.analise)
    } else {
      setErro(r.erro ?? 'Falha ao gerar análise')
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <BrainCircuit className="w-8 h-8 text-marco-azul" /> IA analisa mandato
      </h1>

      <div className="bg-gradient-to-br from-marco-azul to-marco-azul-esc text-white rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-black mb-2">Diagnóstico em 5 pontos</h2>
        <p className="text-white/90 text-sm">
          A IA olha pros teus dados (eleitores, atendimentos, bairros, tipos de demanda) e produz um relatório:
          onde tá forte, onde precisa atuar, próximos passos pros próximos 30 dias.
        </p>
      </div>

      <div className="bg-white rounded-2xl ring-soft p-5">
        <button
          onClick={gerar}
          disabled={gerando}
          className="w-full bg-marco-azul hover:bg-marco-azul-esc text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 text-lg"
        >
          {gerando ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          {gerando ? 'IA analisando...' : '🧠 Pedir análise pra IA'}
        </button>

        {erro && (
          <div className="mt-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg p-3">
            {erro}
          </div>
        )}

        {analise && (
          <div className="mt-6 bg-slate-50 rounded-xl p-5">
            <h3 className="font-black text-slate-800 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-marco-azul" /> Análise gerada
            </h3>
            <div className="whitespace-pre-line text-sm text-slate-700 leading-relaxed">{analise}</div>
          </div>
        )}
      </div>
    </div>
  )
}
