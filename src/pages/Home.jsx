import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { vocabulary } from '../data/vocabulary'
import { grammarLessons } from '../data/grammar'

const DAYS_IT   = ['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato']
const MONTHS_IT = ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre']

function italianDate() {
  const d = new Date()
  return `${DAYS_IT[d.getDay()]}, ${d.getDate()} ${MONTHS_IT[d.getMonth()]} ${d.getFullYear()}`
}

const features = [
  {
    to: '/flashcards', icon: '🃏', title: 'Flashcards',
    desc: 'Learn vocabulary with flip cards organised by level and topic.',
    bg: 'bg-terra-500', hover: 'hover:bg-terra-600', stat: 'knownWords', statLabel: 'words known',
  },
  {
    to: '/grammar',    icon: '📚', title: 'Grammar',
    desc: 'Master grammar through clear explanations, tables and examples.',
    bg: 'bg-navy-900', hover: 'hover:bg-navy-800', stat: 'completedLessons', statLabel: 'lessons done',
  },
  {
    to: '/quizzes',    icon: '✏️', title: 'Quizzes',
    desc: 'Test your knowledge with translation and multiple-choice exercises.',
    bg: 'bg-olive',    hover: 'hover:opacity-90',   stat: 'quizzesCompleted', statLabel: 'quizzes taken',
  },
  {
    to: '/chat',       icon: '💬', title: 'AI Chat',
    desc: 'Practice conversation with Sofia, your personal Italian tutor.',
    bg: 'bg-gold',     hover: 'hover:opacity-90',   stat: 'chatMessages', statLabel: 'messages sent',
  },
]

export default function Home() {
  const [stats, setStats] = useState({ knownWords: 0, completedLessons: 0, quizzesCompleted: 0, chatMessages: 0 })
  const [wordOfDay, setWordOfDay] = useState(null)

  useEffect(() => {
    const known   = JSON.parse(localStorage.getItem('italianTutor_knownWords')      || '[]')
    const lessons = JSON.parse(localStorage.getItem('italianTutor_completedLessons')|| '[]')
    const quiz    = JSON.parse(localStorage.getItem('italianTutor_quizStats')       || '{"count":0}')
    const chat    = JSON.parse(localStorage.getItem('italianTutor_chatStats')       || '{"count":0}')
    setStats({ knownWords: known.length, completedLessons: lessons.length, quizzesCompleted: quiz.count, chatMessages: chat.count })
    setWordOfDay(vocabulary[new Date().getDate() % vocabulary.length])
  }, [])

  const progressPct = Math.round((stats.knownWords / vocabulary.length) * 100)

  return (
    <div className="page-enter max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="mb-10">
        <p className="text-terra-500 text-xs font-semibold tracking-widest uppercase mb-2">{italianDate()}</p>
        <h1 className="font-display text-5xl md:text-6xl text-navy-900 font-bold mb-3">Benvenuto! 🇮🇹</h1>
        <p className="text-gray-500 text-lg max-w-xl">
          Your journey to mastering <em className="font-display text-terra-500">La Bella Lingua</em> continues.
          What will you learn today?
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Words Known',       value: stats.knownWords,       total: vocabulary.length,      icon: '🧠' },
          { label: 'Lessons Complete',  value: stats.completedLessons, total: grammarLessons.length,  icon: '📖' },
          { label: 'Quizzes Taken',     value: stats.quizzesCompleted, icon: '🏆' },
          { label: 'Chat Messages',     value: stats.chatMessages,     icon: '💬' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="font-display text-3xl font-bold text-navy-900">{s.value}</div>
            {s.total && <div className="text-xs text-gray-400 mb-0.5">of {s.total} total</div>}
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl p-6 mb-10 shadow-sm border border-stone-100">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-display text-xl font-semibold text-navy-900">Vocabulary Progress</h2>
          <span className="text-terra-500 font-bold text-lg">{progressPct}%</span>
        </div>
        <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-terra-600 to-terra-400 rounded-full transition-all duration-1000"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {stats.knownWords} of {vocabulary.length} vocabulary words mastered
        </p>
      </div>

      {/* Feature cards */}
      <h2 className="font-display text-2xl font-semibold text-navy-900 mb-5">Where to Practice</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {features.map(f => (
          <Link
            key={f.to}
            to={f.to}
            className={`${f.bg} ${f.hover} rounded-2xl p-6 text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex items-start gap-4`}
          >
            <div className="text-4xl">{f.icon}</div>
            <div className="flex-1">
              <div className="font-display text-xl font-bold mb-1">{f.title}</div>
              <div className="text-sm opacity-75">{f.desc}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-bold text-xl">{stats[f.stat]}</div>
              <div className="text-xs opacity-60">{f.statLabel}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Word of the day */}
      {wordOfDay && (
        <div className="bg-navy-900 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute -top-4 -right-4 text-[140px] opacity-5 leading-none select-none pointer-events-none">
            🇮🇹
          </div>
          <div className="relative">
            <p className="text-terra-300 text-xs font-semibold tracking-widest uppercase mb-3">✨ Parola del Giorno</p>
            <h2 className="font-display text-5xl font-bold mb-2">{wordOfDay.italian}</h2>
            <p className="text-gray-500 italic text-sm mb-4 font-display">/{wordOfDay.pronunciation}/</p>
            <p className="text-xl text-gold mb-5">{wordOfDay.english}</p>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-white font-medium">{wordOfDay.example_it}</p>
              <p className="text-gray-400 text-sm mt-1">{wordOfDay.example_en}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <span className="bg-terra-500/30 text-terra-300 text-xs px-3 py-1 rounded-full">{wordOfDay.level}</span>
              <span className="bg-white/10 text-gray-300 text-xs px-3 py-1 rounded-full">{wordOfDay.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
