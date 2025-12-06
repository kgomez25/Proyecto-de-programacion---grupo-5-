import React, { useEffect, useState } from "react";

export default function ExchangeRatesWidget() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      // API pública con USD como base que incluye DOP
      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      const json = await res.json();

      if (json.result !== "success") {
        throw new Error("Respuesta inválida de la API de tasas.");
      }

      setRates(json);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las tasas de cambio.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const getRate = (code) =>
    rates?.rates && rates.rates[code] ? rates.rates[code] : null;

  return (
    <article className="card">
      <h3>Tasas de cambio</h3>
      <p className="muted small">
        Datos en tiempo casi real (base USD). Mostramos tasas relevantes para
        CaribeSupply.
      </p>

      {loading && <p>Cargando tasas...</p>}
      {error && <p className="error-text">{error}</p>}

      {rates && (
        <>
          <div className="fx-grid">
            <div>
              <span className="muted small">Base</span>
              <p>
                <strong>{rates.base_code}</strong>
              </p>
              <span className="muted small">Última actualización</span>
              <p className="small">
                {rates.time_last_update_utc?.replace("GMT", "").trim()}
              </p>
            </div>

            <div>
              <span className="muted small">USD → DOP</span>
              <p>
                <strong>
                  {getRate("DOP") ? getRate("DOP").toFixed(2) : "N/D"}
                </strong>
              </p>
            </div>

            <div>
              <span className="muted small">USD → EUR</span>
              <p>
                <strong>
                  {getRate("EUR") ? getRate("EUR").toFixed(4) : "N/D"}
                </strong>
              </p>
            </div>

            <div>
              <span className="muted small">USD → MXN</span>
              <p>
                <strong>
                  {getRate("MXN") ? getRate("MXN").toFixed(2) : "N/D"}
                </strong>
              </p>
            </div>

            <div>
              <span className="muted small">USD → COP</span>
              <p>
                <strong>
                  {getRate("COP") ? getRate("COP").toFixed(2) : "N/D"}
                </strong>
              </p>
            </div>
          </div>

          <p className="small-muted">
        
          </p>
        </>
      )}

      <button className="secondary-button small" onClick={fetchRates}>
        Actualizar
      </button>
    </article>
  );
}
