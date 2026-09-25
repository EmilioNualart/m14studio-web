export type PortfolioItem = {
  title: string;
  category: "moda" | "publicidad" | "corporativo" | "eventos";
  videoId: string;
  thumb?: "hq";
};

export function getThumbUrl(item: PortfolioItem): string {
  const quality = item.thumb === "hq" ? "mqdefault" : "maxresdefault";
  return `https://img.youtube.com/vi/${item.videoId}/${quality}.jpg`;
}

// Orden = orden de aparición en el grid. Los videos nuevos van al INICIO de este array.
export const portfolioItems: PortfolioItem[] = [
  { title: "Echoes of the South", category: "moda", videoId: "KsT1Xe-5m9A" },
  { title: "Colección Otoño-Invierno II — Dinámica", category: "moda", videoId: "BOn7MyGUoAI" },
  { title: "Colección Otoño-Invierno — Dinámica", category: "moda", videoId: "hwsKufZDjcs" },
  { title: "LATAM X LA BIRRA BAR", category: "publicidad", videoId: "NChAK41oQZw" },
  { title: "Black and Sand — Saville Row", category: "moda", videoId: "2qByFoSHahI" },
  { title: "Guten Draft — Guten Brew", category: "publicidad", videoId: "uMBUVTyzXdA" },
  { title: "Bledford Residences", category: "corporativo", videoId: "NYUWsLpVlhQ" },
  { title: "Saville Row — Denim", category: "moda", videoId: "F6D0G5v2lB8" },
  { title: "La Birra Bar", category: "publicidad", videoId: "B4a6Ur85Rng" },
  { title: "EMG Carina", category: "moda", videoId: "e52eqE7NLTI" },
  { title: "Saville Row — Día de la Madre", category: "publicidad", videoId: "ehPwlTP4uvs" },
  { title: "BK Servicios Financieros", category: "corporativo", videoId: "ACM5XZTjt6o" },
  { title: "Ochi and Co", category: "moda", videoId: "GxtIgjfuSls" },
  { title: "EMG", category: "moda", videoId: "kAJUvbIvbYQ", thumb: "hq" },
  { title: "NARISSA", category: "moda", videoId: "4WeqGIVEQfI" },
  { title: "More Amor", category: "moda", videoId: "4Ja8VoRkUbk" },
  { title: "Fika", category: "publicidad", videoId: "sW-V_S2G1VY" },
  { title: "Capasite", category: "corporativo", videoId: "pZ17GkAcsR0" },
  { title: "OSSO", category: "eventos", videoId: "M5xpDkovSJY" },
  { title: "Valle Luna", category: "eventos", videoId: "z6nIPo5FPD4" },
  { title: "Guten Ice — Guten Brew", category: "publicidad", videoId: "nUlGNc_L2wI" },
  { title: "Colección RAICES — LUAU BRAND", category: "moda", videoId: "L_garDcBHmw" },
  { title: "Colección RAICES II — LUAU BRAND", category: "moda", videoId: "MPPfJsloCL0" },
  { title: "Colección RAICES III — LUAU BRAND", category: "moda", videoId: "Frqj0J17bdI" },
];

// Selección del home: orden por estándar, no por fecha. Lo que abre define lo que el cliente espera.
export const featuredIds = ["2qByFoSHahI", "BOn7MyGUoAI", "NChAK41oQZw", "e52eqE7NLTI", "GxtIgjfuSls", "NYUWsLpVlhQ"];

export const featuredMeta: Record<string, { titulo: string; cliente: string; categoria: string }> = {
  "2qByFoSHahI": { titulo: "Black and Sand", cliente: "Saville Row", categoria: "Moda" },
  "BOn7MyGUoAI": { titulo: "Otoño-Invierno II", cliente: "Dinámica", categoria: "Moda" },
  "NChAK41oQZw": { titulo: "Latam x La Birra", cliente: "La Birra Bar", categoria: "Publicidad" },
  "e52eqE7NLTI": { titulo: "Carina", cliente: "EMG", categoria: "Moda" },
  "GxtIgjfuSls": { titulo: "Ochi and Co", cliente: "Ochi and Co", categoria: "Moda" },
  "NYUWsLpVlhQ": { titulo: "Residences", cliente: "Bledford", categoria: "Inmobiliario" },
};

export const etapas = [
  { titulo: "Brief y concepto", desc: "Cerramos contigo qué se filma y para qué canal." },
  { titulo: "Guion narrativo y técnico", desc: "Cada plano decidido antes del set." },
  { titulo: "Plan y presupuesto", desc: "Plan de rodaje, carta Gantt y monto cerrado." },
  { titulo: "Rodaje", desc: "Una sola contraparte: nosotros." },
  { titulo: "Entrega", desc: "Primera versión a los 7 días hábiles. Tres tandas de corrección." },
];

export const lineasDeServicio = [
  {
    titulo: "Campañas de moda",
    desc: "Concepto, casting, rodaje y piezas por canal para cada temporada.",
    entregables: ["Film de campaña", "Cortes para redes", "Versiones verticales"],
    videoId: "hwsKufZDjcs",
    referencia: "Dinámica · Otoño-Invierno",
  },
  {
    titulo: "Publicidad",
    desc: "Spots para marcas y lanzamientos, con guion y plan cerrados antes de filmar.",
    entregables: ["Spot principal", "Versiones por canal", "Guion y storyboard"],
    videoId: "uMBUVTyzXdA",
    referencia: "Guten Brew · Guten Draft",
  },
  {
    titulo: "Corporativo e inmobiliario",
    desc: "Videos de empresa y de proyecto, con carta Gantt y fechas de revisión acordadas.",
    entregables: ["Video institucional", "Video de proyecto", "Cápsulas para redes"],
    videoId: "ACM5XZTjt6o",
    referencia: "BK Servicios Financieros",
  },
  {
    titulo: "Producción integral",
    desc: "Nos hacemos cargo de punta a punta, con una sola contraparte y presupuesto cerrado.",
    entregables: ["Casting y locaciones", "Equipo técnico externo", "Carta Gantt"],
    videoId: "F6D0G5v2lB8",
    referencia: "Saville Row · Denim",
  },
];

export const clientesQueVuelven = [
  { nombre: "Saville Row", nota: "6 proyectos en 2026" },
  { nombre: "EMG" },
  { nombre: "La Birra Bar" },
  { nombre: "Spot Essence" },
  { nombre: "Dinámica" },
];

export const equipo = [
  { nombre: "Emilio Nualart", rol: "Co-founder · Estrategia y clientes", foto: "/imagenes/Emilio.jpg" },
  { nombre: "Domingo Streeter", rol: "Co-founder · Dirección creativa", foto: "/imagenes/Domingo.jpg" },
  { nombre: "Lucas Chauriye", rol: "Productor ejecutivo · Finanzas", foto: "/imagenes/Lucas.jpg" },
  { nombre: "Mercedes Errázuriz", rol: "Productora ejecutiva", foto: null },
];

export const contacto = {
  email: "mercedeserrazuriz@m14studio.com",
  emailEmilio: "emilionualart@m14studio.com",
  direccion: "Francisco de Aguirre 3630, Santiago",
  instagram: "https://www.instagram.com/m14studio/",
  linkedin: "https://www.linkedin.com/company/145227039/",
};

// URL de la agenda (Cal.com o Google Calendar). Mientras esté vacía, el botón abre un correo a Mercedes.
export const BOOKING_URL = "";

// Legacy: lo usan componentes que ya no están en el home.
export const servicios = [
  { numero: "01", titulo: "Producción Publicitaria", desc: "Campañas cinematográficas desde concepto hasta post-producción." },
  { numero: "02", titulo: "Moda & Lifestyle", desc: "Editorial, lookbooks y campañas con dirección de arte impecable." },
  { numero: "03", titulo: "Contenido Corporativo", desc: "Videos institucionales que elevan tu identidad de marca." },
  { numero: "04", titulo: "Documentales", desc: "Narrativas auténticas con sensibilidad cinematográfica." },
  { numero: "05", titulo: "Cobertura de Eventos", desc: "Producción multi-cámara en festivales, conciertos y conferencias." },
  { numero: "06", titulo: "Post-Producción & VFX", desc: "Color grading, motion graphics y audio de nivel profesional." },
];

export const fundadores = [
  {
    nombre: "Emilio Nualart",
    rol: "Co-founder",
    bio: "Gestión estratégica y relaciones con clientes en Santiago y Barcelona. Transforma visiones en producciones audiovisuales de alto impacto.",
    foto: "/imagenes/Emilio.jpg",
  },
  {
    nombre: "Domingo Streeter",
    rol: "Co-founder",
    bio: "Dirección cinematográfica y visión creativa. Lidera la producción publicitaria y de moda de M14 Studio en Chile y España.",
    foto: "/imagenes/Domingo.jpg",
  },
  {
    nombre: "Lucas Chauriye",
    rol: "Productor Ejecutivo",
    bio: "Producción ejecutiva y coordinación de proyectos audiovisuales. Garantiza que cada rodaje en Santiago se ejecute con precisión y calidad.",
    foto: "/imagenes/Lucas.jpg",
  },
];

export const valores = [
  { titulo: "Pre-producción alineada", desc: "Trabajamos mano a mano contigo desde el día uno. Tu visión es nuestro punto de partida." },
  { titulo: "Tiempos de entrega", desc: "Cumplimos. Siempre. Porque entendemos que tu calendario es tan importante como el nuestro." },
  { titulo: "Vanguardia tecnológica", desc: "Integramos IA, nuevas cámaras y técnicas de post-producción de última generación." },
  { titulo: "Fácil trabajar con nosotros", desc: "Comunicación transparente, procesos claros, ambiente profesional pero humano." },
];

export const filterCategories = [
  { key: "all", label: "Todos" },
  { key: "moda", label: "Moda" },
  { key: "publicidad", label: "Publicidad" },
  { key: "corporativo", label: "Corporativo" },
  { key: "eventos", label: "Eventos" },
] as const;
