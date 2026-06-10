import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SharedNav from "../../common/SharedNav";
import AlunoServices from "../../Services/AlunoServices";
import TurmaAlunoServices from "../../Services/TurmaAlunoServices";

function getAxiosErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data ||
    error?.message ||
    "Erro ao processar requisição."
  );
}

function getFotoSrc(aluno) {
  const foto = aluno?.usuario?.foto || aluno?.usuario?.fotoBase64 || aluno?.foto;
  if (!foto) return "";
  if (String(foto).startsWith("data:")) return foto;
  return `data:image/jpeg;base64,${foto}`;
}

export default function AlunoPerfilIntegrado() {
  const navigate = useNavigate();
  const { ra } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [aluno, setAluno] = useState(null);
  const [turmasAluno, setTurmasAluno] = useState([]);

  const parsedRa = Number(ra);

  useEffect(() => {
    const fetchAluno = async () => {
      setLoading(true);
      setError("");
      setAluno(null);
      setTurmasAluno([]);

      try {
        const [alunoResponse, turmasResponse] = await Promise.all([
          AlunoServices.buscarAlunoPorRm(parsedRa),
          TurmaAlunoServices.listarPorAluno(parsedRa),
        ]);
        setAluno(alunoResponse.data);
        setTurmasAluno(turmasResponse.data || []);
      } catch (e) {
        setError(getAxiosErrorMessage(e));
      } finally {
        setLoading(false);
      }
    };

    fetchAluno();
  }, [parsedRa]);

  const freq = useMemo(() => {
    // O backend que você mostrou não retorna campos de frequência.
    // Mantemos a lógica apenas se vierem campos como totalAulas/faltas.
    const totalAulas = aluno?.totalAulas;
    const faltas = aluno?.faltas;

    if (!totalAulas || !Number.isFinite(totalAulas) || !Number.isFinite(Number(faltas))) return null;
    return parseFloat(((totalAulas - faltas) / totalAulas * 100).toFixed(1));
  }, [aluno]);

  const freqColor = freq == null ? "#4CC9F0" : freq >= 75 ? "#4ade80" : "#f25f5c";
  const fotoSrc = getFotoSrc(aluno);
  const turmasAtivas = turmasAluno.filter(vinculo => vinculo.status !== false);
  const turmaTexto = turmasAtivas.length
    ? turmasAtivas.map(vinculo => vinculo.turma?.nome).filter(Boolean).join(", ")
    : "Turma não informada";

  return (
    <div className="db-root">
      <SharedNav activeItem="ver-turmas" />

      <main className="db-main">
        <div className="db-page-title">Perfil do <span style={{ color: "#4CC9F0" }}>Aluno</span></div>

        <button
          onClick={() => navigate('/ver-turmas')}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(76,201,240,0.1)",
            border: "1px solid rgba(76,201,240,0.25)",
            borderRadius: "8px",
            padding: "8px 16px",
            color: "#4CC9F0",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
            marginBottom: "24px",
            fontFamily: "Plus Jakarta Sans,sans-serif",
            transition: "all 0.2s",
            position: "relative",
            zIndex: 1,
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "rgba(76,201,240,0.2)")}
          onMouseOut={(e) => (e.currentTarget.style.background = "rgba(76,201,240,0.1)")}
        >
          ← Voltar
        </button>

        {loading ? (
          <div className="db-card" style={{ padding: "24px 28px" }}>
            <div className="db-card-section-title" style={{ marginBottom: 0 }}>
              Carregando aluno...
            </div>
          </div>
        ) : error ? (
          <div className="db-card" style={{ padding: "24px 28px" }}>
            <div className="db-card-section-title">Erro</div>
            <p style={{ color: "#f25f5c", fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>
              {String(error)}
            </p>
          </div>
        ) : !aluno ? (
          <div className="db-card" style={{ padding: "24px 28px" }}>
            <div className="db-card-section-title">Aluno não encontrado.</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "16px", position: "relative", zIndex: 1 }}>
            <div className="db-card" style={{ padding: "28px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "rgba(76,201,240,0.12)",
                  border: "2px solid rgba(76,201,240,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  fontWeight: 800,
                  color: "#4CC9F0",
                  overflow: "hidden",
                }}
              >
                {fotoSrc ? (
                  <img
                    src={fotoSrc}
                    alt={aluno?.nome || "Foto do aluno"}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  (aluno?.nome || "?").charAt(0)
                )}
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "#fff", letterSpacing: "-0.4px", marginBottom: "4px" }}>
                  {aluno?.nome || "Nome não informado"}
                </div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                  {turmaTexto}
                </div>
              </div>

              <div style={{ width: "100%", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>R.A.</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>{aluno?.rm ?? parsedRa}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>Email</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>
                    {(() => {
                      const u = aluno?.usuario;
                      const email = u?.username ?? u?.email;
                      return email && String(email).trim() ? email : "Não informado";
                    })()}
                  </span>

                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>Data de nascimento</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>
                    {aluno?.dataNascimento ? String(aluno.dataNascimento).slice(0, 10) : "Não informada"}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>Telefone</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>{aluno?.telefone || "Não informado"}</span>
                </div>

              </div>

              <button
                onClick={() => navigate(`/editar-aluno/${aluno?.rm ?? parsedRa}`)}
                style={{
                  width: "100%",
                  background: "rgba(76,201,240,0.1)",
                  border: "1px solid rgba(76,201,240,0.25)",
                  borderRadius: "8px",
                  padding: "10px",
                  color: "#4CC9F0",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "Plus Jakarta Sans,sans-serif",
                  transition: "all 0.2s",
                  marginTop: "4px",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#4CC9F0";
                  e.currentTarget.style.color = "#000";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(76,201,240,0.1)";
                  e.currentTarget.style.color = "#4CC9F0";
                }}
              >
                Editar Aluno
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className="db-card" style={{ padding: "24px" }}>
                <div className="db-card-section-title" style={{ marginBottom: "20px" }}>
                  Turmas
                </div>

                {turmasAtivas.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {turmasAtivas.map(vinculo => (
                      <div
                        key={vinculo.id}
                        style={{
                          background: "rgba(76,201,240,0.08)",
                          border: "1px solid rgba(76,201,240,0.18)",
                          borderRadius: "10px",
                          padding: "14px 16px",
                        }}
                      >
                        <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>
                          {vinculo.turma?.nome || "Turma sem nome"}
                        </div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
                          {[vinculo.turma?.instrumento, vinculo.turma?.periodo, vinculo.turma?.ano]
                            .filter(Boolean)
                            .join(" - ") || "Detalhes não informados"}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.5 }}>
                    Este aluno ainda não está vinculado a uma turma.
                  </div>
                )}
              </div>

              <div className="db-card" style={{ padding: "24px" }}>
                <div className="db-card-section-title" style={{ marginBottom: "20px" }}>
                  Frequência
                </div>

                {freq == null ? (
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.5 }}>
                    O backend ainda não retorna dados suficientes de frequência para este aluno.
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "10px" }}>
                      <span style={{ fontSize: "40px", fontWeight: 800, color: freqColor, letterSpacing: "-1px", lineHeight: 1 }}>{freq}%</span>
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginBottom: "6px" }}>
                        {freq >= 75 ? "Regular" : "Crítico — abaixo de 75%"}
                      </span>
                    </div>
                    <div style={{ height: "8px", background: "rgba(255,255,255,0.07)", borderRadius: "4px", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "8px",
                          width: `${freq}%`,
                          background: freqColor,
                          borderRadius: "4px",
                          transition: "width 0.4s",
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>
                      <span>0%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
