import http from '../common/http-common'

const geral = () => http.mainInstance.get('/api/relatorios/geral')

const listarTurmas = () => http.mainInstance.get('/api/relatorios/turmas')

const turma = (turmaId) => http.mainInstance.get(`/api/relatorios/turmas/${turmaId}`)

const listarProfessores = () => http.mainInstance.get('/api/relatorios/professores')

const alunosCriticos = (limite) =>
  http.mainInstance.get('/api/relatorios/alunos-criticos', { params: limite ? { limite } : {} })

const RelatorioService = {
  geral,
  listarTurmas,
  turma,
  listarProfessores,
  alunosCriticos,
}

export default RelatorioService
