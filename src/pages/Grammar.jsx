import { useState, useEffect } from 'react'
import { grammarLessons } from '../data/grammar'

const levelBadge = {
  A1: 'bg-green-100 text-green-700',
  A2: 'bg-blue-100  text-blue-700',
  B1: 'bg-yellow-100 text-yellow-700',
  B2: 'bg-orange-100 text-orange-700',
  C1: 'bg-red-100   text-red-700',
}

// Highlight a word inside a sentence
function Highlighted({ text, word }) {
  if (!word || !text.includes(word)) return <span>{text}</span>
  const parts = text.split(word)
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <mark className="bg-terra-100 text-terra-700 px-1 rounded font-bold not-italic">
              {word}
            </mark>
          )}
        </span>
      ))}
    </>
  )
}

export default function Grammar() {
  const [selected, setSelected]           = useState(grammarLessons[0])
  const [completed, setCompleted]         = useState([])

  useEffect(() => {
    setCompleted(JSON.parse(localStorage.getItem('italianTutor_completedLessons') || '[]'))
  }, [])

  const toggleComplete = (id) => {
    const next = completed.includes(id)
      ? completed.filter(x => x !== id)
      : [...completed, id]
    setCompleted(next)
    localStorage.setItem('italianTutor_completedLessons', JSON.stringify(next))
  }

  // Group lessons by level
  const byLevel = grammarLessons.reduce((acc, l) => {
    ;(acc[l.level] ||= []).push(l)
    return acc
  }, {})

  return (
    <div className="page-enter max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-4xl font-bold text-navy-900">Grammar 📚</h1>
        <p className="text-gray-500 mt-1">
          {completed.length} of {grammarLessons.length} lessons completed
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Sidebar ─────────────────────────────────────── */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
            {Object.entries(byLevel).map(([level, lessons]) => (
              <div key={level}>
                <div className="px-4 py-2 bg-stone-50 border-b border-stone-100 flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${levelBadge[level]}`}>
                    {level}
                  </span>
                  <span className="text-xs text-gray-400">
                    {lessons.filter(l => completed.includes(l.id)).length}/{lessons.length}
                  </span>
                </div>
                {lessons.map(lesson => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelected(lesson)}
                    className={`w-full text-left px-4 py-3 border-b border-stone-50 flex items-center gap-3 transition-all
                      ${selected.id === lesson.id
                        ? 'bg-terra-50 border-l-4 border-l-terra-500 text-terra-800'
                        : 'hover:bg-stone-50 text-gray-700'}`}
                  >
                    <span className={`w-5 h-5 rounded-full flex-shrink-0 border-2 flex items-center justify-center text-[10px]
                      ${completed.includes(lesson.id)
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-stone-300'}`}
                    >
                      {completed.includes(lesson.id) ? '✓' : ''}
                    </span>
                    <span className="text-sm font-medium leading-tight">{lesson.title}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* ── Lesson content ───────────────────────────────── */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full inline-block mb-3 ${levelBadge[selected.level]}`}>
                  {selected.level}
                </span>
                <h2 className="font-display text-3xl font-bold text-navy-900">{selected.title}</h2>
                <p className="text-gray-500 mt-1.5">{selected.description}</p>
              </div>
              <button
                onClick={() => toggleComplete(selected.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors
                  ${completed.includes(selected.id)
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-stone-100 text-gray-600 hover:bg-stone-200'}`}
              >
                {completed.includes(selected.id) ? '✓ Completed' : 'Mark Complete'}
              </button>
            </div>

            {/* Theory */}
            <section className="mb-8">
              <h3 className="font-display text-lg font-semibold text-navy-900 mb-3">Explanation</h3>
              <p className="text-gray-600 leading-relaxed bg-cream rounded-xl p-4">{selected.theory}</p>
            </section>

            {/* Table */}
            {selected.table && (
              <section className="mb-8">
                <h3 className="font-display text-lg font-semibold text-navy-900 mb-3">Reference Table</h3>
                <div className="overflow-x-auto rounded-xl border border-stone-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-navy-900 text-white">
                        {selected.table.headers.map((h, i) => (
                          <th key={i} className="px-4 py-3 text-left font-semibold whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {selected.table.rows.map((row, ri) => (
                        <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className={`px-4 py-3 ${ci === 0 ? 'font-display font-bold text-terra-600 text-base' : 'text-gray-700'}`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Examples */}
            <section className="mb-8">
              <h3 className="font-display text-lg font-semibold text-navy-900 mb-3">Examples</h3>
              <div className="space-y-3">
                {selected.examples.map((ex, i) => (
                  <div key={i} className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                    <p className="text-navy-900 font-medium italic font-display text-base">
                      <Highlighted text={ex.italian} word={ex.highlight} />
                    </p>
                    <p className="text-gray-500 text-sm mt-1">{ex.english}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Tips */}
            <section>
              <h3 className="font-display text-lg font-semibold text-navy-900 mb-3">💡 Tips</h3>
              <div className="space-y-2">
                {selected.tips.map((tip, i) => (
                  <div key={i} className="flex gap-3 bg-gold/10 rounded-xl p-4 border border-gold/20">
                    <span className="text-gold font-bold text-sm mt-0.5 flex-shrink-0">{i + 1}.</span>
                    <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
