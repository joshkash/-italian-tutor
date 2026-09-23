# 🇮🇹 La Bella Lingua — Italian Learning App

A beautiful, full-featured Italian language learning app built with React + Vite + Tailwind CSS.

## Features

| Feature | What it does |
|---|---|
| 📅 **100-Day Course** | 10 units of 10 lessons (A1→B2). Each lesson walks you through an overview, vocabulary, key sentences and grammar, then a checkpoint quiz — score 70% to complete the day and unlock the next. Your place in each lesson, quiz scores and recent classes are saved so you can pick up where you left off |
| 🃏 **Flashcards** | 1000 words (A1–C1) with 3D flip animation, level/category filters, and progress tracking |
| 📚 **Grammar** | 8 lessons with reference tables, highlighted examples, and completion tracking |
| ✏️ **Quizzes** | Italian↔English translation quiz with instant feedback and scoring (A–F grade) |
| 👤 **Sign-in & sync** | Sign in with your email (no password) to save progress to your account and continue on any device |
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

Without this, progress is saved in your browser only. To sign in and continue on any device, connect a free [Supabase](https://supabase.com) project:

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor**, paste in [`supabase/schema.sql`](supabase/schema.sql) and click **Run**.
3. Go to **Authentication → URL Configuration** and set **Site URL** to where the app runs (e.g. `http://localhost:5173` or your deployed URL). Add any other URLs you use under **Redirect URLs**.
4. *(Optional, recommended)* In **Authentication → Emails → Magic Link**, add `{{ .Token }}` to the email so it also contains a code. Then you can open the email on your phone and type the code into your laptop.
5. Copy **Project URL** and the **anon public** key from **Project Settings → API** into `.env` (or your host's environment variables):
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
6. Restart / redeploy, click **Sign in** in the navbar, and enter your email.

**Deployed on Vercel with its Supabase integration?** Skip steps 1 and 5: Vercel already provides `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, which the app reads. Just run the SQL (step 2) in that database, set the Site URL to your Vercel address (step 3), and redeploy.

Progress already saved on a device is merged into your account the first time you sign in there, so nothing is lost.

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
