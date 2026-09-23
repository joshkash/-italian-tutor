import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { syncProgress } from '../utils/sync'
import { CHANGE_EVENT } from '../utils/storage'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

// Tracks who is signed in and keeps their progress synced:
// on sign-in, when you come back to the tab, and shortly after anything is saved.
export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [ready, setReady]     = useState(!supabase)
  const [status, setStatus]   = useState('idle') // idle | syncing | synced | error
  const [lastSynced, setLastSynced] = useState(null)
  // Bumped when another device's progress is merged in, so pages re-read what's saved.
  const [dataVersion, setDataVersion] = useState(0)
  const running = useRef(false)
  const again   = useRef(false)

  const sync = useCallback(async (u) => {
    if (!supabase || !u) return
    if (running.current) { again.current = true; return }
    running.current = true
    setStatus('syncing')
    try {
      do {
        again.current = false
        const changed = await syncProgress(u.id)
        if (changed) setDataVersion(v => v + 1)
      } while (again.current)
      setStatus('synced')
      setLastSynced(new Date())
    } catch (e) {
      console.error('Progress sync failed', e)
      setStatus('error')
    } finally {
      running.current = false
    }
  }, [])

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  // Sync whenever someone signs in, then keep syncing while they're signed in.
  useEffect(() => {
    if (!user) return
    sync(user)

    let timer
    const onChange = () => { clearTimeout(timer); timer = setTimeout(() => sync(user), 1500) }
    const onVisible = () => { if (document.visibilityState === 'visible') sync(user) }
    window.addEventListener(CHANGE_EVENT, onChange)
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      clearTimeout(timer)
      window.removeEventListener(CHANGE_EVENT, onChange)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [user, sync])

  const signIn = async (email) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/account` },
    })
    if (error) throw error
  }

  const verifyCode = async (email, token) => {
    const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })
    if (error) throw error
  }

  const signOut = async () => {
    await sync(user)
    await supabase.auth.signOut()
    setStatus('idle')
  }

  return (
    <AuthContext.Provider value={{
      enabled: !!supabase, ready, user, status, lastSynced, dataVersion,
      signIn, verifyCode, signOut, syncNow: () => sync(user),
    }}>
      {children}
    </AuthContext.Provider>
  )
}
