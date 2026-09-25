"use client";

import { useState } from "react";
import Pieza from "@/components/ui/Pieza";
import { filterCategories, getThumbUrl, portfolioItems } from "@/lib/data";

export default function IndiceTrabajo() {
  const [filtro, setFiltro] = useState<string>("all");
  const items = portfolioItems.filter((item) => filtro === "all" || item.category === filtro);

  return (
    <section className="indice seccion-negro">
      <div style={{ paddingInline: "var(--gutter)" }}>
        <p className="placa acento-negro">Trabajo</p>
        <h1 className="display" style={{ marginTop: 24 }}>Todas las piezas</h1>

        <div className="filtros" role="group" aria-label="Filtrar por categoría">
          {filterCategories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              className="placa"
              aria-pressed={filtro === cat.key}
              onClick={() => setFiltro(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="indice-grid">
          {items.map((item) => (
            <Pieza
              key={item.videoId}
              videoId={item.videoId}
              thumb={getThumbUrl(item)}
              titulo={item.title}
              meta={item.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
