import React, { useState, useRef, useEffect } from 'react'
import '../Layout/RegistroPaciente.css';
import { API_BASE } from '../constants';

function RegistroPaciente() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)  // Para transcrição
  const [isSaving, setIsSaving] = useState(false)  // Para salvamento
  const [accepted, setAccepted] = useState(false)
  const [acceptanceWarning, setAcceptanceWarning] = useState(false)
  const [error, setError] = useState('');  // NOVO: Para erros do backend
  const [success, setSuccess] = useState('');  // NOVO: Para sucesso (ex: "Salva!")
  const [nomePaciente, setNomePaciente] = useState('');  // NOVO: Input para nome (obrigatório para backend)
  const [cpfPaciente, setCpfPaciente] = useState('');  // NOVO: Input para CPF
  const [audioBlob, setAudioBlob] = useState(null);  // NOVO: Armazena o áudio gravado
  const mediaRecorderRef = useRef(null) 
  
  
  const medicoId = localStorage.getItem('medicoId');  // NOVO: Do login (Entrar.jsx)

  const startRecording = async () => {
    if (!medicoId) {
      setError('Faça login primeiro (MedicoId não encontrado).');
      return;
    }
    if (!nomePaciente.trim()) {
      setError('Digite o nome do paciente antes de gravar.');
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
        const blob = new Blob(chunks, { type: 'audio/mp4' })
        setAudioBlob(blob);  // Armazena o áudio
        // Envia automaticamente para transcrever (sem salvar ainda)
        await transcrevAudio(blob);
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

  // NOVO: Função para transcrever áudio sem salvar
  const transcrevAudio = async (audioBlob) => {
    setIsProcessing(true);
    setError('');
    
    if (!medicoId) {
      setError('MedicoId não encontrado. Faça login novamente.');
      setIsProcessing(false);
      return;
    }
    
    const audioFile = new File([audioBlob], 'gravado.m4a', { type: 'audio/mp4' });
    const formData = new FormData();
    formData.append('MedicoId', medicoId);
    formData.append('NomePaciente', nomePaciente || 'Paciente Anônimo');
    formData.append('CpfPaciente', cpfPaciente || '');
    formData.append('AudioArquivo', audioFile);
    
    console.log('Transcrevendo áudio...');
    
    try {
      const response = await fetch(`${API_BASE}/api/registro/gravar`, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Transcrição recebida:', data);
        setTranscript(data.transcricao || '');  // Apenas preenche o campo, não salva
      } else {
        const errorText = await response.text();
        console.error('Erro na transcrição:', response.status, errorText);
        setError(`Erro ao transcrever: ${errorText || 'Erro desconhecido'}`);
      }
    } catch (err) {
      console.error('Erro na transcrição:', err);
      setError('Erro de conexão: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // NOVO: Função para enviar áudio ao backend (POST /api/registro/gravar)
  const enviarParaBackend = async (audioBlob, nomePacienteInput) => {
    setIsProcessing(true)
    setError('')
    setSuccess('')
    
    // Validação do MedicoId
    if (!medicoId) {
      setError('MedicoId não encontrado. Faça login novamente.');
      setIsProcessing(false);
      return;
    }
    
    // Cria File do Blob (backend aceita como AudioArquivo)
    const audioFile = new File([audioBlob], 'gravado.m4a', { type: 'audio/mp4' })
    const formData = new FormData()
    formData.append('MedicoId', medicoId)
    formData.append('NomePaciente', nomePacienteInput)
    formData.append('CpfPaciente', cpfPaciente || '')
    formData.append('AudioArquivo', audioFile)  // Multipart para backend
    
    console.log('Enviando:', { medicoId, nomePaciente: nomePacienteInput, cpf: cpfPaciente, audioSize: audioFile.size });
    
    // Log do FormData
    for (let pair of formData.entries()) {
      console.log('FormData:', pair[0], '=', pair[1] instanceof File ? `File(${pair[1].name}, ${pair[1].size} bytes)` : pair[1]);
    }
    
    try {
      const response = await fetch(`${API_BASE}/api/registro/gravar`, {
        method: 'POST',
        body: formData,  // Sem headers (FormData auto)
      })
      if (response.ok) {
        const data = await response.json()
        console.log('Resposta do servidor:', data);
        // Backend retorna RegistroPaciente com transcricao
        setTranscript(data.transcricao || '')  // Set real transcrição
        setSuccess(`Consulta salva! ID: ${data.id}.`) // mensagem curta para o usuário
        setNomePaciente('')  // Limpa input
        setCpfPaciente('')  // Limpa CPF
        console.log('Registro OK:', data)
      } else {
        const errorText = await response.text()
        console.error('Erro do servidor:', response.status, errorText);
        setError(`Erro ${response.status}: ${errorText || 'Erro ao salvar consulta'}`)
      }
    } catch (err) {
      console.error('Erro no envio:', err);
      setError('Erro de conexão: ' + err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  // limpa automaticamente mensagens de sucesso/erro após alguns segundos
  useEffect(() => {
    if (!success) return
    const t = setTimeout(() => setSuccess(''), 5000)
    return () => clearTimeout(t)
  }, [success])

  useEffect(() => {
    if (!error) return
    const t = setTimeout(() => setError(''), 7000)
    return () => clearTimeout(t)
  }, [error])

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
    if (!accepted) {
      setError('Marque a declaração antes de salvar.');
      return;
    }
    
    if (!medicoId) {
      setError('MedicoId não encontrado. Faça login novamente.');
      return;
    }
    
    if (!audioBlob && !transcript.trim()) {
      setError('Grave um áudio ou digite uma transcrição antes de salvar.');
      return;
    }
    
    setIsSaving(true);
    setError('');
    setSuccess('');
    
    // Envia audio + transcript editado
    const formData = new FormData();
    formData.append('MedicoId', medicoId);
    formData.append('NomePaciente', nomePaciente || 'Paciente Anônimo');
    formData.append('CpfPaciente', cpfPaciente || '');
    
    if (audioBlob) {
      const audioFile = new File([audioBlob], 'gravado.m4a', { type: 'audio/mp4' });
      formData.append('AudioArquivo', audioFile);
    }
    
    if (transcript.trim()) {
      formData.append('Transcricao', transcript);
    }
    
    console.log('Salvando manualmente:', { medicoId, nomePaciente: nomePaciente || 'Paciente Anônimo', cpf: cpfPaciente, temAudio: !!audioBlob, temTranscript: !!transcript.trim() });
    
    // Log do FormData
    for (let pair of formData.entries()) {
      console.log('FormData:', pair[0], '=', pair[1]);
    }
    
    try {
      const response = await fetch(`${API_BASE}/api/registro/gravar`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Salvar manual OK:', data);
        setSuccess(`Consulta salva! ID: ${data.id}`);
        setTranscript('');
        setNomePaciente('');
        setCpfPaciente('');
        setAudioBlob(null);  // Limpa áudio
        setChatMessages([]);
      } else {
        const errorText = await response.text();
        console.error('Erro ao salvar:', response.status, errorText);
        setError(`Erro ${response.status}: ${errorText || 'Erro ao salvar'}`);
      }
    } catch (err) {
      console.error('Erro no salvamento manual:', err);
      setError('Erro de conexão: ' + err.message);
    } finally {
      setIsSaving(false);
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

      {success && (
        <div className="alert success" role="status">
          <span>{success}</span>
          <button className="alert-close" onClick={() => setSuccess('')} aria-label="Fechar">×</button>
        </div>
      )}

      {error && (
        <div className="alert error" role="alert">
          <span>{error}</span>
          <button className="alert-close" onClick={() => setError('')} aria-label="Fechar">×</button>
        </div>
      )}

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

      {/* NOVO: Input para CPF do paciente (igual ao campo Nome) */}
      <div className="form-group">
        <label>CPF do Paciente</label>
        <input
          type="text"
          placeholder="Digite o CPF do paciente"
          value={cpfPaciente}
          onChange={(e) => setCpfPaciente(e.target.value)}
          disabled={isProcessing}
        />
      </div>

      <div className="recording-section">
      <div className="recording-controls">
        <button 
          className={`record-main-btn ${isRecording ? 'recording' : ''}`}
          onClick={() => {
            if (isProcessing) return
            if (!accepted) {
              // show temporary warning
              setAcceptanceWarning(true)
              setTimeout(() => setAcceptanceWarning(false), 4000)
              return
            }
            if (isRecording) stopRecording(); else startRecording()
          }}
          disabled={isProcessing}
          title={isProcessing ? 'Processando áudio...' : (isRecording ? 'Parar gravação' : 'Iniciar gravação')}
          aria-label={isRecording ? 'Parar gravação' : 'Iniciar gravação'}
        >
          {isRecording ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="6" y="6" width="12" height="12" rx="2" fill="white"/>
            </svg>
          ) : (
            /* exibe um ícone de play para iniciar gravação */
            <svg className="stethoscope-icon" width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <path d="M5 3v18l15-9L5 3z" fill="currentColor" />
            </svg>
          )}
        </button>

        {/* mensagem de aviso quando clica sem aceitar a declaração */}
        {acceptanceWarning && (
          <div className="acceptance-warning">Marque a declaração para habilitar a transcrição</div>
        )}

          {/* botões auxiliares removidos: Microfone e Configurações */}

          {/* área de mensagens removida conforme solicitado */}
        </div>

        <div className="transcript-section">
          {isProcessing && (
            <div style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              zIndex: 10,
              pointerEvents: 'none'
            }}>
              <div className="spinner" style={{
                border: '3px solid #f3f3f3',
                borderTop: '3px solid var(--primary-green)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ margin: 0, fontSize: '12px', color: '#333' }}>Processando...</p>
            </div>
          )}
          <textarea 
            value={transcript}
            onChange={(e) => {
              // permitir edição da transcrição apenas se aceito
              if (!accepted) return
              setTranscript(e.target.value)
            }}
            placeholder={accepted ? "Aguardando transcrição..." : "Marque a declaração para habilitar a edição da transcrição..."}
            readOnly={!accepted}
            disabled={!accepted || isProcessing}
            rows="10"
          />
          {/* NOVO: Botão para salvar manual (após edição ou chat) */}
          <button 
            onClick={salvarConsulta}
            disabled={!accepted || isSaving || (!audioBlob && !transcript.trim())}
            className="btn-salvar"
            style={{ marginTop: '10px', padding: '10px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            title={!accepted ? 'Marque a declaração' : 'Salvar consulta com áudio e transcrição'}
          >
            {isSaving ? (
              <>
                <div className="spinner" style={{
                  border: '2px solid #ffffff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Salvando...
              </>
            ) : (
              'Salvar Consulta'
            )}
          </button>
        </div>
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