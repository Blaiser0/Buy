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
        src="/nuevo_logo.png"
        alt="BUYU"
        width={160}
        height={48}
        className={cn("h-9 w-auto object-contain md:h-10", imageClassName)}
        priority={priority}
      />
    </Link>
  );
}
