// Entregas de M14 a clientes: m14studio.com/entregas/[slug]
//
// Para agregar una:
//   1. Sube los videos al bucket R2 de entregas, en la carpeta [slug]/ (p. ej. luau-verano/horizontal.mp4).
//   2. Agrega la entrega acá abajo y haz push.
//   3. Saca la clave con:  npm run entrega:clave -- [slug]   y mándala al cliente junto al link.
//
// Ojo: el repo es público. Acá van solo nombres y rutas; los archivos viven en un bucket privado
// y la clave se deriva de ENTREGAS_SECRETO, que nunca se sube.

export type Archivo = {
  nombre: string; // lo que ve el cliente, p. ej. "Video horizontal 16:9"
  clave: string; // ruta dentro del bucket, p. ej. "luau-verano/horizontal.mp4"
  peso?: string; // p. ej. "312 MB"
  formato?: "horizontal" | "vertical" | "cuadrado";
};

export type Entrega = {
  slug: string;
  cliente: string;
  proyecto: string;
  fecha: string; // AAAA-MM-DD
  expira?: string; // AAAA-MM-DD, último día con acceso (opcional)
  nota?: string;
  archivos: Archivo[];
};

export const entregas: Entrega[] = [
  // {
  //   slug: "luau-verano",
  //   cliente: "Luau Shoes",
  //   proyecto: "Campaña de Verano",
  //   fecha: "2026-11-04",
  //   archivos: [
  //     { nombre: "Video horizontal 16:9", clave: "luau-verano/horizontal.mp4", peso: "310 MB", formato: "horizontal" },
  //     { nombre: "Video vertical 9:16", clave: "luau-verano/vertical.mp4", peso: "280 MB", formato: "vertical" },
  //   ],
  // },
];

export function entregaDe(slug: string) {
  return entregas.find((e) => e.slug === slug);
}

// Vencida desde el día siguiente a `expira` (hora de Chile aprox., UTC-3).
export function vencida(entrega: Entrega, ahora = new Date()) {
  if (!entrega.expira) return false;
  return ahora.getTime() > new Date(`${entrega.expira}T23:59:59-03:00`).getTime();
}
