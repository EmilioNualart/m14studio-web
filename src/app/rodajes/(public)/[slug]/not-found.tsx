import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <p className="text-white/60 mb-4">Rodaje no encontrado</p>
      <Link
        href="/rodajes"
        className="text-xs uppercase tracking-wider text-white/40 hover:text-white"
      >
        ← Volver a la lista
      </Link>
    </div>
  );
}
