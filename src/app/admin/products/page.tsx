import { AdminProductsManager } from "@/components/admin/admin-products-manager";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await getDb().products.list({ includeHidden: true });
  return <AdminProductsManager products={products} />;
}
