import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UsuarioService from '../Services/UsuarioService'

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
          <li><Link to="/cadastrar-usuario">Cadastrar Usuário</Link></li>
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

export default EditarAluno
