import React from 'react'
import SharedNav from '../common/SharedNav'

function Perfil() {
  return (
    <div className="db-root">
      <SharedNav activeItem="perfil" />

      {/* MAIN */}
      <main className="db-main">
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

    </div>
  )
}

export default Perfil
