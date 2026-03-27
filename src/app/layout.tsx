import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
  display: "swap",
  variable: "--font-inter",
});

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
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
