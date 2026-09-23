# 🇮🇹 La Bella Lingua — Italian Learning App

A beautiful, full-featured Italian language learning app built with React + Vite + Tailwind CSS.

## Features

| Feature | What it does |
|---|---|
| 📅 **100-Day Course** | 10 units of 10 lessons (A1→B2). Each lesson walks you through an overview, vocabulary, key sentences and grammar, then a checkpoint quiz — score 70% to complete the day and unlock the next. Your place in each lesson, quiz scores and recent classes are saved so you can pick up where you left off |
| 🃏 **Flashcards** | 1000 words (A1–C1) with 3D flip animation, level/category filters, and progress tracking |
| 📚 **Grammar** | 8 lessons with reference tables, highlighted examples, and completion tracking |
| ✏️ **Quizzes** | Italian↔English translation quiz with instant feedback and scoring (A–F grade) |
| 👤 **Sign-in & sync** | Sign in with GitHub to save progress (in a private gist) and continue on any device |
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

## Sign-in & sync (optional)

Without this, progress is saved in your browser only. With it, you **Sign in with GitHub** and your progress is saved to a private gist on your GitHub account, so you can continue on any device. No database needed. It uses two small Vercel functions in `api/auth/` for the GitHub login.

1. On GitHub go to **Settings → Developer settings → OAuth Apps → New OAuth App**:
   - **Homepage URL:** your site, e.g. `https://italian-tutor-iota.vercel.app`
   - **Authorization callback URL:** `https://italian-tutor-iota.vercel.app/api/auth/callback`
2. Copy the **Client ID**, click **Generate a new client secret** and copy it.
3. In Vercel → your project → **Settings → Environment Variables**, add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`, then redeploy.
4. Open the site, click **Sign in**, then **Sign in with GitHub**.

Progress already saved on a device is merged into your account the first time you sign in there, so nothing is lost. To run sign-in locally, use `vercel dev` (the plain Vite dev server doesn't run the `api/` functions).

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
