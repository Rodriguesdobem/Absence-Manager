import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SharedNav from '../common/SharedNav'

import { TURMAS_DATA } from '../common/turmasData'

function DetalhesTurma() {
  const navigate = useNavigate()
  const { turmaId } = useParams()
  const turma = TURMAS_DATA[turmaId]

  if (!turma) {
    return (
      <div className="db-root">
        <SharedNav activeItem="turmas" />
        <main className="db-main">
          <p style={{ color: '#fff' }}>Turma não encontrada.</p>
        </main>
      </div>
    )
  }

  const presenca = turma.alunos.length > 0
    ? Math.round(turma.alunos.reduce((acc, a) => acc + ((a.totalAulas - a.faltas) / a.totalAulas) * 100, 0) / turma.alunos.length)
    : null

  return (
    <div className="db-root">
      <SharedNav activeItem="turmas" />

      <main className="db-main">
        <div className="db-page-title">
          {turma.nome} — <span style={{ color: '#4CC9F0' }}>Detalhes</span>
        </div>

        {/* Botão voltar */}
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(76,201,240,0.1)', border: '1px solid rgba(76,201,240,0.25)', borderRadius: '8px', padding: '8px 16px', color: '#4CC9F0', fontSize: '13px', fontWeight: 700, cursor: 'pointer', marginBottom: '24px', fontFamily: 'Plus Jakarta Sans,sans-serif', transition: 'all 0.2s', position: 'relative', zIndex: 1 }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(76,201,240,0.2)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(76,201,240,0.1)'}
        >
          ← Voltar
        </button>

        {/* Cards de info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '14px', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
          {[
            { label: 'Curso', value: turma.curso },
            { label: 'Período', value: turma.periodo },
            { label: 'Ano Letivo', value: turma.ano },
            { label: 'Capacidade', value: `${turma.alunos.length} / ${turma.capacidade}` },
            { label: 'Professor', value: turma.professor },
            { label: 'Freq. Média', value: presenca !== null ? `${presenca}%` : '—' },
          ].map(item => (
            <div key={item.label} className="db-card" style={{ padding: '18px 20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#4CC9F0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>{item.label}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '-0.4px' }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Tabela de alunos */}
        <div className="db-card" style={{ position: 'relative', zIndex: 1, overflow: 'auto' }}>
          <div className="db-card-section-title" style={{ padding: '20px 24px 0' }}>
            <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 14, height: 14 }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Alunos Matriculados
          </div>

          {turma.alunos.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Plus Jakarta Sans,sans-serif' }}>
              <thead>
                <tr>
                  {['R.A.', 'Nome', 'Email', 'Telefone', 'Faltas', 'Freq.', 'Ações'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#4CC9F0', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {turma.alunos.map(aluno => {
                  const freq = Math.round(((aluno.totalAulas - aluno.faltas) / aluno.totalAulas) * 100)
                  const freqColor = freq >= 75 ? '#4ade80' : '#f25f5c'
                  return (
                    <tr key={aluno.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{aluno.ra}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{aluno.nome}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{aluno.email}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{aluno.telefone}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: aluno.faltas > 0 ? '#f25f5c' : 'rgba(255,255,255,0.5)', fontWeight: aluno.faltas > 0 ? 700 : 400 }}>{aluno.faltas}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: freqColor }}>{freq}%</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <button
                          onClick={() => navigate(`/aluno/${aluno.ra}`)}
                          style={{ background: 'rgba(76,201,240,0.1)', border: '1px solid rgba(76,201,240,0.25)', borderRadius: '6px', padding: '6px 14px', color: '#4CC9F0', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans,sans-serif', transition: 'all 0.2s' }}
                          onMouseOver={e => e.currentTarget.style.background = 'rgba(76,201,240,0.2)'}
                          onMouseOut={e => e.currentTarget.style.background = 'rgba(76,201,240,0.1)'}
                        >
                          Ver Perfil
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div className="db-updates-empty" style={{ padding: '48px' }}>
              <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" style={{ width: 40, height: 40, stroke: 'rgba(255,255,255,0.12)' }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>Nenhum aluno matriculado nesta turma.</span>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default DetalhesTurma
