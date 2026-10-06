import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { timeAgo } from '../utils/courseProgress'

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
)

export default function Account() {
  const { ready, user, authError, status, lastSynced, signIn, signOut, syncNow } = useAuth()
  const card = 'bg-white rounded-3xl p-8 shadow-sm border border-stone-100'

  return (
    <div className="page-enter max-w-md mx-auto px-4 py-12">
      <h1 className="font-display text-4xl font-bold text-navy-900 mb-2">Your account</h1>
      <p className="text-gray-500 mb-8">Sign in to save your progress and continue on any device.</p>

      {!ready && <p className="text-gray-400">Loading…</p>}

      {ready && user && (
        <div className={card}>
          <div className="flex items-center gap-4 mb-6">
            <img src={user.avatar} alt="" className="w-12 h-12 rounded-full" />
            <div className="min-w-0">
              <p className="text-xs text-gray-400">Signed in with GitHub as</p>
              <p className="font-medium text-navy-900 truncate">{user.name || user.login} <span className="text-gray-400 font-normal">@{user.login}</span></p>
            </div>
          </div>
          <div className="bg-cream rounded-xl p-4 mb-6 text-sm">
            {status === 'syncing' && <p className="text-gray-500">⟳ Syncing your progress…</p>}
            {status === 'synced'  && <p className="text-green-700">✓ Progress synced{lastSynced && ` ${timeAgo(lastSynced.toISOString())}`}</p>}
            {status === 'error'   && <p className="text-red-600">Couldn't sync — check your connection and try again.</p>}
            {status === 'idle'    && <p className="text-gray-500">Waiting to sync…</p>}
            <p className="text-gray-400 mt-1">Saved in a private gist on your GitHub account. Sign in on another device to pick up where you left off.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={syncNow} className="flex-1 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-gray-700 font-medium">Sync now</button>
            <button onClick={signOut} className="flex-1 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-medium">Sign out</button>
          </div>
          <Link to="/course" className="block text-center text-sm text-terra-500 hover:text-terra-600 mt-5">Continue your course →</Link>
        </div>
      )}

      {ready && !user && (
        <div className={card}>
          <button onClick={signIn} className="w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-medium flex items-center justify-center gap-2.5">
            <GitHubIcon /> Sign in with GitHub
          </button>
          <p className="text-xs text-gray-400 mt-4">
            Your progress is saved to a private gist on your GitHub account. Any progress already on this device is kept and added to it.
          </p>
          {authError && <p className="text-sm text-red-600 mt-3">{authError}</p>}
        </div>
      )}
    </div>
  )
}
