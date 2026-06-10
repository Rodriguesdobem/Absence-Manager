import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../Services/UsuarioService";

const styles = `

  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lp-body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #000;
    color: #fff;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  .lp-bg-layer { position: fixed; inset: 0; z-index: 0; overflow: hidden; }
  .lp-bg-circle { position: absolute; border-radius: 50%; }
  .lp-bg-c1 { width: 700px; height: 700px; background: radial-gradient(circle, rgba(59,66,159,0.35) 0%, transparent 70%); top: -200px; right: -200px; }
  .lp-bg-c2 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(76,201,240,0.15) 0%, transparent 70%); bottom: -150px; left: -150px; }
  .lp-bg-c3 { width: 250px; height: 250px; background: radial-gradient(circle, rgba(76,201,240,0.1) 0%, transparent 70%); top: 40%; left: 10%; }
  .lp-bg-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(76,201,240,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(76,201,240,0.04) 1px, transparent 1px); background-size: 48px 48px; }

  .lp-card-wrap {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 460px;
    padding: 16px;
    animation: lpFadeUp 0.5s ease both;
  }

  @keyframes lpFadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .lp-card {
    background: #0c0c14;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 40px 40px 36px;
    position: relative;
    overflow: hidden;
  }

  .lp-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(76,201,240,0.5), transparent);
  }

  .lp-card-glow {
    position: absolute;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(59,66,159,0.2) 0%, transparent 70%);
    top: -100px; right: -80px;
    pointer-events: none;
  }

  .lp-card-bottom-bar {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #3B429F, #4CC9F0, #3B429F);
    opacity: 0.7;
  }

  .lp-back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 7px 14px;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 32px;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .lp-back-btn:hover {
    background: rgba(76,201,240,0.08);
    border-color: rgba(76,201,240,0.3);
    color: #4CC9F0;
  }

  .lp-logo-row { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
  .lp-logo-icon { width: 34px; height: 34px; background: #4CC9F0; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .lp-logo-icon svg { width: 18px; height: 18px; fill: #000; }
  .lp-logo-text { font-size: 15px; font-weight: 800; color: #fff; letter-spacing: -0.3px; }

  .lp-title { font-size: 30px; font-weight: 800; letter-spacing: -0.8px; line-height: 1.1; margin-bottom: 8px; }
  .lp-title span { color: #4CC9F0; }
  .lp-sub { font-size: 13px; color: rgba(255,255,255,0.35); font-weight: 500; margin-bottom: 32px; }

  .lp-form-group { display: flex; flex-direction: column; gap: 16px; margin-bottom: 8px; }
  .lp-field { display: flex; flex-direction: column; gap: 7px; }
  .lp-field label { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; }

  .lp-input-wrap { position: relative; }

  .lp-input {
    width: 100%;
    background: #111118;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 14px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: #fff;
    outline: none;
    transition: all 0.2s;
  }
  .lp-input::placeholder { color: rgba(255,255,255,0.2); }
  .lp-input:focus { border-color: #4CC9F0; background: #131320; box-shadow: 0 0 0 3px rgba(76,201,240,0.08); }
  .lp-input.lp-has-icon { padding-right: 44px; }
  .lp-input.lp-error { border-color: #f25f5c; box-shadow: 0 0 0 3px rgba(242,95,92,0.1); }

  .lp-field-icon {
    position: absolute;
    right: 14px; top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.3);
    cursor: pointer;
    background: none; border: none;
    padding: 0;
    display: flex; align-items: center;
    transition: color 0.2s;
  }
  .lp-field-icon:hover { color: #4CC9F0; }

  .lp-error-msg {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #f25f5c;
    margin-top: 4px;
    animation: lpShake 0.3s ease both;
  }
  @keyframes lpShake {
    0%,100% { transform: translateX(0); }
    25%      { transform: translateX(-4px); }
    75%      { transform: translateX(4px); }
  }

  .lp-forgot { text-align: right; margin-top: 2px; }
  .lp-forgot a { font-size: 12px; color: rgba(255,255,255,0.3); text-decoration: none; font-weight: 500; transition: color 0.2s; cursor: pointer; }
  .lp-forgot a:hover { color: #4CC9F0; }

  .lp-btn-submit {
    width: 100%;
    background: #4CC9F0;
    color: #000;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 800;
    padding: 13px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .lp-btn-submit:hover { background: #fff; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(76,201,240,0.25); }
  .lp-btn-submit:active { transform: translateY(0); }
  .lp-btn-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .lp-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(0,0,0,0.2);
    border-top-color: #000;
    border-radius: 50%;
    animation: lpSpin 0.7s linear infinite;
  }
  @keyframes lpSpin { to { transform: rotate(360deg); } }

  .lp-divider { display: flex; align-items: center; gap: 12px; margin: 24px 0 20px; }
  .lp-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
  .lp-divider span { font-size: 12px; color: rgba(255,255,255,0.2); font-weight: 500; }

  .lp-register-row { text-align: center; font-size: 13px; color: rgba(255,255,255,0.3); font-weight: 500; }
  .lp-register-row a { color: #4CC9F0; text-decoration: none; font-weight: 700; transition: color 0.2s; cursor: pointer; }
  .lp-register-row a:hover { color: #fff; }
`;

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
  const [submitError, setSubmitError] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (UsuarioService.getCurrentUser()) {
      navigate('/dashboard');
    }
  }, [navigate]);

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
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setLoading(true);
    setSubmitError(null);

    try {
      const user = await UsuarioService.signin(form.identifier, form.password);
      if (!user) {
        setSubmitError('Login inválido. Verifique o e-mail/usuário e senha.');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Falha no login:', err);
      const message = err?.response?.data?.error || err?.message;
      setSubmitError(message || 'Não foi possível conectar ao servidor. Verifique o backend e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="lp-body">
        <div className="lp-bg-layer">
          <div className="lp-bg-circle lp-bg-c1" />
          <div className="lp-bg-circle lp-bg-c2" />
          <div className="lp-bg-circle lp-bg-c3" />
          <div className="lp-bg-grid" />
        </div>

        <div className="lp-card-wrap">
          <div className="lp-card">
            <div className="lp-card-glow" />

            <button className="lp-back-btn" type="button" onClick={() => navigate('/')}
            >
              ← Voltar
            </button>


            <div>
              <div className="lp-logo-row">
                <div className="lp-logo-icon">
                  <svg viewBox="0 0 20 20"><path d="M3 4h14v2H3zm0 5h10v2H3zm0 5h14v2H3z"/></svg>
                </div>
                <span className="lp-logo-text">AbsenceManager</span>
              </div>
              <h1 className="lp-title">Entrar na <span>conta</span></h1>
            </div>

            <div className="lp-form-group">
              <div className="lp-field">
                <label>Usuário / e-mail cadastrado</label>
                <div className="lp-input-wrap">
                  <input
                    className={`lp-input${errors.identifier ? " lp-error" : ""}`}
                    type="text"
                    placeholder="seu.usuario@exemplo.com"
                    value={form.identifier}
                    onChange={handleChange("identifier")}
                    onKeyDown={e => e.key === "Enter" && handleSubmit()}
                    autoComplete="username"
                    spellCheck={false}
                  />
                </div>
                {errors.identifier && (
                  <div className="lp-error-msg"><IconAlert /> {errors.identifier}</div>
                )}
              </div>

              <div className="lp-field">
                <label>Senha</label>
                <div className="lp-input-wrap">
                  <input
                    className={`lp-input lp-has-icon${errors.password ? " lp-error" : ""}`}
                    type={showPwd ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange("password")}
                    onKeyDown={e => e.key === "Enter" && handleSubmit()}
                    autoComplete="current-password"
                  />
                  <button
                    className="lp-field-icon"
                    type="button"
                    onClick={() => setShowPwd(v => !v)}
                    tabIndex={-1}
                    aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
                  >
                    <IconEye off={showPwd} />
                  </button>
                </div>
                {errors.password && (
                  <div className="lp-error-msg"><IconAlert /> {errors.password}</div>
                )}
                <div className="lp-forgot"><a href="#">Esqueceu a senha?</a></div>
              </div>
            </div>

            <button className="lp-btn-submit" onClick={handleSubmit} disabled={loading}>
              {loading ? <><div className="lp-spinner" /> Verificando...</> : <>Entrar </>}
            </button>
            {submitError && (
              <div className="lp-error-msg" style={{ marginTop: '18px', justifyContent: 'center' }}><IconAlert /> {submitError}</div>
            )}

            <div className="lp-card-bottom-bar" />
          </div>
        </div>
      </div>
    </>
  );
}
