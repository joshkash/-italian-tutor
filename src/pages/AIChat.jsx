import { useState, useEffect, useRef } from 'react'

const LEVEL_DESC = {
  A1: 'Beginner — mostly English with Italian phrases',
  A2: 'Elementary — mix of English and Italian',
  B1: 'Intermediate — mostly Italian, English for explanations',
  B2: 'Upper Intermediate — nearly all Italian',
  C1: 'Advanced — full Italian conversation',
}

function systemPrompt(level) {
  const style =
    level === 'A1' ? 'Speak mostly in English, introduce key Italian words and phrases with translations. Keep sentences very short and simple.' :
    level === 'A2' ? 'Mix English and Italian roughly 50/50. Always provide an English translation after Italian sentences.' :
    level === 'B1' ? 'Speak mostly in Italian (about 70%), provide English explanations for grammar points and new vocabulary.' :
    level === 'B2' ? 'Speak almost entirely in Italian. Use English only to clarify a complex grammar rule.' :
                     'Speak entirely in Italian, as you would with a near-native speaker.'

  return `You are Sofia, a warm, patient, and expert Italian language tutor. The student's current level is ${level}.

Teaching style for this level: ${style}

Always:
- Gently correct Italian mistakes by incorporating the correct form naturally in your reply (never be harsh)
- Explain grammar concepts when they arise naturally
- Share interesting facts about Italian culture, food, art, or history when relevant
- Keep the conversation engaging and encouraging
- If the student writes Italian, respond in Italian and acknowledge their effort
- Use 'tu' (informal) with the student

Begin by warmly introducing yourself and asking how the student would like to practice today.`
}

export default function AIChat() {
  const [messages, setMessages]     = useState([])
  const [input, setInput]           = useState('')
  const [level, setLevel]           = useState('A1')
  const [loading, setLoading]       = useState(false)
  const [apiKey, setApiKey]         = useState(import.meta.env.VITE_ANTHROPIC_API_KEY || '')
  const [showKeyBar, setShowKeyBar] = useState(!import.meta.env.VITE_ANTHROPIC_API_KEY)
  const [error, setError]           = useState(null)
  const bottomRef                   = useRef(null)
  const textareaRef                 = useRef(null)

  // Scroll to bottom whenever messages change
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  // Auto-start when key is available
  useEffect(() => {
    if (apiKey && messages.length === 0) callApi([], 'Ciao! Sono pronto/a a iniziare.')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey])

  // ── Core API call ─────────────────────────────────────────────────────────
  const callApi = async (history, userText) => {
    if (!apiKey) { setError('Add your Anthropic API key to start chatting.'); return }
    setLoading(true); setError(null)

    const allMessages = [...history, { role: 'user', content: userText }]

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt(level),
          messages: allMessages,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error?.message || `HTTP ${res.status}`)
      }

      const data    = await res.json()
      const reply   = data.content.map(b => b.text || '').join('')

      setMessages(prev => [...prev, { role: 'assistant', content: reply }])

      // Persist chat count
      const s = JSON.parse(localStorage.getItem('italianTutor_chatStats') || '{"count":0}')
      localStorage.setItem('italianTutor_chatStats', JSON.stringify({ count: s.count + 1 }))
    } catch (e) {
      setError(`Error: ${e.message}. Check your API key.`)
    } finally {
      setLoading(false)
    }
  }

  const send = () => {
    const text = input.trim()
    if (!text || loading) return
    const userMsg = { role: 'user', content: text }
    const next    = [...messages, userMsg]
    setMessages(next)
    setInput('')
    callApi(messages, text)
  }

  const changeLevel = (newLevel) => {
    setLevel(newLevel)
    setMessages([])
    if (apiKey) setTimeout(() => callApi([], 'Ciao! Sono pronto/a a iniziare.'), 100)
  }

  const clearChat = () => {
    setMessages([])
    if (apiKey) callApi([], 'Ciao! Sono pronto/a a iniziare.')
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="page-enter flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>

      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-4 py-3 flex-shrink-0">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-terra-500 rounded-full flex items-center justify-center text-white font-bold font-display text-lg">
              S
            </div>
            <div>
              <p className="font-display font-bold text-navy-900 leading-none">Sofia</p>
              <p className="text-xs text-gray-400">Il tuo tutore di italiano 🇮🇹</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={level}
              onChange={e => changeLevel(e.target.value)}
              className="text-sm border border-stone-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-terra-400"
            >
              {Object.entries(LEVEL_DESC).map(([l]) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <button onClick={clearChat} className="text-sm text-gray-400 hover:text-terra-500 transition-colors">
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* API key bar */}
      {showKeyBar && (
        <div className="bg-gold/10 border-b border-gold/20 px-4 py-3 flex-shrink-0">
          <div className="max-w-2xl mx-auto">
            <p className="text-sm text-gray-700 mb-2">
              🔑 Enter your Anthropic API key to chat.{' '}
              <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer"
                className="text-terra-500 hover:underline">Get one here →</a>
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="sk-ant-..."
                className="flex-1 text-sm border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terra-400"
              />
              <button
                onClick={() => { if (apiKey) { setShowKeyBar(false); callApi([], 'Ciao! Sono pronto/a a iniziare.') } }}
                disabled={!apiKey}
                className="bg-terra-500 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-terra-600 transition-colors"
              >
                Start
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">⚠️ Development only — do not expose this key publicly.</p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">

          {messages.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="font-display text-2xl font-bold text-navy-900 mb-2">Chat with Sofia</h3>
              <p className="text-gray-400 max-w-xs mx-auto text-sm">
                {apiKey ? 'Starting your session…' : 'Enter your API key above to begin practising Italian.'}
              </p>
              {apiKey && (
                <p className="text-xs text-gray-300 mt-2">Current level: {LEVEL_DESC[level]}</p>
              )}
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 bg-terra-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-1">
                  S
                </div>
              )}
              <div className={`
                max-w-xs sm:max-w-sm md:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                ${msg.role === 'user'
                  ? 'bg-navy-900 text-white rounded-tr-none'
                  : 'bg-white border border-stone-200 text-gray-800 rounded-tl-none shadow-sm'}
              `}>
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="w-7 h-7 bg-terra-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0">
                S
              </div>
              <div className="bg-white border border-stone-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                <div className="flex gap-1.5 items-center h-5">
                  <div className="w-2 h-2 bg-gray-400 rounded-full dot-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full dot-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full dot-bounce" />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="bg-white border-t border-stone-200 px-4 py-3 flex-shrink-0">
        <div className="max-w-2xl mx-auto flex gap-3 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder="Scrivi in italiano… (Enter to send)"
            rows={1}
            className="flex-1 border border-stone-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-terra-400 max-h-28"
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading || !apiKey}
            className="bg-terra-500 hover:bg-terra-600 disabled:opacity-40 text-white p-3 rounded-xl transition-colors flex-shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <p className="text-center text-xs text-gray-300 mt-1">Level: {LEVEL_DESC[level]}</p>
      </div>
    </div>
  )
}
