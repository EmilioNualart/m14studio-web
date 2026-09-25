import { etapas } from "@/lib/data";

export default function ComoTrabajamos() {
  return (
    <section id="como-trabajamos" className="seccion">
      <div className="grid12 seccion-head">
        <p className="placa">Cómo trabajamos</p>
        <div className="seccion-head-body reveal">
          <h2 className="display">Llegamos con todo resuelto.</h2>
          <p className="texto gris">
            M14 Studio se hace cargo del proyecto completo: del concepto al entregable, con la
            preproducción cerrada antes del rodaje y las fechas que se prometieron.
          </p>
        </div>
      </div>
      <div className="grid12">
        <ol className="etapas num reveal">
          {etapas.map((e, i) => (
            <li key={e.titulo} className="etapa">
              <span className="placa gris">{String(i + 1).padStart(2, "0")}</span>
              <strong>{e.titulo}</strong>
              <p>{e.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
