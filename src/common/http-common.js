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

  return config;
};

mainInstance.interceptors.request.use(attachCurrentUser);
multipartInstance.interceptors.request.use(attachCurrentUser);


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
