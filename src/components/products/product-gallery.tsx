"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  name: string;
  images: string[];
};

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const safeImages = images.filter(Boolean);
  const current = safeImages[active] ?? safeImages[0];

  if (!safeImages.length || !current) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-xl text-sm text-[#2C2C2C]/40">
        Sin imagen
      </div>
    );
  }

  return (
    <div className="flex h-full gap-2.5 sm:gap-3">
      <div className="flex w-[56px] shrink-0 flex-col items-center gap-1.5 sm:w-[64px] lg:w-[58px] lg:justify-between xl:w-[64px]">
        <div className="flex w-full flex-col gap-1.5 lg:min-h-0 lg:flex-1 lg:justify-center">
          {safeImages.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative aspect-square w-full overflow-hidden rounded-lg transition-opacity lg:max-h-[18%]",
                active === index
                  ? "opacity-100 ring-1 ring-[#D68C96]"
                  : "opacity-70 hover:opacity-100",
              )}
              aria-label={`Vista ${index + 1}`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover object-center"
                sizes="64px"
              />
            </button>
          ))}
        </div>
        {safeImages.length > 4 ? (
          <button
            type="button"
            aria-label="Más imágenes"
            className="flex size-5 items-center justify-center text-[#D68C96] lg:size-4"
          >
            <ChevronDown className="size-3.5" />
          </button>
        ) : null}
      </div>

      <div className="relative aspect-square min-h-0 min-w-0 flex-1 overflow-hidden rounded-xl">
        <Image
          src={current}
          alt={name}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 80vw, 42vw"
          priority
        />

        <div className="absolute top-2.5 right-2.5 flex size-14 flex-col items-center justify-center rounded-full bg-[#E8A4AB] text-center shadow-sm lg:size-16 xl:size-[4.5rem]">
          <Heart className="mb-0.5 size-2.5 fill-white text-white lg:size-3" />
          <span className="text-[8px] leading-tight font-semibold tracking-[0.08em] text-white uppercase lg:text-[9px]">
            Best
            <br />
            Seller
          </span>
        </div>
      </div>
    </div>
  );
}
