import type { Metadata } from "next";
import FormularioEntrega from "./FormularioEntrega";
import "../../propuestas/acceso/acceso.css";

// Se muestra en la misma URL de la entrega mientras no se ingrese la clave.
export const metadata: Metadata = {
  title: "Entrega | M14 Studio",
  description: "Entrega privada de M14 Studio.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    title: "Entrega · M14 Studio",
    description: "Tu material está listo. Ingresa con la clave que te enviamos.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function AccesoEntrega() {
  return (
    <main className="seccion-negro acceso">
      <img src="/brand/m14-cuadrado-negativo.svg" alt="M14 Studio" width={64} height={64} />
      <div className="acceso-cuerpo">
        <p className="placa acento-negro">Entrega</p>
        <h1 className="display">Tu material está listo.</h1>
        <p className="acceso-texto">Ingresa con la clave que te enviamos para ver y descargar los archivos.</p>
        <FormularioEntrega />
      </div>
      <p className="placa acceso-pie">M14 Studio · Productora audiovisual</p>
    </main>
  );
}
