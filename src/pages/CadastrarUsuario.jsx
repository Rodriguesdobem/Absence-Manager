import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UsuarioService from '../Services/UsuarioService'
import SharedNav from '../common/SharedNav'

function CadastrarUsuario() {
  const navigate = useNavigate()
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    try {
      await UsuarioService.cadastrar({
        nome: `${formData.get('firstname')} ${formData.get('lastname')}`,
        email: formData.get('email'),
        nivelAcesso: formData.get('nivelAcesso'),
        senha: formData.get('senha'),
        dataNascimento: formData.get('dataNascimento')
      })
      setMessage({ type: 'success', text: 'Usuário cadastrado com sucesso!' })
      setShowMessage(true)
      setTimeout(() => {
        navigate('/gerenciamento')
      }, 2000)
    } catch (error) {
      console.error('Erro completo:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido'
      setMessage({ type: 'error', text: `Erro ao cadastrar usuário: ${errorMessage}` })
      setShowMessage(true)
    }
  }
  
  return (
    <div className="db-root">
      <SharedNav activeItem="cadastrar" />
      
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
            <img src="" alt="" />
          </div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="form-header">
                <div className="title">
                  <h1>Cadastrar Usuário</h1>
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
                  <label htmlFor="senha">Senha</label>
                  <input id="senha" type="password" name="senha" className="input-field" placeholder="Digite a senha" required />
                </div>
                <div className="input-box">
                  <label htmlFor="dataNascimento">Data de Nascimento</label>
                  <input id="dataNascimento" type="date" name="dataNascimento" className="input-field" required />
                </div>
                <div className="input-box">
                  <label htmlFor="nivelAcesso">Nível de Acesso</label>
                  <select id="nivelAcesso" name="nivelAcesso" className="input-field" required>
                    <option value="" disabled selected>Selecione o nível</option>
                    <option value="PROFESSOR">Professor</option>
                    <option value="ALUNO">Aluno</option>
                  </select>
                </div>
              </div>
              <div className="continue-button">
                <button type="submit">Cadastrar Usuário</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CadastrarUsuario
