import type { Metadata } from "next";
import Propuesta from "./Propuesta";
import "./mall-sport.css";

// Propuesta privada: se comparte por link, no se indexa ni aparece en el menú.
export const metadata: Metadata = {
  title: "Mall Sport · Nueva etapa | M14 Studio",
  description: "Propuesta de video de M14 Studio para la nueva etapa de Mall Sport.",
  alternates: { canonical: "/propuestas/mall-sport" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "Mall Sport · Nueva etapa",
    description: "Propuesta de video de M14 Studio.",
    url: "https://www.m14studio.com/propuestas/mall-sport",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function MallSport() {
  return <Propuesta />;
}
