import { useState } from 'react'
import './IframePage.css'

const GRADIO_URL = 'https://demo.compatai.mx'

export default function Demo() {
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
        <p className="iframe-page__overlay-label">INITIALIZING ENGINE…</p>
        <div className="iframe-page__spinner" />
      </div>

      {/* Gradio app */}
      <iframe
        src={GRADIO_URL}
        title="compaTAI Live Demo"
        className="iframe-page__frame"
        onLoad={() => setTimeout(() => setLoaded(true), 800)}
        allow="autoplay; fullscreen"
      />

    </div>
  )
}
