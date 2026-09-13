import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import AlunoServices from '../../Services/AlunoServices'
import UsuarioService from '../../Services/UsuarioService'

export default function AlunoHome() {
  const [state, setState] = useState({ loading: true, rm: null, error: '' })

  useEffect(() => {
    const user = UsuarioService.getCurrentUser()
    const knownRm = user?.rm || user?.alunoRm || user?.aluno?.rm
    if (knownRm) {
      setState({ loading: false, rm: knownRm, error: '' })
      return
    }

    AlunoServices.listarAlunos()
      .then(({ data }) => {
        const aluno = (data || []).find(item =>
          String(item?.usuario?.id) === String(user?.id) ||
          String(item?.usuario?.username || '').toLowerCase() === String(user?.username || '').toLowerCase()
        )
        if (!aluno?.rm) throw new Error('Não foi possível localizar o cadastro de aluno desta conta.')

        UsuarioService.setCurrentUser({ ...user, alunoRm: aluno.rm })
        setState({ loading: false, rm: aluno.rm, error: '' })
      })
      .catch(error => setState({ loading: false, rm: null, error: error?.response?.data?.message || error.message }))
  }, [])

  if (state.rm) return <Navigate to={`/aluno/${state.rm}`} replace />

  return (
    <main className="db-root" style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 24 }}>
      <div className="db-card" style={{ padding: 28, maxWidth: 520 }}>
        <div className="db-card-section-title">{state.loading ? 'Carregando sua área...' : 'Não foi possível abrir sua área'}</div>
        {!state.loading && <p style={{ color: '#f25f5c', fontSize: 13 }}>{state.error}</p>}
      </div>
    </main>
  )
}
