import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const listarPorTurma = (turmaId) => {
  return api.get(`/api/turma-alunos/turma/${turmaId}`);
};

const listarPorAluno = (alunoRm) => {
  return api.get(`/api/turma-alunos/aluno/${alunoRm}`);
};

const vincularAluno = (turmaId, alunoRm) => {
  return api.post("/api/turma-alunos", {
    turma: { id: Number(turmaId) },
    aluno: { rm: Number(alunoRm) },
    status: true,
  });
};

const TurmaAlunoServices = {
  listarPorTurma,
  listarPorAluno,
  vincularAluno,
};

export default TurmaAlunoServices;
