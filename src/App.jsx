import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Flashcards from './pages/Flashcards'
import Grammar from './pages/Grammar'
import Quizzes from './pages/Quizzes'
import AIChat from './pages/AIChat'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/"           element={<Home />}       />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/grammar"    element={<Grammar />}    />
            <Route path="/quizzes"    element={<Quizzes />}    />
            <Route path="/chat"       element={<AIChat />}     />
            <Route path="*"           element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
