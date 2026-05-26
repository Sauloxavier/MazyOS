import { create } from 'zustand'
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error' | 'warn' | 'info'

interface Toast {
  id: string
  type: ToastType
  msg: string
}

interface ToastStore {
  toasts: Toast[]
  push: (type: ToastType, msg: string, durationMs?: number) => void
  remove: (id: string) => void
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  push: (type, msg, durationMs = 4000) => {
    const id = Math.random().toString(36).slice(2)
    set(s => ({ toasts: [...s.toasts, { id, type, msg }] }))
    setTimeout(() => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })), durationMs)
  },
  remove: (id) => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })),
}))

// Helpers
export const toast = {
  success: (msg: string) => useToast.getState().push('success', msg),
  error: (msg: string) => useToast.getState().push('error', msg, 6000),
  warn: (msg: string) => useToast.getState().push('warn', msg),
  info: (msg: string) => useToast.getState().push('info', msg),
}

export function ToastContainer() {
  const { toasts, remove } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map(t => <ToastItem key={t.id} toast={t} onClose={() => remove(t.id)} />)}
    </div>
  )
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  useEffect(() => {
    // animação de entrada via class CSS
  }, [])

  const cfg = {
    success: { icon: CheckCircle2, cor: 'bg-emerald-500', txt: 'text-emerald-50' },
    error: { icon: XCircle, cor: 'bg-rose-500', txt: 'text-rose-50' },
    warn: { icon: AlertTriangle, cor: 'bg-amber-500', txt: 'text-amber-50' },
    info: { icon: Info, cor: 'bg-marco-azul', txt: 'text-white' },
  }[toast.type]

  const Icon = cfg.icon

  return (
    <div
      role="status"
      className={cn(
        cfg.cor, cfg.txt,
        'rounded-xl shadow-lg p-3 pr-2 flex items-start gap-2 min-w-[240px] animate-[slideIn_0.2s_ease-out]'
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 text-sm font-medium">{toast.msg}</div>
      <button onClick={onClose} className="opacity-70 hover:opacity-100 p-0.5">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
