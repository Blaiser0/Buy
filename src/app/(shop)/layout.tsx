import { BrandLogo } from "@/components/layout/brand-logo";
import { SiteHeader } from "@/components/layout/site-header";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main>{children}</main>
      <footer className="border-t border-[#F8F6F0] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-[#2C2C2C]/70 md:flex-row md:items-center md:justify-between md:px-6">
          <BrandLogo imageClassName="h-8 md:h-9" />
          <p>Skincare coreano auténtico. Hecho para tu brillo natural.</p>
        </div>
      </footer>
    </div>
  );
}
