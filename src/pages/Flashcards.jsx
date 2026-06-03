import { useState, useEffect } from 'react'
import { vocabulary, levels } from '../data/vocabulary'

export default function Flashcards() {
  const [selectedLevels, setSelectedLevels]     = useState(['A1'])
  const [selectedCats, setSelectedCats]         = useState([])
  const [knownWords, setKnownWords]             = useState([])
  const [currentIndex, setCurrentIndex]         = useState(0)
  const [isFlipped, setIsFlipped]               = useState(false)
  const [session, setSession]                   = useState({ known: 0, learning: 0 })
  const [sessionComplete, setSessionComplete]   = useState(false)

  useEffect(() => {
    setKnownWords(JSON.parse(localStorage.getItem('italianTutor_knownWords') || '[]'))
  }, [])

  const saveKnown = (words) => {
    setKnownWords(words)
    localStorage.setItem('italianTutor_knownWords', JSON.stringify(words))
  }

  // Derive filtered card list
  const filtered = vocabulary.filter(w => {
    const lvlOk = selectedLevels.length === 0 || selectedLevels.includes(w.level)
    const catOk = selectedCats.length === 0   || selectedCats.includes(w.category)
    return lvlOk && catOk
  })

  const card = filtered[currentIndex]

  // Categories available within the current level selection
  const availableCats = [...new Set(
    vocabulary
      .filter(w => selectedLevels.length === 0 || selectedLevels.includes(w.level))
      .map(w => w.category)
  )]

  const toggleLevel = (lvl) => {
    setSelectedLevels(prev => prev.includes(lvl) ? prev.filter(l => l !== lvl) : [...prev, lvl])
    setCurrentIndex(0); setIsFlipped(false)
  }

  const toggleCat = (cat) => {
    setSelectedCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
    setCurrentIndex(0); setIsFlipped(false)
  }

  const advance = (delta = 1) => {
    setIsFlipped(false)
    setTimeout(() => setCurrentIndex(i => Math.max(0, Math.min(i + delta, filtered.length - 1))), 200)
  }

  const handleKnow = () => {
    if (!knownWords.includes(card.id)) saveKnown([...knownWords, card.id])
    setSession(s => ({ ...s, known: s.known + 1 }))
    if (currentIndex < filtered.length - 1) { advance(1) } else { setSessionComplete(true) }
  }

  const handleLearning = () => {
    setSession(s => ({ ...s, learning: s.learning + 1 }))
    if (currentIndex < filtered.length - 1) { advance(1) } else { setSessionComplete(true) }
  }

  const resetSession = () => {
    setCurrentIndex(0); setIsFlipped(false)
    setSession({ known: 0, learning: 0 }); setSessionComplete(false)
  }

  const progress = filtered.length > 0 ? ((currentIndex + 1) / filtered.length) * 100 : 0
  const isKnown  = card && knownWords.includes(card.id)

  if (filtered.length === 0) {
    return (
      <div className="page-enter max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🃏</div>
        <h2 className="font-display text-2xl font-bold text-navy-900 mb-2">No cards found</h2>
        <p className="text-gray-500">Select different levels or categories to see cards.</p>
      </div>
    )
  }

  return (
    <div className="page-enter max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-4xl font-bold text-navy-900">Flashcards 🃏</h1>
        <p className="text-gray-500 mt-1">Click a card to flip it and reveal the meaning</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Sidebar ─────────────────────────────────────── */}
        <aside className="lg:w-60 flex-shrink-0">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
            {/* Level filter */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Level</p>
              <div className="flex flex-wrap gap-2">
                {levels.map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => toggleLevel(lvl)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                      ${selectedLevels.includes(lvl)
                        ? 'bg-terra-500 text-white shadow-sm'
                        : 'bg-stone-100 text-gray-600 hover:bg-stone-200'}`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Category filter */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Category</p>
              <div className="flex flex-col gap-1">
                {availableCats.map(cat => (
                  <button
                    key={cat}
                    onClick={() => toggleCat(cat)}
                    className={`px-3 py-2 rounded-lg text-sm text-left transition-all
                      ${selectedCats.includes(cat)
                        ? 'bg-terra-50 text-terra-700 font-medium'
                        : 'text-gray-600 hover:bg-stone-50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Session stats */}
            <div className="border-t border-stone-100 pt-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Session</p>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <div className="font-bold text-green-600 text-xl">{session.known}</div>
                  <div className="text-xs text-green-500">Known ✓</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-3 text-center">
                  <div className="font-bold text-orange-500 text-xl">{session.learning}</div>
                  <div className="text-xs text-orange-400">Learning</div>
                </div>
              </div>
              <div className="bg-navy-900/5 rounded-xl p-3 text-center">
                <div className="font-bold text-navy-900 text-xl">{knownWords.length}</div>
                <div className="text-xs text-gray-500">Total Mastered</div>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main card area ───────────────────────────────── */}
        <div className="flex-1">
          {/* Progress bar */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              {Math.min(currentIndex + 1, filtered.length)} / {filtered.length}
            </span>
            {isKnown && (
              <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-medium">
                ✓ Already mastered
              </span>
            )}
          </div>
          <div className="h-2 bg-stone-100 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-terra-600 to-terra-400 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {sessionComplete ? (
            /* Session complete screen */
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-stone-100">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="font-display text-3xl font-bold text-navy-900 mb-2">Sessione Completata!</h2>
              <p className="text-gray-400 mb-8">You reviewed all {filtered.length} cards.</p>
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
                <div className="bg-green-50 rounded-2xl p-5">
                  <div className="font-bold text-green-600 text-3xl">{session.known}</div>
                  <div className="text-sm text-green-500 mt-1">Knew it! ✓</div>
                </div>
                <div className="bg-orange-50 rounded-2xl p-5">
                  <div className="font-bold text-orange-500 text-3xl">{session.learning}</div>
                  <div className="text-sm text-orange-400 mt-1">Still learning</div>
                </div>
              </div>
              <button
                onClick={resetSession}
                className="bg-terra-500 hover:bg-terra-600 text-white px-8 py-3 rounded-xl font-medium transition-colors"
              >
                Practice Again
              </button>
            </div>
          ) : (
            <>
              {/* 3-D flip card */}
              <div
                className="card-scene cursor-pointer mb-6 select-none"
                style={{ height: '320px' }}
                onClick={() => setIsFlipped(f => !f)}
              >
                <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
                  {/* Front — Italian */}
                  <div className="card-face bg-navy-900 rounded-3xl p-8 flex flex-col items-center justify-center shadow-xl">
                    <div className="flex gap-2 mb-6">
                      <span className="bg-terra-500/30 text-terra-300 text-xs px-3 py-1 rounded-full">
                        {card?.level}
                      </span>
                      <span className="bg-white/10 text-gray-300 text-xs px-3 py-1 rounded-full">
                        {card?.category}
                      </span>
                    </div>
                    <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-4 text-center">
                      {card?.italian}
                    </h2>
                    <p className="text-gray-500 italic text-base font-display">
                      /{card?.pronunciation}/
                    </p>
                    <p className="text-gray-600 text-xs mt-8">tap to reveal →</p>
                  </div>

                  {/* Back — English */}
                  <div className="card-face card-back-face bg-terra-500 rounded-3xl p-8 flex flex-col items-center justify-center shadow-xl">
                    <p className="text-terra-200 text-sm mb-3">English meaning</p>
                    <h2 className="font-display text-4xl font-bold text-white mb-6 text-center">
                      {card?.english}
                    </h2>
                    <div className="bg-white/20 rounded-xl p-4 text-center w-full max-w-sm">
                      <p className="text-white font-medium">{card?.example_it}</p>
                      <p className="text-terra-100 text-sm mt-1">{card?.example_en}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation + rating buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => advance(-1)}
                  disabled={currentIndex === 0}
                  className="p-3 rounded-xl bg-white border border-stone-200 text-gray-500 disabled:opacity-30 hover:bg-stone-50 transition-colors"
                >
                  ← Prev
                </button>

                <div className="flex gap-3 flex-1">
                  <button
                    onClick={handleLearning}
                    className="flex-1 py-3 rounded-xl bg-orange-50 text-orange-600 font-medium hover:bg-orange-100 transition-colors text-sm"
                  >
                    Still Learning 📖
                  </button>
                  <button
                    onClick={handleKnow}
                    className="flex-1 py-3 rounded-xl bg-green-50 text-green-600 font-medium hover:bg-green-100 transition-colors text-sm"
                  >
                    I Know It ✓
                  </button>
                </div>

                <button
                  onClick={() => advance(1)}
                  disabled={currentIndex === filtered.length - 1}
                  className="p-3 rounded-xl bg-white border border-stone-200 text-gray-500 disabled:opacity-30 hover:bg-stone-50 transition-colors"
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
