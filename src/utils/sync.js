// Syncs saved progress with your account so you can continue on any device.
// Everything is stored as one JSON file in a private gist on your GitHub account;
// each sync merges this device's progress with the saved copy, so nothing studied
// on either side is lost.
import { readProgress, writeProgress } from '../lib/github'
import { readLocal, writeLocal } from './storage'

const union   = (a = [], b = []) => [...new Set([...a, ...b])]
const maxCount = (a, b) => ({ count: Math.max(a?.count ?? 0, b?.count ?? 0) })
const maxEach = (a = {}, b = {}) => {
  const out = { ...a }
  for (const [k, v] of Object.entries(b)) out[k] = Math.max(v, out[k] ?? v)
  return out
}
const newer = (a, b) => (!a ? b : !b ? a : new Date(b.date) > new Date(a.date) ? b : a)
const mergeHistory = (a = [], b = []) => {
  const seen = new Map()
  for (const h of [...a, ...b]) seen.set(`${h.day}|${h.date}`, h)
  return [...seen.values()].sort((x, y) => new Date(y.date) - new Date(x.date)).slice(0, 50)
}

// How each saved key is combined across devices.
const MERGERS = {
  italianTutor_courseProgress:   union,
  italianTutor_courseScores:     maxEach,
  italianTutor_courseHistory:    mergeHistory,
  italianTutor_courseSteps:      maxEach,
  italianTutor_courseLast:       newer,
  italianTutor_knownWords:       union,
  italianTutor_knownSentences:   union,
  italianTutor_completedLessons: union,
  italianTutor_quizStats:        maxCount,
  italianTutor_chatStats:        maxCount,
}

const localSnapshot = () => {
  const out = {}
  for (const key of Object.keys(MERGERS)) {
    const v = readLocal(key, undefined)
    if (v !== undefined) out[key] = v
  }
  return out
}

const merge = (local, remote) => {
  const out = {}
  for (const [key, fn] of Object.entries(MERGERS)) {
    if (local[key] === undefined && remote[key] === undefined) continue
    if (remote[key] === undefined) out[key] = local[key]
    else if (local[key] === undefined) out[key] = remote[key]
    else out[key] = fn(local[key], remote[key])
  }
  return out
}

// Pull, merge, save locally and push. Returns true if this device's progress changed.
export async function syncProgress(token) {
  const remote = await readProgress(token)
  const local  = localSnapshot()
  const merged = merge(local, remote ?? {})

  let changed = false
  for (const [key, value] of Object.entries(merged)) {
    if (JSON.stringify(value) !== JSON.stringify(local[key])) {
      writeLocal(key, value, { silent: true })
      changed = true
    }
  }

  if (JSON.stringify(merged) !== JSON.stringify(remote)) await writeProgress(token, merged)
  return changed
}
