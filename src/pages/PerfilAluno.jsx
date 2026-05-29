import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UsuarioService from '../Services/UsuarioService'

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

export default PerfilAluno
