-- All test writes are rolled back. No persistent test brands or product changes.
BEGIN;
SELECT set_config('test.brand_id', (SELECT id::text FROM public.brands WHERE slug = 'tocobo'), true);
SELECT set_config('test.product_id', (SELECT id::text FROM public.products WHERE brand_id = current_setting('test.brand_id')::uuid ORDER BY id LIMIT 1), true);
SELECT set_config('test.admin_id', (SELECT id::text FROM public.profiles WHERE is_admin LIMIT 1), true);
UPDATE public.brands SET is_visible = false WHERE id = current_setting('test.brand_id')::uuid;
UPDATE public.products SET is_visible = false WHERE id = current_setting('test.product_id')::uuid;

SET LOCAL ROLE anon;
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM public.brands WHERE id = current_setting('test.brand_id')::uuid)
    OR EXISTS (SELECT 1 FROM public.products WHERE brand_id = current_setting('test.brand_id')::uuid) THEN
    RAISE EXCEPTION 'A hidden brand or its products is publicly readable';
  END IF;
END $$;
RESET ROLE;
UPDATE public.brands SET is_visible = true WHERE id = current_setting('test.brand_id')::uuid;
SET LOCAL ROLE anon;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.products WHERE brand_id = current_setting('test.brand_id')::uuid) THEN
    RAISE EXCEPTION 'Showing brand did not restore its visible products';
  END IF;
  IF EXISTS (SELECT 1 FROM public.products WHERE id = current_setting('test.product_id')::uuid) THEN
    RAISE EXCEPTION 'Showing brand exposed an individually hidden product';
  END IF;
END $$;
RESET ROLE;

SELECT set_config('request.jwt.claims', json_build_object('sub', current_setting('test.admin_id'), 'role', 'authenticated')::text, true);
SET LOCAL ROLE authenticated;
DO $$ DECLARE test_id uuid; BEGIN
  IF NOT public.is_admin() THEN RAISE EXCEPTION 'Admin role not established'; END IF;
  INSERT INTO public.brands (name, slug) VALUES ('Verification rollback only', 'verification-' || gen_random_uuid()) RETURNING id INTO test_id;
  UPDATE public.brands SET name = 'Verification renamed', is_visible = false WHERE id = test_id;
  IF NOT EXISTS (SELECT 1 FROM public.brands WHERE id = test_id AND NOT is_visible AND name = 'Verification renamed') THEN
    RAISE EXCEPTION 'Admin edit or hidden-brand read failed';
  END IF;
  DELETE FROM public.brands WHERE id = test_id;
  IF EXISTS (SELECT 1 FROM public.brands WHERE id = test_id) THEN RAISE EXCEPTION 'Admin delete failed'; END IF;
  BEGIN
    DELETE FROM public.brands WHERE id = current_setting('test.brand_id')::uuid;
    RAISE EXCEPTION 'Brand in use was deleted';
  EXCEPTION WHEN foreign_key_violation THEN NULL;
  END;
END $$;
RESET ROLE;

SELECT set_config('request.jwt.claims', json_build_object('sub', gen_random_uuid(), 'role', 'authenticated')::text, true);
SET LOCAL ROLE authenticated;
DO $$ DECLARE changed integer; BEGIN
  IF public.is_admin() THEN RAISE EXCEPTION 'Non-admin test unexpectedly has admin permissions'; END IF;
  BEGIN
    INSERT INTO public.brands (name, slug) VALUES ('Unauthorized test', 'unauthorized-' || gen_random_uuid());
    RAISE EXCEPTION 'Non-admin inserted a brand';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
  UPDATE public.brands SET name = 'Unauthorized' WHERE id = current_setting('test.brand_id')::uuid;
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 0 THEN RAISE EXCEPTION 'Non-admin updated a brand'; END IF;
  DELETE FROM public.brands WHERE id = current_setting('test.brand_id')::uuid;
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 0 THEN RAISE EXCEPTION 'Non-admin deleted a brand'; END IF;
END $$;
RESET ROLE;
SELECT 'PASS: hidden brand/products, restore visibility, admin CRUD, protected deletion and non-admin denied; all test writes rolled back' AS verification;
ROLLBACK;
