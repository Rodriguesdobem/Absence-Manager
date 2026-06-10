import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import UsuarioService from './Services/UsuarioService'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'
import Perfil from './pages/Perfil'
import CadastrarUsuario from './pages/CadastrarUsuario'
import CriarTurmas from './pages/CriarTurmas'

import AlunoPerfilIntegrado from './pages/Aluno/AlunoPerfilIntegrado'

import RelatoriosAdmin from './pages/RelatoriosAdmin'
import VerTurmas from './pages/VerTurmas'
import DetalhesTurma from './pages/DetalhesTurma'
import VerAlunosTurma from './pages/VerAlunosTurma'
import AlunosListar from './pages/Aluno/AlunosListar'
import AlunoCadastrar from './pages/Aluno/AlunoCadastrar'
import AlunoEditar from './pages/Aluno/AlunoEditar'
import './style.css'


function RequireAuth({ children }) {
  return UsuarioService.getCurrentUser() ? children : <Navigate to="/login" replace />
}

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
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/perfil" element={<RequireAuth><Perfil /></RequireAuth>} />
        <Route path="/cadastrar-usuario" element={<RequireAuth><CadastrarUsuario /></RequireAuth>} />
        <Route path="/criar-turmas" element={<RequireAuth><CriarTurmas /></RequireAuth>} />
        <Route path="/aluno/:ra" element={<RequireAuth><AlunoPerfilIntegrado /></RequireAuth>} />
        <Route path="/alunos" element={<RequireAuth><AlunosListar /></RequireAuth>} />
        <Route path="/alunos/novo" element={<RequireAuth><AlunoCadastrar /></RequireAuth>} />
        <Route path="/alunos/editar/:rm" element={<RequireAuth><AlunoEditar /></RequireAuth>} />
        <Route path="/editar-aluno/:rm" element={<RequireAuth><AlunoEditar /></RequireAuth>} />
        <Route path="/relatorios-admin" element={<RequireAuth><RelatoriosAdmin /></RequireAuth>} />
        <Route path="/ver-turmas" element={<RequireAuth><VerTurmas /></RequireAuth>} />
        <Route path="/turma/:turmaId" element={<RequireAuth><DetalhesTurma /></RequireAuth>} />
        <Route path="/ver-alunos-turma/:turmaId" element={<RequireAuth><VerAlunosTurma /></RequireAuth>} />

        {/* Rotas do módulo Admin */}
        <Route path="/relatorios" element={<RequireAuth><RelatoriosAdmin /></RequireAuth>} />


      </Routes>
    </div>
  )
}

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme') || 'dark'
    document.documentElement.dataset.theme = savedTheme
  }, [])

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App
