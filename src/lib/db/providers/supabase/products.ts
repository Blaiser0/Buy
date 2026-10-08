import type { ProductRepository } from "../../repository";
import type { CreateProductInput, Product, ProductCategory, UpdateProductInput } from "../../types";
import { createClient } from "@/lib/supabase/server";

function mapProduct(row: Record<string, unknown>): Product {
  return {
    brand_id: (row.brand_id as string | null) ?? null,
    brand: (row.brand as Product["brand"]) ?? null,
    id: String(row.id),
    name: String(row.name),
    description: (row.description as string | null) ?? null,
    price: Number(row.price),
    stock_quantity: Number(row.stock_quantity),
    image_url: (row.image_url as string | null) ?? null,
    category: (row.category as ProductCategory) ?? "Hidratantes",
    created_at: String(row.created_at),
    is_visible: row.is_visible !== false,
  };
}

export const supabaseProductRepository: ProductRepository = {
  async list(options) {
    const supabase = await createClient();
    const destination = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/products`;
    let result;

    try {
      result = await supabase
        .from("products")
        .select("*, brand:brands(id,name,slug,is_visible,logo_url)")
        .order("created_at", { ascending: false });
    } catch (error) {
      const requestError = error as Error & { cause?: unknown; status?: number };
      console.error("[Supabase fetch failed]", {
        destination,
        function: "supabaseProductRepository.list",
        file: "src/lib/db/providers/supabase/products.ts",
        status: requestError.status,
        message: requestError.message,
        cause: requestError.cause,
      });
      throw error;
    }

    const { data, error, status } = result;
    if (error) {
      console.error("[Supabase request failed]", {
        destination,
        function: "supabaseProductRepository.list",
        file: "src/lib/db/providers/supabase/products.ts",
        status,
        message: error.message,
      });
      throw new Error(error.message);
    }

    // Public pages exclude hidden items even while an administrator is signed in.
    // Database RLS additionally prevents visitors from reading them directly.
    return (data ?? []).map(mapProduct).filter(p => options?.includeHidden || (p.is_visible && (!p.brand_id || p.brand?.is_visible === true)));
  },

  async getById(id, options) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, brand:brands(id,name,slug,is_visible,logo_url)")
      .eq("id", id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!data) return null;
    const product = mapProduct(data);
    return options?.includeHidden || (product.is_visible && (!product.brand_id || product.brand?.is_visible === true)) ? product : null;
  },

  async create(input: CreateProductInput) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .insert({
        name: input.name,
        description: input.description ?? null,
        price: input.price,
        stock_quantity: input.stock_quantity,
        image_url: input.image_url ?? null,
        category: input.category,
        brand_id: input.brand_id ?? null,
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return mapProduct(data);
  },

  async update(id, input: UpdateProductInput) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .update({
        ...(input.name !== undefined ? { name: input.name } : {}),
        ...(input.description !== undefined
          ? { description: input.description }
          : {}),
        ...(input.price !== undefined ? { price: input.price } : {}),
        ...(input.stock_quantity !== undefined
          ? { stock_quantity: input.stock_quantity }
          : {}),
        ...(input.image_url !== undefined
          ? { image_url: input.image_url }
          : {}),
        ...(input.category !== undefined ? { category: input.category } : {}),
        ...(input.brand_id !== undefined ? { brand_id: input.brand_id } : {}),
        ...(input.is_visible !== undefined ? { is_visible: input.is_visible } : {}),
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return mapProduct(data);
  },

  async delete(id) {
    const supabase = await createClient();
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
