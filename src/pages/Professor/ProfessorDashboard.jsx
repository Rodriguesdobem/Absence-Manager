import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SharedNav from '../../common/SharedNav'
import ProfessorService from '../../Services/ProfessorService'

function getErrorMessage(error) {
  return error?.response?.data?.message || error?.message || 'Erro ao carregar dashboard.'
}

function ProfessorDashboard() {
  const navigate = useNavigate()
  const [dados, setDados] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const carregar = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await ProfessorService.dashboard()
        setDados(response.data)
      } catch (err) {
        setError(getErrorMessage(err))
        setDados(null)
      } finally {
        setLoading(false)
      }
    }
    carregar()
  }, [])

  const cards = [
    { label: 'Turmas', value: dados?.totalTurmas ?? 0 },
    { label: 'Alunos vinculados', value: dados?.totalAlunos ?? 0 },
    { label: 'Chamadas feitas', value: dados?.chamadasFeitas ?? 0 },
    { label: 'Presenca geral', value: `${dados?.percentualPresenca ?? 0}%` },
    { label: 'Faltas gerais', value: `${dados?.percentualFaltas ?? 0}%` },
  ]

  return (
    <div className="db-root">
      <SharedNav activeItem="prof-dashboard" />
      <main className="db-main">
        <div className="db-page-title">Area do <span style={{ color: '#4CC9F0' }}>Professor</span></div>

        {loading ? (
          <div className="db-card" style={{ padding: 24 }}>Carregando indicadores...</div>
        ) : error ? (
          <div className="db-card" style={{ padding: 24, color: '#f25f5c' }}>{error}</div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 14, marginBottom: 22, position: 'relative', zIndex: 1 }}>
              {cards.map(card => (
                <div key={card.label} className="db-card" style={{ padding: '18px 20px' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#4CC9F0', textTransform: 'uppercase', marginBottom: 8 }}>{card.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#fff' }}>{card.value}</div>
                </div>
              ))}
            </div>

            <div className="db-card" style={{ padding: 24, position: 'relative', zIndex: 1 }}>
              <div className="db-card-section-title" style={{ marginBottom: 14 }}>Minhas turmas</div>
              {(dados?.turmas || []).length > 0 ? (
                <div style={{ display: 'grid', gap: 10 }}>
                  {dados.turmas.map(turma => (
                    <button
                      key={turma.id}
                      type="button"
                      onClick={() => navigate(`/professor/turmas/${turma.id}`)}
                      style={{ textAlign: 'left', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', padding: 16, cursor: 'pointer', color: '#fff', fontFamily: 'Plus Jakarta Sans,sans-serif' }}
                    >
                      <strong>{turma.nome}</strong>
                      <span style={{ color: 'rgba(255,255,255,0.55)', marginLeft: 10 }}>{turma.instrumento || '-'} - {turma.periodo || '-'}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="db-updates-empty" style={{ padding: 28 }}>Nenhuma turma vinculada ao seu usuario.</div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default ProfessorDashboard
