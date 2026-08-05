import type { DatabaseProvider } from "./repository";
import { supabaseProvider } from "./providers/supabase";

/**
 * Factory del proveedor de datos.
 *
 * Para migrar a otra base de datos:
 * 1. Implementa `DatabaseProvider` en `src/lib/db/providers/<nuevo>/`
 * 2. Regístralo en el switch de abajo
 * 3. Cambia `DB_PROVIDER` en `.env`
 *
 * Las Server Actions y páginas no deben importar Supabase directamente
 * para operaciones de dominio: usan `getDb()`.
 */
export function getDb(): DatabaseProvider {
  const provider = process.env.DB_PROVIDER ?? "supabase";

  switch (provider) {
    case "supabase":
      return supabaseProvider;
    // case "prisma":
    //   return prismaProvider;
    // case "drizzle":
    //   return drizzleProvider;
    default:
      throw new Error(
        `Proveedor de base de datos desconocido: "${provider}". ` +
          `Configura DB_PROVIDER en .env (ej. supabase).`,
      );
  }
}

export type { DatabaseProvider } from "./repository";
export type * from "./types";
