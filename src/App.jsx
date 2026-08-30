import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Home from './pages/Home'
import Docs from './pages/Docs'
import CommandsPage from './pages/CommandsPage'
import PremiumPage from './pages/PremiumPage'
import './index.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/comandos" element={<CommandsPage />} />
          <Route path="/premium" element={<PremiumPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
