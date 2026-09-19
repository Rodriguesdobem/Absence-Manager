import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Canal alternativo de sessao para quando o cookie nao sobrevive entre
// dominios diferentes (frontend e backend hospedados separadamente).
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Se o backend responder 401, as credenciais guardadas localmente nao
// servem mais - limpa tudo e manda para o login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

const listarAlunos = () => {
  return api.get("/api/v1/aluno");
};

const buscarAlunoPorRm = (rm) => {
  return api.get(`/api/v1/aluno/${rm}`);
};

const buscarFrequenciaPorRm = (rm) => {
  return api.get(`/api/v1/aluno/${rm}/frequencia`);
};

const cadastrarAluno = (aluno) => {
  return api.post("/api/v1/aluno", aluno);
};

const atualizarAluno = (rm, aluno) => {
  return api.put(`/api/v1/aluno/${rm}`, aluno);
};

const excluirAluno = (rm) => {
  return api.delete(`/api/v1/aluno/${rm}`);
};

const inativarAluno = (rm) => {
  return api.put(`/api/v1/aluno/${rm}/inativar`);
};

const AlunoServices = {
  listarAlunos,
  buscarAlunoPorRm,
  buscarFrequenciaPorRm,
  cadastrarAluno,
  atualizarAluno,
  excluirAluno,
  inativarAluno,
};


export default AlunoServices;

