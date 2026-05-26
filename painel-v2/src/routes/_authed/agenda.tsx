import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, MapPin } from 'lucide-react'
import { useCompromissos } from '@/features/compromissos/hooks'
import { CompromissoModal } from '@/features/compromissos/components/CompromissoModal'
import type { Compromisso } from '@/features/compromissos/api'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/_authed/agenda')({
  component: AgendaPage,
})

const DIAS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

function AgendaPage() {
  const { data: compromissos } = useCompromissos()
  const hoje = new Date()
  const [mes, setMes] = useState(hoje.getMonth())
  const [ano, setAno] = useState(hoje.getFullYear())
  const [diaSel, setDiaSel] = useState<string>(hoje.toISOString().slice(0, 10))
  const [modalOpen, setModalOpen] = useState(false)
  const [editando, setEditando] = useState<Compromisso | null>(null)

  const porDia = useMemo(() => {
    const map = new Map<string, Compromisso[]>()
    for (const c of compromissos ?? []) {
      const arr = map.get(c.data) ?? []
      arr.push(c)
      map.set(c.data, arr)
    }
    return map
  }, [compromissos])

  const compromissosDoDia = porDia.get(diaSel) ?? []

  const calendario = useMemo(() => {
    const primeiroDia = new Date(ano, mes, 1).getDay()
    const totalDias = new Date(ano, mes + 1, 0).getDate()
    const cells: Array<{ dia: number | null; iso: string; hoje: boolean; tem: number }> = []
    for (let i = 0; i < primeiroDia; i++) cells.push({ dia: null, iso: '', hoje: false, tem: 0 })
    const agora = new Date()
    const ehMesAtual = agora.getMonth() === mes && agora.getFullYear() === ano
    for (let d = 1; d <= totalDias; d++) {
      const iso = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      cells.push({
        dia: d, iso,
        hoje: ehMesAtual && agora.getDate() === d,
        tem: (porDia.get(iso) ?? []).length,
      })
    }
    return cells
  }, [mes, ano, porDia])

  function navegar(delta: number) {
    let novoMes = mes + delta
    let novoAno = ano
    if (novoMes < 0) { novoMes = 11; novoAno-- }
    if (novoMes > 11) { novoMes = 0; novoAno++ }
    setMes(novoMes); setAno(novoAno)
  }

  function novoCompromisso() { setEditando(null); setModalOpen(true) }
  function editar(c: Compromisso) { setEditando(c); setModalOpen(true) }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6 gap-3">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 flex items-center gap-2">
          <Calendar className="w-8 h-8 text-marco-azul" /> Agenda
        </h1>
        <button onClick={novoCompromisso} className="bg-marco-azul text-white font-bold px-5 py-2.5 rounded-lg hover:bg-marco-azul-esc text-sm flex items-center gap-2 self-start">
          <Plus className="w-4 h-4" /> Novo compromisso
        </button>
      </div>

      <CompromissoModal open={modalOpen} onClose={() => setModalOpen(false)} compromisso={editando} dataInicial={diaSel} />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendário */}
        <div className="bg-white rounded-2xl ring-soft p-4 sm:p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => navegar(-1)} className="p-2 hover:bg-slate-100 rounded-lg"><ChevronLeft className="w-5 h-5" /></button>
            <h2 className="text-lg font-bold text-slate-800">{MESES[mes]} <span className="text-marco-azul">{ano}</span></h2>
            <button onClick={() => navegar(1)} className="p-2 hover:bg-slate-100 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {DIAS.map(d => (
              <div key={d} className="text-center text-xs font-bold text-slate-400 uppercase py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendario.map((c, i) => (
              <button
                key={i}
                disabled={c.dia === null}
                onClick={() => setDiaSel(c.iso)}
                className={cn(
                  'aspect-square rounded-lg flex flex-col items-center justify-center text-sm relative',
                  c.dia === null && 'opacity-0',
                  c.hoje && diaSel !== c.iso && 'bg-marco-amarelo/30 font-black',
                  diaSel === c.iso && 'bg-marco-azul text-white font-black',
                  c.dia !== null && diaSel !== c.iso && !c.hoje && 'hover:bg-slate-50 cursor-pointer text-slate-700',
                )}
              >
                {c.dia}
                {c.tem > 0 && (
                  <span className={cn(
                    'absolute bottom-1 w-1 h-1 rounded-full',
                    diaSel === c.iso ? 'bg-white' : 'bg-marco-azul',
                  )} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Compromissos do dia selecionado */}
        <div className="bg-white rounded-2xl ring-soft p-5">
          <h3 className="font-bold text-slate-800 mb-3">
            {new Date(diaSel + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </h3>
          {compromissosDoDia.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              Nenhum compromisso
              <div className="mt-2">
                <button onClick={novoCompromisso} className="text-marco-azul font-semibold text-sm">+ Adicionar</button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {compromissosDoDia.map(c => (
                <div
                  key={c.id}
                  onClick={() => editar(c)}
                  className="border-l-4 bg-slate-50 hover:bg-slate-100 rounded-lg p-3 cursor-pointer"
                  style={{ borderLeftColor: c.cor }}
                >
                  <div className="font-bold text-slate-800 text-sm">{c.titulo}</div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    {c.hora && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.hora}</span>}
                    {c.local && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.local}</span>}
                  </div>
                  {c.descricao && <div className="text-xs text-slate-600 mt-1 line-clamp-2">{c.descricao}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
