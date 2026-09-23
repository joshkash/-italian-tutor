import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Also expose the public Supabase vars that Vercel's Supabase integration sets
  // (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY). Never widen this to
  // SUPABASE_ — that would ship the service-role key to the browser.
  envPrefix: ['VITE_', 'NEXT_PUBLIC_SUPABASE_'],
})
