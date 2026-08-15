import Link from "next/link";
import {
  Droplets,
  FlaskConical,
  Gift,
  Heart,
  Palette,
  Sparkles,
  Sun,
  Wind,
} from "lucide-react";
import { HomeReveal } from "@/components/home/home-reveal";
import { productsCategoryHref } from "@/lib/products/search";
import { cn } from "@/lib/utils";
import { boutiqueSans } from "@/lib/boutique-theme";

const CATEGORIES = [
  {
    href: productsCategoryHref("Limpiadores"),
    label: "Limpiadores",
    Icon: Droplets,
  },
  {
    href: productsCategoryHref("Tónicos"),
    label: "Tónicos",
    Icon: Wind,
  },
  {
    href: productsCategoryHref("Sueros"),
    label: "Sueros",
    Icon: FlaskConical,
  },
  {
    href: productsCategoryHref("Hidratantes"),
    label: "Hidratantes",
    Icon: Heart,
  },
  {
    href: productsCategoryHref("Protectores"),
    label: "Solares",
    Icon: Sun,
  },
  {
    href: productsCategoryHref("Maquillaje"),
    label: "Maquillaje",
    Icon: Palette,
  },
  {
    href: productsCategoryHref("Sets"),
    label: "Sets",
    Icon: Gift,
  },
  {
    href: "/productos",
    label: "Novedades",
    Icon: Sparkles,
  },
] as const;

export function HomeCategoryIcons() {
  return (
    <section
      className={cn(
        boutiqueSans.className,
        "bg-white px-4 py-10 sm:px-6 sm:py-12",
      )}
    >
      <HomeReveal>
        <div className="mx-auto grid max-w-6xl grid-cols-4 gap-4 sm:gap-6 md:grid-cols-8">
          {CATEGORIES.map(({ href, label, Icon }, index) => (
            <Link
              key={label}
              href={href}
              className="group flex flex-col items-center gap-2.5 text-center"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <span className="flex size-14 items-center justify-center rounded-full border border-[#EAD6D8] bg-[#FEFAF9] text-[#D68C96] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-[#D68C96] group-hover:bg-[#F7E8EA] group-hover:shadow-[0_8px_18px_rgba(214,140,150,0.18)] sm:size-16">
                <Icon
                  className="size-5 transition-transform duration-300 group-hover:scale-110 sm:size-6"
                  strokeWidth={1.4}
                />
              </span>
              <span className="text-[10px] font-medium tracking-[0.08em] text-[#2C2C2C] uppercase transition-colors duration-300 group-hover:text-[#C46F7A] sm:text-[11px]">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </HomeReveal>
    </section>
  );
}
