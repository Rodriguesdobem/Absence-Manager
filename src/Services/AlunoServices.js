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

