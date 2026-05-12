import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home  from './pages/Home'
import Demo  from './pages/Demo'
import Store from './pages/Store'

function getSubdomain() {
  const host = window.location.hostname
  if (host.startsWith('demo.'))  return 'demo'
  if (host.startsWith('store.')) return 'store'
  return null
}

export default function App() {
  const subdomain = getSubdomain()

  if (subdomain === 'demo') {
    return (
      <BrowserRouter>
        <Navbar />
        <Demo />
      </BrowserRouter>
    )
  }

  if (subdomain === 'store') {
    return (
      <BrowserRouter>
        <Navbar />
        <Store />
      </BrowserRouter>
    )
  }

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