import Link from "next/link";
import { notFound } from "next/navigation";
import { getBySlug, type ShootEstado } from "@/lib/rodajes";

export const dynamic = "force-dynamic";

const ESTADO_COLOR: Record<ShootEstado, string> = {
  "Pre-producción": "bg-yellow-400/20 text-yellow-200 border-yellow-400/30",
  Confirmado: "bg-emerald-400/20 text-emerald-200 border-emerald-400/30",
  "En rodaje": "bg-red-400/20 text-red-200 border-red-400/30",
  "Post-producción": "bg-blue-400/20 text-blue-200 border-blue-400/30",
  Wrap: "bg-white/10 text-white/60 border-white/20",
};

function fmtFecha(d: string | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function fmtRango(inicio: string | null, fin: string | null): string {
  if (!inicio) return "Sin fecha";
  if (!fin || fin === inicio) return fmtFecha(inicio);
  return `${fmtFecha(inicio)} → ${fmtFecha(fin)}`;
}

function fmtHora(h: string | null): string {
  if (!h) return "—";
  return h.slice(0, 5);
}

function Section({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-white/10 pt-8">
      <h2 className="text-xs uppercase tracking-widest text-white/40 mb-6">
        {titulo}
      </h2>
      {children}
    </section>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">
        {label}
      </div>
      <div className="text-white/90">{value || "—"}</div>
    </div>
  );
}

export default async function DetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const shoot = await getBySlug(slug);
  if (!shoot) notFound();

  const tipo =
    shoot.tipo === "Otro" && shoot.tipo_custom ? shoot.tipo_custom : shoot.tipo;
  const comidas = [
    shoot.comida_desayuno && "Desayuno",
    shoot.comida_almuerzo && "Almuerzo",
    shoot.comida_once && "Once",
  ].filter(Boolean);

  return (
    <div className="space-y-10">
      <div>
        <Link
          href="/rodajes"
          className="text-xs uppercase tracking-wider text-white/40 hover:text-white"
        >
          ← Volver
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider">
          <span
            className={`px-2 py-0.5 border rounded-sm ${ESTADO_COLOR[shoot.estado]}`}
          >
            {shoot.estado}
          </span>
          <span className="text-white/50">{tipo}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-light">{shoot.nombre}</h1>
        {shoot.cliente && (
          <p className="text-lg text-white/60">{shoot.cliente}</p>
        )}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60 pt-2">
          <span>{fmtRango(shoot.fecha_inicio, shoot.fecha_fin)}</span>
          {shoot.shoot_locations[0]?.nombre && (
            <span>· {shoot.shoot_locations[0].nombre}</span>
          )}
        </div>
        <div className="pt-4">
          <Link
            href={`/rodajes/admin/${shoot.slug}/editar`}
            className="text-xs uppercase tracking-wider text-white/40 hover:text-white"
          >
            Editar →
          </Link>
        </div>
      </header>

      {/* Call sheet */}
      <Section titulo="Call sheet">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Field label="Llamada" value={fmtHora(shoot.hora_llamada)} />
          <Field label="Wrap estimado" value={fmtHora(shoot.hora_wrap)} />
          <Field
            label="Personas en set"
            value={shoot.cantidad_personas ?? "—"}
          />
          <Field
            label="Comidas"
            value={comidas.length > 0 ? comidas.join(" · ") : "—"}
          />
        </div>
        {shoot.comidas_notas && (
          <div className="mt-4 text-sm text-white/60">{shoot.comidas_notas}</div>
        )}
      </Section>

      {/* Equipo */}
      {shoot.shoot_crew.length > 0 && (
        <Section titulo="Equipo">
          <div className="divide-y divide-white/5">
            {shoot.shoot_crew.map((c) => {
              const rol = c.rol === "Otro" && c.rol_custom ? c.rol_custom : c.rol;
              return (
                <div
                  key={c.id}
                  className="grid grid-cols-12 gap-4 py-3 text-sm items-baseline"
                >
                  <div className="col-span-3 text-white/50 uppercase tracking-wider text-xs">
                    {rol || "—"}
                  </div>
                  <div className="col-span-3 text-white/90">{c.nombre || "—"}</div>
                  <div className="col-span-3 text-white/60">{c.telefono || ""}</div>
                  <div className="col-span-3 text-white/60 truncate">
                    {c.email ? (
                      <a
                        href={`mailto:${c.email}`}
                        className="hover:text-white"
                      >
                        {c.email}
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* Locaciones */}
      {shoot.shoot_locations.length > 0 && (
        <Section titulo="Locaciones">
          <div className="space-y-4">
            {shoot.shoot_locations.map((l) => (
              <div
                key={l.id}
                className="border border-white/10 rounded-sm p-4 flex flex-wrap items-start justify-between gap-4"
              >
                <div>
                  <div className="text-white/90">{l.nombre || "Sin nombre"}</div>
                  {l.direccion && (
                    <div className="text-sm text-white/60">{l.direccion}</div>
                  )}
                  {l.jornada && (
                    <div className="text-xs text-white/40 uppercase tracking-wider mt-1">
                      {l.jornada}
                    </div>
                  )}
                </div>
                {l.maps_url && (
                  <a
                    href={l.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-wider text-white/60 hover:text-white"
                  >
                    Ver en maps ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Casting */}
      {shoot.shoot_casting.length > 0 && (
        <Section titulo="Casting / Modelos">
          <div className="divide-y divide-white/5">
            {shoot.shoot_casting.map((c) => (
              <div
                key={c.id}
                className="grid grid-cols-12 gap-4 py-3 text-sm items-baseline"
              >
                <div className="col-span-4 text-white/90">{c.nombre || "—"}</div>
                <div className="col-span-4 text-white/60">
                  {c.personaje || ""}
                </div>
                <div className="col-span-4 text-white/60">{c.contacto || ""}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Logística */}
      {(shoot.permisos ||
        shoot.permisos_url ||
        shoot.transporte ||
        shoot.estacionamiento) && (
        <Section titulo="Logística">
          <div className="grid md:grid-cols-2 gap-6">
            {(shoot.permisos || shoot.permisos_url) && (
              <Field
                label="Permisos de filmación"
                value={
                  <>
                    {shoot.permisos}
                    {shoot.permisos_url && (
                      <>
                        {shoot.permisos && " "}
                        <a
                          href={shoot.permisos_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-white/70 hover:text-white"
                        >
                          ↗
                        </a>
                      </>
                    )}
                  </>
                }
              />
            )}
            <Field label="Transporte" value={shoot.transporte} />
            <Field label="Estacionamiento" value={shoot.estacionamiento} />
          </div>
        </Section>
      )}

      {/* Documentos */}
      {shoot.shoot_links.length > 0 && (
        <Section titulo="Documentos">
          <div className="flex flex-wrap gap-3">
            {shoot.shoot_links.map((l) => (
              <a
                key={l.id}
                href={l.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/15 hover:border-white/40 rounded-sm px-4 py-2 text-sm transition"
              >
                {l.titulo || l.url} ↗
              </a>
            ))}
          </div>
        </Section>
      )}

      {/* Notas */}
      {shoot.notas && (
        <Section titulo="Notas">
          <div className="whitespace-pre-wrap text-white/80 leading-relaxed">
            {shoot.notas}
          </div>
        </Section>
      )}
    </div>
  );
}
