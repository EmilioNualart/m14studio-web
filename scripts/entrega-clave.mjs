// Clave de una entrega:  npm run entrega:clave -- luau-verano
// Lee ENTREGAS_SECRETO de .env.local (el mismo valor que en Cloudflare).
import { readFileSync } from "node:fs";

const slug = process.argv[2];
if (!slug) {
  console.error("Uso: npm run entrega:clave -- [slug]");
  process.exit(1);
}

let secreto = process.env.ENTREGAS_SECRETO;
if (!secreto) {
  try {
    const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    secreto = env.match(/^ENTREGAS_SECRETO=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "");
  } catch {}
}
if (!secreto) {
  console.error("Falta ENTREGAS_SECRETO en .env.local");
  process.exit(1);
}

// Misma lógica que src/lib/entregas-acceso.ts → claveDe()
const ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const enc = new TextEncoder();
const k = await crypto.subtle.importKey("raw", enc.encode(secreto), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", k, enc.encode(`m14-entrega-clave:${slug}`)));
const c = Array.from(bytes.slice(0, 8), (b) => ALFABETO[b % ALFABETO.length]).join("");

console.log(`\nLink:  https://www.m14studio.com/entregas/${slug}`);
console.log(`Clave: ${c.slice(0, 4)}-${c.slice(4)}\n`);
