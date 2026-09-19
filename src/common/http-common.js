import axios from "axios";

//const API_URL =  "https://projeto.com.br/"; //remote(produção)
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"; //local(desenvolvimento)


const mainInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json"
  }
});

const multipartInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    // Deixe o axios/browser setar Content-Type com boundary.
    // Não envie Content-Type fixo.
  },
  transformRequest: [
    (data, headers) => {
      // garante que o body chegue como FormData (multipart)
      return data
    },
  ],
});

const attachCurrentUser = (config) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.username) {
      config.headers = config.headers || {};
      config.headers["X-Current-Username"] = user.username;
    }
  } catch (err) {
    // Sem usuario salvo ou JSON invalido: segue apenas com a sessao/cookie.
  }

  // Canal alternativo de sessao: quando o cookie de sessao nao sobrevive
  // entre dominios diferentes (frontend e backend hospedados separadamente),
  // o token recebido no login garante que o usuario continue autenticado.
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

mainInstance.interceptors.request.use(attachCurrentUser);
multipartInstance.interceptors.request.use(attachCurrentUser);

// Se o backend responder 401, as credenciais guardadas localmente (usuario
// e token) nao servem mais - limpa tudo e manda para o login em vez de
// deixar a aplicacao presa num estado "meio logado" que nunca funciona.
const handleAuthError = (error) => {
  if (error?.response?.status === 401) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }
  return Promise.reject(error);
};

mainInstance.interceptors.response.use((response) => response, handleAuthError);
multipartInstance.interceptors.response.use((response) => response, handleAuthError);


const apiCep = axios.create( {
  baseURL: `https://viacep.com.br/ws/`,
  headers: {
    "Content-type": "application/json"
  }
});


const httpCommom = {
  mainInstance,
  multipartInstance,
  apiCep,
};



export default httpCommom;
