import type { Product } from "@/lib/db/types";
import { ProductCard } from "@/components/products/product-card";
import { cn } from "@/lib/utils";
import { boutiqueSans, boutiqueSerif } from "@/lib/boutique-theme";

type ProductGridProps = {
  products: Product[];
  title?: string;
  subtitle?: string;
  emptyMessage?: string;
  /** When true, removes outer max-width (use inside catalog layout). */
  embedded?: boolean;
};

export function ProductGrid({
  products,
  title = "Colección",
  subtitle = "Skincare coreano seleccionado para tu rutina diaria.",
  emptyMessage = "Aún no hay productos disponibles.",
  embedded = false,
}: ProductGridProps) {
  return (
    <section
      id="coleccion"
      className={cn(
        boutiqueSans.className,
        embedded
          ? "min-w-0 flex-1"
          : "mx-auto w-full max-w-6xl px-4 py-10 sm:py-12 md:px-6 md:py-16",
      )}
    >
      <div className="mb-6 space-y-2 sm:mb-8">
        <h2
          className={cn(
            boutiqueSerif.className,
            "text-2xl font-semibold text-[#2C2C2C] sm:text-3xl",
          )}
        >
          {title}
        </h2>
        <p className="max-w-2xl text-sm text-[#2C2C2C]/70 sm:text-base">
          {subtitle}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl bg-[#FEFAF9] px-4 py-12 text-center text-sm text-[#2C2C2C]/70 sm:px-6 sm:py-16 sm:text-base">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
