import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Layout/Navbar.css'

function niceTitleFromPath(path) {
  if (!path || path === '/') return 'Home'
  const p = path.replace(/^\//, '')
  return p.split('/')[0].replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onKey = (e) => {
      // ignore when typing in inputs/textareas or in contenteditable
      const tag = document.activeElement && document.activeElement.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return
      if (e.key === 'n' || e.key === 'N') {
        navigate('/cadastro')
      }
      if (e.key === 'c' || e.key === 'C') {
        navigate('/cadastro')
      }
      if (e.key === 'h' || e.key === 'H') {
        navigate('/historico')
      }
      if (e.key === 'Escape') {
        if (location.pathname !== '/') navigate(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, location])

  const showBack = location.pathname !== '/'
  const title = niceTitleFromPath(location.pathname)

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          {showBack ? (
            <button className="nav-back" onClick={() => navigate(-1)} aria-label="Voltar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <Link to="/" className="nav-logo">
              mediAta
            </Link>
          )}
          {!showBack && <span className="nav-tagline">Cuidando dos seus registros</span>}
        </div>

        <div className="nav-center">
          {showBack && <div className="nav-title">{title}</div>}
        </div>

        <div className="nav-right">
          <div className="nav-shortcuts" aria-hidden={false}>
            <Link to="/cadastro" className="shortcut" title="Novo cadastro (C)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="shortcut-label">Cadastrar</span>
              <kbd className="shortcut-key">C</kbd>
            </Link>

            <Link to="/historico" className="shortcut" title="Ver histórico (H)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12a9 9 0 1 1-3.7-7.1L21 12z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="shortcut-label">Histórico</span>
              <kbd className="shortcut-key">H</kbd>
            </Link>
          </div>

          {/* ícone de cadastro removido para evitar duplicação com os atalhos */}
        </div>
      </div>
    </nav>
  )
}

export default NavBar