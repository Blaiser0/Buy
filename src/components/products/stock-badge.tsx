import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StockBadgeProps = {
  stockQuantity: number;
  className?: string;
};

export function StockBadge({ stockQuantity, className }: StockBadgeProps) {
  const inStock = stockQuantity > 0;

  return (
    <Badge
      className={cn(
        "rounded-sm border-0 px-2.5 py-1 text-xs font-medium text-white",
        inStock ? "bg-emerald-600 hover:bg-emerald-600" : "bg-[#E50914] hover:bg-[#E50914]",
        className,
      )}
    >
      {inStock ? "En stock" : "Sin stock"}
    </Badge>
  );
}
