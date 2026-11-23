// Links firmados (AWS SigV4, query string) para leer archivos de un bucket R2 privado.
// Corre en edge: solo usa crypto.subtle. Variables de entorno (Cloudflare → Settings → Variables):
// R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET.

const enc = new TextEncoder();

function hex(buf: ArrayBuffer) {
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

async function sha256(texto: string) {
  return hex(await crypto.subtle.digest("SHA-256", enc.encode(texto)));
}

async function hmac(clave: ArrayBuffer | Uint8Array, texto: string) {
  const k = await crypto.subtle.importKey("raw", clave as BufferSource, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return crypto.subtle.sign("HMAC", k, enc.encode(texto));
}

// Codificación URI de SigV4: todo menos A-Z a-z 0-9 - _ . ~ (y "/" en la ruta).
function uri(texto: string, conBarra = false) {
  const cod = encodeURIComponent(texto).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
  return conBarra ? cod.replace(/%2F/g, "/") : cod;
}

export type Firma = {
  host: string;
  ruta: string; // "/bucket/clave/del/objeto"
  accessKeyId: string;
  secretAccessKey: string;
  region?: string;
  segundos?: number;
  fecha?: Date;
  extra?: Record<string, string>; // p. ej. response-content-disposition
};

export async function firmarUrl({
  host,
  ruta,
  accessKeyId,
  secretAccessKey,
  region = "auto",
  segundos = 60 * 60 * 12,
  fecha = new Date(),
  extra = {},
}: Firma) {
  const amzDate = fecha.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const dia = amzDate.slice(0, 8);
  const alcance = `${dia}/${region}/s3/aws4_request`;

  const params: Record<string, string> = {
    ...extra,
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": `${accessKeyId}/${alcance}`,
    "X-Amz-Date": amzDate,
    "X-Amz-Expires": String(segundos),
    "X-Amz-SignedHeaders": "host",
  };
  const query = Object.keys(params)
    .sort()
    .map((k) => `${uri(k)}=${uri(params[k])}`)
    .join("&");

  const rutaCodificada = uri(ruta, true);
  const canonica = ["GET", rutaCodificada, query, `host:${host}\n`, "host", "UNSIGNED-PAYLOAD"].join("\n");
  const aFirmar = ["AWS4-HMAC-SHA256", amzDate, alcance, await sha256(canonica)].join("\n");

  let k = await hmac(enc.encode(`AWS4${secretAccessKey}`), dia);
  k = await hmac(k, region);
  k = await hmac(k, "s3");
  k = await hmac(k, "aws4_request");
  const firma = hex(await hmac(k, aFirmar));

  return `https://${host}${rutaCodificada}?${query}&X-Amz-Signature=${firma}`;
}

// Link de lectura a un objeto del bucket de entregas. null si faltan variables.
export async function urlArchivo(clave: string, opciones: { descargar?: string } = {}) {
  const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET } = process.env;
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET) return null;

  const extra: Record<string, string> = {};
  if (opciones.descargar) {
    // Sin caracteres que Windows o macOS no aceptan en nombres de archivo.
    const nombre = opciones.descargar.replace(/[:]/g, "x").replace(/["\\/<>|?*]/g, "");
    extra["response-content-disposition"] = `attachment; filename="${nombre}"`;
  }
  return firmarUrl({
    host: `${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    ruta: `/${R2_BUCKET}/${clave}`,
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
    extra,
  });
}
