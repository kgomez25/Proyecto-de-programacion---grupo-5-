import React, { useState } from "react";
import Header from "./components/Header";

import Catalog from "./components/Catalog";
import Checkout from "./components/Checkout";
import Auth from "./components/Auth";
import CartSummary from "./components/CartSummary";
import WeatherWidget from "./components/WeatherWidget";
import ExchangeRatesWidget from "./components/ExchangeRatesWidget";
import TrackingWidget from "./components/TrackingWidget";
// ✅ CORRECCIÓN FINAL: Se añade la extensión explícita '.jsx' para que el compilador
//                     de GitHub Actions (Linux) pueda encontrar el módulo 'FAQ'.
import FAQ from "./components/FAQ.jsx"; 
import Profile from "./components/Profile"; 

import { CartProvider } from "./context/CartContext";

export default function App() {
  const [view, setView] = useState("catalog");

  const handleChangeView = (next) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CartProvider>
      <div className="app-wrapper">
        <Header currentView={view} onChangeView={handleChangeView} />

        <main className="main-content">
          {/* Resumen superior del carrito */}
          <CartSummary onGoCheckout={() => handleChangeView("checkout")} />

          {/* Catálogo */}
          {view === "catalog" && <Catalog />}

          {/* Checkout */}
          {view === "checkout" && (
            <Checkout onBack={() => handleChangeView("catalog")} />
          )}

          {/* Autenticación */}
          {view === "auth" && <Auth />}

          {/* Sección de APIs */}
          {view === "apis" && (
            <section className="section">
              <h2 className="section-title">Servicios con APIs</h2>
              <p className="section-subtitle">
                Integramos datos en tiempo real y servicios simulados para mejorar la experiencia.
              </p>
              <div className="cards-grid">
                <WeatherWidget />
                <ExchangeRatesWidget />
                <TrackingWidget />
              </div>
            </section>
          )}

          {/* Soporte & FAQ */}
          {view === "support" && (
            <section className="section">
              <h2 className="section-title">Soporte &amp; Preguntas Frecuentes</h2>
              <FAQ />
            </section>
          )}

          {/* Perfil */}
          {view === "profile" && <Profile />}
        </main>

        <footer className="footer">
          <p>
            CaribeSupply S.A.S. &copy; {new Date().getFullYear()} — Conectando productores dominicanos con el mundo.
          </p>
        </footer>
      </div>
    </CartProvider>
  );
}
