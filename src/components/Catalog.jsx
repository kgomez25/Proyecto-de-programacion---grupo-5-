import React, { useMemo, useState } from "react";
import products from "../data/products";
import ProductCard from "./ProductCard";

export default function Catalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");

  const categories = useMemo(
    () => ["Todos", ...new Set(products.map((p) => p.category))],
    []
  );

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Todos" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <section className="section">
      <h2 className="section-title">Catálogo de productos</h2>
      <p className="section-subtitle">
        Explora la oferta de artesanos, productores locales y microempresas.
      </p>

      <div className="filters-row">
        <input
          type="search"
          placeholder="Buscar por nombre, categoría u origen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
        />
        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="cards-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filtered.length === 0 && (
          <p className="muted">
            No se encontraron productos con esos filtros.
          </p>
        )}
      </div>
    </section>
  );
}
