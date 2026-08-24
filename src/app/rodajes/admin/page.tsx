import Link from "next/link";
import { listAll, type ShootEstado } from "@/lib/rodajes";

export const dynamic = "force-dynamic";

const ESTADO_DOT: Record<ShootEstado, string> = {
  "Pre-producción": "bg-yellow-500",
  Confirmado: "bg-emerald-500",
  "En rodaje": "bg-red-500",
  "Post-producción": "bg-blue-500",
  Wrap: "bg-neutral-400",
};

function fmt(d: string | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    timeZone: "UTC",
  });
}

export default async function AdminPage() {
  const shoots = await listAll();

  return (
    <div>
      <h1 className="text-2xl font-medium mb-6">Todos los rodajes</h1>

      {shoots.length === 0 ? (
        <div className="border border-dashed border-neutral-300 rounded p-12 text-center text-neutral-500">
          <p className="mb-3">Aún no hay rodajes.</p>
          <Link
            href="/rodajes/admin/nuevo"
            className="text-neutral-900 underline"
          >
            Crear el primero →
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-100 text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="text-left px-4 py-2 font-medium">Estado</th>
                <th className="text-left px-4 py-2 font-medium">Nombre</th>
                <th className="text-left px-4 py-2 font-medium">Cliente</th>
                <th className="text-left px-4 py-2 font-medium">Fechas</th>
                <th className="text-left px-4 py-2 font-medium">Tipo</th>
                <th className="text-right px-4 py-2 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {shoots.map((s) => {
                const tipo =
                  s.tipo === "Otro" && s.tipo_custom ? s.tipo_custom : s.tipo;
                return (
                  <tr key={s.id} className="hover:bg-neutral-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${ESTADO_DOT[s.estado]}`}
                        />
                        <span className="text-xs text-neutral-600">{s.estado}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/rodajes/${s.slug}`}
                        className="text-neutral-900 hover:underline"
                      >
                        {s.nombre}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {s.cliente || "—"}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {fmt(s.fecha_inicio)}
                      {s.fecha_fin && s.fecha_fin !== s.fecha_inicio && (
                        <> → {fmt(s.fecha_fin)}</>
                      )}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{tipo}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/rodajes/admin/${s.slug}/editar`}
                        className="text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900"
                      >
                        Editar →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
