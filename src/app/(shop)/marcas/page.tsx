import Link from "next/link";
import { BrandLogoFrame } from "@/components/brands/brand-logo-frame";
import { getDb } from "@/lib/db";
import { groupProductsByBrand } from "@/lib/products/brands";
import { cn } from "@/lib/utils";
import { boutiqueSans, boutiqueSerif } from "@/lib/boutique-theme";

export const dynamic = "force-dynamic";

export default async function BrandsPage() {
  const db = getDb();
  const products = await db.products.list();
  const brands = groupProductsByBrand(products);

  return (
    <section
      className={cn(
        boutiqueSans.className,
        "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14",
      )}
    >
      <div className="mb-8 max-w-2xl sm:mb-10">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[#D68C96] uppercase">
          Selección K-Beauty
        </p>
        <h1
          className={cn(
            boutiqueSerif.className,
            "mt-2 text-3xl font-semibold text-[#2C2C2C] sm:text-4xl",
          )}
        >
          Marcas
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#2C2C2C]/70 sm:text-base">
          Explora las marcas coreanas de nuestra boutique. Cada tarjeta muestra
          el nombre y un contenedor listo para el logo de la marca.
        </p>
      </div>

      {brands.length === 0 ? (
        <div className="rounded-xl bg-[#FEFAF9] px-4 py-14 text-center text-sm text-[#2C2C2C]/65">
          Aún no hay marcas disponibles.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/productos?marca=${encodeURIComponent(brand.slug)}`}
              className="group overflow-hidden rounded-xl border border-[#F0E4E5] bg-white shadow-[0_1px_0_rgba(214,140,150,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:border-[#EAD6D8]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#FEFAF9]">
                <BrandLogoFrame
                  brandName={brand.name}
                  logoPath={brand.logoPath}
                  fallbackImage={brand.coverImage}
                />
                <span className="absolute top-2 right-2 max-w-[calc(100%-1rem)] truncate rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-[#D68C96] ring-1 ring-[#EAD6D8] sm:top-3 sm:right-3 sm:text-[10px]">
                  {brand.productCount}{" "}
                  {brand.productCount === 1 ? "prod." : "prods."}
                </span>
              </div>

              <div className="space-y-1 border-t border-[#F0E4E5] px-3 py-3 sm:px-4 sm:py-3.5">
                <h2 className="text-sm font-semibold tracking-wide text-[#2C2C2C] sm:text-[15px]">
                  {brand.name}
                </h2>
                <p className="text-[11px] font-medium tracking-[0.12em] text-[#D68C96] uppercase transition-colors group-hover:text-[#C46F7A]">
                  Ver colección
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
