import { createClient } from '@supabase/supabase-js'

const env = import.meta.env
const url = env.VITE_SUPABASE_URL      || env.NEXT_PUBLIC_SUPABASE_URL
const key = env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

// null when sign-in isn't set up — the app then works as before, saving only in this browser.
// Implicit flow lets a sign-in link emailed to you work even if opened in a different browser.
export const supabase = url && key
  ? createClient(url, key, { auth: { flowType: 'implicit', persistSession: true, detectSessionInUrl: true } })
  : null
