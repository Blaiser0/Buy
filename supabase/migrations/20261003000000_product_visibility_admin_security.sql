BEGIN;

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS is_visible BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Restrictive policy also applies if older permissive SELECT policies exist.
DROP POLICY IF EXISTS "Hidden products require admin" ON public.products;
CREATE POLICY "Hidden products require admin"
  ON public.products AS RESTRICTIVE FOR SELECT TO anon, authenticated
  USING (is_visible OR public.is_admin());

-- Defense in depth: every write requires an authenticated admin, regardless
-- of other permissive policies installed in the project.
DROP POLICY IF EXISTS "Product inserts require admin" ON public.products;
CREATE POLICY "Product inserts require admin"
  ON public.products AS RESTRICTIVE FOR INSERT TO anon, authenticated
  WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "Product updates require admin" ON public.products;
CREATE POLICY "Product updates require admin"
  ON public.products AS RESTRICTIVE FOR UPDATE TO anon, authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "Product deletes require admin" ON public.products;
CREATE POLICY "Product deletes require admin"
  ON public.products AS RESTRICTIVE FOR DELETE TO anon, authenticated
  USING (public.is_admin());

-- An owner must never be able to promote themselves via the REST API.
-- Keep own-name editing, not role editing. Service role/SQL editor retains access.
REVOKE INSERT, UPDATE, DELETE ON public.profiles FROM anon, authenticated;
REVOKE INSERT (id, is_admin, full_name, created_at),
       UPDATE (id, is_admin, full_name, created_at)
  ON public.profiles FROM anon, authenticated;
GRANT UPDATE (full_name) ON public.profiles TO authenticated;

NOTIFY pgrst, 'reload schema';
COMMIT;
