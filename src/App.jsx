import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Course from './pages/Course'
import Flashcards from './pages/Flashcards'
import Grammar from './pages/Grammar'
import Quizzes from './pages/Quizzes'
import AIChat from './pages/AIChat'
import Account from './pages/Account'

function AppRoutes() {
  // Re-mount pages when progress from another device is synced in, so they show it.
  const { dataVersion } = useAuth()
  return (
    <Routes key={dataVersion}>
      <Route path="/"           element={<Home />}       />
      <Route path="/course"     element={<Course />}     />
      <Route path="/course/:day" element={<Course />}    />
      <Route path="/flashcards" element={<Flashcards />} />
      <Route path="/grammar"    element={<Grammar />}    />
      <Route path="/quizzes"    element={<Quizzes />}    />
      <Route path="/chat"       element={<AIChat />}     />
      <Route path="/account"    element={<Account />}    />
      <Route path="*"           element={<Navigate to="/" />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-cream">
          <Navbar />
          <main className="pt-16">
            <AppRoutes />
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}
