import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const timeStr = currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
  const dateStr = currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="db-root">

      {/* NAVBAR */}
      <nav className="db-nav">
        <div className="db-nav-left">
          <button className="db-menu-btn" onClick={() => setMenuOpen(o => !o)} title="Menu">
            <svg viewBox="0 0 20 20" fill="#000" width="18" height="18"><path d="M3 4h14v2H3zm0 5h10v2H3zm0 5h14v2H3z"/></svg>
          </button>
          <span className="db-nav-logo-text">AbsenceManager</span>
        </div>
        <div className="db-nav-right">
          <button className="db-nav-sair" onClick={() => setShowLogoutModal(true)}>Sair</button>
        </div>
      </nav>

      {/* SIDEBAR */}
      <aside className={`hb-sidebar ${menuOpen ? 'hb-sidebar-open' : ''}`}>
        <div className="hb-sidebar-header">
          <div className="hb-sidebar-logo">
            <div className="hb-sidebar-logo-icon">
              <svg viewBox="0 0 20 20"><path d="M3 4h14v2H3zm0 5h10v2H3zm0 5h14v2H3z"/></svg>
            </div>
            <span className="hb-sidebar-logo-text">AbsenceManager</span>
          </div>
          <button className="hb-sidebar-close" onClick={() => setMenuOpen(false)} title="Fechar">✕</button>
        </div>
        <nav className="hb-sidebar-nav">
          <div className="hb-sidebar-section-label">Principal</div>
          <Link className="hb-nav-item hb-active" to="/dashboard" onClick={() => setMenuOpen(false)}>
            <span className="hb-nav-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span>
            Dashboard
          </Link>
          <div className="hb-sidebar-section-label">Gestão</div>
          <Link className="hb-nav-item" to="/cadastrar-usuario" onClick={() => setMenuOpen(false)}>
            <span className="hb-nav-icon"><svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg></span>
            Cadastrar Usuário
          </Link>
          <Link className="hb-nav-item" to="/gerenciamento" onClick={() => setMenuOpen(false)}>
            <span className="hb-nav-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></span>
            Gerenciamento
          </Link>
          <Link className="hb-nav-item" to="/criar-turmas" onClick={() => setMenuOpen(false)}>
            <span className="hb-nav-icon"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>
            Criar Turmas
          </Link>
          <div className="hb-sidebar-divider" />
          <Link className="hb-nav-item" to="/relatorios-admin" onClick={() => setMenuOpen(false)}>
            <span className="hb-nav-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></span>
            Relatórios
          </Link>
        </nav>
        <div className="hb-sidebar-footer">
          <Link className="hb-sidebar-user" to="/perfil" onClick={() => setMenuOpen(false)}>
            <div className="hb-sidebar-user-avatar">A</div>
            <div>
              <div className="hb-sidebar-user-name">Administrador</div>
              <div className="hb-sidebar-user-role">Admin do Sistema</div>
            </div>
          </Link>
        </div>
      </aside>
      {menuOpen && <div className="hb-sidebar-overlay hb-open" onClick={() => setMenuOpen(false)} />}

      {/* MODAL LOGOUT */}
      {showLogoutModal && (
        <div className="db-modal-overlay">
          <div className="db-modal">
            <h3>Confirmar Saída</h3>
            <p>Tem certeza que deseja sair da sua conta?</p>
            <div className="db-modal-buttons">
              <button className="db-cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
              <button className="db-confirm-btn" onClick={() => navigate('/')}>Sair</button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="db-main">
        <div className="db-page-title">Dashboard</div>

        <div className="db-grid-top">
          {/* Welcome */}
          <div className="db-card db-card-welcome">
            <div className="db-welcome-top">
              <span className="db-welcome-emoji">👋</span>
              <span className="db-welcome-label">Bem-vindo de volta</span>
            </div>
            <div className="db-welcome-bottom">
              <div className="db-welcome-name">Admin!</div>
              <div className="db-welcome-role">
                <span className="db-role-dot"></span>
                Administrador do Sistema
              </div>
            </div>
            <div className="db-welcome-accent"></div>
          </div>

          {/* Clock */}
          <div className="db-card db-card-clock">
            <div className="db-clock-label">
              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Horário Atual
            </div>
            <div>
              <div className="db-clock-time">{timeStr}</div>
              <div className="db-clock-date">{dateStr}</div>
            </div>
          </div>
        </div>

        <div className="db-grid-bottom">
          {/* Updates */}
          <div className="db-card db-card-updates">
            <div className="db-card-section-title">
              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              Atualizações
            </div>
            <div className="db-updates-empty">
              <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>Sem Atualizações</span>
            </div>
          </div>

          {/* Weather */}
          <div className="db-card db-card-weather">
            <div className="db-card-section-title">
              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>
              Clima Mundial
            </div>
            <div className="db-weather-main">
              <div className="db-weather-city">Barueri</div>
              <div className="db-weather-temp">28°C</div>
              <div className="db-weather-desc"><span>🌤</span><span>Ensolarado</span></div>
              <div className="db-weather-meta">
                <div className="db-weather-meta-item"><span>💧</span><span>Umidade: 65%</span></div>
                <div className="db-weather-meta-item"><span>💨</span><span>Vento: 12 km/h</span></div>
              </div>
            </div>
            <div className="db-weather-cities">
              <div className="db-city-chip">São Paulo<br/><strong>25°C</strong></div>
              <div className="db-city-chip">Rio de Janeiro<br/><strong>32°C</strong></div>
              <div className="db-city-chip">Brasília<br/><strong>26°C</strong></div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="db-footer">
        <div className="db-footer-inner">
          <div className="db-footer-col">
            <div className="db-footer-logo-text">Absence<span>Manager</span></div>
            <p>Belval, Barueri - SP, 06420-150</p>
          </div>
          <div className="db-footer-col">
            <div className="db-footer-col-title">Contatos</div>
            <p>Sem Email Definido</p>
            <p>+55 (11) 99999-9999</p>
          </div>
          <div className="db-footer-col">
            <div className="db-footer-col-title">Links</div>
            <a>Home</a>
            <a>Sobre nós</a>
            <a>Contato</a>
          </div>
          <div className="db-footer-col">
            <div className="db-footer-col-title">Outros</div>
            <a>Políticas de Privacidade</a>
          </div>
        </div>
        <div className="db-footer-bottom">
          <span>TCC — Informática 3º Ano · 2025</span>
          <span>AbsenceManager © 2025</span>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard
