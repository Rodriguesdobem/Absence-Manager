import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlunoServices from "../../Services/AlunoServices";
import UsuarioService from "../../Services/UsuarioService";
import SharedNav from "../../common/SharedNav";



function normalizeDateInput(value) {
  // input type="date" exige exatamente "YYYY-MM-DD"
  if (!value) return "";
  if (typeof value === "string") {
    if (value.length >= 10) return value.slice(0, 10);
    return value;
  }
  return String(value).slice(0, 10);
}



function getAxiosErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data ||
    error?.message ||
    "Erro ao processar requisição."
  );
}

function AlunoEditar() {
  const navigate = useNavigate();
  const { rm } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alunoAtual, setAlunoAtual] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    data_nascimento: "",
    sexo: "",
    cpf: "",
    telefone: "",
    status_aluno: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const fetchAluno = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await AlunoServices.buscarAlunoPorRm(rm);
      const aluno = response.data || {};
      setAlunoAtual(aluno);

      setForm({
        nome: aluno.nome ?? "",
        email: aluno.email ?? "",
        data_nascimento: normalizeDateInput(aluno.dataNascimento ?? aluno.data_nascimento ?? ""),
        sexo: aluno.sexo ?? "",
        cpf: aluno.cpf ?? "",
        telefone: aluno.telefone ?? "",
        status_aluno: aluno.status_aluno ?? aluno.statusAluno ?? "",
      });
    } catch (err) {
      setError(getAxiosErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!rm) {
      setError("RM inválido.");
      setLoading(false);
      return;
    }
    fetchAluno();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rm]);

  const [fotoFile, setFotoFile] = useState(null);
  const [fotoPreviewUrl, setFotoPreviewUrl] = useState("");

  useEffect(() => {
    if (!fotoFile) {
      setFotoPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(fotoFile);
    setFotoPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [fotoFile]);

  const getFotoSrc = (aluno) => {
    const foto = aluno?.usuario?.foto || aluno?.usuario?.fotoBase64 || aluno?.foto;
    if (!foto) return "";
    if (String(foto).startsWith("data:")) return foto;
    return `data:image/jpeg;base64,${foto}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const payload = {
        ...alunoAtual,
        nome: form.nome,
        email: form.email,
        dataNascimento: form.data_nascimento,
        sexo: form.sexo,
        cpf: form.cpf,
        telefone: form.telefone,
        statusAluno: form.status_aluno,
        usuario: alunoAtual?.usuario,
      };

      await AlunoServices.atualizarAluno(rm, payload);

      // Se o usuário selecionou uma nova foto, envia junto via endpoint do Usuario (multipart)
      if (fotoFile && alunoAtual?.usuario?.id) {
        const fd = new FormData();
        fd.append("file", fotoFile);

        // mantém os campos de usuario caso seu backend exija RequestPart("usuario")
        // (se seu backend não exigir, isso não prejudica)
        fd.append(
          "usuario",
          new Blob([
            JSON.stringify({
              id: alunoAtual.usuario.id,
              nome: form.nome || alunoAtual.usuario.nome,
              username: alunoAtual.usuario.username,
              nivelAcesso: alunoAtual.usuario.nivelAcesso || "ALUNO",
              statusUsuario: alunoAtual.usuario.statusUsuario || "ATIVO",
            })
          ], { type: "application/json" })
        );

        await UsuarioService.update(alunoAtual.usuario.id, fd);
      }

      navigate(`/aluno/${rm}`);
    } catch (err) {
      setError(getAxiosErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="db-root">
        <SharedNav activeItem="ver-turmas" />
        <main className="db-main">
          <div className="db-page-title">
            Editar <span style={{ color: "#4CC9F0" }}>Aluno</span>
          </div>
          <div className="db-card" style={{ padding: "24px 28px" }}>
            <div className="db-card-section-title" style={{ marginBottom: 0 }}>
              Carregando aluno...
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="db-root">
        <SharedNav activeItem="ver-turmas" />
        <main className="db-main">
          <div className="db-page-title">
            Editar <span style={{ color: "#4CC9F0" }}>Aluno</span>
          </div>
          <div className="db-card" style={{ padding: "24px 28px" }}>
            <div className="db-card-section-title">Erro</div>
            <p style={{ color: "#f25f5c", fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>
              {String(error)}
            </p>
            <button
              onClick={() => navigate('/ver-turmas')}
              style={{
                marginTop: 16,
                background: "rgba(76,201,240,0.1)",
                border: "1px solid rgba(76,201,240,0.25)",
                borderRadius: "8px",
                padding: "10px 16px",
                color: "#4CC9F0",
                fontSize: 13,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "Plus Jakarta Sans,sans-serif",
              }}
            >
              Voltar para turmas
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="db-root">
      <SharedNav activeItem="ver-turmas" />

      <main className="db-main">
        <div className="db-page-title">
          Editar <span style={{ color: "#4CC9F0" }}>Aluno</span>
        </div>

        <button
          onClick={() => navigate(`/aluno/${rm}`)}
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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "16px", position: "relative", zIndex: 1, alignItems: "start" }}>

          <div className="db-card" style={{ padding: "32px" }}>
            <form onSubmit={handleSubmit}>
              <div style={{ gridColumn: "1 / -1", marginBottom: 14 }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                  Foto do Aluno (opcional)
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(76,201,240,0.12)", border: "2px solid rgba(76,201,240,0.35)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {fotoPreviewUrl ? (
                      <img src={fotoPreviewUrl} alt="Prévia da foto" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: 30, fontWeight: 800, color: "#4CC9F0" }}>
                        {(form.nome || "Aluno").charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <input
                      id="foto-input-editar"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        setFotoFile(file || null);
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('foto-input-editar');
                        if (el) el.click();
                      }}
                      style={{
                        width: "fit-content",
                        background: "rgba(76,201,240,0.1)",
                        border: "1px solid rgba(76,201,240,0.35)",
                        borderRadius: 10,
                        padding: "10px 14px",
                        color: "#4CC9F0",
                        fontSize: 13,
                        fontWeight: 900,
                        cursor: "pointer",
                        fontFamily: "Plus Jakarta Sans,sans-serif",
                        transition: "all 0.2s",
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
                      {fotoFile ? "Foto selecionada ✓" : "Selecionar foto"}
                    </button>

                    {fotoPreviewUrl && (
                      <button
                        type="button"
                        onClick={() => setFotoFile(null)}
                        style={{
                          width: "fit-content",
                          background: "rgba(76,201,240,0.1)",
                          border: "1px solid rgba(76,201,240,0.35)",
                          borderRadius: 10,
                          padding: "10px 14px",
                          color: "#4CC9F0",
                          fontSize: 13,
                          fontWeight: 900,
                          cursor: "pointer",
                          fontFamily: "Plus Jakarta Sans,sans-serif",
                          transition: "all 0.2s",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = "rgba(242,95,92,0.12)";
                          e.currentTarget.style.border = "1px solid rgba(242,95,92,0.25)";
                          e.currentTarget.style.color = "#f25f5c";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = "rgba(76,201,240,0.1)";
                          e.currentTarget.style.border = "1px solid rgba(76,201,240,0.35)";
                          e.currentTarget.style.color = "#4CC9F0";
                        }}
                      >
                        Remover foto
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div style={sectionStyle}>
                <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" style={{ width: 12, height: 12 }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Dados do Aluno
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Nome</label>
                  <input name="nome" type="text" value={form.nome} onChange={handleChange} style={inputStyle} required />
                </div>

                <div>
                  <label style={labelStyle}>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} required />
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
                </div>

                <div>
                  <label style={labelStyle}>Telefone</label>
                  <input name="telefone" type="text" value={form.telefone} onChange={handleChange} style={inputStyle} required />
                </div>



                <div>
                  <label style={labelStyle}>Status do Aluno</label>
                  <select
                    name="status_aluno"
                    value={form.status_aluno}
                    onChange={(e) => {
                      const nextStatus = e.target.value;
                      setForm((p) => ({ ...p, status_aluno: nextStatus }));
                    }}
                    style={inputStyle}
                    required
                  >
                    <option value="ATIVO">ATIVO</option>
                    <option value="INATIVO">INATIVO</option>
                  </select>
                </div>

              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#4CC9F0",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 28px",
                  color: "#000",
                  fontSize: "14px",
                  fontWeight: 800,
                  cursor: "pointer",
                  fontFamily: "Plus Jakarta Sans,sans-serif",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#fff")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#4CC9F0")}
              >
                Salvar Alterações
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

export default AlunoEditar;
