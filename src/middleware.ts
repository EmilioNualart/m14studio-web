import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_ACCESO, destinoSeguro, iguales, tokenDe } from "@/lib/acceso";
import { entregaDe, vencida } from "@/lib/entregas";
import * as entregaAcceso from "@/lib/entregas-acceso";
import { urlArchivo } from "@/lib/r2";

// Se usa `middleware` (runtime edge) y no `proxy` (solo Node): Cloudflare Pages exige edge.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/entregas")) return entregas(request);
  return propuestas(request);
}

const PRIVADO = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" };

function conCabeceras(res: NextResponse) {
  for (const [k, v] of Object.entries(PRIVADO)) res.headers.set(k, v);
  return res;
}

function reescribir(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  return conCabeceras(NextResponse.rewrite(url));
}

// Todo lo que está bajo /propuestas (páginas e imágenes) exige la clave.
async function propuestas(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const clave = process.env.PROPUESTAS_CLAVE;

  if (pathname === "/propuestas/acceso/entrar" && request.method === "POST") {
    return entrar(request, clave);
  }
  if (pathname.startsWith("/propuestas/acceso")) return NextResponse.next();

  const cookie = request.cookies.get(COOKIE_ACCESO)?.value;
  if (clave && cookie && iguales(cookie, await tokenDe(clave))) {
    return conCabeceras(NextResponse.next());
  }

  // Archivos (imágenes): se niegan. Páginas: se muestra la pantalla de clave en la misma URL.
  if (/\.[a-z0-9]+$/i.test(pathname)) {
    return new NextResponse(null, { status: 401, headers: { "Cache-Control": "private, no-store" } });
  }
  return reescribir(request, "/propuestas/acceso");
}

async function entrar(request: NextRequest, correcta: string | undefined) {
  const form = await request.formData();
  const clave = String(form.get("clave") ?? "");
  const destino = destinoSeguro(String(form.get("destino") ?? ""));

  const ok = !!correcta && iguales(await tokenDe(clave), await tokenDe(correcta));
  if (!ok) {
    // Pausa para frenar intentos en serie.
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.redirect(new URL(`${destino}?error=1`, request.url), 303);
  }

  const res = NextResponse.redirect(new URL(destino, request.url), 303);
  res.cookies.set(COOKIE_ACCESO, await tokenDe(correcta), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/propuestas",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

// /entregas/[slug]            → página de la entrega (exige la clave de esa entrega)
// /entregas/[slug]/entrar     → POST con la clave
// /entregas/[slug]/archivo/N  → redirige a un link firmado de R2 (?descargar=1 para bajarlo)
async function entregas(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const m = pathname.match(/^\/entregas\/([a-z0-9-]+)(?:\/(entrar|archivo\/(\d+)))?\/?$/);
  const entrega = m ? entregaDe(m[1]) : undefined;
  if (!m || !entrega) return NextResponse.next(); // pantallas de acceso o 404

  const secreto = process.env.ENTREGAS_SECRETO;
  const base = `/entregas/${entrega.slug}`;

  if (vencida(entrega)) return reescribir(request, "/entregas/vencida");

  if (m[2] === "entrar") {
    if (request.method !== "POST") return NextResponse.redirect(new URL(base, request.url), 303);
    const form = await request.formData();
    const clave = entregaAcceso.normalizar(String(form.get("clave") ?? ""));
    const ok = !!secreto && entregaAcceso.iguales(clave, await entregaAcceso.claveDe(secreto, entrega.slug));
    if (!ok) {
      await new Promise((r) => setTimeout(r, 800));
      return NextResponse.redirect(new URL(`${base}?error=1`, request.url), 303);
    }
    const res = NextResponse.redirect(new URL(base, request.url), 303);
    res.cookies.set(entregaAcceso.cookieDe(entrega.slug), await entregaAcceso.tokenDe(secreto, entrega.slug), {
      httpOnly: true,
      secure: request.nextUrl.protocol === "https:",
      sameSite: "lax",
      path: base,
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  }

  const cookie = request.cookies.get(entregaAcceso.cookieDe(entrega.slug))?.value;
  const dentro = !!secreto && !!cookie && entregaAcceso.iguales(cookie, await entregaAcceso.tokenDe(secreto, entrega.slug));

  if (m[2]?.startsWith("archivo")) {
    const archivo = entrega.archivos[Number(m[3])];
    if (!dentro || !archivo) return new NextResponse(null, { status: dentro ? 404 : 401, headers: PRIVADO });
    const nombre = `M14 - ${entrega.cliente} - ${archivo.nombre}.${archivo.clave.split(".").pop()}`;
    const url = await urlArchivo(archivo.clave, searchParams.has("descargar") ? { descargar: nombre } : {});
    if (!url) return new NextResponse("Falta configurar el almacenamiento.", { status: 503, headers: PRIVADO });
    return conCabeceras(NextResponse.redirect(url, 302));
  }

  if (dentro) return conCabeceras(NextResponse.next());
  return reescribir(request, "/entregas/acceso");
}

export const config = {
  matcher: ["/propuestas/:path*", "/entregas/:path*"],
};
