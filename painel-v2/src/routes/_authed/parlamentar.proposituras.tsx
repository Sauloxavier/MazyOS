import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { FileText, Plus } from 'lucide-react'
import { useProposituras } from '@/features/parlamentar/hooks'
import { ProposituraModal } from '@/features/parlamentar/components/ProposituraModal'
import type { Propositura } from '@/features/parlamentar/api'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/_authed/parlamentar/proposituras')({
  component: ProposiPage,
})

function ProposiPage() {
  const { data, isLoading } = useProposituras()
  const [modalOpen, setModalOpen] = useState(false)
  const [editando, setEditando] = useState<Propositura | null>(null)

  function nova() { setEditando(null); setModalOpen(true) }
  function editar(p: Propositura) { setEditando(p); setModalOpen(true) }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6 gap-3">
        <div>
          <div className="text-sm text-slate-500">Parlamentar › Processos legislativos</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <FileText className="w-8 h-8 text-marco-azul" /> Processos legislativos
          </h1>
        </div>
        <button onClick={nova} className="bg-marco-azul text-white font-bold px-5 py-2.5 rounded-lg hover:bg-marco-azul-esc text-sm flex items-center gap-2 self-start">
          <Plus className="w-4 h-4" /> Nova propositura
        </button>
      </div>

      <ProposituraModal open={modalOpen} onClose={() => setModalOpen(false)} propositura={editando} />

      {isLoading ? (
        <div className="text-center py-12 text-slate-400">Carregando...</div>
      ) : (data ?? []).length === 0 ? (
        <div className="bg-white rounded-2xl ring-soft p-12 text-center text-slate-400">
          <FileText className="w-16 h-16 mx-auto mb-3" />
          <div className="font-medium">Nenhuma propositura cadastrada</div>
          <div className="text-sm mt-1">Projetos de lei, requerimentos, moções, ofícios e indicações.</div>
          <button onClick={nova} className="mt-4 bg-marco-azul text-white font-bold px-5 py-2 rounded-lg text-sm">
            + Cadastrar primeira
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl ring-soft overflow-hidden">
          <div className="divide-y divide-slate-100">
            {(data ?? []).map(p => (
              <div key={p.id} onClick={() => editar(p)} className="p-4 hover:bg-slate-50 cursor-pointer">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[10px] font-bold text-marco-azul uppercase bg-marco-azul/10 px-2 py-0.5 rounded">{p.tipo}</span>
                  {p.numero && <span className="text-xs text-slate-500">Nº {p.numero}/{p.ano}</span>}
                  <span className={cn(
                    'text-[10px] font-bold px-2 py-0.5 rounded uppercase',
                    p.status === 'Aprovado' && 'bg-emerald-100 text-emerald-700',
                    p.status === 'Em tramitação' && 'bg-blue-100 text-blue-700',
                    p.status === 'Protocolado' && 'bg-amber-100 text-amber-700',
                    p.status === 'Rejeitado' && 'bg-rose-100 text-rose-700',
                    (p.status === 'Em elaboração' || p.status === 'Arquivado') && 'bg-slate-200 text-slate-600',
                  )}>{p.status}</span>
                </div>
                <div className="font-semibold text-slate-800">{p.titulo}</div>
                {p.descricao && <div className="text-sm text-slate-500 mt-1 line-clamp-2">{p.descricao}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
