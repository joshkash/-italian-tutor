import { useState } from 'react'
import { vocabulary, levels } from '../data/vocabulary'
import { sentences } from '../data/sentences'

// ── Question generator ─────────────────────────────────────────────────────
function buildQuestions(level, count, type, contentType) {
  const wordPool = (level === 'All' ? vocabulary : vocabulary.filter(w => w.level === level))
    .map(w => ({ ...w, kind: 'word' }))
  const sentPool = (level === 'All' ? sentences : sentences.filter(s => s.level === level))
    .map(s => ({ ...s, kind: 'sentence' }))

  const pool = contentType === 'words' ? wordPool
    : contentType === 'sentences' ? sentPool
    : [...wordPool, ...sentPool]

  if (pool.length < 4) return []
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, Math.min(count, shuffled.length))

  return selected.map(item => {
    const sameKind = pool.filter(p => p.kind === item.kind && p.id !== item.id)
    const otherKind = pool.filter(p => p.kind !== item.kind)
    const distractors = [...sameKind, ...otherKind]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    if (type === 'it-en') {
      const opts = [item.english, ...distractors.map(d => d.english)].sort(() => Math.random() - 0.5)
      const sub = item.kind === 'sentence' ? '🗣️ Sentence' : `/${item.pronunciation}/`
      return { prompt: item.italian, sub, correct: item.english, options: opts, flag: '🇮🇹 → 🇬🇧', kind: item.kind }
    } else {
      const opts = [item.italian, ...distractors.map(d => d.italian)].sort(() => Math.random() - 0.5)
      return { prompt: item.english, sub: `${item.category} · ${item.level}`, correct: item.italian, options: opts, flag: '🇬🇧 → 🇮🇹', kind: item.kind }
    }
  })
}

// ── Grade helpers ──────────────────────────────────────────────────────────
const GRADES = {
  A: { label: 'Eccellente!',     color: 'text-green-600',  bg: 'bg-green-50',  emoji: '🏆' },
  B: { label: 'Molto Bene!',     color: 'text-blue-600',   bg: 'bg-blue-50',   emoji: '⭐' },
  C: { label: 'Bene!',           color: 'text-yellow-600', bg: 'bg-yellow-50', emoji: '👍' },
  D: { label: 'Da Migliorare',   color: 'text-orange-600', bg: 'bg-orange-50', emoji: '📚' },
  F: { label: 'Riprova!',        color: 'text-red-600',    bg: 'bg-red-50',    emoji: '💪' },
}
const grade = (pct) => pct >= 90 ? 'A' : pct >= 75 ? 'B' : pct >= 60 ? 'C' : pct >= 50 ? 'D' : 'F'

// ── Component ──────────────────────────────────────────────────────────────
export default function Quizzes() {
  const [screen, setScreen]     = useState('setup')   // setup | quiz | results
  const [cfg, setCfg]           = useState({ level: 'A1', count: 10, type: 'it-en', contentType: 'words' })
  const [questions, setQs]      = useState([])
  const [qi, setQi]             = useState(0)
  const [picked, setPicked]     = useState(null)
  const [score, setScore]       = useState(0)
  const [log, setLog]           = useState([])

  const startQuiz = () => {
    const qs = buildQuestions(cfg.level, cfg.count, cfg.type, cfg.contentType)
    if (!qs.length) return
    setQs(qs); setQi(0); setPicked(null); setScore(0); setLog([]); setScreen('quiz')
  }

  const pick = (opt) => {
    if (picked !== null) return
    setPicked(opt)
    const correct = opt === questions[qi].correct
    if (correct) setScore(s => s + 1)
    setLog(l => [...l, { prompt: questions[qi].prompt, correct, answer: questions[qi].correct, picked: opt }])
  }

  const next = () => {
    setPicked(null)
    if (qi < questions.length - 1) {
      setQi(i => i + 1)
    } else {
      const stats = JSON.parse(localStorage.getItem('italianTutor_quizStats') || '{"count":0}')
      localStorage.setItem('italianTutor_quizStats', JSON.stringify({ count: stats.count + 1 }))
      setScreen('results')
    }
  }

  // ── Setup screen ──────────────────────────────────────────────────────────
  if (screen === 'setup') return (
    <div className="page-enter max-w-xl mx-auto px-4 py-10">
      <h1 className="font-display text-4xl font-bold text-navy-900 mb-2">Quizzes ✏️</h1>
      <p className="text-gray-500 mb-8">Test your Italian knowledge</p>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 space-y-7">
        {/* Level */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Level</label>
          <div className="flex flex-wrap gap-2">
            {['All', ...levels].map(l => (
              <button key={l}
                onClick={() => setCfg(c => ({ ...c, level: l }))}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors
                  ${cfg.level === l ? 'bg-terra-500 text-white' : 'bg-stone-100 text-gray-600 hover:bg-stone-200'}`}
              >{l}</button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Number of Questions</label>
          <div className="flex gap-2">
            {[5, 10, 15, 20].map(n => (
              <button key={n}
                onClick={() => setCfg(c => ({ ...c, count: n }))}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors
                  ${cfg.count === n ? 'bg-navy-900 text-white' : 'bg-stone-100 text-gray-600 hover:bg-stone-200'}`}
              >{n}</button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Content</label>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'words', label: 'Words' },
              { key: 'sentences', label: 'Sentences' },
              { key: 'mixed', label: 'Mixed' },
            ].map(ct => (
              <button key={ct.key}
                onClick={() => setCfg(c => ({ ...c, contentType: ct.key }))}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors
                  ${cfg.contentType === ct.key ? 'bg-terra-500 text-white' : 'bg-stone-100 text-gray-600 hover:bg-stone-200'}`}
              >{ct.label}</button>
            ))}
          </div>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Direction</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'it-en', label: '🇮🇹 → 🇬🇧', sub: 'Italian to English' },
              { key: 'en-it', label: '🇬🇧 → 🇮🇹', sub: 'English to Italian' },
            ].map(t => (
              <button key={t.key}
                onClick={() => setCfg(c => ({ ...c, type: t.key }))}
                className={`p-4 rounded-xl border-2 text-left transition-colors
                  ${cfg.type === t.key ? 'border-terra-500 bg-terra-50' : 'border-stone-200 hover:border-stone-300'}`}
              >
                <div className="font-semibold text-navy-900 mb-0.5">{t.label}</div>
                <div className="text-sm text-gray-400">{t.sub}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={startQuiz}
          className="w-full bg-terra-500 hover:bg-terra-600 text-white py-4 rounded-xl font-semibold text-lg transition-colors"
        >
          Start Quiz →
        </button>
      </div>
    </div>
  )

  // ── Results screen ────────────────────────────────────────────────────────
  if (screen === 'results') {
    const pct  = Math.round((score / questions.length) * 100)
    const g    = grade(pct)
    const info = GRADES[g]
    return (
      <div className="page-enter max-w-xl mx-auto px-4 py-10">
        <div className={`${info.bg} rounded-3xl p-10 text-center mb-5`}>
          <div className="text-6xl mb-3">{info.emoji}</div>
          <h2 className={`font-display text-4xl font-bold ${info.color} mb-2`}>{info.label}</h2>
          <p className="text-gray-500 mb-4">{score} out of {questions.length} correct</p>
          <div className={`font-display text-7xl font-bold ${info.color}`}>{pct}%</div>
          <div className={`inline-block mt-2 px-4 py-1 rounded-full bg-white font-bold text-2xl ${info.color}`}>
            Grade: {g}
          </div>
        </div>

        {/* Answer log */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 mb-5">
          <h3 className="font-display text-lg font-semibold text-navy-900 mb-3">Answer Review</h3>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {log.map((a, i) => (
              <div key={i} className={`flex items-start gap-2 p-2.5 rounded-xl text-sm
                ${a.correct ? 'bg-green-50' : 'bg-red-50'}`}
              >
                <span className="mt-0.5">{a.correct ? '✅' : '❌'}</span>
                <div>
                  <span className="font-medium text-navy-900">{a.prompt}</span>
                  {!a.correct && (
                    <span className="text-gray-400 ml-2">→ <span className="text-navy-900 font-medium">{a.answer}</span></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={startQuiz}
            className="flex-1 bg-terra-500 hover:bg-terra-600 text-white py-3 rounded-xl font-medium transition-colors"
          >Try Again</button>
          <button onClick={() => setScreen('setup')}
            className="flex-1 bg-stone-100 hover:bg-stone-200 text-gray-700 py-3 rounded-xl font-medium transition-colors"
          >New Quiz</button>
        </div>
      </div>
    )
  }

  // ── Quiz screen ───────────────────────────────────────────────────────────
  const q        = questions[qi]
  const progress = ((qi + 1) / questions.length) * 100

  return (
    <div className="page-enter max-w-xl mx-auto px-4 py-10">
      {/* Progress */}
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>Question {qi + 1} of {questions.length}</span>
        <span className="text-terra-500 font-semibold">Score: {score}</span>
      </div>
      <div className="h-2 bg-stone-100 rounded-full mb-8 overflow-hidden">
        <div className="h-full bg-terra-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {/* Question card */}
      <div className="bg-navy-900 rounded-3xl p-8 text-center mb-5">
        <p className="text-gray-400 text-sm mb-2">{q.flag} — Translate</p>
        <h2 className={`font-display font-bold text-white mb-3 ${q.kind === 'sentence' ? 'text-2xl md:text-3xl' : 'text-5xl'}`}>{q.prompt}</h2>
        <p className="text-gray-600 text-sm italic">{q.sub}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-5">
        {q.options.map((opt, i) => {
          let cls = 'bg-white border-2 border-stone-200 text-navy-900 hover:border-terra-300'
          if (picked !== null) {
            if (opt === q.correct)      cls = 'bg-green-50 border-2 border-green-400 text-green-700'
            else if (opt === picked)    cls = 'bg-red-50 border-2 border-red-400 text-red-700'
            else                        cls = 'bg-white border-2 border-stone-100 text-gray-300'
          }
          return (
            <button key={i} onClick={() => pick(opt)} disabled={picked !== null}
              className={`${cls} w-full px-5 py-4 rounded-xl text-left font-medium transition-all`}
            >
              <span className="text-gray-400 text-sm mr-3">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          )
        })}
      </div>

      {/* Feedback + next */}
      {picked !== null && (
        <>
          <div className={`mb-4 p-4 rounded-xl text-center font-medium
            ${picked === q.correct ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
          >
            {picked === q.correct
              ? '✓ Esatto! Ottimo lavoro!'
              : `✗ The correct answer is: ${q.correct}`}
          </div>
          <button onClick={next}
            className="w-full bg-terra-500 hover:bg-terra-600 text-white py-4 rounded-xl font-semibold text-lg transition-colors"
          >
            {qi < questions.length - 1 ? 'Next Question →' : 'See Results →'}
          </button>
        </>
      )}
    </div>
  )
}
