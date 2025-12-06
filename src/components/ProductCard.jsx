import React from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="card product-card">
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="muted small">{product.origin}</p>
        <p className="card-text">{product.description}</p>
        <div className="product-footer">
          <span className="price">
            RD$ {product.price.toLocaleString("es-DO", { minimumFractionDigits: 2 })}
          </span>
          <button
            className="primary-button"
            onClick={() => addToCart(product)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}
