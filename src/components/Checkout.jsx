import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const provincias = [
  "Distrito Nacional",
  "Santo Domingo",
  "Santiago",
  "La Vega",
  "Puerto Plata",
  "La Romana",
  "San Cristóbal",
  "San Pedro de Macorís",
  "Monte Plata",
];

export default function Checkout({ onBack }) {
  const { cart, subtotal, tax, total, changeQuantity, removeFromCart, clearCart } =
    useCart();
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    provincia: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if (!form.correo.includes("@")) e.correo = "Correo inválido.";
    if (!form.telefono.trim()) e.telefono = "El teléfono es obligatorio.";
    if (!form.direccion.trim()) e.direccion = "La dirección es obligatoria.";
    if (!form.provincia) e.provincia = "Selecciona una provincia.";
    if (cart.length === 0) e.carrito = "El carrito está vacío.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("processing");
    setTimeout(() => {
      setStatus("success");
      clearCart();
    }, 1000);
  };

  if (cart.length === 0 && status !== "success") {
    return (
      <section className="section">
        <h2 className="section-title">Checkout</h2>
        <p>Tu carrito está vacío. Agrega productos desde el catálogo.</p>
        <button className="secondary-button" onClick={onBack}>
          Volver al catálogo
        </button>
      </section>
    );
  }

  return (
    <section className="section">
      <h2 className="section-title">Checkout</h2>
      <p className="section-subtitle">
        Completa tus datos para simular el flujo de compra. No se realizará ningún cargo real.
      </p>

      {errors.carrito && <p className="error-text">{errors.carrito}</p>}

      <div className="checkout-grid">
        {/* Carrito */}
        <div className="card">
          <h3>Carrito</h3>
          {cart.map((item) => (
            <div className="cart-row" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <p className="muted small">{item.origin}</p>
              </div>
              <div className="cart-row-controls">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    changeQuantity(item.id, Number(e.target.value))
                  }
                  className="input input-qty"
                />
                <span>
                  RD$ {(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  className="link-button danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="cart-totals">
            <div>
              <span>Subtotal</span>
              <span>RD$ {subtotal.toFixed(2)}</span>
            </div>
            <div>
              <span>ITBIS (18%)</span>
              <span>RD$ {tax.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <strong>Total</strong>
              <strong>RD$ {total.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        {/* Formulario de checkout */}
        <form className="card" onSubmit={handleSubmit} noValidate>
          <h3>Datos del cliente</h3>

          <label className="label">
            Nombre completo
            <input
              className="input"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
            {errors.nombre && <span className="error-text">{errors.nombre}</span>}
          </label>

          <label className="label">
            Correo electrónico
            <input
              type="email"
              className="input"
              value={form.correo}
              onChange={(e) => setForm({ ...form, correo: e.target.value })}
            />
            {errors.correo && <span className="error-text">{errors.correo}</span>}
          </label>

          <label className="label">
            Teléfono
            <input
              className="input"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            />
            {errors.telefono && <span className="error-text">{errors.telefono}</span>}
          </label>

          <label className="label">
            Dirección
            <input
              className="input"
              value={form.direccion}
              onChange={(e) => setForm({ ...form, direccion: e.target.value })}
            />
            {errors.direccion && <span className="error-text">{errors.direccion}</span>}
          </label>

          <label className="label">
            Provincia
            <select
              className="input"
              value={form.provincia}
              onChange={(e) => setForm({ ...form, provincia: e.target.value })}
            >
              <option value="">Selecciona una provincia</option>
              {provincias.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {errors.provincia && <span className="error-text">{errors.provincia}</span>}
          </label>

          <div className="checkout-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onBack}
            >
              Volver al catálogo
            </button>
            <button
              type="submit"
              className="primary-button"
              disabled={status === "processing"}
            >
              {status === "processing" ? "Procesando..." : "Confirmar pedido ficticio"}
            </button>
          </div>

          {status === "success" && (
            <p className="success-text">
              ✅ Pedido registrado de forma simulada. ¡Gracias por utilizar CaribeSupply!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
