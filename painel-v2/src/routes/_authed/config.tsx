import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Settings, Phone, Link2, Sparkles, Users, Save, CheckCircle2 } from 'lucide-react'
import { useConfig, useSalvarConfig } from '@/features/config/hooks'
import { N8nClient } from '@/lib/n8n'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/_authed/config')({
  component: ConfigPage,
})

type Aba = 'geral' | 'whatsapp' | 'n8n' | 'ia' | 'equipe'

function ConfigPage() {
  const { data: config, isLoading } = useConfig()
  const [aba, setAba] = useState<Aba>('geral')

  if (isLoading || !config) {
    return <div className="p-8 text-slate-400">Carregando configurações...</div>
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <Settings className="w-8 h-8 text-marco-azul" /> Configurações
      </h1>

      <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 ring-soft overflow-x-auto">
        <TabButton ativa={aba === 'geral'} onClick={() => setAba('geral')} icon={Settings} label="Geral" />
        <TabButton ativa={aba === 'whatsapp'} onClick={() => setAba('whatsapp')} icon={Phone} label="WhatsApp" />
        <TabButton ativa={aba === 'n8n'} onClick={() => setAba('n8n')} icon={Link2} label="n8n" />
        <TabButton ativa={aba === 'ia'} onClick={() => setAba('ia')} icon={Sparkles} label="IA" />
        <TabButton ativa={aba === 'equipe'} onClick={() => setAba('equipe')} icon={Users} label="Equipe" />
      </div>

      {aba === 'geral' && <AbaGeral />}
      {aba === 'whatsapp' && <AbaWhatsApp />}
      {aba === 'n8n' && <AbaN8n />}
      {aba === 'ia' && <AbaIA />}
      {aba === 'equipe' && <AbaEquipe />}
    </div>
  )
}

function TabButton({
  ativa, onClick, icon: Icon, label,
}: { ativa: boolean; onClick: () => void; icon: typeof Settings; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition',
        ativa ? 'bg-marco-azul text-white' : 'text-slate-600 hover:bg-slate-50'
      )}
    >
      <Icon className="w-4 h-4" /> {label}
    </button>
  )
}

function AbaGeral() {
  const { data: config } = useConfig()
  const salvar = useSalvarConfig()
  const [nomeVereador, setNomeVereador] = useState(config?.nome_vereador ?? '')
  const [proxEleicao, setProxEleicao] = useState(config?.proxima_eleicao ?? '')

  return (
    <Card titulo="Identidade do gabinete">
      <Field label="Nome do vereador">
        <input
          value={nomeVereador}
          onChange={e => setNomeVereador(e.target.value)}
          className="input"
        />
      </Field>
      <Field label="Próxima eleição">
        <input
          type="date"
          value={proxEleicao}
          onChange={e => setProxEleicao(e.target.value)}
          className="input"
        />
      </Field>
      <BotaoSalvar
        onClick={() => salvar.mutate({ nome_vereador: nomeVereador, proxima_eleicao: proxEleicao })}
        salvando={salvar.isPending}
        sucesso={salvar.isSuccess}
      />
    </Card>
  )
}

function AbaWhatsApp() {
  const { data: config } = useConfig()
  const salvar = useSalvarConfig()
  const [url, setUrl] = useState(config?.waha_url ?? '')
  const [apiKey, setApiKey] = useState(config?.waha_api_key ?? '')
  const [session, setSession] = useState(config?.waha_session ?? 'default')

  return (
    <Card titulo="WhatsApp (WAHA)" desc="Conexão única do gabinete — admin configura, todos os assessores usam.">
      <Field label="URL do servidor WAHA">
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://waha.seudominio.com" className="input font-mono" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Sessão">
          <input value={session} onChange={e => setSession(e.target.value)} className="input font-mono" />
        </Field>
        <Field label="API Key">
          <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} className="input font-mono" />
        </Field>
      </div>
      <BotaoSalvar
        onClick={() => salvar.mutate({ waha_url: url, waha_api_key: apiKey, waha_session: session })}
        salvando={salvar.isPending}
        sucesso={salvar.isSuccess}
      />
    </Card>
  )
}

function AbaN8n() {
  const { data: config } = useConfig()
  const salvar = useSalvarConfig()
  const [url, setUrl] = useState(config?.n8n_url ?? '')
  const [apiKey, setApiKey] = useState(config?.n8n_api_key ?? '')
  const [authHeader, setAuthHeader] = useState(config?.n8n_auth_header ?? '')
  const [webhooks, setWebhooks] = useState<Record<string, string>>(config?.n8n_webhooks ?? {})
  const [testResults, setTestResults] = useState<Record<string, { ok: boolean; msg: string } | undefined>>({})

  const client = useMemo(() => new N8nClient({
    n8n_url: url, n8n_api_key: apiKey, n8n_auth_header: authHeader, n8n_webhooks: webhooks,
  }), [url, apiKey, authHeader, webhooks])

  const workflowsList: Array<{ id: string; label: string }> = [
    { id: 'disparo', label: 'Disparo em massa' },
    { id: 'trafego', label: 'Tráfego pago' },
    { id: 'atendimentoIA', label: 'Atendimento por IA' },
    { id: 'analiseIA', label: 'IA analisa mandato' },
    { id: 'novaDemanda', label: 'Evento — nova demanda' },
    { id: 'novaSolicitacao', label: 'Evento — nova solicitação' },
    { id: 'aniversario', label: 'Aniversariantes' },
    { id: 'boasVindas', label: 'Boas-vindas' },
  ]

  async function testar(wf: string) {
    setTestResults(r => ({ ...r, [wf]: undefined }))
    const r = await client.testar(wf)
    setTestResults(rr => ({ ...rr, [wf]: { ok: r.ok, msg: r.ok ? `OK ${r.ms}ms` : (r.erro ?? 'erro') } }))
  }

  return (
    <Card titulo="Integração n8n" desc="Os recursos Pro rodam via workflows do seu n8n self-hosted.">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <Field label="URL do n8n">
            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://n8n.seudominio.com" className="input font-mono" />
          </Field>
        </div>
        <Field label="Header de auth (opcional)">
          <input value={authHeader} onChange={e => setAuthHeader(e.target.value)} placeholder="X-N8N-API-KEY" className="input font-mono" />
        </Field>
      </div>
      <Field label="API Key / Token (opcional)">
        <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} className="input font-mono" />
      </Field>

      <h3 className="font-bold text-slate-700 text-sm mt-6 mb-2">Webhooks por recurso</h3>
      <div className="space-y-2">
        {workflowsList.map(wf => {
          const result = testResults[wf.id]
          return (
            <div key={wf.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 rounded-lg p-2">
              <div className="col-span-4 text-sm font-semibold">{wf.label}</div>
              <input
                value={webhooks[wf.id] ?? ''}
                onChange={e => setWebhooks(w => ({ ...w, [wf.id]: e.target.value }))}
                placeholder={`mx-${wf.id}`}
                className="col-span-6 px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
              />
              <button
                onClick={() => testar(wf.id)}
                disabled={!url || !webhooks[wf.id]}
                className="col-span-2 bg-marco-azul text-white text-xs font-bold py-1.5 rounded-lg disabled:opacity-40"
              >
                {result === undefined ? 'Testar' : result.ok ? '✓ OK' : '✗ Falhou'}
              </button>
              {result && (
                <div className={cn('col-span-12 text-xs', result.ok ? 'text-emerald-600' : 'text-rose-600')}>
                  {result.msg}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <BotaoSalvar
        onClick={() => salvar.mutate({ n8n_url: url, n8n_api_key: apiKey, n8n_auth_header: authHeader, n8n_webhooks: webhooks })}
        salvando={salvar.isPending}
        sucesso={salvar.isSuccess}
      />
    </Card>
  )
}

function AbaIA() {
  const { data: config } = useConfig()
  const salvar = useSalvarConfig()
  const [apiKey, setApiKey] = useState(config?.openai_api_key ?? '')
  const [model, setModel] = useState(config?.openai_model ?? 'gpt-4o-mini')
  const [prompt, setPrompt] = useState(config?.atendimento_ia_prompt ?? '')
  const [ativo, setAtivo] = useState(config?.atendimento_ia_ativo ?? false)

  return (
    <Card titulo="Inteligência Artificial (OpenAI)" desc="Chave usada por atendimento IA, geração de copy de anúncios, análise do mandato.">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <Field label="API Key">
            <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="sk-proj-..." className="input font-mono" />
          </Field>
        </div>
        <Field label="Modelo">
          <select value={model} onChange={e => setModel(e.target.value)} className="input">
            <option value="gpt-4o-mini">GPT-4o mini (rápido/barato)</option>
            <option value="gpt-4o">GPT-4o (equilibrado)</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
            <option value="o3-mini">o3-mini (raciocínio)</option>
          </select>
        </Field>
      </div>
      <Field label="Prompt do atendimento IA">
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={6} className="input" />
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={ativo} onChange={e => setAtivo(e.target.checked)} />
        Atendimento IA ativo (responde mensagens recebidas automaticamente)
      </label>
      <BotaoSalvar
        onClick={() => salvar.mutate({
          openai_api_key: apiKey, openai_model: model,
          atendimento_ia_prompt: prompt, atendimento_ia_ativo: ativo,
        })}
        salvando={salvar.isPending}
        sucesso={salvar.isSuccess}
      />
    </Card>
  )
}

function AbaEquipe() {
  return (
    <Card titulo="Equipe" desc="Gerenciamento de usuários e perfis — em construção.">
      <div className="text-sm text-slate-500 py-8 text-center">
        Em breve: convidar assessor, alterar papel (admin/assessor), redefinir senha.
      </div>
    </Card>
  )
}

// Componentes auxiliares
function Card({ titulo, desc, children }: { titulo: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl ring-soft p-6 space-y-4">
      <div>
        <h2 className="font-black text-lg text-slate-800">{titulo}</h2>
        {desc && <p className="text-sm text-slate-500 mt-1">{desc}</p>}
      </div>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-slate-600 uppercase mb-1 block">{label}</span>
      {children}
    </label>
  )
}

function BotaoSalvar({ onClick, salvando, sucesso }: { onClick: () => void; salvando: boolean; sucesso: boolean }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <button
        onClick={onClick}
        disabled={salvando}
        className="bg-marco-azul hover:bg-marco-azul-esc text-white font-bold px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
      >
        <Save className="w-4 h-4" /> {salvando ? 'Salvando...' : 'Salvar'}
      </button>
      {sucesso && !salvando && (
        <span className="text-emerald-600 text-sm flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4" /> Salvo
        </span>
      )}
    </div>
  )
}
