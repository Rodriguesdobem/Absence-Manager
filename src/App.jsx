import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'
import Perfil from './pages/Perfil'
import CadastrarUsuario from './pages/CadastrarUsuario'
import CriarTurmas from './pages/CriarTurmas'
import PerfilAluno from './pages/PerfilAluno'
import EditarAluno from './pages/EditarAluno'
import RelatoriosAdmin from './pages/RelatoriosAdmin'
import VerTurmas from './pages/VerTurmas'
import DetalhesTurma from './pages/DetalhesTurma'
import VerAlunosTurma from './pages/VerAlunosTurma'
import './style.css'

function AnimatedRoutes() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [stage, setStage] = useState('enter')

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setStage('exit')
      const t = setTimeout(() => {
        setDisplayLocation(location)
        setStage('enter')
      }, 220)
      return () => clearTimeout(t)
    }
  }, [location])

  return (
    <div className={`page-transition page-transition-${stage}`}>
      <Routes location={displayLocation}>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/cadastrar-usuario" element={<CadastrarUsuario />} />
        <Route path="/criar-turmas" element={<CriarTurmas />} />
        <Route path="/aluno/:ra" element={<PerfilAluno />} />
        <Route path="/editar-aluno/:ra" element={<EditarAluno />} />
        <Route path="/relatorios-admin" element={<RelatoriosAdmin />} />
        <Route path="/ver-turmas" element={<VerTurmas />} />
        <Route path="/turma/:turmaId" element={<DetalhesTurma />} />
        <Route path="/ver-alunos-turma/:turmaId" element={<VerAlunosTurma />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App
