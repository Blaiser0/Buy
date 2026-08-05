import type { ProductRepository } from "../../repository";
import type { CreateProductInput, Product, UpdateProductInput } from "../../types";
import { createClient } from "@/lib/supabase/server";

function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    name: String(row.name),
    description: (row.description as string | null) ?? null,
    price: Number(row.price),
    stock_quantity: Number(row.stock_quantity),
    image_url: (row.image_url as string | null) ?? null,
    created_at: String(row.created_at),
  };
}

export const supabaseProductRepository: ProductRepository = {
  async list() {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []).map(mapProduct);
  },

  async getById(id) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data ? mapProduct(data) : null;
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
