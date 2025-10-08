import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
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
        <h1>Absence Manager</h1>
        <p>Sistema de Gerenciamento de Ausências</p>
        <button className="start-btn" onClick={() => navigate('/login')}>
          Começar
        </button>
      </section>
      
      <section id="sobre" className="page-container">
        <h1>Sobre Nós</h1>
        <p>O Absence Manager é um sistema completo para gerenciamento de ausências.</p>
        <p>Nossa missão é facilitar o controle de faltas e licenças de forma eficiente.</p>
        <p>Desenvolvido com tecnologias modernas para oferecer a melhor experiência.</p>
      </section>
      
      <footer className="rodape" id="contato">
        <div className="rodape-div">
          <div className="rodape-div-1">
            <div className="rodape-div-1-coluna">
              <span><b>LOGO</b></span>
              <p>SIA Trecho 5 lote 000 bloco z sala 900 - Guará, Brasília - DF, 70000-010</p>
            </div>
          </div>
          <div className="rodape-div-2">
            <div className="rodape-div-2-coluna">
              <span><b>Contatos</b></span>
              <p>contato@na.na</p>
              <p>+55 63 99200-0000</p>
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
            <label className="input-label">Nome de usuário ou Email do U</label>
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
          <li><a href="#">Ausências</a></li>
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
            <div className="date-display">{currentTime.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div className="time-display">{currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
          </div>
        </div>
        
        <div className="charts-row">
          <div className="chart-section">
            <h3>Atividades por categoria</h3>
            <div className="pie-chart blue-pie">
              <div className="chart-center">
                <span className="chart-value">1285</span>
              </div>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-dot blue"></span>
                <span>Nenhum</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot orange"></span>
                <span>Arquitetura</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot red"></span>
                <span>Cor</span>
              </div>
            </div>
          </div>
          
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
            <h3>Próximas atividades</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-title">4P15 - Permissão RESTRITO visualização lançamentos fin</span>
                <div className="activity-meta">
                  <span className="assignee">Matheus</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '100%'}}></div>
                  </div>
                  <span className="percentage">100.00 %</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-title">Gestão de Backlog</span>
                <div className="activity-meta">
                  <span className="assignee">Angelica</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '100%'}}></div>
                  </div>
                  <span className="percentage">100.00 %</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-title">Integração com Central telefônica</span>
                <div className="activity-meta">
                  <span className="assignee">Lucas</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '100%'}}></div>
                  </div>
                  <span className="percentage">100.00 %</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bottom-charts">
          <div className="bar-chart-section">
            <h3>Esforço por tipo</h3>
            <div className="bar-chart">
              <div className="chart-bars">
                <div className="bar" style={{height: '80px'}}></div>
                <div className="bar" style={{height: '60px'}}></div>
                <div className="bar" style={{height: '40px'}}></div>
                <div className="bar" style={{height: '30px'}}></div>
                <div className="bar" style={{height: '20px'}}></div>
              </div>
            </div>
          </div>
          
          <div className="bar-chart-section">
            <h3>Esforço por categoria</h3>
            <div className="bar-chart">
              <div className="chart-bars">
                <div className="bar" style={{height: '70px'}}></div>
                <div className="bar" style={{height: '50px'}}></div>
                <div className="bar" style={{height: '35px'}}></div>
                <div className="bar" style={{height: '25px'}}></div>
                <div className="bar" style={{height: '15px'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          <li><a href="#">Ausências</a></li>
          <li><a href="#">Relatórios</a></li>
          <li><a href="#">Configurações</a></li>
        </ul>
      </div>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      <div className="cadastro-content">
        <div className="container">
          <div className="form-image">
            <img src="assets/img/undraw_bookshelves_re_lxoy.svg" alt="" />
          </div>
          <div className="form">
            <form action="#">
              <div className="form-header">
                <div className="title">
                  <h1>Cadastrar aluno</h1>
                </div>
              </div>
              <div className="input-group">
                <div className="input-box">
                  <label htmlFor="firstname">Primeiro nome</label>
                  <input id="firstname" type="text" name="firstname" placeholder="Digite o primeiro nome" required />
                </div>
                <div className="input-box">
                  <label htmlFor="lastname">Sobrenome</label>
                  <input id="lastname" type="text" name="lastname" placeholder="Digite o sobrenome" required />
                </div>
                <div className="input-box">
                  <label htmlFor="email">E-mail</label>
                  <input id="email" type="email" name="email" placeholder="Digite o email" required />
                </div>
                <div className="input-box">
                  <label htmlFor="number">Celular</label>
                  <input id="number" type="tel" name="number" placeholder="(xx) xxxx-xxxx" required />
                </div>
                <div className="input-box">
                  <label htmlFor="password">Senha</label>
                  <input id="password" type="password" name="password" placeholder="Digite a Senha" required />
                </div>
                <div className="input-box">
                  <label htmlFor="confirmPassword">Confirme sua Senha</label>
                  <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Digite a senha novamente" required />
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
      </Routes>
    </BrowserRouter>
  )
}

export default App