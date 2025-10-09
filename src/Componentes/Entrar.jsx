import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Layout/Cadastro.css'

function Entrar() {
  const [form, setForm] = useState({ usuario: '', senha: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você pode integrar com autenticação real.
    console.log('Tentativa de login:', form)
    // Simular login bem-sucedido: marcar auth no localStorage e redirecionar para o registro
    try {
      localStorage.setItem('auth', 'true')
    } catch (err) {
      // localStorage pode falhar em alguns ambientes; ignorar erro e prosseguir
      console.warn('localStorage unavailable:', err)
    }
    navigate('/registro-paciente')
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-header">
        <Link to="/" className="back-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5"/>
            <path d="M12 19l-7-7 7-7"/>
          </svg>
        </Link>
      </div>

      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '1rem' }}>Entrar</h2>

        <div className="form-row">
          <div className="form-group" style={{ width: '100%' }}>
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={form.usuario}
              onChange={handleChange}
              placeholder="e-mail ou usuário"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group" style={{ width: '100%' }}>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Entrar</button>

        <p style={{ marginTop: '1rem' }}>
          Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </form>
    </div>
  )
}

export default Entrar
