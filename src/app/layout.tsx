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
  title: "M14 Studio | Productora Audiovisual Santiago & Barcelona",
  description: "Productora audiovisual con sede en Santiago, Chile y Barcelona, España. Producción publicitaria, moda, contenido corporativo, documentales, cobertura de eventos y post-producción VFX.",
  keywords: [
    "productora audiovisual Santiago",
    "productora audiovisual Chile",
    "producción publicitaria Chile",
    "video corporativo Santiago",
    "producción de moda Chile",
    "video publicitario Santiago",
    "productora audiovisual Barcelona",
    "post producción VFX",
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
    title: "M14 Studio | Productora Audiovisual Santiago & Barcelona",
    description: "Productora audiovisual con sede en Santiago, Chile y Barcelona, España. Producción publicitaria, moda, contenido corporativo, documentales y más.",
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
    title: "M14 Studio | Productora Audiovisual Santiago & Barcelona",
    description: "Productora audiovisual con sede en Santiago, Chile y Barcelona, España. Producción publicitaria, moda, contenido corporativo, documentales y más.",
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
  description: "Productora audiovisual con sede en Santiago, Chile y Barcelona, España.",
  email: "mercedeserrazuriz@m14studio.com",
  sameAs: ["https://www.instagram.com/m14studio"],
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Francisco de Aguirre 3630",
      addressLocality: "Santiago",
      addressCountry: "CL",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Barcelona",
      addressCountry: "ES",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios Audiovisuales",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Producción Publicitaria" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Moda & Lifestyle" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Contenido Corporativo" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Documentales" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cobertura de Eventos" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Post-Producción & VFX" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
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
