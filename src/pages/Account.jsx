import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { timeAgo } from '../utils/courseProgress'

export default function Account() {
  const { enabled, ready, user, status, lastSynced, signIn, verifyCode, signOut, syncNow } = useAuth()
  const [email, setEmail]   = useState('')
  const [code, setCode]     = useState('')
  const [sent, setSent]     = useState(false)
  const [busy, setBusy]     = useState(false)
  const [error, setError]   = useState('')

  const run = (fn) => async (e) => {
    e?.preventDefault()
    setBusy(true); setError('')
    try { await fn() } catch (err) { setError(err.message || 'Something went wrong') }
    setBusy(false)
  }

  const card = 'bg-white rounded-3xl p-8 shadow-sm border border-stone-100'
  const input = 'w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-terra-400 focus:outline-none'
  const button = 'w-full py-3 rounded-xl bg-terra-500 hover:bg-terra-600 text-white font-medium disabled:opacity-50'

  return (
    <div className="page-enter max-w-md mx-auto px-4 py-12">
      <h1 className="font-display text-4xl font-bold text-navy-900 mb-2">Your account</h1>
      <p className="text-gray-500 mb-8">Sign in to save your progress and continue on any device.</p>

      {!enabled && (
        <div className={card}>
          <p className="font-medium text-navy-900 mb-2">Sign-in isn't set up yet</p>
          <p className="text-sm text-gray-500">
            Add <code className="bg-cream px-1 rounded">VITE_SUPABASE_URL</code> and{' '}
            <code className="bg-cream px-1 rounded">VITE_SUPABASE_ANON_KEY</code> to your environment
            (see the README). Until then, progress is saved in this browser only.
          </p>
        </div>
      )}

      {enabled && !ready && <p className="text-gray-400">Loading…</p>}

      {enabled && ready && user && (
        <div className={card}>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-12 rounded-full bg-terra-500 text-white flex items-center justify-center font-display text-xl font-bold">
              {user.email?.[0]?.toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="text-xs text-gray-400">Signed in as</p>
              <p className="font-medium text-navy-900 truncate">{user.email}</p>
            </div>
          </div>
          <div className="bg-cream rounded-xl p-4 mb-6 text-sm">
            {status === 'syncing' && <p className="text-gray-500">⟳ Syncing your progress…</p>}
            {status === 'synced'  && <p className="text-green-700">✓ Progress synced{lastSynced && ` ${timeAgo(lastSynced.toISOString())}`}</p>}
            {status === 'error'   && <p className="text-red-600">Couldn't sync — check your connection and try again.</p>}
            {status === 'idle'    && <p className="text-gray-500">Waiting to sync…</p>}
            <p className="text-gray-400 mt-1">Sign in with the same email on another device to pick up where you left off.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={syncNow} className="flex-1 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-gray-700 font-medium">Sync now</button>
            <button onClick={run(signOut)} disabled={busy} className="flex-1 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-medium">Sign out</button>
          </div>
          <Link to="/course" className="block text-center text-sm text-terra-500 hover:text-terra-600 mt-5">Continue your course →</Link>
        </div>
      )}

      {enabled && ready && !user && !sent && (
        <form onSubmit={run(async () => { await signIn(email.trim()); setSent(true) })} className={card}>
          <label className="block text-sm font-medium text-navy-900 mb-2" htmlFor="email">Email</label>
          <input
            id="email" type="email" required autoComplete="email" value={email}
            onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className={`${input} mb-4`}
          />
          <button disabled={busy} className={button}>{busy ? 'Sending…' : 'Email me a sign-in link'}</button>
          <p className="text-xs text-gray-400 mt-4">No password needed. Any progress on this device is kept and added to your account.</p>
          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        </form>
      )}

      {enabled && ready && !user && sent && (
        <form onSubmit={run(() => verifyCode(email.trim(), code.trim()))} className={card}>
          <p className="text-4xl mb-3">📬</p>
          <p className="font-medium text-navy-900">Check your email</p>
          <p className="text-sm text-gray-500 mb-5">
            We sent a sign-in link to <strong>{email}</strong>. Open it on this device, or type the code from the email here.
          </p>
          <input
            inputMode="numeric" autoComplete="one-time-code" value={code}
            onChange={e => setCode(e.target.value)} placeholder="Code from email" className={`${input} mb-3 tracking-widest`}
          />
          <button disabled={busy || !code.trim()} className={button}>{busy ? 'Checking…' : 'Sign in with code'}</button>
          <button type="button" onClick={() => { setSent(false); setCode(''); setError('') }} className="w-full text-sm text-gray-500 hover:text-terra-500 mt-4">
            Use a different email
          </button>
          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        </form>
      )}
    </div>
  )
}
