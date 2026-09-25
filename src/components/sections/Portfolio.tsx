import Link from "next/link";
import Pieza from "@/components/ui/Pieza";
import { featuredIds, featuredMeta, portfolioItems } from "@/lib/data";

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
          return (
            <Pieza
              key={id}
              videoId={id}
              thumb={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
              titulo={meta.titulo}
              meta={meta.cliente === meta.titulo ? meta.categoria : `${meta.cliente} · ${meta.categoria}`}
            />
          );
        })}
      </div>
    </section>
  );
}
