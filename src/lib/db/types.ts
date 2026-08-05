export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  image_url: string | null;
  created_at: string;
};

export type Profile = {
  id: string;
  is_admin: boolean;
  full_name: string | null;
};

export type CreateProductInput = {
  name: string;
  description?: string | null;
  price: number;
  stock_quantity: number;
  image_url?: string | null;
};

export type UpdateProductInput = Partial<CreateProductInput>;

export type UploadResult = {
  path: string;
  publicUrl: string;
};
