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
    <section
      id="coleccion"
      className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-12 md:px-6 md:py-16"
    >
      <div className="mb-6 space-y-2 sm:mb-8 md:mb-10">
        <h2 className="text-2xl font-semibold text-[#2C2C2C] sm:text-3xl">
          {title}
        </h2>
        <p className="max-w-2xl text-sm text-[#2C2C2C]/70 sm:text-base">
          Skincare coreano seleccionado para tu rutina diaria.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl bg-[#F8F6F0] px-4 py-12 text-center text-sm text-[#2C2C2C]/70 sm:px-6 sm:py-16 sm:text-base">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
