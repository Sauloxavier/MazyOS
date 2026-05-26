import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Upload, Users, ClipboardList, CheckCircle2, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useQueryClient } from '@tanstack/react-query'
import { lerCSV, parseCSVLine, parseDataBr } from '@/lib/csv'

export const Route = createFileRoute('/_authed/importar')({
  component: ImportarPage,
})

function ImportarPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <Upload className="w-8 h-8 text-marco-azul" /> Importar dados
      </h1>

      <div className="space-y-6">
        <ImportEleitores />
        <ImportTarefas />
      </div>
    </div>
  )
}

function ImportEleitores() {
  const qc = useQueryClient()
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onFile(ev: React.ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0]
    if (!file) return
    setLoading(true)
    setStatus(null)

    try {
      const { linhas, sep } = await lerCSV(file)
      if (linhas.length < 2) {
        setStatus('❌ CSV vazio ou sem linhas.')
        return
      }
      const header = parseCSVLine(linhas[0], sep).map(h => h.trim().toLowerCase())
      const idx = {
        nome: header.findIndex(h => h === 'nome' || h.includes('nome')),
        telefone: header.findIndex(h => h.includes('telefone') || h.includes('celular') || h.includes('whatsapp')),
        cpf: header.findIndex(h => h === 'cpf'),
        sexo: header.findIndex(h => h === 'sexo'),
        nascimento: header.findIndex(h => h.includes('nasc') || h.includes('aniversário') || h.includes('aniversario')),
        bairro: header.findIndex(h => h === 'bairro'),
        endereco: header.findIndex(h => h === 'endereco' || h === 'endereço'),
        email: header.findIndex(h => h === 'email' || h === 'e-mail'),
        envolvimento: header.findIndex(h => h === 'envolvimento'),
        marcadores: header.findIndex(h => h === 'marcadores'),
        nichos: header.findIndex(h => h === 'nichos' || h === 'categorias'),
        obs: header.findIndex(h => h === 'obs' || h === 'observacoes' || h === 'observações'),
      }

      const rows = []
      for (let i = 1; i < linhas.length; i++) {
        const cols = parseCSVLine(linhas[i], sep)
        const nome = (cols[idx.nome] ?? '').trim()
        if (!nome) continue
        rows.push({
          nome,
          telefone: idx.telefone >= 0 ? (cols[idx.telefone] ?? '').trim() || null : null,
          cpf: idx.cpf >= 0 ? (cols[idx.cpf] ?? '').trim() || null : null,
          sexo: idx.sexo >= 0 ? (cols[idx.sexo] ?? '').trim() || null : null,
          nascimento: idx.nascimento >= 0 ? parseDataBr(cols[idx.nascimento]) : null,
          bairro: idx.bairro >= 0 ? (cols[idx.bairro] ?? '').trim() || null : null,
          endereco: idx.endereco >= 0 ? (cols[idx.endereco] ?? '').trim() || null : null,
          email: idx.email >= 0 ? (cols[idx.email] ?? '').trim() || null : null,
          envolvimento: (idx.envolvimento >= 0 ? cols[idx.envolvimento]?.trim() : 'Não trabalhado') || 'Não trabalhado',
          marcadores: idx.marcadores >= 0 ? (cols[idx.marcadores] ?? '').split(/[,;]/).map(s => s.trim()).filter(Boolean) : [],
          nichos: idx.nichos >= 0 ? (cols[idx.nichos] ?? '').split(/[,;]/).map(s => s.trim()).filter(Boolean) : [],
          obs: idx.obs >= 0 ? (cols[idx.obs] ?? '').trim() || null : null,
        })
      }

      if (!confirm(`Importar ${rows.length} eleitor(es)?`)) {
        setLoading(false); return
      }

      // Insere em lotes de 50
      let ok = 0, falhas = 0
      for (let i = 0; i < rows.length; i += 50) {
        const lote = rows.slice(i, i + 50)
        try {
          const { error } = await (supabase.from('eleitores') as any).insert(lote)
          if (error) throw error
          ok += lote.length
        } catch (err) {
          console.warn(err)
          falhas += lote.length
        }
        setStatus(`☁️ Sincronizando ${ok}/${rows.length}...`)
      }

      qc.invalidateQueries({ queryKey: ['eleitores'] })
      setStatus(falhas === 0
        ? `✓ ${ok} eleitores importados com sucesso!`
        : `⚠ ${ok} importados, ${falhas} falharam`)
    } catch (err) {
      setStatus('❌ Erro: ' + (err as Error).message)
    } finally {
      setLoading(false)
      ev.target.value = ''
    }
  }

  return (
    <div className="bg-white rounded-2xl ring-soft p-6">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-black text-lg text-slate-800">Eleitores</h2>
          <p className="text-sm text-slate-500">Lista de pessoas pra cadastrar como contatos no banco.</p>
        </div>
      </div>
      <div className="bg-slate-50 rounded-lg p-3 mb-4 font-mono text-xs text-slate-700 overflow-x-auto">
        nome;telefone;cpf;sexo;nascimento;bairro;endereco;email;envolvimento;marcadores;nichos;obs
      </div>
      <ul className="text-sm text-slate-500 space-y-1 mb-4 list-disc list-inside">
        <li><b>nome</b> é obrigatório, resto opcional</li>
        <li><b>nascimento</b>: aceita 1975-02-13 ou 13/02/1975</li>
        <li><b>marcadores</b> e <b>nichos</b>: separados por vírgula ou ponto-e-vírgula</li>
        <li>Separador: <b>;</b> ou <b>,</b> · Encoding: UTF-8 ou Windows-1252 (auto-detecta)</li>
      </ul>
      <label className="inline-flex items-center gap-2 bg-marco-azul text-white font-bold px-6 py-3 rounded-xl hover:bg-marco-azul-esc cursor-pointer">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
        {loading ? 'Importando...' : 'Escolher CSV de eleitores'}
        <input type="file" accept=".csv,text/csv" onChange={onFile} className="hidden" disabled={loading} />
      </label>
      {status && <div className="mt-3 text-sm font-semibold">{status}</div>}
    </div>
  )
}

function ImportTarefas() {
  const qc = useQueryClient()
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onFile(ev: React.ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0]
    if (!file) return
    setLoading(true)
    setStatus(null)

    try {
      const { linhas, sep } = await lerCSV(file)
      if (linhas.length < 2) {
        setStatus('❌ CSV vazio.')
        return
      }
      // CSV histórico: Categoria,Status,Assessoria,Data início,Nome,Telefone,Pedido,Obs,Grupo,Data Término
      const IDX = { categoria: 0, status: 1, assessoria: 2, dataInicio: 3, nome: 4, telefone: 5, pedido: 6, observacao: 7, grupo: 8 }

      const mapStatus = (s: string) => {
        const t = (s || '').toLowerCase().trim()
        if (t.includes('conclu')) return 'Resolvida'
        if (t.includes('andamento')) return 'Em andamento'
        if (t.includes('não iniciada') || t.includes('nao iniciada')) return 'Aberta'
        if (t.includes('pulada') || t.includes('cancel')) return 'Cancelada'
        return 'Aberta'
      }
      const normTel = (s: string) => {
        const n = (s || '').replace(/\D/g, '')
        if (!n) return null
        return n.startsWith('55') ? n : '55' + n
      }

      const registros = []
      for (let i = 1; i < linhas.length; i++) {
        const cols = parseCSVLine(linhas[i], sep)
        const nome = (cols[IDX.nome] ?? '').trim().replace(/\s+/g, ' ')
        if (!nome) continue
        registros.push({
          categoria: (cols[IDX.categoria] ?? '').trim() || 'Outros',
          status: mapStatus(cols[IDX.status]),
          assessoria: (cols[IDX.assessoria] ?? '').trim(),
          dataInicio: parseDataBr(cols[IDX.dataInicio]) ?? '2023-01-01',
          nome,
          telefone: normTel(cols[IDX.telefone]),
          pedido: (cols[IDX.pedido] ?? '').trim(),
          observacao: (cols[IDX.observacao] ?? '').trim(),
          grupo: (cols[IDX.grupo] ?? '').trim(),
        })
      }

      // Agrupa por (nome+tel) → 1 eleitor por pessoa
      const eleitoresMap = new Map<string, { id?: string; nome: string; telefone: string | null; nichos: Set<string> }>()
      const demandasParaCriar: Array<{ eleitor_id: string; tipo: string; status: string; descricao: string; data: string; notas: string; origem: string }> = []

      for (const r of registros) {
        const key = `${r.nome.toLowerCase()}|${r.telefone ?? ''}`
        let el = eleitoresMap.get(key)
        if (!el) {
          el = { nome: r.nome, telefone: r.telefone, nichos: new Set() }
          eleitoresMap.set(key, el)
        }
        if (r.grupo) el.nichos.add(r.grupo)
      }

      if (!confirm(`Encontrei ${eleitoresMap.size} eleitor(es) únicos e ${registros.length} atendimento(s). Confirmar importação?`)) {
        setLoading(false); return
      }

      // Insere eleitores em lote, captura IDs
      const eleitoresList = [...eleitoresMap.values()].map(e => ({
        nome: e.nome,
        telefone: e.telefone,
        nichos: [...e.nichos],
        envolvimento: 'Conquistado',
        obs: `Importado em ${new Date().toISOString().slice(0, 10)}`,
      }))

      setStatus('☁️ Inserindo eleitores...')
      let okE = 0
      const idsCriados: string[] = []
      for (let i = 0; i < eleitoresList.length; i += 50) {
        const lote = eleitoresList.slice(i, i + 50)
        try {
          const { data, error } = await (supabase.from('eleitores') as any).insert(lote).select('id, nome, telefone')
          if (error) throw error
          for (const row of data ?? []) idsCriados.push(row.id)
          // mapeia ids de volta
          for (const row of data ?? []) {
            const key = `${row.nome.toLowerCase()}|${row.telefone ?? ''}`
            const el = eleitoresMap.get(key)
            if (el) el.id = row.id
          }
          okE += lote.length
          setStatus(`☁️ Eleitores: ${okE}/${eleitoresList.length}`)
        } catch (err) {
          console.warn(err)
        }
      }

      // Agora cria demandas
      for (const r of registros) {
        const key = `${r.nome.toLowerCase()}|${r.telefone ?? ''}`
        const el = eleitoresMap.get(key)
        if (!el?.id) continue
        demandasParaCriar.push({
          eleitor_id: el.id,
          tipo: r.categoria,
          status: r.status,
          descricao: r.pedido || r.categoria,
          data: r.dataInicio,
          notas: [r.observacao, r.assessoria ? `Assessoria: ${r.assessoria}` : ''].filter(Boolean).join('\n'),
          origem: 'Importação histórico (1A)',
        })
      }

      setStatus(`☁️ Inserindo ${demandasParaCriar.length} atendimentos...`)
      let okD = 0
      for (let i = 0; i < demandasParaCriar.length; i += 50) {
        const lote = demandasParaCriar.slice(i, i + 50)
        try {
          const { error } = await (supabase.from('demandas') as any).insert(lote)
          if (error) throw error
          okD += lote.length
        } catch (err) {
          console.warn(err)
        }
        setStatus(`☁️ Atendimentos: ${okD}/${demandasParaCriar.length}`)
      }

      qc.invalidateQueries({ queryKey: ['eleitores'] })
      qc.invalidateQueries({ queryKey: ['demandas'] })
      setStatus(`✓ Pronto! ${okE} eleitores + ${okD} atendimentos importados.`)
    } catch (err) {
      setStatus('❌ Erro: ' + (err as Error).message)
    } finally {
      setLoading(false)
      ev.target.value = ''
    }
  }

  return (
    <div className="bg-white rounded-2xl ring-soft p-6 border-2 border-marco-amarelo/40">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
          <ClipboardList className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-black text-lg text-slate-800">Histórico de tarefas / atendimentos</h2>
          <p className="text-sm text-slate-500">Importa a planilha antiga do gabinete (1A — Controle de Tarefas).</p>
        </div>
      </div>
      <div className="bg-slate-50 rounded-lg p-3 mb-4 font-mono text-xs text-slate-700 overflow-x-auto">
        Categoria,Status,Assessoria,Data início,Nome,Telefone,Pedido,Observação,Grupo,Data Término
      </div>
      <ul className="text-sm text-slate-500 space-y-1 mb-4 list-disc list-inside">
        <li><b>Status</b>: Concluída→Resolvida, Em andamento→Em andamento, Não iniciada→Aberta, Pulada→Cancelada</li>
        <li><b>Categoria</b> (1ª coluna) vira tipo · <b>Grupo</b> vira nicho do eleitor</li>
        <li>Eleitores duplicados (mesmo nome+telefone) viram 1 só · Encoding auto-corrige</li>
        <li>Eleitores criados entram como <strong>Conquistado</strong> (já foram atendidos)</li>
      </ul>
      <label className="inline-flex items-center gap-2 bg-sky-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-sky-700 cursor-pointer">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
        {loading ? 'Importando...' : 'Escolher CSV de tarefas'}
        <input type="file" accept=".csv,text/csv" onChange={onFile} className="hidden" disabled={loading} />
      </label>
      {status && <div className="mt-3 text-sm font-semibold">{status}</div>}
    </div>
  )
}
