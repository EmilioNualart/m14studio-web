import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { entregaDe } from "@/lib/entregas";
import "../entregas.css";

// Una página por entrega. El middleware exige la clave antes de mostrarla
// y los archivos salen de R2 con links firmados (/entregas/[slug]/archivo/N).
// Ruta dinámica → runtime edge, que es lo único que acepta Cloudflare Pages.
export const runtime = "edge";

export async function generateMetadata({ params }: PageProps<"/entregas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = entregaDe(slug);
  return {
    title: e ? `${e.proyecto} · Entrega | M14 Studio` : "Entrega | M14 Studio",
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    openGraph: {
      title: e ? `${e.cliente} · ${e.proyecto}` : "Entrega · M14 Studio",
      description: "Tu material está listo. Ingresa con la clave que te enviamos.",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

function fechaLarga(fecha: string) {
  return new Date(`${fecha}T12:00:00-03:00`).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Santiago",
  });
}

export default async function Entrega({ params }: PageProps<"/entregas/[slug]">) {
  const { slug } = await params;
  const entrega = entregaDe(slug);
  if (!entrega) notFound();

  const base = `/entregas/${entrega.slug}`;

  return (
    <main className="seccion-negro entrega">
      <header className="entrega-top">
        <a href="https://www.m14studio.com" aria-label="M14 Studio">
          <img src="/brand/m14-cuadrado-negativo.svg" alt="M14 Studio" width={56} height={56} />
        </a>
        <p className="placa entrega-fecha num">Entrega · {fechaLarga(entrega.fecha)}</p>
      </header>

      <section className="entrega-head">
        <p className="placa acento-negro">{entrega.cliente}</p>
        <h1 className="display">{entrega.proyecto}</h1>
        {entrega.nota && <p className="entrega-nota">{entrega.nota}</p>}
      </section>

      <ol className="entrega-archivos">
        {entrega.archivos.map((a, i) => (
          <li key={a.clave} className={`entrega-archivo ${a.formato ?? "horizontal"}`}>
            <div className="entrega-video">
              <video controls playsInline preload="metadata" src={`${base}/archivo/${i}#t=0.1`} />
            </div>
            <div className="entrega-info">
              <p className="placa num">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="display">{a.nombre}</h2>
              <p className="entrega-meta num">
                {[a.clave.split(".").pop()?.toUpperCase(), a.peso].filter(Boolean).join(" · ")}
              </p>
              <a className="btn-papel entrega-descargar" href={`${base}/archivo/${i}?descargar=1`}>
                <span className="placa">Descargar</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M10 3v12M5 10l5 5 5-5M4 18h12" />
                </svg>
              </a>
            </div>
          </li>
        ))}
      </ol>

      <footer className="entrega-pie">
        <p className="placa">M14 Studio · Productora audiovisual</p>
        <p className="entrega-pie-texto">
          {entrega.expira ? `Disponible hasta el ${fechaLarga(entrega.expira)}. ` : ""}
          ¿Dudas o cambios? Escríbenos a{" "}
          <a href="mailto:contacto@m14studio.com">contacto@m14studio.com</a>.
        </p>
      </footer>
    </main>
  );
}
