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
        "rounded-sm border border-[#E50914]/25 bg-[#F8F6F0] px-2.5 py-1 text-xs font-medium text-[#E50914] hover:bg-[#F8F6F0]",
        className,
      )}
    >
      {category}
    </Badge>
  );
}
