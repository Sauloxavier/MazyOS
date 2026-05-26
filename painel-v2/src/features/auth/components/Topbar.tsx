import { Menu, Search } from 'lucide-react'
import { useAuth } from '@/store/auth'
import { iniciais } from '@/lib/utils'

interface TopbarProps {
  onMenuClick: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { user, perfil } = useAuth()

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-3 lg:px-8 h-16 flex items-center gap-2 lg:gap-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 -ml-2 text-slate-500"
        aria-label="Abrir menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex-1 max-w-xl flex items-center bg-slate-100 rounded-xl min-w-0">
        <input
          placeholder="Pesquisar eleitor, atendimento, número..."
          className="flex-1 min-w-0 bg-transparent px-4 py-2 text-sm focus:outline-none"
        />
        <Search className="w-5 h-5 mr-3 text-slate-400 flex-shrink-0" />
      </div>

      <div className="hidden lg:block text-right">
        <div className="text-xs font-semibold text-slate-700 leading-tight">
          {perfil?.nome ?? user?.email?.split('@')[0]}
        </div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
          ● Logado
        </div>
      </div>

      <div className="w-10 h-10 rounded-full bg-marco-azul text-white font-bold flex items-center justify-center overflow-hidden">
        {perfil?.avatar_url ? (
          <img src={perfil.avatar_url} alt="" className="w-full h-full object-cover" />
        ) : (
          <span>{iniciais(perfil?.nome ?? user?.email ?? 'M')}</span>
        )}
      </div>
    </header>
  )
}
