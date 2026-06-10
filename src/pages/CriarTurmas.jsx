import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SharedNav from '../common/SharedNav'
import TurmaServices from '../Services/TurmaServices'

const FORM_INICIAL = {
  nome: '',
  instrumento: '',
  periodo: '',
  ano: '',
  vagas: '',
  professorId: '',
  obs: '',
}

function getErrorMessage(error) {
  return error?.response?.data?.message || error?.response?.data || error?.message || 'Erro ao processar requisicao.'
}

function professorNome(professor) {
  return professor?.nome || 'Sem professor definido'
}

function CriarTurmas() {
  const navigate = useNavigate()
  const [turmas, setTurmas] = useState([])
  const [form, setForm] = useState(FORM_INICIAL)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const carregarTurmas = async () => {
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

  useEffect(() => {
    carregarTurmas()
  }, [])

  const totalVagas = useMemo(
    () => turmas.reduce((total, turma) => total + Number(turma.vagas || 0), 0),
    [turmas]
  )

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      nome: form.nome.trim(),
      instrumento: form.instrumento.trim(),
      periodo: form.periodo,
      ano: String(form.ano),
      vagas: Number(form.vagas),
      obs: form.obs.trim() || null,
      professor: form.professorId ? { id: Number(form.professorId) } : null,
    }

    try {
      const response = await TurmaServices.criarTurma(payload)
      setTurmas(prev => [...prev, response.data])
      setForm(FORM_INICIAL)
      setShowForm(false)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  const inputStyle = { width: '100%', background: '#111118', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '11px 14px', fontSize: '14px', color: '#fff', fontFamily: 'Plus Jakarta Sans,sans-serif', outline: 'none', boxSizing: 'border-box' }
  const labelStyle = { fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }
  const messageStyle = { background: 'rgba(242,95,92,0.08)', border: '1px solid rgba(242,95,92,0.25)', borderRadius: '10px', padding: '12px 14px', color: '#f25f5c', fontSize: '13px', marginBottom: '16px', position: 'relative', zIndex: 1 }

  return (
    <div className="db-root">
      <SharedNav activeItem="turmas" />

      <main className="db-main">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', position: 'relative', zIndex: 1, gap: '12px', flexWrap: 'wrap' }}>
          <div>
            <div className="db-page-title" style={{ marginBottom: 0 }}>Turmas</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '6px' }}>
              {turmas.length} turma(s) cadastrada(s) - {totalVagas} vaga(s)
            </div>
          </div>
          <button
            onClick={() => {
              setShowForm(o => !o)
              setError('')
            }}
            style={{ background: '#4CC9F0', border: 'none', borderRadius: '8px', padding: '10px 20px', color: '#000', fontSize: '13px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans,sans-serif', transition: 'all 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = '#fff'}
            onMouseOut={e => e.currentTarget.style.background = '#4CC9F0'}
          >
            {showForm ? 'Cancelar' : '+ Nova Turma'}
          </button>
        </div>

        {error && <div style={messageStyle}>{String(error)}</div>}

        {showForm && (
          <div className="db-card" style={{ padding: '28px', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
            <div className="db-card-section-title" style={{ marginBottom: '20px' }}>
              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 14, height: 14 }}><path d="M12 5v14M5 12h14"/></svg>
              Nova Turma
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '14px', marginBottom: '20px' }}>
                {[
                  ['nome', 'Nome da Turma', 'text', 'Ex: Turma Violao'],
                  ['instrumento', 'Instrumento', 'text', 'Ex: Violao'],
                  ['ano', 'Ano Letivo', 'number', '2026'],
                  ['vagas', 'Vagas', 'number', '20'],
                  ['professorId', 'ID do Professor', 'number', 'Opcional'],
                ].map(([key, lbl, type, ph]) => (
                  <div key={key}>
                    <label style={labelStyle}>{lbl}</label>
                    <input
                      type={type}
                      placeholder={ph}
                      value={form[key]}
                      onChange={e => handleChange(key, e.target.value)}
                      style={inputStyle}
                      required={key !== 'professorId'}
                      min={type === 'number' && key !== 'ano' ? '1' : undefined}
                    />
                  </div>
                ))}
                <div>
                  <label style={labelStyle}>Periodo</label>
                  <select value={form.periodo} onChange={e => handleChange('periodo', e.target.value)} style={inputStyle} required>
                    <option value="">Selecione</option>
                    <option value="Matutino">Matutino</option>
                    <option value="Vespertino">Vespertino</option>
                    <option value="Noturno">Noturno</option>
                  </select>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Observacao</label>
                  <input
                    type="text"
                    placeholder="Opcional"
                    value={form.obs}
                    onChange={e => handleChange('obs', e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={saving}
                style={{ background: '#4CC9F0', border: 'none', borderRadius: '8px', padding: '12px 28px', color: '#000', fontSize: '14px', fontWeight: 800, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Plus Jakarta Sans,sans-serif', transition: 'all 0.2s', opacity: saving ? 0.75 : 1 }}
                onMouseOver={e => { if (!saving) e.currentTarget.style.background = '#fff' }}
                onMouseOut={e => { if (!saving) e.currentTarget.style.background = '#4CC9F0' }}
              >
                {saving ? 'Criando...' : 'Criar Turma'}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="db-card" style={{ padding: '24px 28px', position: 'relative', zIndex: 1 }}>
            <div className="db-card-section-title" style={{ marginBottom: 0 }}>Carregando turmas...</div>
          </div>
        ) : turmas.length === 0 ? (
          <div className="db-card db-updates-empty" style={{ padding: '48px', position: 'relative', zIndex: 1 }}>
            <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" style={{ width: 40, height: 40, stroke: 'rgba(255,255,255,0.12)' }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>Nenhuma turma cadastrada.</span>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '14px', position: 'relative', zIndex: 1 }}>
            {turmas.map(turma => (
              <div key={turma.id} className="db-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#4CC9F0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{turma.periodo || 'Periodo'}</span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>{turma.ano || '-'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>{turma.nome}</div>

                  {/* Botão inativar/ativar turma */}
                  <button
                    onClick={async () => {
                      try {
                        await TurmaServices.atualizarTurma(turma.id, { ...turma, statusTurma: turma.statusTurma === 'INATIVA' ? 'ATIVA' : 'INATIVA' })
                        setTurmas(prev => prev.map(t => (t.id === turma.id ? { ...t, statusTurma: t.statusTurma === 'INATIVA' ? 'ATIVA' : 'INATIVA' } : t)))
                      } catch (e) {
                        // silêncio: evita travar UI
                      }
                    }}
                    style={{
                      background: turma.statusTurma === 'INATIVA' ? 'rgba(74,222,128,0.12)' : 'rgba(242,95,92,0.12)',
                      border: `1px solid ${turma.statusTurma === 'INATIVA' ? 'rgba(74,222,128,0.35)' : 'rgba(242,95,92,0.35)'}`,
                      color: turma.statusTurma === 'INATIVA' ? '#4ade80' : '#f25f5c',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      fontFamily: 'Plus Jakarta Sans,sans-serif',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {turma.statusTurma === 'INATIVA' ? 'Ativar Turma' : 'Inativar Turma'}
                  </button>
                </div>

                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{turma.instrumento || 'Instrumento'} - {professorNome(turma.professor)}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>{turma.vagas || 0} vaga(s)</span>
                  <button
                    onClick={() => navigate(`/turma/${turma.id}`)}
                    style={{ background: 'rgba(76,201,240,0.1)', border: '1px solid rgba(76,201,240,0.25)', borderRadius: '6px', padding: '6px 14px', color: '#4CC9F0', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans,sans-serif', transition: 'all 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(76,201,240,0.2)'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(76,201,240,0.1)'}
                  >
                    Ver Turma
                  </button>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: turma.statusTurma === 'INATIVA' ? '#f25f5c' : '#4ade80', marginTop: '2px' }}>
                  {turma.statusTurma === 'INATIVA' ? 'INATIVA' : 'ATIVA'}
                </div>
                <div style={{ height: '2px', background: 'linear-gradient(90deg,#3B429F,#4CC9F0)', borderRadius: '2px', marginTop: '4px', opacity: 0.6 }} />

              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default CriarTurmas
