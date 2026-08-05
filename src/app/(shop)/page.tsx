import { HeroSection } from "@/components/home/hero-section";
import { ProductGrid } from "@/components/products/product-grid";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const db = getDb();
  const products = await db.products.list();

  return (
    <>
      <HeroSection />
      <ProductGrid products={products} title="Nuestra colección" />
    </>
  );
}
