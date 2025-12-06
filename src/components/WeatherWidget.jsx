import React, { useEffect, useState } from "react";

const provinciasRD = {
  "Santo Domingo": { lat: 18.4861, lon: -69.9312 },
  "Distrito Nacional": { lat: 18.4861, lon: -69.9312 },
  Santiago: { lat: 19.4792, lon: -70.6931 },
  "La Vega": { lat: 19.2221, lon: -70.5283 },
  "Puerto Plata": { lat: 19.7934, lon: -70.6884 },
  "La Romana": { lat: 18.4273, lon: -68.9728 },
  "San Cristóbal": { lat: 18.4167, lon: -70.1 },
  "San Pedro de Macorís": { lat: 18.4507, lon: -69.3086 },
};

// Mapea el código de Open-Meteo a un “estado visual” (para las animaciones)
function mapWeatherCodeToMood(code) {
  if (code === 0) return "sunny"; // despejado
  if (code >= 1 && code <= 3) return "cloudy"; // poco/mayormente nublado
  if ((code >= 45 && code <= 48) || (code >= 51 && code <= 67)) return "cloudy";
  if ((code >= 71 && code <= 77) || (code >= 80 && code <= 82)) return "rainy";
  if (code >= 95) return "stormy";
  return "cloudy";
}

export default function WeatherWidget() {
  const [provincia, setProvincia] = useState("Santo Domingo");
  const [current, setCurrent] = useState(null);
  const [extra, setExtra] = useState(null); // humedad, sensación térmica, etc.
  const [dailyToday, setDailyToday] = useState(null); // min/max de hoy
  const [mood, setMood] = useState("sunny");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (prov) => {
    const coords = provinciasRD[prov];
    if (!coords) return;

    setLoading(true);
    setError(null);

    try {
      // Pedimos clima actual + variables horarias + resumen diario de hoy
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

      const res = await fetch(url);
      const json = await res.json();

      const cur = json.current_weather; // temperatura, código de clima, viento, etc.
      setCurrent(cur);

      // Determinar el “look” (soleado, nublado, lluvia, tormenta)
      if (cur && typeof cur.weathercode === "number") {
        setMood(mapWeatherCodeToMood(cur.weathercode));
      } else {
        setMood("cloudy");
      }

      // Extra: buscamos en los datos horarios el registro que coincide con la hora actual
      let humidity = null;
      let apparent = null;
      let rainProb = null;

      if (json.hourly && Array.isArray(json.hourly.time)) {
        const { time, relativehumidity_2m, apparent_temperature, precipitation_probability } =
          json.hourly;

        // Buscamos el índice de la hora actual
        let idx = -1;
        if (cur?.time) {
          idx = time.indexOf(cur.time);
        }

        // Si no se encuentra, usamos el primer dato horario como fallback
        if (idx === -1) idx = 0;

        humidity =
          relativehumidity_2m && relativehumidity_2m[idx] != null
            ? relativehumidity_2m[idx]
            : null;
        apparent =
          apparent_temperature && apparent_temperature[idx] != null
            ? apparent_temperature[idx]
            : null;
        rainProb =
          precipitation_probability && precipitation_probability[idx] != null
            ? precipitation_probability[idx]
            : null;
      }

      setExtra({
        humidity,
        apparent,
        rainProb,
      });

      // Datos diarios (hoy)
      if (json.daily && Array.isArray(json.daily.time)) {
        const todayIndex = 0; // la API devuelve hoy como primer elemento
        const { temperature_2m_max, temperature_2m_min, precipitation_sum } =
          json.daily;

        setDailyToday({
          tMax:
            temperature_2m_max && temperature_2m_max[todayIndex] != null
              ? temperature_2m_max[todayIndex]
              : null,
          tMin:
            temperature_2m_min && temperature_2m_min[todayIndex] != null
              ? temperature_2m_min[todayIndex]
              : null,
          rainSum:
            precipitation_sum && precipitation_sum[todayIndex] != null
              ? precipitation_sum[todayIndex]
              : null,
        });
      } else {
        setDailyToday(null);
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo obtener el clima en este momento.");
      setMood("cloudy");
      setCurrent(null);
      setExtra(null);
      setDailyToday(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(provincia);
  }, [provincia]);

  return (
    <article className={`card weather-card weather-card--${mood}`}>
      <div className="weather-sky" />

      <div className="weather-content">
        <h3>Clima por provincia</h3>
        <p className="muted small">
          Datos en tiempo real desde Open-Meteo. Mostramos condiciones actuales,
          sensación térmica, humedad y resumen del día.
        </p>

        <label className="label">
          Provincia
          <select
            className="input"
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
          >
            {Object.keys(provinciasRD).map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>

        {loading && <p>Cargando clima...</p>}
        {error && <p className="error-text">{error}</p>}

        {current && !loading && !error && (
          <>
            <div className="weather-info">
              <p>
                <strong>Temperatura actual:</strong> {current.temperature}°C
              </p>
              <p>
                <strong>Viento:</strong> {current.windspeed} km/h
              </p>
              <p>
                <strong>Código de clima:</strong> {current.weathercode}
              </p>
              {extra?.apparent != null && (
                <p>
                  <strong>Sensación térmica:</strong> {extra.apparent.toFixed(1)}°C
                </p>
              )}
              {extra?.humidity != null && (
                <p>
                  <strong>Humedad relativa:</strong> {extra.humidity}% 
                </p>
              )}
              {extra?.rainProb != null && (
                <p>
                  <strong>Probabilidad de lluvia (próx. hora):</strong>{" "}
                  {extra.rainProb}%
                </p>
              )}
            </div>

            {dailyToday && (
              <div className="weather-info" style={{ marginTop: "0.6rem" }}>
                <p className="small-muted">
                  <strong>Hoy en {provincia}:</strong>
                </p>
                <p className="small">
                  Mínima:{" "}
                  {dailyToday.tMin != null ? `${dailyToday.tMin.toFixed(1)}°C` : "N/D"}
                  {" · "}
                  Máxima:{" "}
                  {dailyToday.tMax != null ? `${dailyToday.tMax.toFixed(1)}°C` : "N/D"}
                </p>
                <p className="small">
                  Lluvia acumulada:{" "}
                  {dailyToday.rainSum != null
                    ? `${dailyToday.rainSum.toFixed(1)} mm`
                    : "N/D"}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
}
