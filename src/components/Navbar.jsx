import { NavLink } from 'react-router-dom'
import './Navbar.css'

const LINKS = [
  { to: '/',      label: 'Home'      },
  { to: '/demo',  label: 'Live Demo' },
  { to: '/store', label: 'Video Store' },
]

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">

        <NavLink to="/" className="nav-logo" aria-label="compaTAI home">
          <img
            src="/assets/logo/compaTAI_logo_75x75.png"
            alt="compaTAI"
          />
        </NavLink>

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
              href="mailto:hello@compatai.mx"
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
