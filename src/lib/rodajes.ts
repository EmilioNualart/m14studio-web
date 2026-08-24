import { createSupabaseClient } from "./supabase";

// === Tipos ===

export type ShootEstado =
  | "Pre-producción"
  | "Confirmado"
  | "En rodaje"
  | "Post-producción"
  | "Wrap";

export type ShootTipo =
  | "Comercial"
  | "Branded content"
  | "Videoclip"
  | "Documental"
  | "Otro";

export const ESTADOS: ShootEstado[] = [
  "Pre-producción",
  "Confirmado",
  "En rodaje",
  "Post-producción",
  "Wrap",
];

export const TIPOS: ShootTipo[] = [
  "Comercial",
  "Branded content",
  "Videoclip",
  "Documental",
  "Otro",
];

export const ROLES_BASE = [
  "PE",
  "Director",
  "DP",
  "AD",
  "Gaffer",
  "Sonidista",
  "Arte",
  "Vestuario",
  "Maquillaje",
  "Catering",
  "Producción",
  "Asistente",
  "Otro",
] as const;

export type Shoot = {
  id: string;
  slug: string;
  nombre: string;
  cliente: string | null;
  tipo: ShootTipo;
  tipo_custom: string | null;
  estado: ShootEstado;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  hora_llamada: string | null;
  hora_wrap: string | null;
  cantidad_personas: number | null;
  permisos: string | null;
  permisos_url: string | null;
  transporte: string | null;
  estacionamiento: string | null;
  comida_desayuno: boolean;
  comida_almuerzo: boolean;
  comida_once: boolean;
  comidas_notas: string | null;
  notas: string | null;
  created_at: string;
  updated_at: string;
};

export type ShootLocation = {
  id: string;
  shoot_id: string;
  orden: number;
  nombre: string | null;
  direccion: string | null;
  maps_url: string | null;
  jornada: string | null;
};

export type ShootCrew = {
  id: string;
  shoot_id: string;
  orden: number;
  rol: string | null;
  rol_custom: string | null;
  nombre: string | null;
  telefono: string | null;
  email: string | null;
};

export type ShootCasting = {
  id: string;
  shoot_id: string;
  orden: number;
  nombre: string | null;
  personaje: string | null;
  contacto: string | null;
};

export type ShootLink = {
  id: string;
  shoot_id: string;
  orden: number;
  titulo: string | null;
  url: string | null;
};

export type ShootWithRelations = Shoot & {
  shoot_locations: ShootLocation[];
  shoot_crew: ShootCrew[];
  shoot_casting: ShootCasting[];
  shoot_links: ShootLink[];
};

// === Helpers ===

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

// === Queries (lectura) ===

export async function listProximos(): Promise<Shoot[]> {
  const supabase = createSupabaseClient();
  const today = todayISO();
  const { data, error } = await supabase
    .from("shoots")
    .select("*")
    .or(`fecha_fin.gte.${today},fecha_fin.is.null`)
    .order("fecha_inicio", { ascending: true, nullsFirst: false });
  if (error) throw error;
  return data ?? [];
}

export async function listPasados(): Promise<Shoot[]> {
  const supabase = createSupabaseClient();
  const today = todayISO();
  const { data, error } = await supabase
    .from("shoots")
    .select("*")
    .lt("fecha_fin", today)
    .order("fecha_inicio", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function listAll(): Promise<Shoot[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("shoots")
    .select("*")
    .order("fecha_inicio", { ascending: false, nullsFirst: false });
  if (error) throw error;
  return data ?? [];
}

export async function getBySlug(
  slug: string,
): Promise<ShootWithRelations | null> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("shoots")
    .select(
      `*,
       shoot_locations(*),
       shoot_crew(*),
       shoot_casting(*),
       shoot_links(*)`,
    )
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  // Ordenar relaciones por `orden`
  const sortByOrden = <T extends { orden: number }>(arr: T[]) =>
    [...arr].sort((a, b) => a.orden - b.orden);
  return {
    ...data,
    shoot_locations: sortByOrden(data.shoot_locations ?? []),
    shoot_crew: sortByOrden(data.shoot_crew ?? []),
    shoot_casting: sortByOrden(data.shoot_casting ?? []),
    shoot_links: sortByOrden(data.shoot_links ?? []),
  } as ShootWithRelations;
}
