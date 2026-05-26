import { create } from 'zustand'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import type { Perfil } from '@/lib/database.types'

export interface AuthState {
  session: Session | null
  user: User | null
  perfil: Perfil | null
  loading: boolean
  init: () => Promise<void>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshPerfil: () => Promise<void>
  isAdmin: () => boolean
}

export const useAuth = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  perfil: null,
  loading: true,

  async init() {
    const { data } = await supabase.auth.getSession()
    set({ session: data.session, user: data.session?.user ?? null })
    await get().refreshPerfil()
    set({ loading: false })

    supabase.auth.onAuthStateChange(async (_event, session) => {
      set({ session, user: session?.user ?? null })
      await get().refreshPerfil()
    })
  },

  async signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error: error.message }
    return { error: null }
  },

  async signOut() {
    await supabase.auth.signOut()
    set({ session: null, user: null, perfil: null })
  },

  async refreshPerfil() {
    const userId = get().user?.id
    if (!userId) { set({ perfil: null }); return }
    // Compat v1: perfis.id é o próprio user_id
    const { data, error } = await supabase
      .from('perfis')
      .select('*')
      .eq('id', userId)
      .maybeSingle()
    if (error) {
      console.warn('[refreshPerfil]', error)
      set({ perfil: null })
      return
    }
    set({ perfil: (data ?? null) as any })
  },

  isAdmin() {
    return get().perfil?.papel === 'admin'
  },
}))
