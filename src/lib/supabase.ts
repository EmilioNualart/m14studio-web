import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(
    "Faltan variables de entorno: NEXT_PUBLIC_SUPABASE_URL y/o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  );
}

/**
 * Crea un cliente Supabase. Se crea uno por request en lugar de reutilizar
 * un singleton para evitar fugas de estado en el runtime edge de Cloudflare.
 * Sin auth todavía: persistSession=false.
 */
export function createSupabaseClient(): SupabaseClient {
  return createClient(url!, key!, {
    auth: { persistSession: false },
  });
}
