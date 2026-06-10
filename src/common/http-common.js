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