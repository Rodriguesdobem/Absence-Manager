import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'

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
            <label className="input-label">Nome de usuário</label>
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
  
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-brand">Absence Manager</div>
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
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <p>Bem-vindo ao sistema de gerenciamento de ausências!</p>
        <div className="dashboard-cards">
          <div className="card">
            <h3>Cadastrar Aluno</h3>
            <p>Adicionar novo aluno ao sistema</p>
            <button className="card-btn" onClick={() => navigate('/cadastrar-aluno')}>Acessar</button>
          </div>
          <div className="card">
            <h3>Ausências</h3>
            <p>Gerenciar ausências</p>
            <button className="card-btn">Acessar</button>
          </div>
          <div className="card">
            <h3>Relatórios</h3>
            <p>Visualizar relatórios</p>
            <button className="card-btn">Acessar</button>
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
        <div className="cadastro-form">
          <h1>Cadastrar Novo Aluno</h1>
          <p className="form-subtitle">Preencha os dados abaixo para adicionar um novo aluno ao sistema</p>
          <div className="form-layout">
            <div className="form-row">
              <div className="input-group">
                <input type="text" className="input-field" required />
                <label className="input-label">Nome</label>
              </div>
              <div className="input-group">
                <input type="text" className="input-field" required />
                <label className="input-label">Sobrenome</label>
              </div>
            </div>
            <div className="input-group full-width">
              <input 
                type="text" 
                className="input-field" 
                placeholder="" 
                onFocus={(e) => e.target.placeholder = 'DD/MM/AAAA'}
                onBlur={(e) => e.target.placeholder = ''}
                required 
              />
              <label className="input-label">Data de Nascimento</label>
            </div>
            <div className="input-group full-width">
              <input type="email" className="input-field" required />
              <label className="input-label">E-mail</label>
            </div>
          </div>
          <button className="cadastro-btn">Cadastrar Aluno</button>
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