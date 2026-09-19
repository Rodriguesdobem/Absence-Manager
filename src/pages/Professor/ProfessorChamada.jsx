import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SharedNav from '../../common/SharedNav'
import ProfessorService from '../../Services/ProfessorService'
import ChamadaService from '../../Services/ChamadaService'

function getErrorMessage(error) {
  return error?.response?.data?.message || error?.message || 'Erro ao carregar chamada.'
}

function formatDateTime(value) {
  return value ? new Date(value).toLocaleString('pt-BR') : '-'
}

// Mantém a chamada aberta sincronizada enquanto estiver ATIVA, refletindo
// confirmações feitas por outro dispositivo (ex.: aluno lendo o QR Code)
// sem exigir que o professor recarregue a página.
function useAtualizacaoAutomatica(chamada, setChamada) {
  useEffect(() => {
    if (!chamada?.id || chamada.status !== 'ATIVA') return undefined

    const intervalo = setInterval(async () => {
      try {
        const response = await ProfessorService.buscarChamada(chamada.id)
        setChamada(prev => (prev && prev.id === response.data.id ? response.data : prev))
      } catch (err) {
        // Falha pontual de rede não deve interromper o polling; a próxima tentativa segue.
      }
    }, 5000)

    return () => clearInterval(intervalo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chamada?.id, chamada?.status])
}

function ProfessorChamada() {
  const navigate = useNavigate()
  const { turmaId } = useParams()
  const [turmas, setTurmas] = useState([])
  const [turma, setTurma] = useState(null)
  const [chamadas, setChamadas] = useState([])
  const [chamada, setChamada] = useState(null)
  const [chamadaRecenteSelecionada, setChamadaRecenteSelecionada] = useState(null)
  const [aba, setAba] = useState('atual')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const carregar = async () => {
    setLoading(true)
    setError('')
    try {
      if (!turmaId) {
        const response = await ProfessorService.listarTurmas()
        setTurmas(response.data || [])
        return
      }
      const [turmaRes, chamadasRes] = await Promise.all([
        ProfessorService.buscarTurma(turmaId),
        ProfessorService.listarChamadas(turmaId),
      ])
      setTurma(turmaRes.data)
      setChamadas(chamadasRes.data || [])
      setChamada((chamadasRes.data || [])[0] || null)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turmaId])

  useAtualizacaoAutomatica(chamada, setChamada)
  useAtualizacaoAutomatica(chamadaRecenteSelecionada, setChamadaRecenteSelecionada)

  const atualizarHistorico = async () => {
    const historico = await ProfessorService.listarChamadas(turmaId)
    setChamadas(historico.data || [])
    return historico.data || []
  }

  const marcarPresenca = async (alunoRm, status) => {
    setError('')
    try {
      const response = await ProfessorService.atualizarPresenca(chamada.id, alunoRm, status)
      setChamada(response.data)
      await atualizarHistorico()
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  const marcarPresencaRecente = async (alunoRm, status) => {
    setError('')
    try {
      const response = await ProfessorService.atualizarPresenca(chamadaRecenteSelecionada.id, alunoRm, status)
      setChamadaRecenteSelecionada(response.data)
      await atualizarHistorico()
      // Mantém a chamada atual em dia caso seja a mesma que está sendo editada na aba de recentes.
      if (chamada?.id === response.data.id) {
        setChamada(response.data)
      }
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  const abrirChamadaRecente = (item) => {
    setChamadaRecenteSelecionada(item)
  }

  const gerar = async () => {
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const response = await ProfessorService.criarChamada(turmaId)
      setChamada(response.data)
      setMessage('Chamada criada com sucesso.')
      await atualizarHistorico()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  // Sincroniza os dois estados (chamada atual e chamada aberta na aba de
  // recentes) quando os dois apontam para a mesma chamada.
  const sincronizarChamada = (atualizada) => {
    if (chamada?.id === atualizada.id) setChamada(atualizada)
    if (chamadaRecenteSelecionada?.id === atualizada.id) setChamadaRecenteSelecionada(atualizada)
  }

  const encerrarChamadaAlvo = async (alvo) => {
    if (!alvo?.id || !window.confirm('Encerrar esta chamada?')) return
    setSaving(true)
    setError('')
    try {
      const response = await ProfessorService.encerrarChamada(alvo.id)
      sincronizarChamada(response.data)
      setMessage('Chamada encerrada.')
      await atualizarHistorico()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  const reabrirChamadaAlvo = async (alvo) => {
    if (!alvo?.id) return
    setSaving(true)
    setError('')
    try {
      const response = await ProfessorService.reabrirChamada(alvo.id)
      sincronizarChamada(response.data)
      setMessage('Chamada reaberta para correção manual.')
      await atualizarHistorico()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="db-root">
      <SharedNav activeItem="prof-chamada" />
      <main className="db-main">
        <div className="db-page-title">Chamada / <span style={{ color: '#4CC9F0' }}>QRCode</span></div>
        {loading ? (
          <div className="db-card" style={{ padding: 24 }}>Carregando...</div>
        ) : !turmaId ? (
          <div className="db-card" style={{ padding: 24, position: 'relative', zIndex: 1 }}>
            <div className="db-card-section-title" style={{ marginBottom: 14 }}>Escolha uma turma</div>
            {turmas.length > 0 ? turmas.map(item => (
              <button key={item.id} onClick={() => navigate(`/professor/turmas/${item.id}/chamada`)} style={listButton}>
                <strong>{item.nome}</strong><span>{item.instrumento || '-'} - {item.periodo || '-'}</span>
              </button>
            )) : <div className="db-updates-empty" style={{ padding: 28 }}>Nenhuma turma vinculada.</div>}
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 16, position: 'relative', zIndex: 1 }}>
            <div className="db-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <div>
                  <div className="db-card-section-title">{turma?.nome || 'Turma'}</div>
                  <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>{turma?.instrumento || '-'} - {turma?.periodo || '-'}</div>
                </div>
                <button onClick={carregar} style={buttonSecondary}>Atualizar</button>
              </div>
              {error && <div style={{ color: '#f25f5c', marginTop: 14, fontWeight: 800 }}>{error}</div>}
              {message && <div style={{ color: '#4ade80', marginTop: 14, fontWeight: 800 }}>{message}</div>}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setAba('atual')} style={aba === 'atual' ? abaAtivaStyle : abaInativaStyle}>
                Chamada Atual
              </button>
              <button onClick={() => setAba('recentes')} style={aba === 'recentes' ? abaAtivaStyle : abaInativaStyle}>
                Chamadas Recentes
              </button>
            </div>

            {aba === 'atual' && (
              <>
                <div className="db-card" style={{ padding: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div className="db-card-section-title" style={{ marginBottom: 0 }}>
                      {chamada ? `Chamada gerada em ${formatDateTime(chamada.dataGeracao)}` : 'Nenhuma chamada ativa'}
                    </div>
                    <button onClick={gerar} disabled={saving} style={buttonPrimary}>{saving ? 'Processando...' : 'Gerar chamada'}</button>
                  </div>
                </div>

                {chamada && (
                  <PainelChamada
                    chamada={chamada}
                    onMarcar={marcarPresenca}
                    onEncerrar={() => encerrarChamadaAlvo(chamada)}
                    onReabrir={() => reabrirChamadaAlvo(chamada)}
                    saving={saving}
                  />
                )}
              </>
            )}

            {aba === 'recentes' && (
              <>
                <div className="db-card" style={{ padding: 24 }}>
                  <div className="db-card-section-title" style={{ marginBottom: 12 }}>Chamadas recentes</div>
                  {chamadas.length > 0 ? chamadas.map(item => (
                    <button
                      key={item.id}
                      onClick={() => abrirChamadaRecente(item)}
                      style={{
                        ...listButton,
                        border: chamadaRecenteSelecionada?.id === item.id ? '1px solid #4CC9F0' : listButton.border,
                        background: chamadaRecenteSelecionada?.id === item.id ? 'rgba(76,201,240,0.1)' : listButton.background,
                      }}
                    >
                      <strong>{formatDateTime(item.dataGeracao)}</strong>
                      <span>{item.status} | {item.totalPresentes || 0} presentes | {item.totalFaltas || 0} faltas</span>
                    </button>
                  )) : <div className="db-updates-empty" style={{ padding: 28 }}>Nenhuma chamada criada.</div>}
                </div>

                {chamadaRecenteSelecionada && (
                  <PainelChamada
                    chamada={chamadaRecenteSelecionada}
                    onMarcar={marcarPresencaRecente}
                    onEncerrar={() => encerrarChamadaAlvo(chamadaRecenteSelecionada)}
                    onReabrir={() => reabrirChamadaAlvo(chamadaRecenteSelecionada)}
                    saving={saving}
                  />
                )}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

function PainelChamada({ chamada, onMarcar, onEncerrar, onReabrir, saving }) {
  const podeEditar = chamada.status === 'ATIVA' || chamada.status === 'REABERTA'
  const mostrarQrCode = chamada.status === 'ATIVA'

  return (
    <>
      <div className="db-card" style={{ padding: 24, display: 'grid', gridTemplateColumns: mostrarQrCode ? 'repeat(auto-fit,minmax(220px,1fr))' : '1fr', gap: 22, alignItems: 'center' }}>
        {mostrarQrCode && (
          <div style={{ background: '#fff', borderRadius: 8, padding: 14, width: 'fit-content' }}>
            <img src={ChamadaService.gerarQrCodeUrl(chamada.qrCodePayload || chamada.token)} alt="QR Code da chamada" style={{ width: 180, height: 180, display: 'block' }} />
          </div>
        )}
        <div style={{ color: 'rgba(255,255,255,0.68)', fontSize: 13, display: 'grid', gap: 10 }}>
          {mostrarQrCode && (
            <div><strong style={{ color: '#fff' }}>Token:</strong> <span style={{ wordBreak: 'break-all' }}>{chamada.token}</span></div>
          )}
          <div><strong style={{ color: '#fff' }}>Gerada em:</strong> {formatDateTime(chamada.dataGeracao)}</div>
          <div><strong style={{ color: '#fff' }}>Expira em:</strong> {formatDateTime(chamada.dataExpiracao)}</div>
          <div><strong style={{ color: '#fff' }}>Status:</strong> {chamada.status}</div>
          <div><strong style={{ color: '#4ade80' }}>{chamada.totalPresentes || 0}</strong> presentes | <strong style={{ color: '#f25f5c' }}>{chamada.totalFaltas || 0}</strong> faltas</div>
          {chamada.status === 'ENCERRADA' && (
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Chamada encerrada: reabra para corrigir os registros dos alunos.</div>
          )}
          {chamada.status === 'REABERTA' && (
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Chamada reaberta apenas para correção manual — não aceita mais confirmação por QR Code.</div>
          )}

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
            {(chamada.status === 'ATIVA' || chamada.status === 'REABERTA') && (
              <button onClick={onEncerrar} disabled={saving} style={buttonSuccess}>Encerrar</button>
            )}
            {chamada.status === 'ENCERRADA' && (
              <button onClick={onReabrir} disabled={saving} style={buttonPrimary}>Reabrir para corrigir</button>
            )}
          </div>
        </div>
      </div>
      <TabelaChamada
        alunos={chamada.alunos || []}
        podeEditar={podeEditar}
        onMarcar={onMarcar}
      />
    </>
  )
}

function TabelaChamada({ alunos, podeEditar, onMarcar }) {
  return (
    <div className="db-card" style={{ overflow: 'auto' }}>
      <div className="db-card-section-title" style={{ padding: '20px 24px 0' }}>Presentes e ausentes</div>
      <table style={{ width: '100%', minWidth: 760, borderCollapse: 'collapse' }}>
        <thead><tr>{['RM', 'Nome', 'Email', 'Status', 'Confirmado em', 'Chamada manual'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
        <tbody>{alunos.map(aluno => (
          <tr key={aluno.rm} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <td style={td}>{aluno.rm}</td>
            <td style={{ ...td, color: '#fff', fontWeight: 800 }}>{aluno.nome}</td>
            <td style={td}>{aluno.email || '-'}</td>
            <td style={{ ...td, color: aluno.statusPresenca === 'PRESENTE' ? '#4ade80' : '#f25f5c', fontWeight: 900 }}>{aluno.statusPresenca}</td>
            <td style={td}>{formatDateTime(aluno.dataConfirmacao)}</td>
            <td style={td}>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  disabled={!podeEditar || aluno.statusPresenca === 'PRESENTE'}
                  onClick={() => onMarcar(aluno.rm, 'PRESENTE')}
                  style={{ ...botaoManual, opacity: !podeEditar || aluno.statusPresenca === 'PRESENTE' ? 0.4 : 1, borderColor: 'rgba(74,222,128,0.35)', color: '#4ade80' }}
                >
                  Presente
                </button>
                <button
                  disabled={!podeEditar || aluno.statusPresenca === 'FALTA'}
                  onClick={() => onMarcar(aluno.rm, 'FALTA')}
                  style={{ ...botaoManual, opacity: !podeEditar || aluno.statusPresenca === 'FALTA' ? 0.4 : 1, borderColor: 'rgba(242,95,92,0.35)', color: '#f25f5c' }}
                >
                  Falta
                </button>
              </div>
            </td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  )
}

const buttonPrimary = { borderRadius: 8, border: '1px solid #4CC9F0', background: '#4CC9F0', color: '#050509', padding: '10px 14px', fontWeight: 800, cursor: 'pointer' }
const buttonSecondary = { borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.78)', padding: '10px 14px', fontWeight: 800, cursor: 'pointer' }
const buttonSuccess = { borderRadius: 8, border: '1px solid rgba(74,222,128,0.35)', background: 'rgba(74,222,128,0.12)', color: '#4ade80', padding: '10px 14px', fontWeight: 800, cursor: 'pointer' }
const listButton = { width: '100%', textAlign: 'left', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#fff', padding: 14, marginBottom: 10, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontFamily: 'Plus Jakarta Sans,sans-serif' }
const th = { padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 800, color: '#4CC9F0', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.07)' }
const td = { padding: '12px 16px', fontSize: 13, color: 'rgba(255,255,255,0.62)' }
const botaoManual = { borderRadius: 6, border: '1px solid', background: 'transparent', padding: '6px 10px', fontWeight: 800, fontSize: 12, cursor: 'pointer' }
const abaAtivaStyle = { borderRadius: 8, border: '1px solid #4CC9F0', background: 'rgba(76,201,240,0.12)', color: '#4CC9F0', padding: '10px 16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans,sans-serif' }
const abaInativaStyle = { borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.6)', padding: '10px 16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans,sans-serif' }

export default ProfessorChamada
