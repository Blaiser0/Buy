import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeReveal } from "@/components/home/home-reveal";
import { cn } from "@/lib/utils";
import { boutique, boutiqueSans, boutiqueSerif } from "@/lib/boutique-theme";
import { productsCategoryHref } from "@/lib/products/search";

const STEPS = [
  {
    step: "01",
    title: "Limpia",
    description: "Espumas y aguas limpiadoras suaves para empezar la rutina.",
    href: productsCategoryHref("Limpiadores"),
    image: "/products/mixsoon-centella-cleansing-foam/1.jpg",
  },
  {
    step: "02",
    title: "Trata",
    description: "Tónicos, esencias y ampoules para hidratar e iluminar.",
    href: productsCategoryHref("Sueros"),
    image: "/products/cosrx-advanced-snail-96-mucin-power-essence/1.jpg",
  },
  {
    step: "03",
    title: "Hidrata",
    description: "Cremas y geles que sellan la humedad y confort.",
    href: productsCategoryHref("Hidratantes"),
    image: "/products/mixsoon-bean-cream/1.jpg",
  },
  {
    step: "04",
    title: "Protege",
    description: "Sun care diario con acabados ligeros y mate.",
    href: productsCategoryHref("Protectores"),
    image: "/products/beauty-of-joseon-relief-sun-rice-probiotics/1.jpg",
  },
] as const;

export function HomeRoutine() {
  return (
    <section
      className={cn(
        boutiqueSans.className,
        "bg-gradient-to-b from-white to-[#FEFAF9] px-4 py-12 sm:px-6 sm:py-16",
      )}
    >
      <div className="mx-auto max-w-6xl">
        <HomeReveal>
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                className={cn(
                  boutiqueSerif.className,
                  "text-2xl font-semibold text-[#2C2C2C] sm:text-3xl",
                )}
              >
                Rutina de cuidado
              </h2>
              <p className="mt-2 max-w-lg text-sm text-[#2C2C2C]/65">
                Cuatro pasos K-Beauty para construir tu glow: limpia, trata,
                hidrata y protege.
              </p>
            </div>
            <Link
              href="/productos"
              className="inline-flex h-10 items-center justify-center rounded-md px-5 text-[11px] font-semibold tracking-[0.14em] text-white uppercase transition-all duration-300 hover:opacity-90 hover:shadow-[0_8px_18px_rgba(214,140,150,0.3)]"
              style={{ backgroundColor: boutique.rose }}
            >
              Ver rutinas
            </Link>
          </div>
        </HomeReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item, index) => (
            <HomeReveal key={item.step} delay={index * 80}>
              <div className="relative h-full">
                <Link
                  href={item.href}
                  className="group block h-full overflow-hidden rounded-xl bg-white shadow-[0_1px_0_rgba(214,140,150,0.1)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(214,140,150,0.14)]"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#F7E8EA]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="space-y-1.5 p-4">
                    <p className="text-[10px] font-semibold tracking-[0.18em] text-[#D68C96] uppercase">
                      Paso {item.step}
                    </p>
                    <h3 className="text-lg font-semibold text-[#2C2C2C]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#2C2C2C]/65">
                      {item.description}
                    </p>
                  </div>
                </Link>
                {index < STEPS.length - 1 ? (
                  <ArrowRight
                    className="absolute top-[22%] -right-3 z-10 hidden size-5 text-[#D68C96]/70 lg:block"
                    strokeWidth={1.5}
                  />
                ) : null}
              </div>
            </HomeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
