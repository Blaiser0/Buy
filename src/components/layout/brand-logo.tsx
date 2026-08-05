import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function BrandLogo({
  href = "/",
  className,
  imageClassName,
  priority = false,
}: BrandLogoProps) {
  return (
    <Link href={href} className={cn("inline-flex items-center", className)}>
      <Image
        src="/logo.png"
        alt="BUYU"
        width={140}
        height={40}
        className={cn(
          "h-8 w-auto max-w-[160px] object-contain object-left md:h-9 md:max-w-none",
          imageClassName,
        )}
        priority={priority}
      />
    </Link>
  );
}
