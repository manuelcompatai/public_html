import { NavLink } from 'react-router-dom'
import './Navbar.css'

const host = window.location.hostname
const isDemo  = host.startsWith('demo.')
const isStore = host.startsWith('store.')
const isHome  = !isDemo && !isStore

const LINKS = [
  { href: 'https://compatai.mx',       label: 'Home',        active: isHome  },
  { href: 'https://demo.compatai.mx',  label: 'Live Demo',   active: isDemo  },
  { href: 'https://store.compatai.mx', label: 'Video Store', active: isStore },
]

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">

        <a href="https://compatai.mx" className="nav-logo" aria-label="compaTAI home">
          <img
            src="/assets/logo/compaTAI_logo_75x75.png"
            alt="compaTAI"
          />
        </a>

        <ul className="nav-links">
          {LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link--active' : 'nav-link'
                }
              >
                {label}
              </NavLink>
            </li>
          ))}

          <li>
            <a
              href="mailto:social.media@compatai.mx"
              className="nav-link nav-cta"
            >
              Contact
            </a>
          </li>
        </ul>

      </div>
    </nav>
  )
}