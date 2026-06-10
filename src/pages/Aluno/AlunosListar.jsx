import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlunoServices from "../../Services/AlunoServices";
import SharedNav from "../../common/SharedNav";

function getAxiosErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data ||
    error?.message ||
    "Erro ao processar requisição."
  );
}

function AlunosListar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [alunos, setAlunos] = useState([]);
  const [error, setError] = useState("");

  const fetchAlunos = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await AlunoServices.listarAlunos();
      setAlunos(response.data || []);
    } catch (e) {
      setError(getAxiosErrorMessage(e));
      setAlunos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusAluno = useMemo(() => {
    // sem regras específicas; renderiza a string diretamente
    return (value) => value ?? "";
  }, []);

  const handleInativar = async (rm) => {
    const ok = window.confirm("Tem certeza que deseja inativar este aluno?");
    if (!ok) return;

    try {
      await AlunoServices.inativarAluno(rm);
      await fetchAlunos();
    } catch (e) {
      setError(getAxiosErrorMessage(e));
    }
  };

  return (
    <div className="db-root">
      <SharedNav activeItem="alunos" />

      <main className="db-main">
        <div className="db-page-title">
          Alunos — <span style={{ color: "#4CC9F0" }}>Lista</span>
        </div>

        <button
          onClick={() => navigate("/alunos/novo")}
          style={{
            background: "#4CC9F0",
            border: "none",
            borderRadius: "8px",
            padding: "10px 18px",
            color: "#000",
            fontSize: "13px",
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "Plus Jakarta Sans,sans-serif",
            marginBottom: "18px",
            position: "relative",
            zIndex: 1,
          }}
        >
          Novo Aluno
        </button>

        {loading ? (
          <div className="db-card" style={{ padding: "24px 28px" }}>
            <div className="db-card-section-title" style={{ marginBottom: 0 }}>
              <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                <path d="M12 2v4" />
                <path d="M12 18v4" />
                <path d="M4.93 4.93l2.83 2.83" />
                <path d="M16.24 16.24l2.83 2.83" />
                <path d="M2 12h4" />
                <path d="M18 12h4" />
                <path d="M4.93 19.07l2.83-2.83" />
                <path d="M16.24 7.76l2.83-2.83" />
              </svg>
              Carregando alunos...
            </div>
          </div>
        ) : error ? (
          <div className="db-card" style={{ padding: "24px 28px" }}>
            <div className="db-card-section-title">Erro</div>
            <p style={{ color: "#f25f5c", fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>
              {String(error)}
            </p>
          </div>
        ) : alunos.length === 0 ? (
          <div className="db-card db-updates-empty" style={{ padding: "48px" }}>
            <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" style={{ width: 40, height: 40, stroke: "rgba(255,255,255,0.12)" }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>Nenhum aluno cadastrado.</span>
          </div>
        ) : (
          <div className="db-card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Plus Jakarta Sans,sans-serif" }}>
                <thead>
                  <tr>
                    {[
                      "rm",
                      "nome",
                      "dataNascimento",
                      "sexo",
                      "cpf",
                      "telefone",
                      "usuarioId",
                      "statusAluno",
                      "Ações",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#4CC9F0",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          borderBottom: "1px solid rgba(255,255,255,0.07)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {alunos.map((a) => (
                    <tr key={a.rm} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap" }}>
                        {a.rm}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 600, minWidth: 220 }}>
                        {a.nome}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                        {a.dataNascimento || ""}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                        {a.sexo || ""}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                        {a.cpf || ""}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                        {a.telefone || ""}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                        {a.usuario?.id || ""}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                        {statusAluno(a.statusAluno)}
                      </td>
                      <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <button
                            onClick={() => navigate(`/alunos/editar/${a.rm}`)}
                            style={{
                              background: "rgba(76,201,240,0.1)",
                              border: "1px solid rgba(76,201,240,0.25)",
                              borderRadius: "6px",
                              padding: "6px 14px",
                              color: "#4CC9F0",
                              fontSize: "12px",
                              fontWeight: 700,
                              cursor: "pointer",
                              fontFamily: "Plus Jakarta Sans,sans-serif",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.background = "rgba(76,201,240,0.2)")}
                            onMouseOut={(e) => (e.currentTarget.style.background = "rgba(76,201,240,0.1)")}
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => handleInativar(a.rm)}
                            style={{
                              background: "rgba(242,95,92,0.08)",
                              border: "1px solid rgba(242,95,92,0.25)",
                              borderRadius: "6px",
                              padding: "6px 14px",
                              color: "#f25f5c",
                              fontSize: "12px",
                              fontWeight: 700,
                              cursor: "pointer",
                              fontFamily: "Plus Jakarta Sans,sans-serif",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.background = "rgba(242,95,92,0.14)")}
                            onMouseOut={(e) => (e.currentTarget.style.background = "rgba(242,95,92,0.08)")}
                          >
                            Inativar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AlunosListar;
