import { z } from "zod";

export const productFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
  price: z.coerce
    .number({ message: "El precio es obligatorio" })
    .positive("El precio debe ser mayor a 0"),
  stock_quantity: z.coerce
    .number({ message: "El stock es obligatorio" })
    .int("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo"),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const productImageSchema = z
  .instanceof(File)
  .refine((file) => file.size === 0 || file.size <= 5 * 1024 * 1024, {
    message: "La imagen no puede superar 5MB",
  })
  .refine(
    (file) =>
      file.size === 0 ||
      ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type),
    { message: "Formato de imagen no válido" },
  )
  .optional();
