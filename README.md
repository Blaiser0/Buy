# BUYU — Tienda de skincare coreano

Tienda virtual con Next.js 15 (App Router), TypeScript, Tailwind CSS, Shadcn/ui, Zod y Supabase.

## Arranque

1. Copia `.env.example` a `.env.local` y completa las variables de Supabase.
2. Instala dependencias: `npm install`
3. Ejecuta: `npm run dev`
4. Abre [http://localhost:3000](http://localhost:3000)

## Admin

1. Regístrate en `/register`
2. En Supabase SQL Editor, marca tu usuario como admin:

```sql
UPDATE public.profiles
SET is_admin = true
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'tu@email.com'
);
```

3. Inicia sesión en `/login` y entra a `/admin/products`

## Cambiar de base de datos

El acceso a datos pasa por un contrato en `src/lib/db/repository.ts`.

1. Implementa `DatabaseProvider` en `src/lib/db/providers/<nuevo>/`
2. Regístralo en el `switch` de `src/lib/db/index.ts`
3. Cambia `DB_PROVIDER` en `.env.local`

Las Server Actions usan `getDb()` y no dependen de Supabase directamente (excepto Auth/session).

## Schema

La migración está en `supabase/migrations/` y ya se aplicó al proyecto Supabase `Buy`.
