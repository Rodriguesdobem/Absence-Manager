import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SharedNav from '../common/SharedNav'

function Gerenciamento() {
  const navigate = useNavigate()
  const [filtroTurma, setFiltroTurma] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')
  const [filtroNome, setFiltroNome] = useState('')
  const [alunos, setAlunos] = useState([
    { ra: 1, nome: 'Guilherme Castro', nascimento: '15/03/2000', email: 'guilherme.castro@email.com', celular: '(11) 99999-1234', turma: 'Turma Violão', ativo: true, faltas: 2, totalAulas: 20 }
  ])
  
  const toggleStatus = (index) => {
    const novosAlunos = [...alunos]
    novosAlunos[index].ativo = !novosAlunos[index].ativo
    setAlunos(novosAlunos)
  }
  
  let alunosFiltrados = alunos
  if (filtroNome) alunosFiltrados = alunosFiltrados.filter(aluno => aluno.nome.toLowerCase().includes(filtroNome.toLowerCase()))
  if (filtroTurma) alunosFiltrados = alunosFiltrados.filter(aluno => aluno.turma === filtroTurma)
  if (filtroStatus) alunosFiltrados = alunosFiltrados.filter(aluno => filtroStatus === 'ativo' ? aluno.ativo : !aluno.ativo)
  
  const turmas = [...new Set(alunos.map(aluno => aluno.turma))]
  
  return (
    <div className="db-root">
      <SharedNav activeItem="gerenciamento" />
      
      <div className="main-content">
        <div className="top-bar">
          <div className="breadcrumb">
            <span className="dashboard-title">Alunos</span>
          </div>
        </div>
        
        <div className="management-container">
          <div className="management-header">
            <h2>Gerenciar Aluno</h2>
            <div className="search-filters">
              <input type="text" placeholder="Nome" className="filter-input" value={filtroNome} onChange={(e) => setFiltroNome(e.target.value)} />
              <select className="filter-select" value={filtroTurma} onChange={(e) => setFiltroTurma(e.target.value)}>
                <option value="">Todas as Turmas</option>
                {turmas.map(turma => (
                  <option key={turma} value={turma}>{turma}</option>
                ))}
              </select>
              <select className="filter-select" value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
                <option value="">Todos</option>
                <option value="ativo">Ativos</option>
                <option value="inativo">Inativos</option>
              </select>
            </div>
          </div>
          
          <div className="students-table">
            <table>
              <thead>
                <tr>
                  <th>R.A.</th>
                  <th>Aluno</th>
                  <th>Turma</th>
                  <th>Status</th>
                  <th>Nascimento</th>
                  <th>Email</th>
                  <th>Celular</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunosFiltrados.map((aluno, index) => {
                  const originalIndex = alunos.findIndex(a => a.ra === aluno.ra && a.nome === aluno.nome)
                  return (
                    <tr key={index} className={!aluno.ativo ? 'inactive-row' : ''}>
                      <td>{aluno.ra}</td>
                      <td>
                        <div className="student-info" onClick={() => navigate(`/aluno/${aluno.ra}`)} style={{cursor: 'pointer'}}>
                          <span className="student-icon">👥</span>
                          {aluno.nome}
                        </div>
                      </td>
                      <td>{aluno.turma}</td>
                      <td>
                        <span className={`status ${aluno.ativo ? 'ativo' : 'inativo'}`}>
                          {aluno.ativo ? '✓' : 'X'}
                        </span>
                      </td>
                      <td>{aluno.nascimento}</td>
                      <td>{aluno.email}</td>
                      <td>{aluno.celular}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view">Ver</button>
                          <button className="action-btn edit" onClick={() => navigate(`/editar-aluno/${aluno.ra}`)}>Editar</button>
                          <button 
                            className={`action-btn toggle ${aluno.ativo ? 'deactivate' : 'activate'}`}
                            onClick={() => toggleStatus(originalIndex)}
                          >
                            {aluno.ativo ? 'X' : '✓'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <footer className="rodape">
        <div className="rodape-div">
          <div className="rodape-div-1">
            <div className="rodape-div-1-coluna">
              <span><b>LOGO</b></span>
              <p>Belval, Barueri - SP, 06420-150</p>
            </div>
          </div>
          <div className="rodape-div-2">
            <div className="rodape-div-2-coluna">
              <span><b>Contatos</b></span>
              <p>Sem Email Definido</p>
              <p>+55 (11) 99999-9999</p>
            </div>
          </div>
          <div className="rodape-div-3">
            <div className="rodape-div-3-coluna">
              <span><b>Links</b></span>
              <p><a href="#servicos">Home</a></p>
              <p><a href="#empresa">Sobre nós</a></p>
              <p><a href="#contato">Contato</a></p>
            </div>
          </div>
          <div className="rodape-div-4">
            <div className="rodape-div-4-coluna">
              <span><b>Outros</b></span>
              <p>Políticas de Privacidade</p>
            </div>
          </div>
        </div>
        <p className="rodape-direitos">Copyright © 2023 – Todos os Direitos Reservados.</p>
      </footer>
    </div>
  )
}

export default Gerenciamento
