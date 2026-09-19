"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowLeft, LayoutGrid, Search, X } from "lucide-react";
import { CatalogProductDetails } from "@/components/products/catalog-product-details";
import type { Product } from "@/lib/db/types";
import { detectBrandFromProductName } from "@/lib/products/brands";
import { filterProductsByBrand, filterProductsByName, getAvailableBrands } from "@/lib/products/search";
import { formatPenPrice } from "@/lib/products/detail-content";
import { boutiqueSerif } from "@/lib/boutique-theme";
import { cn } from "@/lib/utils";

export function CatalogBrowser({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const brands = getAvailableBrands(products);
  const visible = filterProductsByName(filterProductsByBrand(products, brand), query);
  const activeBrand = brands.find((item) => item.slug === brand);

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuery(query.trim());
  }

  function clearFilters() {
    setQuery("");
    setBrand("");
  }

  return (
    <div className="bg-[#FEFAF9] text-[#2C2C2C]">
      <section className="border-b border-[#EAD6D8] bg-gradient-to-r from-[#F7E8EA] via-[#FCE8EC] to-[#F3DDE1]">
        <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6">
          <Link href="/" className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-[#EAD6D8] bg-white/90 px-4 py-2 text-xs font-medium text-[#98535C] transition-colors hover:bg-[#FFF5F6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C46F7A]">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Regresar a la tienda
          </Link>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 pt-5 pb-8 sm:px-6 sm:pb-10 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex shrink-0 items-center gap-4">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl border border-white bg-white/90 p-3 shadow-sm sm:size-24">
              <Image src="/logo.png" alt="Buyú Beauty" width={80} height={71} className="h-auto w-full object-contain" />
            </div>
            <div>
              <p className="mb-1 text-[10px] font-semibold tracking-[0.18em] text-[#98616A] uppercase">Buyú Beauty</p>
              <h1 className={cn(boutiqueSerif.className, "text-3xl font-semibold sm:text-4xl")}>Catálogo</h1>
              <p className="mt-1 text-xs text-[#6B5A5A] sm:text-sm">Tu selección de K-Beauty</p>
            </div>
          </div>
          <form onSubmit={search} role="search" aria-label="Buscar en el catálogo" className="flex min-w-0 flex-1 flex-wrap gap-2 rounded-xl border border-white bg-white p-2 shadow-sm sm:flex-nowrap">
            <div className="flex min-w-0 flex-1 items-center gap-2 px-2">
              <Search className="size-5 shrink-0 text-[#C46F7A]" aria-hidden="true" />
              <label htmlFor="catalog-search" className="sr-only">Buscar por nombre del producto</label>
              <input id="catalog-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre del producto" className="h-11 w-full min-w-0 bg-transparent text-base outline-none placeholder:text-[#8A7A76] sm:text-sm focus-visible:ring-2 focus-visible:ring-[#D68C96]" />
            </div>
            <button type="submit" className="h-11 w-full rounded-lg bg-[#C46F7A] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#AC5D68] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C46F7A] sm:w-auto">Buscar</button>
          </form>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10">
        <div role="group" aria-label="Filtrar por marca" className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3">
          {[{ slug: "", name: "Todas", logoPath: "" }, ...brands].map((item) => {
            const selected = brand === item.slug;
            return (
              <button key={item.slug} type="button" aria-pressed={selected} onClick={() => setBrand(item.slug)} className={cn("flex min-h-24 min-w-0 flex-col items-center justify-center gap-3 rounded-xl border px-2 py-4 text-center text-[11px] font-semibold shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C46F7A] sm:min-w-28 sm:px-5 sm:text-xs", selected ? "border-[#C46F7A] bg-[#F7E8EA] text-[#98535C]" : "border-[#EAD6D8] bg-white text-[#514547] hover:border-[#D68C96] hover:bg-[#FFF5F6]") }>
                <span className="flex h-10 w-20 max-w-full items-center justify-center sm:w-24">
                  {item.logoPath ? (
                    <Image src={item.logoPath} alt="" width={96} height={40} sizes="96px" className="h-full w-full object-contain" />
                  ) : (
                    <LayoutGrid className="size-5 text-[#C46F7A]" aria-hidden="true" />
                  )}
                </span>
                <span className="sr-only">{item.name}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-9 mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#F0E4E5] pb-4">
          <p role="status" aria-live="polite" className="text-sm text-[#6B5A5A]">
            <span className="font-semibold text-[#2C2C2C]">{visible.length}</span> {visible.length === 1 ? "producto" : "productos"}
            {activeBrand ? ` · ${activeBrand.name}` : " · Todas las marcas"}
            {query ? ` · “${query}”` : ""}
          </p>
          {(brand || query) && <button type="button" onClick={clearFilters} className="inline-flex min-h-10 items-center gap-1.5 text-xs font-medium text-[#98535C] hover:underline"><X className="size-4" />Limpiar filtros</button>}
        </div>

        {visible.length ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {visible.map((product) => {
              const productBrand = detectBrandFromProductName(product.name);
              return (
                <article key={product.id} className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#F0E4E5] bg-white shadow-sm transition-shadow hover:shadow-lg">
                  <div className="relative aspect-square bg-white">
                    {product.image_url ? <Image src={product.image_url} alt={product.name} fill sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw" className="object-cover" /> : <div className="flex h-full items-center justify-center text-xs text-[#8A7A76]">Sin imagen</div>}
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    <p className="mb-3 rounded-md bg-[#F7E8EA] px-2 py-1 text-center text-[10px] font-semibold text-[#98535C] sm:text-xs">{productBrand?.name ?? product.category}</p>
                    <h2 className="line-clamp-2 text-sm leading-5 font-medium sm:text-base">{product.name}</h2>
                    <p className="mt-2 text-[11px] text-[#8A7A76]">{product.stock_quantity > 0 ? "Disponible" : "Agotado"}</p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
                      <p className="text-sm font-semibold text-[#C46F7A] sm:text-base">{formatPenPrice(product.price)}</p>
                    </div>
                    <CatalogProductDetails product={product} />
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#F0E4E5] bg-white px-5 py-14 text-center">
            <p className="text-sm text-[#6B5A5A]">{products.length ? "No encontramos productos con esta búsqueda. Prueba otra palabra o marca." : "Pronto encontrarás nuestros productos aquí."}</p>
            {(brand || query) && <button type="button" onClick={clearFilters} className="mt-4 min-h-11 rounded-lg bg-[#C46F7A] px-5 text-sm font-semibold text-white">Ver todo el catálogo</button>}
          </div>
        )}
      </div>
    </div>
  );
}
