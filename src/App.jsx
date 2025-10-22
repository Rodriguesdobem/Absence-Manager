import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import UsuarioService from './Services/UsuarioService'
import './style.css'

function Welcome() {
  const navigate = useNavigate()
  
  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">Absence Manager</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </div>
      </nav>
      
      <section id="home" className="welcome-container">
        <div className="welcome-content">
          <h1>Absence Manager</h1>
          <p>Sistema Inteligente de Gerenciamento de Ausências</p>
          <div className="features-preview">
            <div className="feature-item">
              <span className="feature-icon"></span>
              <span>Relatórios Detalhados</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon"></span>
              <span>Controle em Tempo Real</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon"></span>
              <span>Seguro e Confiável</span>
            </div>
          </div>
          <button className="start-btn" onClick={() => navigate('/login')}>
            Começar Agora
          </button>
        </div>
      </section>
      
      <section id="sobre" className="about-section">
        <div className="about-container">
          <h1>Sobre o Absence Manager</h1>
          <div className="about-content">
            <div className="about-text">
              <p>O <strong>Absence Manager</strong> é uma solução inovadora desenvolvida para revolucionar o gerenciamento de ausências em instituições educacionais e empresas.</p>
              <p>Nossa plataforma oferece controle total sobre faltas, licenças e presenças, proporcionando insights valiosos através de relatórios detalhados e análises em tempo real.</p>
            </div>
            <div className="about-features">
              <div className="about-feature">
                <div className="feature-number">01</div>
                <h3>Gestão Inteligente</h3>
                <p>Sistema automatizado que simplifica o controle de ausências com alertas e notificações inteligentes.</p>
              </div>
              <div className="about-feature">
                <div className="feature-number">02</div>
                <h3>Relatórios Avançados</h3>
                <p>Dashboards interativos com métricas detalhadas para tomada de decisões estratégicas.</p>
              </div>
              <div className="about-feature">
                <div className="feature-number">03</div>
                <h3>Segurança Total</h3>
                <p>Proteção de dados com criptografia avançada e controle de acesso por níveis de permissão.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="rodape" id="contato">
        <div className="rodape-div">
          <div className="rodape-div-1">
            <div className="rodape-div-1-coluna">
              <span><b>LOGO</b></span>
              <p>Belval, Barueri - SP, 06420-150</p>
            </div>
          </div>
          <div className="rodape-div-2">
            <div className="rodape-div-2-coluna">
              <span><b>Contatos</b></span>
              <p>Sem Email Definido</p>
              <p>+55 (11) 99999-9999</p>
            </div>
          </div>
          <div className="rodape-div-3">
            <div className="rodape-div-3-coluna">
              <span><b>Links</b></span>
              <p><a href="#servicos">Serviços</a></p>
              <p><a href="#empresa">Empresa</a></p>
              <p><a href="#sobre">Sobre</a></p>
            </div>
          </div>
          <div className="rodape-div-4">
            <div className="rodape-div-4-coluna">
              <span><b>Outros</b></span>
              <p>Políticas de Privacidade</p>
            </div>
          </div>
        </div>
        <p className="rodape-direitos">Copyright © 2023 – Todos os Direitos Reservados.</p>
      </footer>
    </>
  )
}

function Login() {
  const navigate = useNavigate()
  
  return (
    <div className="login-page">
      <button className="back-btn" onClick={() => navigate('/')}>
        ◀
      </button>
      <div className="login-container">
        <h1>Bem-Vindo!</h1>
        <div className="login-form">
          <div className="input-group">
            <input type="text" className="input-field" style={{height: '50px'}} required />
            <label className="input-label">Nome de usuário ou Email do Usuário</label>
          </div>
          <div className="input-group">
            <input type="password" className="input-field" style={{height: '50px'}} required />
            <label className="input-label">Senha</label>
          </div>
          <div className="login-buttons">
            <button className="login-btn" onClick={() => navigate('/dashboard')}>Entrar como Admin</button>
            <button className="login-btn professor-btn" onClick={() => navigate('/dashboard-professor')}>Entrar como Professor</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Absence Manager</div>
        <div className="nav-actions">
          <button className="profile-btn" onClick={() => navigate('/perfil')}>
            👤
          </button>
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
            Sair
          </button>
        </div>
      </nav>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/cadastrar-aluno">Cadastrar Aluno</Link></li>
          <li><Link to="/gerenciamento">Gerenciamento</Link></li>
          <li><Link to="/criar-turmas">Criar Turmas</Link></li>
          <li><Link to="/relatorios-admin">Relatórios</Link></li>
        </ul>
      </div>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar Saída</h3>
            <p>Tem certeza que deseja sair da sua conta?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
              <button className="confirm-btn" onClick={() => navigate('/')}>Sair</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="main-content">
        <div className="top-bar">
          <div className="breadcrumb">
            <span className="dashboard-title">Dashboard</span>
          </div>
        </div>
        
        <div className="stats-row">
          <div className="welcome-card">
            <div className="welcome-icon">👋</div>
            <div className="welcome-title">Bem-Vindo de volta, Admin!</div>
            <div className="account-name">Administrador do Sistema</div>
          </div>
          <div className="datetime-card">
            <div className="clock-header">
              <div className="clock-icon">🕐</div>
              <h3>Horário Atual</h3>
            </div>
            <div className="time-display">{currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</div>
            <div className="date-display">{currentTime.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>
        
        <div className="charts-row">
          <div className="activities-section">
            <h3>Atualizações</h3>
            <div className="no-updates">
              <p>Sem Atualizações</p>
            </div>
          </div>
          
          <div className="weather-card">
            <h3>Clima Mundial</h3>
            <div className="main-weather">
              <div className="city-name-main">Barueri</div>
              <div className="city-temp-main">28°C</div>
              <div className="city-desc-main">☀️ Ensolarado</div>
              <div className="weather-details">
                <span>💧 Umidade: 65%</span>
                <span>💨 Vento: 12 km/h</span>
              </div>
            </div>
            <div className="other-cities">
              <div className="city-weather-small">
                <span className="city-name-small">São Paulo</span>
                <span className="city-temp-small">25°C</span>
              </div>
              <div className="city-weather-small">
                <span className="city-name-small">Rio de Janeiro</span>
                <span className="city-temp-small">32°C</span>
              </div>
              <div className="city-weather-small">
                <span className="city-name-small">Brasília</span>
                <span className="city-temp-small">26°C</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="rodape">
        <div className="rodape-div">
          <div className="rodape-div-1">
            <div className="rodape-div-1-coluna">
              <span><b>LOGO</b></span>
              <p>Belval, Barueri - SP, 06420-150</p>
            </div>
          </div>
          <div className="rodape-div-2">
            <div className="rodape-div-2-coluna">
              <span><b>Contatos</b></span>
              <p>Sem Email Definido</p>
              <p>+55 (11) 99999-9999</p>
            </div>
          </div>
          <div className="rodape-div-3">
            <div className="rodape-div-3-coluna">
              <span><b>Links</b></span>
              <p><a href="#servicos">Home</a></p>
              <p><a href="#empresa">Sobre nós</a></p>
              <p><a href="#contato">Contato</a></p>
            </div>
          </div>
          <div className="rodape-div-4">
            <div className="rodape-div-4-coluna">
              <span><b>Outros</b></span>
              <p>Políticas de Privacidade</p>
            </div>
          </div>
        </div>
        <p className="rodape-direitos">Copyright © 2023 – Todos os Direitos Reservados.</p>
      </footer>
    </div>
  )
}

function Gerenciamento() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [filtroTurma, setFiltroTurma] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')
  const [filtroNome, setFiltroNome] = useState('')
  const [alunos, setAlunos] = useState([
    { ra: 1, nome: 'Guilherme Castro', nascimento: '15/03/2000', email: 'guilherme.castro@email.com', celular: '(11) 99999-1234', turma: 'Turma Violão', ativo: true, faltas: 2, totalAulas: 20 }
  ])
  
  const toggleStatus = (index) => {
    const novosAlunos = [...alunos]
    novosAlunos[index].ativo = !novosAlunos[index].ativo
    setAlunos(novosAlunos)
  }
  
  let alunosFiltrados = alunos
  if (filtroNome) alunosFiltrados = alunosFiltrados.filter(aluno => aluno.nome.toLowerCase().includes(filtroNome.toLowerCase()))
  if (filtroTurma) alunosFiltrados = alunosFiltrados.filter(aluno => aluno.turma === filtroTurma)
  if (filtroStatus) alunosFiltrados = alunosFiltrados.filter(aluno => filtroStatus === 'ativo' ? aluno.ativo : !aluno.ativo)
  
  const turmas = [...new Set(alunos.map(aluno => aluno.turma))]
  
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Gerenciamento de Alunos</div>
        <div className="nav-actions">
          <button className="profile-btn" onClick={() => navigate('/perfil')}>
            👤
          </button>
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
            Sair
          </button>
        </div>
      </nav>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/cadastrar-aluno">Cadastrar Aluno</Link></li>
          <li><Link to="/gerenciamento">Gerenciamento</Link></li>
          <li><Link to="/criar-turmas">Criar Turmas</Link></li>
          <li><Link to="/relatorios-admin">Relatórios</Link></li>
          </ul>
      </div>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar Saída</h3>
            <p>Tem certeza que deseja sair da sua conta?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
              <button className="confirm-btn" onClick={() => navigate('/')}>Sair</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="main-content">
        <div className="top-bar">
          <div className="breadcrumb">
            <span className="dashboard-title">Alunos</span>
          </div>
        </div>
        
        <div className="management-container">
          <div className="management-header">
            <h2>Gerenciar Aluno</h2>
            <div className="search-filters">
              <input type="text" placeholder="Nome" className="filter-input" value={filtroNome} onChange={(e) => setFiltroNome(e.target.value)} />
              <select className="filter-select" value={filtroTurma} onChange={(e) => setFiltroTurma(e.target.value)}>
                <option value="">Todas as Turmas</option>
                {turmas.map(turma => (
                  <option key={turma} value={turma}>{turma}</option>
                ))}
              </select>
              <select className="filter-select" value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
                <option value="">Todos</option>
                <option value="ativo">Ativos</option>
                <option value="inativo">Inativos</option>
              </select>
            </div>
          </div>
          
          <div className="students-table">
            <table>
              <thead>
                <tr>
                  <th>R.A.</th>
                  <th>Aluno</th>
                  <th>Turma</th>
                  <th>Status</th>
                  <th>Nascimento</th>
                  <th>Email</th>
                  <th>Celular</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunosFiltrados.map((aluno, index) => {
                  const originalIndex = alunos.findIndex(a => a.ra === aluno.ra && a.nome === aluno.nome)
                  return (
                    <tr key={index} className={!aluno.ativo ? 'inactive-row' : ''}>
                      <td>{aluno.ra}</td>
                      <td>
                        <div className="student-info" onClick={() => navigate(`/aluno/${aluno.ra}`)} style={{cursor: 'pointer'}}>
                          <span className="student-icon">👥</span>
                          {aluno.nome}
                        </div>
                      </td>
                      <td>{aluno.turma}</td>
                      <td>
                        <span className={`status ${aluno.ativo ? 'ativo' : 'inativo'}`}>
                          {aluno.ativo ? '✓' : 'X'}
                        </span>
                      </td>
                      <td>{aluno.nascimento}</td>
                      <td>{aluno.email}</td>
                      <td>{aluno.celular}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view">Ver</button>
                          <button className="action-btn edit" onClick={() => navigate(`/editar-aluno/${aluno.ra}`)}>Editar</button>
                          <button 
                            className={`action-btn toggle ${aluno.ativo ? 'deactivate' : 'activate'}`}
                            onClick={() => toggleStatus(originalIndex)}
                          >
                            {aluno.ativo ? 'X' : '✓'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <footer className="rodape">
        <div className="rodape-div">
          <div className="rodape-div-1">
            <div className="rodape-div-1-coluna">
              <span><b>LOGO</b></span>
              <p>Belval, Barueri - SP, 06420-150</p>
            </div>
          </div>
          <div className="rodape-div-2">
            <div className="rodape-div-2-coluna">
              <span><b>Contatos</b></span>
              <p>Sem Email Definido</p>
              <p>+55 (11) 99999-9999</p>
            </div>
          </div>
          <div className="rodape-div-3">
            <div className="rodape-div-3-coluna">
              <span><b>Links</b></span>
              <p><a href="#servicos">Home</a></p>
              <p><a href="#empresa">Sobre nós</a></p>
              <p><a href="#contato">Contato</a></p>
            </div>
          </div>
          <div className="rodape-div-4">
            <div className="rodape-div-4-coluna">
              <span><b>Outros</b></span>
              <p>Políticas de Privacidade</p>
            </div>
          </div>
        </div>
        <p className="rodape-direitos">Copyright © 2023 – Todos os Direitos Reservados.</p>
      </footer>
    </div>
  )
}

function PerfilAluno() {
  const navigate = useNavigate()
  const { ra } = useParams()
  const [menuOpen, setMenuOpen] = useState(false)
  
  const alunos = [
    { ra: 1, nome: 'Alan Teste Fulano', nascimento: '01/01/1994', email: 'alan@educante.com', celular: '(11) 99774-7378', turma: 'Turma Violão', ativo: true, faltas: 5, totalAulas: 20 },
    { ra: 16, nome: 'Augusto', nascimento: '25/09/2010', email: '', celular: '', turma: 'Turma Trompete', ativo: true, faltas: 2, totalAulas: 18 },
    { ra: 10, nome: 'Bruno César', nascimento: '08/09/2000', email: 'bruno.cesar75@gmail.com', celular: '(11) 99887-7777', turma: 'Turma Piano', ativo: false, faltas: 8, totalAulas: 22 },
    { ra: 1, nome: 'Diego Lima', nascimento: '10/06/1985', email: 'diegolima7765@hotmail.com', celular: '(41) 99686-8777', turma: 'Turma Violão', ativo: true, faltas: 3, totalAulas: 20 },
    { ra: 14, nome: 'Gustavo Galvão', nascimento: '12/07/2018', email: '', celular: '', turma: 'Turma Bateria', ativo: false, faltas: 12, totalAulas: 25 },
    { ra: 9, nome: 'Henrique Dourado', nascimento: '16/06/2001', email: 'henriquedg@hotmail.com', celular: '(21) 98776-6677', turma: 'Turma Trompete', ativo: true, faltas: 1, totalAulas: 18 },
    { ra: 6, nome: 'João Nogueira', nascimento: '05/04/2000', email: 'joaonogueira567@hotmail.com', celular: '(11) 99877-7666', turma: 'Turma Piano', ativo: true, faltas: 4, totalAulas: 22 },
    { ra: 3, nome: 'Leonardo Batista', nascimento: '16/04/1999', email: 'leobatista@hotmail.com', celular: '(11) 99885-7766', turma: 'Turma Violão', ativo: true, faltas: 6, totalAulas: 20 },
    { ra: 7, nome: 'Leonardo Silva', nascimento: '06/05/1985', email: 'leonardosilverno93@gmail.com', celular: '(51) 99489-7776', turma: 'Turma Bateria', ativo: false, faltas: 15, totalAulas: 25 },
    { ra: 5, nome: 'Luan da Silva', nascimento: '10/02/1996', email: 'luandasilvamkm@hotmail.com', celular: '(71) 99287-7778', turma: 'Turma Piano', ativo: true, faltas: 2, totalAulas: 22 }
  ]
  
  const aluno = alunos.find(a => a.ra === parseInt(ra))
  
  if (!aluno) {
    return <div>Aluno não encontrado</div>
  }
  
  const porcentagemFaltas = ((aluno.faltas / aluno.totalAulas) * 100).toFixed(1)
  
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Perfil do Aluno</div>
        <div className="nav-actions">
          <button className="profile-btn" onClick={() => navigate('/perfil')}>
            👤
          </button>
          <button className="logout-btn" onClick={() => navigate('/gerenciamento')}>
            Voltar
          </button>
        </div>
      </nav>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/cadastrar-aluno">Cadastrar Aluno</Link></li>
          <li><Link to="/gerenciamento">Gerenciamento</Link></li>
          <li><Link to="/criar-turmas">Criar Turmas</Link></li>
          <li><Link to="/relatorios-admin">Relatórios</Link></li>
        </ul>
      </div>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      
      <div className="main-content">
        <div className="top-bar">
          <div className="breadcrumb">
            <span className="dashboard-title">Perfil - {aluno.nome}</span>
          </div>
        </div>
        
        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">👥</div>
              <h2>{aluno.nome}</h2>
              <span className={`profile-status ${aluno.ativo ? 'ativo' : 'inativo'}`}>
                {aluno.ativo ? '✓ Ativo' : 'X Inativo'}
              </span>
            </div>
            
            <div className="profile-info">
              <div className="info-row">
                <span className="info-label">R.A.:</span>
                <span className="info-value">{aluno.ra}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Turma:</span>
                <span className="info-value">{aluno.turma}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Nascimento:</span>
                <span className="info-value">{aluno.nascimento}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{aluno.email || 'Não informado'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Celular:</span>
                <span className="info-value">{aluno.celular || 'Não informado'}</span>
              </div>
            </div>
            
            <div className="attendance-section">
              <h3>Frequência</h3>
              <div className="attendance-stats">
                <div className="stat-item">
                  <span className="stat-label">Total de Aulas:</span>
                  <span className="stat-value">{aluno.totalAulas}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Faltas:</span>
                  <span className="stat-value">{aluno.faltas}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Presenças:</span>
                  <span className="stat-value">{aluno.totalAulas - aluno.faltas}</span>
                </div>
                <div className="stat-item highlight">
                  <span className="stat-label">% de Faltas:</span>
                  <span className="stat-value">{porcentagemFaltas}%</span>
                </div>
              </div>
              
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${100 - porcentagemFaltas}%`}}></div>
              </div>
              <p className="progress-text">Frequência: {(100 - porcentagemFaltas).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="rodape">
        <div className="rodape-div">
          <div className="rodape-div-1">
            <div className="rodape-div-1-coluna">
              <span><b>LOGO</b></span>
              <p>Belval, Barueri - SP, 06420-150</p>
            </div>
          </div>
          <div className="rodape-div-2">
            <div className="rodape-div-2-coluna">
              <span><b>Contatos</b></span>
              <p>Sem Email Definido</p>
              <p>+55 (11) 99999-9999</p>
            </div>
          </div>
          <div className="rodape-div-3">
            <div className="rodape-div-3-coluna">
              <span><b>Links</b></span>
              <p><a href="#servicos">Home</a></p>
              <p><a href="#empresa">Sobre nós</a></p>
              <p><a href="#contato">Contato</a></p>
            </div>
          </div>
          <div className="rodape-div-4">
            <div className="rodape-div-4-coluna">
              <span><b>Outros</b></span>
              <p>Políticas de Privacidade</p>
            </div>
          </div>
        </div>
        <p className="rodape-direitos">Copyright © 2023 – Todos os Direitos Reservados.</p>
      </footer>
    </div>
  )
}

function DashboardProfessor() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  
  const minhasTurmas = [
    { nome: 'Turma Violão', alunos: 1, presentes: 1, ausentes: 0 },
    { nome: 'Turma Piano', alunos: 0, presentes: 0, ausentes: 0 }
  ]
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Dashboard Professor</div>
        <div className="nav-actions">
          <button className="profile-btn" onClick={() => navigate('/perfil')}>
            👤
          </button>
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
            Sair
          </button>
        </div>
      </nav>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard-professor">Dashboard</Link></li>
          <li><Link to="/minhas-turmas">Minhas Turmas</Link></li>
          <li><Link to="/chamada-professor">Chamada</Link></li>
          <li><Link to="/relatorios-professor">Relatórios</Link></li>
        </ul>
      </div>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar Saída</h3>
            <p>Tem certeza que deseja sair da sua conta?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
              <button className="confirm-btn" onClick={() => navigate('/')}>Sair</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="main-content">
        <div className="top-bar">
          <div className="breadcrumb">
            <span className="dashboard-title">Dashboard Professor</span>
          </div>
        </div>
        
        <div className="stats-row">
          <div className="welcome-card">
            <div className="welcome-icon">👋</div>
            <div className="welcome-title">Bem-Vindo, Prof. Silva!</div>
            <div className="account-name">Professor do Sistema</div>
          </div>
          <div className="datetime-card">
            <div className="clock-header">
              <div className="clock-icon">🕐</div>
              <h3>Horário Atual</h3>
            </div>
            <div className="time-display">{currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</div>
            <div className="date-display">{currentTime.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>
        
        <div className="charts-row">
          <div className="turmas-section">
            <h3>Minhas Turmas</h3>
            {minhasTurmas.map((turma, index) => (
              <div key={index} className="turma-card">
                <h4>{turma.nome}</h4>
                <div className="turma-stats">
                  <span>Total: {turma.alunos}</span>
                  <span className="presentes">Presentes: {turma.presentes}</span>
                  <span className="ausentes">Ausentes: {turma.ausentes}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="resumo-section">
            <h3>Resumo do Dia</h3>
            <div className="resumo-stats">
              <div className="stat-item">
                <span className="stat-number">1</span>
                <span className="stat-label">Total Alunos</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1</span>
                <span className="stat-label">Presentes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Ausentes</span>
              </div>
            </div>
          </div>
          
          <div className="acoes-section">
            <h3>Ações Rápidas</h3>
            <div className="action-buttons">
              <button className="action-card">Ver Relatórios</button>
              <button className="action-card" onClick={() => navigate('/minhas-turmas')}>Gerenciar Turmas</button>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="rodape">
        <div className="rodape-div">
          <div className="rodape-div-1">
            <div className="rodape-div-1-coluna">
              <span><b>LOGO</b></span>
              <p>Belval, Barueri - SP, 06420-150</p>
            </div>
          </div>
          <div className="rodape-div-2">
            <div className="rodape-div-2-coluna">
              <span><b>Contatos</b></span>
              <p>Sem Email Definido</p>
              <p>+55 (11) 99999-9999</p>
            </div>
          </div>
          <div className="rodape-div-3">
            <div className="rodape-div-3-coluna">
              <span><b>Links</b></span>
              <p><a href="#servicos">Home</a></p>
              <p><a href="#empresa">Sobre nós</a></p>
              <p><a href="#contato">Contato</a></p>
            </div>
          </div>
          <div className="rodape-div-4">
            <div className="rodape-div-4-coluna">
              <span><b>Outros</b></span>
              <p>Políticas de Privacidade</p>
            </div>
          </div>
        </div>
        <p className="rodape-direitos">Copyright © 2023 – Todos os Direitos Reservados.</p>
      </footer>
    </div>
  )
}

function CriarTurmas() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  
  return (
    <div className="cadastro-page">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Criar Turmas</div>
        <div className="nav-actions">
          <button className="profile-btn" onClick={() => navigate('/perfil')}>
            👤
          </button>
          <button className="logout-btn" onClick={() => navigate('/')}>
            Sair
          </button>
        </div>
      </nav>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/cadastrar-aluno">Cadastrar Aluno</Link></li>
          <li><Link to="/gerenciamento">Gerenciamento</Link></li>
          <li><Link to="/criar-turmas">Criar Turmas</Link></li>
          <li><Link to="/relatorios-admin">Relatórios</Link></li>
        </ul>
      </div>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      <div className="cadastro-content">
        <div className="container">
          <div className="form-image">
            <img src="" alt="" />
          </div>
          <div className="form">
            <form action="#">
              <div className="form-header">
                <div className="title">
                  <h1>Criar Turma</h1>
                </div>
              </div>
              <div className="input-group">
                <div className="input-box">
                  <label htmlFor="turmaname">Nome da Turma</label>
                  <input id="turmaname" type="text" name="turmaname" className="input-field" placeholder="Digite o nome da turma" required />
                </div>
                <div className="input-box">
                  <label htmlFor="curso">Curso</label>
                  <input id="curso" type="text" name="curso" className="input-field" placeholder="Digite o curso" required />
                </div>
                <div className="input-box">
                  <label htmlFor="periodo">Período</label>
                  <select id="periodo" name="periodo" className="input-field" required>
                    <option value="">Selecione o período</option>
                    <option value="matutino">Matutino</option>
                    <option value="vespertino">Vespertino</option>
                    <option value="noturno">Noturno</option>
                  </select>
                </div>
                <div className="input-box">
                  <label htmlFor="ano">Ano Letivo</label>
                  <input id="ano" type="number" name="ano" className="input-field" placeholder="2024" min="2020" max="2030" required />
                </div>
                <div className="input-box">
                  <label htmlFor="capacidade">Capacidade</label>
                  <input id="capacidade" type="number" name="capacidade" className="input-field" placeholder="Número máximo de alunos" min="1" max="100" required />
                </div>
                <div className="input-box">
                  <label htmlFor="professor">Professor Responsável</label>
                  <input id="professor" type="text" name="professor" className="input-field" placeholder="Nome do professor" required />
                </div>
              </div>
              <div className="continue-button">
                <button type="submit">Criar Turma</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer className="rodape">
        <div className="rodape-div">
          <div className="rodape-div-1">
            <div className="rodape-div-1-coluna">
              <span><b>LOGO</b></span>
              <p>Belval, Barueri - SP, 06420-150</p>
            </div>
          </div>
          <div className="rodape-div-2">
            <div className="rodape-div-2-coluna">
              <span><b>Contatos</b></span>
              <p>Sem Email Definido</p>
              <p>+55 (11) 99999-9999</p>
            </div>
          </div>
          <div className="rodape-div-3">
            <div className="rodape-div-3-coluna">
              <span><b>Links</b></span>
              <p><a href="#servicos">Home</a></p>
              <p><a href="#empresa">Sobre nós</a></p>
              <p><a href="#contato">Contato</a></p>
            </div>
          </div>
          <div className="rodape-div-4">
            <div className="rodape-div-4-coluna">
              <span><b>Outros</b></span>
              <p>Políticas de Privacidade</p>
            </div>
          </div>
        </div>
        <p className="rodape-direitos">Copyright © 2023 – Todos os Direitos Reservados.</p>
      </footer>
    </div>
  )
}

function CadastrarAluno() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    const userData = new FormData()
    userData.append('nome', `${formData.get('firstname')} ${formData.get('lastname')}`)
    userData.append('email', formData.get('email'))
    userData.append('celular', formData.get('number'))
    userData.append('senha', formData.get('password'))
    userData.append('genero', formData.get('gender'))
    userData.append('turma', formData.get('turma'))
    
    try {
      await UsuarioService.cadastrar(userData)
      setMessage({ type: 'success', text: '✅ Aluno cadastrado com sucesso!' })
      setShowMessage(true)
      setTimeout(() => {
        navigate('/gerenciamento')
      }, 2000)
    } catch (error) {
      console.error('Erro completo:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido'
      setMessage({ type: 'error', text: `❌ Erro ao cadastrar aluno: ${errorMessage}` })
      setShowMessage(true)
    }
  }
  
  return (
    <div className="cadastro-page">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Cadastrar Aluno</div>
        <div className="nav-actions">
          <button className="profile-btn" onClick={() => navigate('/perfil')}>
            👤
          </button>
          <button className="logout-btn" onClick={() => navigate('/')}>
            Sair
          </button>
        </div>
      </nav>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/cadastrar-aluno">Cadastrar Aluno</Link></li>
          <li><Link to="/gerenciamento">Gerenciamento</Link></li>
          <li><Link to="/criar-turmas">Criar Turmas</Link></li>
          <li><Link to="/relatorios-admin">Relatórios</Link></li>
        </ul>
      </div>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      <div className="cadastro-content">
        <div className="container">
          <div className="form-image">
            <img src="" alt="" />
          </div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="form-header">
                <div className="title">
                  <h1>Cadastrar Aluno</h1>
                </div>
              </div>
              <div className="input-group">
                <div className="input-box">
                  <label htmlFor="firstname">Primeiro nome</label>
                  <input id="firstname" type="text" name="firstname" className="input-field" placeholder="Digite o primeiro nome" required />
                </div>
                <div className="input-box">
                  <label htmlFor="lastname">Sobrenome</label>
                  <input id="lastname" type="text" name="lastname" className="input-field" placeholder="Digite o sobrenome" required />
                </div>
                <div className="input-box">
                  <label htmlFor="email">E-mail</label>
                  <input id="email" type="email" name="email" className="input-field" placeholder="Digite o email" required />
                </div>
                <div className="input-box">
                  <label htmlFor="number">Celular</label>
                  <input id="number" type="tel" name="number" className="input-field" placeholder="(xx) xxxx-xxxx" required />
                </div>
                <div className="input-box">
                  <label htmlFor="password">Senha</label>
                  <input id="password" type="password" name="password" className="input-field" placeholder="Digite a Senha" required />
                </div>
                <div className="input-box">
                  <label htmlFor="confirmPassword">Confirme sua Senha</label>
                  <input id="confirmPassword" type="password" name="confirmPassword" className="input-field" placeholder="Digite a senha novamente" required />
                </div>
                <div className="input-box">
                  <label htmlFor="turma">Turma</label>
                  <select id="turma" name="turma" className="input-field" required>
                    <option value="">Selecione a turma</option>
                    <option value="Turma Violão">Turma Violão</option>
                    <option value="Turma Piano">Turma Piano</option>
                    <option value="Turma Bateria">Turma Bateria</option>
                    <option value="Turma Trompete">Turma Trompete</option>
                  </select>
                </div>
              </div>
              <div className="gender-inputs">
                <div className="gender-title">
                  <h6>Gênero</h6>
                </div>
                <div className="gender-groups">
                  <div className="gender-input">
                    <input id="female" type="radio" name="gender" />
                    <label htmlFor="female">Feminino</label>
                  </div>
                  <div className="gender-input">
                    <input id="male" type="radio" name="gender" />
                    <label htmlFor="male">Masculino</label>
                  </div>
                </div>
              </div>
              <div className="continue-button">
                <button type="submit">Cadastrar Aluno</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChamadaProfessor(){
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [turmaSelecionada, setTurmaSelecionada] = useState('Turma Violão')

  
  const chamadas = [
    { data: '2024-01-15', turma: 'Turma Violão', aluno: 'Guilherme Castro', status: 'Presente' },
    { data: '2024-01-14', turma: 'Turma Piano', aluno: 'Guilherme Castro', status: 'Presente' }
  ]
  
  const chamadasFiltradas = chamadas.filter(c => c.turma === turmaSelecionada)
  

  
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Chamada</div>
        <div className="nav-actions">
          <button className="profile-btn" onClick={() => navigate('/perfil')}>
            👤
          </button>
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
            Sair
          </button>
        </div>
      </nav>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard-professor">Dashboard</Link></li>
          <li><Link to="/minhas-turmas">Minhas Turmas</Link></li>
          <li><Link to="/chamada-professor">Chamada</Link></li>
          <li><Link to="/relatorios-professor">Relatórios</Link></li>
        </ul>
      </div>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar Saída</h3>
            <p>Tem certeza que deseja sair da sua conta?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
              <button className="confirm-btn" onClick={() => navigate('/')}>Sair</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="main-content">
        <div className="top-bar">
          <div className="breadcrumb">
            <span className="dashboard-title">Consulta de Chamada</span>
          </div>
        </div>
        
        <div className="chamada-container">
          <div className="chamada-header">
            <h2>Histórico de Chamadas</h2>
            <select 
              className="turma-select" 
              value={turmaSelecionada} 
              onChange={(e) => setTurmaSelecionada(e.target.value)}
            >
              <option value="Turma Violão">Turma Violão</option>
              <option value="Turma Piano">Turma Piano</option>
            </select>
          </div>
          
          <div className="chamada-table">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Aluno</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {chamadasFiltradas.map((chamada, index) => (
                  <tr key={index}>
                    <td>{new Date(chamada.data).toLocaleDateString('pt-BR')}</td>
                    <td>{chamada.aluno}</td>
                    <td>
                      <span className={`status-badge ${chamada.status.toLowerCase()}`}>
                        {chamada.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}


function MinhasTurmas() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  
  const turmas = [
    { id: 1, nome: 'Turma Violão', alunos: 1, horario: '14:00 - 16:00', sala: 'Sala 101' },
    { id: 2, nome: 'Turma Piano', alunos: 0, horario: '16:00 - 18:00', sala: 'Sala 102' }
  ]
  
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Minhas Turmas</div>
        <div className="nav-actions">
          <button className="profile-btn" onClick={() => navigate('/perfil')}>
            👤
          </button>
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
            Sair
          </button>
        </div>
      </nav>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard-professor">Dashboard</Link></li>
          <li><Link to="/minhas-turmas">Minhas Turmas</Link></li>
          <li><Link to="/chamada-professor">Chamada</Link></li>
          <li><Link to="/relatorios-professor">Relatórios</Link></li>
        </ul>
      </div>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar Saída</h3>
            <p>Tem certeza que deseja sair da sua conta?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
              <button className="confirm-btn" onClick={() => navigate('/')}>Sair</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="main-content">
        <div className="top-bar">
          <div className="breadcrumb">
            <span className="dashboard-title">Minhas Turmas</span>
          </div>
        </div>
        
        <div className="turmas-container">
          {turmas.map(turma => (
            <div key={turma.id} className="turma-card-large">
              <h3>{turma.nome}</h3>
              <div className="turma-info">
                <p><strong>Alunos:</strong> {turma.alunos}</p>
                <p><strong>Horário:</strong> {turma.horario}</p>
                <p><strong>Sala:</strong> {turma.sala}</p>
              </div>
              <div className="turma-actions">
                <button className="btn-primary" onClick={() => navigate(`/ver-alunos-turma/${turma.id}`)}>Ver Alunos</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function VerAlunosTurma() {
  const navigate = useNavigate()
  const { turmaId } = useParams()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  
  const turmas = {
    1: { nome: 'Turma Violão', alunos: [{ id: 1, nome: 'Guilherme Castro', ra: 1, email: 'guilherme.castro@email.com', telefone: '(11) 99999-1234' }] },
    2: { nome: 'Turma Piano', alunos: [] }
  }
  
  const turma = turmas[turmaId]
  
  if (!turma) {
    return <div>Turma não encontrada</div>
  }
  
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">{turma.nome} - Alunos</div>
        <div className="nav-actions">
          <button className="profile-btn" onClick={() => navigate('/perfil')}>
            👤
          </button>
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
            Sair
          </button>
        </div>
      </nav>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard-professor">Dashboard</Link></li>
          <li><Link to="/minhas-turmas">Minhas Turmas</Link></li>
          <li><Link to="/chamada-professor">Chamada</Link></li>
          <li><Link to="/relatorios-professor">Relatórios</Link></li>
        </ul>
      </div>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar Saída</h3>
            <p>Tem certeza que deseja sair da sua conta?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
              <button className="confirm-btn" onClick={() => navigate('/')}>Sair</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="main-content">
        <div className="top-bar">
          <div className="breadcrumb">
            <span className="dashboard-title">{turma.nome} - Alunos</span>
          </div>
        </div>
        
        <div className="alunos-container">
          <button className="back-btn" onClick={() => navigate('/minhas-turmas')}>← Voltar</button>
          {turma.alunos.length > 0 ? (
            <div className="students-table">
              <table>
                <thead>
                  <tr>
                    <th>R.A.</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {turma.alunos.map(aluno => (
                    <tr key={aluno.id}>
                      <td>{aluno.ra}</td>
                      <td>
                        <div className="student-info">
                          <span className="student-icon">👥</span>
                          {aluno.nome}
                        </div>
                      </td>
                      <td>{aluno.email}</td>
                      <td>{aluno.telefone}</td>
                      <td>
                        <button className="action-btn view" onClick={() => navigate(`/perfil-aluno-professor/${aluno.id}`)}>Ver Perfil</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-students">
              <p>Nenhum aluno matriculado nesta turma.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PerfilAlunoProfessor() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const { alunoId } = useParams()
  
  const alunos = [
    { id: 1, nome: 'Alan Teste Fulano', email: 'alan@email.com', telefone: '(11) 99999-9999', presencas: 18, totalAulas: 20, nascimento: '01/01/1994', ra: 1001 },
    { id: 2, nome: 'Diego Lima', email: 'diego@email.com', telefone: '(11) 88888-8888', presencas: 19, totalAulas: 20, nascimento: '10/06/1985', ra: 1002 },
    { id: 3, nome: 'Leonardo Batista', email: 'leonardo@email.com', telefone: '(11) 77777-7777', presencas: 15, totalAulas: 20, nascimento: '16/04/1999', ra: 1003 },
    { id: 4, nome: 'Bruno César', email: 'bruno@email.com', telefone: '(11) 66666-6666', presencas: 20, totalAulas: 20, nascimento: '08/09/2000', ra: 1004 },
    { id: 5, nome: 'João Nogueira', email: 'joao@email.com', telefone: '(11) 55555-5555', presencas: 17, totalAulas: 20, nascimento: '05/04/2000', ra: 1005 },
    { id: 6, nome: 'Luan da Silva', email: 'luan@email.com', telefone: '(11) 44444-4444', presencas: 16, totalAulas: 20, nascimento: '10/02/1996', ra: 1006 }
  ]
  
  const aluno = alunos.find(a => a.id === parseInt(alunoId))
  
  if (!aluno) {
    return <div>Aluno não encontrado</div>
  }
  
  const porcentagem = Math.round((aluno.presencas / aluno.totalAulas) * 100)
  const statusColor = porcentagem >= 75 ? '#4CAF50' : porcentagem >= 50 ? '#FF9800' : '#F44336'
  
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Perfil do Aluno</div>
        <div className="nav-actions">
          <button className="profile-btn" onClick={() => navigate('/perfil')}>
            👤
          </button>
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
            Sair
          </button>
        </div>
      </nav>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard-professor">Dashboard</Link></li>
          <li><Link to="/minhas-turmas">Minhas Turmas</Link></li>
          <li><Link to="/chamada-professor">Chamada</Link></li>
          <li><Link to="/relatorios-professor">Relatórios</Link></li>

        </ul>
      </div>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar Saída</h3>
            <p>Tem certeza que deseja sair da sua conta?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
              <button className="confirm-btn" onClick={() => navigate('/')}>Sair</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="main-content">
        <div className="top-bar">
          <div className="breadcrumb">
            <button className="back-btn" onClick={() => navigate(-1)}>← Voltar</button>
            <span className="dashboard-title">Perfil - {aluno.nome}</span>
          </div>
        </div>
        
        <div className="perfil-container">
          <div className="perfil-card-modern">
            <div className="perfil-header">
              <div className="perfil-avatar-large">
                <span className="avatar-icon-large">👤</span>
              </div>
              <div className="perfil-info">
                <h2 className="perfil-nome">{aluno.nome}</h2>
                <p className="perfil-ra">R.A.: {aluno.ra}</p>
              </div>
            </div>
            
            <div className="perfil-details">
              <div className="detail-section">
                <h3>Informações Pessoais</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">📧 Email:</span>
                    <span className="detail-value">{aluno.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">📞 Telefone:</span>
                    <span className="detail-value">{aluno.telefone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">🎂 Nascimento:</span>
                    <span className="detail-value">{aluno.nascimento}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>Frequência Escolar</h3>
                <div className="frequencia-stats">
                  <div className="stat-card">
                    <span className="stat-number">{aluno.totalAulas}</span>
                    <span className="stat-label">Total de Aulas</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">{aluno.presencas}</span>
                    <span className="stat-label">Presenças</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">{aluno.totalAulas - aluno.presencas}</span>
                    <span className="stat-label">Faltas</span>
                  </div>
                </div>
                
                <div className="frequencia-visual">
                  <div className="frequencia-header">
                    <span className="frequencia-title">Frequência Geral</span>
                    <span className="frequencia-percent" style={{color: statusColor}}>{porcentagem}%</span>
                  </div>
                  <div className="frequencia-bar-large">
                    <div className="frequencia-fill-large" style={{width: `${porcentagem}%`, backgroundColor: statusColor}}></div>
                  </div>
                  <div className="frequencia-status">
                    <span style={{color: statusColor}}>
                      {porcentagem >= 75 ? '✅ Frequência Adequada' : porcentagem >= 50 ? '⚠️ Atenção Necessária' : '❌ Frequência Baixa'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RelatoriosProfessor() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Relatórios</div>
        <div className="nav-actions">
          <button className="profile-btn" onClick={() => navigate('/perfil')}>
            👤
          </button>
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
            Sair
          </button>
        </div>
      </nav>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard-professor">Dashboard</Link></li>
          <li><Link to="/minhas-turmas">Minhas Turmas</Link></li>
          <li><Link to="/chamada-professor">Chamada</Link></li>
          <li><Link to="/relatorios-professor">Relatórios</Link></li>
        </ul>
      </div>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar Saída</h3>
            <p>Tem certeza que deseja sair da sua conta?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
              <button className="confirm-btn" onClick={() => navigate('/')}>Sair</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="main-content">
        <div className="top-bar">
          <div className="breadcrumb">
            <span className="dashboard-title">Relatórios</span>
          </div>
        </div>
        
        <div className="relatorios-container">
          <div className="relatorio-card">
            <h3>Frequência por Turma</h3>
            <p>Visualize a frequência dos alunos em suas turmas</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
          <div className="relatorio-card">
            <h3>Relatório Mensal</h3>
            <p>Resumo mensal de presenças e faltas</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
          <div className="relatorio-card">
            <h3>Alunos com Baixa Frequência</h3>
            <p>Lista de alunos que precisam de atenção</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function RelatoriosAdmin() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Relatórios</div>
        <div className="nav-actions">
          <button className="profile-btn" onClick={() => navigate('/perfil')}>
            👤
          </button>
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
            Sair
          </button>
        </div>
      </nav>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/cadastrar-aluno">Cadastrar Aluno</Link></li>
          <li><Link to="/gerenciamento">Gerenciamento</Link></li>
          <li><Link to="/criar-turmas">Criar Turmas</Link></li>
          <li><Link to="/relatorios-admin">Relatórios</Link></li>
        </ul>
      </div>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar Saída</h3>
            <p>Tem certeza que deseja sair da sua conta?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
              <button className="confirm-btn" onClick={() => navigate('/')}>Sair</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="main-content">
        <div className="top-bar">
          <div className="breadcrumb">
            <span className="dashboard-title">Relatórios Administrativos</span>
          </div>
        </div>
        
        <div className="relatorios-container">
          <div className="relatorio-card">
            <h3>Relatório Geral de Frequência</h3>
            <p>Frequência de todos os alunos da instituição</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
          <div className="relatorio-card">
            <h3>Relatório por Professor</h3>
            <p>Desempenho e estatísticas por professor</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
          <div className="relatorio-card">
            <h3>Relatório por Turma</h3>
            <p>Análise detalhada por turma</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
          <div className="relatorio-card">
            <h3>Alunos Críticos</h3>
            <p>Lista de alunos com frequência abaixo de 75%</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
          <div className="relatorio-card">
            <h3>Relatório Mensal</h3>
            <p>Resumo completo do mês</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
          <div className="relatorio-card">
            <h3>Exportar Dados</h3>
            <p>Exportar todos os dados em Excel/PDF</p>
            <button className="btn-primary">Exportar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function EditarAluno() {
  const navigate = useNavigate()
  const { ra } = useParams()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  const alunos = [
    { ra: 1, nome: 'Guilherme Castro', nascimento: '15/03/2000', email: 'guilherme.castro@email.com', celular: '(11) 99999-1234', turma: 'Turma Violão', ativo: true, faltas: 2, totalAulas: 20 }
  ]
  
  const aluno = alunos.find(a => a.ra === parseInt(ra))
  
  if (!aluno) {
    return <div>Aluno não encontrado</div>
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    const userData = new FormData()
    userData.append('nome', formData.get('nome'))
    userData.append('email', formData.get('email'))
    userData.append('celular', formData.get('celular'))
    userData.append('turma', formData.get('turma'))
    
    try {
      await UsuarioService.update(aluno.ra, userData)
      setMessage({ type: 'success', text: '✅ Aluno atualizado com sucesso!' })
      setShowMessage(true)
      setTimeout(() => {
        navigate('/gerenciamento')
      }, 2000)
    } catch (error) {
      setMessage({ type: 'error', text: `❌ Erro ao atualizar aluno: ${error.message}` })
      setShowMessage(true)
    }
  }
  
  return (
    <div className="cadastro-page">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Editar Aluno</div>
        <div className="nav-actions">
          <button className="profile-btn" onClick={() => navigate('/perfil')}>
            👤
          </button>
          <button className="logout-btn" onClick={() => navigate('/gerenciamento')}>
            Voltar
          </button>
        </div>
      </nav>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/cadastrar-aluno">Cadastrar Aluno</Link></li>
          <li><Link to="/gerenciamento">Gerenciamento</Link></li>
          <li><Link to="/criar-turmas">Criar Turmas</Link></li>
          <li><Link to="/relatorios-admin">Relatórios</Link></li>
        </ul>
      </div>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      
      {showMessage && (
        <div className="modal-overlay">
          <div className="modal message-modal">
            <div className={`message-content ${message.type}`}>
              <p>{message.text}</p>
              <button className="message-btn" onClick={() => setShowMessage(false)}>OK</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="cadastro-content">
        <div className="container">
          <div className="form-image">
            <div className="edit-icon">✏️</div>
            <h2>Editar Aluno</h2>
          </div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="form-header">
                <div className="title">
                  <h1>Editar Aluno</h1>
                </div>
              </div>
              <div className="input-group">
                <div className="input-box">
                  <label htmlFor="nome">Nome Completo</label>
                  <input id="nome" type="text" name="nome" className="input-field" defaultValue={aluno.nome} required />
                </div>
                <div className="input-box">
                  <label htmlFor="email">E-mail</label>
                  <input id="email" type="email" name="email" className="input-field" defaultValue={aluno.email} required />
                </div>
                <div className="input-box">
                  <label htmlFor="celular">Celular</label>
                  <input id="celular" type="tel" name="celular" className="input-field" defaultValue={aluno.celular} required />
                </div>
                <div className="input-box">
                  <label htmlFor="turma">Turma</label>
                  <select id="turma" name="turma" className="input-field" defaultValue={aluno.turma} required>
                    <option value="Turma Violão">Turma Violão</option>
                    <option value="Turma Piano">Turma Piano</option>
                    <option value="Turma Bateria">Turma Bateria</option>
                    <option value="Turma Trompete">Turma Trompete</option>
                  </select>
                </div>
              </div>
              <div className="continue-button">
                <button type="submit">Atualizar Aluno</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function Perfil() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Meu Perfil</div>
        <div className="nav-actions">
          <button className="profile-btn active">
            👤
          </button>
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
            Sair
          </button>
        </div>
      </nav>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/cadastrar-aluno">Cadastrar Aluno</Link></li>
          <li><Link to="/gerenciamento">Gerenciamento</Link></li>
          <li><Link to="/criar-turmas">Criar Turmas</Link></li>
          <li><Link to="/relatorios-admin">Relatórios</Link></li>
        </ul>
      </div>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar Saída</h3>
            <p>Tem certeza que deseja sair da sua conta?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
              <button className="confirm-btn" onClick={() => navigate('/')}>Sair</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="main-content">
        <div className="top-bar">
          <div className="breadcrumb">
            <span className="dashboard-title">Meu Perfil</span>
          </div>
        </div>
        
        <div className="perfil-page">
          <div className="perfil-card-main">
            <div className="perfil-avatar-section">
              <div className="avatar-large">P</div>
              <h2>Administrador</h2>
              <p className="perfil-role">Administrador do Sistema</p>
            </div>
            
            <div className="perfil-info-section">
              <div className="info-card">
                <h3>Informações Pessoais</h3>
                <div className="info-item">
                  <span className="info-label">Nome:</span>
                  <span className="info-value">Administrador</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">admin@escola.com</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Cargo:</span>
                  <span className="info-value">Administrador</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Desde:</span>
                  <span className="info-value">Janeiro 2023</span>
                </div>
              </div>
              
              <div className="info-card">
                <h3>Configurações</h3>
                <div className="config-actions">
                  <button className="config-btn">Alterar Senha</button>
                  <button className="config-btn">Notificações</button>
                  <button className="config-btn">Tema</button>
                  <button className="config-btn">Preferências</button>
                </div>
              </div>
              
              <div className="info-card">
                <h3>Estatísticas</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-number">1</span>
                    <span className="stat-label">Alunos Cadastrados</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">4</span>
                    <span className="stat-label">Turmas Criadas</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">30</span>
                    <span className="stat-label">Dias Ativo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/cadastrar-aluno" element={<CadastrarAluno />} />
        <Route path="/gerenciamento" element={<Gerenciamento />} />
        <Route path="/criar-turmas" element={<CriarTurmas />} />
        <Route path="/aluno/:ra" element={<PerfilAluno />} />
        <Route path="/editar-aluno/:ra" element={<EditarAluno />} />
        <Route path="/relatorios-admin" element={<RelatoriosAdmin />} />
        <Route path="/dashboard-professor" element={<DashboardProfessor />} />
        <Route path="/minhas-turmas" element={<MinhasTurmas />} />
        <Route path="/ver-alunos-turma/:turmaId" element={<VerAlunosTurma />} />
        <Route path="/chamada-professor" element={<ChamadaProfessor />} />
        <Route path="/relatorios-professor" element={<RelatoriosProfessor />} />
        <Route path="/perfil-aluno-professor/:alunoId" element={<PerfilAlunoProfessor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App