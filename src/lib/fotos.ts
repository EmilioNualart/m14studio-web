export type CategoriaFoto = "moda" | "eventos" | "inmobiliario" | "outdoor";

export type Foto = { n: number; w: number; h: number };

export type Sesion = {
  slug: string;
  titulo: string;
  cliente?: string;
  categoria: CategoriaFoto;
  portada: number; // n de la foto que se usa de portada
  fotos: Foto[];
};

export const fotoSrc = (slug: string, n: number, small = false) => `/fotos/${slug}/${String(n).padStart(2, "0")}${small ? "-s" : ""}.webp`;

export const filtrosFotos = [
  { key: "all", label: "Todas" },
  { key: "moda", label: "Moda" },
  { key: "eventos", label: "Eventos" },
  { key: "inmobiliario", label: "Inmobiliario" },
  { key: "outdoor", label: "Outdoor" },
] as const;

export const categoriaLabel: Record<CategoriaFoto, string> = { moda: "Moda", eventos: "Eventos", inmobiliario: "Inmobiliario", outdoor: "Outdoor" };

// Orden = orden de aparición. Las sesiones nuevas van al INICIO.
export const sesiones: Sesion[] = [
  { slug: "saville-row", titulo: "Saville Row", cliente: "Saville Row", categoria: "moda", portada: 1, fotos: [{ n: 1, w: 2000, h: 1333 }, { n: 2, w: 1333, h: 2000 }, { n: 3, w: 1333, h: 2000 }, { n: 4, w: 1333, h: 2000 }, { n: 5, w: 1333, h: 2000 }, { n: 6, w: 2000, h: 1333 }, { n: 7, w: 2000, h: 1333 }] },
  { slug: "saville-row-rugby", titulo: "Rugby", cliente: "Saville Row", categoria: "moda", portada: 1, fotos: [{ n: 1, w: 1333, h: 2000 }, { n: 2, w: 1333, h: 2000 }, { n: 3, w: 1333, h: 2000 }, { n: 4, w: 2000, h: 1333 }, { n: 5, w: 1333, h: 2000 }] },
  { slug: "ochi-and-co", titulo: "Ochi and Co", cliente: "Ochi and Co", categoria: "moda", portada: 1, fotos: [{ n: 1, w: 1333, h: 2000 }, { n: 2, w: 1333, h: 2000 }, { n: 3, w: 1333, h: 2000 }, { n: 4, w: 1333, h: 2000 }, { n: 5, w: 1333, h: 2000 }] },
  { slug: "ecommerce", titulo: "E-commerce", cliente: "Ochi and Co", categoria: "moda", portada: 1, fotos: [{ n: 1, w: 1333, h: 2000 }, { n: 2, w: 1333, h: 2000 }, { n: 3, w: 1334, h: 2000 }, { n: 4, w: 1333, h: 2000 }, { n: 5, w: 1333, h: 2000 }, { n: 6, w: 1333, h: 2000 }, { n: 7, w: 1333, h: 2000 }, { n: 8, w: 1334, h: 2000 }, { n: 9, w: 1333, h: 2000 }, { n: 10, w: 1333, h: 2000 }, { n: 11, w: 1333, h: 2000 }, { n: 12, w: 1334, h: 2000 }] },
  { slug: "divergente", titulo: "Divergente", categoria: "moda", portada: 1, fotos: [{ n: 1, w: 1333, h: 2000 }, { n: 2, w: 1333, h: 2000 }, { n: 3, w: 1333, h: 2000 }, { n: 4, w: 2000, h: 1333 }, { n: 5, w: 1333, h: 2000 }, { n: 6, w: 1333, h: 2000 }, { n: 7, w: 1333, h: 2000 }, { n: 8, w: 1333, h: 2000 }, { n: 9, w: 1333, h: 2000 }] },
  { slug: "andpac", titulo: "Andpac", categoria: "moda", portada: 1, fotos: [{ n: 1, w: 1333, h: 2000 }, { n: 2, w: 1333, h: 2000 }, { n: 3, w: 1333, h: 2000 }, { n: 4, w: 1333, h: 2000 }, { n: 5, w: 1333, h: 2000 }, { n: 6, w: 1333, h: 2000 }, { n: 7, w: 1333, h: 2000 }, { n: 8, w: 1333, h: 2000 }, { n: 9, w: 1179, h: 762 }] },
  { slug: "eternamenteguapa", titulo: "Eternamenteguapa", categoria: "moda", portada: 1, fotos: [{ n: 1, w: 1333, h: 2000 }, { n: 2, w: 1600, h: 2000 }, { n: 3, w: 2000, h: 1333 }] },
  { slug: "hacienda-las-varas", titulo: "Hacienda Las Varas", cliente: "OSSO", categoria: "eventos", portada: 1, fotos: [{ n: 1, w: 1333, h: 2000 }, { n: 2, w: 2000, h: 1333 }, { n: 3, w: 2000, h: 1333 }, { n: 4, w: 2000, h: 1333 }, { n: 5, w: 2000, h: 1333 }, { n: 6, w: 2000, h: 1333 }, { n: 7, w: 2000, h: 1333 }, { n: 8, w: 2000, h: 1333 }, { n: 9, w: 2000, h: 1333 }] },
  { slug: "zoco", titulo: "ZOCO", categoria: "eventos", portada: 1, fotos: [{ n: 1, w: 2000, h: 1333 }, { n: 2, w: 2000, h: 1333 }, { n: 3, w: 2000, h: 1333 }, { n: 4, w: 2000, h: 1333 }, { n: 5, w: 2000, h: 1333 }, { n: 6, w: 2000, h: 1333 }, { n: 7, w: 2000, h: 1333 }, { n: 8, w: 2000, h: 1333 }, { n: 9, w: 2000, h: 1333 }, { n: 10, w: 2000, h: 1333 }, { n: 11, w: 2000, h: 1333 }, { n: 12, w: 2000, h: 1333 }, { n: 13, w: 2000, h: 1333 }] },
  { slug: "humana", titulo: "Humana", categoria: "eventos", portada: 1, fotos: [{ n: 1, w: 1333, h: 2000 }, { n: 2, w: 2000, h: 1333 }, { n: 3, w: 1333, h: 2000 }, { n: 4, w: 2000, h: 1333 }, { n: 5, w: 1333, h: 2000 }, { n: 6, w: 1333, h: 2000 }, { n: 7, w: 1333, h: 2000 }, { n: 8, w: 1333, h: 2000 }, { n: 9, w: 1333, h: 2000 }, { n: 10, w: 1333, h: 2000 }, { n: 11, w: 1333, h: 2000 }, { n: 12, w: 2000, h: 1333 }, { n: 13, w: 1333, h: 2000 }, { n: 14, w: 1333, h: 2000 }, { n: 15, w: 2000, h: 1333 }] },
  { slug: "real-estate", titulo: "Real Estate", categoria: "inmobiliario", portada: 1, fotos: [{ n: 1, w: 2000, h: 1333 }, { n: 2, w: 2000, h: 1333 }, { n: 3, w: 1333, h: 2000 }, { n: 4, w: 2000, h: 1333 }, { n: 5, w: 2000, h: 1333 }, { n: 6, w: 2000, h: 1333 }] },
  { slug: "invernada", titulo: "Invernada", categoria: "inmobiliario", portada: 1, fotos: [{ n: 1, w: 2000, h: 974 }, { n: 2, w: 2000, h: 872 }, { n: 3, w: 2000, h: 1333 }, { n: 4, w: 2000, h: 1333 }, { n: 5, w: 2000, h: 1333 }, { n: 6, w: 2000, h: 1333 }, { n: 7, w: 2000, h: 1333 }, { n: 8, w: 2000, h: 1333 }, { n: 9, w: 2000, h: 1333 }, { n: 10, w: 2000, h: 1333 }, { n: 11, w: 2000, h: 1333 }, { n: 12, w: 2000, h: 1333 }, { n: 13, w: 2000, h: 1333 }, { n: 14, w: 2000, h: 1333 }, { n: 15, w: 2000, h: 1333 }, { n: 16, w: 1333, h: 2000 }, { n: 17, w: 2000, h: 1333 }, { n: 18, w: 2000, h: 1333 }, { n: 19, w: 2000, h: 1333 }, { n: 20, w: 2000, h: 1333 }] },
  { slug: "andinismo", titulo: "Andinismo", categoria: "outdoor", portada: 1, fotos: [{ n: 1, w: 2000, h: 1333 }, { n: 2, w: 2000, h: 1333 }, { n: 3, w: 2000, h: 1333 }, { n: 4, w: 2000, h: 1333 }, { n: 5, w: 2000, h: 1333 }, { n: 6, w: 2000, h: 646 }, { n: 7, w: 2000, h: 1333 }, { n: 8, w: 2000, h: 1333 }, { n: 9, w: 2000, h: 1333 }, { n: 10, w: 1440, h: 1800 }, { n: 11, w: 1440, h: 1800 }] },
  { slug: "escalada", titulo: "Escalada", categoria: "outdoor", portada: 1, fotos: [{ n: 1, w: 1080, h: 1350 }, { n: 2, w: 1333, h: 2000 }, { n: 3, w: 2000, h: 1125 }, { n: 4, w: 2000, h: 1125 }, { n: 5, w: 2000, h: 1125 }, { n: 6, w: 1333, h: 2000 }, { n: 7, w: 2000, h: 1125 }, { n: 8, w: 2000, h: 1333 }, { n: 9, w: 2000, h: 1125 }, { n: 10, w: 2000, h: 1125 }] },
  { slug: "flyfishing", titulo: "Flyfishing", categoria: "outdoor", portada: 1, fotos: [{ n: 1, w: 2000, h: 1333 }, { n: 2, w: 2000, h: 1333 }, { n: 3, w: 2000, h: 1333 }, { n: 4, w: 2000, h: 1333 }, { n: 5, w: 2000, h: 1333 }, { n: 6, w: 2000, h: 1333 }, { n: 7, w: 2000, h: 1333 }, { n: 8, w: 2000, h: 1600 }, { n: 9, w: 2000, h: 1333 }, { n: 10, w: 2000, h: 1333 }, { n: 11, w: 1500, h: 2000 }, { n: 12, w: 1500, h: 2000 }, { n: 13, w: 1404, h: 2000 }, { n: 14, w: 1500, h: 2000 }, { n: 15, w: 2000, h: 1517 }] },
  { slug: "la-mulata", titulo: "La Mulata", categoria: "outdoor", portada: 1, fotos: [{ n: 1, w: 2000, h: 1123 }, { n: 2, w: 1333, h: 2000 }, { n: 3, w: 2000, h: 1333 }, { n: 4, w: 1333, h: 2000 }, { n: 5, w: 1333, h: 2000 }, { n: 6, w: 2000, h: 1333 }, { n: 7, w: 2000, h: 1333 }, { n: 8, w: 1333, h: 2000 }, { n: 9, w: 1333, h: 2000 }, { n: 10, w: 1333, h: 2000 }] },
  { slug: "nature", titulo: "Naturaleza", categoria: "outdoor", portada: 1, fotos: [{ n: 1, w: 2000, h: 1125 }, { n: 2, w: 1600, h: 2000 }, { n: 3, w: 2000, h: 1333 }, { n: 4, w: 1333, h: 2000 }, { n: 5, w: 1600, h: 2000 }, { n: 6, w: 2000, h: 1333 }, { n: 7, w: 1333, h: 2000 }] },
  { slug: "streetphotograpy", titulo: "Street photography", categoria: "outdoor", portada: 1, fotos: [{ n: 1, w: 2000, h: 1500 }, { n: 2, w: 2000, h: 1333 }, { n: 3, w: 2000, h: 1333 }, { n: 4, w: 1333, h: 2000 }] },
];
