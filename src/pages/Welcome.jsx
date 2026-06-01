import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function Welcome() {
  const navigate = useNavigate()
  const navLinksRef = useRef([])

  const scrollToSection = (id, idx) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    navLinksRef.current.forEach(a => a && a.classList.remove('wh-active'))
    if (navLinksRef.current[idx]) navLinksRef.current[idx].classList.add('wh-active')
  }

  useEffect(() => {
    const ids = ['wh-hero', 'wh-features', 'wh-sobre', 'wh-contato']
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = ids.indexOf(e.target.id)
          navLinksRef.current.forEach(a => a && a.classList.remove('wh-active'))
          if (navLinksRef.current[idx]) navLinksRef.current[idx].classList.add('wh-active')
        }
      })
    }, { threshold: 0.4 })
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="wh-site">
      {/* NAVBAR */}
      <nav className="wh-nav">
        <div className="wh-nav-logo">
          <div className="wh-nav-logo-icon">
            <svg viewBox="0 0 20 20"><path d="M3 4h14v2H3zm0 5h10v2H3zm0 5h14v2H3z"/></svg>
          </div>
          <span className="wh-nav-logo-text">Absence Manager</span>
        </div>
        <div className="wh-nav-links">
          <a ref={el => navLinksRef.current[0] = el} className="wh-active" onClick={() => scrollToSection('wh-hero', 0)}>Home</a>
          <a ref={el => navLinksRef.current[1] = el} onClick={() => scrollToSection('wh-features', 1)}>Funcionalidades</a>
          <a ref={el => navLinksRef.current[2] = el} onClick={() => scrollToSection('wh-sobre', 2)}>Sobre</a>
          <a ref={el => navLinksRef.current[3] = el} onClick={() => scrollToSection('wh-contato', 3)}>Contato</a>
        </div>
        <button className="wh-nav-btn" onClick={() => navigate('/login')}>Entrar</button>
      </nav>

      {/* HERO */}
      <section id="wh-hero" className="wh-hero">
        <div className="wh-hero-bg-circle wh-hero-bg-c1"></div>
        <div className="wh-hero-bg-circle wh-hero-bg-c2"></div>
        <div className="wh-hero-bg-circle wh-hero-bg-c3"></div>
        <div className="wh-hero-grid-line wh-hgl-v" style={{left:'20%'}}></div>
        <div className="wh-hero-grid-line wh-hgl-v" style={{left:'40%'}}></div>
        <div className="wh-hero-grid-line wh-hgl-v" style={{left:'60%'}}></div>
        <div className="wh-hero-grid-line wh-hgl-v" style={{left:'80%'}}></div>
        <div className="wh-hero-grid-line wh-hgl-h" style={{top:'33%'}}></div>
        <div className="wh-hero-grid-line wh-hgl-h" style={{top:'66%'}}></div>
        <div className="wh-hero-content">
          <div className="wh-hero-tag">
            <div className="wh-hero-tag-dot"></div>
            <span>Escola de Música · TCC 2025</span>
          </div>
          <h1>Controle total<br/>sobre as <span className="wh-hl">ausências</span></h1>
          <p className="wh-hero-sub">Gerencie faltas, presenças e alertas de forma inteligente. Desenvolvido especialmente para escolas de música.</p>
          <div className="wh-hero-btns">
            <button className="wh-btn-primary" onClick={() => scrollToSection('wh-features', 1)}>Ver funcionalidades</button>
            <button className="wh-btn-secondary" onClick={() => scrollToSection('wh-sobre', 2)}>Saiba mais</button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="wh-features" className="wh-features">
        <div className="wh-section-label">Funcionalidades</div>
        <div className="wh-section-title">Tudo que sua escola precisa</div>
        <p className="wh-section-sub">Do registro de chamada ao relatório final — tudo em um só lugar.</p>
        <div className="wh-features-grid">
          <div className="wh-feat-card">
            <div className="wh-feat-icon wh-cyan">📋</div>
            <h3>Chamada digital</h3>
            <p>Registre presenças e faltas por turma com um clique, em tempo real.</p>
            <div className="wh-feat-accent"></div>
          </div>
          <div className="wh-feat-card">
            <div className="wh-feat-icon wh-indigo">🔔</div>
            <h3>Alertas automáticos</h3>
            <p>Notificações ao responsável quando o aluno atingir 25% de faltas.</p>
            <div className="wh-feat-accent wh-ind"></div>
          </div>
          <div className="wh-feat-card">
            <div className="wh-feat-icon wh-cyan">📊</div>
            <h3>Relatórios detalhados</h3>
            <p>Dashboards com métricas por aluno, turma e instrumento.</p>
            <div className="wh-feat-accent"></div>
          </div>
          <div className="wh-feat-card">
            <div className="wh-feat-icon wh-white">📱</div>
            <h3>App mobile</h3>
            <p>React Native com Expo Go — funciona direto no celular, sem instalação.</p>
            <div className="wh-feat-accent wh-ind"></div>
          </div>
          <div className="wh-feat-card">
            <div className="wh-feat-icon wh-indigo">🔒</div>
            <h3>Controle de acesso</h3>
            <p>Perfis distintos: Admin, Professor e Responsável com permissões granulares.</p>
            <div className="wh-feat-accent wh-ind"></div>
          </div>
          <div className="wh-feat-card">
            <div className="wh-feat-icon wh-cyan">⬇️</div>
            <h3>Exportação de dados</h3>
            <p>Baixe relatórios em PDF ou CSV para uso externo com um clique.</p>
            <div className="wh-feat-accent"></div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="wh-sobre" className="wh-sobre">
        <div className="wh-sobre-inner">
          <div className="wh-sobre-left">
            <div className="wh-sobre-label">Sobre o projeto</div>
            <h2>Desenvolvido para <span>escolas de música</span></h2>
            <p>O Absence Manager é uma solução inovadora criada como TCC do curso de Informática, com foco em resolver um problema real: o controle de faltas em escolas de música.</p>
            <p>A plataforma integra web, mobile e API para oferecer uma experiência completa para gestores, professores e responsáveis.</p>
            <div className="wh-sobre-badge-row">
              <span className="wh-sobre-badge">ReactJS + Vite</span>
              <span className="wh-sobre-badge">Spring Boot</span>
              <span className="wh-sobre-badge">React Native</span>
              <span className="wh-sobre-badge">SQL Server</span>
            </div>
          </div>
          <div className="wh-sobre-right">
            <div className="wh-step-card">
              <div className="wh-step-num wh-c">01</div>
              <div><h4>Gestão inteligente</h4><p>Sistema automatizado que simplifica o controle de ausências com alertas e notificações.</p></div>
            </div>
            <div className="wh-step-card">
              <div className="wh-step-num">02</div>
              <div><h4>Relatórios avançados</h4><p>Dashboards interativos com métricas para tomada de decisões estratégicas.</p></div>
            </div>
            <div className="wh-step-card">
              <div className="wh-step-num">03</div>
              <div><h4>Segurança total</h4><p>Criptografia e controle de acesso por níveis de permissão em todas as camadas.</p></div>
            </div>
            <div className="wh-step-card">
              <div className="wh-step-num wh-c">04</div>
              <div><h4>Offline first</h4><p>O app mobile funciona sem internet e sincroniza ao reconectar automaticamente.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="wh-contato" className="wh-contato">
        <div className="wh-contato-inner">
          <div className="wh-section-label">Contato</div>
          <h2>Fale com a <span>equipe</span></h2>
          <p>Dúvidas, sugestões ou quer saber mais sobre o projeto? Entre em contato.</p>
          <div className="wh-contact-form">
            <div className="wh-form-row">
              <div className="wh-form-field"><label>Nome</label><input type="text" placeholder="Seu nome completo" /></div>
              <div className="wh-form-field"><label>E-mail</label><input type="email" placeholder="seu@email.com" /></div>
            </div>
            <div className="wh-form-field">
              <label>Assunto</label>
              <select><option>Dúvida sobre o sistema</option><option>Parceria</option><option>Feedback</option><option>Outro</option></select>
            </div>
            <div className="wh-form-field"><label>Mensagem</label><textarea placeholder="Descreva sua mensagem..."></textarea></div>
            <button className="wh-form-submit">Enviar mensagem</button>
          </div>
          <div className="wh-contact-info">
            <div className="wh-c-info-item"><div className="wh-c-info-dot"></div><span>ausenciamanager@escola.com</span></div>
            <div className="wh-c-info-item"><div className="wh-c-info-dot"></div><span>https://github.com/Rodriguesdobem</span></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="wh-footer">
        <div className="wh-footer-logo">Absence<span>Manager</span></div>
        <div className="wh-footer-links">
          <a onClick={() => scrollToSection('wh-hero', 0)}>Home</a>
          <a onClick={() => scrollToSection('wh-features', 1)}>Funcionalidades</a>
          <a onClick={() => scrollToSection('wh-sobre', 2)}>Sobre</a>
          <a onClick={() => scrollToSection('wh-contato', 3)}>Contato</a>
        </div>
        <div className="wh-footer-copy">TCC — Informática 3º Ano · 2025</div>
      </footer>
    </div>
  )
}

export default Welcome
