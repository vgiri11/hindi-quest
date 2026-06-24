import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Today from './pages/Today'
import Setup from './pages/Setup'
import Roadmap from './pages/Roadmap'
import Practice from './pages/Practice'
import Resources from './pages/Resources'
import Culture from './pages/Culture'
import ClapBack from './pages/ClapBack'
import Progress from './pages/Progress'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
        <Nav />
        <main className="mx-auto px-6 py-8" style={{ maxWidth: '1200px' }}>
          <Routes>
            <Route path="/"          element={<Today />} />
            <Route path="/setup"     element={<Setup />} />
            <Route path="/roadmap"   element={<Roadmap />} />
            <Route path="/practice"  element={<Practice />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/culture"   element={<Culture />} />
            <Route path="/clapback"  element={<ClapBack />} />
            <Route path="/progress"  element={<Progress />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
