"use client";

import { useEffect, useRef, useState } from "react";
import { etapas } from "@/lib/data";

const cifras = [
  { valor: "7", texto: "días hábiles para la primera versión" },
  { valor: "3", texto: "tandas de corrección por entregable" },
  { valor: "1", texto: "sola contraparte en todo el proyecto" },
];

export default function ComoTrabajamos() {
  const listRef = useRef<HTMLOListElement>(null);
  const [activa, setActiva] = useState(0);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLLIElement>("[data-etapa]");
    if (!items) return;

    // La etapa que cruza el centro de la pantalla es la activa.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiva(Number((entry.target as HTMLElement).dataset.etapa));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="como-trabajamos" className="seccion seccion-negro">
      <div className="grid12 proceso">
        <div className="proceso-intro">
          <p className="placa acento-negro">Cómo trabajamos</p>
          <h2 className="display">Llegamos con todo resuelto.</h2>
          <p className="texto">
            M14 Studio se hace cargo del proyecto completo: del concepto al entregable, con la
            preproducción cerrada antes del rodaje y las fechas que se prometieron.
          </p>
          <dl className="proceso-cifras num">
            {cifras.map((c) => (
              <div key={c.valor + c.texto}>
                <dt className="display">{c.valor}</dt>
                <dd>{c.texto}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ol ref={listRef} className="proceso-etapas">
          {etapas.map((e, i) => (
            <li key={e.titulo} data-etapa={i} className={`proceso-etapa${i === activa ? " is-activa" : ""}`}>
              <span className="proceso-num display num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="proceso-texto">
                <h3 className="display">{e.titulo}</h3>
                <p>{e.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
