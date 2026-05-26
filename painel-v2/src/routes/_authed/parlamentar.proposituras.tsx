import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { FileText, Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/_authed/parlamentar/proposituras')({
  component: ProposiPage,
})

interface Propositura {
  id: string
  tipo: string
  numero: string | null
  ano: number
  titulo: string
  descricao: string | null
  status: string
  data_protocolo: string | null
  observacoes: string | null
}

function ProposiPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['proposituras'],
    queryFn: async (): Promise<Propositura[]> => {
      const { data, error } = await supabase
        .from('proposituras' as any)
        .select('*')
        .order('ano', { ascending: false })
        .order('numero', { ascending: false, nullsFirst: true })
      if (error) return []
      return (data ?? []) as unknown as Propositura[]
    },
  })

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6 gap-3">
        <div>
          <div className="text-sm text-slate-500">Parlamentar › Processos legislativos</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <FileText className="w-8 h-8 text-marco-azul" /> Processos legislativos
          </h1>
        </div>
        <button className="bg-marco-azul text-white font-bold px-5 py-2.5 rounded-lg hover:bg-marco-azul-esc text-sm flex items-center gap-2 self-start">
          <Plus className="w-4 h-4" /> Nova propositura
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-400">Carregando...</div>
      ) : (data ?? []).length === 0 ? (
        <div className="bg-white rounded-2xl ring-soft p-12 text-center text-slate-400">
          <FileText className="w-16 h-16 mx-auto mb-3" />
          <div className="font-medium">Nenhuma propositura cadastrada</div>
          <div className="text-sm mt-1">Projetos de lei, requerimentos, moções, ofícios e indicações aparecerão aqui.</div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl ring-soft overflow-hidden">
          <div className="divide-y divide-slate-100">
            {(data ?? []).map(p => (
              <div key={p.id} className="p-4 hover:bg-slate-50 cursor-pointer">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[10px] font-bold text-marco-azul uppercase bg-marco-azul/10 px-2 py-0.5 rounded">{p.tipo}</span>
                  {p.numero && <span className="text-xs text-slate-500">Nº {p.numero}/{p.ano}</span>}
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-emerald-100 text-emerald-700">{p.status}</span>
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
