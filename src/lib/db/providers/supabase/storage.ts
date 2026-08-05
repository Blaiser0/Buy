import type { StorageRepository } from "../../repository";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "products";

function extractPathFromUrl(imageUrlOrPath: string): string | null {
  if (!imageUrlOrPath.includes("://")) {
    return imageUrlOrPath.replace(/^\/+/, "");
  }

  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const index = imageUrlOrPath.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(imageUrlOrPath.slice(index + marker.length));
}

export const supabaseStorageRepository: StorageRepository = {
  async uploadProductImage(file, path) {
    const supabase = await createClient();
    const extension = file.name.split(".").pop() || "jpg";
    const objectPath =
      path ?? `${crypto.randomUUID()}.${extension.toLowerCase()}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(objectPath, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type || undefined,
      });

    if (error) throw new Error(error.message);

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(objectPath);

    return { path: objectPath, publicUrl };
  },

  async deleteProductImage(imageUrlOrPath) {
    const path = extractPathFromUrl(imageUrlOrPath);
    if (!path) return;

    const supabase = await createClient();
    const { error } = await supabase.storage.from(BUCKET).remove([path]);
    if (error) throw new Error(error.message);
  },
};
