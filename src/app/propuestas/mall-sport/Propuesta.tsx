"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import RevealProvider from "@/components/providers/RevealProvider";
import { contacto } from "@/lib/data";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const img = (nombre: string) => `/propuestas/mall-sport/${nombre}.webp`;
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

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
function Cifra({ valor, sufijo = "" }: { valor: number; sufijo?: string }) {
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
      {n.toLocaleString("es-CL")}
      {sufijo}
    </span>
  );
}

/* ============================================
   CONTENIDO
   ============================================ */
const foco = [
  { cifra: 5, sufijo: "", texto: "colegios y una universidad alrededor: flujo asegurado", foto: "hoy-centro" },
  { cifra: 84, sufijo: "", texto: "operadores y una cultura deportiva propia", foto: "hoy-arena" },
  { cifra: 43, sufijo: "%", texto: "del público son mujeres: la nueva Galería Wellness", foto: "wellness-interior" },
  { cifra: 11, sufijo: "", texto: "tiendas de ciclismo: el nuevo hub ciclista, con servicio y terraza", foto: "hub-ciclista" },
];

const actos = [
  {
    n: "01", ini: 0, fin: 20, titulo: "Introducción",
    frase: "El mall ya es punto de encuentro.",
    muestra: ["Time lapse del mall con el flujo que pasa hoy", "Stock de ciclistas y de los deportes que se viven ahí", "Dron: ubicación, colegios y precordillera"],
    medios: ["Time lapse", "Stock", "Dron"],
    fotos: ["hoy-laguna"],
  },
  {
    n: "02", ini: 20, fin: 35, titulo: "Evolución, no ruptura",
    frase: "Los espacios hoy vs. cómo van a quedar.",
    muestra: ["Grabación de cada espacio tal como está hoy", "Transición al mismo encuadre en el render", "El cambio animado con IA, toma a toma"],
    medios: ["Grabación", "Renders animados"],
    fotos: ["hoy-centro", "centro-activo"],
  },
  {
    n: "03", ini: 35, fin: 80, titulo: "Lo que viene",
    frase: "Un recorrido por los espacios nuevos.",
    muestra: ["La Laguna, para almorzar y para la noche", "Galería Wellness junto a Happyland", "Terraza y hub ciclista, Centro Activo y La Arena"],
    medios: ["Renders animados"],
    fotos: ["laguna-dia", "wellness-interior", "hub-ciclista", "centro-activo-islas", "arena-trampolines"],
  },
  {
    n: "04", ini: 80, fin: 95, titulo: "El flujo",
    frase: "Quién llega y a qué hora.",
    muestra: ["Un día en el mall, de la mañana a la noche", "Familias, colegios, deportistas y vecinos", "Seguridad mostrada con imagen"],
    medios: ["Dron", "Grabación", "Stock"],
    fotos: ["arena"],
  },
  {
    n: "05", ini: 95, fin: 105, titulo: "Cierre",
    frase: "Un resumen que convence.",
    muestra: ["Repaso rápido de lo que mostramos", "La invitación a ser parte de la nueva etapa"],
    medios: ["Voz en off", "Música"],
    fotos: ["laguna-noche"],
  },
];
const DURACION = 105;

const comparaciones = [
  { nombre: "La Laguna", hoy: "hoy-laguna", manana: "laguna-dia" },
  { nombre: "Zona central", hoy: "hoy-centro", manana: "centro-activo" },
  { nombre: "Happyland → Wellness", hoy: "hoy-happyland", manana: "wellness-fachada" },
  { nombre: "Nivel −1 → La Arena", hoy: "hoy-arena", manana: "arena" },
];

const espacios = [
  { nombre: "La Laguna", que: "Polo gastronómico: almuerzo, cena y happy hour", cifra: 2812, unidad: "m²", video: "De día y de noche, siempre con gente", foto: "laguna-noche" },
  { nombre: "Galería Wellness", que: "Mujer y bienestar, junto a Happyland", cifra: 857, unidad: "m²", video: "Los niños juegan, la mamá vitrinea", foto: "wellness-fachada" },
  { nombre: "Terraza y hub ciclista", que: "Servicio, bicicleteros y terraza", cifra: 11, unidad: "tiendas", video: "Arreglar la bici y quedarse a comer", foto: "hub-ciclista" },
  { nombre: "Centro Activo", que: "Retail experiencial y muro de escalada", cifra: 867, unidad: "m²", video: "El corazón del mall, con activaciones", foto: "centro-activo" },
  { nombre: "La Arena", que: "Juego y competencia, niveles −1 y −2", cifra: 1260, unidad: "m²", video: "Cumpleaños, trampolines y videojuegos", foto: "arena-trampolines" },
];

const materiales = [
  { titulo: "Stock y archivo de Mall Sport", para: "Mostrar la cultura del mall: deporte, montaña y comunidad." },
  { titulo: "Grabación y time lapse", para: "El mall hoy y el flujo que ya tiene." },
  { titulo: "Dron", para: "El flujo de gente del sector y la ubicación." },
  { titulo: "Renders animados con IA", para: "Lo que viene, y el antes y después de cada espacio." },
  { titulo: "Voz en off y música", para: "Narrar lo que las imágenes no pueden mostrar." },
];

// Carta Gantt: 3 tramos antes de los renders + 10 días hábiles desde que llegan.
const PRE = 3;
const DIAS = 10;
const TOTAL = PRE + DIAS;
const tareas = [
  { tarea: "Grabación de planos, time lapse y dron", ini: 0, dur: 2, det: "Apenas se confirma la propuesta, sin esperar los renders." },
  { tarea: "Guion y escaleta de la voz en off", ini: 1, dur: 2, det: "Queda aprobado mientras se terminan los renders." },
  { tarea: "Llegan los renders finales", ini: PRE, dur: 0, det: "Desde aquí corren los 10 días hábiles.", hito: true },
  { tarea: "Animación de renders con IA", ini: PRE, dur: 5, det: "Todas las tomas animadas, del día 1 al 5." },
  { tarea: "Edición con el material grabado", ini: PRE, dur: 5, det: "El corte se arma en paralelo a la animación." },
  { tarea: "Voz en off", ini: PRE, dur: 5, det: "Locución grabada sobre el guion aprobado." },
  { tarea: "Unión de todo: montaje, música y color", ini: PRE + 5, dur: 5, det: "Juntamos animación, grabación y voz. Incluye revisión." },
  { tarea: "Video terminado", ini: TOTAL, dur: 0, det: "Día hábil 10 desde los renders.", hito: true },
];

/* ============================================
   PIEZAS
   ============================================ */
function Intro({ placa, titulo, bajada }: { placa: string; titulo: string; bajada: string }) {
  return (
    <div className="ms-intro">
      <p className="placa ms-acento reveal">{placa}</p>
      <h2 className="display ms-h2 reveal">{titulo}</h2>
      <p className="ms-bajada reveal">{bajada}</p>
    </div>
  );
}

// Antes y después: la capa del render se recorta según `corte` (0–100).
function Comparar({ hoy, manana, corte }: { hoy: string; manana: string; corte: number }) {
  return (
    <div className="ms-comparar">
      <img src={img(hoy)} alt="El espacio hoy" />
      <img src={img(manana)} alt="El espacio según el render" style={{ clipPath: `inset(0 0 0 ${corte}%)` }} />
      <span className="ms-comparar-linea" style={{ left: `${corte}%` }} />
      <span className="placa ms-etiqueta izq" style={{ opacity: corte > 12 ? 1 : 0 }}>Hoy</span>
      <span className="placa ms-etiqueta der" style={{ opacity: corte < 88 ? 1 : 0 }}>Render</span>
    </div>
  );
}

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
    <header className="ms-portada tono-negro">
      <img
        className="ms-portada-foto"
        src={img("laguna-terraza")}
        alt=""
        style={{ transform: `translateY(${y * 0.3}px) scale(1.08)` }}
      />
      <div className="ms-portada-velo" />
      <div className="ms-portada-contenido">
        <p className="placa ms-entra" style={{ "--d": "0.1s" } as CSSProperties}>Propuesta de video · Octubre 2026</p>
        <h1 className="display">
          <span className="ms-linea"><span style={{ "--d": "0.25s" } as CSSProperties}>Mall Sport,</span></span>
          <span className="ms-linea"><span style={{ "--d": "0.4s" } as CSSProperties}>nueva <em className="ms-acento">etapa.</em></span></span>
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
    <section ref={ref} className="ms-idea tono-papel" aria-label="La idea">
      <div className="ms-fijo">
        <p className="placa ms-acento">La idea del video</p>
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
    <section className="tono-negro ms-seccion">
      <div className="ms-envoltura">
        <Intro
          placa="En qué ponemos el foco"
          titulo="Lo que el video tiene que dejar claro."
          bajada="Las fortalezas de Mall Sport que queremos poner en primer plano."
        />
        <div className="ms-foco">
          {foco.map((f, i) => (
            <figure key={f.foto} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="ms-marco"><img src={img(f.foto)} alt="" loading="lazy" /></div>
              <figcaption>
                <strong className="display ms-acento"><Cifra valor={f.cifra} sufijo={f.sufijo} /></strong>
                <span>{f.texto}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function LaHistoria() {
  const [ref, p] = useProgreso<HTMLElement>();
  const t = p * DURACION;
  const actual = actos.findIndex((a) => t < a.fin);
  const idx = actual === -1 ? actos.length - 1 : actual;
  const acto = actos[idx];
  const local = clamp((t - acto.ini) / (acto.fin - acto.ini));

  return (
    <>
      <section className="ms-seccion ms-seccion-intro tono-papel">
        <div className="ms-envoltura">
          <Intro
            placa="La historia"
            titulo="El video, acto por acto."
            bajada="Cinco actos en 1:45. Baja para recorrerlos: en cada uno, lo que se ve en pantalla."
          />
        </div>
      </section>
      <section ref={ref} className="ms-historia tono-papel" aria-label="La historia en cinco actos">
        <div className="ms-fijo">
          <div className="ms-historia-cabeza">
            <p className="placa ms-acento">Acto {acto.n} de 05</p>
            <p className="display ms-tiempo" aria-hidden="true">
              {mmss(t)}
              <span> / 1:45</span>
            </p>
          </div>

          <div className="ms-historia-cuerpo">
            <div className="ms-actos">
              {actos.map((a, i) => (
                <article key={a.n} className={`ms-acto${i === idx ? " activo" : ""}${i < idx ? " pasado" : ""}`}>
                  <p className="placa">{a.n} · {a.titulo} · {mmss(a.ini)}–{mmss(a.fin)}</p>
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

            <div className="ms-pantalla" aria-hidden="true">
              {actos.map((a, i) => {
                const visible = i === idx;
                if (a.fotos.length === 2) {
                  return (
                    <div key={a.n} className={`ms-capa${visible ? " activo" : ""}`}>
                      <Comparar hoy={a.fotos[0]} manana={a.fotos[1]} corte={visible ? 100 - clamp(local * 1.4) * 100 : 100} />
                    </div>
                  );
                }
                const f = Math.min(a.fotos.length - 1, Math.floor(local * a.fotos.length));
                return a.fotos.map((foto, j) => (
                  <div key={a.n + foto} className={`ms-capa${visible && j === f ? " activo" : ""}`}>
                    <img src={img(foto)} alt="" style={{ transform: `scale(${1.04 + (visible ? local * 0.08 : 0)})` }} />
                  </div>
                ));
              })}
              <span className="placa ms-pantalla-tc">{mmss(t)}</span>
            </div>
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

function AntesDespues() {
  const [sel, setSel] = useState(0);
  const [corte, setCorte] = useState(50);
  const c = comparaciones[sel];

  return (
    <section className="tono-negro ms-seccion">
      <div className="ms-envoltura">
        <Intro
          placa="El antes y el después"
          titulo="Del espacio de hoy al render."
          bajada="Arrastra para comparar. En el video, esta transición va animada con IA."
        />
        <div className="ms-tabs reveal" role="tablist">
          {comparaciones.map((x, i) => (
            <button
              key={x.nombre}
              role="tab"
              aria-selected={i === sel}
              className="placa"
              onClick={() => { setSel(i); setCorte(50); }}
            >
              {x.nombre}
            </button>
          ))}
        </div>
        <div className="ms-comparador reveal">
          <Comparar hoy={c.hoy} manana={c.manana} corte={corte} />
          <span className="ms-tirador" style={{ left: `${corte}%` }} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 5l-5 5 5 5M13 5l5 5-5 5" /></svg>
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={corte}
            onChange={(e) => setCorte(Number(e.target.value))}
            aria-label={`Comparar ${c.nombre}: hoy y render`}
          />
        </div>
        <p className="ms-fuente reveal">Imágenes: estado actual y renders conceptuales del Master Plan de renovación.</p>
      </div>
    </section>
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
    <section ref={ref} className="tono-papel ms-viene" aria-label="Los espacios del video">
      <div className="ms-fijo">
        <div className="ms-viene-cabeza">
          <p className="placa ms-acento">Los protagonistas</p>
          <h2 className="display ms-h2">Los cinco espacios que mostramos en el video.</h2>
        </div>
        <div ref={pista} className="ms-pista" style={{ transform: `translateX(${-p * recorrido}px)` }}>
          {espacios.map((e, i) => (
            <article key={e.nombre} className="ms-espacio">
              <div className="ms-marco">
                <img src={img(e.foto)} alt="" loading="lazy" />
                <span className="placa">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="ms-espacio-cuerpo">
                <p className="display ms-espacio-cifra ms-acento">
                  <Cifra valor={e.cifra} />
                  <span>{e.unidad}</span>
                </p>
                <h3 className="display">{e.nombre}</h3>
                <p>{e.que}</p>
                <p className="ms-espacio-video">
                  <span className="placa ms-acento">En el video</span>
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

function Materiales() {
  return (
    <section className="tono-negro ms-seccion">
      <div className="ms-envoltura">
        <Intro
          placa="Cómo lo hacemos"
          titulo="Cada material tiene una función."
          bajada="Lo que usamos y para qué sirve dentro del video."
        />
        <ol className="ms-materiales">
          {materiales.map((x, i) => (
            <li key={x.titulo} className="reveal">
              <span className="placa ms-acento">{String(i + 1).padStart(2, "0")}</span>
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
  const [ref, p] = useProgreso<HTMLElement>();
  const [fija, setFija] = useState<number | null>(null);
  const [sobre, setSobre] = useState<number | null>(null);
  const x = p * TOTAL;
  const pct = (v: number) => `${(v / TOTAL) * 100}%`;
  const dia = Math.min(DIAS, Math.max(1, Math.ceil(x - PRE)));
  const fin = x >= TOTAL - 0.01;
  const enCurso = tareas.filter((g) => !g.hito && x >= g.ini && x < g.ini + g.dur);
  const elegida = sobre ?? fija;

  return (
    <>
      <section className="ms-seccion ms-seccion-intro tono-papel">
        <div className="ms-envoltura">
          <Intro
            placa="Tiempos"
            titulo="Video terminado 10 días hábiles después de los renders."
            bajada="Grabamos el mall apenas se confirma la propuesta. Así, cuando llegan los renders finales, solo queda animar, editar y unir."
          />
        </div>
      </section>
      <section ref={ref} className="ms-tiempos tono-papel" aria-label="Carta Gantt">
        <div className="ms-fijo">
          <div className="ms-gantt-estado">
            <div>
              <p className="placa ms-acento">{x < PRE ? "Antes de los renders" : fin ? "Entrega" : "Desde los renders"}</p>
              <p className="display ms-gantt-dia">
                {x < PRE ? "Al confirmar" : <>Día {dia}<span> / {DIAS}</span></>}
              </p>
            </div>
            <p className="ms-gantt-detalle">
              {elegida !== null
                ? <><strong>{tareas[elegida].tarea}.</strong> {tareas[elegida].det}</>
                : fin
                  ? "Video terminado."
                  : enCurso.map((g) => g.tarea).join(" · ")}
            </p>
          </div>

          <div className="ms-gantt">
            <div className="ms-gantt-fila ms-gantt-cabeza" aria-hidden="true">
              <span />
              <span className="ms-gantt-carril">
                <span className="ms-gantt-pre placa" style={{ width: pct(PRE) }}>Al confirmar</span>
                {Array.from({ length: DIAS }, (_, i) => (
                  <span key={i} className="ms-gantt-num" style={{ left: pct(PRE + i), width: pct(1) }}>{i + 1}</span>
                ))}
              </span>
            </div>
            {tareas.map((g, i) => {
              const estado = g.hito ? (x >= g.ini ? "hecho" : "pendiente") : x >= g.ini + g.dur ? "hecho" : x >= g.ini ? "curso" : "pendiente";
              return (
                <button
                  key={g.tarea}
                  type="button"
                  className={`ms-gantt-fila ${estado}${elegida === i ? " elegida" : ""}`}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setSobre(i)}
                  onPointerLeave={() => setSobre(null)}
                  onClick={() => setFija(fija === i ? null : i)}
                  aria-pressed={fija === i}
                >
                  <span className="ms-gantt-tarea">{g.tarea}</span>
                  <span className="ms-gantt-carril">
                    <span className="ms-gantt-sombra" style={{ width: pct(PRE) }} />
                    {g.hito ? (
                      <span className="ms-gantt-hito" style={{ left: pct(g.ini) }} />
                    ) : (
                      <span className="ms-gantt-barra" style={{ left: pct(g.ini), width: pct(g.dur) }}>
                        <span style={{ transform: `scaleX(${clamp((x - g.ini) / g.dur)})` }} />
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
            <div className="ms-gantt-fila ms-gantt-guia" aria-hidden="true">
              <span />
              <span className="ms-gantt-carril">
                <span className="ms-gantt-cursor" style={{ left: pct(x) }} />
              </span>
            </div>
          </div>
          <p className="placa ms-gantt-ayuda">Baja para avanzar · Toca una tarea para ver el detalle</p>
        </div>
      </section>
    </>
  );
}

function Cierre() {
  return (
    <footer className="tono-papel ms-cierre">
      <p className="display ms-cierre-frase reveal">
        Una nueva etapa merece una buena historia<span className="ms-acento">.</span>
      </p>
      <div className="ms-cierre-pie">
        <img src="/brand/m14-cuadrado.svg" alt="M14 Studio" width={56} height={56} />
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
        <AntesDespues />
        <LosEspacios />
        <Materiales />
        <Tiempos />
        <Cierre />
      </main>
    </RevealProvider>
  );
}
