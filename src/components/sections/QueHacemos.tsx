import { lineasDeServicio } from "@/lib/data";

export default function QueHacemos() {
  return (
    <section id="que-hacemos" className="seccion">
      <div className="grid12 seccion-head">
        <p className="placa">Qué hacemos</p>
        <div className="seccion-head-body reveal">
          <h2 className="display">Te entregamos el proyecto completo.</h2>
          <p className="texto gris">
            Concepto, rodaje y entrega, con una sola contraparte. Cada línea de trabajo tiene sus
            entregables definidos desde la cotización.
          </p>
        </div>
      </div>

      <div className="grid12">
        <ol className="servicios">
          {lineasDeServicio.map((s, i) => (
            <li key={s.titulo} className="servicio reveal">
              <span className="servicio-num placa gris num">{String(i + 1).padStart(2, "0")}</span>
              <div className="servicio-titulo">
                <h3 className="display">{s.titulo}</h3>
                <p>{s.desc}</p>
              </div>
              <div className="servicio-entregables">
                <span className="placa gris">Entregables</span>
                <ul>
                  {s.entregables.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
              <figure className="servicio-media">
                <img src={`https://img.youtube.com/vi/${s.videoId}/maxresdefault.jpg`} alt="" loading="lazy" />
                <figcaption className="placa">{s.referencia}</figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
