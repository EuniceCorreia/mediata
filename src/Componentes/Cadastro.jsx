/*import React, { useState } from 'react';
import '../Layout/Cadastro.css';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    crm: '',
    email: '',
    senha: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do cadastro:', formData);
    // Aqui você pode implementar a lógica de cadastro
  };

  const handleVoltar = () => {
    // Lógica para voltar à tela anterior
    console.log('Voltar');
  };

  return (
    <div className="cadastro-container">
      <header className="cadastro-header">
        <h1 className="logo">mediAta</h1>
        <button className="btn-voltar" onClick={handleVoltar}>
          <span className="arrow-up">^</span>
        </button>
      </header>

      <form className="cadastro-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sobrenome" className="form-label">Sobrenome</label>
            <input
              type="text"
              id="sobrenome"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dataNascimento" className="form-label">Data nascimento</label>
            <input
              type="text"
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleInputChange}
              placeholder="dd/mm/aa"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="crm" className="form-label">CRM</label>
            <input
              type="text"
              id="crm"
              name="crm"
              value={formData.crm}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email" className="form-label">e-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha" className="form-label">Senha:</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>

        <button type="submit" className="btn-finalizar">
          Finalizar cadastro
        </button>
      </form>
    </div>
  );
};

export default Cadastro;*/





import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Layout/Cadastro.css';

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    crm: '',
    email: '',
    senha: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Dados do cadastro:', formData)
    // Aqui seria implementada a lógica de cadastro
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