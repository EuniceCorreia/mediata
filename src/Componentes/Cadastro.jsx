import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Layout/Cadastro.css';
import { API_BASE } from '../constants'

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    crm: '',
    email: '',
    senha: ''
  })

  const navigate = useNavigate()  // <-- useNavigate para redirecionar

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Dados do cadastro:', formData)
    // Aqui seria implementada a lógica de cadastro

   try {
      const response = await fetch(`${API_BASE}/medico/cadastrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert('Cadastro realizado com sucesso!')
        navigate('/RegistroPaciente')  // Ajuste a rota conforme sua app
      } else {
        let errorMessage = 'Erro desconhecido'
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || JSON.stringify(errorData)
        } catch {
          // JSON inválido ou vazio
        }
        alert('Erro no cadastro: ' + errorMessage)
      }
    } catch (error) {
      alert('Erro ao comunicar com o servidor: ' + error.message)
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
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sobrenome">Sobrenome</label>
            <input
              type="text"
              id="sobrenome"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dataNascimento">Data nascimento</label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              placeholder="dd/mm/aa"
              value={formData.dataNascimento}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="crm">CRM</label>
            <input
              type="text"
              id="crm"
              name="crm"
              value={formData.crm}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">e-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Finalizar cadastro
        </button>
      </form>
    </div>
  )
}

export default Cadastro