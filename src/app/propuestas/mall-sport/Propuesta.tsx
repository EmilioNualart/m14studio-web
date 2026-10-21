"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import RevealProvider from "@/components/providers/RevealProvider";
import { contacto } from "@/lib/data";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

// Avance 0→1 de una sección alta mientras su contenido queda fijo (sticky).
function useProgreso<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const medir = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const recorrido = r.height - window.innerHeight;
      setP(recorrido > 0 ? clamp(-r.top / recorrido) : 0);
    };
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
    };
  }, []);

  return [ref, p] as const;
}

// Contador que sube una vez, al entrar en pantalla.
function Cifra({ valor, prefijo = "", sufijo = "" }: { valor: number; prefijo?: string; sufijo?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(valor);
      const inicio = performance.now();
      const paso = (t: number) => {
        const k = clamp((t - inicio) / 1400);
        setN(Math.round(valor * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(paso);
      };
      raf = requestAnimationFrame(paso);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [valor]);

  return (
    <span ref={ref}>
      {prefijo}
      {n.toLocaleString("es-CL")}
      {sufijo}
    </span>
  );
}

/* ============================================
   CONTENIDO
   ============================================ */
const actos = [
  { n: "01", ini: 0, fin: 20, titulo: "Hoy", frase: "Ya es punto de encuentro.", detalle: "Dron sobre el mall, los colegios y la precordillera. Ciclistas a las 7 AM.", medios: ["Dron", "Grabación"] },
  { n: "02", ini: 20, fin: 35, titulo: "Otro punto de vista", frase: "Evolución, no ruptura.", detalle: "El mismo mall, mirado distinto.", medios: ["Grabación en el mall"] },
  { n: "03", ini: 35, fin: 80, titulo: "Lo que viene", frase: "Los renders cobran vida.", detalle: "La Laguna, Wellness y el hub de bicicletas.", medios: ["Renders animados"] },
  { n: "04", ini: 80, fin: 95, titulo: "El flujo", frase: "Gente de mañana a noche.", detalle: "Familias, colegios, deportistas y vecinos. Seguro.", medios: ["Dron", "Stock", "Datos"] },
  { n: "05", ini: 95, fin: 105, titulo: "La invitación", frase: "Hay un lugar para ti.", detalle: "El cierre que abre la conversación.", medios: ["Voz en off"] },
];
const DURACION = 105;

const espacios = [
  { nombre: "La Laguna", que: "Polo gastronómico, de mañana a noche", cifra: 2812, unidad: "m²", extra: "557 asientos exteriores" },
  { nombre: "Galería Wellness", que: "Mujer y bienestar, junto a Happyland", cifra: 857, unidad: "m²", extra: "≈ 28 locales" },
  { nombre: "Terraza y hub ciclista", que: "La llegada desde la montaña", cifra: "7", unidad: "AM", extra: "Bicicleteros, servicio y cerveza" },
  { nombre: "Centro Activo", que: "Retail experiencial y muro de escalada", cifra: 867, unidad: "m²", extra: "Zona flexible para activaciones" },
  { nombre: "La Arena", que: "Juego y competencia", cifra: 1260, unidad: "m²", extra: "Niveles −1 y −2" },
];

const momentos = [
  { ini: 7, fin: 8, hora: "07:00", quien: "Ciclistas", que: "Salen juntos a Farellones." },
  { ini: 8, fin: 10, hora: "08:00", quien: "Colegios", que: "5 colegios y 1 universidad alrededor." },
  { ini: 13, fin: 15, hora: "13:00", quien: "Vuelta de la montaña", que: "Bici al hub, almuerzo en La Laguna." },
  { ini: 15, fin: 18, hora: "15:00", quien: "Familias", que: "Los niños a Happyland, la mamá a Wellness." },
  { ini: 19.5, fin: 23, hora: "19:30", quien: "Tercer tiempo", que: "Cena y happy hour, jueves a sábado." },
];
const H_INI = 6;
const H_FIN = 24;

const proceso = [
  { titulo: "Renders animados", que: "Los renders oficiales, dirigidos toma a toma." },
  { titulo: "Grabación en el mall", que: "El antes y el después, con gente real." },
  { titulo: "Dron", que: "Ubicación, entorno y flujos." },
  { titulo: "Voz en off y música", que: "Una historia narrada, no un catálogo." },
];

const pasos = [
  { titulo: "Material", que: "Renders oficiales y datos de flujo y seguridad." },
  { titulo: "Guion", que: "Voz en off y escaleta para aprobar." },
  { titulo: "Producción", que: "Grabación, dron, animación, montaje y entrega." },
];

/* ============================================
   SECCIONES
   ============================================ */
function Portada() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const on = () => setY(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="ms-portada">
      <img
        className="ms-portada-foto"
        src="/fotos/andinismo/05.webp"
        alt=""
        style={{ transform: `translateY(${y * 0.3}px) scale(1.08)` }}
      />
      <div className="ms-portada-velo" />
      <div className="ms-portada-contenido">
        <p className="placa ms-entra" style={{ "--d": "0.1s" } as CSSProperties}>Propuesta de video · Octubre 2026</p>
        <h1 className="display">
          <span className="ms-linea"><span style={{ "--d": "0.25s" } as CSSProperties}>Mall Sport,</span></span>
          <span className="ms-linea"><span style={{ "--d": "0.4s" } as CSSProperties}>nueva <em className="acento-negro">etapa.</em></span></span>
        </h1>
      </div>
      <div className="ms-portada-pie ms-entra" style={{ "--d": "0.8s" } as CSSProperties}>
        <span className="placa">1:45 min · Para futuros arrendatarios</span>
        <span className="ms-bajar placa" aria-hidden="true">Scroll</span>
      </div>
    </header>
  );
}

function LaIdea() {
  const [ref, p] = useProgreso<HTMLElement>();
  const palabras = "No es un mall nuevo. Es otra forma de mirarlo.".split(" ");
  const k = p * (palabras.length + 2);

  return (
    <section ref={ref} className="ms-idea" aria-label="La idea">
      <div className="ms-fijo">
        <p className="placa acento-papel">La idea</p>
        <p className="display ms-idea-frase">
          {palabras.map((w, i) => (
            <span key={i} style={{ opacity: 0.12 + 0.88 * clamp(k - i) }}>{w} </span>
          ))}
        </p>
        <p className="ms-idea-sub" style={{ opacity: clamp(k - palabras.length) }}>
          Un video que cuenta una historia para que cada arrendatario quiera ser parte.
        </p>
      </div>
    </section>
  );
}

function ElLugar() {
  return (
    <section className="seccion-negro ms-seccion">
      <div className="ms-envoltura">
        <p className="placa acento-negro reveal">El punto de partida</p>
        <h2 className="display ms-h2 reveal">Al pie de la montaña, en medio del barrio.</h2>
        <dl className="ms-cifras">
          <div className="reveal"><dt className="display"><Cifra valor={5} /></dt><dd>colegios y una universidad alrededor</dd></div>
          <div className="reveal"><dt className="display"><Cifra valor={84} /></dt><dd>operadores hoy</dd></div>
          <div className="reveal"><dt className="display"><Cifra valor={43} sufijo="%" /></dt><dd>del público son mujeres, sin oferta propia</dd></div>
          <div className="reveal"><dt className="display">7 AM</dt><dd>los ciclistas se juntan y suben a Farellones</dd></div>
        </dl>
      </div>
    </section>
  );
}

function LaHistoria() {
  const [ref, p] = useProgreso<HTMLElement>();
  const t = p * DURACION;
  const actual = actos.findIndex((a) => t < a.fin);
  const idx = actual === -1 ? actos.length - 1 : actual;
  const s = Math.floor(t);
  const tiempo = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <section ref={ref} className="ms-historia" aria-label="La historia en cinco actos">
      <div className="ms-fijo">
        <div className="ms-historia-cabeza">
          <p className="placa acento-papel">La historia · 5 actos</p>
          <p className="display ms-tiempo" aria-hidden="true">
            {tiempo}
            <span> / 1:45</span>
          </p>
        </div>

        <div className="ms-actos">
          {actos.map((a, i) => (
            <article key={a.n} className={`ms-acto${i === idx ? " activo" : ""}${i < idx ? " pasado" : ""}`}>
              <p className="placa">Acto {a.n} · {a.titulo}</p>
              <h3 className="display">{a.frase}</h3>
              <p className="ms-acto-detalle">{a.detalle}</p>
              <ul className="ms-medios">
                {a.medios.map((m) => <li key={m} className="placa">{m}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className="ms-barra" aria-hidden="true">
          {actos.map((a, i) => (
            <div key={a.n} className="ms-barra-tramo" style={{ flexGrow: a.fin - a.ini }}>
              <span style={{ transform: `scaleX(${clamp((t - a.ini) / (a.fin - a.ini))})` }} />
              <small className={i === idx ? "activo" : ""}>{a.n}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LoQueViene() {
  const [ref, p] = useProgreso<HTMLElement>();
  const pista = useRef<HTMLDivElement>(null);
  const [recorrido, setRecorrido] = useState(0);

  useLayoutEffect(() => {
    const medir = () => {
      const el = pista.current;
      if (el) setRecorrido(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  return (
    <section ref={ref} className="seccion-negro ms-viene" aria-label="Lo que viene">
      <div className="ms-fijo">
        <div className="ms-viene-cabeza">
          <p className="placa acento-negro">Lo que viene</p>
          <h2 className="display ms-h2">Cinco espacios nuevos.</h2>
        </div>
        <div ref={pista} className="ms-pista" style={{ transform: `translateX(${-p * recorrido}px)` }}>
          {espacios.map((e, i) => (
            <article key={e.nombre} className="ms-espacio">
              <p className="placa">{String(i + 1).padStart(2, "0")}</p>
              <p className="display ms-espacio-cifra">
                {typeof e.cifra === "number" ? <Cifra valor={e.cifra} /> : e.cifra}
                <span>{e.unidad}</span>
              </p>
              <div>
                <h3 className="display">{e.nombre}</h3>
                <p>{e.que}</p>
                <p className="placa ms-espacio-extra">{e.extra}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ElFlujo() {
  const [ref, p] = useProgreso<HTMLElement>();
  const h = H_INI + p * (H_FIN - H_INI);
  const hh = Math.min(23, Math.floor(h));
  const mm = Math.floor((h - Math.floor(h)) * 60 / 15) * 15;
  const pos = (x: number) => `${((x - H_INI) / (H_FIN - H_INI)) * 100}%`;
  const activo = [...momentos].reverse().find((m) => h >= m.ini);

  return (
    <section ref={ref} className="ms-flujo" aria-label="El flujo">
      <div className="ms-fijo">
        <p className="placa acento-papel">El flujo</p>
        <div className="ms-flujo-centro">
          <p className="display ms-reloj" aria-hidden="true">
            {String(hh).padStart(2, "0")}:{String(h >= H_FIN ? 59 : mm).padStart(2, "0")}
          </p>
          <div className="ms-flujo-texto">
            {momentos.map((m) => (
              <div key={m.hora} className={`ms-momento${m === activo ? " activo" : ""}`}>
                <h3 className="display">{m.quien}</h3>
                <p>{m.que}</p>
              </div>
            ))}
            {!activo && (
              <div className="ms-momento activo">
                <h3 className="display">Un mall vivo todo el día.</h3>
                <p>Así se mueve la gente alrededor de Mall Sport.</p>
              </div>
            )}
          </div>
        </div>

        <div className="ms-dia" aria-hidden="true">
          <span className="ms-dia-avance" style={{ width: pos(h) }} />
          {momentos.map((m) => (
            <span
              key={m.hora}
              className={`ms-dia-tramo${h >= m.ini ? " encendido" : ""}`}
              style={{ left: pos(m.ini), width: `calc(${pos(m.fin)} - ${pos(m.ini)})` }}
            />
          ))}
          {[6, 12, 18, 24].map((x) => (
            <small key={x} style={{ left: pos(x) }}>{String(x === 24 ? 0 : x).padStart(2, "0")}:00</small>
          ))}
        </div>

        <p className="placa ms-seguridad" style={{ opacity: clamp(p * 4 - 3) }}>
          Seguridad y flujo, mostrados con imagen.
        </p>
      </div>
    </section>
  );
}

function ComoLoHacemos() {
  return (
    <section className="seccion-negro ms-seccion">
      <div className="ms-envoltura">
        <p className="placa acento-negro reveal">Cómo lo hacemos</p>
        <h2 className="display ms-h2 reveal">Cuatro materiales, una sola historia.</h2>
        <ol className="ms-proceso">
          {proceso.map((x, i) => (
            <li key={x.titulo} className="reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
              <span className="placa acento-negro">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display">{x.titulo}</h3>
              <p>{x.que}</p>
            </li>
          ))}
        </ol>
        <p className="ms-nota reveal">La IA es parte del proceso, no la estética.</p>
      </div>
    </section>
  );
}

function Pasos() {
  return (
    <section className="ms-seccion">
      <div className="ms-envoltura">
        <p className="placa acento-papel reveal">Siguientes pasos</p>
        <h2 className="display ms-h2 reveal">De los renders a la pantalla.</h2>
        <ol className="ms-pasos">
          {pasos.map((x, i) => (
            <li key={x.titulo} className="reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
              <span className="display">{i + 1}</span>
              <div>
                <h3 className="display">{x.titulo}</h3>
                <p>{x.que}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Cierre() {
  return (
    <footer className="seccion-negro ms-cierre">
      <p className="display ms-cierre-frase reveal">
        Hay un lugar para ti<span className="acento-negro">.</span>
      </p>
      <div className="ms-cierre-pie">
        <img src="/brand/m14-cuadrado-negativo.svg" alt="M14 Studio" width={56} height={56} />
        <div>
          <span className="placa">Emilio Nualart · M14 Studio</span>
          <a href={`mailto:${contacto.emailEmilio}`}>{contacto.emailEmilio}</a>
        </div>
      </div>
    </footer>
  );
}

function Avance() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div className="ms-avance" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />;
}

export default function Propuesta() {
  return (
    <RevealProvider>
      <Avance />
      <a className="ms-logo" href="/" aria-label="M14 Studio">
        <img src="/brand/m14-cuadrado-negativo.svg" alt="" width={44} height={44} />
      </a>
      <main className="ms">
        <Portada />
        <LaIdea />
        <ElLugar />
        <LaHistoria />
        <LoQueViene />
        <ElFlujo />
        <ComoLoHacemos />
        <Pasos />
        <Cierre />
      </main>
    </RevealProvider>
  );
}
