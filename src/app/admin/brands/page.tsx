import { listBrands } from "@/lib/db/brands";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-admin";
import { BrandsManager } from "@/components/admin/brands-manager";

export const dynamic = "force-dynamic";

export default async function BrandsPage() {
  await requireAdmin();
  const [brands, products] = await Promise.all([listBrands(), getDb().products.list({ includeHidden: true })]);
  const counts: Record<string, number> = {};
  for (const product of products) if (product.brand_id) counts[product.brand_id] = (counts[product.brand_id] ?? 0) + 1;
  return <BrandsManager brands={brands} counts={counts} />;
}
