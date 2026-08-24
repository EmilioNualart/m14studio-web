import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Rodajes | M14 Studio",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-zone min-h-screen bg-neutral-50 text-neutral-900 antialiased font-[var(--font-inter)]">
      {/* Override del cursor: none global. En admin queremos cursor del sistema
          para que inputs muestren I-beam, botones pointer, etc. */}
      <style>{`
        .admin-zone, .admin-zone * { cursor: auto !important; }
        .admin-zone input, .admin-zone textarea, .admin-zone select { cursor: text !important; }
        .admin-zone button, .admin-zone a, .admin-zone label, .admin-zone [role="button"] { cursor: pointer !important; }
        .admin-zone input[type="checkbox"], .admin-zone input[type="radio"], .admin-zone input[type="date"], .admin-zone input[type="time"], .admin-zone input[type="number"] { cursor: pointer !important; }
      `}</style>
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/rodajes/admin"
              className="text-sm font-medium tracking-tight"
            >
              Rodajes · Admin
            </Link>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
              Sin auth
            </span>
          </div>
          <nav className="flex items-center gap-4 text-xs uppercase tracking-wider text-neutral-500">
            <Link
              href="/rodajes"
              className="hover:text-neutral-900 transition"
            >
              ← Lista pública
            </Link>
            <Link
              href="/rodajes/admin/nuevo"
              className="px-3 py-1.5 bg-neutral-900 text-white rounded hover:bg-neutral-700 transition normal-case tracking-normal"
            >
              + Nuevo
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
