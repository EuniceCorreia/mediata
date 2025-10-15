import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Layout/Cadastro.css'
import { API_BASE } from '../constants';  // Import da constante (ajuste path se constants.js em src)

function Entrar() {
  const [form, setForm] = useState({ usuario: '', senha: '' })
  const [error, setError] = useState('');  // NOVO: Para erros do backend
  const [loading, setLoading] = useState(false);  // NOVO: Loading no botão
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()  
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE}/medico/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: form.usuario,  // Mapeia 'usuario' para 'email'
          senha: form.senha 
        }),
        
      })
    if (response.ok) {
        const data = await response.json()
        // Salva no localStorage para uso global (ex: em RegistroPaciente ou Historico)
        localStorage.setItem('medicoId', data.id)
        localStorage.setItem('medicoNome', data.nomeCompleto)
        localStorage.setItem('auth', 'true')  // Mantém seu 'auth' para compatibilidade
        
        console.log('Login OK:', data)

        // Navega para registro-paciente (como no seu código original)
        navigate('/registro-paciente')
        window.location.reload()
      }
      else
      {
        // Erro do backend (ex: 401 "Credenciais inválidas")
        const errorText = await response.text()
        setError(errorText || 'Erro no login')
      }
      } catch (err) {
      // Erro de rede/conexão
      setError('Erro de conexão: ' + err.message)
      console.error('Login error:', err)
    } finally {
      setLoading(false)  // Para loading
    }
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
              disabled={loading}  // NOVO: Desabilita durante loading
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
              disabled={loading}  // NOVO: Desabilita durante loading
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}  {/* NOVO: Loading text*/}
          </button>

          {/* NOVO: Mostra erro do backend */}
        {error && <p className="error" style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}


        <p style={{ marginTop: '1rem' }}>
          Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </form>
    </div>
  )
}

export default Entrar
