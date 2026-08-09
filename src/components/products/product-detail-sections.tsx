import type { ReactNode } from "react";
import {
  Check,
  Droplets,
  FileText,
  Heart,
  Moon,
  Star,
  Sun,
} from "lucide-react";
import type { ProductDetailContent } from "@/lib/products/detail-content";

type ProductDetailSectionsProps = {
  description: string;
  details: ProductDetailContent;
};

function SectionTitle({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mb-2.5 flex items-center gap-1.5">
      <span className="text-[#D68C96]">{icon}</span>
      <h2 className="text-[10px] font-semibold tracking-[0.14em] text-[#2C2C2C] uppercase">
        {children}
      </h2>
    </div>
  );
}

function summarizeText(text: string, maxChars: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxChars) return clean;
  const cut = clean.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 40 ? lastSpace : maxChars).trimEnd()}…`;
}

function shortBenefit(item: string) {
  const base = item.split("—")[0]?.trim() ?? item;
  return summarizeText(base, 58);
}

function shortIngredient(item: string) {
  return (item.split("—")[0]?.trim() ?? item)
    .replace(/\s*\([^)]*\)/g, "")
    .trim();
}

/** Short complete phrase for Modo de uso — never adds "..." */
function compactStep(text: string | undefined, fallback: string) {
  const clean = text?.replace(/\s+/g, " ").trim();
  if (!clean) return fallback;
  const sentence =
    clean.match(/^[^.!?]+[.!]?/)?.[0]?.trim() ?? clean;
  const words = sentence.replace(/[.!]+$/, "").split(/\s+/);
  if (words.length <= 9) {
    return `${words.join(" ")}.`;
  }
  return `${words.slice(0, 9).join(" ")}.`;
}

export function ProductDetailSections({
  description,
  details,
}: ProductDetailSectionsProps) {
  const shortDescription = summarizeText(description, 110);

  const benefits = details.benefits.slice(0, 4).map(shortBenefit);

  const ingredients = details.ingredients
    .slice(0, 4)
    .map(shortIngredient)
    .join(", ");

  const dayUse = compactStep(
    details.howToUse[0],
    "Aplica sobre el rostro limpio.",
  );
  const nightUse = compactStep(
    details.howToUse[1],
    "Repite por la noche si aplica.",
  );

  return (
    <section className="shrink-0">
      <div className="rounded-xl bg-[#F8F4F2] px-5 py-5 sm:px-6 sm:py-5 lg:rounded-2xl lg:px-5 lg:py-4 xl:px-6">
        <div className="grid grid-cols-2 gap-x-5 gap-y-5 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0">
          <div className="min-w-0">
            <SectionTitle
              icon={<FileText className="size-3.5" strokeWidth={1.75} />}
            >
              Descripción
            </SectionTitle>
            <p className="text-[11px] leading-[1.55] text-[#2C2C2C]/68">
              {shortDescription}
            </p>
          </div>

          <div className="min-w-0">
            <SectionTitle
              icon={<Heart className="size-3.5" strokeWidth={1.75} />}
            >
              Beneficios
            </SectionTitle>
            <ul className="space-y-2">
              {benefits.map((item) => (
                <li
                  key={item}
                  className="flex gap-1.5 text-[11px] leading-[1.45] text-[#2C2C2C]/68"
                >
                  <Check className="mt-0.5 size-3 shrink-0 text-[#D68C96]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <SectionTitle
              icon={<Droplets className="size-3.5" strokeWidth={1.75} />}
            >
              Ingredientes
            </SectionTitle>
            <p className="text-[11px] leading-[1.55] text-[#2C2C2C]/68">
              {ingredients}.
            </p>
          </div>

          <div className="min-w-0">
            <SectionTitle
              icon={<Sun className="size-3.5" strokeWidth={1.75} />}
            >
              Modo de uso
            </SectionTitle>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Sun className="mt-0.5 size-3.5 shrink-0 text-[#D68C96]" />
                <div className="min-w-0">
                  <p className="mb-0.5 text-[10px] font-semibold text-[#2C2C2C]">
                    Día
                  </p>
                  <p className="text-[11px] leading-[1.45] text-[#2C2C2C]/68">
                    {dayUse}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Moon className="mt-0.5 size-3.5 shrink-0 text-[#D68C96]" />
                <div className="min-w-0">
                  <p className="mb-0.5 text-[10px] font-semibold text-[#2C2C2C]">
                    Noche
                  </p>
                  <p className="text-[11px] leading-[1.45] text-[#2C2C2C]/68">
                    {nightUse}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col">
            <SectionTitle
              icon={<Star className="size-3.5" strokeWidth={1.75} />}
            >
              Reseñas
            </SectionTitle>
            <p className="font-[family-name:var(--font-product-serif)] text-[1.7rem] leading-none font-medium text-[#2C2C2C]">
              4.8
            </p>
            <div className="mt-1.5 flex items-center gap-0.5 text-[#D68C96]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3 fill-current" />
              ))}
            </div>
            <p className="mt-1.5 text-[10px] leading-normal text-[#2C2C2C]/55">
              Basado en reseñas de internet
            </p>
            <button
              type="button"
              className="mt-2.5 inline-flex h-7 w-fit items-center justify-center rounded-full border border-[#D68C96] px-3 text-[9px] font-semibold tracking-[0.12em] text-[#D68C96] uppercase transition-colors hover:bg-[#D68C96] hover:text-white"
            >
              Ver todas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
