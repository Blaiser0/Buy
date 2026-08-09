"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronRight, Heart, Star } from "lucide-react";
import type { Product } from "@/lib/db/types";
import { formatPenPrice } from "@/lib/products/detail-content";

type RelatedProductsProps = {
  products: Product[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (!products.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:py-10">
      <div className="mb-6 flex flex-col items-center lg:mb-5">
        <h2 className="text-center font-[family-name:var(--font-product-serif)] text-[1.35rem] tracking-[0.22em] text-[#2C2C2C] uppercase sm:text-[1.5rem]">
          Te puede encantar
        </h2>
        <div className="mt-3 flex items-center gap-3">
          <span className="h-px w-10 bg-[#E0D0D2]" />
          <span className="size-1.5 rotate-45 bg-[#D68C96]" />
          <span className="h-px w-10 bg-[#E0D0D2]" />
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product, index) => (
            <article
              key={product.id}
              className="w-[200px] shrink-0 sm:w-[220px]"
            >
              <div className="relative mb-3 aspect-square overflow-hidden rounded-xl border border-[#F0E4E5] bg-[#F8F1F2]">
                <Link href={`/productos/${product.id}`} className="block h-full">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="220px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-[#2C2C2C]/35">
                      Sin imagen
                    </div>
                  )}
                </Link>
                <button
                  type="button"
                  aria-label="Guardar en deseos"
                  className="absolute top-2.5 right-2.5 flex size-7 items-center justify-center rounded-full bg-white/95 text-[#D68C96] shadow-sm"
                >
                  <Heart className="size-3.5" strokeWidth={1.75} />
                </button>
              </div>

              <Link href={`/productos/${product.id}`} className="block">
                <h3 className="line-clamp-2 min-h-10 text-[13px] font-medium text-[#2C2C2C]">
                  {product.name}
                </h3>
              </Link>

              <div className="mt-1.5 flex items-center gap-1.5">
                <div className="flex items-center gap-0.5 text-[#D68C96]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-2.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] text-[#2C2C2C]/40">
                  ({20 + ((index * 7) % 40)})
                </span>
              </div>

              <p className="mt-1.5 text-sm font-semibold text-[#2C2C2C]">
                {formatPenPrice(product.price)}
              </p>

              <Link
                href={`/productos/${product.id}`}
                className="mt-3 inline-flex h-8 items-center justify-center rounded-md bg-[#D68C96] px-4 text-[10px] font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-[#C97A85]"
              >
                Añadir
              </Link>
            </article>
          ))}
        </div>

        {products.length > 3 ? (
          <button
            type="button"
            aria-label="Ver más productos"
            onClick={() => {
              scrollerRef.current?.scrollBy({ left: 250, behavior: "smooth" });
            }}
            className="absolute top-[26%] -right-1 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#E0D0D2] bg-white text-[#D68C96] shadow-md transition-colors hover:bg-[#FEFAF9] md:flex"
          >
            <ChevronRight className="size-5" />
          </button>
        ) : null}
      </div>
    </section>
  );
}
