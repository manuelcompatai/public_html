import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar      from './components/Navbar'
import Home        from './pages/Home'
import Demo        from './pages/Demo'
import Store       from './pages/Store'

// ── Detecta el subdominio actual ──────────────────────
function getSubdomain() {
  const host = window.location.hostname  // ej: demo.compatai.mx
  if (host.startsWith('demo.'))  return 'demo'
  if (host.startsWith('store.')) return 'store'
  return null
}

export default function App() {
  const subdomain = getSubdomain()

  // ── demo.compatai.mx → muestra Demo directamente ──
  if (subdomain === 'demo') {
    return (
      <>
        <Navbar />
        <Demo />
      </>
    )
  }

  // ── store.compatai.mx → muestra Store directamente ─
  if (subdomain === 'store') {
    return (
      <>
        <Navbar />
        <Store />
      </>
    )
  }

  // ── compatai.mx / www → routing normal ─────────────
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"      element={<Home />}  />
        <Route path="/demo"  element={<Demo />}  />
        <Route path="/store" element={<Store />} />
        <Route path="*"      element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}