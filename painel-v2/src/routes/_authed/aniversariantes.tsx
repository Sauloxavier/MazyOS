import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Cake, Phone, Search } from 'lucide-react'
import { useEleitores } from '@/features/eleitores/hooks'
import { useConfig } from '@/features/config/hooks'
import { iniciais, chatIdDe } from '@/lib/utils'
import type { Eleitor } from '@/lib/database.types'

export const Route = createFileRoute('/_authed/aniversariantes')({
  component: AniversariantesPage,
})

interface AniversarianteCalc {
  eleitor: Eleitor
  diaMes: string   // "MM-DD"
  diasFalta: number
  ehHoje: boolean
}

function calcularProximos(eleitores: Eleitor[]): AniversarianteCalc[] {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const yearAtual = hoje.getFullYear()

  const lista: AniversarianteCalc[] = []
  for (const e of eleitores) {
    if (!e.nascimento) continue
    const [_y, m, d] = e.nascimento.split('-')
    if (!m || !d) continue
    const aniv = new Date(yearAtual, parseInt(m) - 1, parseInt(d))
    if (aniv < hoje) aniv.setFullYear(yearAtual + 1)
    const diasFalta = Math.round((aniv.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))
    lista.push({
      eleitor: e,
      diaMes: `${m.padStart(2, '0')}-${d.padStart(2, '0')}`,
      diasFalta,
      ehHoje: diasFalta === 0,
    })
  }
  return lista.sort((a, b) => a.diasFalta - b.diasFalta)
}

function AniversariantesPage() {
  const { data: eleitores, isLoading } = useEleitores()
  const { data: config } = useConfig()
  const [janela, setJanela] = useState<number>(30)
  const [busca, setBusca] = useState('')

  const aniversariantes = useMemo(() => {
    if (!eleitores) return []
    return calcularProximos(eleitores)
      .filter(a => a.diasFalta <= janela)
      .filter(a => !busca || a.eleitor.nome.toLowerCase().includes(busca.toLowerCase()))
  }, [eleitores, janela, busca])

  const hojeCount = useMemo(() => aniversariantes.filter(a => a.ehHoje).length, [aniversariantes])

  function enviarWhatsApp(e: Eleitor) {
    const chatId = chatIdDe(e.telefone)
    if (!chatId) return
    const numero = chatId.replace('@c.us', '')
    const tpl = config?.mensagens_padrao?.find(m => m.id === 'aniversario')?.conteudo
      ?? `Olá ${e.nome.split(' ')[0]}! Hoje é seu dia! 🎉\nQue Deus abençoe sua vida e sua família.\n— Marco Xavier`
    const msg = tpl
      .replace(/\{\{nome\}\}/g, e.nome)
      .replace(/\{\{primeiro_nome\}\}/g, e.nome.split(' ')[0])
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-4 gap-3">
        <div>
          <div className="text-sm text-slate-500">Comunicação › Aniversariantes</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 mt-1 flex items-center gap-3">
            <Cake className="w-8 h-8 text-marco-amarelo-esc" /> Aniversariantes
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {hojeCount > 0 && (
              <span className="text-marco-amarelo-esc font-bold">🎂 {hojeCount} aniversariante(s) hoje! </span>
            )}
            {aniversariantes.length} eleitor(es) nos próximos {janela} dias.
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl ring-soft p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar por nome..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
          />
        </div>
        <select
          value={janela}
          onChange={e => setJanela(Number(e.target.value))}
          className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
        >
          <option value={1}>Hoje</option>
          <option value={7}>Próximos 7 dias</option>
          <option value={30}>Próximos 30 dias</option>
          <option value={90}>Próximos 90 dias</option>
          <option value={365}>Próximo ano</option>
        </select>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-400">Carregando...</div>
      ) : aniversariantes.length === 0 ? (
        <div className="bg-white rounded-2xl ring-soft p-12 text-center text-slate-400">
          <Cake className="w-16 h-16 mx-auto mb-3" />
          <div className="font-medium">Nenhum aniversariante</div>
          <div className="text-sm mt-1">Cadastre datas de nascimento dos eleitores.</div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {aniversariantes.map(a => (
            <div
              key={a.eleitor.id}
              className={`bg-white rounded-2xl ring-soft p-5 flex items-center gap-4 ${a.ehHoje ? 'border-2 border-marco-amarelo' : ''}`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold ${a.ehHoje ? 'bg-marco-amarelo text-marco-azul-esc' : 'bg-slate-100 text-slate-600'}`}>
                {iniciais(a.eleitor.nome)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-800 truncate">{a.eleitor.nome}</div>
                <div className="text-sm text-slate-500">
                  <span className={a.ehHoje ? 'text-marco-amarelo-esc font-bold' : ''}>
                    {a.ehHoje ? '🎂 HOJE!' : `em ${a.diasFalta} dia(s)`}
                  </span>
                  {a.eleitor.bairro && <> · {a.eleitor.bairro}</>}
                </div>
              </div>
              {a.eleitor.telefone && (
                <button
                  onClick={() => enviarWhatsApp(a.eleitor)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Enviar
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
