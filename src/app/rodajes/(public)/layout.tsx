import Link from "next/link";
import type { Metadata } from "next";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Rodajes | M14 Studio",
  description: "Calendario y detalle de los rodajes próximos de M14 Studio.",
  robots: { index: false, follow: false },
};

export default function PublicRodajesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white antialiased font-[var(--font-inter)]">
      <CustomCursor />
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/rodajes"
            className="text-sm font-light tracking-widest uppercase"
          >
            M14 · Rodajes
          </Link>
          <nav className="flex items-center gap-6 text-xs uppercase tracking-wider text-white/60">
            <Link href="/rodajes" className="hover:text-white transition">
              Lista
            </Link>
            <Link
              href="/rodajes/calendario"
              className="hover:text-white transition"
            >
              Calendario
            </Link>
            <Link
              href="/rodajes/admin"
              className="hover:text-white transition"
            >
              Admin
            </Link>
            <Link
              href="/"
              className="text-white/40 hover:text-white transition"
            >
              ← Sitio
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
