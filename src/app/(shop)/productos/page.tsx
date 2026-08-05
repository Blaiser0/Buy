import { ProductGrid } from "@/components/products/product-grid";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const db = getDb();
  const products = await db.products.list();

  return (
    <ProductGrid
      products={products}
      title="Colección"
      emptyMessage="Pronto añadiremos nuevos productos a la colección."
    />
  );
}
