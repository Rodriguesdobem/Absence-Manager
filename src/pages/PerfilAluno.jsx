import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SharedNav from '../common/SharedNav'
import { TURMAS_DATA } from '../common/turmasData'

// Unifica alunos de todas as turmas
const getAllAlunos = () => {
  const alunos = []
  Object.values(TURMAS_DATA).forEach(turma => {
    turma.alunos.forEach(aluno => {
      alunos.push({ ...aluno, turma: turma.nome, ativo: true })
    })
  })
  return alunos
}

function PerfilAluno() {
  const navigate = useNavigate()
  const { ra } = useParams()
  const ALUNOS = getAllAlunos()
  const aluno = ALUNOS.find(a => a.ra === parseInt(ra))

  if (!aluno) {
    return (
      <div className="db-root">
        <SharedNav />
        <main className="db-main"><p style={{color:'#fff'}}>Aluno não encontrado.</p></main>
      </div>
    )
  }

  const freq = parseFloat(((aluno.totalAulas - aluno.faltas) / aluno.totalAulas * 100).toFixed(1))
  const freqColor = freq >= 75 ? '#4ade80' : '#f25f5c'

  const infoStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }
  const labelStyle = { fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }
  const valueStyle = { fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }

  return (
    <div className="db-root">
      <SharedNav activeItem="ver-turmas" />

      <main className="db-main">
        <div className="db-page-title">Perfil do <span style={{color:'#4CC9F0'}}>Aluno</span></div>

        <button
          onClick={() => navigate(-1)}
          style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(76,201,240,0.1)',border:'1px solid rgba(76,201,240,0.25)',borderRadius:'8px',padding:'8px 16px',color:'#4CC9F0',fontSize:'13px',fontWeight:700,cursor:'pointer',marginBottom:'24px',fontFamily:'Plus Jakarta Sans,sans-serif',transition:'all 0.2s',position:'relative',zIndex:1}}
          onMouseOver={e=>e.currentTarget.style.background='rgba(76,201,240,0.2)'}
          onMouseOut={e=>e.currentTarget.style.background='rgba(76,201,240,0.1)'}
        >← Voltar</button>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:'16px',position:'relative',zIndex:1}}>

          {/* Card esquerdo — avatar + info */}
          <div className="db-card" style={{padding:'28px',display:'flex',flexDirection:'column',alignItems:'center',gap:'16px'}}>
            <div style={{width:'80px',height:'80px',borderRadius:'50%',background:'rgba(76,201,240,0.12)',border:'2px solid rgba(76,201,240,0.35)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'30px',fontWeight:800,color:'#4CC9F0'}}>
              {aluno.nome.charAt(0)}
            </div>
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:'20px',fontWeight:800,color:'#fff',letterSpacing:'-0.4px',marginBottom:'4px'}}>{aluno.nome}</div>
              <div style={{fontSize:'13px',color:'rgba(255,255,255,0.4)'}}>{aluno.turma}</div>
            </div>
            <span style={{fontSize:'12px',fontWeight:700,padding:'4px 14px',borderRadius:'999px',background: aluno.ativo ? 'rgba(74,222,128,0.12)' : 'rgba(242,95,92,0.12)',border:`1px solid ${aluno.ativo ? 'rgba(74,222,128,0.3)' : 'rgba(242,95,92,0.3)'}`,color: aluno.ativo ? '#4ade80' : '#f25f5c'}}>
              {aluno.ativo ? 'Ativo' : 'Inativo'}
            </span>
            <div style={{width:'100%',borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'16px',display:'flex',flexDirection:'column',gap:'0'}}>
              <div style={infoStyle}><span style={labelStyle}>R.A.</span><span style={valueStyle}>{aluno.ra}</span></div>
              <div style={infoStyle}><span style={labelStyle}>Email</span><span style={valueStyle}>{aluno.email || 'Não informado'}</span></div>
              <div style={{...infoStyle,borderBottom:'none'}}><span style={labelStyle}>Telefone</span><span style={valueStyle}>{aluno.telefone || 'Não informado'}</span></div>
            </div>
            <button
              onClick={() => navigate(`/editar-aluno/${aluno.ra}`)}
              style={{width:'100%',background:'rgba(76,201,240,0.1)',border:'1px solid rgba(76,201,240,0.25)',borderRadius:'8px',padding:'10px',color:'#4CC9F0',fontSize:'13px',fontWeight:700,cursor:'pointer',fontFamily:'Plus Jakarta Sans,sans-serif',transition:'all 0.2s',marginTop:'4px'}}
              onMouseOver={e=>{e.currentTarget.style.background='#4CC9F0';e.currentTarget.style.color='#000'}}
              onMouseOut={e=>{e.currentTarget.style.background='rgba(76,201,240,0.1)';e.currentTarget.style.color='#4CC9F0'}}
            >Editar Aluno</button>
          </div>

          {/* Card direito — frequência */}
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>

            {/* Stats */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px'}}>
              {[
                {label:'Total de Aulas', value: aluno.totalAulas, color:'#fff'},
                {label:'Faltas',         value: aluno.faltas,     color:'#f25f5c'},
                {label:'Presenças',      value: aluno.totalAulas - aluno.faltas, color:'#4ade80'},
              ].map(s => (
                <div key={s.label} className="db-card" style={{padding:'16px',textAlign:'center'}}>
                  <div style={{fontSize:'28px',fontWeight:800,color:s.color,letterSpacing:'-1px',lineHeight:1}}>{s.value}</div>
                  <div style={{fontSize:'11px',fontWeight:700,color:'rgba(255,255,255,0.3)',textTransform:'uppercase',letterSpacing:'0.06em',marginTop:'6px'}}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Frequência */}
            <div className="db-card" style={{padding:'24px'}}>
              <div className="db-card-section-title" style={{marginBottom:'20px'}}>
                <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{width:14,height:14}}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                Frequência
              </div>
              <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'10px'}}>
                <span style={{fontSize:'40px',fontWeight:800,color:freqColor,letterSpacing:'-1px',lineHeight:1}}>{freq}%</span>
                <span style={{fontSize:'12px',color:'rgba(255,255,255,0.3)',marginBottom:'6px'}}>{freq >= 75 ? 'Regular' : 'Crítico — abaixo de 75%'}</span>
              </div>
              <div style={{height:'8px',background:'rgba(255,255,255,0.07)',borderRadius:'4px',overflow:'hidden'}}>
                <div style={{height:'8px',width:`${freq}%`,background:freqColor,borderRadius:'4px',transition:'width 0.4s'}} />
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:'8px',fontSize:'11px',color:'rgba(255,255,255,0.25)'}}>
                <span>0%</span><span>75%</span><span>100%</span>
              </div>
            </div>

            {/* Alerta */}
            {freq < 75 && (
              <div style={{background:'rgba(242,95,92,0.08)',border:'1px solid rgba(242,95,92,0.25)',borderRadius:'12px',padding:'16px 20px',display:'flex',alignItems:'center',gap:'12px'}}>
                <svg viewBox="0 0 24 24" strokeWidth="2" stroke="#f25f5c" fill="none" style={{width:20,height:20,flexShrink:0}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span style={{fontSize:'13px',color:'#f25f5c',fontWeight:600}}>Atenção: frequência abaixo do limite mínimo de 75%.</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default PerfilAluno
