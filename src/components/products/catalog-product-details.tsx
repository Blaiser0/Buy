"use client";

import Image from "next/image";
import Link from "next/link";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Eye, X } from "lucide-react";
import { Dialog, DialogClose, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Product } from "@/lib/db/types";
import { detectBrandFromProductName } from "@/lib/products/brands";
import { formatPenPrice, getProductDetailContent } from "@/lib/products/detail-content";
import { boutiqueSans } from "@/lib/boutique-theme";
import { cn } from "@/lib/utils";

export function CatalogProductDetails({ product }: { product: Product }) {
  const details = getProductDetailContent(product);
  const brand = detectBrandFromProductName(product.name);

  return (
    <Dialog>
      <DialogTrigger aria-label={`Ver detalles de ${product.name}`} className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#D68C96] px-2 py-2 text-xs font-medium text-[#98535C] transition-colors hover:bg-[#F7E8EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C46F7A]">
        <Eye className="size-4 shrink-0" aria-hidden="true" /> Ver detalles
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="z-[120] bg-black/50" />
        <DialogPrimitive.Popup className={cn(boutiqueSans.className, "fixed top-1/2 left-1/2 z-[121] flex max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-white text-[#2C2C2C] shadow-2xl outline-none")}>
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[#F0E4E5] px-4 py-3 sm:px-5">
            <DialogTitle className="self-center text-sm leading-snug font-semibold sm:text-base">{product.name}</DialogTitle>
            <DialogClose aria-label="Cerrar detalles" className="flex size-10 shrink-0 items-center justify-center rounded-full text-[#6B5A5A] hover:bg-[#F7E8EA] focus-visible:outline-2 focus-visible:outline-[#C46F7A]">
              <X className="size-5" aria-hidden="true" />
            </DialogClose>
          </div>
          <div className="min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-5">
            {product.image_url && (
              <div className="relative aspect-[4/3] max-h-[40dvh] w-full overflow-hidden rounded-lg bg-[#FEFAF9]">
                <Image src={product.image_url} alt={product.name} fill sizes="(max-width: 672px) 90vw, 632px" className="object-contain" />
              </div>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-md bg-[#F7E8EA] px-2 py-1 font-semibold text-[#98535C]">{brand?.name ?? product.category}</span>
              <span className="text-[#6B5A5A]">{product.category} · {product.stock_quantity > 0 ? "Disponible" : "Agotado"}</span>
            </div>
            <DialogDescription className="mt-5 whitespace-pre-line text-sm leading-7 text-[#514547]">{details.editorNote || product.description}</DialogDescription>
            {[
              { title: "Beneficios principales", items: details.benefits },
              { title: "Modo de uso", items: details.howToUse },
              { title: details.ingredientsTitle ?? "Ingredientes destacados", items: details.ingredients },
            ].filter((section) => section.items.length > 0).map((section) => (
              <section key={section.title} className="mt-6">
                <h3 className="mb-2 text-sm font-semibold text-[#98535C]">{section.title}</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[#514547] marker:text-[#D68C96]">
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            ))}
            {details.ingredientsDisclaimer && <p className="mt-3 text-xs leading-5 text-[#8A7A76]">{details.ingredientsDisclaimer}</p>}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#F0E4E5] pt-4">
              <p className="text-xl font-semibold text-[#C46F7A]">{formatPenPrice(product.price)}</p>
              <Link href={`/productos/${product.id}`} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#C46F7A] px-4 text-sm font-semibold text-white hover:bg-[#AC5D68] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C46F7A]">Ir a la ficha del producto</Link>
            </div>
          </div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}
