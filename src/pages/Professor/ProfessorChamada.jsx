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

function ProfessorChamada() {
  const navigate = useNavigate()
  const { turmaId } = useParams()
  const [turmas, setTurmas] = useState([])
  const [turma, setTurma] = useState(null)
  const [chamadas, setChamadas] = useState([])
  const [chamada, setChamada] = useState(null)
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
  }, [turmaId])

  const gerar = async () => {
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const response = await ProfessorService.criarChamada(turmaId)
      setChamada(response.data)
      setMessage('Chamada criada com sucesso.')
      const historico = await ProfessorService.listarChamadas(turmaId)
      setChamadas(historico.data || [])
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  const encerrar = async () => {
    if (!chamada?.id || !window.confirm('Encerrar esta chamada?')) return
    setSaving(true)
    setError('')
    try {
      const response = await ProfessorService.encerrarChamada(chamada.id)
      setChamada(response.data)
      setMessage('Chamada encerrada.')
      const historico = await ProfessorService.listarChamadas(turmaId)
      setChamadas(historico.data || [])
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
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button onClick={gerar} disabled={saving} style={buttonPrimary}>{saving ? 'Processando...' : 'Gerar chamada'}</button>
                  {chamada?.status === 'ATIVA' && <button onClick={encerrar} disabled={saving} style={buttonSuccess}>Encerrar</button>}
                  <button onClick={carregar} style={buttonSecondary}>Atualizar</button>
                </div>
              </div>
              {error && <div style={{ color: '#f25f5c', marginTop: 14, fontWeight: 800 }}>{error}</div>}
              {message && <div style={{ color: '#4ade80', marginTop: 14, fontWeight: 800 }}>{message}</div>}
            </div>

            {chamada && (
              <>
                <div className="db-card" style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 22, alignItems: 'center' }}>
                  <div style={{ background: '#fff', borderRadius: 8, padding: 14, width: 'fit-content' }}>
                    <img src={ChamadaService.gerarQrCodeUrl(chamada.qrCodePayload || chamada.token)} alt="QR Code da chamada" style={{ width: 180, height: 180, display: 'block' }} />
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.68)', fontSize: 13, display: 'grid', gap: 10 }}>
                    <div><strong style={{ color: '#fff' }}>Token:</strong> <span style={{ wordBreak: 'break-all' }}>{chamada.token}</span></div>
                    <div><strong style={{ color: '#fff' }}>Gerada em:</strong> {formatDateTime(chamada.dataGeracao)}</div>
                    <div><strong style={{ color: '#fff' }}>Expira em:</strong> {formatDateTime(chamada.dataExpiracao)}</div>
                    <div><strong style={{ color: '#fff' }}>Status:</strong> {chamada.status}</div>
                    <div><strong style={{ color: '#4ade80' }}>{chamada.totalPresentes || 0}</strong> presentes | <strong style={{ color: '#f25f5c' }}>{chamada.totalFaltas || 0}</strong> faltas</div>
                  </div>
                </div>
                <TabelaChamada alunos={chamada.alunos || []} />
              </>
            )}

            <div className="db-card" style={{ padding: 24 }}>
              <div className="db-card-section-title" style={{ marginBottom: 12 }}>Chamadas criadas</div>
              {chamadas.length > 0 ? chamadas.map(item => (
                <button key={item.id} onClick={() => setChamada(item)} style={listButton}>
                  <strong>{formatDateTime(item.dataGeracao)}</strong><span>{item.status} | {item.totalPresentes || 0} presentes | {item.totalFaltas || 0} faltas</span>
                </button>
              )) : <div className="db-updates-empty" style={{ padding: 28 }}>Nenhuma chamada criada.</div>}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function TabelaChamada({ alunos }) {
  return (
    <div className="db-card" style={{ overflow: 'auto' }}>
      <div className="db-card-section-title" style={{ padding: '20px 24px 0' }}>Presentes e ausentes</div>
      <table style={{ width: '100%', minWidth: 680, borderCollapse: 'collapse' }}>
        <thead><tr>{['RM', 'Nome', 'Email', 'Status', 'Confirmado em'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
        <tbody>{alunos.map(aluno => (
          <tr key={aluno.rm} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <td style={td}>{aluno.rm}</td>
            <td style={{ ...td, color: '#fff', fontWeight: 800 }}>{aluno.nome}</td>
            <td style={td}>{aluno.email || '-'}</td>
            <td style={{ ...td, color: aluno.statusPresenca === 'PRESENTE' ? '#4ade80' : '#f25f5c', fontWeight: 900 }}>{aluno.statusPresenca}</td>
            <td style={td}>{formatDateTime(aluno.dataConfirmacao)}</td>
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

export default ProfessorChamada
