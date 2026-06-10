import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SharedNav from '../common/SharedNav'
import TurmaServices from '../Services/TurmaServices'
import TurmaAlunoServices from '../Services/TurmaAlunoServices'

function getErrorMessage(error) {
  return error?.response?.data?.message || error?.response?.data || error?.message || 'Erro ao carregar alunos da turma.'
}

function VerAlunosTurma() {
  const navigate = useNavigate()
  const { turmaId } = useParams()
  const [turma, setTurma] = useState(null)
  const [vinculos, setVinculos] = useState([])
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
        setVinculos(alunosResponse.data || [])
      } catch (err) {
        setError(getErrorMessage(err))
        setTurma(null)
        setVinculos([])
      } finally {
        setLoading(false)
      }
    }

    carregar()
  }, [turmaId])

  if (loading) {
    return (
      <div className="db-root">
        <SharedNav activeItem="ver-turmas" />
        <main className="db-main"><p style={{ color: '#fff' }}>Carregando alunos...</p></main>
      </div>
    )
  }

  if (error || !turma) {
    return (
      <div className="db-root">
        <SharedNav activeItem="ver-turmas" />
        <main className="db-main"><p style={{ color: '#fff' }}>{String(error || 'Turma nao encontrada')}</p></main>
      </div>
    )
  }

  return (
    <div className="db-root">
      <SharedNav activeItem="ver-turmas" />

      <main className="db-main">
        <div className="db-page-title">{turma.nome} - <span style={{ color: '#4CC9F0' }}>Alunos</span></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(76,201,240,0.1)', border: '1px solid rgba(76,201,240,0.25)', borderRadius: '8px', padding: '8px 16px', color: '#4CC9F0', fontSize: '13px', fontWeight: 700, cursor: 'pointer', marginBottom: '20px', fontFamily: 'Plus Jakarta Sans,sans-serif', transition: 'all 0.2s' }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(76,201,240,0.2)' }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(76,201,240,0.1)' }}
          >
            Voltar
          </button>

          {vinculos.length > 0 ? (
            <div className="db-card" style={{ overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Plus Jakarta Sans,sans-serif' }}>
                <thead>
                  <tr>
                    {['RM', 'Nome', 'Email', 'Telefone', 'Acoes'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#4CC9F0', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vinculos.map(vinculo => {
                    const aluno = vinculo.aluno || {}
                    return (
                      <tr key={vinculo.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{aluno.rm}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{aluno.nome}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{aluno.usuario?.username || '-'}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{aluno.telefone || '-'}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <button
                            onClick={() => navigate(`/aluno/${aluno.rm}`)}
                            style={{ background: 'rgba(76,201,240,0.1)', border: '1px solid rgba(76,201,240,0.25)', borderRadius: '6px', padding: '6px 14px', color: '#4CC9F0', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans,sans-serif', transition: 'all 0.2s' }}
                            onMouseOver={e => { e.currentTarget.style.background = 'rgba(76,201,240,0.2)' }}
                            onMouseOut={e => { e.currentTarget.style.background = 'rgba(76,201,240,0.1)' }}
                          >
                            Ver Perfil
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="db-card db-updates-empty" style={{ padding: '48px' }}>
              <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" style={{ width: 40, height: 40, stroke: 'rgba(255,255,255,0.12)' }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              <span>Nenhum aluno matriculado nesta turma.</span>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default VerAlunosTurma
