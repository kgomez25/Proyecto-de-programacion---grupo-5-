import React, { useState } from "react";

function fakeTrackingAPI(code) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!code || code.length < 5) {
        reject(new Error("Código inválido."));
        return;
      }
      const statuses = [
        "Etiqueta generada",
        "Recogido por el transportista",
        "En tránsito",
        "En centro de distribución",
        "En reparto",
        "Entregado",
      ];
      const currentIndex = (code.length + code.charCodeAt(0)) % statuses.length;
      resolve({
        code,
        history: statuses.slice(0, currentIndex + 1),
      });
    }, 700);
  });
}

export default function TrackingWidget() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const data = await fakeTrackingAPI(code.trim());
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="card">
      <h3>Seguimiento logístico</h3>
      <p className="muted small">
        API simulada de tracking para visualizar estados del envío.
      </p>
      <form onSubmit={handleTrack}>
        <label className="label">
          Código de seguimiento
          <input
            className="input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ej: CS-12345-DO"
          />
        </label>
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}
      {result && (
        <div className="tracking-timeline">
          <p>
            <strong>Código:</strong> {result.code}
          </p>
          <ul>
            {result.history.map((h, idx) => (
              <li key={idx}>{h}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
