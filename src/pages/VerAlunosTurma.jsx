import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UsuarioService from '../Services/UsuarioService'

function VerAlunosTurma() {
  const navigate = useNavigate()
  const { turmaId } = useParams()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  
  const turmas = {
    1: { nome: 'Turma Violão', alunos: [{ id: 1, nome: 'Guilherme Castro', ra: 1, email: 'guilherme.castro@email.com', telefone: '(11) 99999-1234' }] },
    2: { nome: 'Turma Piano', alunos: [] }
  }
  
  const turma = turmas[turmaId]
  
  if (!turma) {
    return <div>Turma não encontrada</div>
  }
  
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">{turma.nome} - Alunos</div>
        <div className="nav-actions">
          <button className="profile-btn" onClick={() => navigate('/perfil')}>
            👤
          </button>
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
            Sair
          </button>
        </div>
      </nav>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard-professor">Dashboard</Link></li>
          <li><Link to="/minhas-turmas">Minhas Turmas</Link></li>
          <li><Link to="/chamada-professor">Chamada</Link></li>
          <li><Link to="/relatorios-professor">Relatórios</Link></li>
        </ul>
      </div>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar Saída</h3>
            <p>Tem certeza que deseja sair da sua conta?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
              <button className="confirm-btn" onClick={() => navigate('/')}>Sair</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="main-content">
        <div className="top-bar">
          <div className="breadcrumb">
            <span className="dashboard-title">{turma.nome} - Alunos</span>
          </div>
        </div>
        
        <div className="alunos-container">
          <button className="back-btn" onClick={() => navigate('/minhas-turmas')}>← Voltar</button>
          {turma.alunos.length > 0 ? (
            <div className="students-table">
              <table>
                <thead>
                  <tr>
                    <th>R.A.</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {turma.alunos.map(aluno => (
                    <tr key={aluno.id}>
                      <td>{aluno.ra}</td>
                      <td>
                        <div className="student-info">
                          <span className="student-icon">👥</span>
                          {aluno.nome}
                        </div>
                      </td>
                      <td>{aluno.email}</td>
                      <td>{aluno.telefone}</td>
                      <td>
                        <button className="action-btn view" onClick={() => navigate(`/perfil-aluno-professor/${aluno.id}`)}>Ver Perfil</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-students">
              <p>Nenhum aluno matriculado nesta turma.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerAlunosTurma
