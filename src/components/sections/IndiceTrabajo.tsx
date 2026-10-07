"use client";

import { useEffect, useState } from "react";
import IndiceFotos from "@/components/sections/IndiceFotos";
import Pieza from "@/components/ui/Pieza";
import { filterCategories, formatFecha, getThumbUrl, portfolioItems } from "@/lib/data";

export default function IndiceTrabajo() {
  const [filtro, setFiltro] = useState<string>("all");
  const [tab, setTab] = useState<"video" | "fotos">("video");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("tab") === "fotos") setTab("fotos");
  }, []);

  const cambiarTab = (t: "video" | "fotos") => {
    setTab(t);
    window.history.replaceState(null, "", t === "fotos" ? "/trabajo?tab=fotos" : "/trabajo");
  };
  const items = portfolioItems.filter((item) => filtro === "all" || item.category === filtro || item.tambien?.some((c) => c === filtro));

  return (
    <section className="indice seccion-negro">
      <div style={{ paddingInline: "var(--gutter)" }}>
        <p className="placa acento-negro">Trabajo</p>
        <h1 className="display" style={{ marginTop: 24 }}>Portafolio</h1>

        <div className="tabs" role="group" aria-label="Tipo de contenido">
          {(["video", "fotos"] as const).map((t) => (
            <button key={t} type="button" className="placa" aria-pressed={tab === t} onClick={() => cambiarTab(t)}>
              {t === "video" ? "Video" : "Fotografía"}
            </button>
          ))}
        </div>

        {tab === "fotos" ? (
          <IndiceFotos />
        ) : (
          <>
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
              cliente={item.cliente}
              meta={`${item.category} · ${formatFecha(item.fecha)}`}
            />
          ))}
        </div>
          </>
        )}
      </div>
    </section>
  );
}
