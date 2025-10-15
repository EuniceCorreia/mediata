import React, {}from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'  //NOVO: Adicionei Navigate para redirecionamentos
import Home from './Home.jsx'
import Cadastro from './Componentes/Cadastro.jsx'
import Entrar from './Componentes/Entrar.jsx'
import Historico from './Componentes/Historico.jsx'
import RegistroPaciente from './Componentes/RegistroPaciente.jsx'
import NavBar from './NavBar.jsx'

function App() {
  // NOVO: Check login (localStorage do Entrar.jsx)
  const medicoId = localStorage.getItem('medicoId');

// NOVO: Componente protegido (wrapper para rotas que precisam de login)
  const ProtectedRoute = ({ children }) => {
    return medicoId ? children : <Navigate to="/entrar" replace />;  // Redireciona para login se não logado
  };

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
           {/* Home sempre pública em / (landing primeiro – sem redirect) */}
          <Route path="/" element={<Home />} />
           {/* Rotas públicas */}
          <Route path="/cadastro" element={<Cadastro />} />     
          <Route path="/entrar" element={<Entrar />} /> 
          {/* Rotas protegidas (só se logado) */}
          <Route path="/registro-paciente" element={<ProtectedRoute><RegistroPaciente/></ProtectedRoute>} />
          <Route path="/historico" element={<ProtectedRoute><Historico /></ProtectedRoute>} />
          {/* NOVO: Catch-all para URLs inválidas (redireciona para login) */}
          <Route path="*" element={<Navigate to="/entrar" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App