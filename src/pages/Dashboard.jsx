import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UsuarioService from '../Services/UsuarioService'

function Dashboard() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Absence Manager</div>
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
            <span className="dashboard-title">Dashboard</span>
          </div>
        </div>
        
        <div className="stats-row">
          <div className="welcome-card">
            <div className="welcome-icon">👋</div>
            <div className="welcome-title">Bem-Vindo de volta, Admin!</div>
            <div className="account-name">Administrador do Sistema</div>
          </div>
          <div className="datetime-card">
            <div className="clock-header">
              <div className="clock-icon">🕐</div>
              <h3>Horário Atual</h3>
            </div>
            <div className="time-display">{currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</div>
            <div className="date-display">{currentTime.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>
        
        <div className="charts-row">
          <div className="activities-section">
            <h3>Atualizações</h3>
            <div className="no-updates">
              <p>Sem Atualizações</p>
            </div>
          </div>
          
          <div className="weather-card">
            <h3>Clima Mundial</h3>
            <div className="main-weather">
              <div className="city-name-main">Barueri</div>
              <div className="city-temp-main">28°C</div>
              <div className="city-desc-main">☀️ Ensolarado</div>
              <div className="weather-details">
                <span>💧 Umidade: 65%</span>
                <span>💨 Vento: 12 km/h</span>
              </div>
            </div>
            <div className="other-cities">
              <div className="city-weather-small">
                <span className="city-name-small">São Paulo</span>
                <span className="city-temp-small">25°C</span>
              </div>
              <div className="city-weather-small">
                <span className="city-name-small">Rio de Janeiro</span>
                <span className="city-temp-small">32°C</span>
              </div>
              <div className="city-weather-small">
                <span className="city-name-small">Brasília</span>
                <span className="city-temp-small">26°C</span>
              </div>
            </div>
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

export default Dashboard
