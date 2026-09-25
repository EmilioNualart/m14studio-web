import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-inter",
});

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "M14 Studio | Productora Audiovisual en Santiago",
  description: "Productora audiovisual en Santiago de Chile. Nos hacemos cargo del proyecto completo: concepto, rodaje y entrega, con la preproducción cerrada antes del rodaje.",
  keywords: [
    "productora audiovisual Santiago",
    "productora audiovisual Chile",
    "producción publicitaria Chile",
    "video corporativo Santiago",
    "producción de moda Chile",
    "video publicitario Santiago",
    "producción audiovisual inmobiliaria",
    "M14 Studio",
  ],
  authors: [{ name: "M14 Studio" }],
  metadataBase: new URL("https://www.m14studio.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.m14studio.com",
    title: "M14 Studio | Productora Audiovisual en Santiago",
    description: "Productora audiovisual en Santiago de Chile. Nos hacemos cargo del proyecto completo: concepto, rodaje y entrega, con la preproducción cerrada antes del rodaje.",
    siteName: "M14 Studio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "M14 Studio - Productora Audiovisual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "M14 Studio | Productora Audiovisual en Santiago",
    description: "Productora audiovisual en Santiago de Chile. Nos hacemos cargo del proyecto completo: concepto, rodaje y entrega, con la preproducción cerrada antes del rodaje.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoProductionCompany",
  name: "M14 Studio",
  url: "https://www.m14studio.com",
  logo: "https://www.m14studio.com/icon.png",
  description: "Productora audiovisual en Santiago de Chile. Nos hacemos cargo del proyecto completo: concepto, rodaje y entrega, con la preproducción cerrada antes del rodaje.",
  email: "mercedeserrazuriz@m14studio.com",
  sameAs: ["https://www.instagram.com/m14studio", "https://www.linkedin.com/company/145227039/"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Francisco de Aguirre 3630",
    addressLocality: "Santiago",
    addressCountry: "CL",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios Audiovisuales",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Campañas de moda" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Publicidad" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporativo e inmobiliario" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Producción integral" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${archivo.variable}`}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18068665074" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18068665074');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
