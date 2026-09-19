import http from '../common/http-common'

const validarEmail = (email) =>
  http.mainInstance.get('/api/v1/validacao/email', { params: { email } })

const validarCpf = (cpf) =>
  http.mainInstance.get('/api/v1/validacao/cpf', { params: { cpf } })

const ValidacaoService = {
  validarEmail,
  validarCpf,
}

export default ValidacaoService
