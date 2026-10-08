import { z } from "zod";

export const BRAND_IMAGE_EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

// Keep uploads below the existing server-action request limit (1 MB).
export const brandImageSchema = z.instanceof(File)
  .refine(file => file.size <= 512 * 1024, "El logo no puede superar 512 KB.")
  .refine(file => Object.hasOwn(BRAND_IMAGE_EXTENSIONS, file.type), "Usa un logo PNG, JPG o WEBP.")
  .optional();
