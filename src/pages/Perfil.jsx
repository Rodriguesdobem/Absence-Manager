import React, { useEffect, useMemo, useState } from 'react'
import SharedNav from '../common/SharedNav'
import AlunoServices from '../Services/AlunoServices'
import TurmaServices from '../Services/TurmaServices'
import UsuarioService from '../Services/UsuarioService'
import ProfessorService from '../Services/ProfessorService'

const THEMES = [
  { key: 'dark', label: 'Escuro' },
  { key: 'light', label: 'Claro' },
  { key: 'green', label: 'Verde' },
]

function Perfil() {
  const currentUser = UsuarioService.getCurrentUser()
  const isProfessor = currentUser?.nivelAcesso === 'PROFESSOR'
  const [theme, setTheme] = useState(() => localStorage.getItem('admin-theme') || 'dark')
  const [userInfo, setUserInfo] = useState(currentUser)
  const [stats, setStats] = useState({
    totalAlunos: 0,
    totalTurmas: 0,
    totalUsuarios: 0,
    chamadasFeitas: 0,
    loading: true,
    error: null,
  })
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [photoUrl, setPhotoUrl] = useState(() => localStorage.getItem('user-photo-url') || null)
  const [fotoFile, setFotoFile] = useState(null)
  const [fotoPreviewUrl, setFotoPreviewUrl] = useState(() => {
    const saved = localStorage.getItem('user-photo-url')
    return saved || ''
  })
  const fileInputRef = React.useRef(null)

  useEffect(() => {
    if (!fotoFile) {
      return
    }

    const url = URL.createObjectURL(fotoFile)
    setFotoPreviewUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [fotoFile])

  useEffect(() => {
    const savedPhoto = localStorage.getItem('user-photo-url')
    if (savedPhoto) {
      setFotoPreviewUrl(savedPhoto)
    }
  }, [])

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true, error: null }))

        const meRes = await UsuarioService.me().catch(e => {
          console.error('Erro ao buscar usuario atual:', e.message)
          return { data: currentUser }
        })
        setUserInfo(meRes.data || currentUser)

        if (isProfessor) {
          const dashboardRes = await ProfessorService.dashboard().catch(e => {
            console.error('Erro ao buscar dados do professor:', e.message)
            return { data: {} }
          })

          setStats({
            totalAlunos: dashboardRes.data?.totalAlunos || 0,
            totalTurmas: dashboardRes.data?.totalTurmas || 0,
            totalUsuarios: 0,
            chamadasFeitas: dashboardRes.data?.chamadasFeitas || 0,
            loading: false,
            error: null,
          })
          return
        }

        const [alunosRes, turmasRes, usuariosRes] = await Promise.all([
          AlunoServices.listarAlunos().catch(e => {
            console.error('Erro ao buscar alunos:', e.message)
            return { data: [] }
          }),
          TurmaServices.listarTurmas().catch(e => {
            console.error('Erro ao buscar turmas:', e.message)
            return { data: [] }
          }),
          UsuarioService.findAll().catch(e => {
            console.error('Erro ao buscar usuarios:', e.message)
            return { data: [] }
          }),
        ])

        setStats({
          totalAlunos: alunosRes.data?.length || 0,
          totalTurmas: turmasRes.data?.length || 0,
          totalUsuarios: usuariosRes.data?.length || 0,
          chamadasFeitas: 0,
          loading: false,
          error: null,
        })
      } catch (err) {
        console.error('Erro ao carregar estatisticas:', err.message)
        setStats(prev => ({
          ...prev,
          loading: false,
          error: `Erro: ${err.message || 'Falha ao conectar com o servidor'}`,
        }))
      }
    }

    carregarDados()
  }, [currentUser?.id, isProfessor])

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Arquivo muito grande. Máximo 5MB')
      return
    }

    setUploadingPhoto(true)
    setFotoFile(file)
    
    try {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result
        if (typeof dataUrl === 'string' && dataUrl.startsWith('data:image/')) {
          localStorage.setItem('user-photo-url', dataUrl)
          setPhotoUrl(dataUrl)
          alert('Foto de perfil atualizada com sucesso!')
        }
      }
      reader.readAsDataURL(file)
    } catch (err) {
      console.error('Erro ao fazer upload da foto:', err)
      alert('Erro ao atualizar a foto de perfil')
      setFotoFile(null)
      setFotoPreviewUrl('')
    } finally {
      setUploadingPhoto(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const triggerPhotoInput = () => {
    fileInputRef.current?.click()
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('admin-theme', theme)
  }, [theme])

  const currentTheme = useMemo(
    () => THEMES.find(item => item.key === theme) || THEMES[0],
    [theme]
  )

  const fallbackName = isProfessor ? 'Professor' : 'Administrador'
  const displayName = userInfo?.nome || fallbackName
  const displayEmail = userInfo?.username || (isProfessor ? 'professor@escola.com' : 'admin@escola.com')
  const displayRole = userInfo?.nivelAcesso === 'ADMIN'
    ? 'Administrador'
    : userInfo?.nivelAcesso === 'PROFESSOR'
      ? 'Professor'
      : fallbackName
  const displayRoleFull = userInfo?.nivelAcesso === 'ADMIN' ? 'Administrador do Sistema' : displayRole

  return (
    <div className="db-root">
      <SharedNav activeItem="perfil" />

      <main className="db-main">
        <div className="pf-page-title">Meu <span>Perfil</span></div>

        <div className="pf-profile-hero">
          <div className="pf-hero-grid" />
          <div className="pf-hero-avatar">
            {fotoPreviewUrl ? (
              <img src={fotoPreviewUrl} alt="Foto de Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            ) : (
              displayName[0] || 'A'
            )}
          </div>
          <div className="pf-hero-name">{displayName}</div>
          <div className="pf-hero-role">
            <span className="pf-role-dot" />
            {displayRoleFull}
          </div>
          <div className="pf-hero-accent" />
        </div>

        <div className="pf-cards-grid">
          <div className="pf-card">
            <div className="pf-card-section-title">
              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              Informacoes Pessoais
            </div>
            <div className="pf-info-row"><span className="pf-info-label">Nome</span><span className="pf-info-value">{displayName}</span></div>
            <div className="pf-info-row"><span className="pf-info-label">Email</span><span className="pf-info-value">{displayEmail}</span></div>
            <div className="pf-info-row"><span className="pf-info-label">Cargo</span><span className="pf-info-value">{displayRole}</span></div>
            <div className="pf-info-row"><span className="pf-info-label">Desde</span><span className="pf-info-value">{userInfo?.dataCadastro ? new Date(userInfo.dataCadastro).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Janeiro 2023'}</span></div>
          </div>

          <div className="pf-card">
            <div className="pf-card-section-title">
              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              Configuracoes
            </div>
            <div className="pf-photo-panel">
              <div style={{ display: 'none' }}>
                <input
                  ref={fileInputRef}
                  id="foto-input-perfil"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </div>
              
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(76,201,240,0.12)', border: '2px solid rgba(76,201,240,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', fontWeight: 800, color: '#4CC9F0', overflow: 'hidden', cursor: 'pointer', marginBottom: '20px' }} onClick={triggerPhotoInput}>
                {fotoPreviewUrl ? (
                  <img
                    src={fotoPreviewUrl}
                    alt="Foto de Perfil"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  displayName[0] || 'A'
                )}
              </div>
              
              <button
                className="pf-config-btn pf-photo-upload-btn"
                onClick={triggerPhotoInput}
                disabled={uploadingPhoto}
              >
                <span className="pf-config-btn-left">
                  <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  {uploadingPhoto ? 'Enviando...' : 'Escolher Foto'}
                </span>
              </button>
            </div>

            <button className="pf-config-btn">
              <span className="pf-config-btn-left">
                <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Alterar Senha
              </span>
              <span className="pf-config-arrow">&gt;</span>
            </button>
            <button className="pf-config-btn">
              <span className="pf-config-btn-left">
                <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                Notificacoes
              </span>
              <span className="pf-config-arrow">&gt;</span>
            </button>

            <div className="pf-theme-panel">
              <div className="pf-theme-panel-title">
                <span className="pf-config-btn-left">
                  <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                  Tema
                </span>
                <span>{currentTheme.label}</span>
              </div>
              <div className="pf-theme-options">
                {THEMES.map(item => (
                  <button
                    key={item.key}
                    type="button"
                    className={`pf-theme-option pf-theme-option-${item.key}${theme === item.key ? ' pf-theme-option-active' : ''}`}
                    onClick={() => setTheme(item.key)}
                  >
                    <span className="pf-theme-swatch" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button className="pf-config-btn">
              <span className="pf-config-btn-left">
                <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                Preferencias
              </span>
              <span className="pf-config-arrow">&gt;</span>
            </button>
          </div>

          <div className="pf-card">
            <div className="pf-card-section-title">
              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              Estatisticas
            </div>
            {stats.loading ? (
              <div style={{ textAlign: 'center', padding: '20px', opacity: 0.6 }}>Carregando...</div>
            ) : stats.error ? (
              <div style={{ textAlign: 'center', padding: '20px', opacity: 0.7, color: '#f87171', fontSize: '12px', wordBreak: 'break-word' }}>
                {stats.error}
                <div style={{ marginTop: '8px', opacity: 0.7, fontSize: '11px' }}>Verifique se o backend esta rodando em http://localhost:8080</div>
              </div>
            ) : (
              <div className="pf-stats-grid">
                <div className="pf-stat-card">
                  <div className="pf-stat-number">{stats.totalAlunos}</div>
                  <div className="pf-stat-label">{isProfessor ? 'Alunos Vinculados' : 'Alunos Cadastrados'}</div>
                </div>
                <div className="pf-stat-card">
                  <div className="pf-stat-number">{stats.totalTurmas}</div>
                  <div className="pf-stat-label">{isProfessor ? 'Minhas Turmas' : 'Turmas Criadas'}</div>
                </div>
                <div className="pf-stat-card">
                  <div className="pf-stat-number">{isProfessor ? stats.chamadasFeitas : stats.totalUsuarios}</div>
                  <div className="pf-stat-label">{isProfessor ? 'Chamadas Feitas' : 'Usuarios Ativos'}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Perfil
