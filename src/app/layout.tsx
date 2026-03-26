import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "M14 Studio | Productora Audiovisual",
  description: "Productora audiovisual con sede en Santiago, Chile y Barcelona, España. Producción publicitaria, moda, contenido corporativo, documentales y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
