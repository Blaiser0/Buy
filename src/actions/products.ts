"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertAdminOrThrow } from "@/lib/auth/require-admin";
import { getDb } from "@/lib/db";
import { productFormSchema, productImageSchema } from "@/schemas/product";

export type ProductActionState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string[]>;
};

function parseForm(formData: FormData) {
  const parsed = productFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description") || "",
    price: formData.get("price"),
    stock_quantity: formData.get("stock_quantity"),
  });

  const image = formData.get("image");
  const imageFile =
    image instanceof File && image.size > 0 ? image : undefined;
  const imageParsed = productImageSchema.safeParse(imageFile);

  return { parsed, imageFile, imageParsed };
}

export async function createProductAction(
  _prev: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  try {
    await assertAdminOrThrow();
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "No autorizado.",
    };
  }

  const { parsed, imageFile, imageParsed } = parseForm(formData);

  if (!parsed.success) {
    return {
      error: "Revisa los campos del formulario.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!imageParsed.success) {
    return {
      error: imageParsed.error.issues[0]?.message ?? "Imagen no válida.",
    };
  }

  const db = getDb();
  let imageUrl: string | null = null;

  try {
    if (imageFile) {
      const uploaded = await db.storage.uploadProductImage(imageFile);
      imageUrl = uploaded.publicUrl;
    }

    await db.products.create({
      name: parsed.data.name,
      description: parsed.data.description || null,
      price: parsed.data.price,
      stock_quantity: parsed.data.stock_quantity,
      image_url: imageUrl,
    });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "No se pudo crear el producto.",
    };
  }

  revalidatePath("/");
  revalidatePath("/productos");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProductAction(
  id: string,
  _prev: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  try {
    await assertAdminOrThrow();
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "No autorizado.",
    };
  }

  const { parsed, imageFile, imageParsed } = parseForm(formData);

  if (!parsed.success) {
    return {
      error: "Revisa los campos del formulario.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!imageParsed.success) {
    return {
      error: imageParsed.error.issues[0]?.message ?? "Imagen no válida.",
    };
  }

  const db = getDb();

  try {
    const current = await db.products.getById(id);
    if (!current) {
      return { error: "Producto no encontrado." };
    }

    let imageUrl = current.image_url;

    if (imageFile) {
      const uploaded = await db.storage.uploadProductImage(imageFile);
      if (current.image_url) {
        await db.storage.deleteProductImage(current.image_url);
      }
      imageUrl = uploaded.publicUrl;
    }

    await db.products.update(id, {
      name: parsed.data.name,
      description: parsed.data.description || null,
      price: parsed.data.price,
      stock_quantity: parsed.data.stock_quantity,
      image_url: imageUrl,
    });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "No se pudo actualizar el producto.",
    };
  }

  revalidatePath("/");
  revalidatePath("/productos");
  revalidatePath(`/productos/${id}`);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProductAction(id: string): Promise<ProductActionState> {
  try {
    await assertAdminOrThrow();
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "No autorizado.",
    };
  }

  const db = getDb();

  try {
    const current = await db.products.getById(id);
    if (!current) {
      return { error: "Producto no encontrado." };
    }

    if (current.image_url) {
      await db.storage.deleteProductImage(current.image_url);
    }

    await db.products.delete(id);
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el producto.",
    };
  }

  revalidatePath("/");
  revalidatePath("/productos");
  revalidatePath("/admin/products");
  return { success: "Producto eliminado." };
}
