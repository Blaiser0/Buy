import "server-only";
import { createClient } from "@/lib/supabase/server";
import { assertAdminOrThrow } from "@/lib/auth/require-admin";
import type { Brand } from "./types";

/** Public catalog includes visible brands even when they have no products yet. */
export async function listPublicBrands(): Promise<Brand[]> {
  const client = await createClient();
  const { data, error } = await client.from("brands")
    .select("id,name,slug,is_visible,logo_url")
    .eq("is_visible", true)
    .order("name");
  if (error) throw new Error("No se pudieron cargar las marcas del catálogo.");
  return data ?? [];
}

export async function listBrands(): Promise<Brand[]> {
  await assertAdminOrThrow();
  const client = await createClient();
  const { data, error } = await client.from("brands").select("id,name,slug,is_visible,logo_url").order("name");
  if (error) throw new Error("No se pudieron cargar las marcas. Comprueba la migración de Supabase.");
  return data ?? [];
}
