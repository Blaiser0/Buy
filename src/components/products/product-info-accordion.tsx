"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type ProductAccordionSection = {
  id: string;
  title: string;
  items?: string[];
  body?: string;
  footnote?: string;
};

type ProductInfoAccordionProps = {
  sections: ProductAccordionSection[];
};

export function ProductInfoAccordion({ sections }: ProductInfoAccordionProps) {
  return (
    <Accordion className="w-full border-t border-[#E8E4DA]">
      {sections.map((section) => (
        <AccordionItem
          key={section.id}
          value={section.id}
          className="border-b border-[#E8E4DA] border-t-0"
        >
          <AccordionTrigger className="rounded-none px-0 py-4 text-[15px] font-medium text-[#2C2C2C] hover:no-underline focus-visible:ring-0 sm:py-5 sm:text-base">
            {section.title}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-[#2C2C2C]/80">
            {section.body ? (
              <p className="text-sm leading-relaxed sm:text-[15px] sm:leading-7">
                {section.body}
              </p>
            ) : null}

            {section.items && section.items.length > 0 ? (
              <ul className="space-y-2.5 pl-1">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="relative pl-4 text-sm leading-relaxed before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:rounded-full before:bg-[#E50914] sm:text-[15px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            {section.footnote ? (
              <p className="mt-4 text-xs leading-relaxed text-[#9A9A9A]">
                {section.footnote}
              </p>
            ) : null}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
