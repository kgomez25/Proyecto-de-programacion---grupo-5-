// src/components/profile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const ORDERS_KEY = "caribeSupply_orders";

export default function Profile() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      setOrders([]);
      return;
    }

    const saved = localStorage.getItem(ORDERS_KEY);
    const all = saved ? JSON.parse(saved) : [];

    // Filtrar solo los pedidos de este usuario (por correo)
    const userOrders = all.filter(
      (order) => order.userEmail === currentUser.email
    );

    // Ordenar del más reciente al más antiguo
    userOrders.sort((a, b) => b.id - a.id);

    setOrders(userOrders);
  }, [currentUser]);

  if (!currentUser) {
    return (
      <section className="section">
        <h2 className="section-title">Perfil del cliente</h2>
        <p>
          Debes iniciar sesión para ver tu perfil. Ve a la sección{" "}
          <strong>Iniciar sesión</strong> en el menú.
        </p>
      </section>
    );
  }

  return (
    <section className="section">
      <h2 className="section-title">Perfil del cliente</h2>
      <p className="section-subtitle">
        Consulta tus datos y el historial de pedidos simulados en CaribeSupply.
      </p>

      {/* Datos básicos */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <h3>Datos de tu cuenta</h3>
        <p>
          <strong>Nombre:</strong> {currentUser.name}
        </p>
        <p>
          <strong>Correo:</strong> {currentUser.email}
        </p>
        <p className="small-muted">
          Esta información se obtiene de tu sesión actual (localStorage).
        </p>
      </div>

      {/* Historial de pedidos */}
      <div className="card">
        <h3>Historial de pedidos</h3>

        {orders.length === 0 ? (
          <p className="small-muted">
            Todavía no tienes pedidos asociados a este correo. Realiza un pedido
            en el checkout para verlo aquí.
          </p>
        ) : (
          <div className="faq-list">
            {orders.map((order) => (
              <div key={order.id} className="faq-item">
                <div className="faq-question">
                  <span>
                    Pedido #{order.id} ·{" "}
                    <span className="small-muted">
                      {order.createdAtText || order.createdAt}
                    </span>
                  </span>
                  <span>
                    Total: RD${" "}
                    {order.totals?.total
                      ? order.totals.total.toFixed(2)
                      : "0.00"}
                  </span>
                </div>
                <div className="faq-answer">
                  <p className="small-muted">
                    <strong>Enviado a:</strong> {order.shipping?.nombre} —{" "}
                    {order.shipping?.provincia}
                  </p>
                  <p className="small">
                    <strong>Dirección:</strong> {order.shipping?.direccion}
                  </p>
                  <p className="small">
                    <strong>Teléfono:</strong> {order.shipping?.telefono}
                  </p>

                  <p className="small" style={{ marginTop: "0.5rem" }}>
                    <strong>Productos:</strong>
                  </p>
                  <ul className="small" style={{ paddingLeft: "1.2rem" }}>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.quantity} × {item.name} — RD${" "}
                        {(item.price * item.quantity).toFixed(2)}
                      </li>
                    ))}
                  </ul>

                  <p className="small" style={{ marginTop: "0.5rem" }}>
                    Subtotal: RD${" "}
                    {order.totals?.subtotal
                      ? order.totals.subtotal.toFixed(2)
                      : "0.00"}{" "}
                    · ITBIS: RD${" "}
                    {order.totals?.tax
                      ? order.totals.tax.toFixed(2)
                      : "0.00"}{" "}
                    ·{" "}
                    <strong>
                      Total: RD${" "}
                      {order.totals?.total
                        ? order.totals.total.toFixed(2)
                        : "0.00"}
                    </strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
