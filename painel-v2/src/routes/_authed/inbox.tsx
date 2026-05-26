import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Inbox as InboxIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/_authed/inbox')({
  component: InboxPage,
})

interface Solicitacao {
  id: string
  protocolo: string
  nome: string
  telefone: string
  tipo: string
  descricao: string
  bairro: string | null
  status: string
  enviado_em: string
  origem: string | null
}

function InboxPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['solicitacoes'],
    queryFn: async (): Promise<Solicitacao[]> => {
      const { data, error } = await supabase
        .from('solicitacoes' as any)
        .select('*')
        .order('enviado_em', { ascending: false })
        .limit(100)
      if (error) throw error
      return (data ?? []) as unknown as Solicitacao[]
    },
  })

  const pendentes = (data ?? []).filter(s => s.status === 'pendente')
  const processadas = (data ?? []).filter(s => s.status !== 'pendente')

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <InboxIcon className="w-8 h-8 text-marco-azul" /> Caixa de Entrada
        {pendentes.length > 0 && (
          <span className="ml-2 bg-rose-500 text-white text-sm font-bold rounded-full px-3 py-1">
            {pendentes.length}
          </span>
        )}
      </h1>

      {isLoading ? (
        <div className="text-center py-12 text-slate-400">Carregando...</div>
      ) : (data ?? []).length === 0 ? (
        <div className="bg-white rounded-2xl ring-soft p-12 text-center text-slate-400">
          <InboxIcon className="w-16 h-16 mx-auto mb-3" />
          <div className="font-medium">Nenhuma solicitação ainda</div>
          <div className="text-sm mt-1">Solicitações vindas do site público aparecerão aqui.</div>
        </div>
      ) : (
        <>
          {pendentes.length > 0 && (
            <>
              <h2 className="font-bold text-slate-700 mb-3 mt-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                Pendentes
              </h2>
              <div className="space-y-3">
                {pendentes.map(s => <SolicCard key={s.id} s={s} />)}
              </div>
            </>
          )}
          {processadas.length > 0 && (
            <>
              <h2 className="font-bold text-slate-700 mb-3 mt-6">Histórico</h2>
              <div className="bg-white rounded-2xl ring-soft divide-y divide-slate-100">
                {processadas.slice(0, 30).map(s => (
                  <div key={s.id} className="p-3 flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${s.status === 'aceito' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {s.status}
                    </span>
                    <div className="flex-1 min-w-0 text-sm">
                      <div className="font-semibold truncate">{s.nome} — {s.tipo}</div>
                      <div className="text-xs text-slate-500 truncate">{s.descricao}</div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">{s.protocolo}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

function SolicCard({ s }: { s: Solicitacao }) {
  return (
    <div className="bg-white rounded-2xl ring-soft border-l-4 border-rose-500 p-5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <div className="font-bold text-slate-800 truncate">{s.nome}</div>
          <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
            <span>{s.telefone}</span>
            {s.bairro && <><span>·</span><span>{s.bairro}</span></>}
          </div>
        </div>
        <span className="text-[10px] font-bold text-marco-azul uppercase bg-marco-azul/10 px-2 py-0.5 rounded">{s.tipo}</span>
      </div>
      <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700 whitespace-pre-line mb-2">{s.descricao}</div>
      <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
        <span>{new Date(s.enviado_em).toLocaleString('pt-BR')}</span>
        <span className="font-mono">{s.protocolo}</span>
      </div>
    </div>
  )
}
