import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UsuarioService from '../Services/UsuarioService'
import SharedNav from '../common/SharedNav'
import { TURMAS_DATA } from '../common/turmasData'

const getAllAlunos = () => {
  const alunos = []
  Object.values(TURMAS_DATA).forEach(turma => {
    turma.alunos.forEach(aluno => {
      alunos.push({ ...aluno, turma: turma.nome, ativo: true })
    })
  })
  return alunos
}

const TURMAS_OPTIONS = Object.values(TURMAS_DATA).map(t => ({ value: t.nome, label: t.nome }))

function EditarAluno() {
  const navigate = useNavigate()
  const { ra } = useParams()
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const ALUNOS = getAllAlunos()
  const aluno = ALUNOS.find(a => a.ra === parseInt(ra))

  const [form, setForm] = useState(aluno ? {
    nome: aluno.nome || '',
    email: aluno.email || '',
    telefone: aluno.telefone || '',
    turma: aluno.turma || ''
  } : { nome: '', email: '', telefone: '', turma: '' })

  if (!aluno) {
    return (
      <div className="db-root">
        <SharedNav />
        <main className="db-main"><p style={{ color: '#fff' }}>Aluno não encontrado.</p></main>
      </div>
    )
  }

  const inputStyle = { width: '100%', background: '#111118', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '11px 14px', fontSize: '14px', color: '#fff', fontFamily: 'Plus Jakarta Sans,sans-serif', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }
  const labelStyle = { fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }
  const sectionStyle = { fontSize: '10px', fontWeight: 800, color: '#4CC9F0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await UsuarioService.update(aluno.ra, form)
      setMessage({ type: 'success', text: 'Aluno atualizado com sucesso!' })
      setShowMessage(true)
      setTimeout(() => navigate(-1), 2000)
    } catch (error) {
      setMessage({ type: 'error', text: `Erro ao atualizar aluno: ${error.message}` })
      setShowMessage(true)
    }
  }

  const previewIniciais = (form.nome || 'Aluno').charAt(0).toUpperCase()

  return (
    <div className="db-root">
      <SharedNav activeItem="ver-turmas" />

      {showMessage && (
        <div className="db-modal-overlay">
          <div className="db-modal">
            <h3 style={{ color: message.type === 'success' ? '#4ade80' : '#f25f5c' }}>{message.text}</h3>
            <div className="db-modal-buttons" style={{ marginTop: '16px' }}>
              <button className="db-cancel-btn" onClick={() => setShowMessage(false)}>OK</button>
            </div>
          </div>
        </div>
      )}

      <main className="db-main">
        <div className="db-page-title">Editar <span style={{ color: '#4CC9F0' }}>Aluno</span></div>

        <button
          onClick={() => navigate(-1)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(76,201,240,0.1)', border: '1px solid rgba(76,201,240,0.25)', borderRadius: '8px', padding: '8px 16px', color: '#4CC9F0', fontSize: '13px', fontWeight: 700, cursor: 'pointer', marginBottom: '24px', fontFamily: 'Plus Jakarta Sans,sans-serif', transition: 'all 0.2s', position: 'relative', zIndex: 1 }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(76,201,240,0.2)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(76,201,240,0.1)'}
        >← Voltar</button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px', position: 'relative', zIndex: 1, alignItems: 'start' }}>

          {/* Formulário */}
          <div className="db-card" style={{ padding: '32px' }}>
            <div className="db-card-section-title" style={{ marginBottom: '24px' }}>
              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 14, height: 14 }}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Editar dados de {aluno.nome}
            </div>
            <form onSubmit={handleSubmit}>

              {/* Dados Pessoais */}
              <div style={sectionStyle}>
                <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 12, height: 12 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Dados Pessoais
              </div>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Nome Completo</label>
                  <input type="text" name="nome" value={form.nome} style={inputStyle} required
                    onFocus={e => e.target.style.borderColor = '#4CC9F0'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                    onChange={handleChange} />
                </div>
              </div>

              {/* Contato */}
              <div style={sectionStyle}>
                <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 12, height: 12 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Contato
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={labelStyle}>E-mail</label>
                  <input type="email" name="email" value={form.email} style={inputStyle} required
                    onFocus={e => e.target.style.borderColor = '#4CC9F0'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                    onChange={handleChange} />
                </div>
                <div>
                  <label style={labelStyle}>Telefone</label>
                  <input type="tel" name="telefone" value={form.telefone} style={inputStyle} required
                    onFocus={e => e.target.style.borderColor = '#4CC9F0'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                    onChange={handleChange} />
                </div>
              </div>

              {/* Turma */}
              <div style={sectionStyle}>
                <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 12, height: 12 }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Turma
              </div>
              <div style={{ marginBottom: '28px' }}>
                <label style={labelStyle}>Turma</label>
                <select name="turma" value={form.turma} style={inputStyle} required
                  onFocus={e => e.target.style.borderColor = '#4CC9F0'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  onChange={handleChange}>
                  {TURMAS_OPTIONS.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <button type="submit"
                style={{ background: '#4CC9F0', border: 'none', borderRadius: '8px', padding: '12px 28px', color: '#000', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans,sans-serif', transition: 'all 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = '#fff'}
                onMouseOut={e => e.currentTarget.style.background = '#4CC9F0'}
              >Salvar Alterações</button>
            </form>
          </div>

          {/* Prévia do Perfil */}
          <div className="db-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px', alignSelf: 'flex-start' }}>Prévia do Perfil</div>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(76,201,240,0.12)', border: '2px solid rgba(76,201,240,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', fontWeight: 800, color: '#4CC9F0' }}>
              {previewIniciais}
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '-0.4px', marginBottom: '4px' }}>{form.nome || 'Nome do Aluno'}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{form.turma || 'Turma'}</div>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 14px', borderRadius: '999px', background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80' }}>
              Ativo
            </span>
            <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>R.A.</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{aluno.ra}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>E-mail</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{form.email || 'Não informado'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>Telefone</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{form.telefone || 'Não informado'}</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default EditarAluno