import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reunión agendada | M14 Studio",
  robots: { index: false, follow: false },
};

export default function Gracias() {
  return (
    <main
      className="seccion-negro"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "40px var(--gutter) 48px",
      }}
    >
      <Link href="/" aria-label="M14 Studio, inicio">
        <img src="/brand/m14-cuadrado-negativo.svg" alt="M14 Studio" style={{ width: 72, height: 72 }} />
      </Link>

      <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 820 }}>
        <p className="placa acento-negro">Reunión agendada</p>
        <h1 className="display" style={{ fontSize: "clamp(44px, 6vw, 88px)" }}>
          Nos vemos pronto.
        </h1>
        <p className="texto" style={{ opacity: 0.75 }}>
          Te llega la invitación a tu correo con el día, la hora y el enlace. Si necesitas moverla,
          puedes hacerlo desde esa misma invitación.
        </p>
      </div>

      <Link href="/" className="btn-papel" style={{ alignSelf: "flex-start", minWidth: 280 }}>
        <span className="placa">Volver al inicio</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 10h12M11 5l5 5-5 5" />
        </svg>
      </Link>
    </main>
  );
}
