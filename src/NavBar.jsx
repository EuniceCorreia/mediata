import React from 'react'
import { Link } from 'react-router-dom'
import './Layout/NavBar.css'

function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          mediAta
        </Link>
        <div className="nav-icons">
          <Link to="/cadastro" className="nav-icon" title="Cadastro">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5Z"/>
              <path d="M12 5L8 21l4-7 4 7-4-16"/>
            </svg>
          </Link>
          <Link to="/historico" className="nav-icon" title="Perfil">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="10" r="3"/>
              <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar