import { equipo } from "@/lib/data";

export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="seccion">
      <div className="grid12 seccion-head">
        <p className="placa acento-papel">Quiénes somos</p>
        <div className="seccion-head-body reveal">
          <h2 className="display">Dirigimos y producimos.</h2>
          <p className="texto gris">
            Emilio y Domingo se conocen desde 2011 y filman juntos desde el colegio. M14 Studio nace el
            14 de mayo de 2023. Hoy somos cuatro, con oficina propia en Santiago.
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
