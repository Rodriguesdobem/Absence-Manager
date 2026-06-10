import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlunoServices from "../../Services/AlunoServices";
import TurmaServices from "../../Services/TurmaServices";
import TurmaAlunoServices from "../../Services/TurmaAlunoServices";
import SharedNav from "../../common/SharedNav";

function getAxiosErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data ||
    error?.message ||
    "Erro ao processar requisição."
  );
}

function AlunoCadastrar() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingTurmas, setLoadingTurmas] = useState(false);
  const [turmas, setTurmas] = useState([]);
  const [cpfAviso, setCpfAviso] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nome: "",
    data_nascimento: "",
    sexo: "",
    cpf: "",
    telefone: "",
    usuario_id: "",
    turma_id: "",
    status_aluno: "ATIVO",
  });

  useEffect(() => {
    const carregarTurmas = async () => {
      setLoadingTurmas(true);
      try {
        const response = await TurmaServices.listarTurmas();
        setTurmas(response.data || []);
      } catch (err) {
        setError(getAxiosErrorMessage(err));
      } finally {
        setLoadingTurmas(false);
      }
    };

    carregarTurmas();
  }, []);

  const isCpfOk = useMemo(() => {
    const cpf = String(form.cpf || "").trim();
    return cpf.length === 0 ? true : cpf.length >= 11;
  }, [form.cpf]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));

    if (name === "cpf") {
      const cpf = String(value || "").trim();
      if (cpf && cpf.length < 11) setCpfAviso("CPF deve ter pelo menos 11 caracteres.");
      else setCpfAviso("");
    }
  };

  const validate = () => {
    const required = [
      "nome",
      "data_nascimento",
      "sexo",
      "cpf",
      "telefone",
      "usuario_id",
      "turma_id",
      "status_aluno",
    ];
    for (const key of required) {
      if (!String(form[key] ?? "").trim()) {
        setError("Preencha todos os campos obrigatórios.");
        return false;
      }
    }

    if (!isCpfOk) {
      setError("CPF inválido: deve ter pelo menos 11 caracteres.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    try {
      setLoading(true);

      // rm não vem no cadastro; backend pode ignorar.
      const alunoPayload = {
        nome: form.nome,
        dataNascimento: form.data_nascimento,
        sexo: form.sexo,
        cpf: form.cpf,
        telefone: form.telefone,
        usuario: { id: Number(form.usuario_id) },
        statusAluno: form.status_aluno,
      };

      const response = await AlunoServices.cadastrarAluno(alunoPayload);
      await TurmaAlunoServices.vincularAluno(form.turma_id, response.data.rm);
      navigate("/alunos");
    } catch (err) {
      setError(getAxiosErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "#111118",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    padding: "11px 14px",
    fontSize: "14px",
    color: "#fff",
    fontFamily: "Plus Jakarta Sans,sans-serif",
    outline: "none",
    transition: "border 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontSize: "11px",
    fontWeight: 700,
    color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    display: "block",
    marginBottom: "6px",
  };

  const sectionStyle = {
    fontSize: "10px",
    fontWeight: 800,
    color: "#4CC9F0",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: "12px",
    marginTop: "4px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  return (
    <div className="db-root">
      <SharedNav activeItem="alunos" />

      <main className="db-main">
        <div className="db-page-title">
          Cadastrar <span style={{ color: "#4CC9F0" }}>Aluno</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "16px", position: "relative", zIndex: 1, alignItems: "start" }}>
          <div className="db-card" style={{ padding: "32px" }}>
            <form onSubmit={handleSubmit}>
              <div style={sectionStyle}>
                <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 12, height: 12 }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Dados do Aluno
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div>
                  <label style={labelStyle}>Nome</label>
                  <input name="nome" type="text" value={form.nome} onChange={handleChange} style={inputStyle} required />
                </div>

                <div>
                  <label style={labelStyle}>Data de Nascimento</label>
                  <input name="data_nascimento" type="date" value={form.data_nascimento} onChange={handleChange} style={inputStyle} required />
                </div>

                <div>
                  <label style={labelStyle}>Sexo</label>
                  <input name="sexo" type="text" value={form.sexo} onChange={handleChange} style={inputStyle} required />
                </div>

                <div>
                  <label style={labelStyle}>CPF</label>
                  <input name="cpf" type="text" value={form.cpf} onChange={handleChange} style={inputStyle} required />
                  {cpfAviso ? <p style={{ color: "#f25f5c", fontSize: 12, marginTop: 8 }}>{cpfAviso}</p> : null}
                </div>

                <div>
                  <label style={labelStyle}>Telefone</label>
                  <input name="telefone" type="text" value={form.telefone} onChange={handleChange} style={inputStyle} required />
                </div>

                <div>
                  <label style={labelStyle}>Usuário ID</label>
                  <input name="usuario_id" type="number" value={form.usuario_id} onChange={handleChange} style={inputStyle} required />
                </div>

                <div>
                  <label style={labelStyle}>Turma</label>
                  <select name="turma_id" value={form.turma_id} onChange={handleChange} style={inputStyle} required>
                    <option value="">{loadingTurmas ? "Carregando turmas..." : "Selecione a turma"}</option>
                    {turmas.map((turma) => (
                      <option key={turma.id} value={turma.id} disabled={Number(turma.vagas || 0) <= 0}>
                        {turma.nome} - {Number(turma.vagas || 0) <= 0 ? "Lotada" : `${turma.vagas} vaga(s)`}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Status do Aluno</label>
                  <input name="status_aluno" type="text" value={form.status_aluno} onChange={handleChange} style={inputStyle} required />
                </div>
              </div>

              {error ? (
                <div style={{ background: "rgba(242,95,92,0.08)", border: "1px solid rgba(242,95,92,0.25)", borderRadius: 12, padding: 14, marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#f25f5c", marginBottom: 6 }}>Erro</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>{error}</div>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  background: "#4CC9F0",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 28px",
                  color: "#000",
                  fontSize: "14px",
                  fontWeight: 800,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "Plus Jakarta Sans,sans-serif",
                  transition: "all 0.2s",
                  opacity: loading ? 0.8 : 1,
                }}
                onMouseOver={(e) => {
                  if (!loading) e.currentTarget.style.background = "#fff";
                }}
                onMouseOut={(e) => {
                  if (!loading) e.currentTarget.style.background = "#4CC9F0";
                }}
              >
                {loading ? "Cadastrando..." : "Cadastrar"}
              </button>
            </form>
          </div>

          <div className="db-card" style={{ padding: "28px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={{ fontSize: "10px", fontWeight: 800, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px", alignSelf: "flex-start" }}>
              Prévia do Perfil
            </div>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(76,201,240,0.12)", border: "2px solid rgba(76,201,240,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", fontWeight: 800, color: "#4CC9F0" }}>
              {(form.nome || "Aluno").charAt(0).toUpperCase()}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "18px", fontWeight: 800, color: "#fff", letterSpacing: "-0.4px", marginBottom: "4px" }}>
                {form.nome || "Nome do Aluno"}
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>{form.sexo || "Sexo"}</div>
            </div>
            <span style={{ fontSize: "12px", fontWeight: 700, padding: "4px 14px", borderRadius: "999px", background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80" }}>
              {form.status_aluno || "Status"}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AlunoCadastrar;
