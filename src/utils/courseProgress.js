// Course progress persisted in localStorage: completed days, quiz scores,
// a history of recent classes, and where you left off in each lesson.
import { readLocal, writeLocal } from './storage'

const KEYS = {
  completed: 'italianTutor_courseProgress', // [day, ...] (kept from the original format)
  scores:    'italianTutor_courseScores',   // { [day]: bestPct }
  history:   'italianTutor_courseHistory',  // [{ day, score, total, date }, ...] newest first
  steps:     'italianTutor_courseSteps',    // { [day]: stepIndex }
  last:      'italianTutor_courseLast',     // { day, step, date }
}
const HISTORY_LIMIT = 50
export const PASS_PCT = 70

const read  = readLocal
const write = writeLocal

export const loadProgress = () => ({
  completed: read(KEYS.completed, []),
  scores:    read(KEYS.scores, {}),
  history:   read(KEYS.history, []),
  steps:     read(KEYS.steps, {}),
  last:      read(KEYS.last, null),
})

// Remember which step of a lesson you are on, and that it was your last class.
export const saveStep = (day, step) => {
  write(KEYS.steps, { ...read(KEYS.steps, {}), [day]: step })
  write(KEYS.last, { day, step, date: new Date().toISOString() })
}

// Record a finished lesson quiz. Passing marks the day complete.
export const recordResult = (day, score, total) => {
  const pct = Math.round((score / total) * 100)
  const scores = read(KEYS.scores, {})
  write(KEYS.scores, { ...scores, [day]: Math.max(pct, scores[day] ?? 0) })

  const history = [{ day, score, total, date: new Date().toISOString() }, ...read(KEYS.history, [])]
  write(KEYS.history, history.slice(0, HISTORY_LIMIT))

  const completed = read(KEYS.completed, [])
  if (pct >= PASS_PCT && !completed.includes(day)) write(KEYS.completed, [...completed, day])
  return pct
}

// A day is unlocked once the day before it is complete.
export const isUnlocked = (day, completed) =>
  day === 1 || completed.includes(day) || completed.includes(day - 1)

// The first day that isn't complete yet.
export const nextDayToStudy = (completed, totalDays) => {
  for (let d = 1; d <= totalDays; d++) if (!completed.includes(d)) return d
  return null
}

export const timeAgo = (iso) => {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 1)  return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24)  return `${hrs} h ago`
  const days = Math.round(hrs / 24)
  if (days < 7)  return `${days} day${days === 1 ? '' : 's'} ago`
  return new Date(iso).toLocaleDateString()
}
