import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_ACCESO, destinoSeguro, iguales, tokenDe } from "@/lib/acceso";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const clave = String(form.get("clave") ?? "");
  const destino = destinoSeguro(String(form.get("destino") ?? ""));
  const correcta = process.env.PROPUESTAS_CLAVE;

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
