import { useState, useEffect } from 'react'
import { Save, Trash2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { useSalvarCompromisso, useDeletarCompromisso } from '@/features/compromissos/hooks'
import type { Compromisso, CompromissoInsert } from '@/features/compromissos/api'

const CORES = [
  { id: '#1E5BBA', label: 'Azul Marco' },
  { id: '#10B981', label: 'Verde' },
  { id: '#F59E0B', label: 'Amarelo' },
  { id: '#F43F5E', label: 'Vermelho' },
  { id: '#A855F7', label: 'Roxo' },
  { id: '#64748B', label: 'Cinza' },
]

interface Props {
  open: boolean
  onClose: () => void
  compromisso?: Compromisso | null
  dataInicial?: string
}

export function CompromissoModal({ open, onClose, compromisso, dataInicial }: Props) {
  const salvar = useSalvarCompromisso()
  const deletar = useDeletarCompromisso()

  const [form, setForm] = useState<CompromissoInsert>({
    titulo: '',
    data: new Date().toISOString().slice(0, 10),
    hora: null,
    local: null,
    descricao: null,
    cor: '#1E5BBA',
    eleitor_id: null,
  })

  useEffect(() => {
    if (compromisso) {
      setForm({
        titulo: compromisso.titulo,
        data: compromisso.data,
        hora: compromisso.hora,
        local: compromisso.local,
        descricao: compromisso.descricao,
        cor: compromisso.cor,
        eleitor_id: compromisso.eleitor_id,
      })
    } else if (open) {
      setForm({
        titulo: '',
        data: dataInicial ?? new Date().toISOString().slice(0, 10),
        hora: null, local: null, descricao: null,
        cor: '#1E5BBA', eleitor_id: null,
      })
    }
  }, [compromisso, open, dataInicial])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.titulo.trim()) return
    try {
      await salvar.mutateAsync({ id: compromisso?.id, ...form })
      onClose()
    } catch (err) {
      alert('Erro: ' + (err as Error).message)
    }
  }
  async function onDelete() {
    if (!compromisso) return
    if (!confirm(`Excluir "${compromisso.titulo}"?`)) return
    await deletar.mutateAsync(compromisso.id)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={compromisso ? 'Editar compromisso' : 'Novo compromisso'} size="md">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Título *">
          <input value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} required className="input" placeholder="Reunião com lideranças, sessão da câmara..." />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Data">
            <input type="date" value={form.data} onChange={e => setForm(f => ({ ...f, data: e.target.value }))} className="input" />
          </Field>
          <Field label="Hora">
            <input type="time" value={form.hora ?? ''} onChange={e => setForm(f => ({ ...f, hora: e.target.value || null }))} className="input" />
          </Field>
        </div>
        <Field label="Local">
          <input value={form.local ?? ''} onChange={e => setForm(f => ({ ...f, local: e.target.value || null }))} className="input" />
        </Field>
        <Field label="Descrição / Pauta">
          <textarea value={form.descricao ?? ''} onChange={e => setForm(f => ({ ...f, descricao: e.target.value || null }))} rows={3} className="input" />
        </Field>
        <div>
          <span className="text-xs font-bold text-slate-600 uppercase mb-1 block">Cor</span>
          <div className="flex gap-2">
            {CORES.map(c => (
              <button
                type="button"
                key={c.id}
                onClick={() => setForm(f => ({ ...f, cor: c.id }))}
                className={`w-8 h-8 rounded-full transition ${form.cor === c.id ? 'ring-2 ring-offset-2 ring-slate-400' : ''}`}
                style={{ background: c.id }}
                title={c.label}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          {compromisso ? (
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
