import UsuarioService from './UsuarioService'

// Preferências e notificações são pessoais e não têm campo correspondente
// no backend hoje; guardamos por usuário no localStorage (mesmo mecanismo
// já usado pelo tema). Os valores abaixo são os padrões quando o usuário
// nunca configurou nada ainda.
const PADRAO_NOTIFICACOES = {
  notificarPresencaConfirmada: true,
}

const PADRAO_PREFERENCIAS = {
  confirmarAntesDeEncerrarChamada: true,
}

const chaveUsuario = (prefixo) => {
  const user = UsuarioService.getCurrentUser()
  return `absence-manager:${prefixo}:${user?.id ?? 'anonimo'}`
}

const ler = (chave, padrao) => {
  try {
    const salvo = JSON.parse(localStorage.getItem(chave) || '{}')
    return { ...padrao, ...salvo }
  } catch (err) {
    return { ...padrao }
  }
}

const salvar = (chave, valores) => {
  localStorage.setItem(chave, JSON.stringify(valores))
  window.dispatchEvent(new Event('absence-manager:preferencias-updated'))
}

const obterNotificacoes = () => ler(chaveUsuario('notificacoes'), PADRAO_NOTIFICACOES)

const salvarNotificacoes = (valores) => salvar(chaveUsuario('notificacoes'), { ...obterNotificacoes(), ...valores })

const obterPreferencias = () => ler(chaveUsuario('preferencias'), PADRAO_PREFERENCIAS)

const salvarPreferencias = (valores) => salvar(chaveUsuario('preferencias'), { ...obterPreferencias(), ...valores })

const PreferenciasService = {
  obterNotificacoes,
  salvarNotificacoes,
  obterPreferencias,
  salvarPreferencias,
}

export default PreferenciasService
