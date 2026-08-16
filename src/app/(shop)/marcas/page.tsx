import { BrandShowcase } from "@/components/brands/brand-showcase";
import { getDb } from "@/lib/db";
import { groupProductsByBrand } from "@/lib/products/brands";
import { cn } from "@/lib/utils";
import { boutiqueSans } from "@/lib/boutique-theme";

export const dynamic = "force-dynamic";

export default async function BrandsPage() {
  const db = getDb();
  const products = await db.products.list();
  const brands = groupProductsByBrand(products);

  return (
    <section
      className={cn(
        boutiqueSans.className,
        "relative min-h-[70vh] overflow-hidden bg-[#FBF4F5]",
      )}
    >
      {/* Fondo texturizado rosado + decoraciones suaves como la referencia */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(232,164,171,0.35),transparent_45%),radial-gradient(ellipse_at_90%_80%,rgba(214,140,150,0.22),transparent_40%)]" />
      <div className="pointer-events-none absolute -top-8 -left-10 h-44 w-44 rounded-full bg-[#F0C9D1]/50 blur-2xl" />
      <div className="pointer-events-none absolute top-24 -right-8 h-56 w-56 rounded-[2rem] bg-[#E8A4AB]/25 blur-xl" />
      <div className="pointer-events-none absolute bottom-10 left-[18%] h-28 w-40 rotate-[-12deg] rounded-[1.5rem] bg-[#F7E8EA]/80 blur-md" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <BrandShowcase brands={brands} />
      </div>
    </section>
  );
}
