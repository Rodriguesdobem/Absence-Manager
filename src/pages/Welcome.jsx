import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UsuarioService from '../Services/UsuarioService'

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

export default Welcome
