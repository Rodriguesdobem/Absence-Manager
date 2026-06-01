import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SharedNav({ title, activeItem }) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', key: 'dashboard', icon: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
    { to: '/cadastrar-usuario', label: 'Cadastrar Usuário', key: 'cadastrar', icon: <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg> },
    { to: '/gerenciamento', label: 'Gerenciamento', key: 'gerenciamento', icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
    { to: '/criar-turmas', label: 'Criar Turmas', key: 'turmas', icon: <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { to: '/relatorios-admin', label: 'Relatórios', key: 'relatorios', icon: <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> },
  ]

  return (
    <>
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
          {navItems.slice(0, 1).map(item => (
            <Link key={item.key} className={`hb-nav-item${activeItem === item.key ? ' hb-active' : ''}`} to={item.to} onClick={() => setMenuOpen(false)}>
              <span className="hb-nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <div className="hb-sidebar-section-label">Gestão</div>
          {navItems.slice(1, 4).map(item => (
            <Link key={item.key} className={`hb-nav-item${activeItem === item.key ? ' hb-active' : ''}`} to={item.to} onClick={() => setMenuOpen(false)}>
              <span className="hb-nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <div className="hb-sidebar-divider" />
          {navItems.slice(4).map(item => (
            <Link key={item.key} className={`hb-nav-item${activeItem === item.key ? ' hb-active' : ''}`} to={item.to} onClick={() => setMenuOpen(false)}>
              <span className="hb-nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
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
    </>
  )
}

export default SharedNav
