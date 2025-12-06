import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const { register, login } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    try {
      if (mode === "register") {
        await register(form);
        setInfo("Cuenta creada y sesión iniciada correctamente.");
      } else {
        await login(form);
        setInfo("Inicio de sesión exitoso.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="section">
      <h2 className="section-title">
        {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
      </h2>
      <p className="section-subtitle">
        Autenticación simulada con localStorage (API ficticia de autenticación).
      </p>

      <div className="auth-toggle">
        <button
          className={mode === "login" ? "chip active" : "chip"}
          onClick={() => setMode("login")}
        >
          Ya tengo cuenta
        </button>
        <button
          className={mode === "register" ? "chip active" : "chip"}
          onClick={() => setMode("register")}
        >
          Registrarme
        </button>
      </div>

      <form className="card auth-form" onSubmit={handleSubmit}>
        {mode === "register" && (
          <label className="label">
            Nombre completo
            <input
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required={mode === "register"}
            />
          </label>
        )}

        <label className="label">
          Correo
          <input
            type="email"
            className="input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </label>

        <label className="label">
          Contraseña
          <input
            type="password"
            className="input"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </label>

        <button type="submit" className="primary-button">
          {mode === "login" ? "Entrar" : "Crear cuenta"}
        </button>

        {error && <p className="error-text">{error}</p>}
        {info && <p className="success-text">{info}</p>}

        <p className="muted small">
         
        </p>
      </form>
    </section>
  );
}
