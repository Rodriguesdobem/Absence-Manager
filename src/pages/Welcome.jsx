import React, { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const heroVideoUrl = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4'

const marqueeItems = [
  'Chamada por QR Code',
  'Controle de Faltas',
  'Gestão de Turmas',
  'Presença em Tempo Real',
  'Relatórios de Frequência',
]

function NavItem({ children, onClick, active, hasChevron }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`am-hero-nav-link${active ? ' is-active' : ''}`}
    >
      {children}
      {hasChevron && <ChevronDown size={15} strokeWidth={2} />}
    </button>
  )
}

function MarqueeItem({ label }) {
  return (
    <div className="am-hero-marquee-item">
      <span className="liquid-glass am-hero-marquee-icon">
        {label.charAt(0)}
      </span>
      <span>{label}</span>
    </div>
  )
}

function Welcome() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const navLinksRef = useRef([])
  const scrollShowcaseRef = useRef(null)
  const [scrollProgress, setScrollProgress] = React.useState(0)

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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    let frame = null
    let restartTimer = null
    let restarting = false
    const fadeDuration = 0.5

    const playVideo = () => {
      const playPromise = video.play()
      if (playPromise?.catch) playPromise.catch(() => {})
    }

    const loop = () => {
      if (!video.duration || Number.isNaN(video.duration)) {
        frame = window.requestAnimationFrame(loop)
        return
      }

      const remaining = video.duration - video.currentTime
      let opacity = 1

      if (video.currentTime < fadeDuration) {
        opacity = video.currentTime / fadeDuration
      } else if (remaining < fadeDuration) {
        opacity = Math.max(0, remaining / fadeDuration)
      }

      video.style.opacity = String(Math.min(1, Math.max(0, opacity)))

      if (!restarting && remaining <= 0.05) {
        restarting = true
        video.pause()
        video.style.opacity = '0'
        restartTimer = window.setTimeout(() => {
          video.currentTime = 0
          restarting = false
          playVideo()
          frame = window.requestAnimationFrame(loop)
        }, 100)
        return
      }

      frame = window.requestAnimationFrame(loop)
    }

    const onReady = () => {
      video.style.opacity = '0'
      playVideo()
      frame = window.requestAnimationFrame(loop)
    }

    video.addEventListener('loadedmetadata', onReady)
    if (video.readyState >= 1) onReady()

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      if (restartTimer) window.clearTimeout(restartTimer)
      video.removeEventListener('loadedmetadata', onReady)
    }
  }, [])

  useEffect(() => {
    let frame = null

    const updateScrollProgress = () => {
      const el = scrollShowcaseRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1
      const raw = (viewportHeight - rect.top) / (viewportHeight + rect.height)
      const next = Math.min(1, Math.max(0, raw))
      setScrollProgress(next)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        updateScrollProgress()
        frame = null
      })
    }

    updateScrollProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const cardRotate = 20 - scrollProgress * 20
  const cardScale = 1.06 - scrollProgress * 0.06
  const titleTranslate = -100 * scrollProgress
  const cardTranslate = -26 * scrollProgress

  return (
    <main className="wh-site">
      <section id="wh-hero" className="am-hero">
        <video
          ref={videoRef}
          className="am-hero-video"
          src={heroVideoUrl}
          muted
          playsInline
          preload="auto"
        />

        <nav className="am-hero-nav">
          <div className="am-hero-nav-row">
            <button
              type="button"
              onClick={() => scrollToSection('wh-hero', 0)}
              className="hero-reset-button am-hero-brand"
              aria-label="Voltar ao inicio"
            >
              <img
                src="/ABS.png"
                alt="ABS"
                className="liquid-glass am-hero-brand-mark am-hero-brand-image"
              />
              <span className="am-hero-brand-text">Absence Manager</span>
            </button>

            <div className="am-hero-nav-links">
              <NavItem active onClick={() => scrollToSection('wh-hero', 0)}>Início</NavItem>
              <NavItem onClick={() => scrollToSection('wh-features', 1)}>Funcionalidades</NavItem>
              <NavItem onClick={() => scrollToSection('wh-sobre', 2)}>Sobre</NavItem>
              <NavItem onClick={() => scrollToSection('wh-contato', 3)}>Contato</NavItem>
            </div>

            <button
              type="button"
              className="hero-reset-button hero-secondary am-hero-access"
              onClick={() => navigate('/login')}
            >
              <span className="am-hero-access-full">Acessar Sistema</span>
              <span className="am-hero-access-short">Entrar</span>
            </button>
          </div>
          <div className="am-hero-nav-line" />
        </nav>

        <div className="am-hero-center">
          <div className="am-hero-blur" />
          <div className="am-hero-content">
            <h1 className="am-hero-title">
              <span>Absence</span>{' '}
              <span className="am-hero-title-accent">
                Manager
              </span>
            </h1>
            <p className="am-hero-subtitle">
              Controle suas turmas, chamadas e presenças de forma simples, rápida e inteligente.
            </p>
            <button
              type="button"
              className="hero-reset-button hero-secondary am-hero-cta"
              onClick={() => navigate('/login')}
            >
              Acessar o Sistema
            </button>
          </div>
        </div>

        <div className="am-hero-marquee-wrap">
          <div className="am-hero-marquee-inner">
            <div className="am-hero-marquee-label">
              Feito para escolas<br />
              professores e alunos
            </div>
            <div className="am-hero-marquee-viewport">
              <div className="am-hero-marquee-track">
                {[...marqueeItems, ...marqueeItems].map((item, index) => (
                  <MarqueeItem key={`${item}-${index}`} label={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCROLL ANIMATION */}
      <section
        className="wh-scroll-showcase"
        ref={scrollShowcaseRef}
        style={{
          '--wh-scroll-rotate': `${cardRotate}deg`,
          '--wh-scroll-scale': cardScale,
          '--wh-scroll-title-y': `${titleTranslate}px`,
          '--wh-scroll-card-y': `${cardTranslate}px`,
        }}
      >
        <div className="wh-scroll-stage">
          <div className="wh-scroll-title">
            <div className="wh-section-label">Experiencia visual</div>
            <h2>
              Acompanhe a chamada<br />
              <span>em tempo real</span>
            </h2>
          </div>

          <div className="wh-scroll-device" aria-label="Previa animada do painel de chamadas">
            <div className="wh-device-topbar">
              <div className="wh-device-dot"></div>
              <div className="wh-device-dot"></div>
              <div className="wh-device-dot"></div>
              <span>Absence Manager</span>
            </div>
            <div className="wh-device-screen">
              <div className="wh-device-sidebar">
                <div className="wh-device-logo"></div>
                <div className="wh-device-nav-line active"></div>
                <div className="wh-device-nav-line"></div>
                <div className="wh-device-nav-line short"></div>
              </div>
              <div className="wh-device-content">
                <div className="wh-device-header">
                  <div>
                    <span>Turma Violao</span>
                    <strong>Chamada ativa</strong>
                  </div>
                  <button type="button">Atualizar</button>
                </div>
                <div className="wh-device-metrics">
                  <div><strong>18</strong><span>Presentes</span></div>
                  <div><strong>04</strong><span>Faltas</span></div>
                  <div><strong>82%</strong><span>Frequencia</span></div>
                </div>
                <div className="wh-device-table">
                  {[
                    ['Guilherme Castro', 'PRESENTE'],
                    ['Ana Beatriz', 'PRESENTE'],
                    ['Lucas Pereira', 'FALTA'],
                    ['Marina Souza', 'PRESENTE'],
                  ].map(([nome, status]) => (
                    <div className="wh-device-row" key={nome}>
                      <span>{nome}</span>
                      <strong className={status === 'PRESENTE' ? 'ok' : 'miss'}>{status}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
    </main>
  )
}

export default Welcome
