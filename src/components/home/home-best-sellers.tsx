"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/db/types";
import { HomeReveal } from "@/components/home/home-reveal";
import { formatPenPrice } from "@/lib/products/detail-content";
import { cn } from "@/lib/utils";
import { boutique, boutiqueSans, boutiqueSerif } from "@/lib/boutique-theme";
import { useShop } from "@/components/shop/shop-provider";

type HomeBestSellersProps = {
  products: Product[];
};

export function HomeBestSellers({ products }: HomeBestSellersProps) {
  const items = products.slice(0, 5);
  const { addToCart } = useShop();

  return (
    <section
      className={cn(
        boutiqueSans.className,
        "bg-gradient-to-b from-white via-[#FEFAF9] to-[#FEFAF9] px-4 py-12 sm:px-6 sm:py-16",
      )}
    >
      <div className="mx-auto max-w-6xl">
        <HomeReveal>
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2
              className={cn(
                boutiqueSerif.className,
                "text-2xl font-semibold tracking-wide text-[#2C2C2C] sm:text-3xl",
              )}
            >
              Más vendidos
            </h2>
            <Link
              href="/productos"
              className="text-[11px] font-semibold tracking-[0.14em] text-[#D68C96] uppercase transition-colors duration-300 hover:text-[#C46F7A]"
            >
              Ver todos
            </Link>
          </div>
        </HomeReveal>

        {items.length === 0 ? (
          <p className="rounded-lg bg-white px-4 py-10 text-center text-sm text-[#2C2C2C]/60">
            Pronto añadiremos productos destacados.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
            {items.map((product, index) => (
              <HomeReveal key={product.id} delay={index * 70}>
                <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_1px_0_rgba(214,140,150,0.12)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_14px_28px_rgba(214,140,150,0.16)]">
                  <Link
                    href={`/productos/${product.id}`}
                    className="relative aspect-[4/5] overflow-hidden bg-[#F7E8EA]"
                  >
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 20vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-[#2C2C2C]/35">
                        Sin imagen
                      </div>
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col gap-2 p-3 sm:p-3.5">
                    <Link href={`/productos/${product.id}`}>
                      <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium text-[#2C2C2C] transition-colors duration-300 group-hover:text-[#C46F7A]">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm font-semibold text-[#2C2C2C]">
                      {formatPenPrice(product.price)}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          imageUrl: product.image_url,
                        })
                      }
                      className="mt-auto inline-flex h-9 items-center justify-center rounded-md text-[10px] font-semibold tracking-[0.14em] text-white uppercase transition-all duration-300 hover:opacity-90 hover:shadow-[0_8px_16px_rgba(214,140,150,0.3)]"
                      style={{ backgroundColor: boutique.rose }}
                    >
                      Añadir
                    </button>
                  </div>
                </article>
              </HomeReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
