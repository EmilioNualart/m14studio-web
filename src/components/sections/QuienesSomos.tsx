import { equipo } from "@/lib/data";

export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="seccion">
      <div className="grid12 seccion-head">
        <p className="placa acento-papel">Quiénes somos</p>
        <div className="seccion-head-body reveal">
          <h2 className="display">Dirigimos y producimos.</h2>
          <p className="texto gris">
            Un equipo de dirección y producción con oficina en Santiago. Trabajamos con marcas de moda,
            retail y gastronomía, y con empresas e inmobiliarias que necesitan una sola contraparte para
            todo el proyecto. La dirección creativa y la producción ejecutiva se sientan en la misma mesa:
            lo que se aprueba en preproducción es lo que se filma.
          </p>
        </div>
      </div>
      <div className="grid12">
        <ul className="equipo" role="list">
          {equipo.map((p) => (
            <li key={p.nombre} className="persona reveal">
              <div className="persona-foto">
                {p.foto && <img src={p.foto} alt={p.nombre} loading="lazy" />}
              </div>
              <div className="persona-info">
                <strong>{p.nombre}</strong>
                <span className="placa">{p.rol}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
