import { BOOKING_URL, contacto } from "@/lib/data";

const mailto = `mailto:${contacto.email}?subject=${encodeURIComponent("Reunión · M14 Studio")}`;

export default function Agendar() {
  return (
    <section id="agendar" className="seccion-negro">
      <div className="grid12">
        <div className="agendar-texto reveal">
          <p className="placa acento-negro">Agenda una reunión</p>
          <h2 className="display">Conversemos tu proyecto.</h2>
          <p className="texto">
            Elige un horario y te reunimos con Mercedes Errázuriz, nuestra productora ejecutiva.
            Treinta minutos, por videollamada o en la oficina.
          </p>
        </div>

        <div className="agendar-panel reveal">
          {BOOKING_URL ? (
            <iframe
              className="agendar-embed"
              src={BOOKING_URL}
              title="Agenda una reunión con M14 Studio"
              loading="lazy"
            />
          ) : (
            <a className="btn-papel" href={mailto}>
              <span className="placa">Agendar reunión</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 10h12M11 5l5 5-5 5" />
              </svg>
            </a>
          )}
        </div>
      </div>

      <footer className="grid12 pie num">
        <div className="pie-logo">
          <img src="/brand/m14-cuadrado-negativo.svg" alt="M14 Studio" />
        </div>
        <div>
          <span className="placa">¿Prefieres escribir?</span>
          <a href={`mailto:${contacto.email}`}>{contacto.email}</a>
        </div>
        <div>
          <span className="placa">Oficina</span>
          <span>{contacto.direccion}</span>
        </div>
        <div>
          <span className="placa">Redes</span>
          <a href={contacto.instagram} target="_blank" rel="noopener noreferrer">@m14studio</a>
        </div>
      </footer>
    </section>
  );
}
