import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SharedNav from '../common/SharedNav'

const TURMAS_INICIAIS = [
  { id: 1, nome: 'Turma Violão', curso: 'Violão', periodo: 'Matutino', ano: 2025, capacidade: 20, professor: 'Prof. Carlos' },
  { id: 2, nome: 'Turma Piano', curso: 'Piano', periodo: 'Vespertino', ano: 2025, capacidade: 15, professor: 'Prof. Ana' },
  { id: 3, nome: 'Turma Bateria', curso: 'Bateria', periodo: 'Noturno', ano: 2025, capacidade: 10, professor: 'Prof. João' },
  { id: 4, nome: 'Turma Canto', curso: 'Canto', periodo: 'Matutino', ano: 2025, capacidade: 12, professor: 'Prof. Maria' },
]

function CriarTurmas() {
  const navigate = useNavigate()
  const [turmas, setTurmas] = useState(TURMAS_INICIAIS)
  const [form, setForm] = useState({ nome: '', curso: '', periodo: '', ano: '', capacidade: '', professor: '' })
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const nova = { ...form, id: Date.now(), ano: Number(form.ano), capacidade: Number(form.capacidade) }
    setTurmas(t => [...t, nova])
    setForm({ nome: '', curso: '', periodo: '', ano: '', capacidade: '', professor: '' })
    setShowForm(false)
  }

  const inputStyle = { width: '100%', background: '#111118', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '11px 14px', fontSize: '14px', color: '#fff', fontFamily: 'Plus Jakarta Sans,sans-serif', outline: 'none' }
  const labelStyle = { fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }

  return (
    <div className="db-root">
      <SharedNav activeItem="turmas" />

      <main className="db-main">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
          <div className="db-page-title" style={{ marginBottom: 0 }}>Turmas</div>
          <button
            onClick={() => setShowForm(o => !o)}
            style={{ background: '#4CC9F0', border: 'none', borderRadius: '8px', padding: '10px 20px', color: '#000', fontSize: '13px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans,sans-serif', transition: 'all 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = '#fff'}
            onMouseOut={e => e.currentTarget.style.background = '#4CC9F0'}
          >
            {showForm ? 'Cancelar' : '+ Nova Turma'}
          </button>
        </div>

        {/* Formulário */}
        {showForm && (
          <div className="db-card" style={{ padding: '28px', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
            <div className="db-card-section-title" style={{ marginBottom: '20px' }}>
              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 14, height: 14 }}><path d="M12 5v14M5 12h14"/></svg>
              Nova Turma
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                {[['nome','Nome da Turma','text','Ex: Turma Violão'],['curso','Curso','text','Ex: Violão'],['ano','Ano Letivo','number','2025'],['capacidade','Capacidade','number','20'],['professor','Professor Responsável','text','Nome do professor']].map(([key, lbl, type, ph]) => (
                  <div key={key}>
                    <label style={labelStyle}>{lbl}</label>
                    <input type={type} placeholder={ph} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={inputStyle} required />
                  </div>
                ))}
                <div>
                  <label style={labelStyle}>Período</label>
                  <select value={form.periodo} onChange={e => setForm(f => ({ ...f, periodo: e.target.value }))} style={inputStyle} required>
                    <option value="">Selecione</option>
                    <option value="Matutino">Matutino</option>
                    <option value="Vespertino">Vespertino</option>
                    <option value="Noturno">Noturno</option>
                  </select>
                </div>
              </div>
              <button type="submit" style={{ background: '#4CC9F0', border: 'none', borderRadius: '8px', padding: '12px 28px', color: '#000', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans,sans-serif', transition: 'all 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = '#fff'}
                onMouseOut={e => e.currentTarget.style.background = '#4CC9F0'}
              >Criar Turma</button>
            </form>
          </div>
        )}

        {/* Lista de turmas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '14px', position: 'relative', zIndex: 1 }}>
          {turmas.map(turma => (
            <div key={turma.id} className="db-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#4CC9F0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{turma.periodo}</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>{turma.ano}</span>
              </div>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>{turma.nome}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{turma.professor}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Cap. {turma.capacidade} alunos</span>
                <button
                  onClick={() => navigate(`/turma/${turma.id}`)}
                  style={{ background: 'rgba(76,201,240,0.1)', border: '1px solid rgba(76,201,240,0.25)', borderRadius: '6px', padding: '6px 14px', color: '#4CC9F0', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans,sans-serif', transition: 'all 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(76,201,240,0.2)'}
                  onMouseOut={e => e.currentTarget.style.background = 'rgba(76,201,240,0.1)'}
                >
                  Ver Turma
                </button>
              </div>
              <div style={{ height: '2px', background: 'linear-gradient(90deg,#3B429F,#4CC9F0)', borderRadius: '2px', marginTop: '4px', opacity: 0.6 }} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default CriarTurmas
