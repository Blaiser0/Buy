import type { Product } from "@/lib/db/types";
import { ProductCard } from "@/components/products/product-card";

type ProductGridProps = {
  products: Product[];
  title?: string;
  emptyMessage?: string;
};

export function ProductGrid({
  products,
  title = "Colección",
  emptyMessage = "Aún no hay productos disponibles.",
}: ProductGridProps) {
  return (
    <section id="coleccion" className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="mb-10 space-y-2">
        <h2 className="text-3xl font-semibold text-[#2C2C2C]">{title}</h2>
        <p className="text-[#2C2C2C]/70">
          Skincare coreano seleccionado para tu rutina diaria.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl bg-[#F8F6F0] px-6 py-16 text-center text-[#2C2C2C]/70">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
