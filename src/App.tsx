import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import { Toaster } from '@/components/ui/toaster'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
      <Toaster />
    </Router>
  )
}

export default App
