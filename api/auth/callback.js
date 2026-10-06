// GitHub redirects here after sign-in. Swaps the one-time code for an access token
// (this needs the client secret, so it must run on the server) and hands it to the app.
export default async function handler(req, res) {
  const { code, state } = req.query
  const cookieState = /(?:^|;\s*)gh_oauth_state=([^;]+)/.exec(req.headers.cookie || '')?.[1]
  res.setHeader('Set-Cookie', 'gh_oauth_state=; Path=/api/auth; HttpOnly; Secure; SameSite=Lax; Max-Age=0')

  if (!code || !state || state !== cookieState) {
    res.redirect(302, '/account#error=Sign-in%20expired%2C%20please%20try%20again')
    return
  }

  const r = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  })
  const data = await r.json().catch(() => ({}))
  if (!data.access_token) {
    res.redirect(302, `/account#error=${encodeURIComponent(data.error_description || 'GitHub sign-in failed')}`)
    return
  }
  // The token goes in the URL fragment, which browsers never send to any server.
  res.redirect(302, `/account#token=${encodeURIComponent(data.access_token)}`)
}
