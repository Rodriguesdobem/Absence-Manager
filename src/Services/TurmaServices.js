import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
