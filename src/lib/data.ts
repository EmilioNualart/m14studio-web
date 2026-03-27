export type PortfolioItem = {
  title: string;
  category: "moda" | "publicidad" | "corporativo" | "eventos";
  videoId: string;
};

export const portfolioItems: PortfolioItem[] = [
  { title: "Saville Row — Denim", category: "moda", videoId: "F6D0G5v2lB8" },
  { title: "EMG", category: "moda", videoId: "kAJUvbIvbYQ" },
  { title: "Ochi and Co", category: "moda", videoId: "GxtIgjfuSls" },
  { title: "NARISSA", category: "moda", videoId: "4WeqGIVEQfI" },
  { title: "More Amor", category: "moda", videoId: "4Ja8VoRkUbk" },
  { title: "La Birra Bar", category: "publicidad", videoId: "B4a6Ur85Rng" },
  { title: "Fika", category: "publicidad", videoId: "sW-V_S2G1VY" },
  { title: "Saville Row — Día de la Madre", category: "publicidad", videoId: "ehPwlTP4uvs" },
  { title: "BK Servicios Financieros", category: "corporativo", videoId: "ACM5XZTjt6o" },
  { title: "Capasite", category: "corporativo", videoId: "pZ17GkAcsR0" },
  { title: "OSSO", category: "eventos", videoId: "M5xpDkovSJY" },
  { title: "Valle Luna", category: "eventos", videoId: "z6nIPo5FPD4" },
  { title: "Black and Sand — Saville Row", category: "moda", videoId: "2qByFoSHahI" },
  { title: "Bledford Residences", category: "corporativo", videoId: "NYUWsLpVlhQ" },
  { title: "EMG Carina", category: "moda", videoId: "e52eqE7NLTI" },
];

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
    bio: "Gestión estratégica y relaciones con clientes. Transforma visiones en realidades producibles.",
    foto: "/imagenes/Emilio.jpg",
  },
  {
    nombre: "Domingo Streeter",
    rol: "Co-founder",
    bio: "Visión creativa y dirección cinematográfica. Cada frame cuenta una historia.",
    foto: "/imagenes/Domingo.jpg",
  },
  {
    nombre: "Lucas Chauriye",
    rol: "Productor Ejecutivo",
    bio: "Producción ejecutiva y coordinación de proyectos. La logística se vuelve arte.",
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
