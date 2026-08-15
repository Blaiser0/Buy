"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { boutique, boutiqueSans, boutiqueSerif } from "@/lib/boutique-theme";

const SLIDES = [
  {
    title: "Belleza que florece",
    subtitle: "Rutina de rosas para una piel radiante",
    description:
      "Fórmulas con ingredientes premium que revelan tu mejor versión.",
    cta: "Descubrir rutina",
    href: "/productos",
    image: "/banner1.png",
    showCopy: true,
  },
  {
    title: "Glow K-Beauty",
    subtitle: "Skincare coreano auténtico",
    description:
      "Hidrata, calma e ilumina con esenciales seleccionados para tu rutina diaria.",
    cta: "Ver colección",
    href: "/productos",
    image: "/banner2.png",
    showCopy: true,
  },
] as const;

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index] ?? SLIDES[0];

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [index]);

  return (
    <section
      className={cn(
        boutiqueSans.className,
        "bg-gradient-to-b from-[#FEFAF9] to-white px-3 pt-3 sm:px-5 sm:pt-4",
      )}
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[#F0E4E5]/80 bg-[#FCE8EC] shadow-[0_12px_40px_rgba(214,140,150,0.12)]">
        <div className="relative grid min-h-[280px] w-full sm:min-h-[220px] sm:aspect-[6/1] lg:min-h-[260px]">
          {SLIDES.map((item, i) => (
            <div
              key={item.image}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-out",
                i === index ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={i !== index}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority={i === 0}
                className={cn(
                  "object-cover object-center transition-transform duration-[7000ms] ease-out",
                  i === index ? "scale-105" : "scale-100",
                )}
                sizes="(max-width: 1152px) 100vw, 1152px"
              />
            </div>
          ))}

          {slide.showCopy ? (
            <>
              <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-[#FCE8EC]/95 via-[#FCE8EC]/55 to-transparent sm:inset-y-0 sm:left-0 sm:w-[58%] sm:bg-gradient-to-r sm:from-[#FCE8EC]/95 sm:via-[#FCE8EC]/72 sm:to-transparent" />
              <div className="relative z-10 flex h-full items-end px-4 py-5 sm:max-w-[48%] sm:items-center sm:px-9 sm:py-5 lg:px-12">
                <div key={slide.title} className="home-hero-copy w-full max-w-md">
                  <h1
                    className={cn(
                      boutiqueSerif.className,
                      "text-[1.55rem] leading-[1.12] font-semibold text-[#4A3F3F] sm:text-[2rem] lg:text-[2.35rem]",
                    )}
                  >
                    {slide.title}
                  </h1>
                  <p className="mt-1.5 text-[13px] font-medium text-[#6B5A5A] sm:mt-2 sm:text-[14px]">
                    {slide.subtitle}
                  </p>
                  <p className="mt-1.5 hidden max-w-xs text-sm leading-relaxed text-[#7A6A6A] sm:block">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.href}
                    className="mt-3 inline-flex h-11 min-w-[9.5rem] items-center justify-center rounded-[4px] px-5 text-[11px] font-semibold tracking-[0.14em] text-white uppercase transition-all duration-300 hover:opacity-90 hover:shadow-[0_8px_20px_rgba(214,140,150,0.35)] sm:mt-4 sm:h-9 sm:px-6"
                    style={{ backgroundColor: boutique.rose }}
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <Link
              href={slide.href}
              aria-label={slide.cta}
              className="absolute inset-0 z-10"
            />
          )}

          <button
            type="button"
            aria-label="Slide anterior"
            onClick={() =>
              setIndex(
                (current) => (current - 1 + SLIDES.length) % SLIDES.length,
              )
            }
            className="absolute top-3 left-2 z-20 flex size-10 items-center justify-center rounded-full border border-white/80 bg-white/80 text-[#6B5A5A] backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white sm:top-1/2 sm:left-3 sm:size-8 sm:-translate-y-1/2"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Slide siguiente"
            onClick={() => setIndex((current) => (current + 1) % SLIDES.length)}
            className="absolute top-3 right-2 z-20 flex size-10 items-center justify-center rounded-full border border-white/80 bg-white/80 text-[#6B5A5A] backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white sm:top-1/2 sm:right-3 sm:size-8 sm:-translate-y-1/2"
          >
            <ChevronRight className="size-4" />
          </button>

          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-3.5 sm:gap-1.5">
            {SLIDES.map((item, i) => (
              <button
                key={item.image}
                type="button"
                aria-label={`Ir al slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className="flex h-8 items-center justify-center px-0.5 sm:h-auto"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-all duration-500 ease-out sm:h-1.5",
                    i === index
                      ? "w-6 bg-[#D68C96] sm:w-5"
                      : "w-2 bg-[#D68C96]/40 hover:bg-[#D68C96]/70 sm:w-1.5",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
