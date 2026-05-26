// Cliente n8n — chama workflows por webhook
import type { AppConfig } from '@/features/config/api'

export interface N8nResult<T = unknown> {
  ok: boolean
  data?: T
  status?: number
  erro?: string
  ms: number
}

type N8nCfg = Pick<AppConfig, 'n8n_url' | 'n8n_api_key' | 'n8n_auth_header' | 'n8n_webhooks'>

export class N8nClient {
  private cfg: N8nCfg
  constructor(cfg: N8nCfg) {
    this.cfg = cfg
  }

  get isConfigured() {
    return !!this.cfg.n8n_url
  }

  private resolveUrl(workflow: string): string | null {
    const mapped = this.cfg.n8n_webhooks?.[workflow] ?? workflow
    if (!mapped) return null
    if (/^https?:\/\//i.test(mapped)) return mapped
    const base = (this.cfg.n8n_url || '').replace(/\/+$/, '')
    if (!base) return null
    return base + (mapped.startsWith('/') ? mapped : `/webhook/${mapped}`)
  }

  async call<T = unknown>(workflow: string, payload: Record<string, unknown> = {}): Promise<N8nResult<T>> {
    const inicio = Date.now()
    const url = this.resolveUrl(workflow)
    if (!url) return { ok: false, erro: 'webhook não configurado', ms: 0 }

    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    const keyHeader = (this.cfg.n8n_auth_header || '').trim() || 'X-N8N-API-KEY'
    if (this.cfg.n8n_api_key?.trim()) headers[keyHeader] = this.cfg.n8n_api_key.trim()

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ origem: 'mazyos-v2', workflow, ...payload }),
      })
      const ct = res.headers.get('content-type') || ''
      const data = ct.includes('application/json') ? await res.json() : await res.text()
      return {
        ok: res.ok,
        data: data as T,
        status: res.status,
        erro: res.ok ? undefined : `HTTP ${res.status}`,
        ms: Date.now() - inicio,
      }
    } catch (err) {
      return {
        ok: false,
        erro: err instanceof Error ? err.message : 'erro de rede',
        ms: Date.now() - inicio,
      }
    }
  }

  async testar(workflow: string) {
    return this.call(workflow, { teste: true, mensagem: 'Ping do painel MazyOS v2' })
  }
}
