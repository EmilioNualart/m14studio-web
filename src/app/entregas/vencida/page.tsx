import type { Metadata } from "next";
import "../../propuestas/acceso/acceso.css";

export const metadata: Metadata = {
  title: "Entrega vencida | M14 Studio",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function EntregaVencida() {
  return (
    <main className="seccion-negro acceso">
      <img src="/brand/m14-cuadrado-negativo.svg" alt="M14 Studio" width={64} height={64} />
      <div className="acceso-cuerpo">
        <p className="placa acento-negro">Entrega</p>
        <h1 className="display">Este link ya venció.</h1>
        <p className="acceso-texto">
          Si necesitas los archivos de nuevo, escríbenos a{" "}
          <a href="mailto:contacto@m14studio.com" style={{ textDecoration: "underline" }}>contacto@m14studio.com</a> y te mandamos un link nuevo.
        </p>
      </div>
      <p className="placa acceso-pie">M14 Studio · Productora audiovisual</p>
    </main>
  );
}
