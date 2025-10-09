import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import './dashboard.css'

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
            <input type="text" className="input-field" required />
            <label className="input-label">Nome de usuário ou Email do Usuário</label>
          </div>
          <div className="input-group">
            <input type="password" className="input-field" required />
            <label className="input-label">Senha</label>
          </div>
          <button className="login-btn" onClick={() => navigate('/dashboard')}>Entrar</button>
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
        <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
          Sair
        </button>
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
          <li><a href="#">Relatórios</a></li>
          <li><a href="#">Configurações</a></li>
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
            <div className="welcome-title">Bem-Vindo de volta, Admin!</div>
            <div className="account-name">Admin</div>
          </div>
          <div className="datetime-card">
            <div className="clock-icon">🕐</div>
            <div className="date-display">{currentTime.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div className="time-display">{currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</div>
          </div>
        </div>
        
        <div className="charts-row">
          <div className="chart-section">
            <h3>Atividades por tipo</h3>
            <div className="pie-chart mixed-pie">
              <div className="chart-center">
                <span className="chart-value">793</span>
              </div>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-dot blue"></span>
                <span>01 - Sub-reação de Melhoria</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot orange"></span>
                <span>04</span>
              </div>
            </div>
          </div>
          
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
        <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
          Sair
        </button>
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
          <li><a href="#">Relatórios</a></li>
          <li><a href="#">Configurações</a></li>
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
                          <button className="action-btn view">👁️</button>
                          <button className="action-btn edit">✏️</button>
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
  const porcentagemFaltas = ((aluno.faltas / aluno.totalAulas) * 100).toFixed(1)
  
  if (!aluno) {
    return <div>Aluno não encontrado</div>
  }
  
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Perfil do Aluno</div>
        <button className="logout-btn" onClick={() => navigate('/gerenciamento')}>
          Voltar
        </button>
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
          <li><a href="#">Relatórios</a></li>
          <li><a href="#">Configurações</a></li>
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
        <button className="logout-btn" onClick={() => navigate('/')}>
          Sair
        </button>
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
          <li><a href="#">Relatórios</a></li>
          <li><a href="#">Configurações</a></li>
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
                <button><a href="#">Criar Turma</a></button>
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
  
  return (
    <div className="cadastro-page">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Cadastrar Aluno</div>
        <button className="logout-btn" onClick={() => navigate('/')}>
          Sair
        </button>
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
          <li><a href="#">Relatórios</a></li>
          <li><a href="#">Configurações</a></li>
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
                <button><a href="#">Continuar</a></button>
              </div>
            </form>
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
        <Route path="/cadastrar-aluno" element={<CadastrarAluno />} />
        <Route path="/gerenciamento" element={<Gerenciamento />} />
        <Route path="/criar-turmas" element={<CriarTurmas />} />
        <Route path="/aluno/:ra" element={<PerfilAluno />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App