import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SharedNav from '../common/SharedNav'
import TurmaServices from '../Services/TurmaServices'
import TurmaAlunoServices from '../Services/TurmaAlunoServices'
import ChamadaServices from '../Services/ChamadaServices'

function getErrorMessage(error) {
  const data = error?.response?.data
  if (typeof data === 'string') return data
  if (data?.message) return data.message
  if (data?.error && data?.status) return `${data.error} (${data.status})`
  return error?.message || 'Erro ao carregar turma.'
}

function professorNome(professor) {
  return professor?.nome || 'Sem professor definido'
}

function fotoSrc(foto) {
  if (!foto) return ''
  if (typeof foto === 'string') return `data:image/jpeg;base64,${foto}`
  if (Array.isArray(foto)) {
    const bytes = new Uint8Array(foto)
    let binary = ''
    bytes.forEach(byte => { binary += String.fromCharCode(byte) })
    return `data:image/jpeg;base64,${btoa(binary)}`
  }
  return ''
}

function formatDateTime(value) {
  if (!value) return '-'
  return new Date(value).toLocaleString('pt-BR')
}

const buttonBase = {
  borderRadius: '8px',
  padding: '9px 14px',
  fontSize: '13px',
  fontWeight: 800,
  cursor: 'pointer',
  fontFamily: 'Plus Jakarta Sans,sans-serif',
  transition: 'all 0.2s',
}

function DetalhesTurma() {
  const navigate = useNavigate()
  const { turmaId } = useParams()
  const [turma, setTurma] = useState(null)
  const [alunosTurma, setAlunosTurma] = useState([])
  const [chamada, setChamada] = useState(null)
  const [visualizandoHistorico, setVisualizandoHistorico] = useState(false)
  const [historicoChamadas, setHistoricoChamadas] = useState([])
  const [activeTab, setActiveTab] = useState('alunos')
  const [loading, setLoading] = useState(true)
  const [loadingChamada, setLoadingChamada] = useState(false)
  const [loadingHistorico, setLoadingHistorico] = useState(false)
  const [error, setError] = useState('')
  const [chamadaError, setChamadaError] = useState('')
  const [chamadaMessage, setChamadaMessage] = useState('')

  const carregarBase = useCallback(async () => {
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
  }, [turmaId])

  const atualizarChamada = useCallback(async () => {
    if (!chamada?.id) return
    try {
      const response = await ChamadaServices.buscarChamada(turmaId, chamada.id)
      setChamada(response.data)
      setVisualizandoHistorico(false)
      setChamadaError('')
    } catch (err) {
      setChamadaError(getErrorMessage(err))
    }
  }, [chamada?.id, turmaId])

  const carregarHistorico = useCallback(async () => {
    setLoadingHistorico(true)
    try {
      const response = await ChamadaServices.listarRecentes(turmaId)
      setHistoricoChamadas(response.data || [])
      setChamadaError('')
    } catch (err) {
      setHistoricoChamadas([])
      setChamadaError(`Historico indisponivel: ${getErrorMessage(err)}`)
    } finally {
      setLoadingHistorico(false)
    }
  }, [turmaId])

  useEffect(() => {
    carregarBase()
  }, [carregarBase])

  useEffect(() => {
    if (!chamada?.id || chamada.status !== 'ATIVA') return undefined
    const expirada = chamada.dataExpiracao && new Date(chamada.dataExpiracao).getTime() <= Date.now()
    if (expirada) return undefined
    const timer = setInterval(atualizarChamada, 5000)
    return () => clearInterval(timer)
  }, [atualizarChamada, chamada?.dataExpiracao, chamada?.id, chamada?.status])

  const stats = useMemo(() => {
    const totalAlunos = alunosTurma.length
    const presentes = chamada?.totalPresentes ?? 0
    const faltas = chamada?.totalFaltas ?? (chamada ? 0 : totalAlunos)
    return { totalAlunos, presentes, faltas }
  }, [alunosTurma.length, chamada])

  const gerarChamada = async () => {
    setLoadingChamada(true)
    setChamadaError('')
    setChamadaMessage('')
    try {
      const response = await ChamadaServices.criarChamada(turmaId)
      setChamada(response.data)
      setVisualizandoHistorico(false)
      setChamadaMessage('Chamada criada. Todos os alunos foram marcados como FALTA.')
      carregarHistorico()
    } catch (err) {
      setChamadaError(getErrorMessage(err))
    } finally {
      setLoadingChamada(false)
    }
  }

  const confirmarChamada = async () => {
    if (!chamada?.id) return
    const deveConfirmar = window.confirm('Confirmar e encerrar esta chamada? Alunos sem confirmacao continuarao como FALTA.')
    if (!deveConfirmar) return

    setLoadingChamada(true)
    setChamadaError('')
    setChamadaMessage('')
    try {
      const response = await ChamadaServices.confirmarChamada(turmaId, chamada.id)
      setChamada(response.data)
      setVisualizandoHistorico(false)
      setChamadaMessage('Chamada confirmada e encerrada.')
      carregarHistorico()
    } catch (err) {
      setChamadaError(getErrorMessage(err))
    } finally {
      setLoadingChamada(false)
    }
  }

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
              style={{ ...buttonBase, marginTop: 16, background: 'rgba(76,201,240,0.1)', border: '1px solid rgba(76,201,240,0.25)', color: '#4CC9F0' }}
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
          onClick={() => navigate('/ver-turmas')}
          style={{ ...buttonBase, display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(76,201,240,0.1)', border: '1px solid rgba(76,201,240,0.25)', color: '#4CC9F0', marginBottom: '24px', position: 'relative', zIndex: 1 }}
        >
          Voltar
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '14px', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
          {[
            { label: 'Instrumento', value: turma.instrumento || '-' },
            { label: 'Periodo', value: turma.periodo || '-' },
            { label: 'Ano Letivo', value: turma.ano || '-' },
            { label: 'Alunos', value: stats.totalAlunos },
            { label: 'Professor', value: professorNome(turma.professor) },
            { label: 'Status', value: turma.statusTurma || '-' },
          ].map(item => (
            <div key={item.label} className="db-card" style={{ padding: '18px 20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#4CC9F0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>{item.label}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '14px', position: 'relative', zIndex: 1 }}>
          {[
            { key: 'alunos', label: 'Alunos cadastrados' },
            { key: 'chamada', label: 'Chamada' },
          ].map(tab => {
            const selected = activeTab === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                aria-pressed={selected}
                style={{
                  ...buttonBase,
                  minHeight: 44,
                  background: selected ? '#4CC9F0' : 'rgba(255,255,255,0.04)',
                  border: selected ? '1px solid #4CC9F0' : '1px solid rgba(255,255,255,0.08)',
                  color: selected ? '#050509' : 'rgba(255,255,255,0.75)',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {activeTab === 'alunos' ? (
          <AlunosTab alunosTurma={alunosTurma} navigate={navigate} />
        ) : (
          <ChamadaTab
            chamada={chamada}
            chamadaError={chamadaError}
            chamadaMessage={chamadaMessage}
            gerarChamada={gerarChamada}
            atualizarChamada={atualizarChamada}
            confirmarChamada={confirmarChamada}
            loadingChamada={loadingChamada}
            visualizandoHistorico={visualizandoHistorico}
            historicoChamadas={historicoChamadas}
            loadingHistorico={loadingHistorico}
            selecionarChamada={(item) => {
              setChamada(item)
              setVisualizandoHistorico(true)
            }}
            carregarHistorico={carregarHistorico}
            stats={stats}
          />
        )}
      </main>
    </div>
  )
}

function AlunosTab({ alunosTurma, navigate }) {
  return (
    <div className="db-card" style={{ position: 'relative', zIndex: 1, overflow: 'auto' }}>
      <div className="db-card-section-title" style={{ padding: '20px 24px 0' }}>
        <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 14, height: 14 }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
        Alunos cadastrados
      </div>

      {alunosTurma.length > 0 ? (
        <table style={{ width: '100%', minWidth: 760, borderCollapse: 'collapse', fontFamily: 'Plus Jakarta Sans,sans-serif' }}>
          <thead>
            <tr>
              {['Foto', 'RM', 'Nome', 'Email', 'Telefone', 'Status', 'Acoes'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#4CC9F0', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alunosTurma.map(vinculo => {
              const aluno = vinculo.aluno || {}
              const foto = fotoSrc(aluno.usuario?.foto)
              const statusAluno = aluno.statusAluno || (vinculo.status ? 'ATIVO' : 'INATIVO')
              return (
                <tr key={vinculo.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(76,201,240,0.12)', border: '1px solid rgba(76,201,240,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', color: '#4CC9F0', fontWeight: 900 }}>
                      {foto ? <img src={foto} alt={`Foto de ${aluno.nome || 'aluno'}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : String(aluno.nome || 'A').charAt(0).toUpperCase()}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>{aluno.rm}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.88)', fontWeight: 700 }}>{aluno.nome}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.58)' }}>{aluno.email || '-'}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.58)' }}>{aluno.telefone || '-'}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: statusAluno === 'ATIVO' ? '#4ade80' : '#f25f5c', fontWeight: 800 }}>{statusAluno}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <button
                      onClick={() => navigate(`/aluno/${aluno.rm}`)}
                      style={{ ...buttonBase, background: 'rgba(76,201,240,0.1)', border: '1px solid rgba(76,201,240,0.25)', color: '#4CC9F0', padding: '7px 13px' }}
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
          <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" style={{ width: 40, height: 40, stroke: 'rgba(255,255,255,0.12)' }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          <span>Nenhum aluno matriculado nesta turma.</span>
        </div>
      )}
    </div>
  )
}

function ChamadaTab({
  chamada,
  chamadaError,
  chamadaMessage,
  gerarChamada,
  atualizarChamada,
  confirmarChamada,
  loadingChamada,
  visualizandoHistorico,
  historicoChamadas,
  loadingHistorico,
  selecionarChamada,
  carregarHistorico,
  stats,
}) {
  const chamadaAtiva = chamada?.id && chamada.status === 'ATIVA' && !visualizandoHistorico

  return (
    <div style={{ display: 'grid', gap: 16, position: 'relative', zIndex: 1 }}>
      <div className="db-card" style={{ padding: '22px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <div className="db-card-section-title" style={{ marginBottom: 8 }}>Chamada da turma</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
              Presentes: <strong style={{ color: '#4ade80' }}>{stats.presentes}</strong> &nbsp; Faltas: <strong style={{ color: '#f25f5c' }}>{stats.faltas}</strong>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={gerarChamada}
              disabled={loadingChamada}
              style={{ ...buttonBase, minHeight: 44, background: '#4CC9F0', border: '1px solid #4CC9F0', color: '#050509', opacity: loadingChamada ? 0.65 : 1 }}
            >
              {loadingChamada ? 'Gerando...' : 'Gerar chamada'}
            </button>
            {chamada?.id && !visualizandoHistorico && (
              <button
                type="button"
                onClick={atualizarChamada}
                style={{ ...buttonBase, minHeight: 44, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.78)' }}
              >
                Atualizar lista
              </button>
            )}
            {chamadaAtiva && (
              <button
                type="button"
                onClick={confirmarChamada}
                disabled={loadingChamada}
                style={{ ...buttonBase, minHeight: 44, background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.35)', color: '#4ade80', opacity: loadingChamada ? 0.65 : 1 }}
              >
                Confirmar chamada
              </button>
            )}
            <button
              type="button"
              onClick={carregarHistorico}
              disabled={loadingHistorico}
              style={{ ...buttonBase, minHeight: 44, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.78)', opacity: loadingHistorico ? 0.65 : 1 }}
            >
              {loadingHistorico ? 'Carregando...' : 'Ver recentes'}
            </button>
          </div>
        </div>
        {chamadaError && <div style={{ marginTop: 14, color: '#f25f5c', fontSize: 13, fontWeight: 700 }}>{chamadaError}</div>}
        {chamadaMessage && <div style={{ marginTop: 14, color: '#4ade80', fontSize: 13, fontWeight: 700 }}>{chamadaMessage}</div>}
      </div>

      {chamada && !visualizandoHistorico && (
        <>
          <div className="db-card" style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 22, alignItems: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 8, padding: 14, width: 'fit-content' }}>
              <img
                src={ChamadaServices.gerarQrCodeUrl(chamada.qrCodePayload || chamada.token)}
                alt="QR Code da chamada"
                style={{ width: 180, height: 180, display: 'block' }}
              />
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="db-card-section-title" style={{ marginBottom: 12 }}>QR Code</div>
              <div style={{ display: 'grid', gap: 10, color: 'rgba(255,255,255,0.68)', fontSize: 13 }}>
                <div><strong style={{ color: '#fff' }}>Token:</strong> <span style={{ wordBreak: 'break-all' }}>{chamada.token}</span></div>
                <div><strong style={{ color: '#fff' }}>Expira em:</strong> {formatDateTime(chamada.dataExpiracao)}</div>
                <div><strong style={{ color: '#fff' }}>Status:</strong> <span style={{ color: chamada.status === 'ATIVA' ? '#4ade80' : 'rgba(255,255,255,0.68)', fontWeight: 800 }}>{chamada.status}</span></div>
              </div>
            </div>
          </div>
        </>
      )}

      {chamada && (
        <>
          <div className="db-card" style={{ overflow: 'auto' }}>
            <div className="db-card-section-title" style={{ padding: '20px 24px 0' }}>Status da chamada</div>
            <table style={{ width: '100%', minWidth: 680, borderCollapse: 'collapse', fontFamily: 'Plus Jakarta Sans,sans-serif' }}>
              <thead>
                <tr>
                  {['RM', 'Nome', 'Email', 'Status', 'Confirmado em'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#4CC9F0', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(chamada.alunos || []).map(aluno => (
                  <tr key={aluno.rm} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{aluno.rm}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'rgba(255,255,255,0.88)', fontWeight: 700 }}>{aluno.nome}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'rgba(255,255,255,0.58)' }}>{aluno.email || '-'}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: aluno.statusPresenca === 'PRESENTE' ? '#4ade80' : '#f25f5c', fontWeight: 900 }}>{aluno.statusPresenca}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'rgba(255,255,255,0.58)' }}>{formatDateTime(aluno.dataConfirmacao)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="db-card" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
          <div>
            <div className="db-card-section-title" style={{ marginBottom: 6 }}>Chamadas recentes</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>Ultimas chamadas geradas para esta turma.</div>
          </div>
        </div>

        {loadingHistorico ? (
          <div style={{ color: 'rgba(255,255,255,0.62)', fontSize: 13, padding: '10px 0' }}>Carregando historico...</div>
        ) : historicoChamadas.length > 0 ? (
          <div style={{ display: 'grid', gap: 10 }}>
            {historicoChamadas.map(item => {
              const selecionada = chamada?.id === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selecionarChamada(item)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    borderRadius: 8,
                    border: selecionada ? '1px solid rgba(76,201,240,0.45)' : '1px solid rgba(255,255,255,0.08)',
                    background: selecionada ? 'rgba(76,201,240,0.09)' : 'rgba(255,255,255,0.03)',
                    padding: '14px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: 12,
                    alignItems: 'center',
                    fontFamily: 'Plus Jakarta Sans,sans-serif',
                  }}
                >
                  <span style={{ color: '#fff', fontSize: 13, fontWeight: 800 }}>
                    {formatDateTime(item.dataGeracao)}
                  </span>
                  <span style={{ color: item.status === 'ATIVA' ? '#4ade80' : 'rgba(255,255,255,0.68)', fontSize: 12, fontWeight: 900 }}>
                    {item.status}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.64)', fontSize: 12 }}>
                    {item.totalPresentes || 0} presentes
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.64)', fontSize: 12 }}>
                    {item.totalFaltas || 0} faltas
                  </span>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="db-updates-empty" style={{ padding: '28px 12px' }}>
            <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" style={{ width: 36, height: 36, stroke: 'rgba(255,255,255,0.12)' }}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
            <span>Nenhuma chamada recente para esta turma.</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetalhesTurma
