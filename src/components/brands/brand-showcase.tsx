"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { BrandWithProducts } from "@/lib/products/brands";
import { cn } from "@/lib/utils";
import { boutiqueSans, boutiqueSerif } from "@/lib/boutique-theme";

type BrandShowcaseProps = {
  brands: BrandWithProducts[];
};

type CardVariant = "cta-dots" | "story" | "story-soft" | "logo-footer";

const PINK_ACCENTS = [
  "#F3D5DB",
  "#F7E0E4",
  "#E8B7C0",
  "#FCE8EC",
  "#F0C9D1",
  "#FADDE3",
] as const;

function BrandLogoImage({
  name,
  logoPath,
  size = "md",
}: {
  name: string;
  logoPath: string;
  size?: "sm" | "md" | "lg";
}) {
  const [failed, setFailed] = useState(false);
  const height =
    size === "lg" ? "h-14" : size === "sm" ? "h-9" : "h-12";

  if (failed) {
    return (
      <span
        className={cn(
          boutiqueSans.className,
          "text-center text-[13px] font-bold tracking-[0.16em] text-[#2C2C2C] uppercase",
        )}
      >
        {name}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "relative mx-auto block w-full max-w-[210px] overflow-hidden rounded-xl bg-transparent",
        height,
      )}
    >
      <Image
        src={logoPath}
        alt={`Logo ${name}`}
        fill
        className="object-contain mix-blend-multiply"
        sizes="210px"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

function BrandCard({
  brand,
  variant,
  accent,
  className,
}: {
  brand: BrandWithProducts;
  variant: CardVariant;
  accent: string;
  className?: string;
}) {
  const catalogImages = brand.products
    .map((product) => product.image_url)
    .filter((url): url is string => Boolean(url));
  const gallery = [brand.productImagePath, ...catalogImages].filter(
    (url, index, list) => list.indexOf(url) === index,
  );
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [failedIndexes, setFailedIndexes] = useState<number[]>([]);

  const activeImage =
    gallery.find(
      (url, index) =>
        index >= galleryIndex && !failedIndexes.includes(index),
    ) ??
    brand.coverImage ??
    null;

  return (
    <article
      className={cn(
        boutiqueSans.className,
        "flex w-full flex-col rounded-[2.75rem] bg-[#FFF9F9] px-5 pt-7 pb-6 shadow-[0_22px_50px_rgba(196,111,122,0.12)] sm:px-6 sm:pt-8 sm:pb-7",
        className,
      )}
    >
      <div className="mb-5 flex min-h-14 items-center justify-center px-2">
        <BrandLogoImage name={brand.name} logoPath={brand.logoPath} />
      </div>

      <div
        className="relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-[2rem]"
        style={{ backgroundColor: accent }}
      >
        {activeImage ? (
          <Image
            key={activeImage}
            src={activeImage}
            alt={brand.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 260px"
            onError={() => {
              const failedAt = gallery.indexOf(activeImage);
              if (failedAt >= 0) {
                setFailedIndexes((current) =>
                  current.includes(failedAt)
                    ? current
                    : [...current, failedAt],
                );
              }
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#C46F7A]/70">
            {brand.name}
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-1 flex-col items-center">
        {variant === "cta-dots" ? (
          <>
            <Link
              href={`/productos?marca=${encodeURIComponent(brand.slug)}`}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#D68C96] px-7 text-[11px] font-semibold tracking-[0.08em] text-white transition-colors hover:bg-[#C46F7A]"
            >
              Descubrir {brand.name.split(" ")[0]}
            </Link>
            {gallery.length > 1 ? (
              <div className="mt-4 flex items-center justify-center gap-1.5">
                {gallery.slice(0, 4).map((url, index) => (
                  <button
                    key={`${brand.id}-dot-${url}`}
                    type="button"
                    aria-label={`Imagen ${index + 1}`}
                    onClick={() => setGalleryIndex(index)}
                    className={cn(
                      "size-1.5 rounded-full transition-colors",
                      activeImage === url ? "bg-[#D68C96]" : "bg-[#E8C5CB]",
                    )}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-4 flex items-center justify-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#D68C96]" />
                <span className="size-1.5 rounded-full bg-[#E8C5CB]" />
                <span className="size-1.5 rounded-full bg-[#E8C5CB]" />
              </div>
            )}
          </>
        ) : null}

        {variant === "story" || variant === "story-soft" ? (
          <p
            className={cn(
              "max-w-[16rem] text-center leading-relaxed text-[#6B5A5A]",
              variant === "story-soft" ? "text-[12px]" : "text-[13px]",
            )}
          >
            {brand.description}
          </p>
        ) : null}

        {variant === "logo-footer" ? (
          <div className="mt-1 flex w-full flex-col items-center gap-3">
            <BrandLogoImage
              name={brand.name}
              logoPath={brand.logoPath}
              size="sm"
            />
            <Link
              href={`/productos?marca=${encodeURIComponent(brand.slug)}`}
              className="text-[11px] font-semibold tracking-[0.14em] text-[#C46F7A] uppercase hover:underline"
            >
              Ver colección
            </Link>
          </div>
        ) : null}

        {(variant === "story" || variant === "story-soft") && (
          <Link
            href={`/productos?marca=${encodeURIComponent(brand.slug)}`}
            className="mt-4 text-[11px] font-semibold tracking-[0.14em] text-[#C46F7A] uppercase hover:underline"
          >
            Explorar
          </Link>
        )}
      </div>
    </article>
  );
}

/**
 * Layout calco de la referencia:
 * título a la izquierda + columnas de tarjetas escalonadas.
 */
export function BrandShowcase({ brands }: BrandShowcaseProps) {
  if (brands.length === 0) {
    return (
      <div className="rounded-[2rem] bg-white/70 px-4 py-16 text-center text-sm text-[#2C2C2C]/65">
        Aún no hay marcas disponibles.
      </div>
    );
  }

  // Orden cercano a la referencia visual (Anua, mixsoon, TOCOBO primero).
  const preferred = [
    "anua",
    "mixsoon",
    "tocobo",
    "skin1004",
    "cosrx",
    "beauty-of-joseon",
    "celimax",
    "centellian24",
    "k-secret",
    "tirtir",
  ];
  const ordered = [...brands].sort((a, b) => {
    const ai = preferred.indexOf(a.slug);
    const bi = preferred.indexOf(b.slug);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  const [a, b, c, d, e, f, ...rest] = ordered;
  const variants: CardVariant[] = [
    "cta-dots",
    "story",
    "story-soft",
    "logo-footer",
    "cta-dots",
    "story",
  ];

  return (
    <div className="relative">
      {/* Desktop: título izquierdo + columnas escalonadas */}
      <div className="hidden lg:grid lg:grid-cols-[0.9fr_1fr_1fr_1fr] lg:items-start lg:gap-6 xl:gap-8">
        <div className="sticky top-36 pt-6">
          <h1
            className={cn(
              boutiqueSerif.className,
              "text-[3.35rem] leading-[1.05] font-semibold text-[#2C2C2C] xl:text-[3.75rem]",
            )}
          >
            <span className="block">Descubre</span>
            <span className="block">Estas</span>
            <span className="block">Marcas</span>
          </h1>
          <p className="mt-5 max-w-[16rem] text-sm leading-relaxed text-[#2C2C2C]/55">
            Tu catálogo de cosmética coreana seleccionado para lograr esa piel
            de porcelana perfecta.
          </p>

          {d ? (
            <div className="mt-14 max-w-[250px]">
              <BrandCard
                brand={d}
                variant="logo-footer"
                accent={PINK_ACCENTS[3]}
              />
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-8 pt-4">
          {a ? (
            <BrandCard
              brand={a}
              variant={variants[0]}
              accent={PINK_ACCENTS[0]}
            />
          ) : null}
          {e ? (
            <BrandCard
              brand={e}
              variant={variants[4]}
              accent={PINK_ACCENTS[4]}
              className="ml-4 max-w-[92%]"
            />
          ) : null}
        </div>

        <div className="flex flex-col gap-8 pt-16">
          {b ? (
            <BrandCard
              brand={b}
              variant={variants[1]}
              accent={PINK_ACCENTS[1]}
            />
          ) : null}
          {f ? (
            <BrandCard
              brand={f}
              variant={variants[5]}
              accent={PINK_ACCENTS[5]}
              className="mr-2 max-w-[94%]"
            />
          ) : null}
        </div>

        <div className="flex flex-col gap-8 pt-8">
          {c ? (
            <BrandCard
              brand={c}
              variant={variants[2]}
              accent={PINK_ACCENTS[2]}
            />
          ) : null}
          {rest[0] ? (
            <BrandCard
              brand={rest[0]}
              variant="cta-dots"
              accent={PINK_ACCENTS[0]}
              className="mt-6"
            />
          ) : null}
        </div>
      </div>

      {/* Tablet / móvil */}
      <div className="lg:hidden">
        <h1
          className={cn(
            boutiqueSerif.className,
            "mb-8 text-[2.4rem] leading-[1.08] font-semibold text-[#2C2C2C] sm:text-5xl",
          )}
        >
          <span className="block">Descubre</span>
          <span className="block">Estas</span>
          <span className="block">Marcas</span>
        </h1>
        <p className="mb-8 max-w-md text-sm leading-relaxed text-[#2C2C2C]/55 sm:text-base">
          Tu catálogo de cosmética coreana seleccionado para lograr esa piel de
          porcelana perfecta.
        </p>

        <div className="columns-1 gap-5 sm:columns-2">
          {ordered.map((brand, index) => (
            <div key={brand.id} className="mb-5 break-inside-avoid sm:mb-6">
              <BrandCard
                brand={brand}
                variant={variants[index % variants.length] ?? "story"}
                accent={PINK_ACCENTS[index % PINK_ACCENTS.length] ?? "#FCE8EC"}
                className={index % 2 === 1 ? "sm:mt-8" : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      {rest.length > 1 ? (
        <div className="mt-8 hidden grid-cols-3 gap-6 lg:grid">
          {rest.slice(1).map((brand, index) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              variant={variants[(index + 1) % variants.length] ?? "story"}
              accent={PINK_ACCENTS[(index + 2) % PINK_ACCENTS.length] ?? "#FCE8EC"}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
