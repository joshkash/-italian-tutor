// All saved progress goes through here so it can be synced to your account.
export const CHANGE_EVENT = 'italianTutor:changed'

export const readLocal = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

export const writeLocal = (key, value, { silent = false } = {}) => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage unavailable */ }
  if (!silent) window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: key }))
}
