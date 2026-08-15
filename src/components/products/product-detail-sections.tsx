import type { ReactNode } from "react";
import {
  Check,
  Droplets,
  FileText,
  Heart,
  Sparkles,
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
    <div className="mb-3 flex min-h-8 items-start gap-1.5">
      <span className="mt-0.5 shrink-0 text-[#D68C96]">{icon}</span>
      <h2 className="text-[10px] leading-snug font-semibold tracking-[0.12em] text-[#2C2C2C] uppercase">
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
  return `${cut.slice(0, lastSpace > 40 ? lastSpace : maxChars).trimEnd()}.`;
}

function parseLabeledItem(item: string, titleMax = 40, detailMax = 78) {
  const [titlePart, ...rest] = item.split("—");
  const title = titlePart?.trim() ?? item;
  const detail = rest.join("—").trim();
  return {
    title: summarizeText(title, titleMax),
    detail: detail ? summarizeText(detail, detailMax) : null,
  };
}

function formatUseStep(text: string | undefined, fallback: string) {
  const clean = text?.replace(/\s+/g, " ").trim();
  if (!clean) return fallback;
  return summarizeText(clean, 110);
}

export function ProductDetailSections({
  description,
  details,
}: ProductDetailSectionsProps) {
  const shortDescription =
    details.cardDescription?.trim() ||
    summarizeText(details.editorNote || description, 210);

  const benefits = details.benefits.slice(0, 4).map((item) =>
    parseLabeledItem(item, 36, 72),
  );
  const ingredientItems = details.ingredients.slice(0, 4).map((item) =>
    parseLabeledItem(item, 42, 80),
  );
  const useSteps = details.howToUse
    .slice(0, 3)
    .map((step, index) =>
      formatUseStep(
        step,
        index === 0
          ? "Aplica sobre el rostro limpio."
          : "Continúa con el resto de tu rutina.",
      ),
    );

  const ingredientsTitle = details.ingredientsTitle ?? "Ingredientes";
  const closingTitle = details.closingTitle ?? "Reseñas";
  const closingItems = details.closingItems;
  const closingNote = details.closingNote?.trim();

  const columns = [
    {
      key: "descripcion",
      title: "Descripción",
      icon: <FileText className="size-3.5" strokeWidth={1.75} />,
      content: (
        <p className="text-[11px] leading-relaxed text-[#2C2C2C]/70">
          {shortDescription}
        </p>
      ),
    },
    {
      key: "beneficios",
      title: "Beneficios",
      icon: <Heart className="size-3.5" strokeWidth={1.75} />,
      content: (
        <ul className="space-y-2.5">
          {benefits.map((item) => (
            <li key={item.title} className="flex gap-1.5 text-[11px] leading-snug">
              <Check className="mt-0.5 size-3 shrink-0 text-[#D68C96]" />
              <span>
                <span className="font-medium text-[#2C2C2C]/85">{item.title}</span>
                {item.detail ? (
                  <span className="mt-0.5 block text-[#2C2C2C]/60">
                    {item.detail}
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "ingredientes",
      title: ingredientsTitle,
      icon: <Droplets className="size-3.5" strokeWidth={1.75} />,
      content: (
        <ul className="space-y-2.5">
          {ingredientItems.map((item) => (
            <li key={item.title} className="text-[11px] leading-snug">
              <span className="font-medium text-[#2C2C2C]/85">{item.title}</span>
              {item.detail ? (
                <span className="mt-0.5 block text-[#2C2C2C]/60">
                  {item.detail}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "modo-de-uso",
      title: "Modo de uso",
      icon: <Sun className="size-3.5" strokeWidth={1.75} />,
      content: (
        <ol className="space-y-2.5">
          {useSteps.map((step, index) => (
            <li key={step} className="flex gap-1.5 text-[11px] leading-relaxed">
              <span className="mt-px shrink-0 font-medium text-[#D68C96]">
                {index + 1}.
              </span>
              <span className="text-[#2C2C2C]/70">{step}</span>
            </li>
          ))}
        </ol>
      ),
    },
    {
      key: "cierre",
      title: closingTitle,
      icon: closingItems?.length ? (
        <Sparkles className="size-3.5" strokeWidth={1.75} />
      ) : (
        <Star className="size-3.5" strokeWidth={1.75} />
      ),
      content: closingItems?.length ? (
        <div className="flex h-full flex-col justify-between gap-4">
          <ul className="space-y-2.5">
            {closingItems.map((item) => (
              <li
                key={item}
                className="flex gap-1.5 text-[11px] leading-snug text-[#2C2C2C]/70"
              >
                <Heart className="mt-0.5 size-3 shrink-0 fill-[#D68C96] text-[#D68C96]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {closingNote ? (
            <p className="text-[10px] leading-relaxed text-[#2C2C2C]/50">
              {closingNote}
            </p>
          ) : null}
        </div>
      ) : (
        <div className="flex h-full flex-col justify-between gap-4">
          <div>
            <p className="font-[family-name:var(--font-product-serif)] text-[1.7rem] leading-none font-medium text-[#2C2C2C]">
              4.8
            </p>
            <div className="mt-1.5 flex items-center gap-0.5 text-[#D68C96]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3 fill-current" />
              ))}
            </div>
            <p className="mt-1.5 text-[10px] text-[#2C2C2C]/55">
              Basado en reseñas de internet
            </p>
          </div>
          {closingNote ? (
            <p className="text-[10px] leading-relaxed text-[#2C2C2C]/50">
              {closingNote}
            </p>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <section className="shrink-0">
      <div className="overflow-hidden rounded-2xl border border-[#EAD6D8]/70 bg-[#F8F4F2]">
        <div className="grid grid-cols-1 divide-y divide-[#E8A4AB]/40 sm:grid-cols-2 sm:divide-x lg:grid-cols-5 lg:divide-y-0">
          {columns.map((column) => (
            <div
              key={column.key}
              className="flex h-full flex-col px-4 py-4 sm:px-5 sm:py-5"
            >
              <SectionTitle icon={column.icon}>{column.title}</SectionTitle>
              <div className="flex min-h-0 flex-1 flex-col">{column.content}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
