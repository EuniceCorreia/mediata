import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Cadastro from './Componentes/Cadastro.jsx'
import Historico from './Componentes/Historico.jsx'
import RegistroPaciente from './Componentes/RegistroPaciente.jsx'
import NavBar from './NavBar.jsx'

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />      
          <Route path="/registro-paciente" element={<RegistroPaciente />} />
          <Route path="/historico" element={<Historico />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App