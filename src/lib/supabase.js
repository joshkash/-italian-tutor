import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// null when sign-in isn't set up — the app then works as before, saving only in this browser.
// Implicit flow lets a sign-in link emailed to you work even if opened in a different browser.
export const supabase = url && key
  ? createClient(url, key, { auth: { flowType: 'implicit', persistSession: true, detectSessionInUrl: true } })
  : null
