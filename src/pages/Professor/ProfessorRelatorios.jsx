import React, { useEffect, useState } from 'react'
import SharedNav from '../../common/SharedNav'
import ProfessorService from '../../Services/ProfessorService'

function getErrorMessage(error) {
  return error?.response?.data?.message || error?.message || 'Erro ao carregar relatorios.'
}

function ProfessorRelatorios() {
  const [dados, setDados] = useState(null)
  const [turmaSelecionada, setTurmaSelecionada] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const carregar = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await ProfessorService.relatorios()
        setDados(response.data)
        setTurmaSelecionada((response.data?.turmas || [])[0] || null)
      } catch (err) {
        setError(getErrorMessage(err))
        setDados(null)
      } finally {
        setLoading(false)
      }
    }
    carregar()
  }, [])

  return (
    <div className="db-root">
      <SharedNav activeItem="prof-relatorios" />
      <main className="db-main">
        <div className="db-page-title">Relatorios do <span style={{ color: '#4CC9F0' }}>Professor</span></div>
        {loading ? (
          <div className="db-card" style={{ padding: 24 }}>Carregando relatorios...</div>
        ) : error ? (
          <div className="db-card" style={{ padding: 24, color: '#f25f5c' }}>{error}</div>
        ) : (
          <div style={{ display: 'grid', gap: 16, position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 14 }}>
              {[
                ['Turmas', dados?.totalTurmas ?? 0],
                ['Alunos', dados?.totalAlunos ?? 0],
                ['Chamadas', dados?.chamadasFeitas ?? 0],
                ['Presenca geral', `${dados?.percentualPresenca ?? 0}%`],
                ['Faltas gerais', `${dados?.percentualFaltas ?? 0}%`],
              ].map(([label, value]) => (
                <div key={label} className="db-card" style={{ padding: '18px 20px' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#4CC9F0', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: '#fff' }}>{value}</div>
                </div>
              ))}
            </div>

            <div className="db-card" style={{ padding: 24 }}>
              <div className="db-card-section-title" style={{ marginBottom: 12 }}>Relatorio por turma</div>
              {(dados?.turmas || []).length > 0 ? (
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {dados.turmas.map(item => (
                    <button
                      key={item.turma.id}
                      onClick={() => setTurmaSelecionada(item)}
                      style={{
                        borderRadius: 8,
                        border: turmaSelecionada?.turma?.id === item.turma.id ? '1px solid #4CC9F0' : '1px solid rgba(255,255,255,0.08)',
                        background: turmaSelecionada?.turma?.id === item.turma.id ? 'rgba(76,201,240,0.12)' : 'rgba(255,255,255,0.04)',
                        color: turmaSelecionada?.turma?.id === item.turma.id ? '#4CC9F0' : 'rgba(255,255,255,0.78)',
                        padding: '10px 14px',
                        cursor: 'pointer',
                        fontWeight: 800,
                      }}
                    >
                      {item.turma.nome}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="db-updates-empty" style={{ padding: 28 }}>Nenhum relatorio disponivel.</div>
              )}
            </div>

            {turmaSelecionada && (
              <div className="db-card" style={{ overflow: 'auto' }}>
                <div style={{ padding: '20px 24px 0' }}>
                  <div className="db-card-section-title" style={{ marginBottom: 8 }}>{turmaSelecionada.turma.nome}</div>
                  <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: 13, marginBottom: 16 }}>
                    {turmaSelecionada.totalChamadas || 0} chamadas | {turmaSelecionada.percentualPresenca || 0}% presenca | {turmaSelecionada.percentualFaltas || 0}% faltas
                  </div>
                </div>
                <table style={{ width: '100%', minWidth: 680, borderCollapse: 'collapse' }}>
                  <thead><tr>{['RM', 'Aluno', 'Email', 'Presencas', 'Faltas', '% Presenca'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
                  <tbody>{(turmaSelecionada.alunos || []).map(aluno => (
                    <tr key={aluno.rm} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={td}>{aluno.rm}</td>
                      <td style={{ ...td, color: '#fff', fontWeight: 800 }}>{aluno.nome}</td>
                      <td style={td}>{aluno.email || '-'}</td>
                      <td style={{ ...td, color: '#4ade80', fontWeight: 900 }}>{aluno.presentes}</td>
                      <td style={{ ...td, color: '#f25f5c', fontWeight: 900 }}>{aluno.faltas}</td>
                      <td style={td}>{aluno.percentualPresenca}%</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

const th = { padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 800, color: '#4CC9F0', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.07)' }
const td = { padding: '12px 16px', fontSize: 13, color: 'rgba(255,255,255,0.62)' }

export default ProfessorRelatorios
