import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Rocket, Filter, MessageSquare, Send, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { useEleitores } from '@/features/eleitores/hooks'
import { useConfig } from '@/features/config/hooks'
import { N8nClient } from '@/lib/n8n'
import { iniciais, chatIdDe } from '@/lib/utils'

export const Route = createFileRoute('/_authed/pro/disparo')({
  component: DisparoPage,
})

type Modo = 'navegador' | 'n8n'

function DisparoPage() {
  const { data: eleitores } = useEleitores()
  const { data: config } = useConfig()

  const [filtroEnv, setFiltroEnv] = useState('')
  const [filtroBairro, setFiltroBairro] = useState('')
  const [filtroNicho, setFiltroNicho] = useState('')
  const [somenteComTel, setSomenteComTel] = useState(true)
  const [templateId, setTemplateId] = useState('')
  const [usarCustom, setUsarCustom] = useState(false)
  const [conteudoCustom, setConteudoCustom] = useState('')
  const [modo, setModo] = useState<Modo>('n8n')
  const [intervaloMin, setIntervaloMin] = useState(8)
  const [intervaloMax, setIntervaloMax] = useState(20)

  const [resultado, setResultado] = useState<{ ok: boolean; msg: string } | null>(null)
  const [enviando, setEnviando] = useState(false)

  const bairros = useMemo(() => {
    if (!eleitores) return []
    return [...new Set(eleitores.map(e => e.bairro).filter(Boolean) as string[])].sort()
  }, [eleitores])

  const destinatarios = useMemo(() => {
    if (!eleitores) return []
    return eleitores.filter(e => {
      if (filtroEnv && e.envolvimento !== filtroEnv) return false
      if (filtroBairro && e.bairro !== filtroBairro) return false
      if (filtroNicho && !(e.nichos ?? []).includes(filtroNicho)) return false
      if (somenteComTel && !(e.telefone ?? '').replace(/\D/g, '')) return false
      return true
    })
  }, [eleitores, filtroEnv, filtroBairro, filtroNicho, somenteComTel])

  const conteudoEfetivo = useMemo(() => {
    if (usarCustom) return conteudoCustom
    return config?.mensagens_padrao?.find(t => t.id === templateId)?.conteudo ?? ''
  }, [usarCustom, conteudoCustom, templateId, config])

  const previewMsg = useMemo(() => {
    const alvo = destinatarios[0]
    if (!alvo || !conteudoEfetivo) return '(sem destinatário ou template selecionado)'
    return conteudoEfetivo
      .replace(/\{\{nome\}\}/g, alvo.nome)
      .replace(/\{\{primeiro_nome\}\}/g, alvo.nome.split(' ')[0] ?? '')
      .replace(/\{\{bairro\}\}/g, alvo.bairro ?? '')
      .replace(/\{\{vereador\}\}/g, config?.nome_vereador ?? 'Marco Xavier')
  }, [destinatarios, conteudoEfetivo, config])

  async function disparar() {
    if (!conteudoEfetivo.trim()) {
      setResultado({ ok: false, msg: 'Escreva uma mensagem ou escolha um template' })
      return
    }
    if (destinatarios.length === 0) {
      setResultado({ ok: false, msg: 'Nenhum destinatário com esses filtros' })
      return
    }

    const confirmar = confirm(`Disparar para ${destinatarios.length} contato(s) via ${modo}?`)
    if (!confirmar) return

    setEnviando(true)
    setResultado(null)

    if (modo === 'n8n') {
      if (!config) { setEnviando(false); return }
      const client = new N8nClient({
        n8n_url: config.n8n_url,
        n8n_api_key: config.n8n_api_key,
        n8n_auth_header: config.n8n_auth_header,
        n8n_webhooks: config.n8n_webhooks,
      })
      const contatos = destinatarios.map(e => {
        const chatId = chatIdDe(e.telefone) ?? ''
        return {
          id: e.id,
          nome: e.nome,
          telefone: chatId.replace('@c.us', ''),
          bairro: e.bairro ?? '',
          chatId,
        }
      })
      const r = await client.call('disparo', {
        mensagem: conteudoEfetivo,
        contatos,
        intervaloMin,
        intervaloMax,
        wahaUrl: config.waha_url,
        wahaApiKey: config.waha_api_key,
        wahaSession: config.waha_session,
      })
      setResultado({
        ok: r.ok,
        msg: r.ok
          ? `✓ Lote enviado pro n8n: ${contatos.length} contatos · ${r.ms}ms`
          : `✗ Falha: ${r.erro ?? 'erro desconhecido'}`
      })
    } else {
      // Modo navegador: abre wa.me em sequência (limitado, melhor pra poucos)
      let i = 0
      for (const e of destinatarios) {
        const num = (chatIdDe(e.telefone) ?? '').replace('@c.us', '')
        if (!num) continue
        const msg = conteudoEfetivo
          .replace(/\{\{nome\}\}/g, e.nome)
          .replace(/\{\{primeiro_nome\}\}/g, e.nome.split(' ')[0] ?? '')
        window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, '_blank')
        i++
        await new Promise(r => setTimeout(r, 1000))
      }
      setResultado({ ok: true, msg: `✓ Abertos ${i} chats no WhatsApp Web` })
    }

    setEnviando(false)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <Rocket className="w-8 h-8 text-marco-azul" /> Disparo em massa
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Filtros */}
          <div className="bg-white rounded-2xl ring-soft p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Filter className="w-4 h-4" /> 1. Destinatários
              </h3>
              <span className="text-sm font-bold text-marco-azul">{destinatarios.length}</span>
            </div>
            <div className="space-y-2">
              <select value={filtroEnv} onChange={e => setFiltroEnv(e.target.value)} className="input">
                <option value="">Todos envolvimentos</option>
                <option value="Não trabalhado">Não trabalhado</option>
                <option value="Em prospecção">Em prospecção</option>
                <option value="Conquistado">Conquistado</option>
                <option value="Perdido">Perdido</option>
              </select>
              <select value={filtroBairro} onChange={e => setFiltroBairro(e.target.value)} className="input">
                <option value="">Todos bairros</option>
                {bairros.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <select value={filtroNicho} onChange={e => setFiltroNicho(e.target.value)} className="input">
                <option value="">Todos nichos</option>
                {(config?.nichos ?? []).map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={somenteComTel} onChange={e => setSomenteComTel(e.target.checked)} />
                Apenas com telefone
              </label>
            </div>

            {/* Preview lista */}
            <div className="mt-3 max-h-48 overflow-y-auto scrollbar-thin border-t border-slate-100 pt-2">
              {destinatarios.slice(0, 10).map(e => (
                <div key={e.id} className="flex items-center gap-2 text-xs py-1">
                  <div className="w-6 h-6 rounded-full bg-marco-azul text-white font-bold text-[10px] flex items-center justify-center">
                    {iniciais(e.nome)}
                  </div>
                  <span className="flex-1 truncate text-slate-700">{e.nome}</span>
                  <span className="text-slate-400">{e.telefone || 'sem tel'}</span>
                </div>
              ))}
              {destinatarios.length > 10 && (
                <div className="text-xs text-slate-400 text-center mt-1">+ {destinatarios.length - 10}</div>
              )}
            </div>
          </div>

          {/* Mensagem */}
          <div className="bg-white rounded-2xl ring-soft p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> 2. Mensagem
              </h3>
              <div className="text-xs flex gap-3">
                <label className="flex items-center gap-1">
                  <input type="radio" checked={!usarCustom} onChange={() => setUsarCustom(false)} />
                  Template
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" checked={usarCustom} onChange={() => setUsarCustom(true)} />
                  Custom
                </label>
              </div>
            </div>
            {!usarCustom ? (
              <select value={templateId} onChange={e => setTemplateId(e.target.value)} className="input">
                <option value="">— Escolha —</option>
                {(config?.mensagens_padrao ?? []).map(t => (
                  <option key={t.id} value={t.id}>{t.nome} ({t.categoria})</option>
                ))}
              </select>
            ) : (
              <textarea value={conteudoCustom} onChange={e => setConteudoCustom(e.target.value)} rows={5}
                placeholder="Olá {{nome}}, ..." className="input" />
            )}
            <div className="mt-3 bg-emerald-50 border border-emerald-100 rounded-lg p-3">
              <div className="text-xs font-bold text-emerald-700 mb-1">PRÉVIA (1º destinatário)</div>
              <div className="text-sm text-slate-700 whitespace-pre-line">{previewMsg}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Modo */}
          <div className="bg-white rounded-2xl ring-soft p-5">
            <h3 className="font-bold text-slate-800 mb-3">3. Modo de envio</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className={`border-2 rounded-xl p-3 cursor-pointer flex items-start gap-2 ${modo === 'navegador' ? 'border-marco-azul bg-marco-azul/5' : 'border-slate-200'}`}>
                <input type="radio" value="navegador" checked={modo === 'navegador'} onChange={() => setModo('navegador')} className="mt-1" />
                <div>
                  <div className="font-bold text-sm">🌐 Navegador</div>
                  <div className="text-xs text-slate-500">Abre wa.me um por vez. Bom pra revisar.</div>
                </div>
              </label>
              <label className={`border-2 rounded-xl p-3 cursor-pointer flex items-start gap-2 ${modo === 'n8n' ? 'border-marco-azul bg-marco-azul/5' : 'border-slate-200'}`}>
                <input type="radio" value="n8n" checked={modo === 'n8n'} onChange={() => setModo('n8n')} className="mt-1" />
                <div>
                  <div className="font-bold text-sm">⚙️ Via n8n</div>
                  <div className="text-xs text-slate-500">Servidor cuida do ritmo. Funciona com aba fechada.</div>
                </div>
              </label>
            </div>

            {modo === 'n8n' && (
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div>
                  <label className="text-xs text-slate-500">Min (segundos)</label>
                  <input type="number" min={2} value={intervaloMin} onChange={e => setIntervaloMin(Number(e.target.value))} className="input" />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Max (segundos)</label>
                  <input type="number" min={2} value={intervaloMax} onChange={e => setIntervaloMax(Number(e.target.value))} className="input" />
                </div>
              </div>
            )}
          </div>

          {/* Botão */}
          <button
            onClick={disparar}
            disabled={enviando}
            className="w-full bg-marco-azul hover:bg-marco-azul-esc text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 text-lg"
          >
            {enviando ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {enviando ? 'Disparando...' : `🚀 Disparar para ${destinatarios.length}`}
          </button>

          {resultado && (
            <div className={`rounded-xl p-4 flex items-start gap-2 ${resultado.ok ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'}`}>
              {resultado.ok ? <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" /> : <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />}
              <div className="text-sm">{resultado.msg}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
