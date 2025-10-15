import React, { useState, useRef } from 'react'
import '../Layout/RegistroPaciente.css';
import { API_BASE } from '../constants';

function RegistroPaciente() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [error, setError] = useState('');  // NOVO: Para erros do backend
  const [success, setSuccess] = useState('');  // NOVO: Para sucesso (ex: "Salva!")
  const [nomePaciente, setNomePaciente] = useState('');  // NOVO: Input para nome (obrigatório para backend)
  const mediaRecorderRef = useRef(null) 
  
  
  const medicoId = localStorage.getItem('medicoId');  // NOVO: Do login (Entrar.jsx)

  const startRecording = async () => {
    if (!medicoId) {
      setError('Faça login primeiro (MedicoId não encontrado).');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks = []
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' })
        // Integração com backend: Envia para transcrição/salvar
        await enviarParaBackend(audioBlob, nomePaciente)
      }

      mediaRecorder.start()
      setIsRecording(true)
      setError('')  // Limpa erro
    } catch (error) {
      setError('Erro ao acessar microfone: ' + error.message)
      console.error('Erro ao acessar microfone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  // NOVO: Função para enviar áudio ao backend (POST /api/registro/gravar)
  const enviarParaBackend = async (audioBlob, nomePacienteInput) => {
    if (!nomePacienteInput.trim()) {
      setError('Digite o nome do paciente antes de gravar.');
      return;
    }
    setIsProcessing(true)
    setError('')
    setSuccess('')
    // Cria File do Blob (backend aceita como AudioArquivo)
    const audioFile = new File([audioBlob], 'gravado.wav', { type: 'audio/wav' })
    const formData = new FormData()
    formData.append('MedicoId', medicoId)
    formData.append('NomePaciente', nomePacienteInput)
    formData.append('AudioArquivo', audioFile)  // Multipart para backend
    try {
      const response = await fetch(`${API_BASE}/registro/gravar`, {
        method: 'POST',
        body: formData,  // Sem headers (FormData auto)
      })
      if (response.ok) {
        const data = await response.json()
        // Backend retorna RegistroPaciente com transcricao (mock ou Flask PT-BR)
        setTranscript(data.transcricao)  // Set real transcrição
        setSuccess(`Consulta salva! ID: ${data.id}. Áudio: ${data.audioPath}`)
        setNomePaciente('')  // Limpa input
        console.log('Registro OK:', data)
      } else {
        const errorText = await response.text()
        setError(errorText || 'Erro ao salvar consulta')
      }
      } catch (err) {
      setError('Erro de conexão: ' + err.message)
      console.error('Erro no envio:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  // chat-like input
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([])

  const sendChat = () => {
    // não permite enviar se o usuário não aceitou a declaração
    if (!accepted) return

    const text = chatInput.trim()
    if (!text) return
    setChatMessages(prev => [...prev, { role: 'user', text }])
    setChatInput('')
    // opcional: aqui podemos integrar com backend/IA e adicionar resposta
    // Por agora, mantido como mock
  }

  const onChatKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendChat()
    }
  }

  // NOVO: Salvar manual (se editar transcript ou chat – após accepted)
  const salvarConsulta = async () => {
    if (!accepted || !transcript.trim()) {
      setError('Marque a declaração e edite a transcrição antes de salvar.')
      return
    }
    // Envia transcript editado como texto (sem áudio novo – backend salva como registro)
    const formData = new FormData()
    formData.append('MedicoId', medicoId)
    formData.append('NomePaciente', nomePaciente || 'Paciente Anônimo')  // Default se vazio
    formData.append('Transcricao', transcript)  // Transcript editado/chat
    try {
      const response = await fetch(`${API_BASE}/registro/gravar`, {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        const data = await response.json()
        setSuccess(`Consulta salva manualmente! ID: ${data.id}`)
        setChatMessages([])  // Limpa chat
        console.log('Salvar manual OK:', data)
      } else {
        const errorText = await response.text()
        setError(errorText)
      }
    } catch (err) {
      setError('Erro de conexão: ' + err.message)
    }
  }

  return (
    <div className="registro-container">
      <div className="stethoscope-background">
        <svg width="300" height="300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.1">
          <path d="M11 2a2 2 0 0 0-2 2v6.5a0.5 0.5 0 0 1-0.5 0.5h-2a0.5 0.5 0 0 1-0.5-0.5V4a2 2 0 0 0-4 0v6.5A4.5 4.5 0 0 0 6.5 15H8a2 2 0 0 1 2 2v1a2 2 0 0 0 4 0v-1a2 2 0 0 1 2-2h1.5a4.5 4.5 0 0 0 4.5-4.5V4a2 2 0 0 0-4 0v6.5a0.5 0.5 0 0 1-0.5 0.5h-2a0.5 0.5 0 0 1-0.5-0.5V4a2 2 0 0 0-2-2z"/>
          <circle cx="20" cy="18" r="2"/>
        </svg>
      </div>

      <h1>O que o paciente relatou hoje?</h1>

      {/* NOVO: Input para NomePaciente (obrigatório para backend) */}
      <div className="form-group">
        <label>Nome do Paciente</label>
        <input
          type="text"
          placeholder="Digite o nome do paciente"
          value={nomePaciente}
          onChange={(e) => setNomePaciente(e.target.value)}
          disabled={isProcessing}
          required
        />
      </div>

      <div className="recording-section">
      <div className="recording-controls">
        <button 
          className={`record-main-btn ${isRecording ? 'recording' : ''}`}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing || !accepted}
          title={isProcessing ? 'Processando áudio...' : (!accepted ? 'Marque a declaração para habilitar a transcrição' : 'Iniciar gravação')}
        >
          {isRecording ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="12" height="12" rx="2" fill="white"/>
            </svg>
          ) : (
            /* exibe um estetoscópio com baixa opacidade, parecendo parte do fundo */
            <svg className="stethoscope-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <path d="M11 2a2 2 0 0 0-2 2v6.5a0.5 0.5 0 0 1-0.5 0.5h-2a0.5 0.5 0 0 1-0.5-0.5V4a2 2 0 0 0-4 0v6.5A4.5 4.5 0 0 0 6.5 15H8a2 2 0 0 1 2 2v1a2 2 0 0 0 4 0v-1a2 2 0 0 1 2-2h1.5a4.5 4.5 0 0 0 4.5-4.5V4a2 2 0 0 0-4 0v6.5a0.5 0.5 0 0 1-0.5 0.5h-2a0.5 0.5 0 0 1-0.5-0.5V4a2 2 0 0 0-2-2z" fill="currentColor" />
              <circle cx="20" cy="18" r="2" fill="currentColor" />
            </svg>
          )}
        </button>

          <div className="control-buttons">
            <button className="control-btn" title="Microfone">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" fill="currentColor"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </button>
            <button className="control-btn" title="Configurações">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>

          {/* Chat-like input (estilo ChatGPT) */}
          <div className="chat-area">
            <div className="chat-messages">
              {chatMessages.length === 0 ? (
                <div className="chat-empty">Envie uma mensagem ou use a gravação</div>
              ) : (
                chatMessages.map((m, idx) => (
                  <div key={idx} className={`chat-message ${m.role}`}>
                    {m.text}
                  </div>
                ))
              )}
            </div>

            <div className="chat-input">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={onChatKeyDown}
                placeholder={accepted ? "Digite aqui (Enter para enviar)..." : "Marque a declaração para habilitar a digitação..."}
                rows={1}
                disabled={!accepted || isProcessing}
              />
              <button
                className="chat-send"
                onClick={sendChat}
                disabled={!accepted || isProcessing || chatInput.trim() === ''}
                title={!accepted ? 'Marque a declaração para habilitar o envio' : 'Enviar'}
              >Enviar</button>
            </div>
          </div>
        </div>

        {isProcessing && (
          <div className="processing-indicator">
            <p>Processando áudio...</p>
          </div>
        )}

        {transcript && (
          <div className="transcript-section">
            <textarea 
              value={transcript}
              onChange={(e) => {
                // permitir edição da transcrição apenas se aceito
                if (!accepted) return
                setTranscript(e.target.value)
              }}
              placeholder={accepted ? "A transcrição aparecerá aqui..." : "Marque a declaração para habilitar a edição da transcrição..."}
              readOnly={!accepted}
              disabled={!accepted || isProcessing}
              rows="10"
            />
            {/* NOVO: Botão para salvar manual (após edição ou chat) */}
            <button 
              onClick={salvarConsulta}
              disabled={!accepted || isProcessing || !transcript.trim()}
              className="btn-salvar"
              style={{ marginTop: '10px', padding: '10px', width: '100%' }}
              title={!accepted ? 'Marque a declaração' : 'Salvar consulta editada'}
            >
              {isProcessing ? 'Salvando...' : 'Salvar Consulta Editada'}
            </button>
          </div>
        )}
      </div>

      <div className="disclaimer">
        <input
          type="checkbox"
          id="disclaimer"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        <label htmlFor="disclaimer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          Declaro que revisei as informações geradas pela plataforma MediAta e assumo total responsabilidade pelas condutas médicas descritas.
        </label>
      </div>
    </div>
  )
}

export default RegistroPaciente