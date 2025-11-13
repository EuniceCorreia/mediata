import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Layout/Historico.css';
import { API_BASE } from '../constants';

function Historico() {
  const [historicos, setHistoricos] = useState([]);  // NOVO: Substitui mock por dados reais
  const [loading, setLoading] = useState(true);  // NOVO: Loading inicial
  const [error, setError] = useState('');  // NOVO: Erros do backend
  const [selectedId, setSelectedId] = useState(null);  // NOVO: ID selecionado para detalhes
  const [selectedRegistro, setSelectedRegistro] = useState(null);  // NOVO: Detalhes do selecionado
  const [searchTerm, setSearchTerm] = useState('');  // NOVO: Para busca por paciente
  const [pacienteHistoricos, setPacienteHistoricos] = useState([]);  // NOVO: Lista filtrada por paciente
  const [buscandoPaciente, setBuscandoPaciente] = useState(false);  // NOVO: Loading na busca
  const navigate = useNavigate();  // Adicionado para redirecionar
  
  const medicoId = localStorage.getItem('medicoId');  // NOVO: Do login (Entrar.jsx)
  
  useEffect(() => {
    if (!medicoId) {
      setError('Faça login primeiro.');
      setLoading(false);
      navigate('/entrar');  // Redireciona para login
    } else {
      loadHistorico();
    }
  }, [medicoId, navigate]);

  const loadHistorico = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/registro/historico/${medicoId}`);
      if (response.ok) {
        const data = await response.json();
        setHistoricos(data);  // Set lista real (RegistroPaciente[] ordenados por data)
        if (data.length > 0) {
        setSelectedId(data[0].id);  // Seleciona primeiro item por default
          setSelectedRegistro(data[0]);  // Mostra detalhes do primeiro
        }

      } else {
        const errorText = await response.text();
        setError(errorText || 'Erro ao carregar histórico');
      }
    } catch (err) {
      setError('Erro de conexão: ' + err.message);
      console.error('Erro no histórico:', err);
    } finally {
      setLoading(false);
      }
  };
  // NOVO: Seleciona item na sidebar e mostra detalhes
  const handleSelectItem = (registro) => {
    setSelectedId(registro.id);
    setSelectedRegistro(registro);
    setError('');  // Limpa erro
  };

  // NOVO: Busca por paciente (GET /api/registro/historico-paciente)
  const buscarPaciente = async () => {
    if (!searchTerm.trim()) {
      setError('Digite um nome para buscar.');
      return;
    }
    setBuscandoPaciente(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE}/registro/historico-paciente?nomePaciente=${encodeURIComponent(searchTerm)}`);
      if (response.ok) {
        const data = await response.json();
        setPacienteHistoricos(data);  // Set lista filtrada
      } else {
        const errorText = await response.text();
        setError(errorText || 'Erro na busca');
      }
      } catch (err) {
      setError('Erro de conexão: ' + err.message);
      console.error('Erro na busca:', err);
    } finally {
      setBuscandoPaciente(false);
    }
  };

  // NOVO: Recarrega histórico por médico (ex: após novo registro)
  const recarregarHistoricoMedico = () => {
    loadHistorico();
  };

  if (loading) {
    return (
      <div className="historico-container">
        <div className="historico-content">
           <p className="loading">Carregando histórico...</p>  {/* NOVO: Loading simples */}
        </div>
      </div>
    );
  }

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
          {historicos.length > 0 ? (
          historicos.map((item) => (
            <div 
              key={item.id}
              className={`historico-item ${selectedId === item.id ? 'ativo' : ''}`}  // NOVO: Ativo se selecionado
              onClick={() => handleSelectItem(item)}  // NOVO: Clique seleciona
            >
              <span className="historico-arrow">▶</span>
              <span className="historico-data">
               {new Date(item.dataConsulta).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}  {/* NOVO: Formata data real como DD/MM */}
            </span>
            </div>
          ))
        ) : ( 
          
         <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Nenhum histórico encontrado.</p>  // NOVO: Se vazio
          )}
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

        {/* NOVO: Botão recarregar histórico por médico */}
        <button onClick={recarregarHistoricoMedico} className="btn-recarga">
          Recarregar Histórico
        </button>
        
        {/* NOVO: Mostra error se houver (ex: backend erro) */}
        {error && <p className="error">{error}</p>}

       {/* NOVO: Detalhes do item selecionado (se houver) */} 
       {selectedRegistro ? (
          <div className="registro-detalhes">
            <h4>{selectedRegistro.nomePaciente} - {new Date(selectedRegistro.dataConsulta).toLocaleDateString('pt-BR')}</h4>
            <p><strong>Transcrição:</strong></p>
            <div className="transcricao-content" style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
              {selectedRegistro.transcricao}
            </div>
            <audio controls src={`${API_BASE.replace('/api', '')}/audios/${selectedRegistro.audioPath}`} style={{ width: '100%' }}>
              Seu browser não suporta áudio.
            </audio>
          </div>
      ) : (
          historicos.length > 0 ? (
            <p>Selecione um item no histórico para ver detalhes.</p>
        ) : (
          <p>Nenhum registro disponível. Registre uma consulta primeiro.</p>
          )
        )}

        {/* NOVO: Seção de busca por paciente (opcional – integrada no content) */}
        <div className="busca-paciente">
          <h4>Buscar Histórico por Paciente</h4>
          <div className="form-group" style={{ maxWidth: '700px', width: '100%', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Nome do Paciente (ex: teste – busca parcial)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div style={{ marginTop: '8px', display: 'flex', gap: '10px' }}>
              <button 
                onClick={buscarPaciente} 
                disabled={buscandoPaciente || !searchTerm.trim()}
                className="btn-buscar"
              >
                {buscandoPaciente ? 'Buscando...' : 'Buscar'}
              </button>
              <button onClick={() => { setSearchTerm(''); setPacienteHistoricos([]); }} className="btn-limpar">Limpar</button>
            </div>
          </div>
          {error && <p className="error">{error}</p>}  {/* Erro na busca */}
          {pacienteHistoricos.length > 0 ? (
            pacienteHistoricos.map((h) => (
              <div key={h.id} className="registro-detalhes" style={{ marginTop: '10px' }}>
                <h5>{h.nomePaciente} - {new Date(h.dataConsulta).toLocaleDateString('pt-BR')}</h5>
                <p>Médico ID: {h.medicoId}</p>
                <p><strong>Transcrição:</strong> {h.transcricao}</p>
                <audio controls src={`${API_BASE.replace('/api', '')}/audios/${h.audioPath}`} style={{ width: '100%' }}>
                  Seu browser não suporta áudio.
                </audio>
              </div>
            ))
            ) : (
            !buscandoPaciente && searchTerm.trim() && <p>Nenhum histórico encontrado para "{searchTerm}".</p>
          )}
        </div>

        
        {/* botões auxiliares removidos - não tinham funcionalidade */}
      </div>
    </div>
  )
}

export default Historico