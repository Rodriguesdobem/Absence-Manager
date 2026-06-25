import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SharedNav from '../../common/SharedNav'
import ProfessorService from '../../Services/ProfessorService'

function getErrorMessage(error) {
  return error?.response?.data?.message || error?.message || 'Erro ao carregar turma.'
}

function ProfessorTurmaDetalhes() {
  const navigate = useNavigate()
  const { turmaId } = useParams()
  const [turma, setTurma] = useState(null)
  const [alunos, setAlunos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const carregar = async () => {
      setLoading(true)
      setError('')
      try {
        const [turmaRes, alunosRes] = await Promise.all([
          ProfessorService.buscarTurma(turmaId),
          ProfessorService.listarAlunos(turmaId),
        ])
        setTurma(turmaRes.data)
        setAlunos(alunosRes.data || [])
      } catch (err) {
        setError(getErrorMessage(err))
        setTurma(null)
        setAlunos([])
      } finally {
        setLoading(false)
      }
    }
    carregar()
  }, [turmaId])

  return (
    <div className="db-root">
      <SharedNav activeItem="prof-turmas" />
      <main className="db-main">
        {loading ? (
          <div className="db-card" style={{ padding: 24 }}>Carregando turma...</div>
        ) : error || !turma ? (
          <div className="db-card" style={{ padding: 24, color: '#f25f5c' }}>{error || 'Turma nao encontrada.'}</div>
        ) : (
          <>
            <div className="db-page-title">{turma.nome} - <span style={{ color: '#4CC9F0' }}>Detalhes</span></div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20, position: 'relative', zIndex: 1 }}>
              <button onClick={() => navigate('/professor/turmas')} style={buttonSecondary}>Voltar</button>
              <button onClick={() => navigate(`/professor/turmas/${turma.id}/chamada`)} style={buttonPrimary}>Gerar Chamada</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 14, marginBottom: 20, position: 'relative', zIndex: 1 }}>
              {[
                ['Instrumento', turma.instrumento || '-'],
                ['Periodo', turma.periodo || '-'],
                ['Ano', turma.ano || '-'],
                ['Alunos', alunos.length],
                ['Status', turma.statusTurma || '-'],
              ].map(([label, value]) => (
                <div key={label} className="db-card" style={{ padding: '18px 20px' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#4CC9F0', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{value}</div>
                </div>
              ))}
            </div>

            <div className="db-card" style={{ overflow: 'auto', position: 'relative', zIndex: 1 }}>
              <div className="db-card-section-title" style={{ padding: '20px 24px 0' }}>Alunos da turma</div>
              {alunos.length > 0 ? (
                <table style={{ width: '100%', minWidth: 680, borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>{['RM', 'Nome', 'Email', 'Telefone', 'Status'].map(h => <th key={h} style={th}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {alunos.map(vinculo => {
                      const aluno = vinculo.aluno || {}
                      const status = aluno.statusAluno || (vinculo.status ? 'ATIVO' : 'INATIVO')
                      return (
                        <tr key={vinculo.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={td}>{aluno.rm}</td>
                          <td style={{ ...td, color: '#fff', fontWeight: 800 }}>{aluno.nome}</td>
                          <td style={td}>{aluno.email || '-'}</td>
                          <td style={td}>{aluno.telefone || '-'}</td>
                          <td style={{ ...td, color: status === 'ATIVO' ? '#4ade80' : '#f25f5c', fontWeight: 900 }}>{status}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="db-updates-empty" style={{ padding: 48 }}>Nenhum aluno vinculado.</div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

const buttonPrimary = { borderRadius: 8, border: '1px solid #4CC9F0', background: '#4CC9F0', color: '#050509', padding: '10px 14px', fontWeight: 800, cursor: 'pointer' }
const buttonSecondary = { borderRadius: 8, border: '1px solid rgba(76,201,240,0.25)', background: 'rgba(76,201,240,0.1)', color: '#4CC9F0', padding: '10px 14px', fontWeight: 800, cursor: 'pointer' }
const th = { padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 800, color: '#4CC9F0', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.07)' }
const td = { padding: '12px 16px', fontSize: 13, color: 'rgba(255,255,255,0.62)' }

export default ProfessorTurmaDetalhes
