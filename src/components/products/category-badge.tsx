import { Badge } from "@/components/ui/badge";
import type { ProductCategory } from "@/lib/products/categories";
import { cn } from "@/lib/utils";

type CategoryBadgeProps = {
  category: ProductCategory | string;
  className?: string;
};

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <Badge
      className={cn(
        "max-w-[calc(100%-0.5rem)] truncate rounded-sm border border-[#D68C96]/30 bg-[#FEFAF9] px-2 py-1 text-[10px] font-medium text-[#D68C96] hover:bg-[#FEFAF9] sm:px-2.5 sm:text-xs",
        className,
      )}
    >
      {category}
    </Badge>
  );
}
