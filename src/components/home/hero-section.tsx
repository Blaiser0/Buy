import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F8F6F0]">
      <Link
        href="/productos"
        aria-label="Ver colección BUYU"
        className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914] focus-visible:ring-offset-2"
      >
        {/* Celular y tablet */}
        <div className="w-full lg:hidden">
          <Image
            src="/banner-celular.png"
            alt="BUYU K-Beauty — Tu piel, tu mejor versión"
            width={1080}
            height={1920}
            priority
            className="block h-auto w-full max-w-full"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* Laptop / escritorio */}
        <div className="hidden w-full lg:block">
          <Image
            src="/banner-laptop.png"
            alt="BUYU K-Beauty — Tu piel, tu mejor versión"
            width={1920}
            height={1080}
            priority
            className="block h-auto w-full max-w-full"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </Link>
    </section>
  );
}
