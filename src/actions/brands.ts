"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { assertAdminOrThrow } from "@/lib/auth/require-admin";
import { createClient } from "@/lib/supabase/server";
import { getDb } from "@/lib/db";
import { BRAND_IMAGE_EXTENSIONS, brandImageSchema } from "@/schemas/brand-image";

export type BrandActionState = { error?: string; success?: string };
const nameSchema = z.string().trim().min(2).max(80).transform(name => name.replace(/\s+/g, " "));

export async function saveBrandAction(_previous: BrandActionState, formData: FormData): Promise<BrandActionState> {
  let uploadedPath: string | undefined;
  async function discardNewUpload() {
    if (uploadedPath) {
      try { await getDb().storage.deleteProductImage(uploadedPath); } catch { /* Keep the original save error. */ }
    }
  }
  try {
    await assertAdminOrThrow();
    const operation = z.enum(["create", "update", "hide", "show", "delete"]).safeParse(formData.get("operation"));
    if (!operation.success) return { error: "Operación no válida." };
    const client = await createClient();
    const image = formData.get("logo");
    const logo = image instanceof File && image.size > 0 ? image : undefined;
    async function uploadLogo() {
      const validation = brandImageSchema.safeParse(logo);
      if (!validation.success) return { error: validation.error.issues[0].message };
      if (!logo) return { logoUrl: undefined };
      const path = `brand-logos/${crypto.randomUUID()}.${BRAND_IMAGE_EXTENSIONS[logo.type]}`;
      const result = await getDb().storage.uploadProductImage(logo, path);
      uploadedPath = result.path;
      return { logoUrl: result.publicUrl };
    }
    let error;
    if (operation.data === "create") {
      const name = nameSchema.safeParse(formData.get("name"));
      if (!name.success) return { error: "La marca debe tener entre 2 y 80 caracteres." };
      const uploaded = await uploadLogo();
      if (uploaded.error) return { error: uploaded.error };
      const base = name.data.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "marca";
      ({ error } = await client.from("brands").insert({ name: name.data, slug: `${base}-${crypto.randomUUID().slice(0, 8)}`, logo_url: uploaded.logoUrl ?? null }));
    } else {
      const id = z.string().uuid().safeParse(formData.get("id"));
      if (!id.success) return { error: "Marca no válida." };
      if (operation.data === "delete") {
        // The database foreign key prevents deletion while products reference it.
        ({ error } = await client.from("brands").delete().eq("id", id.data));
      } else if (operation.data === "update") {
        const name = nameSchema.safeParse(formData.get("name"));
        if (!name.success) return { error: "La marca debe tener entre 2 y 80 caracteres." };
        const uploaded = await uploadLogo();
        if (uploaded.error) return { error: uploaded.error };
        ({ error } = await client.from("brands").update({ name: name.data, ...(uploaded.logoUrl ? { logo_url: uploaded.logoUrl } : {}) }).eq("id", id.data).select("id").single());
      } else {
        ({ error } = await client.from("brands").update({ is_visible: operation.data === "show" }).eq("id", id.data));
      }
    }
    if (error) await discardNewUpload();
    if (error?.code === "23505") return { error: "Ya existe una marca con ese nombre." };
    if (error?.code === "23503") return { error: "Esta marca tiene productos. Reasígnalos antes de eliminarla, o utiliza Ocultar." };
    if (error) return { error: "No se pudo guardar la marca. Revisa tus permisos y la migración de Supabase." };
    uploadedPath = undefined; // The saved row now owns the image; never clean it up after a cache error.
    revalidatePath("/", "layout");
    revalidatePath("/sitemap.xml");
    return { success: "Cambio guardado." };
  } catch {
    await discardNewUpload();
    return { error: "No se pudo guardar la marca o subir el logo. Verifica tu sesión de administrador e inténtalo de nuevo." };
  }
}
