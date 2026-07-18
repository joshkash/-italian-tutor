# 🇮🇹 La Bella Lingua — Italian Learning App

A beautiful, full-featured Italian language learning app built with React + Vite + Tailwind CSS.

## Features

| Feature | What it does |
|---|---|
| 📅 **97-Day Course** | A guided day-by-day path (A1→C1): each day has a theme, vocabulary, a grammar focus, a cultural tip, and progress tracking |
| 🃏 **Flashcards** | 1000 words (A1–C1) with 3D flip animation, level/category filters, and progress tracking |
| 📚 **Grammar** | 8 lessons with reference tables, highlighted examples, and completion tracking |
| ✏️ **Quizzes** | Italian↔English translation quiz with instant feedback and scoring (A–F grade) |
| 💬 **AI Chat** | Conversation practice with "Sofia", powered by Claude (Anthropic API) |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Set up your API key for the AI Chat feature
cp .env.example .env
# Open .env and replace the placeholder with your key from https://console.anthropic.com

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## AI Chat Setup

The AI Chat feature calls the Anthropic API directly from the browser.

**Option A — .env file (recommended for local dev):**
```
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**Option B — enter the key in the UI:** If no key is set in `.env`, a key-input bar appears in the chat page. Paste your key there to start chatting.

> ⚠️ **Security note:** Never deploy this app publicly with your API key exposed. For a production deployment, proxy the API call through a backend server.

## Project Structure

```
src/
├── components/
│   └── Navbar.jsx          # Fixed top navigation
├── pages/
│   ├── Home.jsx            # Dashboard with stats & word of the day
│   ├── Flashcards.jsx      # 3D flip card study tool
│   ├── Grammar.jsx         # Grammar lesson viewer
│   ├── Quizzes.jsx         # Multiple-choice quiz engine
│   └── AIChat.jsx          # AI conversation tutor
├── data/
│   ├── vocabulary.js       # 80 Italian words (A1–C1)
│   └── grammar.js          # 8 grammar lessons (A1–B2)
├── App.jsx                 # Router + layout
├── main.jsx                # React entry point
└── index.css               # Global styles + flip animation
```

## Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** with custom Mediterranean colour palette
- **React Router 6**
- **Anthropic Claude API** (claude-sonnet-4) for AI Chat

## Progress Persistence

All progress is saved to `localStorage`:

| Key | Contains |
|---|---|
| `italianTutor_knownWords` | Array of mastered word IDs |
| `italianTutor_completedLessons` | Array of completed lesson IDs |
| `italianTutor_quizStats` | `{ count: N }` — total quizzes taken |
| `italianTutor_chatStats` | `{ count: N }` — total messages sent |

## Build for Production

```bash
npm run build
# Output goes to /dist
```
