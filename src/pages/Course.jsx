import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { courseDays } from '../data/course'
import { vocabulary } from '../data/vocabulary'
import { grammarLessons } from '../data/grammar'

const levelBadge = {
  A1: 'bg-green-100 text-green-700',
  A2: 'bg-blue-100  text-blue-700',
  B1: 'bg-yellow-100 text-yellow-700',
  B2: 'bg-orange-100 text-orange-700',
  C1: 'bg-red-100   text-red-700',
}

// A small word card that flips between Italian and English on click
function WordCard({ word }) {
  const [show, setShow] = useState(false)
  return (
    <button
      onClick={() => setShow(s => !s)}
      className="text-left bg-cream rounded-xl p-4 border border-stone-100 hover:border-terra-200 transition-colors"
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-display text-lg font-bold text-navy-900">{word.italian}</span>
        <span className="text-[10px] text-gray-300 italic">/{word.pronunciation}/</span>
      </div>
      {show ? (
        <>
          <p className="text-terra-600 text-sm font-medium mt-1">{word.english}</p>
          <p className="text-gray-500 text-xs mt-1.5">{word.example_it}</p>
          <p className="text-gray-400 text-xs italic">{word.example_en}</p>
        </>
      ) : (
        <p className="text-gray-300 text-xs mt-1">tap to reveal</p>
      )}
    </button>
  )
}

export default function Course() {
  const [completed, setCompleted] = useState([])
  const [openDay, setOpenDay]     = useState(null)

  useEffect(() => {
    setCompleted(JSON.parse(localStorage.getItem('italianTutor_courseProgress') || '[]'))
  }, [])

  const toggleComplete = (day) => {
    const next = completed.includes(day) ? completed.filter(d => d !== day) : [...completed, day]
    setCompleted(next)
    localStorage.setItem('italianTutor_courseProgress', JSON.stringify(next))
  }

  const pct = Math.round((completed.length / courseDays.length) * 100)
  const selected = openDay ? courseDays.find(d => d.day === openDay) : null
  const selectedWords = selected ? vocabulary.filter(w => w.day === selected.day) : []
  const selectedGrammar = selected?.grammarId ? grammarLessons.find(g => g.id === selected.grammarId) : null

  // ── Day detail view ─────────────────────────────────────────────────────
  if (selected) {
    return (
      <div className="page-enter max-w-3xl mx-auto px-4 py-8">
        <button onClick={() => setOpenDay(null)} className="text-sm text-gray-500 hover:text-terra-500 mb-5 flex items-center gap-1">
          ← Back to roadmap
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-display text-terra-500 font-bold">Day {selected.day}</span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${levelBadge[selected.level]}`}>{selected.level}</span>
              </div>
              <h1 className="font-display text-3xl font-bold text-navy-900">{selected.title}</h1>
              <p className="text-gray-500 mt-1.5">🎯 {selected.goal}</p>
            </div>
            <button
              onClick={() => toggleComplete(selected.day)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors
                ${completed.includes(selected.day)
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-terra-500 text-white hover:bg-terra-600'}`}
            >
              {completed.includes(selected.day) ? '✓ Completed' : 'Mark Complete'}
            </button>
          </div>

          {/* Cultural tip */}
          <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 mb-7 flex gap-3">
            <span className="text-xl">💡</span>
            <p className="text-gray-700 text-sm leading-relaxed">{selected.tip}</p>
          </div>

          {/* Grammar focus */}
          {selectedGrammar && (
            <div className="mb-7">
              <h2 className="font-display text-lg font-semibold text-navy-900 mb-2">Grammar Focus</h2>
              <Link
                to="/grammar"
                className="block bg-navy-900 text-white rounded-xl p-4 hover:bg-navy-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">📚 {selectedGrammar.title}</p>
                    <p className="text-gray-400 text-sm mt-0.5">{selectedGrammar.description}</p>
                  </div>
                  <span className="text-terra-300 text-sm">Open →</span>
                </div>
              </Link>
            </div>
          )}

          {/* Vocabulary */}
          {selectedWords.length > 0 && (
            <div className="mb-7">
              <h2 className="font-display text-lg font-semibold text-navy-900 mb-3">
                Today's Words <span className="text-gray-400 text-sm font-sans">({selectedWords.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedWords.map(w => <WordCard key={w.id} word={w} />)}
              </div>
            </div>
          )}

          {/* Practice CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link to="/flashcards" className="flex-1 text-center bg-terra-500 hover:bg-terra-600 text-white py-3 rounded-xl font-medium transition-colors">
              Practice in Flashcards 🃏
            </Link>
            <Link to="/quizzes" className="flex-1 text-center bg-stone-100 hover:bg-stone-200 text-gray-700 py-3 rounded-xl font-medium transition-colors">
              Take a Quiz ✏️
            </Link>
          </div>

          {/* Prev / Next day */}
          <div className="flex justify-between mt-7 pt-5 border-t border-stone-100">
            <button
              onClick={() => setOpenDay(selected.day - 1)}
              disabled={selected.day === 1}
              className="text-sm text-gray-500 hover:text-terra-500 disabled:opacity-30"
            >← Day {selected.day - 1}</button>
            <button
              onClick={() => setOpenDay(selected.day + 1)}
              disabled={selected.day === courseDays.length}
              className="text-sm text-gray-500 hover:text-terra-500 disabled:opacity-30"
            >Day {selected.day + 1} →</button>
          </div>
        </div>
      </div>
    )
  }

  // ── Roadmap view ────────────────────────────────────────────────────────
  return (
    <div className="page-enter max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mb-2">
          {courseDays.length}-Day Italian Course 🇮🇹
        </h1>
        <p className="text-gray-500 text-lg">
          A guided path from "Ciao" to conversation. One day at a time.
        </p>
      </div>

      {/* Progress header */}
      <div className="bg-navy-900 rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
        <div className="absolute -top-6 -right-6 text-[120px] opacity-5 leading-none select-none">📅</div>
        <div className="relative">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-terra-300 text-xs font-semibold tracking-widest uppercase">Your Progress</p>
              <p className="font-display text-3xl font-bold mt-1">Day {completed.length} of {courseDays.length}</p>
            </div>
            <span className="font-display text-4xl font-bold text-gold">{pct}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-terra-500 to-gold rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courseDays.map(d => {
          const done = completed.includes(d.day)
          return (
            <button
              key={d.day}
              onClick={() => setOpenDay(d.day)}
              className={`text-left rounded-2xl p-5 border transition-all hover:-translate-y-0.5 hover:shadow-md
                ${done ? 'bg-green-50 border-green-200' : 'bg-white border-stone-100 hover:border-terra-200'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm
                  ${done ? 'bg-green-500 text-white' : 'bg-terra-500 text-white'}`}>
                  {done ? '✓' : d.day}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${levelBadge[d.level]}`}>{d.level}</span>
              </div>
              <p className="font-display font-bold text-navy-900 leading-tight">{d.title}</p>
              <p className="text-gray-400 text-xs mt-1.5 line-clamp-2">{d.goal}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
