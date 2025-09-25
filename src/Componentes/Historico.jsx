/*import React from "react";
import '../Layout/Historico.css';

const Historico = () => {
  const historicoData = [
    "xx / xx",
    "xx / xx",
    "xx / xx",
    "xx / xx",
    "xx / xx",
    "xx / xx",
    "xx / xx",
    "xx / xx",
  ];

  return (
    <div className="mediaAtContainer">
      <header className="header">
        <div className="title">mediAta</div>
        <div className="icons">
          <button className="iconButton" aria-label="Notas"></button>
          <button className="iconButton" aria-label="Perfil"></button>
        </div>
      </header>

      <div className="mainContent">
        <aside className="historicoPanel">
          <div className="historicoTitle">
            <span className="iconHistorico" aria-hidden="true">📝</span>
            histórico
          </div>
          <ul className="historicoList">
            {historicoData.map((item, index) => (
              <li key={index} className={index % 2 !== 0 ? "listItem shaded" : "listItem"}>
                <span className="arrow">›</span> {item}
              </li>
            ))}
          </ul>
        </aside>

        <section className="contentPanel">
          <h2 className="question">O que o paciente relatou hoje?</h2>
          <div className="inputSearch">
            <button className="btnPlus" aria-label="Adicionar">+</button>
            <input type="text" placeholder="Digite aqui..." aria-label="Relato do paciente" />
            <button className="btnVoice" aria-label="Gravar voz"></button>
          </div>
          <div className="backgroundIcon" aria-hidden="true">🩺</div>
        </section>
      </div>
    </div>
  );
};

export default Historico;*/





import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Layout/Historico.css';

function Historico() {
  const [historico] = useState([
    { id: 1, data: '15/01', ativo: true },
    { id: 2, data: '14/01', ativo: false },
    { id: 3, data: '13/01', ativo: true },
    { id: 4, data: '12/01', ativo: false },
    { id: 5, data: '11/01', ativo: true },
    { id: 6, data: '10/01', ativo: false },
    { id: 7, data: '09/01', ativo: true },
    { id: 8, data: '08/01', ativo: false }
  ])

  return (
    <div className="historico-container">
      <div className="historico-sidebar">
        <div className="historico-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <path d="M14 2v6h6"/>
          </svg>
          <h2>histórico</h2>
        </div>
        
        <div className="historico-list">
          {historico.map((item, index) => (
            <div 
              key={item.id} 
              className={`historico-item ${item.ativo ? 'ativo' : ''}`}
            >
              <span className="historico-arrow">▶</span>
              <span className="historico-data">xx / xx</span>
            </div>
          ))}
        </div>
      </div>

      <div className="historico-content">
        <div className="stethoscope-bg">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 2a2 2 0 0 0-2 2v6.5a0.5 0.5 0 0 1-0.5 0.5h-2a0.5 0.5 0 0 1-0.5-0.5V4a2 2 0 0 0-4 0v6.5A4.5 4.5 0 0 0 6.5 15H8a2 2 0 0 1 2 2v1a2 2 0 0 0 4 0v-1a2 2 0 0 1 2-2h1.5a4.5 4.5 0 0 0 4.5-4.5V4a2 2 0 0 0-4 0v6.5a0.5 0.5 0 0 1-0.5 0.5h-2a0.5 0.5 0 0 1-0.5-0.5V4a2 2 0 0 0-2-2z"/>
            <circle cx="20" cy="18" r="2"/>
          </svg>
        </div>
        
        <h3>O que o paciente relatou hoje?</h3>
        
        <div className="recording-controls">
          <button className="record-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="3"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </button>
          <div className="audio-controls">
            <button className="control-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <path d="M12 19v4"/>
                <path d="M8 23h8"/>
              </svg>
            </button>
            <button className="control-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Historico