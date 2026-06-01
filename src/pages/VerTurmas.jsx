import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SharedNav from '../common/SharedNav'
import { TURMAS_DATA } from '../common/turmasData'

const PERIODO_COLOR = {
  Matutino:   { bg: 'rgba(76,201,240,0.1)',  border: 'rgba(76,201,240,0.25)',  text: '#4CC9F0' },
  Vespertino: { bg: 'rgba(160,168,255,0.1)', border: 'rgba(160,168,255,0.25)', text: '#a0a8ff' },
  Noturno:    { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', text: 'rgba(255,255,255,0.5)' },
}

function VerTurmas() {
  const navigate = useNavigate()
  const turmas = Object.values(TURMAS_DATA)
  const [filtro, setFiltro] = useState('')

  const filtradas = turmas.filter(t =>
    t.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    t.professor.toLowerCase().includes(filtro.toLowerCase()) ||
    t.curso.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <div className="db-root">
      <SharedNav activeItem="ver-turmas" />

      <main className="db-main">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', position: 'relative', zIndex: 1, flexWrap: 'wrap', gap: '12px' }}>
          <div className="db-page-title" style={{ marginBottom: 0 }}>
            Ver <span style={{ color: '#4CC9F0' }}>Turmas</span>
          </div>
          <input
            type="text"
            placeholder="Buscar turma, professor ou curso..."
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 16px', fontSize: '13px', color: '#fff', fontFamily: 'Plus Jakarta Sans,sans-serif', outline: 'none', width: '280px', transition: 'border 0.2s' }}
            onFocus={e => e.target.style.borderColor = '#4CC9F0'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
        </div>

        {/* Stats rápidas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '12px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
          {[
            { label: 'Total de Turmas', value: turmas.length },
            { label: 'Total de Alunos', value: turmas.reduce((acc, t) => acc + t.alunos.length, 0) },
            { label: 'Vagas Disponíveis', value: turmas.reduce((acc, t) => acc + (t.capacidade - t.alunos.length), 0) },
          ].map(s => (
            <div key={s.label} className="db-card" style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#4CC9F0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>{s.label}</div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Grid de turmas */}
        {filtradas.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '14px', position: 'relative', zIndex: 1 }}>
            {filtradas.map(turma => {
              const ocupacao = Math.round((turma.alunos.length / turma.capacidade) * 100)
              const pc = PERIODO_COLOR[turma.periodo] || PERIODO_COLOR.Noturno
              return (
                <div key={turma.id} className="db-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

                  {/* Topo */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: pc.text, background: pc.bg, border: `1px solid ${pc.border}`, borderRadius: '6px', padding: '3px 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {turma.periodo}
                    </span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>{turma.ano}</span>
                  </div>

                  {/* Nome e curso */}
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', marginBottom: '4px' }}>{turma.nome}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{turma.curso} · {turma.professor}</div>
                  </div>

                  {/* Barra de ocupação */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>
                      <span>Ocupação</span>
                      <span>{turma.alunos.length} / {turma.capacidade} alunos</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px' }}>
                      <div style={{ height: '4px', width: `${ocupacao}%`, background: ocupacao > 80 ? '#f25f5c' : '#4CC9F0', borderRadius: '2px', transition: 'width 0.3s' }} />
                    </div>
                  </div>

                  {/* Alunos preview */}
                  {turma.alunos.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {turma.alunos.slice(0, 2).map(a => (
                        <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#111118', borderRadius: '8px', padding: '7px 10px' }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(76,201,240,0.12)', border: '1px solid rgba(76,201,240,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: '#4CC9F0', flexShrink: 0 }}>
                            {a.nome.charAt(0)}
                          </div>
                          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{a.nome}</span>
                        </div>
                      ))}
                      {turma.alunos.length > 2 && (
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', paddingLeft: '4px' }}>+{turma.alunos.length - 2} aluno(s)</div>
                      )}
                    </div>
                  )}

                  {/* Botão */}
                  <button
                    onClick={() => navigate(`/turma/${turma.id}`)}
                    style={{ marginTop: 'auto', width: '100%', background: 'rgba(76,201,240,0.1)', border: '1px solid rgba(76,201,240,0.25)', borderRadius: '8px', padding: '10px', color: '#4CC9F0', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans,sans-serif', transition: 'all 0.2s' }}
                    onMouseOver={e => { e.currentTarget.style.background = '#4CC9F0'; e.currentTarget.style.color = '#000' }}
                    onMouseOut={e => { e.currentTarget.style.background = 'rgba(76,201,240,0.1)'; e.currentTarget.style.color = '#4CC9F0' }}
                  >
                    Ver Detalhes →
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="db-card db-updates-empty" style={{ padding: '60px', position: 'relative', zIndex: 1 }}>
            <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" style={{ width: 40, height: 40, stroke: 'rgba(255,255,255,0.12)' }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>Nenhuma turma encontrada.</span>
          </div>
        )}
      </main>
    </div>
  )
}

export default VerTurmas
