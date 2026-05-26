import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { Bell, AlertTriangle, MessageSquare, Cake } from 'lucide-react'
import { useEleitores } from '@/features/eleitores/hooks'
import { useDemandas } from '@/features/demandas/hooks'

export const Route = createFileRoute('/_authed/notificacoes')({
  component: NotifPage,
})

function NotifPage() {
  const { data: eleitores } = useEleitores()
  const { data: demandas } = useDemandas()

  const notificacoes = useMemo(() => {
    const items: Array<{ id: string; titulo: string; desc: string; icon: typeof Bell; cor: string }> = []

    // Aniversariantes hoje
    const hoje = new Date()
    const mmddHoje = `${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`
    const aniversariantes = (eleitores ?? []).filter(e => {
      if (!e.nascimento) return false
      return e.nascimento.slice(5) === mmddHoje
    })
    if (aniversariantes.length > 0) {
      items.push({
        id: 'aniv-hoje',
        titulo: `${aniversariantes.length} aniversariante(s) hoje! 🎂`,
        desc: aniversariantes.slice(0, 3).map(e => e.nome).join(', ') + (aniversariantes.length > 3 ? '...' : ''),
        icon: Cake,
        cor: 'bg-marco-amarelo/20 text-marco-amarelo-esc',
      })
    }

    // Demandas paradas há +30 dias
    const trintaDiasAtras = Date.now() - 30 * 24 * 3600 * 1000
    const paradas = (demandas ?? []).filter(d =>
      (d.status === 'Aberta' || d.status === 'Em andamento') &&
      new Date(d.data || 0).getTime() < trintaDiasAtras
    )
    if (paradas.length > 0) {
      items.push({
        id: 'paradas',
        titulo: `${paradas.length} atendimento(s) parado(s) há mais de 30 dias`,
        desc: 'Revise o status pra não deixar promessa esquecida.',
        icon: AlertTriangle,
        cor: 'bg-rose-100 text-rose-600',
      })
    }

    // Eleitores sem contato há muito tempo (placeholder)
    const semTel = (eleitores ?? []).filter(e => !(e.telefone ?? '').trim()).length
    if (semTel > 0) {
      items.push({
        id: 'sem-tel',
        titulo: `${semTel} eleitor(es) sem telefone cadastrado`,
        desc: 'Sem telefone não dá pra disparar mensagens. Atualize o cadastro.',
        icon: MessageSquare,
        cor: 'bg-amber-100 text-amber-600',
      })
    }

    return items
  }, [eleitores, demandas])

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <Bell className="w-8 h-8 text-marco-azul" /> Notificações
      </h1>

      {notificacoes.length === 0 ? (
        <div className="bg-white rounded-2xl ring-soft p-12 text-center text-slate-400">
          <div className="text-5xl mb-3">🎉</div>
          <div className="font-medium">Tudo em dia!</div>
          <div className="text-sm mt-1">Nenhuma notificação ativa no momento.</div>
        </div>
      ) : (
        <div className="space-y-3">
          {notificacoes.map(n => {
            const Icon = n.icon
            return (
              <div key={n.id} className="bg-white rounded-2xl ring-soft p-4 flex items-start gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${n.cor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-800">{n.titulo}</div>
                  <div className="text-sm text-slate-500 mt-1">{n.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
