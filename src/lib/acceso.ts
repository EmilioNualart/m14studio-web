// Acceso con clave a /propuestas. La clave vive en la variable de entorno PROPUESTAS_CLAVE
// (Cloudflare → Settings → Variables). Sin la variable, nadie entra.
export const COOKIE_ACCESO = "m14_propuestas";
export const DESTINO_POR_DEFECTO = "/propuestas/mall-sport";

export async function tokenDe(clave: string) {
  const datos = new TextEncoder().encode(`m14-propuestas:${clave}`);
  const hash = await crypto.subtle.digest("SHA-256", datos);
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
}

// Comparación de tiempo constante para no filtrar la clave por tiempos de respuesta.
export function iguales(a: string, b: string) {
  if (a.length !== b.length) return false;
  let dif = 0;
  for (let i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return dif === 0;
}

// Solo se vuelve a una página de /propuestas; nunca a otro sitio.
export function destinoSeguro(destino: string) {
  return /^\/propuestas\/[a-z0-9-]+\/?$/.test(destino) && !destino.startsWith("/propuestas/acceso")
    ? destino
    : DESTINO_POR_DEFECTO;
}
