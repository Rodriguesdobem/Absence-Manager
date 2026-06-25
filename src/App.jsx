import React, { useEffect, useState } from 'react'
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
import AlunoEditar from './pages/Aluno/AlunoEditar'
import ProfessorDashboard from './pages/Professor/ProfessorDashboard'
import ProfessorTurmas from './pages/Professor/ProfessorTurmas'
import ProfessorTurmaDetalhes from './pages/Professor/ProfessorTurmaDetalhes'
import ProfessorChamada from './pages/Professor/ProfessorChamada'
import ProfessorRelatorios from './pages/Professor/ProfessorRelatorios'
import './style.css'


function RequireAuth({ children }) {
  return UsuarioService.getCurrentUser() ? children : <Navigate to="/login" replace />
}

function RequireRole({ role, children }) {
  const user = UsuarioService.getCurrentUser()
  if (!user) return <Navigate to="/login" replace />
  if (user.nivelAcesso !== role) {
    const fallback = user.nivelAcesso === 'PROFESSOR' ? '/professor/dashboard' : user.nivelAcesso === 'ADMIN' ? '/dashboard' : '/perfil'
    return <Navigate to={fallback} replace />
  }
  return children
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
        <Route path="/dashboard" element={<RequireRole role="ADMIN"><Dashboard /></RequireRole>} />
        <Route path="/perfil" element={<RequireAuth><Perfil /></RequireAuth>} />
        <Route path="/cadastrar-usuario" element={<RequireRole role="ADMIN"><CadastrarUsuario /></RequireRole>} />
        <Route path="/criar-turmas" element={<RequireRole role="ADMIN"><CriarTurmas /></RequireRole>} />
        <Route path="/aluno/:ra" element={<RequireAuth><AlunoPerfilIntegrado /></RequireAuth>} />
        <Route path="/editar-aluno/:rm" element={<RequireRole role="ADMIN"><AlunoEditar /></RequireRole>} />
        <Route path="/relatorios-admin" element={<RequireRole role="ADMIN"><RelatoriosAdmin /></RequireRole>} />
        <Route path="/ver-turmas" element={<RequireRole role="ADMIN"><VerTurmas /></RequireRole>} />
        <Route path="/turma/:turmaId" element={<RequireRole role="ADMIN"><DetalhesTurma /></RequireRole>} />
        <Route path="/ver-alunos-turma/:turmaId" element={<RequireRole role="ADMIN"><VerAlunosTurma /></RequireRole>} />

        <Route path="/professor/dashboard" element={<RequireRole role="PROFESSOR"><ProfessorDashboard /></RequireRole>} />
        <Route path="/professor/turmas" element={<RequireRole role="PROFESSOR"><ProfessorTurmas /></RequireRole>} />
        <Route path="/professor/turmas/:turmaId" element={<RequireRole role="PROFESSOR"><ProfessorTurmaDetalhes /></RequireRole>} />
        <Route path="/professor/chamada" element={<RequireRole role="PROFESSOR"><ProfessorChamada /></RequireRole>} />
        <Route path="/professor/turmas/:turmaId/chamada" element={<RequireRole role="PROFESSOR"><ProfessorChamada /></RequireRole>} />
        <Route path="/professor/relatorios" element={<RequireRole role="PROFESSOR"><ProfessorRelatorios /></RequireRole>} />

        {/* Rotas do módulo Admin */}
        <Route path="/relatorios" element={<RequireRole role="ADMIN"><RelatoriosAdmin /></RequireRole>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />


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
