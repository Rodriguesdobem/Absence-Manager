import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Perfil() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  return (
    <div className="pf-root">

      {/* NAVBAR */}
      <nav className="pf-nav">
        <div className="pf-nav-left">
          <button className="pf-menu-btn" onClick={() => setMenuOpen(o => !o)} title="Menu">
            <svg viewBox="0 0 20 20" fill="#000" width="18" height="18"><path d="M3 4h14v2H3zm0 5h10v2H3zm0 5h14v2H3z"/></svg>
          </button>
          <span className="pf-nav-logo-text">AbsenceManager</span>
        </div>
        <div className="pf-nav-center">Meu Perfil</div>
        <div className="pf-nav-right">
          <button className="pf-nav-sair" onClick={() => setShowLogoutModal(true)}>Sair</button>
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
          <Link className="hb-nav-item" to="/dashboard" onClick={() => setMenuOpen(false)}>
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
        <div className="pf-modal-overlay">
          <div className="pf-modal">
            <h3>Confirmar Saída</h3>
            <p>Tem certeza que deseja sair da sua conta?</p>
            <div className="pf-modal-buttons">
              <button className="pf-cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
              <button className="pf-confirm-btn" onClick={() => navigate('/')}>Sair</button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="pf-main">
        <div className="pf-page-title">Meu <span>Perfil</span></div>

        {/* HERO */}
        <div className="pf-profile-hero">
          <div className="pf-hero-grid" />
          <div className="pf-hero-avatar">A</div>
          <div className="pf-hero-name">Administrador</div>
          <div className="pf-hero-role">
            <span className="pf-role-dot" />
            Administrador do Sistema
          </div>
          <div className="pf-hero-accent" />
        </div>

        {/* CARDS */}
        <div className="pf-cards-grid">

          {/* Informações Pessoais */}
          <div className="pf-card">
            <div className="pf-card-section-title">
              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              Informações Pessoais
            </div>
            <div className="pf-info-row"><span className="pf-info-label">Nome</span><span className="pf-info-value">Administrador</span></div>
            <div className="pf-info-row"><span className="pf-info-label">Email</span><span className="pf-info-value">admin@escola.com</span></div>
            <div className="pf-info-row"><span className="pf-info-label">Cargo</span><span className="pf-info-value">Administrador</span></div>
            <div className="pf-info-row"><span className="pf-info-label">Desde</span><span className="pf-info-value">Janeiro 2023</span></div>
          </div>

          {/* Configurações */}
          <div className="pf-card">
            <div className="pf-card-section-title">
              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              Configurações
            </div>
            <button className="pf-config-btn">
              <span className="pf-config-btn-left">
                <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Alterar Senha
              </span>
              <span className="pf-config-arrow">›</span>
            </button>
            <button className="pf-config-btn">
              <span className="pf-config-btn-left">
                <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                Notificações
              </span>
              <span className="pf-config-arrow">›</span>
            </button>
            <button className="pf-config-btn">
              <span className="pf-config-btn-left">
                <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                Tema
              </span>
              <span className="pf-config-arrow">›</span>
            </button>
            <button className="pf-config-btn">
              <span className="pf-config-btn-left">
                <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                Preferências
              </span>
              <span className="pf-config-arrow">›</span>
            </button>
          </div>

          {/* Estatísticas */}
          <div className="pf-card">
            <div className="pf-card-section-title">
              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              Estatísticas
            </div>
            <div className="pf-stats-grid">
              <div className="pf-stat-card">
                <div className="pf-stat-number">1</div>
                <div className="pf-stat-label">Alunos Cadastrados</div>
              </div>
              <div className="pf-stat-card">
                <div className="pf-stat-number">4</div>
                <div className="pf-stat-label">Turmas Criadas</div>
              </div>
              <div className="pf-stat-card pf-stat-full">
                <div className="pf-stat-number">30</div>
                <div className="pf-stat-label">Dias Ativo</div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="pf-footer">
        <div className="pf-footer-inner">
          <div className="pf-footer-col">
            <div className="pf-footer-logo-text">Absence<span>Manager</span></div>
            <p>Belval, Barueri - SP, 06420-150</p>
          </div>
          <div className="pf-footer-col">
            <div className="pf-footer-col-title">Contatos</div>
            <p>Sem Email Definido</p>
            <p>+55 (11) 99999-9999</p>
          </div>
          <div className="pf-footer-col">
            <div className="pf-footer-col-title">Links</div>
            <a>Home</a><a>Sobre nós</a><a>Contato</a>
          </div>
          <div className="pf-footer-col">
            <div className="pf-footer-col-title">Outros</div>
            <a>Políticas de Privacidade</a>
          </div>
        </div>
        <div className="pf-footer-bottom">
          <span>TCC — Informática 3º Ano · 2025</span>
          <span>AbsenceManager © 2025</span>
        </div>
      </footer>
    </div>
  )
}

export default Perfil
