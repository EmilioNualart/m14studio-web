import Link from "next/link";
import Pieza from "@/components/ui/Pieza";
import { featuredIds, featuredMeta, formatFecha, portfolioItems } from "@/lib/data";

export default function Portfolio() {
  return (
    <section id="trabajo" className="seccion seccion-negro">
      <div className="grid12">
        <div className="trabajo-bar">
          <h2 className="placa">
            Trabajo<span className="solo-desktop"> seleccionado</span>
          </h2>
          <Link href="/trabajo" className="placa acento-negro">
            Ver <span className="solo-desktop">las {portfolioItems.length} piezas</span>
            <span className="solo-movil">todo</span>
          </Link>
        </div>
        {featuredIds.map((id) => {
          const meta = featuredMeta[id];
          const fecha = portfolioItems.find((item) => item.videoId === id)?.fecha;
          const base = meta.cliente === meta.titulo ? meta.categoria : `${meta.cliente} · ${meta.categoria}`;
          return (
            <Pieza
              key={id}
              videoId={id}
              thumb={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
              titulo={meta.titulo}
              meta={fecha ? `${base} · ${formatFecha(fecha)}` : base}
            />
          );
        })}
        <Link href="/trabajo" className="btn-papel trabajo-ver">
          <span className="placa">Ver todo el contenido</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4 10h12M11 5l5 5-5 5" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
