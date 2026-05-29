import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UsuarioService from '../Services/UsuarioService'

function RelatoriosAdmin() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Relatórios</div>
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
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/cadastrar-usuario">Cadastrar Usuário</Link></li>
          <li><Link to="/gerenciamento">Gerenciamento</Link></li>
          <li><Link to="/criar-turmas">Criar Turmas</Link></li>
          <li><Link to="/relatorios-admin">Relatórios</Link></li>
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
            <span className="dashboard-title">Relatórios Administrativos</span>
          </div>
        </div>
        
        <div className="relatorios-container">
          <div className="relatorio-card">
            <h3>Relatório Geral de Frequência</h3>
            <p>Frequência de todos os alunos da instituição</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
          <div className="relatorio-card">
            <h3>Relatório por Professor</h3>
            <p>Desempenho e estatísticas por professor</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
          <div className="relatorio-card">
            <h3>Relatório por Turma</h3>
            <p>Análise detalhada por turma</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
          <div className="relatorio-card">
            <h3>Alunos Críticos</h3>
            <p>Lista de alunos com frequência abaixo de 75%</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
          <div className="relatorio-card">
            <h3>Relatório Mensal</h3>
            <p>Resumo completo do mês</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
          <div className="relatorio-card">
            <h3>Exportar Dados</h3>
            <p>Exportar todos os dados em Excel/PDF</p>
            <button className="btn-primary">Exportar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RelatoriosAdmin
