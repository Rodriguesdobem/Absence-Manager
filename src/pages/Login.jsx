import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #378ADD;
    --surface: #111118;
    --border: #1e1e2e;
    --border-focus: #5b5bd6;
    --accent: #5b5bd6;
    --accent-glow: rgba(91, 91, 214, 0.35);
    --accent-hover: #7272e0;
    --error: #f25f5c;
    --error-bg: rgba(242, 95, 92, 0.08);
    --text: #e8e8f0;
    --text-muted: #6b6b8a;
    --text-label: #a0a0c0;
    --success: #4ade80;
    --radius: 12px;
  }

  html, body, #root {
    height: 100%;
    font-family: 'Syne', sans-serif;
    background: var(--bg);
    color: var(--text);
  }

  .page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .bg-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(91,91,214,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(91,91,214,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .bg-glow {
    position: fixed;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(ellipse at center, rgba(91,91,214,0.12) 0%, transparent 65%);
    pointer-events: none;
  }

  .card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 420px;
    margin: 24px;
    background: #ffffff;
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 48px 40px;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03);
    animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 36px;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, var(--accent), #9090f0);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 800;
    color: white;
    letter-spacing: -1px;
    box-shadow: 0 4px 16px var(--accent-glow);
  }

  .logo-name {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.3px;
    color: var(--text);
  }

  .heading {
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.8px;
    color: #333333;
    margin-bottom: 6px;
    line-height: 1.2;
  }

  .subheading {
    font-size: 14px;
    color: #666666;
    font-family: 'DM Mono', monospace;
    font-weight: 300;
    margin-bottom: 36px;
  }

  .field {
    margin-bottom: 18px;
  }

  .label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: #333333;
    margin-bottom: 8px;
    font-family: 'DM Mono', monospace;
  }

  .input-wrap {
    position: relative;
  }

  .input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #666666;
    display: flex;
    align-items: center;
    pointer-events: none;
    transition: color 0.2s;
  }

  .input {
    width: 100%;
    background: #f5f5f5;
    border: 1.5px solid rgba(255,255,255,0.45);
    border-radius: 12px;
    padding: 13px 14px 13px 42px;
    font-size: 14px;
    font-family: 'DM Mono', monospace;
    color: #333333;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    letter-spacing: 0.2px;
    backdrop-filter: blur(6px);
  }

  .input::placeholder { color: #999999; }

  .input:focus {
    border-color: var(--border-focus);
    box-shadow: 0 0 0 0.3rem rgba(91, 91, 214, 0.18);
    background: #ffffff;
  }

  .input:focus + .focus-ring { opacity: 1; }

  .input.error {
    border-color: var(--error);
    box-shadow: 0 0 0 3px var(--error-bg);
    background: rgba(242, 95, 92, 0.14);
  }

  .input:focus ~ .input-icon,
  .input-wrap:focus-within .input-icon {
    color: #333333;
  }

  .eye-btn {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #666666;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 4px;
    border-radius: 6px;
    transition: color 0.2s;
  }
  .eye-btn:hover { color: #333333; }

  .error-msg {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--error);
    margin-top: 7px;
    font-family: 'DM Mono', monospace;
    animation: shake 0.3s ease both;
  }

  @keyframes shake {
    0%,100% { transform: translateX(0); }
    25%      { transform: translateX(-4px); }
    75%      { transform: translateX(4px); }
  }

  .forgot {
    text-align: right;
    margin-top: 6px;
  }
  .forgot a {
    font-size: 12px;
    color: #666666;
    text-decoration: none;
    font-family: 'DM Mono', monospace;
    transition: color 0.2s;
  }
  .forgot a:hover { color: #333333; }

  .btn {
    width: 100%;
    margin-top: 28px;
    padding: 14px;
    background: #378ADD;
    color: #ffffff;
    border: none;
    border-radius: var(--radius);
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.2px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s, border-color 0.2s;
    box-shadow: 0 4px 20px rgba(55, 138, 221, 0.3);
  }

  .btn:hover {
    background: #2c7cd1;
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(55, 138, 221, 0.4);
  }

  .btn:active { transform: translateY(0); }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    background: #cccccc;
  }

  .btn-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(55, 138, 221, 0.3);
    border-top-color: #378ADD;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .divider {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 28px 0;
  }
  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }
  .divider span {
    font-size: 11px;
    color: #666666;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.5px;
  }

  .signup {
    text-align: center;
    font-size: 13px;
    color: #666666;
    font-family: 'DM Mono', monospace;
  }
  .signup a {
    color: #378ADD;
    text-decoration: none;
    font-weight: 500;
    margin-left: 4px;
    transition: color 0.2s;
  }
  .signup a:hover { color: #2c7cd1; }

  .back-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 22px;
    padding: 12px 16px;
    border-radius: 14px;
    border: 1px solid #e0e0e0;
    background: #f9f9f9;
    color: #333333;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .back-button:hover {
    background: #f0f0f0;
    border-color: #cccccc;
  }
`;

const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);

const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconEye = ({ off }) => off ? (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconAlert = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm]     = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.identifier.trim())
      e.identifier = "Informe seu e-mail ou nome de usuário.";
    if (!form.password)
      e.password = "A senha não pode estar vazia.";
    else if (form.password.length < 6)
      e.password = "A senha deve ter ao menos 6 caracteres.";
    return e;
  };

  const handleChange = (field) => (ev) => {
    setForm(f => ({ ...f, [field]: ev.target.value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <div className="bg-grid" />
        <div className="bg-glow" />

        <div className="card">
          <button className="back-button" type="button" onClick={() => navigate(-1)}>
            ← Voltar
          </button>


          <h1 className="heading">Entrar na conta</h1>
          <p className="subheading">acesso restrito — identifique-se</p>

          {/* Campo: e-mail ou usuário */}
          <div className="field">
            <label className="label">E-mail ou usuário</label>
            <div className="input-wrap">
              <span className="input-icon"><IconUser /></span>
              <input
                className={`input${errors.identifier ? " error" : ""}`}
                type="text"
                placeholder="voce@exemplo.com"
                value={form.identifier}
                onChange={handleChange("identifier")}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                autoComplete="username"
                spellCheck={false}
              />
            </div>
            {errors.identifier && (
              <div className="error-msg">
                <IconAlert /> {errors.identifier}
              </div>
            )}
          </div>

          {/* Campo: senha */}
          <div className="field">
            <label className="label">Senha</label>
            <div className="input-wrap">
              <span className="input-icon"><IconLock /></span>
              <input
                className={`input${errors.password ? " error" : ""}`}
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange("password")}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                autoComplete="current-password"
                style={{ paddingRight: "42px" }}
              />
              <button
                className="eye-btn"
                type="button"
                onClick={() => setShowPwd(v => !v)}
                tabIndex={-1}
                aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
              >
                <IconEye off={showPwd} />
              </button>
            </div>
            {errors.password && (
              <div className="error-msg">
                <IconAlert /> {errors.password}
              </div>
            )}
            <div className="forgot"><a href="#">Esqueceu a senha?</a></div>
          </div>

          <button className="btn" onClick={handleSubmit} disabled={loading}>
            <span className="btn-inner">
              {loading ? <><div className="spinner" /> Verificando...</> : "Entrar →"}
            </span>
          </button>

          <div className="divider"><span>ou</span></div>

          <p className="signup">
            Não tem uma conta?<a href="#">Criar agora</a>
          </p>
        </div>
      </div>
    </>
  );
}
