import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SharedNav from '../common/SharedNav'
import TurmaServices from '../Services/TurmaServices'
import TurmaAlunoServices from '../Services/TurmaAlunoServices'

function getErrorMessage(error) {
  return error?.response?.data?.message || error?.response?.data || error?.message || 'Erro ao carregar turma.'
}

function professorNome(professor) {
  return professor?.nome || 'Sem professor definido'
}

function DetalhesTurma() {
  const navigate = useNavigate()
  const { turmaId } = useParams()
  const [turma, setTurma] = useState(null)
  const [alunosTurma, setAlunosTurma] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const carregar = async () => {
      setLoading(true)
      setError('')
      try {
        const [turmaResponse, alunosResponse] = await Promise.all([
          TurmaServices.buscarTurmaPorId(turmaId),
          TurmaAlunoServices.listarPorTurma(turmaId),
        ])
        setTurma(turmaResponse.data)
        setAlunosTurma(alunosResponse.data || [])
      } catch (err) {
        setError(getErrorMessage(err))
        setTurma(null)
        setAlunosTurma([])
      } finally {
        setLoading(false)
      }
    }

    carregar()
  }, [turmaId])

  if (loading) {
    return (
      <div className="db-root">
        <SharedNav activeItem="turmas" />
        <main className="db-main">
          <div className="db-card" style={{ padding: '24px 28px', position: 'relative', zIndex: 1 }}>
            <div className="db-card-section-title" style={{ marginBottom: 0 }}>Carregando turma...</div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !turma) {
    return (
      <div className="db-root">
        <SharedNav activeItem="turmas" />
        <main className="db-main">
          <div className="db-card" style={{ padding: '24px 28px', position: 'relative', zIndex: 1 }}>
            <div className="db-card-section-title">Turma nao encontrada</div>
            <p style={{ color: '#f25f5c', fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>{String(error || 'Turma nao encontrada.')}</p>
            <button
              onClick={() => navigate('/ver-turmas')}
              style={{ marginTop: 16, background: 'rgba(76,201,240,0.1)', border: '1px solid rgba(76,201,240,0.25)', borderRadius: '8px', padding: '10px 16px', color: '#4CC9F0', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans,sans-serif' }}
            >
              Voltar para turmas
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="db-root">
      <SharedNav activeItem="turmas" />

      <main className="db-main">
        <div className="db-page-title">
          {turma.nome} - <span style={{ color: '#4CC9F0' }}>Detalhes</span>
        </div>

        <button
          onClick={() => navigate(-1)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(76,201,240,0.1)', border: '1px solid rgba(76,201,240,0.25)', borderRadius: '8px', padding: '8px 16px', color: '#4CC9F0', fontSize: '13px', fontWeight: 700, cursor: 'pointer', marginBottom: '24px', fontFamily: 'Plus Jakarta Sans,sans-serif', transition: 'all 0.2s', position: 'relative', zIndex: 1 }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(76,201,240,0.2)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(76,201,240,0.1)'}
        >
          Voltar
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '14px', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
          {[
            { label: 'Instrumento', value: turma.instrumento || '-' },
            { label: 'Periodo', value: turma.periodo || '-' },
            { label: 'Ano Letivo', value: turma.ano || '-' },
            { label: 'Vagas', value: turma.vagas ?? '-' },
            { label: 'Professor', value: professorNome(turma.professor) },
            { label: 'Status', value: turma.statusTurma || '-' },
          ].map(item => (
            <div key={item.label} className="db-card" style={{ padding: '18px 20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#4CC9F0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>{item.label}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '-0.4px' }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div className="db-card" style={{ position: 'relative', zIndex: 1, overflow: 'auto' }}>
          <div className="db-card-section-title" style={{ padding: '20px 24px 0' }}>
            <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 14, height: 14 }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Professor Matriculado
          </div>

          <div style={{ padding: '10px 24px 18px' }}>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>Professor</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>
              {professorNome(turma.professor)}
            </div>
          </div>

          <div className="db-card-section-title" style={{ padding: '0 24px 0' }}>
            <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 14, height: 14 }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Alunos Matriculados
          </div>

          {alunosTurma.length > 0 ? (

            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Plus Jakarta Sans,sans-serif' }}>
              <thead>
                <tr>
                  {['RM', 'Nome', 'Telefone', 'Status', 'Acoes'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#4CC9F0', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {alunosTurma.map(vinculo => {
                  const aluno = vinculo.aluno || {}
                  return (
                    <tr key={vinculo.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{aluno.rm}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{aluno.nome}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{aluno.telefone || '-'}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: vinculo.status ? '#4ade80' : '#f25f5c', fontWeight: 700 }}>{vinculo.status ? 'Ativo' : 'Inativo'}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <button
                          onClick={() => navigate(`/aluno/${aluno.rm}`)}
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