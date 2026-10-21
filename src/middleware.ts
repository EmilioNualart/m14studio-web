import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_ACCESO, destinoSeguro, iguales, tokenDe } from "@/lib/acceso";

// Se usa `middleware` (runtime edge) y no `proxy` (solo Node): Cloudflare Pages exige edge.
// Todo lo que está bajo /propuestas (páginas e imágenes) exige la clave.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const clave = process.env.PROPUESTAS_CLAVE;

  if (pathname === "/propuestas/acceso/entrar" && request.method === "POST") {
    return entrar(request, clave);
  }
  if (pathname.startsWith("/propuestas/acceso")) return NextResponse.next();

  const cookie = request.cookies.get(COOKIE_ACCESO)?.value;
  if (clave && cookie && iguales(cookie, await tokenDe(clave))) {
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "private, no-store");
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  // Archivos (imágenes): se niegan. Páginas: se muestra la pantalla de clave en la misma URL.
  if (/\.[a-z0-9]+$/i.test(pathname)) {
    return new NextResponse(null, { status: 401, headers: { "Cache-Control": "private, no-store" } });
  }
  const url = request.nextUrl.clone();
  url.pathname = "/propuestas/acceso";
  const res = NextResponse.rewrite(url);
  res.headers.set("Cache-Control", "private, no-store");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
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

export const config = {
  matcher: ["/propuestas/:path*"],
};
