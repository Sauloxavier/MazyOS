import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Coins, Plus } from 'lucide-react'
import { useEmendas } from '@/features/parlamentar/hooks'
import { EmendaModal } from '@/features/parlamentar/components/EmendaModal'
import type { Emenda } from '@/features/parlamentar/api'

export const Route = createFileRoute('/_authed/parlamentar/emendas')({
  component: EmendasPage,
})

function EmendasPage() {
  const { data, isLoading } = useEmendas()
  const [modalOpen, setModalOpen] = useState(false)
  const [editando, setEditando] = useState<Emenda | null>(null)

  function nova() { setEditando(null); setModalOpen(true) }
  function editar(e: Emenda) { setEditando(e); setModalOpen(true) }

  const totalValor = (data ?? []).reduce((sum, e) => sum + (e.valor ?? 0), 0)

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6 gap-3">
        <div>
          <div className="text-sm text-slate-500">Parlamentar › Emendas</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <Coins className="w-8 h-8 text-marco-azul" /> Emendas
          </h1>
          {totalValor > 0 && (
            <p className="text-sm text-slate-500 mt-1">
              Total destinado: <strong className="text-marco-azul">R$ {totalValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
            </p>
          )}
        </div>
        <button onClick={nova} className="bg-marco-azul text-white font-bold px-5 py-2.5 rounded-lg hover:bg-marco-azul-esc text-sm flex items-center gap-2 self-start">
          <Plus className="w-4 h-4" /> Nova emenda
        </button>
      </div>

      <EmendaModal open={modalOpen} onClose={() => setModalOpen(false)} emenda={editando} />

      {isLoading ? (
        <div className="text-center py-12 text-slate-400">Carregando...</div>
      ) : (data ?? []).length === 0 ? (
        <div className="bg-white rounded-2xl ring-soft p-12 text-center text-slate-400">
          <Coins className="w-16 h-16 mx-auto mb-3" />
          <div className="font-medium">Nenhuma emenda cadastrada</div>
          <div className="text-sm mt-1">Emendas impositivas, aditivas, modificativas etc.</div>
          <button onClick={nova} className="mt-4 bg-marco-azul text-white font-bold px-5 py-2 rounded-lg text-sm">
            + Cadastrar primeira
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl ring-soft overflow-hidden">
          <div className="divide-y divide-slate-100">
            {(data ?? []).map(e => (
              <div key={e.id} onClick={() => editar(e)} className="p-4 hover:bg-slate-50 cursor-pointer flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[10px] font-bold text-marco-azul uppercase bg-marco-azul/10 px-2 py-0.5 rounded">{e.tipo}</span>
                    {e.numero && <span className="text-xs text-slate-500">Nº {e.numero}/{e.ano}</span>}
                    {e.area && <span className="text-[10px] font-semibold text-slate-500 uppercase">{e.area}</span>}
                  </div>
                  <div className="font-semibold text-slate-800">{e.titulo}</div>
                  {e.beneficiario && <div className="text-sm text-slate-500 mt-1">→ {e.beneficiario}</div>}
                </div>
                {e.valor != null && e.valor > 0 && (
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs text-slate-400">Valor</div>
                    <div className="text-lg font-black text-marco-azul">
                      R$ {e.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
