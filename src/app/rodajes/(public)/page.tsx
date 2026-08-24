import Link from "next/link";
import { listProximos, listPasados, type Shoot, type ShootEstado } from "@/lib/rodajes";

export const dynamic = "force-dynamic";

const ESTADO_COLOR: Record<ShootEstado, string> = {
  "Pre-producción": "bg-yellow-400/20 text-yellow-200 border-yellow-400/30",
  Confirmado: "bg-emerald-400/20 text-emerald-200 border-emerald-400/30",
  "En rodaje": "bg-red-400/20 text-red-200 border-red-400/30",
  "Post-producción": "bg-blue-400/20 text-blue-200 border-blue-400/30",
  Wrap: "bg-white/10 text-white/60 border-white/20",
};

function formatFechas(inicio: string | null, fin: string | null): string {
  if (!inicio) return "Sin fecha";
  const opts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  };
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("es-CL", opts).replace(".", "");
  if (!fin || fin === inicio) return fmt(inicio);
  if (inicio.slice(0, 7) === fin.slice(0, 7)) {
    const dInicio = new Date(inicio).getUTCDate();
    return `${dInicio}–${fmt(fin)}`;
  }
  return `${fmt(inicio)} – ${fmt(fin)}`;
}

function ShootCard({ shoot }: { shoot: Shoot }) {
  const tipo =
    shoot.tipo === "Otro" && shoot.tipo_custom ? shoot.tipo_custom : shoot.tipo;
  return (
    <Link
      href={`/rodajes/${shoot.slug}`}
      className="group block border border-white/10 hover:border-white/30 transition rounded-sm p-6"
    >
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider mb-4">
        <span
          className={`px-2 py-0.5 border rounded-sm ${ESTADO_COLOR[shoot.estado]}`}
        >
          {shoot.estado}
        </span>
        <span className="text-white/50">
          {formatFechas(shoot.fecha_inicio, shoot.fecha_fin)}
        </span>
        <span className="text-white/30">·</span>
        <span className="text-white/50">{tipo}</span>
      </div>
      <h3 className="text-2xl font-light mb-1 group-hover:translate-x-1 transition-transform">
        {shoot.nombre}
      </h3>
      {shoot.cliente && (
        <p className="text-sm text-white/60">{shoot.cliente}</p>
      )}
    </Link>
  );
}

function EmptyState({ titulo, mensaje }: { titulo: string; mensaje: string }) {
  return (
    <div className="border border-dashed border-white/15 rounded-sm p-12 text-center">
      <p className="text-white/60 mb-2">{titulo}</p>
      <p className="text-sm text-white/40">{mensaje}</p>
    </div>
  );
}

export default async function RodajesPage() {
  const [proximos, pasados] = await Promise.all([listProximos(), listPasados()]);

  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xs uppercase tracking-widest text-white/50">
            Próximos · {proximos.length}
          </h2>
          <Link
            href="/rodajes/admin/nuevo"
            className="text-xs uppercase tracking-wider text-white/60 hover:text-white"
          >
            + Nuevo rodaje
          </Link>
        </div>

        {proximos.length === 0 ? (
          <EmptyState
            titulo="Sin rodajes programados"
            mensaje="Crea uno desde Admin → Nuevo rodaje."
          />
        ) : (
          <div className="grid gap-3">
            {proximos.map((s) => (
              <ShootCard key={s.id} shoot={s} />
            ))}
          </div>
        )}
      </section>

      {pasados.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-widest text-white/50 mb-6">
            Pasados · {pasados.length}
          </h2>
          <div className="grid gap-3 opacity-60">
            {pasados.map((s) => (
              <ShootCard key={s.id} shoot={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
