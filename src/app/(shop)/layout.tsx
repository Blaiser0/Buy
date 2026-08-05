import { BrandLogo } from "@/components/layout/brand-logo";
import { SiteHeader } from "@/components/layout/site-header";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="w-full flex-1">{children}</main>
      <footer className="border-t border-[#F8F6F0] bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-3 px-4 py-8 text-sm text-[#2C2C2C]/70 sm:py-10 md:flex-row md:items-center md:justify-between md:px-6">
          <BrandLogo imageClassName="h-7 sm:h-8 md:h-9" />
          <p className="max-w-md text-sm leading-relaxed">
            Skincare coreano auténtico. Hecho para tu brillo natural.
          </p>
        </div>
      </footer>
    </div>
  );
}
