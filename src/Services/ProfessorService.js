import http from '../common/http-common'

const listarTurmas = () => http.mainInstance.get('/professor/turmas')

const buscarTurma = (turmaId) => http.mainInstance.get(`/professor/turmas/${turmaId}`)

const listarAlunos = (turmaId) => http.mainInstance.get(`/professor/turmas/${turmaId}/alunos`)

const dashboard = () => http.mainInstance.get('/professor/dashboard')

const relatorios = () => http.mainInstance.get('/professor/relatorios')

const relatorioTurma = (turmaId) => http.mainInstance.get(`/professor/turmas/${turmaId}/relatorio`)

const criarChamada = (turmaId) => http.mainInstance.post(`/professor/turmas/${turmaId}/chamadas`)

const listarChamadas = (turmaId) => http.mainInstance.get(`/professor/turmas/${turmaId}/chamadas`)

const buscarChamada = (chamadaId) => http.mainInstance.get(`/professor/chamadas/${chamadaId}`)

const encerrarChamada = (chamadaId) => http.mainInstance.put(`/professor/chamadas/${chamadaId}/encerrar`)

const atualizarPresenca = (chamadaId, alunoRm, status) =>
  http.mainInstance.put(`/professor/chamadas/${chamadaId}/alunos/${alunoRm}`, { status })

const reabrirChamada = (chamadaId) => http.mainInstance.put(`/professor/chamadas/${chamadaId}/reabrir`)

const ProfessorService = {
  listarTurmas,
  buscarTurma,
  listarAlunos,
  dashboard,
  relatorios,
  relatorioTurma,
  criarChamada,
  listarChamadas,
  buscarChamada,
  encerrarChamada,
  atualizarPresenca,
  reabrirChamada,
}

export default ProfessorService
