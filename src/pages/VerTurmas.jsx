import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SharedNav from '../common/SharedNav'
import TurmaServices from '../Services/TurmaServices'

const PERIODO_COLOR = {
  Matutino: { bg: 'rgba(76,201,240,0.1)', border: 'rgba(76,201,240,0.25)', text: '#4CC9F0' },
  Vespertino: { bg: 'rgba(160,168,255,0.1)', border: 'rgba(160,168,255,0.25)', text: '#a0a8ff' },
  Noturno: { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', text: 'rgba(255,255,255,0.5)' },
}

function getErrorMessage(error) {
  return error?.response?.data?.message || error?.response?.data || error?.message || 'Erro ao carregar turmas.'
}

function professorNome(professor) {
  return professor?.nome || 'Sem professor'
}

function VerTurmas() {
  const navigate = useNavigate()
  const [turmas, setTurmas] = useState([])
  const [filtro, setFiltro] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const carregar = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await TurmaServices.listarTurmas()
        setTurmas(response.data || [])
      } catch (err) {
        setError(getErrorMessage(err))
        setTurmas([])
      } finally {
        setLoading(false)
      }
    }

    carregar()
  }, [])

  const filtradas = useMemo(() => {
    const termo = filtro.toLowerCase()
    return turmas.filter(turma => {
      const professor = professorNome(turma.professor).toLowerCase()
      return (
        String(turma.nome || '').toLowerCase().includes(termo) ||
        String(turma.instrumento || '').toLowerCase().includes(termo) ||
        professor.includes(termo)
      )
    })
  }, [filtro, turmas])

  const totalVagas = turmas.reduce((acc, turma) => acc + Number(turma.vagas || 0), 0)

  return (
    <div className="db-root">
      <SharedNav activeItem="ver-turmas" />

      <main className="db-main">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', position: 'relative', zIndex: 1, flexWrap: 'wrap', gap: '12px' }}>
          <div className="db-page-title" style={{ marginBottom: 0 }}>
            Ver <span style={{ color: '#4CC9F0' }}>Turmas</span>
          </div>
          <input
            type="text"
            placeholder="Buscar turma, professor ou instrumento..."
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 16px', fontSize: '13px', color: '#fff', fontFamily: 'Plus Jakarta Sans,sans-serif', outline: 'none', width: '280px', transition: 'border 0.2s' }}
            onFocus={e => e.target.style.borderColor = '#4CC9F0'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '12px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
          {[
            { label: 'Total de Turmas', value: turmas.length },
            { label: 'Turmas Ativas', value: turmas.filter(t => t.statusTurma !== 'INATIVA').length },
            { label: 'Total de Vagas', value: totalVagas },
          ].map(s => (
            <div key={s.label} className="db-card" style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#4CC9F0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>{s.label}</div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="db-card" style={{ padding: '24px 28px', position: 'relative', zIndex: 1 }}>
            <div className="db-card-section-title" style={{ marginBottom: 0 }}>Carregando turmas...</div>
          </div>
        ) : error ? (
          <div className="db-card" style={{ padding: '24px 28px', position: 'relative', zIndex: 1 }}>
            <div className="db-card-section-title">Erro</div>
            <p style={{ color: '#f25f5c', fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>{String(error)}</p>
          </div>
        ) : filtradas.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '14px', position: 'relative', zIndex: 1 }}>
            {filtradas.map(turma => {
              const pc = PERIODO_COLOR[turma.periodo] || PERIODO_COLOR.Noturno
              return (
                <div key={turma.id} className="db-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: pc.text, background: pc.bg, border: `1px solid ${pc.border}`, borderRadius: '6px', padding: '3px 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {turma.periodo || 'Periodo'}
                    </span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>{turma.ano || '-'}</span>
                  </div>

                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', marginBottom: '4px' }}>{turma.nome}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{turma.instrumento || 'Instrumento'} - {professorNome(turma.professor)}</div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>
                      <span>Vagas</span>
                      <span>{turma.vagas || 0}</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px' }}>
                      <div style={{ height: '4px', width: '100%', background: '#4CC9F0', borderRadius: '2px', transition: 'width 0.3s' }} />
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/turma/${turma.id}`)}
                    style={{ marginTop: 'auto', width: '100%', background: 'rgba(76,201,240,0.1)', border: '1px solid rgba(76,201,240,0.25)', borderRadius: '8px', padding: '10px', color: '#4CC9F0', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans,sans-serif', transition: 'all 0.2s' }}
                    onMouseOver={e => { e.currentTarget.style.background = '#4CC9F0'; e.currentTarget.style.color = '#000' }}
                    onMouseOut={e => { e.currentTarget.style.background = 'rgba(76,201,240,0.1)'; e.currentTarget.style.color = '#4CC9F0' }}
                  >
                    Ver Detalhes
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
