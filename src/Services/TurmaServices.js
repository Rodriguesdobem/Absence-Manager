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

const listarTurmas = () => {
  return api.get("/api/turmas");
};

const buscarTurmaPorId = (id) => {
  return api.get(`/api/turmas/${id}`);
};

const criarTurma = (turma) => {
  return api.post("/api/turmas", turma);
};

const atualizarTurma = (id, turma) => {
  return api.put(`/api/turmas/${id}`, turma);
};

const excluirTurma = (id) => {
  return api.delete(`/api/turmas/${id}`);
};

const designarProfessor = (turmaId, professorId) => {
  return api.put(`/api/turmas/${turmaId}/professor/${professorId}`);
};

const TurmaServices = {
  listarTurmas,
  buscarTurmaPorId,
  criarTurma,
  atualizarTurma,
  excluirTurma,
  designarProfessor,
};

export default TurmaServices;
