import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UsuarioService from '../Services/UsuarioService'

function Perfil() {
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
        <div className="nav-brand">Meu Perfil</div>
        <div className="nav-actions">
          <button className="profile-btn active">
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
            <span className="dashboard-title">Meu Perfil</span>
          </div>
        </div>
        
        <div className="perfil-page">
          <div className="perfil-card-main">
            <div className="perfil-avatar-section">
              <div className="avatar-large">P</div>
              <h2>Administrador</h2>
              <p className="perfil-role">Administrador do Sistema</p>
            </div>
            
            <div className="perfil-info-section">
              <div className="info-card">
                <h3>Informações Pessoais</h3>
                <div className="info-item">
                  <span className="info-label">Nome:</span>
                  <span className="info-value">Administrador</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">admin@escola.com</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Cargo:</span>
                  <span className="info-value">Administrador</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Desde:</span>
                  <span className="info-value">Janeiro 2023</span>
                </div>
              </div>
              
              <div className="info-card">
                <h3>Configurações</h3>
                <div className="config-actions">
                  <button className="config-btn">Alterar Senha</button>
                  <button className="config-btn">Notificações</button>
                  <button className="config-btn">Tema</button>
                  <button className="config-btn">Preferências</button>
                </div>
              </div>
              
              <div className="info-card">
                <h3>Estatísticas</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-number">1</span>
                    <span className="stat-label">Alunos Cadastrados</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">4</span>
                    <span className="stat-label">Turmas Criadas</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">30</span>
                    <span className="stat-label">Dias Ativo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Perfil
