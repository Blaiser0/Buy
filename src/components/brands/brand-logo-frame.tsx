"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { boutiqueSerif } from "@/lib/boutique-theme";

type BrandLogoFrameProps = {
  brandName: string;
  logoPath: string;
  fallbackImage: string | null;
};

/**
 * Contenedor de logo de marca:
 * 1) intenta /brands/<slug>.png
 * 2) si falla, usa imagen de producto
 * 3) si no hay, muestra monograma
 */
export function BrandLogoFrame({
  brandName,
  logoPath,
  fallbackImage,
}: BrandLogoFrameProps) {
  const [logoFailed, setLogoFailed] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);

  const showLogo = !logoFailed;
  const showFallback = logoFailed && fallbackImage && !fallbackFailed;

  return (
    <div className="absolute inset-4 flex items-center justify-center rounded-lg border border-dashed border-[#EAD6D8] bg-white/85 transition-colors group-hover:border-[#D68C96]/55 group-hover:bg-white">
      {showLogo ? (
        <div className="relative h-full w-full">
          <Image
            src={logoPath}
            alt={`Logo ${brandName}`}
            fill
            className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 45vw, 20vw"
            onError={() => setLogoFailed(true)}
          />
        </div>
      ) : showFallback ? (
        <div className="relative h-full w-full">
          <Image
            src={fallbackImage}
            alt={brandName}
            fill
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 45vw, 20vw"
            onError={() => setFallbackFailed(true)}
          />
        </div>
      ) : (
        <span
          className={cn(
            boutiqueSerif.className,
            "text-3xl font-semibold text-[#D68C96]/75",
          )}
        >
          {brandName.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
