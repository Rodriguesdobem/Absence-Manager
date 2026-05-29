import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UsuarioService from '../Services/UsuarioService'

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
          <li><Link to="/cadastrar-usuario">Cadastrar Usuário</Link></li>
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

export default CriarTurmas
