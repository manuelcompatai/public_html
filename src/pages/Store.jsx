import { useState } from 'react'
import './IframePage.css'

const GUMROAD_URL = 'https://compataiadmin.gumroad.com/'

export default function Store() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="iframe-page">

      {/* Loading overlay */}
      <div className={`iframe-page__overlay${loaded ? ' iframe-page__overlay--hidden' : ''}`}>
        <img
          src="https://compatai.mx/assets/logo/Logo_compaTAI.png"
          alt="compaTAI"
          className="iframe-page__overlay-logo"
        />
        <p className="iframe-page__overlay-label">SECURE STORE CONNECTION…</p>
        <div className="iframe-page__spinner" />
      </div>

      {/* Gumroad store */}
      <iframe
        src={GUMROAD_URL}
        title="compaTAI Video Store"
        className="iframe-page__frame"
        onLoad={() => setTimeout(() => setLoaded(true), 800)}
      />

    </div>
  )
}
