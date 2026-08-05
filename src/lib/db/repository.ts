import type {
  CreateProductInput,
  Product,
  Profile,
  UpdateProductInput,
  UploadResult,
} from "./types";

/**
 * Contrato de acceso a datos.
 * Para cambiar de proveedor (Supabase → otra DB), implementa esta interfaz
 * y regístrala en `src/lib/db/index.ts`.
 */
export interface ProductRepository {
  list(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  create(input: CreateProductInput): Promise<Product>;
  update(id: string, input: UpdateProductInput): Promise<Product>;
  delete(id: string): Promise<void>;
}

export interface ProfileRepository {
  getById(id: string): Promise<Profile | null>;
  isAdmin(userId: string): Promise<boolean>;
}

export interface StorageRepository {
  uploadProductImage(file: File, path?: string): Promise<UploadResult>;
  deleteProductImage(imageUrlOrPath: string): Promise<void>;
}

export interface DatabaseProvider {
  products: ProductRepository;
  profiles: ProfileRepository;
  storage: StorageRepository;
}
