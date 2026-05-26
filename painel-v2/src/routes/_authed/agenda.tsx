import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react'

export const Route = createFileRoute('/_authed/agenda')({
  component: AgendaPage,
})

const DIAS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

function AgendaPage() {
  const [mes, setMes] = useState(new Date().getMonth())
  const [ano, setAno] = useState(new Date().getFullYear())

  const calendario = useMemo(() => {
    const primeiroDia = new Date(ano, mes, 1).getDay()
    const totalDias = new Date(ano, mes + 1, 0).getDate()
    const cells: Array<{ dia: number | null; hoje: boolean }> = []
    for (let i = 0; i < primeiroDia; i++) cells.push({ dia: null, hoje: false })
    const agora = new Date()
    for (let d = 1; d <= totalDias; d++) {
      cells.push({
        dia: d,
        hoje: agora.getDate() === d && agora.getMonth() === mes && agora.getFullYear() === ano,
      })
    }
    return cells
  }, [mes, ano])

  function navegar(delta: number) {
    let novoMes = mes + delta
    let novoAno = ano
    if (novoMes < 0) { novoMes = 11; novoAno-- }
    if (novoMes > 11) { novoMes = 0; novoAno++ }
    setMes(novoMes)
    setAno(novoAno)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6 gap-3">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 flex items-center gap-2">
          <Calendar className="w-8 h-8 text-marco-azul" /> Agenda
        </h1>
        <button className="bg-marco-azul text-white font-bold px-5 py-2.5 rounded-lg hover:bg-marco-azul-esc text-sm flex items-center gap-2 self-start">
          <Plus className="w-4 h-4" /> Novo compromisso
        </button>
      </div>

      <div className="bg-white rounded-2xl ring-soft p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navegar(-1)} className="p-2 hover:bg-slate-100 rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-slate-800">
            {MESES[mes]} <span className="text-marco-azul">{ano}</span>
          </h2>
          <button onClick={() => navegar(1)} className="p-2 hover:bg-slate-100 rounded-lg">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DIAS.map(d => (
            <div key={d} className="text-center text-xs font-bold text-slate-400 uppercase py-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendario.map((c, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm ${
                c.dia === null ? '' :
                c.hoje ? 'bg-marco-azul text-white font-black' :
                'hover:bg-slate-50 cursor-pointer text-slate-700'
              }`}
            >
              {c.dia}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-marco-azul/5 border border-marco-azul/20 rounded-2xl p-5 text-sm text-slate-600">
        💡 <strong>Em breve:</strong> compromissos integrados (reunião com eleitor, sessão da câmara, evento da paróquia, agenda de obras).
      </div>
    </div>
  )
}
