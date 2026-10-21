import type { Metadata } from "next";
import FormularioClave from "./FormularioClave";
import "./acceso.css";

// Se muestra en la misma URL de la propuesta mientras no se ingrese la clave.
export const metadata: Metadata = {
  title: "Propuesta privada | M14 Studio",
  description: "Propuesta privada de M14 Studio.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    title: "Propuesta privada · M14 Studio",
    description: "Ingresa con la clave que te enviamos.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function Acceso() {
  return (
    <main className="seccion-negro acceso">
      <img src="/brand/m14-cuadrado-negativo.svg" alt="M14 Studio" width={64} height={64} />
      <div className="acceso-cuerpo">
        <p className="placa acento-negro">Propuesta privada</p>
        <h1 className="display">Ingresa la clave.</h1>
        <p className="acceso-texto">Esta propuesta es solo para su equipo. Ingresa con la clave que te enviamos.</p>
        <FormularioClave />
      </div>
      <p className="placa acceso-pie">M14 Studio · Productora audiovisual</p>
    </main>
  );
}
