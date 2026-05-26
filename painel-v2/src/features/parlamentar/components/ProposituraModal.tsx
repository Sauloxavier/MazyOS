import { useState, useEffect } from 'react'
import { Save, Trash2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { useSalvarPropositura, useDeletarPropositura } from '@/features/parlamentar/hooks'
import type { Propositura, PropositulaInsert } from '@/features/parlamentar/api'

const TIPOS = ['Projeto de Lei', 'Requerimento', 'Moção', 'Ofício', 'Indicação', 'Projeto de Resolução', 'Projeto de Decreto Legislativo']
const STATUS = ['Em elaboração', 'Protocolado', 'Em tramitação', 'Aprovado', 'Rejeitado', 'Arquivado']

interface Props {
  open: boolean
  onClose: () => void
  propositura?: Propositura | null
}

export function ProposituraModal({ open, onClose, propositura }: Props) {
  const salvar = useSalvarPropositura()
  const deletar = useDeletarPropositura()

  const [form, setForm] = useState<PropositulaInsert>({
    tipo: 'Projeto de Lei',
    numero: null,
    ano: new Date().getFullYear(),
    titulo: '',
    descricao: null,
    status: 'Em elaboração',
    data_protocolo: null,
    data_aprovacao: null,
    coautores: null,
    link_pdf: null,
    observacoes: null,
  })

  useEffect(() => {
    if (propositura) {
      setForm({
        tipo: propositura.tipo,
        numero: propositura.numero,
        ano: propositura.ano,
        titulo: propositura.titulo,
        descricao: propositura.descricao,
        status: propositura.status,
        data_protocolo: propositura.data_protocolo,
        data_aprovacao: propositura.data_aprovacao,
        coautores: propositura.coautores,
        link_pdf: propositura.link_pdf,
        observacoes: propositura.observacoes,
      })
    } else if (open) {
      setForm({
        tipo: 'Projeto de Lei', numero: null, ano: new Date().getFullYear(),
        titulo: '', descricao: null, status: 'Em elaboração',
        data_protocolo: null, data_aprovacao: null, coautores: null,
        link_pdf: null, observacoes: null,
      })
    }
  }, [propositura, open])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.titulo.trim() || !form.tipo) return
    try {
      await salvar.mutateAsync({ id: propositura?.id, ...form })
      onClose()
    } catch (err) {
      alert('Erro: ' + (err as Error).message)
    }
  }
  async function onDelete() {
    if (!propositura) return
    if (!confirm(`Excluir "${propositura.titulo}"?`)) return
    await deletar.mutateAsync(propositura.id)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={propositura ? 'Editar propositura' : 'Nova propositura'} size="lg">
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
        <Field label="Descrição">
          <textarea value={form.descricao ?? ''} onChange={e => setForm(f => ({ ...f, descricao: e.target.value || null }))} rows={3} className="input" />
        </Field>
        <Field label="Coautores">
          <input value={form.coautores ?? ''} onChange={e => setForm(f => ({ ...f, coautores: e.target.value || null }))} placeholder="Vereador Fulano, Vereadora Beltrana" className="input" />
        </Field>
        <Field label="Link do PDF">
          <input value={form.link_pdf ?? ''} onChange={e => setForm(f => ({ ...f, link_pdf: e.target.value || null }))} placeholder="https://..." className="input" />
        </Field>
        <Field label="Observações">
          <textarea value={form.observacoes ?? ''} onChange={e => setForm(f => ({ ...f, observacoes: e.target.value || null }))} rows={2} className="input" />
        </Field>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          {propositura ? (
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
