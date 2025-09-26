/*import React, { useState } from 'react';
import '../Layout/RegistroPaciente.css';

const RegistroPaciente = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioText, setAudioText] = useState('');

  const handleStartRecording = () => {
    setIsRecording(true);
    // Aqui você implementaria a lógica de gravação de áudio
    console.log('Iniciando gravação...');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Aqui você implementaria a lógica para parar a gravação
    console.log('Parando gravação...');
  };

  const handleAddNote = () => {
    // Lógica para adicionar nota manual
    console.log('Adicionando nota...');
  };

  return (
    <div className="registro-container">
      <header className="registro-header">
        <h1 className="logo">mediAta</h1>
        <div className="header-icons">
          <button className="icon-btn">
            <img 
              src="https://placeholder-image-service.onrender.com/image/24x24?prompt=Medical clipboard icon in white&id=8b036baf-005e-4fab-b928-07ac3ed9e4e7&customer_id=cus_T4d6xUNJro4RcY" 
              alt="Medical clipboard icon for patient records" 
            />
          </button>
          <button className="icon-btn">
            <img 
              src="https://placeholder-image-service.onrender.com/image/24x24?prompt=User profile icon in white&id=8b036baf-005e-4fab-b928-07ac3ed9e4e7&customer_id=cus_T4d6xUNJro4RcY" 
              alt="User profile icon for account access" 
            />
          </button>
        </div>
      </header>

      <main className="registro-main">
        <div className="stethoscope-background">
          <img 
            src="https://placeholder-image-service.onrender.com/image/400x400?prompt=Light gray stethoscope silhouette watermark style medical background&id=8b036baf-005e-4fab-b928-07ac3ed9e4e7&customer_id=cus_T4d6xUNJro4RcY" 
            alt="Stethoscope silhouette background decoration" 
            className="stethoscope-watermark"
          />
        </div>

        <div className="content-wrapper">
          <h2 className="main-question">O que o paciente relatou hoje?</h2>

          <div className="recording-area">
            <div className="recording-controls">
              <button 
                className="btn-add-note" 
                onClick={handleAddNote}
                title="Adicionar nota manual"
              >
                +
              </button>

              <div className="audio-controls">
                <button 
                  className={`btn-microphone ${isRecording ? 'recording' : ''}`}
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  title={isRecording ? 'Parar gravação' : 'Iniciar gravação'}
                >
                  <img 
                    src="https://placeholder-image-service.onrender.com/image/24x24?prompt=Microphone icon in dark green&id=8b036baf-005e-4fab-b928-07ac3ed9e4e7&customer_id=cus_T4d6xUNJro4RcY" 
                    alt="Microphone icon for voice recording" 
                  />
                </button>

                <button 
                  className="btn-waveform"
                  title="Visualizar forma de onda"
                >
                  <img 
                    src="https://placeholder-image-service.onrender.com/image/24x24?prompt=Audio waveform bars icon in dark green&id=8b036baf-005e-4fab-b928-07ac3ed9e4e7&customer_id=cus_T4d6xUNJro4RcY" 
                    alt="Audio waveform visualization icon" 
                  />
                </button>
              </div>
            </div>

            {isRecording && (
              <div className="recording-indicator">
                <div className="pulse-animation"></div>
                <span>Gravando...</span>
              </div>
            )}
          </div>

          <div className="disclaimer">
            <div className="checkbox-container">
              <input type="checkbox" id="terms" className="checkbox" defaultChecked />
              <label htmlFor="terms" className="checkbox-label">
                <span className="checkmark">✓</span>
                Declaro que revisei as informações geradas pela plataforma MediAta e 
                assumo total responsabilidade pelas condutas médicas descritas.
              </label>
            </div>
          </div>
        </div>

        {!accepted && (
          <p className="warning" style={{ color: '#b33', marginTop: '0.75rem' }}>
            Marque a declaração abaixo para habilitar a transcrição.
          </p>
        )}
      </main>
    </div>
  );
};

export default RegistroPaciente;*/




import React, { useState, useRef } from 'react'
import '../Layout/RegistroPaciente.css';

function RegistroPaciente() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const mediaRecorderRef = useRef(null)

  const startRecording = async () => {
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
        // Aqui seria implementada a transcrição
        setIsProcessing(true)
        
        // Simulação de transcrição
        setTimeout(() => {
          setTranscript("Paciente relata dor abdominal há 3 dias, localizada no quadrante superior direito, de intensidade moderada a forte, com piora após alimentação. Nega febre, náuseas ou vômitos. Refere que a dor irradia para as costas.")
          setIsProcessing(false)
        }, 2000)
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Erro ao acessar microfone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  // chat-like input
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([])

  const sendChat = () => {
    const text = chatInput.trim()
    if (!text) return
    setChatMessages(prev => [...prev, { role: 'user', text }])
    setChatInput('')
    // opcional: aqui podemos integrar com backend/IA e adicionar resposta
  }

  const onChatKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendChat()
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
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="6" fill="white"/>
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
                placeholder="Digite aqui (Enter para enviar)..."
                rows={1}
              />
              <button className="chat-send" onClick={sendChat}>Enviar</button>
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
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="A transcrição aparecerá aqui..."
              rows="10"
            />
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