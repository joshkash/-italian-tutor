import { useState, useEffect, useMemo } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { courseDays, courseUnits, unitForDay, reviewRanges } from '../data/course'
import { vocabulary } from '../data/vocabulary'
import { grammarLessons } from '../data/grammar'
import { sentences } from '../data/sentences'
import {
  loadProgress, saveStep, recordResult, isUnlocked, nextDayToStudy, timeAgo, PASS_PCT,
} from '../utils/courseProgress'

const levelBadge = {
  A1: 'bg-green-100 text-green-700',
  A2: 'bg-blue-100  text-blue-700',
  B1: 'bg-yellow-100 text-yellow-700',
  B2: 'bg-orange-100 text-orange-700',
  C1: 'bg-red-100   text-red-700',
}

const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
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

// A small sentence card that flips between Italian and English on click
function SentenceCard({ sentence }) {
  const [show, setShow] = useState(false)
  return (
    <button
      onClick={() => setShow(s => !s)}
      className="text-left bg-navy-900 rounded-xl p-4 hover:bg-navy-800 transition-colors"
    >
      <p className="font-display text-white font-medium">{sentence.italian}</p>
      {show ? (
        <p className="text-terra-300 text-sm mt-1.5">{sentence.english}</p>
      ) : (
        <p className="text-gray-500 text-xs mt-1.5">tap to reveal</p>
      )}
    </button>
  )
}

// ── Lesson content helpers ─────────────────────────────────────────────────

const inRange = (item, [from, to]) => item.day >= from && item.day <= to

// Words/sentences the checkpoint quiz draws from: the day's own, or a range for review days.
function quizPool(day) {
  const range = reviewRanges[day]
  const words = vocabulary.filter(w => (range ? inRange(w, range) : w.day === day))
  const sents = sentences.filter(s => (range ? inRange(s, range) : s.day === day))
  return { words, sents }
}

// Build a short multiple-choice quiz (up to 8 questions) for a day.
function buildQuiz(day) {
  const { words, sents } = quizPool(day)
  const pickDistractors = (answer, pool, key) => {
    const own = shuffle(pool.filter(x => x[key] !== answer)).map(x => x[key])
    const extra = shuffle(vocabulary).map(x => x[key]).filter(x => x !== answer)
    return [...new Set([...own, ...extra])].slice(0, 3)
  }

  const wordQs = shuffle(words).slice(0, sents.length ? 5 : 8).map((w, i) => {
    const toEnglish = i % 2 === 0
    const answer = toEnglish ? w.english : w.italian
    const key = toEnglish ? 'english' : 'italian'
    return {
      prompt: toEnglish ? w.italian : w.english,
      hint: toEnglish ? 'What does this mean?' : 'How do you say this in Italian?',
      answer,
      options: shuffle([answer, ...pickDistractors(answer, words, key)]),
    }
  })

  const sentQs = shuffle(sents).slice(0, 8 - wordQs.length).map(s => {
    const others = shuffle(sentences.filter(x => x.id !== s.id && Math.abs(x.day - s.day) <= 3))
    const distractors = [...new Set(others.map(x => x.english))].filter(e => e !== s.english).slice(0, 3)
    return {
      prompt: s.italian,
      hint: 'Translate the sentence',
      answer: s.english,
      options: shuffle([s.english, ...distractors]),
    }
  })

  return shuffle([...wordQs, ...sentQs])
}

// ── Checkpoint quiz ────────────────────────────────────────────────────────

function CheckpointQuiz({ day, onFinish }) {
  const [attempt, setAttempt] = useState(0)
  const questions = useMemo(() => buildQuiz(day), [day, attempt])
  const [index, setIndex]     = useState(0)
  const [picked, setPicked]   = useState(null)
  const [score, setScore]     = useState(0)
  const [result, setResult]   = useState(null) // pct once finished

  const restart = () => {
    setAttempt(a => a + 1); setIndex(0); setPicked(null); setScore(0); setResult(null)
  }

  if (questions.length === 0) {
    return <p className="text-gray-500">There's nothing to quiz on this day yet.</p>
  }

  if (result !== null) {
    const passed = result >= PASS_PCT
    const next = courseDays.find(d => d.day === day + 1)
    return (
      <div className="text-center py-4">
        <div className="text-6xl mb-3">{passed ? '🎉' : '💪'}</div>
        <p className="font-display text-4xl font-bold text-navy-900">{score} / {questions.length}</p>
        <p className={`mt-2 font-medium ${passed ? 'text-green-600' : 'text-terra-600'}`}>
          {passed ? `Passed! Day ${day} is complete.` : `You need ${PASS_PCT}% to pass — give it another go.`}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <button onClick={restart} className="px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-gray-700 font-medium">
            Retake quiz ↻
          </button>
          {passed && next && (
            <Link to={`/course/${next.day}`} className="px-5 py-3 rounded-xl bg-terra-500 hover:bg-terra-600 text-white font-medium">
              Next: Day {next.day} — {next.title} →
            </Link>
          )}
          {passed && !next && (
            <Link to="/course" className="px-5 py-3 rounded-xl bg-terra-500 hover:bg-terra-600 text-white font-medium">
              Back to course 🎓
            </Link>
          )}
        </div>
      </div>
    )
  }

  const q = questions[index]
  const choose = (opt) => {
    if (picked) return
    setPicked(opt)
    if (opt === q.answer) setScore(s => s + 1)
  }
  const advance = () => {
    if (index + 1 < questions.length) {
      setIndex(i => i + 1); setPicked(null)
    } else {
      setResult(onFinish(score, questions.length))
    }
  }

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-400 mb-2">
        <span>Question {index + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden mb-6">
        <div className="h-full bg-terra-500 transition-all" style={{ width: `${(index / questions.length) * 100}%` }} />
      </div>
      <p className="text-gray-400 text-sm">{q.hint}</p>
      <p className="font-display text-2xl font-bold text-navy-900 mt-1 mb-5">{q.prompt}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map(opt => {
          const state = !picked ? 'idle' : opt === q.answer ? 'right' : opt === picked ? 'wrong' : 'dim'
          return (
            <button
              key={opt}
              onClick={() => choose(opt)}
              className={`text-left px-4 py-3 rounded-xl border transition-colors
                ${state === 'idle'  ? 'bg-white border-stone-200 hover:border-terra-300' : ''}
                ${state === 'right' ? 'bg-green-50 border-green-400 text-green-800' : ''}
                ${state === 'wrong' ? 'bg-red-50 border-red-300 text-red-700' : ''}
                ${state === 'dim'   ? 'bg-white border-stone-100 text-gray-400' : ''}`}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {picked && (
        <div className="flex justify-end mt-5">
          <button onClick={advance} className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-medium">
            {index + 1 < questions.length ? 'Next question →' : 'See results'}
          </button>
        </div>
      )}
    </div>
  )
}

// ── Lesson view (one day, step by step) ───────────────────────────────────

function Lesson({ day }) {
  const lesson  = courseDays.find(d => d.day === day)
  const unit    = unitForDay(day)
  const words   = vocabulary.filter(w => w.day === day)
  const sents   = sentences.filter(s => s.day === day)
  const grammar = lesson.grammarId ? grammarLessons.find(g => g.id === lesson.grammarId) : null

  const steps = [
    { id: 'intro', label: 'Overview' },
    words.length   > 0 && { id: 'words',     label: 'Vocabulary' },
    sents.length   > 0 && { id: 'sentences', label: 'Sentences' },
    grammar            && { id: 'grammar',   label: 'Grammar' },
    { id: 'quiz', label: 'Checkpoint' },
  ].filter(Boolean)

  const [progress, setProgress] = useState(loadProgress)
  const [step, setStep] = useState(() => Math.min(progress.steps[day] ?? 0, steps.length - 1))

  useEffect(() => { saveStep(day, step) }, [day, step])

  const goTo = (i) => { setStep(i); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const finishQuiz = (score, total) => {
    const pct = recordResult(day, score, total)
    setProgress(loadProgress())
    return pct
  }

  const done  = progress.completed.includes(day)
  const best  = progress.scores[day]
  const current = steps[step].id

  return (
    <div className="page-enter max-w-3xl mx-auto px-4 py-8">
      <Link to="/course" className="text-sm text-gray-500 hover:text-terra-500 mb-5 inline-flex items-center gap-1">
        ← Course overview
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-100">
        {/* Header */}
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
          Unit {unit.unit} · {unit.title}
        </p>
        <div className="flex items-center gap-3 mb-1">
          <span className="font-display text-terra-500 font-bold">Day {day}</span>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${levelBadge[lesson.level]}`}>{lesson.level}</span>
          {done && <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-green-100 text-green-700">✓ Completed{best != null && ` · ${best}%`}</span>}
        </div>
        <h1 className="font-display text-3xl font-bold text-navy-900">{lesson.title}</h1>

        {/* Stepper */}
        <div className="flex gap-1.5 mt-6 mb-8">
          {steps.map((s, i) => (
            <button key={s.id} onClick={() => goTo(i)} className="flex-1 group">
              <div className={`h-1.5 rounded-full transition-colors ${i <= step ? 'bg-terra-500' : 'bg-stone-200 group-hover:bg-stone-300'}`} />
              <p className={`text-[11px] mt-1.5 truncate ${i === step ? 'text-terra-600 font-semibold' : 'text-gray-400'}`}>{s.label}</p>
            </button>
          ))}
        </div>

        {/* Step content */}
        {current === 'intro' && (
          <div>
            <h2 className="font-display text-xl font-semibold text-navy-900 mb-2">🎯 Today's goal</h2>
            <p className="text-gray-600 mb-6">{lesson.goal}</p>
            <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 mb-6 flex gap-3">
              <span className="text-xl">💡</span>
              <p className="text-gray-700 text-sm leading-relaxed">{lesson.tip}</p>
            </div>
            <h3 className="font-semibold text-navy-900 mb-2 text-sm">In this lesson</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {words.length > 0 && <li>📖 {words.length} new words</li>}
              {sents.length > 0 && <li>💬 {sents.length} key sentences</li>}
              {grammar && <li>📚 Grammar: {grammar.title}</li>}
              {reviewRanges[day] && <li>🔁 Review of days {reviewRanges[day][0]}–{reviewRanges[day][1]}</li>}
              <li>✅ Checkpoint quiz — score {PASS_PCT}% to complete the day</li>
            </ul>
          </div>
        )}

        {current === 'words' && (
          <div>
            <h2 className="font-display text-xl font-semibold text-navy-900 mb-1">Today's words</h2>
            <p className="text-gray-400 text-sm mb-4">Say each word out loud, then tap to check the meaning.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {words.map(w => <WordCard key={w.id} word={w} />)}
            </div>
          </div>
        )}

        {current === 'sentences' && (
          <div>
            <h2 className="font-display text-xl font-semibold text-navy-900 mb-1">Key sentences</h2>
            <p className="text-gray-400 text-sm mb-4">Try translating each one in your head before revealing it.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sents.map(s => <SentenceCard key={s.id} sentence={s} />)}
            </div>
          </div>
        )}

        {current === 'grammar' && grammar && (
          <div>
            <h2 className="font-display text-xl font-semibold text-navy-900 mb-1">📚 {grammar.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">{grammar.theory}</p>
            {grammar.table && (
              <div className="overflow-x-auto mb-5 rounded-xl border border-stone-100">
                <table className="w-full text-sm">
                  <thead className="bg-navy-900 text-white">
                    <tr>{grammar.table.headers.map(h => <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {grammar.table.rows.map((r, i) => (
                      <tr key={i} className={i % 2 ? 'bg-cream' : 'bg-white'}>
                        {r.map((c, j) => <td key={j} className={`px-3 py-2 ${j === 0 ? 'font-bold text-terra-600' : 'text-gray-600'}`}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {grammar.examples?.length > 0 && (
              <div className="space-y-2 mb-5">
                {grammar.examples.map(ex => (
                  <div key={ex.italian} className="bg-cream rounded-xl px-4 py-3">
                    <p className="font-medium text-navy-900">{ex.italian}</p>
                    <p className="text-gray-400 text-sm">{ex.english}</p>
                  </div>
                ))}
              </div>
            )}
            <Link to="/grammar" className="text-sm text-terra-500 hover:text-terra-600">Open the full grammar lesson →</Link>
          </div>
        )}

        {current === 'quiz' && (
          <div>
            <h2 className="font-display text-xl font-semibold text-navy-900 mb-4">✅ Checkpoint quiz</h2>
            <CheckpointQuiz key={day} day={day} onFinish={finishQuiz} />
          </div>
        )}

        {/* Step navigation */}
        {current !== 'quiz' && (
          <div className="flex justify-between items-center mt-8 pt-5 border-t border-stone-100">
            <button
              onClick={() => goTo(step - 1)}
              disabled={step === 0}
              className="text-sm text-gray-500 hover:text-terra-500 disabled:opacity-30"
            >← Back</button>
            <button
              onClick={() => goTo(step + 1)}
              className="px-5 py-2.5 rounded-xl bg-terra-500 hover:bg-terra-600 text-white font-medium"
            >
              {steps[step + 1].id === 'quiz' ? 'Start checkpoint →' : `Continue: ${steps[step + 1].label} →`}
            </button>
          </div>
        )}

        {/* Extra practice */}
        {current === 'quiz' && (
          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-5 border-t border-stone-100">
            <button onClick={() => goTo(0)} className="flex-1 text-center bg-stone-100 hover:bg-stone-200 text-gray-700 py-3 rounded-xl font-medium">
              ↺ Review the lesson
            </button>
            <Link to="/flashcards" className="flex-1 text-center bg-stone-100 hover:bg-stone-200 text-gray-700 py-3 rounded-xl font-medium">
              More practice in Flashcards 🃏
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Course overview (units, resume, recent classes) ─────────────────────────

function Overview() {
  const navigate = useNavigate()
  const [progress] = useState(loadProgress)
  const { completed, scores, history, last } = progress

  const next = nextDayToStudy(completed, courseDays.length)
  const pct = Math.round((completed.length / courseDays.length) * 100)
  const [openUnit, setOpenUnit] = useState(() => unitForDay(last?.day ?? next ?? 1).unit)

  // Resume the last class if it isn't finished, otherwise the next one to study.
  const resumeDay = last && !completed.includes(last.day) ? last.day : next
  const resume = resumeDay && courseDays.find(d => d.day === resumeDay)
  const resumeStarted = last?.day === resumeDay && last.step > 0

  // Most recent attempt per day.
  const recent = []
  for (const h of history) {
    if (!recent.some(r => r.day === h.day)) recent.push(h)
    if (recent.length === 5) break
  }

  const openDay = (day) => {
    if (!isUnlocked(day, completed) &&
        !window.confirm(`Day ${day} unlocks after you pass Day ${day - 1}. Jump ahead anyway?`)) return
    navigate(`/course/${day}`)
  }

  return (
    <div className="page-enter max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mb-2">
          {courseDays.length}-Day Italian Course 🇮🇹
        </h1>
        <p className="text-gray-500 text-lg">
          {courseUnits.length} units, one lesson a day. Pass each day's checkpoint to unlock the next.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
        {/* Progress + resume */}
        <div className="lg:col-span-2 bg-navy-900 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute -top-6 -right-6 text-[120px] opacity-5 leading-none select-none">📅</div>
          <div className="relative">
            <div className="flex justify-between items-end mb-3">
              <div>
                <p className="text-terra-300 text-xs font-semibold tracking-widest uppercase">Your Progress</p>
                <p className="font-display text-3xl font-bold mt-1">{completed.length} of {courseDays.length} days</p>
              </div>
              <span className="font-display text-4xl font-bold text-gold">{pct}%</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-6">
              <div className="h-full bg-gradient-to-r from-terra-500 to-gold rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
            {resume ? (
              <Link
                to={`/course/${resume.day}`}
                className="flex items-center justify-between gap-4 bg-white/10 hover:bg-white/15 rounded-xl p-4 transition-colors"
              >
                <div>
                  <p className="text-xs text-gray-400">{resumeStarted ? 'Pick up where you left off' : completed.length ? 'Up next' : 'Start here'}</p>
                  <p className="font-display text-lg font-bold">Day {resume.day}: {resume.title}</p>
                  {last?.day === resume.day && <p className="text-xs text-gray-400 mt-0.5">Last opened {timeAgo(last.date)}</p>}
                </div>
                <span className="bg-terra-500 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
                  {resumeStarted ? 'Resume ▶' : 'Start ▶'}
                </span>
              </Link>
            ) : (
              <p className="text-gold font-medium">🎓 Course complete — complimenti!</p>
            )}
          </div>
        </div>

        {/* Recent classes */}
        <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-navy-900 mb-3">Recent classes</h2>
          {recent.length === 0 ? (
            <p className="text-sm text-gray-400">Your finished classes and quiz scores will show up here.</p>
          ) : (
            <ul className="space-y-2">
              {recent.map(r => {
                const d = courseDays.find(x => x.day === r.day)
                const p = Math.round((r.score / r.total) * 100)
                return (
                  <li key={r.day}>
                    <Link to={`/course/${r.day}`} className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 -mx-2 hover:bg-cream">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-navy-900 truncate">Day {r.day}: {d.title}</p>
                        <p className="text-xs text-gray-400">{timeAgo(r.date)}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p >= PASS_PCT ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
                        {r.score}/{r.total}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Units */}
      <div className="space-y-3">
        {courseUnits.map(u => {
          const days = courseDays.filter(d => d.day >= u.from && d.day <= u.to)
          const doneCount = days.filter(d => completed.includes(d.day)).length
          const isOpen = openUnit === u.unit
          return (
            <div key={u.unit} className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenUnit(isOpen ? null : u.unit)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-cream/50"
              >
                <span className={`w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold flex-shrink-0
                  ${doneCount === days.length ? 'bg-green-500 text-white' : 'bg-navy-900 text-white'}`}>
                  {doneCount === days.length ? '✓' : u.unit}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-semibold tracking-wide uppercase">Unit {u.unit} · Days {u.from}–{u.to}</p>
                  <p className="font-display text-lg font-bold text-navy-900">{u.title}</p>
                  <p className="text-sm text-gray-500 truncate">{u.desc}</p>
                </div>
                <div className="text-right flex-shrink-0 w-20">
                  <p className="text-sm font-bold text-navy-900">{doneCount}/{days.length}</p>
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-terra-500" style={{ width: `${(doneCount / days.length) * 100}%` }} />
                  </div>
                </div>
                <span className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>

              {isOpen && (
                <ol className="border-t border-stone-100 divide-y divide-stone-100">
                  {days.map(d => {
                    const done = completed.includes(d.day)
                    const unlocked = isUnlocked(d.day, completed)
                    const isNext = d.day === next
                    return (
                      <li key={d.day}>
                        <button
                          onClick={() => openDay(d.day)}
                          className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-colors
                            ${isNext ? 'bg-terra-50' : 'hover:bg-cream/60'} ${unlocked ? '' : 'opacity-50'}`}
                        >
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                            ${done ? 'bg-green-500 text-white' : isNext ? 'bg-terra-500 text-white' : 'bg-stone-100 text-gray-500'}`}>
                            {done ? '✓' : unlocked ? d.day : '🔒'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-navy-900 truncate">
                              <span className="text-gray-400 font-normal">Day {d.day} · </span>{d.title}
                            </p>
                            <p className="text-xs text-gray-400 truncate">{d.goal}</p>
                          </div>
                          {done && scores[d.day] != null && (
                            <span className="text-xs text-green-700 font-semibold">{scores[d.day]}%</span>
                          )}
                          {isNext && <span className="text-xs font-semibold text-terra-600">Up next</span>}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${levelBadge[d.level]}`}>{d.level}</span>
                        </button>
                      </li>
                    )
                  })}
                </ol>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Course() {
  const { day } = useParams()
  if (day === undefined) return <Overview />
  const n = Number(day)
  if (!courseDays.some(d => d.day === n)) return <Navigate to="/course" replace />
  return <Lesson key={n} day={n} />
}
