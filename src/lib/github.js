// Talks to the GitHub API with the signed-in user's token.
// Progress lives in one private gist on their account.
const TOKEN_KEY = 'italianTutor_githubToken'
const GIST_FILE = 'italian-tutor-progress.json'
const API = 'https://api.github.com'

export const getToken = () => { try { return localStorage.getItem(TOKEN_KEY) } catch { return null } }
export const setToken = (t) => { try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY) } catch { /* ignore */ } }

async function gh(path, token, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', ...options.headers },
  })
  if (!res.ok) {
    const err = new Error(`GitHub ${res.status}`)
    err.status = res.status
    throw err
  }
  return res.status === 204 ? null : res.json()
}

export const getUser = (token) => gh('/user', token)

let gistId = null

async function findGist(token) {
  if (gistId) return gistId
  for (let page = 1; page <= 10; page++) {
    const gists = await gh(`/gists?per_page=100&page=${page}`, token)
    const hit = gists.find(g => g.files?.[GIST_FILE])
    if (hit) return (gistId = hit.id)
    if (gists.length < 100) break
  }
  return null
}

// Returns the saved progress object, or null if there isn't one yet.
export async function readProgress(token) {
  const id = await findGist(token)
  if (!id) return null
  const gist = await gh(`/gists/${id}`, token)
  const file = gist.files[GIST_FILE]
  const text = file.truncated ? await (await fetch(file.raw_url)).text() : file.content
  try { return JSON.parse(text) } catch { return null }
}

export async function writeProgress(token, data) {
  const files = { [GIST_FILE]: { content: JSON.stringify(data) } }
  const id = await findGist(token)
  if (id) {
    await gh(`/gists/${id}`, token, { method: 'PATCH', body: JSON.stringify({ files }) })
  } else {
    const gist = await gh('/gists', token, {
      method: 'POST',
      body: JSON.stringify({ description: 'La Bella Lingua — Italian course progress', public: false, files }),
    })
    gistId = gist.id
  }
}

export const forgetGist = () => { gistId = null }
