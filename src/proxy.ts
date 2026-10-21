import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_ACCESO, iguales, tokenDe } from "@/lib/acceso";

// Todo lo que está bajo /propuestas (páginas e imágenes) exige la clave.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/propuestas/acceso")) return NextResponse.next();

  const clave = process.env.PROPUESTAS_CLAVE;
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

export const config = {
  matcher: ["/propuestas/:path*"],
};
