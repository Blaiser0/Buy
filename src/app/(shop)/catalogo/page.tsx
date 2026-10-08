import { CatalogBrowser } from "@/components/products/catalog-browser";
import { getDb } from "@/lib/db";
import { listPublicBrands } from "@/lib/db/brands";
import { boutiqueSans } from "@/lib/boutique-theme";
import { pageMetadata } from "@/lib/seo";
import { withCatalogImage } from "@/lib/products/catalog-images";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata(
  "Catálogo de K-Beauty | Buyú Beauty",
  "Explora el catálogo de Buyú Beauty, filtra por tus marcas favoritas y encuentra productos de skincare coreano por nombre, categoría o descripción.",
  "/catalogo",
);

export default async function CatalogPage() {
  const [products, brands] = await Promise.all([getDb().products.list(), listPublicBrands()]);
  return (
    <div className={boutiqueSans.className}>
      <CatalogBrowser products={products.map(withCatalogImage)} brands={brands} />
    </div>
  );
}
