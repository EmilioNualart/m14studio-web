"use client";

import { useState } from "react";
import { formatFecha } from "@/lib/data";
import FotoVisor from "@/components/ui/FotoVisor";
import { categoriaLabel, filtrosFotos, fotoSrc, sesiones, type Sesion } from "@/lib/fotos";

export default function IndiceFotos() {
  const [filtro, setFiltro] = useState<string>("all");
  const [abierta, setAbierta] = useState<Sesion | null>(null);
  const [indice, setIndice] = useState(0);
  const items = sesiones.filter((s) => filtro === "all" || s.categoria === filtro);

  return (
    <>
      <div className="filtros filtros-sub" role="group" aria-label="Filtrar fotos por categoría">
        {filtrosFotos.map((cat) => (
          <button key={cat.key} type="button" className="placa" aria-pressed={filtro === cat.key} onClick={() => setFiltro(cat.key)}>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="sesion-grid">
        {items.map((s) => (
          <button
            key={s.slug}
            type="button"
            className="sesion"
            onClick={() => {
              setIndice(Math.max(0, s.fotos.findIndex((f) => f.n === s.portada)));
              setAbierta(s);
            }}
          >
            <div className="sesion-media">
              <img src={fotoSrc(s.slug, s.portada, true)} alt="" loading="lazy" />
              <span className="sesion-ver placa" aria-hidden="true">Ver {s.fotos.length} fotos</span>
            </div>
            <div className="pieza-info">
              <span className="display">{s.titulo}</span>
              <span className="placa">
                {categoriaLabel[s.categoria]} · {formatFecha(s.fecha)}
              </span>
              {s.cliente && s.cliente !== s.titulo && <span className="placa pieza-cliente">{s.cliente}</span>}
            </div>
          </button>
        ))}
      </div>

      <FotoVisor sesion={abierta} indice={indice} onIndice={setIndice} onClose={() => setAbierta(null)} />
    </>
  );
}
