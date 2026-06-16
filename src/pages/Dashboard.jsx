import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SharedNav from '../common/SharedNav'
import ClimaMundial from './ClimaMundial'

function Dashboard() {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())


  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const timeStr = currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
  const dateStr = currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="db-root">
      <SharedNav activeItem="dashboard" />

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
          <ClimaMundial />

        </div>
      </main>

    </div>
  )
}

export default Dashboard