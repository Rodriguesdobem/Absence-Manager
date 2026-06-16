import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const criarChamada = (turmaId) => {
  return api.post(`/api/turmas/${turmaId}/chamadas`);
};

const buscarChamada = (turmaId, chamadaId) => {
  return api.get(`/api/turmas/${turmaId}/chamadas/${chamadaId}`);
};

const listarRecentes = (turmaId) => {
  return api.get(`/api/turmas/${turmaId}/chamadas`);
};

const confirmarChamada = (turmaId, chamadaId) => {
  return api.post(`/api/turmas/${turmaId}/chamadas/${chamadaId}/confirmar`);
};

const confirmarPresenca = (token, email) => {
  return api.post("/api/chamadas/confirmar-presenca", { token, email });
};

const gerarQrCodeUrl = (texto) => {
  return `${API_BASE_URL}/qrcode/gerar-texto?texto=${encodeURIComponent(texto)}`;
};

const ChamadaServices = {
  criarChamada,
  buscarChamada,
  listarRecentes,
  confirmarChamada,
  confirmarPresenca,
  gerarQrCodeUrl,
};

export default ChamadaServices;
