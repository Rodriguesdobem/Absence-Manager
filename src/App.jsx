import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'
import Perfil from './pages/Perfil'
import CadastrarUsuario from './pages/CadastrarUsuario'
import Gerenciamento from './pages/Gerenciamento'
import CriarTurmas from './pages/CriarTurmas'
import PerfilAluno from './pages/PerfilAluno'
import EditarAluno from './pages/EditarAluno'
import RelatoriosAdmin from './pages/RelatoriosAdmin'
import VerAlunosTurma from './pages/VerAlunosTurma'
import './style.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/cadastrar-usuario" element={<CadastrarUsuario />} />
        <Route path="/gerenciamento" element={<Gerenciamento />} />
        <Route path="/criar-turmas" element={<CriarTurmas />} />
        <Route path="/aluno/:ra" element={<PerfilAluno />} />
        <Route path="/editar-aluno/:ra" element={<EditarAluno />} />
        <Route path="/relatorios-admin" element={<RelatoriosAdmin />} />
        <Route path="/ver-alunos-turma/:turmaId" element={<VerAlunosTurma />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
