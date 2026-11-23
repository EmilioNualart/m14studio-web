// Clave de cada entrega: se deriva del slug con ENTREGAS_SECRETO (Cloudflare → Settings → Variables).
// No se guarda en ningún lado: se calcula igual al validar y al generarla (npm run entrega:clave).

const ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin I, O, 0, 1 para que no se confundan

async function hmac(secreto: string, texto: string) {
  const enc = new TextEncoder();
  const k = await crypto.subtle.importKey("raw", enc.encode(secreto), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", k, enc.encode(texto)));
}

// 8 caracteres, se muestra como "ABCD-EFGH".
export async function claveDe(secreto: string, slug: string) {
  const bytes = await hmac(secreto, `m14-entrega-clave:${slug}`);
  const c = Array.from(bytes.slice(0, 8), (b) => ALFABETO[b % ALFABETO.length]).join("");
  return `${c.slice(0, 4)}-${c.slice(4)}`;
}

// Acepta la clave con o sin guion, en minúsculas o con espacios.
export function normalizar(clave: string) {
  const c = clave.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return c.length === 8 ? `${c.slice(0, 4)}-${c.slice(4)}` : c;
}

// Valor de la cookie de acceso (distinto de la clave, para no guardarla en el navegador).
export async function tokenDe(secreto: string, slug: string) {
  const bytes = await hmac(secreto, `m14-entrega-cookie:${slug}`);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function cookieDe(slug: string) {
  return `m14_entrega_${slug.replace(/[^a-z0-9]/g, "_")}`;
}

export function iguales(a: string, b: string) {
  if (a.length !== b.length) return false;
  let dif = 0;
  for (let i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return dif === 0;
}
