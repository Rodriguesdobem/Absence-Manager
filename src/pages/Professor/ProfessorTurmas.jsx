import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SharedNav from '../../common/SharedNav'
import ProfessorService from '../../Services/ProfessorService'

function getErrorMessage(error) {
  return error?.response?.data?.message || error?.message || 'Erro ao carregar turmas.'
}

function ProfessorTurmas() {
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
        const response = await ProfessorService.listarTurmas()
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
    return turmas.filter(turma =>
      String(turma.nome || '').toLowerCase().includes(termo) ||
      String(turma.instrumento || '').toLowerCase().includes(termo)
    )
  }, [filtro, turmas])

  return (
    <div className="db-root">
      <SharedNav activeItem="prof-turmas" />
      <main className="db-main">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 24, position: 'relative', zIndex: 1 }}>
          <div className="db-page-title" style={{ marginBottom: 0 }}>Minhas <span style={{ color: '#4CC9F0' }}>Turmas</span></div>
          <input value={filtro} onChange={e => setFiltro(e.target.value)} placeholder="Buscar turma ou instrumento..." style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '10px 16px', color: '#fff', width: 280 }} />
        </div>

        {loading ? (
          <div className="db-card" style={{ padding: 24 }}>Carregando turmas...</div>
        ) : error ? (
          <div className="db-card" style={{ padding: 24, color: '#f25f5c' }}>{error}</div>
        ) : filtradas.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14, position: 'relative', zIndex: 1 }}>
            {filtradas.map(turma => (
              <div key={turma.id} className="db-card" style={{ padding: 24, display: 'grid', gap: 14 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>{turma.nome}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{turma.instrumento || '-'} - {turma.periodo || '-'}</div>
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Ano: {turma.ano || '-'} | Status: {turma.statusTurma || '-'}</div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button onClick={() => navigate(`/professor/turmas/${turma.id}`)} style={buttonPrimary}>Ver detalhes</button>
                  <button onClick={() => navigate(`/professor/turmas/${turma.id}/chamada`)} style={buttonSecondary}>Chamada</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="db-card db-updates-empty" style={{ padding: 48 }}>Nenhuma turma encontrada.</div>
        )}
      </main>
    </div>
  )
}

const buttonPrimary = { borderRadius: 8, border: '1px solid #4CC9F0', background: '#4CC9F0', color: '#050509', padding: '10px 14px', fontWeight: 800, cursor: 'pointer' }
const buttonSecondary = { borderRadius: 8, border: '1px solid rgba(76,201,240,0.25)', background: 'rgba(76,201,240,0.1)', color: '#4CC9F0', padding: '10px 14px', fontWeight: 800, cursor: 'pointer' }

export default ProfessorTurmas
