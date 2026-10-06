import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { getToken, setToken, getUser, forgetGist } from '../lib/github'
import { syncProgress } from '../utils/sync'
import { CHANGE_EVENT } from '../utils/storage'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

// Picks up the token that /api/auth/callback puts in the URL fragment after GitHub sign-in.
function takeTokenFromUrl() {
  const hash = new URLSearchParams(window.location.hash.slice(1))
  const token = hash.get('token')
  const error = hash.get('error')
  if (token || error) window.history.replaceState(null, '', window.location.pathname + window.location.search)
  if (token) setToken(token)
  return error
}

// Tracks who is signed in and keeps their progress synced:
// on sign-in, when you come back to the tab, and shortly after anything is saved.
export function AuthProvider({ children }) {
  const [token, setTok]       = useState(null)
  const [user, setUser]       = useState(null)
  const [ready, setReady]     = useState(false)
  const [authError, setAuthError] = useState(null)
  const [status, setStatus]   = useState('idle') // idle | syncing | synced | error
  const [lastSynced, setLastSynced] = useState(null)
  // Bumped when another device's progress is merged in, so pages re-read what's saved.
  const [dataVersion, setDataVersion] = useState(0)
  const running = useRef(false)
  const again   = useRef(false)

  const signOut = useCallback(() => {
    setToken(null); forgetGist(); setTok(null); setUser(null); setStatus('idle')
  }, [])

  useEffect(() => {
    setAuthError(takeTokenFromUrl())
    const t = getToken()
    if (!t) { setReady(true); return }
    getUser(t)
      .then(u => { setTok(t); setUser({ login: u.login, name: u.name, avatar: u.avatar_url }) })
      .catch(e => { if (e.status === 401) signOut() })
      .finally(() => setReady(true))
  }, [signOut])

  const sync = useCallback(async () => {
    if (!token) return
    if (running.current) { again.current = true; return }
    running.current = true
    setStatus('syncing')
    try {
      do {
        again.current = false
        if (await syncProgress(token)) setDataVersion(v => v + 1)
      } while (again.current)
      setStatus('synced')
      setLastSynced(new Date())
    } catch (e) {
      console.error('Progress sync failed', e)
      if (e.status === 401) signOut()
      else setStatus('error')
    } finally {
      running.current = false
    }
  }, [token, signOut])

  // Sync as soon as someone is signed in, then keep syncing while they are.
  useEffect(() => {
    if (!user) return
    sync()

    let timer
    const onChange = () => { clearTimeout(timer); timer = setTimeout(sync, 1500) }
    const onVisible = () => { if (document.visibilityState === 'visible') sync() }
    window.addEventListener(CHANGE_EVENT, onChange)
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      clearTimeout(timer)
      window.removeEventListener(CHANGE_EVENT, onChange)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [user, sync])

  const signIn = () => { window.location.href = '/api/auth/login' }

  return (
    <AuthContext.Provider value={{
      ready, user, authError, status, lastSynced, dataVersion,
      signIn, signOut: async () => { await sync(); signOut() }, syncNow: sync,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
