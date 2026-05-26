import { useState, useEffect } from 'react'
import { Save, Trash2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { useSalvarEmenda, useDeletarEmenda } from '@/features/parlamentar/hooks'
import type { Emenda, EmendaInsert } from '@/features/parlamentar/api'

const TIPOS = ['Emenda Aditiva', 'Emenda Modificativa', 'Emenda Supressiva', 'Emenda Substitutiva', 'Emenda Impositiva']
const STATUS = ['Em elaboração', 'Protocolado', 'Aprovada', 'Rejeitada', 'Executada']
const AREAS = ['Saúde', 'Educação', 'Esporte/Cultura', 'Infraestrutura', 'Assistência Social', 'Segurança', 'Outras']

interface Props {
  open: boolean
  onClose: () => void
  emenda?: Emenda | null
}

export function EmendaModal({ open, onClose, emenda }: Props) {
  const salvar = useSalvarEmenda()
  const deletar = useDeletarEmenda()

  const [form, setForm] = useState<EmendaInsert>({
    tipo: 'Emenda Impositiva',
    numero: null,
    ano: new Date().getFullYear(),
    titulo: '',
    descricao: null,
    area: null,
    valor: 0,
    beneficiario: null,
    status: 'Em elaboração',
    data_protocolo: null,
    observacoes: null,
  })

  useEffect(() => {
    if (emenda) {
      setForm({
        tipo: emenda.tipo,
        numero: emenda.numero,
        ano: emenda.ano,
        titulo: emenda.titulo,
        descricao: emenda.descricao,
        area: emenda.area,
        valor: emenda.valor,
        beneficiario: emenda.beneficiario,
        status: emenda.status,
        data_protocolo: emenda.data_protocolo,
        observacoes: emenda.observacoes,
      })
    } else if (open) {
      setForm({
        tipo: 'Emenda Impositiva', numero: null, ano: new Date().getFullYear(),
        titulo: '', descricao: null, area: null, valor: 0, beneficiario: null,
        status: 'Em elaboração', data_protocolo: null, observacoes: null,
      })
    }
  }, [emenda, open])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.titulo.trim()) return
    try {
      await salvar.mutateAsync({ id: emenda?.id, ...form })
      onClose()
    } catch (err) {
      alert('Erro: ' + (err as Error).message)
    }
  }
  async function onDelete() {
    if (!emenda) return
    if (!confirm(`Excluir "${emenda.titulo}"?`)) return
    await deletar.mutateAsync(emenda.id)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={emenda ? 'Editar emenda' : 'Nova emenda'} size="lg">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Tipo *">
            <select value={form.tipo} onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))} required className="input">
              {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select value={form.status ?? 'Em elaboração'} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="input">
              {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Título *">
          <input value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} required className="input" />
        </Field>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Número">
            <input value={form.numero ?? ''} onChange={e => setForm(f => ({ ...f, numero: e.target.value || null }))} className="input" />
          </Field>
          <Field label="Ano">
            <input type="number" value={form.ano} onChange={e => setForm(f => ({ ...f, ano: Number(e.target.value) }))} className="input" />
          </Field>
          <Field label="Protocolo">
            <input type="date" value={form.data_protocolo ?? ''} onChange={e => setForm(f => ({ ...f, data_protocolo: e.target.value || null }))} className="input" />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Área">
            <select value={form.area ?? ''} onChange={e => setForm(f => ({ ...f, area: e.target.value || null }))} className="input">
              <option value="">—</option>
              {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </Field>
          <Field label="Valor (R$)">
            <input type="number" step="0.01" value={form.valor ?? 0} onChange={e => setForm(f => ({ ...f, valor: Number(e.target.value) }))} className="input" />
          </Field>
        </div>
        <Field label="Beneficiário">
          <input value={form.beneficiario ?? ''} onChange={e => setForm(f => ({ ...f, beneficiario: e.target.value || null }))} placeholder="Ex: APAE Limeira, Hospital São João" className="input" />
        </Field>
        <Field label="Descrição">
          <textarea value={form.descricao ?? ''} onChange={e => setForm(f => ({ ...f, descricao: e.target.value || null }))} rows={3} className="input" />
        </Field>
        <Field label="Observações">
          <textarea value={form.observacoes ?? ''} onChange={e => setForm(f => ({ ...f, observacoes: e.target.value || null }))} rows={2} className="input" />
        </Field>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          {emenda ? (
            <button type="button" onClick={onDelete} className="text-rose-500 hover:bg-rose-50 px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1">
              <Trash2 className="w-4 h-4" /> Excluir
            </button>
          ) : <div />}
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancelar</button>
            <button type="submit" disabled={salvar.isPending} className="bg-marco-azul hover:bg-marco-azul-esc text-white font-bold px-5 py-2 rounded-lg text-sm flex items-center gap-2 disabled:opacity-50">
              <Save className="w-4 h-4" /> {salvar.isPending ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
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
