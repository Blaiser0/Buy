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
        "rounded-sm border border-[#D68C96]/30 bg-[#FEFAF9] px-2.5 py-1 text-xs font-medium text-[#D68C96] hover:bg-[#FEFAF9]",
        className,
      )}
    >
      {category}
    </Badge>
  );
}
