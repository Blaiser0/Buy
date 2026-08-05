import type { DatabaseProvider } from "../../repository";
import { supabaseProductRepository } from "./products";
import { supabaseProfileRepository } from "./profiles";
import { supabaseStorageRepository } from "./storage";

export const supabaseProvider: DatabaseProvider = {
  products: supabaseProductRepository,
  profiles: supabaseProfileRepository,
  storage: supabaseStorageRepository,
};
