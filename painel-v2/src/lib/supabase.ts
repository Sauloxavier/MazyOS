import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  throw new Error('Faltam VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY em .env.local')
}

export const supabase = createClient<Database>(url, anonKey, {
  auth: {
    storageKey: 'mx_supabase_auth',
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  // Realtime desativado por padrão (Easypanel Supabase sem realtime habilitado)
  realtime: { params: { eventsPerSecond: 0 } },
})

export type SupabaseClient = typeof supabase
