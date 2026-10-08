import type { ProductCategory } from "@/lib/products/categories";

export type { ProductCategory };

export type Brand = {
  logo_url: string | null;
  id: string;
  name: string;
  slug: string;
  is_visible: boolean;
};

export type Product = {
  brand_id: string | null;
  brand: Brand | null;
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  image_url: string | null;
  category: ProductCategory;
  created_at: string;
  is_visible: boolean;
};

export type Profile = {
  id: string;
  is_admin: boolean;
  full_name: string | null;
};

export type CreateProductInput = {
  brand_id?: string | null;
  name: string;
  description?: string | null;
  price: number;
  stock_quantity: number;
  image_url?: string | null;
  category: ProductCategory;
};

export type UpdateProductInput = Partial<CreateProductInput> & { is_visible?: boolean };

export type UploadResult = {
  path: string;
  publicUrl: string;
};
