import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
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
