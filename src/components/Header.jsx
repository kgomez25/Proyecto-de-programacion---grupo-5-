import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header({ currentView, onChangeView }) {
  const { itemsCount } = useCart();
  const { currentUser, logout } = useAuth();

  const handleTheme = () => {
    const root = document.body;
    const cur = root.getAttribute("data-theme") || "light";
    const next = cur === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
  };

  return (
    <header className="header" role="banner">
      <div className="brand" onClick={() => onChangeView("catalog")}>
        <div>
           <img
        src="/assets/logo-caribesupply.svg"
        alt="CaribeSupply - Artesanía y productos locales"
        style={{ height: 60 }}/>
       <div className="brand-tagline">
       
          </div>
        </div>
      </div>

      <nav className="nav">
        <button
          className={currentView === "catalog" ? "nav-link active" : "nav-link"}
          onClick={() => onChangeView("catalog")}
        >
          Catálogo
        </button>
        <button
          className={currentView === "apis" ? "nav-link active" : "nav-link"}
          onClick={() => onChangeView("apis")}
        >
          APIs
        </button>
        <button
          className={currentView === "support" ? "nav-link active" : "nav-link"}
          onClick={() => onChangeView("support")}
        >
          Soporte
        </button>
        <button
          className={currentView === "profile" ? "nav-link active" : "nav-link"}
          onClick={() => onChangeView("profile")}
        >
          Perfil
        </button>
        <button
          className={currentView === "checkout" ? "nav-link active" : "nav-link"}
          onClick={() => onChangeView("checkout")}
        >
          Carrito ({itemsCount})
        </button>
      </nav>





      <div className="header-actions">
        <button className="icon-button" onClick={handleTheme} aria-label="Cambiar tema">
          🌓
        </button>

        {currentUser ? (
          <div className="user-chip">
            <span className="small-muted">Hola,</span>{" "}
            <strong>{currentUser.name}</strong>
            <button className="link-button" onClick={logout}>
              Salir
            </button>
          </div>
        ) : (
          <button
            className="primary-button"
            onClick={() => onChangeView("auth")}
          >
            Iniciar sesión
          </button>
        )}
      </div>
    </header>
  );
}
