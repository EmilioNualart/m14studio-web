"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ESTADOS,
  TIPOS,
  ROLES_BASE,
  slugify,
  type ShootEstado,
  type ShootTipo,
  type ShootWithRelations,
} from "@/lib/rodajes";
import { createSupabaseClient } from "@/lib/supabase";

// === Tipos del form (toleran strings vacíos) ===

type ShootForm = {
  slug: string;
  nombre: string;
  cliente: string;
  tipo: ShootTipo;
  tipo_custom: string;
  estado: ShootEstado;
  fecha_inicio: string;
  fecha_fin: string;
  hora_llamada: string;
  hora_wrap: string;
  cantidad_personas: string;
  permisos: string;
  permisos_url: string;
  transporte: string;
  estacionamiento: string;
  comida_desayuno: boolean;
  comida_almuerzo: boolean;
  comida_once: boolean;
  comidas_notas: string;
  notas: string;
};

type LocForm = { nombre: string; direccion: string; maps_url: string; jornada: string };
type CrewForm = {
  rol: string;
  rol_custom: string;
  nombre: string;
  telefono: string;
  email: string;
};
type CastForm = { nombre: string; personaje: string; contacto: string };
type LinkForm = { titulo: string; url: string };

const EMPTY_SHOOT: ShootForm = {
  slug: "",
  nombre: "",
  cliente: "",
  tipo: "Comercial",
  tipo_custom: "",
  estado: "Pre-producción",
  fecha_inicio: "",
  fecha_fin: "",
  hora_llamada: "",
  hora_wrap: "",
  cantidad_personas: "",
  permisos: "",
  permisos_url: "",
  transporte: "",
  estacionamiento: "",
  comida_desayuno: false,
  comida_almuerzo: false,
  comida_once: false,
  comidas_notas: "",
  notas: "",
};

function fromInitial(initial: ShootWithRelations): {
  shoot: ShootForm;
  locs: LocForm[];
  crew: CrewForm[];
  cast: CastForm[];
  links: LinkForm[];
} {
  return {
    shoot: {
      slug: initial.slug,
      nombre: initial.nombre,
      cliente: initial.cliente ?? "",
      tipo: initial.tipo,
      tipo_custom: initial.tipo_custom ?? "",
      estado: initial.estado,
      fecha_inicio: initial.fecha_inicio ?? "",
      fecha_fin: initial.fecha_fin ?? "",
      hora_llamada: initial.hora_llamada?.slice(0, 5) ?? "",
      hora_wrap: initial.hora_wrap?.slice(0, 5) ?? "",
      cantidad_personas: initial.cantidad_personas?.toString() ?? "",
      permisos: initial.permisos ?? "",
      permisos_url: initial.permisos_url ?? "",
      transporte: initial.transporte ?? "",
      estacionamiento: initial.estacionamiento ?? "",
      comida_desayuno: initial.comida_desayuno,
      comida_almuerzo: initial.comida_almuerzo,
      comida_once: initial.comida_once,
      comidas_notas: initial.comidas_notas ?? "",
      notas: initial.notas ?? "",
    },
    locs: initial.shoot_locations.map((l) => ({
      nombre: l.nombre ?? "",
      direccion: l.direccion ?? "",
      maps_url: l.maps_url ?? "",
      jornada: l.jornada ?? "",
    })),
    crew: initial.shoot_crew.map((c) => ({
      rol: c.rol ?? "",
      rol_custom: c.rol_custom ?? "",
      nombre: c.nombre ?? "",
      telefono: c.telefono ?? "",
      email: c.email ?? "",
    })),
    cast: initial.shoot_casting.map((c) => ({
      nombre: c.nombre ?? "",
      personaje: c.personaje ?? "",
      contacto: c.contacto ?? "",
    })),
    links: initial.shoot_links.map((l) => ({
      titulo: l.titulo ?? "",
      url: l.url ?? "",
    })),
  };
}

// === UI primitives ===

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-1">
      {children}
    </label>
  );
}

const inputCls =
  "w-full bg-white border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-neutral-900";

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputCls} />;
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={inputCls + " min-h-[80px]"} />;
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={inputCls + " pr-8"} />;
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs uppercase tracking-widest text-neutral-500 mt-10 mb-3 pb-2 border-b border-neutral-200">
      {children}
    </h2>
  );
}

// === Form principal ===

export default function RodajeForm({
  initial,
}: {
  initial?: ShootWithRelations;
}) {
  const router = useRouter();
  const initialData = initial ? fromInitial(initial) : null;

  const [shoot, setShoot] = useState<ShootForm>(
    initialData?.shoot ?? EMPTY_SHOOT,
  );
  const [locs, setLocs] = useState<LocForm[]>(initialData?.locs ?? []);
  const [crew, setCrew] = useState<CrewForm[]>(initialData?.crew ?? []);
  const [cast, setCast] = useState<CastForm[]>(initialData?.cast ?? []);
  const [links, setLinks] = useState<LinkForm[]>(initialData?.links ?? []);

  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function update<K extends keyof ShootForm>(key: K, value: ShootForm[K]) {
    setShoot((s) => ({ ...s, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!shoot.nombre.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    const supabase = createSupabaseClient();
    const finalSlug = (shoot.slug || slugify(shoot.nombre)).trim();
    if (!finalSlug) {
      setError("No se pudo generar slug.");
      return;
    }

    const payload = {
      slug: finalSlug,
      nombre: shoot.nombre.trim(),
      cliente: shoot.cliente.trim() || null,
      tipo: shoot.tipo,
      tipo_custom:
        shoot.tipo === "Otro" ? shoot.tipo_custom.trim() || null : null,
      estado: shoot.estado,
      fecha_inicio: shoot.fecha_inicio || null,
      fecha_fin: shoot.fecha_fin || shoot.fecha_inicio || null,
      hora_llamada: shoot.hora_llamada || null,
      hora_wrap: shoot.hora_wrap || null,
      cantidad_personas: shoot.cantidad_personas
        ? parseInt(shoot.cantidad_personas, 10)
        : null,
      permisos: shoot.permisos.trim() || null,
      permisos_url: shoot.permisos_url.trim() || null,
      transporte: shoot.transporte.trim() || null,
      estacionamiento: shoot.estacionamiento.trim() || null,
      comida_desayuno: shoot.comida_desayuno,
      comida_almuerzo: shoot.comida_almuerzo,
      comida_once: shoot.comida_once,
      comidas_notas: shoot.comidas_notas.trim() || null,
      notas: shoot.notas.trim() || null,
    };

    startTransition(async () => {
      try {
        let shootId: string;

        if (initial) {
          const { error: updErr } = await supabase
            .from("shoots")
            .update(payload)
            .eq("id", initial.id);
          if (updErr) throw updErr;
          shootId = initial.id;
        } else {
          const { data, error: insErr } = await supabase
            .from("shoots")
            .insert(payload)
            .select("id")
            .single();
          if (insErr) throw insErr;
          shootId = data.id;
        }

        // Reemplazar relaciones (estrategia simple: borrar todo + insertar todo)
        await Promise.all([
          supabase.from("shoot_locations").delete().eq("shoot_id", shootId),
          supabase.from("shoot_crew").delete().eq("shoot_id", shootId),
          supabase.from("shoot_casting").delete().eq("shoot_id", shootId),
          supabase.from("shoot_links").delete().eq("shoot_id", shootId),
        ]);

        const insertList = async (
          table: string,
          rows: Record<string, unknown>[],
        ) => {
          if (rows.length === 0) return;
          const { error } = await supabase.from(table).insert(rows);
          if (error) throw error;
        };

        await Promise.all([
          insertList(
            "shoot_locations",
            locs.map((l, i) => ({
              shoot_id: shootId,
              orden: i,
              nombre: l.nombre.trim() || null,
              direccion: l.direccion.trim() || null,
              maps_url: l.maps_url.trim() || null,
              jornada: l.jornada.trim() || null,
            })),
          ),
          insertList(
            "shoot_crew",
            crew.map((c, i) => ({
              shoot_id: shootId,
              orden: i,
              rol: c.rol || null,
              rol_custom:
                c.rol === "Otro" ? c.rol_custom.trim() || null : null,
              nombre: c.nombre.trim() || null,
              telefono: c.telefono.trim() || null,
              email: c.email.trim() || null,
            })),
          ),
          insertList(
            "shoot_casting",
            cast.map((c, i) => ({
              shoot_id: shootId,
              orden: i,
              nombre: c.nombre.trim() || null,
              personaje: c.personaje.trim() || null,
              contacto: c.contacto.trim() || null,
            })),
          ),
          insertList(
            "shoot_links",
            links.map((l, i) => ({
              shoot_id: shootId,
              orden: i,
              titulo: l.titulo.trim() || null,
              url: l.url.trim() || null,
            })),
          ),
        ]);

        router.push("/rodajes/admin");
        router.refresh();
      } catch (e: unknown) {
        const msg =
          e instanceof Error
            ? e.message
            : typeof e === "object" && e && "message" in e
              ? String((e as { message: unknown }).message)
              : "Error al guardar";
        setError(msg);
      }
    });
  }

  async function handleDelete() {
    if (!initial) return;
    if (!confirm(`¿Eliminar "${initial.nombre}"? Esta acción no se puede deshacer.`)) return;
    const supabase = createSupabaseClient();
    startTransition(async () => {
      const { error } = await supabase
        .from("shoots")
        .delete()
        .eq("id", initial.id);
      if (error) {
        setError(error.message);
        return;
      }
      router.push("/rodajes/admin");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-1">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">
          {initial ? "Editar rodaje" : "Nuevo rodaje"}
        </h1>
        <div className="flex items-center gap-2">
          {initial && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={pending}
              className="text-xs uppercase tracking-wider text-red-600 hover:text-red-800 px-3 py-1.5"
            >
              Eliminar
            </button>
          )}
          <button
            type="button"
            onClick={() => router.push("/rodajes/admin")}
            disabled={pending}
            className="text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 px-3 py-1.5"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={pending}
            className="text-xs uppercase tracking-wider px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-700 disabled:opacity-50"
          >
            {pending ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 text-sm rounded">
          {error}
        </div>
      )}

      {/* General */}
      <SectionHeader>General</SectionHeader>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label>Nombre del proyecto *</Label>
          <Input
            value={shoot.nombre}
            onChange={(e) => update("nombre", e.target.value)}
            placeholder="Comercial Falabella Otoño 2026"
            required
          />
        </div>
        <div>
          <Label>Cliente</Label>
          <Input
            value={shoot.cliente}
            onChange={(e) => update("cliente", e.target.value)}
            placeholder="Falabella"
          />
        </div>
        <div>
          <Label>Slug (URL)</Label>
          <Input
            value={shoot.slug}
            onChange={(e) => update("slug", e.target.value)}
            placeholder={shoot.nombre ? slugify(shoot.nombre) : "auto"}
          />
        </div>
        <div>
          <Label>Tipo</Label>
          <Select
            value={shoot.tipo}
            onChange={(e) => update("tipo", e.target.value as ShootTipo)}
          >
            {TIPOS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
        {shoot.tipo === "Otro" && (
          <div>
            <Label>Tipo personalizado</Label>
            <Input
              value={shoot.tipo_custom}
              onChange={(e) => update("tipo_custom", e.target.value)}
              placeholder="Ej. Fotografía, Cortometraje…"
            />
          </div>
        )}
        <div>
          <Label>Estado</Label>
          <Select
            value={shoot.estado}
            onChange={(e) => update("estado", e.target.value as ShootEstado)}
          >
            {ESTADOS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Fechas */}
      <SectionHeader>Fechas</SectionHeader>
      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <Label>Fecha inicio</Label>
          <Input
            type="date"
            value={shoot.fecha_inicio}
            onChange={(e) => update("fecha_inicio", e.target.value)}
          />
        </div>
        <div>
          <Label>Fecha fin</Label>
          <Input
            type="date"
            value={shoot.fecha_fin}
            onChange={(e) => update("fecha_fin", e.target.value)}
          />
        </div>
        <div>
          <Label>Hora llamada</Label>
          <Input
            type="time"
            value={shoot.hora_llamada}
            onChange={(e) => update("hora_llamada", e.target.value)}
          />
        </div>
        <div>
          <Label>Wrap estimado</Label>
          <Input
            type="time"
            value={shoot.hora_wrap}
            onChange={(e) => update("hora_wrap", e.target.value)}
          />
        </div>
      </div>

      {/* Locaciones */}
      <SectionHeader>Locaciones</SectionHeader>
      <div className="space-y-3">
        {locs.map((l, i) => (
          <div
            key={i}
            className="grid grid-cols-12 gap-3 p-3 border border-neutral-200 rounded bg-white"
          >
            <div className="col-span-12 md:col-span-3">
              <Label>Nombre</Label>
              <Input
                value={l.nombre}
                onChange={(e) =>
                  setLocs((arr) =>
                    arr.map((x, j) =>
                      j === i ? { ...x, nombre: e.target.value } : x,
                    ),
                  )
                }
                placeholder="Estudio Vitacura"
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <Label>Dirección</Label>
              <Input
                value={l.direccion}
                onChange={(e) =>
                  setLocs((arr) =>
                    arr.map((x, j) =>
                      j === i ? { ...x, direccion: e.target.value } : x,
                    ),
                  )
                }
              />
            </div>
            <div className="col-span-12 md:col-span-3">
              <Label>Link Maps</Label>
              <Input
                value={l.maps_url}
                onChange={(e) =>
                  setLocs((arr) =>
                    arr.map((x, j) =>
                      j === i ? { ...x, maps_url: e.target.value } : x,
                    ),
                  )
                }
                placeholder="https://maps…"
              />
            </div>
            <div className="col-span-10 md:col-span-1">
              <Label>Jornada</Label>
              <Input
                value={l.jornada}
                onChange={(e) =>
                  setLocs((arr) =>
                    arr.map((x, j) =>
                      j === i ? { ...x, jornada: e.target.value } : x,
                    ),
                  )
                }
                placeholder="D1"
              />
            </div>
            <div className="col-span-2 md:col-span-1 flex items-end justify-end">
              <button
                type="button"
                onClick={() => setLocs((arr) => arr.filter((_, j) => j !== i))}
                className="text-xs text-neutral-400 hover:text-red-600 px-2 py-2"
                aria-label="Eliminar locación"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setLocs((arr) => [
              ...arr,
              { nombre: "", direccion: "", maps_url: "", jornada: "" },
            ])
          }
          className="text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 border border-dashed border-neutral-300 px-3 py-2 rounded w-full"
        >
          + Agregar locación
        </button>
      </div>

      {/* Equipo */}
      <SectionHeader>Equipo</SectionHeader>
      <div className="space-y-3">
        {crew.map((c, i) => (
          <div
            key={i}
            className="grid grid-cols-12 gap-3 p-3 border border-neutral-200 rounded bg-white"
          >
            <div className="col-span-6 md:col-span-2">
              <Label>Rol</Label>
              <Select
                value={c.rol}
                onChange={(e) =>
                  setCrew((arr) =>
                    arr.map((x, j) =>
                      j === i ? { ...x, rol: e.target.value } : x,
                    ),
                  )
                }
              >
                <option value="">—</option>
                {ROLES_BASE.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </Select>
            </div>
            {c.rol === "Otro" && (
              <div className="col-span-6 md:col-span-2">
                <Label>Rol custom</Label>
                <Input
                  value={c.rol_custom}
                  onChange={(e) =>
                    setCrew((arr) =>
                      arr.map((x, j) =>
                        j === i ? { ...x, rol_custom: e.target.value } : x,
                      ),
                    )
                  }
                />
              </div>
            )}
            <div className="col-span-12 md:col-span-3">
              <Label>Nombre</Label>
              <Input
                value={c.nombre}
                onChange={(e) =>
                  setCrew((arr) =>
                    arr.map((x, j) =>
                      j === i ? { ...x, nombre: e.target.value } : x,
                    ),
                  )
                }
              />
            </div>
            <div className="col-span-6 md:col-span-2">
              <Label>Teléfono</Label>
              <Input
                value={c.telefono}
                onChange={(e) =>
                  setCrew((arr) =>
                    arr.map((x, j) =>
                      j === i ? { ...x, telefono: e.target.value } : x,
                    ),
                  )
                }
              />
            </div>
            <div className={c.rol === "Otro" ? "col-span-4 md:col-span-2" : "col-span-4 md:col-span-4"}>
              <Label>Email</Label>
              <Input
                type="email"
                value={c.email}
                onChange={(e) =>
                  setCrew((arr) =>
                    arr.map((x, j) =>
                      j === i ? { ...x, email: e.target.value } : x,
                    ),
                  )
                }
              />
            </div>
            <div className="col-span-2 md:col-span-1 flex items-end justify-end">
              <button
                type="button"
                onClick={() => setCrew((arr) => arr.filter((_, j) => j !== i))}
                className="text-xs text-neutral-400 hover:text-red-600 px-2 py-2"
                aria-label="Eliminar miembro"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setCrew((arr) => [
              ...arr,
              { rol: "", rol_custom: "", nombre: "", telefono: "", email: "" },
            ])
          }
          className="text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 border border-dashed border-neutral-300 px-3 py-2 rounded w-full"
        >
          + Agregar miembro
        </button>
      </div>

      {/* Casting */}
      <SectionHeader>Casting / Modelos</SectionHeader>
      <div className="space-y-3">
        {cast.map((c, i) => (
          <div
            key={i}
            className="grid grid-cols-12 gap-3 p-3 border border-neutral-200 rounded bg-white"
          >
            <div className="col-span-12 md:col-span-4">
              <Label>Nombre</Label>
              <Input
                value={c.nombre}
                onChange={(e) =>
                  setCast((arr) =>
                    arr.map((x, j) =>
                      j === i ? { ...x, nombre: e.target.value } : x,
                    ),
                  )
                }
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <Label>Personaje / Rol</Label>
              <Input
                value={c.personaje}
                onChange={(e) =>
                  setCast((arr) =>
                    arr.map((x, j) =>
                      j === i ? { ...x, personaje: e.target.value } : x,
                    ),
                  )
                }
              />
            </div>
            <div className="col-span-10 md:col-span-3">
              <Label>Contacto</Label>
              <Input
                value={c.contacto}
                onChange={(e) =>
                  setCast((arr) =>
                    arr.map((x, j) =>
                      j === i ? { ...x, contacto: e.target.value } : x,
                    ),
                  )
                }
              />
            </div>
            <div className="col-span-2 md:col-span-1 flex items-end justify-end">
              <button
                type="button"
                onClick={() => setCast((arr) => arr.filter((_, j) => j !== i))}
                className="text-xs text-neutral-400 hover:text-red-600 px-2 py-2"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setCast((arr) => [
              ...arr,
              { nombre: "", personaje: "", contacto: "" },
            ])
          }
          className="text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 border border-dashed border-neutral-300 px-3 py-2 rounded w-full"
        >
          + Agregar persona
        </button>
      </div>

      {/* Logística */}
      <SectionHeader>Logística</SectionHeader>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Cantidad de personas en set</Label>
          <Input
            type="number"
            min="0"
            value={shoot.cantidad_personas}
            onChange={(e) => update("cantidad_personas", e.target.value)}
          />
        </div>
        <div></div>
        <div>
          <Label>Permisos de filmación</Label>
          <Input
            value={shoot.permisos}
            onChange={(e) => update("permisos", e.target.value)}
            placeholder="Ej. Permiso municipal aprobado"
          />
        </div>
        <div>
          <Label>Link de permisos</Label>
          <Input
            value={shoot.permisos_url}
            onChange={(e) => update("permisos_url", e.target.value)}
            placeholder="https://…"
          />
        </div>
        <div>
          <Label>Transporte</Label>
          <Textarea
            value={shoot.transporte}
            onChange={(e) => update("transporte", e.target.value)}
          />
        </div>
        <div>
          <Label>Estacionamiento</Label>
          <Textarea
            value={shoot.estacionamiento}
            onChange={(e) => update("estacionamiento", e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <Label>Comidas</Label>
          <div className="flex gap-6 py-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={shoot.comida_desayuno}
                onChange={(e) => update("comida_desayuno", e.target.checked)}
              />
              Desayuno
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={shoot.comida_almuerzo}
                onChange={(e) => update("comida_almuerzo", e.target.checked)}
              />
              Almuerzo
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={shoot.comida_once}
                onChange={(e) => update("comida_once", e.target.checked)}
              />
              Once
            </label>
          </div>
          <Textarea
            value={shoot.comidas_notas}
            onChange={(e) => update("comidas_notas", e.target.value)}
            placeholder="Notas (ej. catering vegano para 3, alergias…)"
          />
        </div>
      </div>

      {/* Documentos */}
      <SectionHeader>Documentos / Links</SectionHeader>
      <div className="space-y-3">
        {links.map((l, i) => (
          <div
            key={i}
            className="grid grid-cols-12 gap-3 p-3 border border-neutral-200 rounded bg-white"
          >
            <div className="col-span-12 md:col-span-4">
              <Label>Título</Label>
              <Input
                value={l.titulo}
                onChange={(e) =>
                  setLinks((arr) =>
                    arr.map((x, j) =>
                      j === i ? { ...x, titulo: e.target.value } : x,
                    ),
                  )
                }
                placeholder="Guion v3"
              />
            </div>
            <div className="col-span-10 md:col-span-7">
              <Label>URL</Label>
              <Input
                value={l.url}
                onChange={(e) =>
                  setLinks((arr) =>
                    arr.map((x, j) =>
                      j === i ? { ...x, url: e.target.value } : x,
                    ),
                  )
                }
                placeholder="https://…"
              />
            </div>
            <div className="col-span-2 md:col-span-1 flex items-end justify-end">
              <button
                type="button"
                onClick={() => setLinks((arr) => arr.filter((_, j) => j !== i))}
                className="text-xs text-neutral-400 hover:text-red-600 px-2 py-2"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setLinks((arr) => [...arr, { titulo: "", url: "" }])
          }
          className="text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 border border-dashed border-neutral-300 px-3 py-2 rounded w-full"
        >
          + Agregar link
        </button>
      </div>

      {/* Notas */}
      <SectionHeader>Notas</SectionHeader>
      <div>
        <Textarea
          value={shoot.notas}
          onChange={(e) => update("notas", e.target.value)}
          placeholder="Cualquier info adicional relevante…"
          rows={6}
        />
      </div>

      {/* Submit footer */}
      <div className="mt-10 pt-6 border-t border-neutral-200 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push("/rodajes/admin")}
          disabled={pending}
          className="text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 px-3 py-2"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={pending}
          className="text-xs uppercase tracking-wider px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-700 disabled:opacity-50"
        >
          {pending ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
