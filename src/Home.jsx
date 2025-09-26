/*import React from 'react';
import './Layout/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="logo">mediAta</h1>
      </header>

      <section className="home-main-content">
        <div className="home-text-section">
          <h2 className="home-subtitle">
            Menos burocracia, <span className="highlight">mais cuidado.</span>
          </h2>
          <p className="home-description">
            Plataforma idealizada para médicos com uma inteligência artificial para transcrever automaticamente suas consultas médicas,
            organizar informações clínicas e sugerir diagnósticos e condutas. <br />
            <b>Mais agilidade para você, mais tempo para o paciente.</b>
          </p>
          <button className="btn-testar">Testar agora</button>
          <a href="/entrar" className="link-entrar">Entrar</a>
        </div>

        <div className="home-features-section">
          <h3 className="features-title">Funcionalidades-chave:</h3>
          <div className="features-grid">
            <div className="feature-item">
              <img src="/icons/microphone.svg" alt="Microphone Icon" />
              <p>Transcrição Automática de Áudio em Texto</p>
            </div>
            <div className="feature-item">
              <img src="/icons/prontuario.svg" alt="Prontuário Icon" />
              <p>Geração Automática de Prontuário</p>
            </div>
            <div className="feature-item">
              <img src="/icons/historico.svg" alt="Histórico Icon" />
              <p>Histórico de pacientes</p>
            </div>
            <div className="feature-item">
              <img src="/icons/edicao.svg" alt="Edição Icon" />
              <p>Edição Rápida e Correção Manual</p>
            </div>
            <div className="feature-item">
              <img src="/icons/assistente.svg" alt="Assistente Icon" />
              <p>Assistente virtual</p>
            </div>
            <div className="feature-item">
              <img src="/icons/multiplataforma.svg" alt="Multiplataforma Icon" />
              <p>Multiplataforma</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;*/





import React from 'react'
import { Link } from 'react-router-dom'
import './Layout/Home.css';

function Home() {
  return (
    <div className="home-container">
      <main className="home-main">
        <div className="home-content">
          <div className="home-text">
            <h1 className="home-title">
              <span className="title-part-one">Menos burocracia,</span><br />
              <span className="title-part-two">mais cuidado.</span>
            </h1>
            <p className="home-description">
              Plataforma idealizada para médicos com uma inteligência 
              artificial para transcrever automaticamente suas consultas 
              médicas, organizar informações clínicas e sugerir diagnósticos e 
              condutas.
            </p>
            <p className="home-highlight">
              <strong>Mais agilidade para você, mais tempo para o paciente.</strong>
            </p>
            <div className="home-buttons">
              <Link to="/registro-paciente" className="btn btn-primary">
                Testar agora
              </Link>
              <Link to="/entrar" className="btn btn-secondary">
                Entrar
              </Link>
            </div>
          </div>
          <div className="home-features">
            <h2>Funcionalidades-chave:</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <path d="M12 19v4"/>
                    <path d="M8 23h8"/>
                  </svg>
                </div>
                <h3>Transcrição Automática de Áudio em Texto</h3>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <path d="M14 2v6h6"/>
                    <path d="M16 13H8"/>
                    <path d="M16 17H8"/>
                    <path d="M10 9H8"/>
                    <path d="M12 18h.01"/>
                  </svg>
                </div>
                <h3>Geração Automática de Prontuário</h3>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <path d="M14 2v6h6"/>
                    <path d="M16 13H8"/>
                    <path d="M16 17H8"/>
                  </svg>
                </div>
                <h3>Histórico de pacientes</h3>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                </div>
                <h3>Edição Rápida e Correção Manual</h3>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3>Assitente virtual</h3>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <path d="M8 21h8"/>
                    <path d="M12 17v4"/>
                    <path d="M7 13h10"/>
                    <path d="M7 9h10"/>
                  </svg>
                </div>
                <h3>Multiplataforma</h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home