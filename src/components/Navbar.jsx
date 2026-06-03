import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/',           label: 'Home',       icon: '🏠' },
  { to: '/course',     label: 'Course',     icon: '📅' },
  { to: '/flashcards', label: 'Flashcards', icon: '🃏' },
  { to: '/grammar',    label: 'Grammar',    icon: '📚' },
  { to: '/quizzes',    label: 'Quizzes',    icon: '✏️' },
  { to: '/chat',       label: 'AI Chat',    icon: '💬' },
]

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900 shadow-lg">
      {/* Italian flag stripe */}
      <div className="h-1 flag-stripe" />

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="text-2xl">🇮🇹</span>
          <div>
            <div className="font-display font-bold text-white text-lg leading-none group-hover:text-terra-300 transition-colors">
              La Bella Lingua
            </div>
            <div className="text-[10px] text-terra-400 tracking-widest uppercase">Learn Italian</div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                flex items-center gap-1.5
                ${location.pathname === link.to
                  ? 'bg-terra-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'}
              `}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-900 border-t border-white/10 px-4 py-3 flex flex-col gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`
                px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2
                ${location.pathname === link.to
                  ? 'bg-terra-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'}
              `}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
