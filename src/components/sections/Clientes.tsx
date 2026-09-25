import { clientesQueVuelven } from "@/lib/data";

export default function Clientes() {
  return (
    <section id="clientes" className="seccion">
      <div className="grid12">
        <p className="placa placa-col">Clientes</p>
        <div className="clientes reveal">
          <h2 className="display">Nuestros clientes vuelven.</h2>
          <ul className="clientes-lista num">
            {clientesQueVuelven.map((c) => (
              <li key={c.nombre}>
                {c.nombre}
                {c.nota && <span>{c.nota}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
