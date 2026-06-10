import React from 'react'
import SharedNav from '../common/SharedNav'

const RELATORIOS = [
  { titulo: 'Relatório Geral de Frequência', desc: 'Frequência de todos os alunos da instituição', icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { titulo: 'Relatório por Professor',        desc: 'Desempenho e estatísticas por professor',    icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { titulo: 'Relatório por Turma',            desc: 'Análise detalhada por turma',               icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { titulo: 'Alunos Críticos',               desc: 'Lista de alunos com frequência abaixo de 75%', icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
  { titulo: 'Relatório Mensal',              desc: 'Resumo completo do mês',                    icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { titulo: 'Exportar Dados',                desc: 'Exportar todos os dados em Excel/PDF',       icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> },
]

function RelatoriosAdmin() {
  return (
    <div className="db-root">
      <SharedNav activeItem="relatorios" />
      <main className="db-main">
        <div className="db-page-title">Relatórios <span style={{color:'#4CC9F0'}}>Administrativos</span></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'14px',position:'relative',zIndex:1}}>
          {RELATORIOS.map(r => (
            <div key={r.titulo} className="db-card" style={{padding:'24px',display:'flex',flexDirection:'column',gap:'14px'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'10px',background:'rgba(76,201,240,0.1)',border:'1px solid rgba(76,201,240,0.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <span style={{width:18,height:18,stroke:'#4CC9F0',display:'flex'}}>{r.icon}</span>
              </div>
              <div>
                <div style={{fontSize:'15px',fontWeight:700,color:'#fff',marginBottom:'6px'}}>{r.titulo}</div>
                <div style={{fontSize:'13px',color:'rgba(255,255,255,0.4)',lineHeight:1.5}}>{r.desc}</div>
              </div>
              <button
                style={{marginTop:'auto',width:'100%',background:'rgba(76,201,240,0.1)',border:'1px solid rgba(76,201,240,0.25)',borderRadius:'8px',padding:'10px',color:'#4CC9F0',fontSize:'13px',fontWeight:700,cursor:'pointer',fontFamily:'Plus Jakarta Sans,sans-serif',transition:'all 0.2s'}}
                onMouseOver={e=>{e.currentTarget.style.background='#4CC9F0';e.currentTarget.style.color='#000'}}
                onMouseOut={e=>{e.currentTarget.style.background='rgba(76,201,240,0.1)';e.currentTarget.style.color='#4CC9F0'}}
              >
                {r.titulo === 'Exportar Dados' ? 'Exportar' : 'Gerar Relatório'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default RelatoriosAdmin