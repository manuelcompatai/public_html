import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const VIDEO_SRC  = 'https://compatai.mx/assets/video_background/tmpcgc2hk3m.mp4'
const SLIDES = [
  'https://compatai.mx/assets/img_background/Ejemplo3.jpg',
  'https://compatai.mx/assets/img_background/Ejemplo5.jpg',
]

export default function Home() {
  const videoRef     = useRef(null)
  const slideshowRef = useRef(null)
  const slideIdx     = useRef(0)
  const timerRef     = useRef(null)

  useEffect(() => {
    const video     = videoRef.current
    const slideshow = slideshowRef.current
    if (!video || !slideshow) return

    const slides = slideshow.querySelectorAll('.home-slide')

    function startSlideshow() {
      video.style.opacity = '0'
      slideshow.style.opacity = '1'
      timerRef.current = setInterval(() => {
        slides[slideIdx.current].classList.remove('home-slide--active')
        slideIdx.current = (slideIdx.current + 1) % slides.length
        slides[slideIdx.current].classList.add('home-slide--active')
      }, 5000)
    }

    video.play()
      .then(() => { slideshow.style.opacity = '0' })
      .catch(() => startSlideshow())

    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <div className="home">

      {/* ── Background ─────────────────────────────── */}
      <div className="home-bg">
        <video
          ref={videoRef}
          className="home-bg__video"
          autoPlay
          muted
          loop
          playsInline
          src={VIDEO_SRC}
        />

        <div ref={slideshowRef} className="home-bg__slideshow">
          {SLIDES.map((src, i) => (
            <div
              key={src}
              className={`home-slide${i === 0 ? ' home-slide--active' : ''}`}
              style={{ backgroundImage: `url('${src}')` }}
            />
          ))}
        </div>

        <div className="home-bg__overlay" />
      </div>

      {/* ── Hero ───────────────────────────────────── */}
      <main className="home-hero">
        <div className="home-hero__content">

          <img
            className="home-hero__logo"
            src="https://compatai.mx/assets/logo/Logo_compaTAI.png"
            alt="compaTAI"
          />

          <p className="home-hero__eyebrow">AI Training Data · CDMX Edge Cases</p>

          <h1 className="home-hero__title">
            Mastering{' '}
            <span className="home-hero__accent">Urban Chaos</span>
          </h1>

          <p className="home-hero__sub">
            Training Autonomous Vehicles for the world's most unpredictable cities.
          </p>

          <div className="home-hero__ctas">
            <Link to="/demo" className="btn btn--primary">
              ▶&nbsp; Live Demo
            </Link>
            <Link to="/store" className="btn btn--secondary">
              Buy Dataset &rarr;
            </Link>
          </div>

        </div>

        {/* Scroll hint */}
        <div className="home-scroll-hint" aria-hidden="true">
          <span />
        </div>
      </main>

    </div>
  )
}
