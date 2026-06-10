import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UsuarioService from '../Services/UsuarioService'
import TurmaServices from '../Services/TurmaServices'
import AlunoServices from '../Services/AlunoServices'
import TurmaAlunoServices from '../Services/TurmaAlunoServices'
import SharedNav from '../common/SharedNav'

function getCadastroErrorMessage(error) {
  const message = error.response?.data?.message || error.response?.data || error.message || 'Erro desconhecido'

  if (String(message).toLowerCase().includes('duplicate key')) {
    return 'Este e-mail ja esta cadastrado.'
  }

  return message
}

function CadastrarUsuario() {

  const navigate = useNavigate()
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [senha, setSenha] = useState('')
  const [confirmaSenha, setConfirmaSenha] = useState('')
  const [senhaMatch, setSenhaMatch] = useState(true)
  const [turmas, setTurmas] = useState([])
  const [turmaId, setTurmaId] = useState('')
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '', nivelAcesso: '' })
  const [loadingTurmas, setLoadingTurmas] = useState(false)

  // Turmas disponíveis (mock do frontend). Se quiser ligar no backend, depois carregamos via API.
  useEffect(() => {
    const carregarTurmas = async () => {
      setLoadingTurmas(true)
      try {
        const response = await TurmaServices.listarTurmas()
        setTurmas(response.data || [])
      } catch (error) {
        setMessage({ type: 'error', text: `Erro ao carregar turmas: ${getCadastroErrorMessage(error)}` })
        setShowMessage(true)
      } finally {
        setLoadingTurmas(false)
      }
    }

    carregarTurmas()
  }, [])



  const inputStyle = { width: '100%', background: '#111118', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '11px 14px', fontSize: '14px', color: '#fff', fontFamily: 'Plus Jakarta Sans,sans-serif', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }
  const labelStyle = { fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }
  
  const [fotoFile, setFotoFile] = useState(null)
  const [fotoPreviewUrl, setFotoPreviewUrl] = useState('')

  useEffect(() => {
    if (!fotoFile) {
      setFotoPreviewUrl('')
      return
    }

    const url = URL.createObjectURL(fotoFile)
    setFotoPreviewUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [fotoFile])


  const sectionStyle = { fontSize: '10px', fontWeight: 800, color: '#4CC9F0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }

  const handleConfirmChange = (e) => {
    setConfirmaSenha(e.target.value)
    setSenhaMatch(e.target.value === senha || e.target.value === '')
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (e.target.name === 'nivelAcesso') {
      setTurmaId('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (senha !== confirmaSenha) {
      setMessage({ type: 'error', text: 'As senhas não coincidem.' })
      setShowMessage(true)
      return
    }
    const formData = new FormData(e.target)
    try {
      const nivelAcesso = formData.get('nivelAcesso')
      const turmaSelecionadaId = formData.get('turmaId')
      const turmaSelecionada = turmas.find(t => String(t.id) === String(turmaSelecionadaId))

      if (nivelAcesso === 'PROFESSOR' && turmaSelecionada?.professor?.id) {
        setMessage({ type: 'error', text: 'Esta turma ja possui um professor designado.' })
        setShowMessage(true)
        return
      }

      if (nivelAcesso === 'ALUNO' && turmaSelecionada && Number(turmaSelecionada.vagas || 0) <= 0) {
        setMessage({ type: 'error', text: 'Esta turma nao possui vagas disponiveis.' })
        setShowMessage(true)
        return
      }

      // Cria usuário (JSON). A foto será enviada via endpoint de editar (multipart) após receber o id.
      const response = await UsuarioService.cadastrar({
        nome: `${formData.get('firstname')} ${formData.get('lastname')}`,
        email: formData.get('email'),
        nivelAcesso,
        senha: formData.get('senha'),
        dataNascimento: formData.get('dataNascimento'),
        turmaId: turmaSelecionadaId,
      })

      // Envia foto opcional para o backend (PUT /usuarios/{id} com multipart)
      // Se falhar, NÃO devemos deixar o processo seguir.
      if (fotoFile) {
        const form = new FormData();
        form.append('file', fotoFile);

        form.append(
          'usuario',
          new Blob(
            [JSON.stringify({
              nome: `${formData.get('firstname')} ${formData.get('lastname')}`,
              username: formData.get('email'),
              nivelAcesso,
            })],
            { type: 'application/json' }
          )
        );

        await UsuarioService.update(response.data.id, form);
      }

      if (nivelAcesso === 'PROFESSOR' && turmaSelecionadaId) {
        await TurmaServices.designarProfessor(turmaSelecionadaId, response.data.id)
      }

      if (nivelAcesso === 'ALUNO' && turmaSelecionadaId) {
        const alunoResponse = await AlunoServices.cadastrarAluno({
          nome: `${formData.get('firstname')} ${formData.get('lastname')}`,
          dataNascimento: formData.get('dataNascimento'),
          sexo: formData.get('sexo'),
          cpf: formData.get('cpf'),
          telefone: formData.get('telefone'),
          usuario: { id: response.data.id },
          statusAluno: 'ATIVO',
        })

        await TurmaAlunoServices.vincularAluno(turmaSelecionadaId, alunoResponse.data.rm)
      }

      setMessage({ type: 'success', text: 'Usuário cadastrado com sucesso!' })
      setShowMessage(true)
      setTimeout(() => navigate('/ver-turmas'), 2000)

    } catch (error) {
      const errorMessage = getCadastroErrorMessage(error)
      setMessage({ type: 'error', text: `Erro ao cadastrar usuário: ${errorMessage}` })
      setShowMessage(true)
    }
  }

  const fieldGroup = (name, lbl, type, ph, extraProps = {}) => (
    <div key={name}>
      <label style={labelStyle}>{lbl}</label>
      <input
        type={type}
        name={name}
        placeholder={ph}
        style={inputStyle}
        required
        onFocus={e => e.target.style.borderColor = '#4CC9F0'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
        onChange={handleChange}
        {...extraProps}
      />
    </div>
  )

  const previewNome = [form.firstname, form.lastname].filter(Boolean).join(' ') || 'Nome do Usuário'
  const previewIniciais = previewNome.charAt(0).toUpperCase()

  return (
    <div className="db-root">
      <SharedNav activeItem="cadastrar" />

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
        <div className="db-page-title">Cadastrar <span style={{ color: '#4CC9F0' }}>Usuário</span></div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px', position: 'relative', zIndex: 1, alignItems: 'start' }}>

          {/* Formulário */}
          <div className="db-card" style={{ padding: '32px' }}>
            <div className="db-card-section-title" style={{ marginBottom: '24px' }}>

              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 14, height: 14 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
              Novo Usuário
            </div>
            <form onSubmit={handleSubmit}>

            {/* Dados Pessoais */}
            <div style={{ display: 'none' }}>
              <input
                id="foto-input-cadastrar"
                type="file"
                accept="image/*"
                style={inputStyle}
                onChange={(e) => setFotoFile(e.target.files?.[0] ?? null)}
              />
            </div>


            <div style={sectionStyle}>
              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 12, height: 12 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Dados Pessoais
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              {fieldGroup('firstname', 'Primeiro Nome', 'text', 'Digite o primeiro nome')}
              {fieldGroup('lastname', 'Sobrenome', 'text', 'Digite o sobrenome')}
              {fieldGroup('dataNascimento', 'Data de Nascimento', 'date', '')}
            </div>

            {/* Contato */}
            <div style={sectionStyle}>
              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 12, height: 12 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Contato
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '20px' }}>
              {fieldGroup('email', 'E-mail', 'email', 'Digite o e-mail')}
            </div>

            {form.nivelAcesso === 'ALUNO' && (
              <>
                <div style={sectionStyle}>
                  <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 12, height: 12 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Dados do Aluno
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  {fieldGroup('cpf', 'CPF', 'text', 'Digite o CPF')}
                  {fieldGroup('telefone', 'Telefone', 'text', 'Digite o telefone')}
                  <div>
                    <label style={labelStyle}>Sexo</label>
                    <select
                      name="sexo"
                      style={inputStyle}
                      required
                      onFocus={e => e.target.style.borderColor = '#4CC9F0'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                      onChange={handleChange}
                    >
                      <option value="">Selecione</option>
                      <option value="F">F</option>
                      <option value="M">M</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Segurança */}
            <div style={sectionStyle}>
              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 12, height: 12 }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Segurança
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Senha</label>
                <input
                  type="password"
                  name="senha"
                  placeholder="Digite a senha"
                  style={inputStyle}
                  required
                  onFocus={e => e.target.style.borderColor = '#4CC9F0'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  onChange={e => setSenha(e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Confirmar Senha</label>
                <input
                  type="password"
                  name="confirmaSenha"
                  placeholder="Repita a senha"
                  style={{ ...inputStyle, borderColor: !senhaMatch ? '#f25f5c' : 'rgba(255,255,255,0.08)' }}
                  required
                  onFocus={e => e.target.style.borderColor = '#4CC9F0'}
                  onBlur={e => e.target.style.borderColor = !senhaMatch ? '#f25f5c' : 'rgba(255,255,255,0.08)'}
                  onChange={handleConfirmChange}
                />
              </div>
            </div>
            {!senhaMatch && (
              <div style={{ fontSize: '12px', color: '#f25f5c', marginBottom: '16px', marginTop: '-12px' }}>
                As senhas não coincidem.
              </div>
            )}

            {/* Acesso */}
            <div style={sectionStyle}>
              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 12, height: 12 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Acesso
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '28px' }}>
              <div>
                <label style={labelStyle}>Nível de Acesso</label>
                <select
                  name="nivelAcesso"
                  style={inputStyle}
                  required
                  onFocus={e => e.target.style.borderColor = '#4CC9F0'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  onChange={handleChange}
                >
                  <option value="">Selecione o nível</option>
                  <option value="PROFESSOR">Professor</option>
                  <option value="ALUNO">Aluno</option>
                </select>
              </div>

              <div style={{ display: ['ALUNO', 'PROFESSOR'].includes(form.nivelAcesso) ? 'block' : 'none' }}>
                <label style={labelStyle}>Designar Turma</label>
                <select
                  name="turmaId"
                  value={turmaId}
                  style={inputStyle}
                  required={['ALUNO', 'PROFESSOR'].includes(form.nivelAcesso)}
                  onFocus={e => e.target.style.borderColor = '#4CC9F0'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  onChange={(e) => setTurmaId(e.target.value)}
                >
                  <option value="">{loadingTurmas ? 'Carregando turmas...' : 'Selecione a turma'}</option>
                  {turmas.map(t => (
                    <option
                      key={t.id}
                      value={t.id}
                      disabled={
                        (form.nivelAcesso === 'PROFESSOR' && Boolean(t.professor?.id)) ||
                        (form.nivelAcesso === 'ALUNO' && Number(t.vagas || 0) <= 0)
                      }
                    >
                      {t.nome}
                      {form.nivelAcesso === 'ALUNO' ? ` - ${Number(t.vagas || 0) <= 0 ? 'Lotada' : `${t.vagas} vaga(s)`}` : ''}
                      {t.professor?.id ? ` - Prof. ${t.professor.nome}` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                type="submit"
                style={{
                  flex: '0 0 auto',
                  minWidth: '200px',
                  background: '#4CC9F0',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#000',
                  fontSize: '13px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  fontFamily: 'Plus Jakarta Sans,sans-serif',
                  transition: 'all 0.2s',
                  boxShadow: '0 10px 30px rgba(76,201,240,0.15)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#fff'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,255,255,0.15)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#4CC9F0'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(76,201,240,0.15)'
                }}
              >
                Cadastrar Usuário
              </button>

              <button
                type="button"
                style={{
                  flex: '0 0 auto',
                  minWidth: '180px',
                  background: 'rgba(76,201,240,0.1)',
                  border: '1px solid rgba(76,201,240,0.35)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#4CC9F0',
                  fontSize: '13px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  fontFamily: 'Plus Jakarta Sans,sans-serif',
                  transition: 'all 0.2s',
                }}

                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#4CC9F0'
                  e.currentTarget.style.color = '#000'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(76,201,240,0.1)'
                  e.currentTarget.style.color = '#4CC9F0'
                }}
                onClick={() => {
                  const el = document.getElementById('foto-input-cadastrar')
                  if (el) el.click()
                }}
              >
                {fotoFile ? 'Foto selecionada ✓' : 'Selecionar foto'}
              </button>


            </div>


          </form>
          </div>

          {/* Prévia do Perfil */}
          <div className="db-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px', alignSelf: 'flex-start' }}>Prévia do Perfil</div>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(76,201,240,0.12)', border: '2px solid rgba(76,201,240,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', fontWeight: 800, color: '#4CC9F0', overflow: 'hidden' }}>
              {fotoPreviewUrl ? (
                <img
                  src={fotoPreviewUrl}
                  alt="Prévia da foto"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                previewIniciais
              )}
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '-0.4px', marginBottom: '4px' }}>{previewNome}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{form.nivelAcesso || 'Nível de Acesso'}</div>
            </div>


            <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 14px', borderRadius: '999px', background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80' }}>
              Ativo
            </span>
            <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>E-mail</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{form.email || 'Não informado'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>Acesso</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{form.nivelAcesso || '—'}</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default CadastrarUsuario