import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar   from './components/Navbar'
import Home     from './pages/Home'
import Demo     from './pages/Demo'
import Store    from './pages/Store'

export default function App() {
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