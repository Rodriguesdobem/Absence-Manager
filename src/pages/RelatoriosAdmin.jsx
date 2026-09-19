import React, { useEffect, useState } from 'react'
import SharedNav from '../common/SharedNav'
import RelatorioService from '../Services/RelatorioService'

function getErrorMessage(error) {
  return error?.response?.data?.message || error?.message || 'Erro ao carregar relatorios.'
}

function exportarCsv(nomeArquivo, colunas, linhas) {
  const cabecalho = colunas.map(c => c.label).join(';')
  const corpo = linhas.map(linha => colunas.map(c => linha[c.key] ?? '').join(';')).join('\n')
  const conteudo = `${cabecalho}\n${corpo}`
  const blob = new Blob([conteudo], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = nomeArquivo
  link.click()
  URL.revokeObjectURL(url)
}

function RelatoriosAdmin() {
  const [geral, setGeral] = useState(null)
  const [turmas, setTurmas] = useState([])
  const [turmaSelecionada, setTurmaSelecionada] = useState(null)
  const [professores, setProfessores] = useState([])
  const [alunosCriticos, setAlunosCriticos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const carregar = async () => {
    setLoading(true)
    setError('')
    try {
      const [geralRes, turmasRes, professoresRes, criticosRes] = await Promise.all([
        RelatorioService.geral(),
        RelatorioService.listarTurmas(),
        RelatorioService.listarProfessores(),
        RelatorioService.alunosCriticos(),
      ])
      setGeral(geralRes.data)
      setTurmas(turmasRes.data || [])
      setTurmaSelecionada((turmasRes.data || [])[0] || null)
      setProfessores(professoresRes.data || [])
      setAlunosCriticos(criticosRes.data || [])
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  const exportarTurmaSelecionada = () => {
    if (!turmaSelecionada) return
    exportarCsv(
      `relatorio-${turmaSelecionada.turma.nome}.csv`,
      [
        { key: 'rm', label: 'RM' },
        { key: 'nome', label: 'Nome' },
        { key: 'email', label: 'Email' },
        { key: 'presentes', label: 'Presencas' },
        { key: 'faltas', label: 'Faltas' },
        { key: 'percentualPresenca', label: '% Presenca' },
      ],
      turmaSelecionada.alunos || []
    )
  }

  return (
    <div className="db-root">
      <SharedNav activeItem="relatorios" />
      <main className="db-main">
        <div className="db-page-title">Relatórios <span style={{ color: '#4CC9F0' }}>Administrativos</span></div>

        {loading ? (
          <div className="db-card" style={{ padding: 24 }}>Carregando relatórios...</div>
        ) : error ? (
          <div className="db-card" style={{ padding: 24, color: '#f25f5c' }}>{error}</div>
        ) : (
          <div style={{ display: 'grid', gap: 16, position: 'relative', zIndex: 1 }}>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 14 }}>
              {[
                ['Turmas', geral?.totalTurmas ?? 0],
                ['Alunos ativos', geral?.totalAlunos ?? 0],
                ['Professores', geral?.totalProfessores ?? 0],
                ['Chamadas realizadas', geral?.totalChamadas ?? 0],
                ['Presença geral', `${geral?.percentualPresenca ?? 0}%`],
                ['Faltas gerais', `${geral?.percentualFaltas ?? 0}%`],
              ].map(([label, value]) => (
                <div key={label} className="db-card" style={{ padding: '18px 20px' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#4CC9F0', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#fff' }}>{value}</div>
                </div>
              ))}
            </div>

            <div className="db-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                <div className="db-card-section-title" style={{ marginBottom: 0 }}>Relatório por turma</div>
                <button onClick={exportarTurmaSelecionada} disabled={!turmaSelecionada} style={buttonSecondary}>Exportar CSV</button>
              </div>
              {turmas.length > 0 ? (
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {turmas.map(item => (
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
                <div className="db-updates-empty" style={{ padding: 28 }}>Nenhuma turma cadastrada.</div>
              )}
            </div>

            {turmaSelecionada && (
              <div className="db-card" style={{ overflow: 'auto' }}>
                <div style={{ padding: '20px 24px 0' }}>
                  <div className="db-card-section-title" style={{ marginBottom: 8 }}>{turmaSelecionada.turma.nome}</div>
                  <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: 13, marginBottom: 16 }}>
                    {turmaSelecionada.totalChamadas || 0} chamadas | {turmaSelecionada.percentualPresenca || 0}% presença | {turmaSelecionada.percentualFaltas || 0}% faltas
                  </div>
                </div>
                <table style={{ width: '100%', minWidth: 680, borderCollapse: 'collapse' }}>
                  <thead><tr>{['RM', 'Aluno', 'Email', 'Presenças', 'Faltas', '% Presença'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
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

            <div className="db-card" style={{ overflow: 'auto' }}>
              <div className="db-card-section-title" style={{ padding: '20px 24px 0', marginBottom: 12 }}>Relatório por professor</div>
              {professores.length > 0 ? (
                <table style={{ width: '100%', minWidth: 680, borderCollapse: 'collapse' }}>
                  <thead><tr>{['Professor', 'Usuário', 'Turmas', 'Presenças', 'Faltas', '% Presença'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
                  <tbody>{professores.map(prof => (
                    <tr key={prof.professorId} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ ...td, color: '#fff', fontWeight: 800 }}>{prof.nome}</td>
                      <td style={td}>{prof.username}</td>
                      <td style={td}>{prof.totalTurmas}</td>
                      <td style={{ ...td, color: '#4ade80', fontWeight: 900 }}>{prof.presentes}</td>
                      <td style={{ ...td, color: '#f25f5c', fontWeight: 900 }}>{prof.faltas}</td>
                      <td style={td}>{prof.percentualPresenca}%</td>
                    </tr>
                  ))}</tbody>
                </table>
              ) : (
                <div className="db-updates-empty" style={{ padding: 28 }}>Nenhum professor cadastrado.</div>
              )}
            </div>

            <div className="db-card" style={{ overflow: 'auto' }}>
              <div className="db-card-section-title" style={{ padding: '20px 24px 0', marginBottom: 12 }}>Alunos críticos (abaixo de 75% de presença)</div>
              {alunosCriticos.length > 0 ? (
                <table style={{ width: '100%', minWidth: 680, borderCollapse: 'collapse' }}>
                  <thead><tr>{['RM', 'Aluno', 'Email', 'Presenças', 'Faltas', '% Presença'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
                  <tbody>{alunosCriticos.map(aluno => (
                    <tr key={aluno.rm} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={td}>{aluno.rm}</td>
                      <td style={{ ...td, color: '#fff', fontWeight: 800 }}>{aluno.nome}</td>
                      <td style={td}>{aluno.email || '-'}</td>
                      <td style={{ ...td, color: '#4ade80', fontWeight: 900 }}>{aluno.presentes}</td>
                      <td style={{ ...td, color: '#f25f5c', fontWeight: 900 }}>{aluno.faltas}</td>
                      <td style={{ ...td, color: '#f25f5c', fontWeight: 900 }}>{aluno.percentualPresenca}%</td>
                    </tr>
                  ))}</tbody>
                </table>
              ) : (
                <div className="db-updates-empty" style={{ padding: 28 }}>Nenhum aluno abaixo do limite de frequência.</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

const buttonSecondary = { borderRadius: 8, border: '1px solid rgba(76,201,240,0.25)', background: 'rgba(76,201,240,0.1)', color: '#4CC9F0', padding: '8px 14px', fontWeight: 800, cursor: 'pointer', fontSize: 13 }
const th = { padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 800, color: '#4CC9F0', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.07)' }
const td = { padding: '12px 16px', fontSize: 13, color: 'rgba(255,255,255,0.62)' }

export default RelatoriosAdmin
