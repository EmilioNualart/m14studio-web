import { lineasDeServicio } from "@/lib/data";

export default function QueHacemos() {
  return (
    <section id="que-hacemos" className="seccion">
      <div className="grid12">
        <h2 className="placa placa-col">Qué hacemos</h2>
        <ul className="servicios">
          {lineasDeServicio.map((s) => (
            <li key={s.titulo} className="servicio reveal">
              <h3 className="display">{s.titulo}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
