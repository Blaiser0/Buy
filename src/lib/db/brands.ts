import "server-only";
import { createClient } from "@/lib/supabase/server";
import { assertAdminOrThrow } from "@/lib/auth/require-admin";
import type { Brand } from "./types";

export async function listBrands(): Promise<Brand[]> {
  await assertAdminOrThrow();
  const client = await createClient();
  const { data, error } = await client.from("brands").select("id,name,slug,is_visible,logo_url").order("name");
  if (error) throw new Error("No se pudieron cargar las marcas. Comprueba la migración de Supabase.");
  return data ?? [];
}
