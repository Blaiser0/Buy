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
        className={cn("h-8 w-auto object-contain md:h-9", imageClassName)}
        priority={priority}
      />
    </Link>
  );
}
