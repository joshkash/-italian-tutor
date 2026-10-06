// Starts "Sign in with GitHub". Needs GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET in Vercel.
import crypto from 'node:crypto'

export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID
  if (!clientId) {
    res.status(500).send('GitHub sign-in is not set up: add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in Vercel → Settings → Environment Variables, then redeploy.')
    return
  }
  const state = crypto.randomBytes(16).toString('hex')
  const origin = `https://${req.headers['x-forwarded-host'] || req.headers.host}`
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${origin}/api/auth/callback`,
    scope: 'gist', // progress is stored in a private gist on your account
    state,
  })
  res.setHeader('Set-Cookie', `gh_oauth_state=${state}; Path=/api/auth; HttpOnly; Secure; SameSite=Lax; Max-Age=600`)
  res.redirect(302, `https://github.com/login/oauth/authorize?${params}`)
}
