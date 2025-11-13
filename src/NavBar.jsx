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

  // simples verificação de autenticação local
  // assumimos que ao entrar o app grava 'auth' = 'true' no localStorage
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('medicoId') !== null;


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
        if (isLoggedIn){
          navigate('/historico')
      }
    }
     
      if (e.key === 'r' || e.key === 'R') {  // NOVO: R para novo registro (só se logado)
        if (isLoggedIn) {
          navigate('/registro-paciente')
        }
      }

      if (e.key === 'Escape') {
        if (location.pathname !== '/') navigate(-1)
      }
    }
   
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, location, isLoggedIn])

  const showBack = location.pathname !== '/'
  const title = niceTitleFromPath(location.pathname)
  const isRegistroPage = location.pathname === '/registro-paciente'
  const isHome = location.pathname === '/'
  const isEntrar = location.pathname === '/entrar'
  const isCadastro = location.pathname === '/cadastro'
  const isHistorico = location.pathname === '/historico'

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

            {!isRegistroPage && !isCadastro && !isHistorico && (
              <Link to="/cadastro" className="shortcut" title="Novo cadastro (C)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="shortcut-label">Cadastrar</span>
                <kbd className="shortcut-key">C</kbd>
              </Link>
            )}

            {/* NOVO: Novo Registro (só se logado) */}
            {isLoggedIn && !isRegistroPage && !isEntrar && !isCadastro && !isHome && (
              <Link to="/registro-paciente" className="shortcut" title="Novo registro (R)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
                <span className="shortcut-label">Novo Registro</span>
                <kbd className="shortcut-key">R</kbd>
              </Link>
            )}

            {/* Mostrar Historico quando o usuario estiver logado (não exibimos na Home/Entrar/Cadastro) */}
            {isLoggedIn && !isHome && !isEntrar && !isCadastro && !isHistorico && (
              <Link to="/historico" className="shortcut" title="Ver historico (H)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12a9 9 0 1 1-3.7-7.1L21 12z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="shortcut-label">Historico</span>
                <kbd className="shortcut-key">H</kbd>
                </Link>
            )}
            {/* NOVO: Logout (só se logado) */}
            {isLoggedIn && (
              <button 
                className="shortcut logout-btn"  // Adicione CSS para .logout-btn se quiser (vermelho)
                
                onClick={() => {
                  // Limpa storage (remove medicoId, medicoNome, auth)
                  localStorage.removeItem('medicoId');
                  localStorage.removeItem('medicoNome');
                  localStorage.removeItem('auth');
                  alert('Logout realizado com sucesso!');
                  navigate('/');
                  console.log('Logout realizado');
                }}
                title="Logout (SAIR)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 17l5-5-5-5M15 12H4M8 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="shortcut-label">Sair</span>
                <kbd className="shortcut-key">SAIR</kbd>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar