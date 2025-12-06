import React from "react";
import { useCart } from "../context/CartContext";

export default function CartSummary({ onGoCheckout }) {
  const { itemsCount, subtotal, tax, total } = useCart();

  if (itemsCount === 0) {
    return (
      <section className="section compact">
        <div className="info-banner">
          Tu carrito está vacío. Agrega productos desde el catálogo.
        </div>
      </section>
    );
  }

  return (
    <section className="section compact">
      <div className="card cart-summary">
        <div>
          <h3>Resumen rápido del carrito</h3>
          <p className="muted">
            {itemsCount} artículo(s) — Subtotal RD$ {subtotal.toFixed(2)} — ITBIS (18%) RD$ {tax.toFixed(2)}
          </p>
        </div>
        <div className="cart-summary-right">
          <strong>Total: RD$ {total.toFixed(2)}</strong>
          <button className="primary-button" onClick={onGoCheckout}>
            Ir al checkout
          </button>
        </div>
      </div>
    </section>
  );
}
