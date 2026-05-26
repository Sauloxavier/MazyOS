import { createFileRoute } from '@tanstack/react-router'
import { Workflow, ExternalLink } from 'lucide-react'
import { useConfig } from '@/features/config/hooks'

export const Route = createFileRoute('/_authed/pro/automacoes')({
  component: AutomacoesPage,
})

const WORKFLOWS = [
  { id: 'disparo', titulo: 'Disparo em massa', desc: 'Envia lista de contatos via WAHA com intervalo humano', cor: 'bg-sky-100 text-sky-600' },
  { id: 'atendimentoIA', titulo: 'Atendimento IA', desc: 'OpenAI responde mensagens recebidas no WhatsApp', cor: 'bg-purple-100 text-purple-600' },
  { id: 'analiseIA', titulo: 'Análise do mandato', desc: 'IA gera diagnóstico baseado nos dados do gabinete', cor: 'bg-fuchsia-100 text-fuchsia-600' },
  { id: 'trafego', titulo: 'Tráfego pago', desc: 'Gera copy + visual de anúncio com IA', cor: 'bg-amber-100 text-amber-600' },
  { id: 'aniversario', titulo: 'Aniversariantes', desc: 'Dispara felicitação automática no dia', cor: 'bg-rose-100 text-rose-600' },
  { id: 'boasVindas', titulo: 'Boas-vindas', desc: 'Saudação ao cadastrar novo eleitor', cor: 'bg-emerald-100 text-emerald-600' },
  { id: 'novaDemanda', titulo: 'Nova demanda', desc: 'Notifica equipe quando abre atendimento', cor: 'bg-blue-100 text-blue-600' },
  { id: 'novaSolicitacao', titulo: 'Nova solicitação', desc: 'Notifica equipe quando chega do site público', cor: 'bg-indigo-100 text-indigo-600' },
]

function AutomacoesPage() {
  const { data: config } = useConfig()

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <Workflow className="w-8 h-8 text-marco-azul" /> Automações (n8n)
      </h1>

      <div className="bg-marco-azul/5 border border-marco-azul/20 rounded-2xl p-5 mb-6 text-sm text-slate-700">
        🔗 As automações rodam no <strong>n8n self-hosted</strong> em
        <a href={config?.n8n_url} target="_blank" className="inline-flex items-center gap-0.5 underline text-marco-azul ml-1 font-bold">
          {config?.n8n_url || 'não configurado'} <ExternalLink className="w-3 h-3" />
        </a>.
        Os webhooks são chamados pelo painel e o n8n executa os workflows.
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {WORKFLOWS.map(wf => {
          const slug = config?.n8n_webhooks?.[wf.id]
          const configurado = !!slug
          return (
            <div key={wf.id} className="bg-white rounded-2xl ring-soft p-5">
              <div className={`w-12 h-12 rounded-2xl ${wf.cor} flex items-center justify-center mb-3`}>
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-800 mb-1">{wf.titulo}</h3>
              <p className="text-xs text-slate-500 mb-3">{wf.desc}</p>
              <div className="flex items-center justify-between text-xs">
                <span className={configurado ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                  {configurado ? '✓ ' + slug : '⚪ não configurado'}
                </span>
                <a href="/config" className="text-marco-azul font-semibold hover:underline">
                  Configurar →
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
