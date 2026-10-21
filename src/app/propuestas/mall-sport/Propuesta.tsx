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
  {
    n: "01", ini: 0, fin: 20, titulo: "Introducción",
    frase: "El mall ya es punto de encuentro.",
    muestra: ["Time lapse del mall con el flujo que pasa hoy", "Stock de ciclistas y de los deportes que se viven ahí", "Dron: ubicación, colegios y precordillera"],
    medios: ["Time lapse", "Stock", "Dron"],
  },
  {
    n: "02", ini: 20, fin: 35, titulo: "Evolución, no ruptura",
    frase: "Los espacios hoy vs. cómo van a quedar.",
    muestra: ["Grabación de cada espacio tal como está hoy", "Transición al mismo encuadre en el render", "El cambio animado con IA, toma a toma"],
    medios: ["Grabación", "Renders animados"],
  },
  {
    n: "03", ini: 35, fin: 80, titulo: "Lo que viene",
    frase: "Un recorrido por los espacios nuevos.",
    muestra: ["La Laguna, para almorzar y para la noche", "Galería Wellness junto a Happyland", "Terraza y hub ciclista, Centro Activo y La Arena"],
    medios: ["Renders animados"],
  },
  {
    n: "04", ini: 80, fin: 95, titulo: "El flujo",
    frase: "Quién llega y a qué hora.",
    muestra: ["Un día en el mall, de la mañana a la noche", "Familias, colegios, deportistas y vecinos", "Seguridad mostrada con imagen"],
    medios: ["Dron", "Grabación", "Stock"],
  },
  {
    n: "05", ini: 95, fin: 105, titulo: "Cierre",
    frase: "Un resumen que convence.",
    muestra: ["Repaso rápido de lo que mostramos", "La invitación a ser parte de la nueva etapa"],
    medios: ["Voz en off", "Música"],
  },
];
const DURACION = 105;

const espacios = [
  { nombre: "La Laguna", que: "Polo gastronómico: almuerzo, cena y happy hour", cifra: 2812, unidad: "m²", video: "De día y de noche, siempre con gente" },
  { nombre: "Galería Wellness", que: "Mujer y bienestar, junto a Happyland", cifra: 857, unidad: "m²", video: "Los niños juegan, la mamá vitrinea" },
  { nombre: "Terraza y hub ciclista", que: "La llegada desde la montaña", cifra: "7", unidad: "AM", video: "Del grupo de las 7 AM a la cerveza de vuelta" },
  { nombre: "Centro Activo", que: "Retail experiencial y muro de escalada", cifra: 867, unidad: "m²", video: "El corazón del mall, con activaciones" },
  { nombre: "La Arena", que: "Juego y competencia, niveles −1 y −2", cifra: 1260, unidad: "m²", video: "Cumpleaños, trampolines y videojuegos" },
];

// El flujo contado como un día: qué toma lo muestra en el video.
const momentos = [
  { ini: 7, fin: 8, quien: "Ciclistas", toma: "Dron siguiendo al grupo que sale a Farellones." },
  { ini: 8, fin: 10, quien: "Colegios", toma: "Dron sobre los accesos y los colegios del sector." },
  { ini: 12.5, fin: 15, quien: "Almuerzo", toma: "La Laguna llena a mediodía, en render animado." },
  { ini: 15, fin: 18, quien: "Familias", toma: "Niños a Happyland, la mamá a la Galería Wellness." },
  { ini: 19.5, fin: 23, quien: "Tercer tiempo", toma: "La Laguna de noche: cena y happy hour." },
];
const H_INI = 6;
const H_FIN = 24;

const materiales = [
  { titulo: "Stock y archivo de Mall Sport", para: "Mostrar la cultura del mall: deporte, montaña y comunidad." },
  { titulo: "Grabación y time lapse", para: "El mall hoy y el flujo que ya tiene." },
  { titulo: "Dron", para: "El flujo de gente del sector y la ubicación." },
  { titulo: "Renders animados con IA", para: "Lo que viene, y el antes y después de cada espacio." },
  { titulo: "Voz en off y música", para: "Narrar lo que las imágenes no pueden mostrar." },
];

// Carta Gantt estimada, en semanas.
const SEMANAS = 5;
const gantt = [
  { tarea: "Material de Mall Sport y renders", ini: 0, dur: 1 },
  { tarea: "Guion y voz en off", ini: 0.5, dur: 1 },
  { tarea: "Aprobación del guion", ini: 1.5, dur: 0.5, hito: true },
  { tarea: "Grabación, time lapse y dron", ini: 2, dur: 1 },
  { tarea: "Animación de renders con IA", ini: 2, dur: 2 },
  { tarea: "Montaje, música y color", ini: 3, dur: 1.5 },
  { tarea: "Revisión y ajustes", ini: 4.5, dur: 0.5, hito: true },
];

/* ============================================
   SECCIONES
   ============================================ */
function Intro({ placa, titulo, bajada, negro = false }: { placa: string; titulo: string; bajada: string; negro?: boolean }) {
  return (
    <div className="ms-intro">
      <p className={`placa reveal ${negro ? "acento-negro" : "acento-papel"}`}>{placa}</p>
      <h2 className="display ms-h2 reveal">{titulo}</h2>
      <p className="ms-bajada reveal">{bajada}</p>
    </div>
  );
}

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
        <span className="placa">Video de 1:45 · Para presentar a futuros arrendatarios</span>
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
        <p className="placa acento-papel">La idea del video</p>
        <p className="display ms-idea-frase">
          {palabras.map((w, i) => (
            <span key={i} style={{ opacity: 0.12 + 0.88 * clamp(k - i) }}>{w} </span>
          ))}
        </p>
        <p className="ms-idea-sub" style={{ opacity: clamp(k - palabras.length) }}>
          Un video de 1:45 que cuenta la remodelación como una historia, para que los futuros arrendatarios quieran ser parte.
        </p>
      </div>
    </section>
  );
}

function EnQueEnfatizar() {
  return (
    <section className="seccion-negro ms-seccion">
      <div className="ms-envoltura">
        <Intro
          negro
          placa="En qué ponemos el foco"
          titulo="Lo que el video tiene que dejar claro."
          bajada="Las fortalezas de Mall Sport que queremos poner en primer plano."
        />
        <dl className="ms-cifras">
          <div className="reveal"><dt className="display"><Cifra valor={5} /></dt><dd>colegios y una universidad alrededor: flujo asegurado</dd></div>
          <div className="reveal"><dt className="display"><Cifra valor={84} /></dt><dd>operadores y una cultura deportiva propia</dd></div>
          <div className="reveal"><dt className="display"><Cifra valor={43} sufijo="%" /></dt><dd>del público son mujeres: la nueva Galería Wellness</dd></div>
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
    <>
      <section className="ms-seccion ms-seccion-intro">
        <div className="ms-envoltura">
          <Intro
            placa="La historia"
            titulo="El video, acto por acto."
            bajada="Cinco actos en 1:45. Baja para recorrerlos: en cada uno, lo que se ve en pantalla."
          />
        </div>
      </section>
      <section ref={ref} className="ms-historia" aria-label="La historia en cinco actos">
        <div className="ms-fijo">
          <div className="ms-historia-cabeza">
            <p className="placa acento-papel">Acto {actos[idx].n} de 05</p>
            <p className="display ms-tiempo" aria-hidden="true">
              {tiempo}
              <span> / 1:45</span>
            </p>
          </div>

          <div className="ms-actos">
            {actos.map((a, i) => (
              <article key={a.n} className={`ms-acto${i === idx ? " activo" : ""}${i < idx ? " pasado" : ""}`}>
                <p className="placa">{a.n} · {a.titulo} · {Math.floor(a.ini / 60)}:{String(a.ini % 60).padStart(2, "0")}–{Math.floor(a.fin / 60)}:{String(a.fin % 60).padStart(2, "0")}</p>
                <h3 className="display">{a.frase}</h3>
                <div className="ms-muestra">
                  <p className="placa">Qué mostramos</p>
                  <ul>
                    {a.muestra.map((m) => <li key={m}>{m}</li>)}
                  </ul>
                </div>
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
    </>
  );
}

function LosEspacios() {
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
    <section ref={ref} className="seccion-negro ms-viene" aria-label="Los espacios del video">
      <div className="ms-fijo">
        <div className="ms-viene-cabeza">
          <p className="placa acento-negro">Los protagonistas</p>
          <h2 className="display ms-h2">Los cinco espacios que mostramos en el video.</h2>
        </div>
        <div ref={pista} className="ms-pista" style={{ transform: `translateX(${-p * recorrido}px)` }}>
          {espacios.map((e, i) => (
            <article key={e.nombre} className="ms-espacio">
              <div className="ms-espacio-arriba">
                <p className="placa">{String(i + 1).padStart(2, "0")}</p>
                <p className="display ms-espacio-cifra">
                  {typeof e.cifra === "number" ? <Cifra valor={e.cifra} /> : e.cifra}
                  <span>{e.unidad}</span>
                </p>
              </div>
              <div>
                <h3 className="display">{e.nombre}</h3>
                <p>{e.que}</p>
                <p className="ms-espacio-video">
                  <span className="placa">En el video</span>
                  {e.video}
                </p>
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
    <>
      <section className="ms-seccion ms-seccion-intro">
        <div className="ms-envoltura">
          <Intro
            placa="Cómo mostramos el flujo"
            titulo="El flujo, contado como un día."
            bajada="En vez de cifras en pantalla, seguimos un día en Mall Sport: cada hora tiene su toma."
          />
        </div>
      </section>
      <section ref={ref} className="ms-flujo" aria-label="Cómo mostramos el flujo">
        <div className="ms-fijo">
          <p className="placa acento-papel">Un día en Mall Sport</p>
          <div className="ms-flujo-centro">
            <p className="display ms-reloj" aria-hidden="true">
              {String(hh).padStart(2, "0")}:{String(h >= H_FIN ? 59 : mm).padStart(2, "0")}
            </p>
            <div className="ms-flujo-texto">
              {momentos.map((m) => (
                <div key={m.quien} className={`ms-momento${m === activo ? " activo" : ""}`}>
                  <h3 className="display">{m.quien}</h3>
                  <p><span className="placa">La toma</span>{m.toma}</p>
                </div>
              ))}
              {!activo && (
                <div className="ms-momento activo">
                  <h3 className="display">Amanece.</h3>
                  <p>Baja para avanzar el día.</p>
                </div>
              )}
            </div>
          </div>

          <div className="ms-dia" aria-hidden="true">
            <span className="ms-dia-avance" style={{ width: pos(h) }} />
            {momentos.map((m) => (
              <span
                key={m.quien}
                className={`ms-dia-tramo${h >= m.ini ? " encendido" : ""}`}
                style={{ left: pos(m.ini), width: `calc(${pos(m.fin)} - ${pos(m.ini)})` }}
              />
            ))}
            {[6, 12, 18, 24].map((x) => (
              <small key={x} style={{ left: pos(x) }}>{String(x === 24 ? 0 : x).padStart(2, "0")}:00</small>
            ))}
          </div>

          <p className="placa ms-seguridad" style={{ opacity: clamp(p * 4 - 3) }}>
            La seguridad también se ve: accesos, luz y gente.
          </p>
        </div>
      </section>
    </>
  );
}

function Materiales() {
  return (
    <section className="seccion-negro ms-seccion">
      <div className="ms-envoltura">
        <Intro
          negro
          placa="Cómo lo hacemos"
          titulo="Cada material tiene una función."
          bajada="Lo que usamos y para qué sirve dentro del video."
        />
        <ol className="ms-materiales">
          {materiales.map((x, i) => (
            <li key={x.titulo} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <span className="placa acento-negro">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display">{x.titulo}</h3>
              <p><span aria-hidden="true">→ </span>{x.para}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Tiempos() {
  const pct = (x: number) => `${(x / SEMANAS) * 100}%`;

  return (
    <section className="ms-seccion">
      <div className="ms-envoltura">
        <Intro
          placa="Tiempos estimados"
          titulo={`${SEMANAS} semanas, de los renders a la entrega.`}
          bajada="Carta Gantt estimada desde que recibimos el material."
        />
        <div className="ms-gantt" role="table" aria-label="Carta Gantt estimada">
          <div className="ms-gantt-fila ms-gantt-cabeza" role="row">
            <span role="columnheader" />
            <div className="ms-gantt-semanas">
              {Array.from({ length: SEMANAS }, (_, i) => (
                <span key={i} className="placa" role="columnheader">S{i + 1}</span>
              ))}
            </div>
          </div>
          {gantt.map((g, i) => (
            <div key={g.tarea} className="ms-gantt-fila reveal" role="row" style={{ "--i": i } as CSSProperties}>
              <span role="rowheader">{g.tarea}</span>
              <div className="ms-gantt-carril" role="cell">
                <span
                  className={`ms-gantt-barra${g.hito ? " hito" : ""}`}
                  style={{ left: pct(g.ini), width: pct(g.dur) }}
                />
              </div>
            </div>
          ))}
          <div className="ms-gantt-fila reveal" role="row" style={{ "--i": gantt.length } as CSSProperties}>
            <span role="rowheader"><strong>Entrega</strong></span>
            <div className="ms-gantt-carril" role="cell">
              <span className="ms-gantt-entrega" style={{ left: pct(SEMANAS) }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cierre() {
  return (
    <footer className="seccion-negro ms-cierre">
      <p className="display ms-cierre-frase reveal">
        Una nueva etapa merece una buena historia<span className="acento-negro">.</span>
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
        <EnQueEnfatizar />
        <LaHistoria />
        <LosEspacios />
        <ElFlujo />
        <Materiales />
        <Tiempos />
        <Cierre />
      </main>
    </RevealProvider>
  );
}
