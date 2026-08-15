import { ProductFilters } from "@/components/products/product-filters";
import { ProductGrid } from "@/components/products/product-grid";
import { getDb } from "@/lib/db";
import {
  applyCatalogFilters,
  getAvailableBrands,
  getAvailableCategories,
  hasActiveCatalogFilters,
  parseCatalogFilters,
} from "@/lib/products/search";
import { cn } from "@/lib/utils";
import { boutiqueSans } from "@/lib/boutique-theme";

export const dynamic = "force-dynamic";

type ProductsPageProps = {
  searchParams: Promise<{
    q?: string | string[];
    categoria?: string | string[];
    marca?: string | string[];
    precio?: string | string[];
    stock?: string | string[];
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const filters = parseCatalogFilters(params);

  const db = getDb();
  const products = await db.products.list();
  const filtered = applyCatalogFilters(products, filters);

  const categories = getAvailableCategories(products);
  const brands = getAvailableBrands(products);
  const active = hasActiveCatalogFilters(filters);

  const heading = filters.q
    ? `Resultados para “${filters.q}”`
    : filters.categoria
      ? filters.categoria
      : filters.marca
        ? brands.find((b) => b.slug === filters.marca)?.name ?? "Marca"
        : "Colección";

  return (
    <div
      className={cn(
        boutiqueSans.className,
        "mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 md:py-14",
      )}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <ProductFilters
          filters={filters}
          categories={categories}
          brands={brands}
          resultCount={filtered.length}
        />

        <ProductGrid
          embedded
          products={filtered}
          title={heading}
          subtitle={
            active
              ? `${filtered.length} producto${filtered.length === 1 ? "" : "s"} encontrado${filtered.length === 1 ? "" : "s"}`
              : "Skincare coreano seleccionado para tu rutina diaria."
          }
          emptyMessage={
            filters.q
              ? `No encontramos productos para “${filters.q}”. Prueba con otra marca o palabra.`
              : active
                ? "No hay productos con estos filtros. Prueba otras opciones."
                : "Pronto añadiremos nuevos productos a la colección."
          }
        />
      </div>
    </div>
  );
}
