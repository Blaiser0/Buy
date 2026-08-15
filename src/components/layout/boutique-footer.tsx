import Link from "next/link";
import { Camera, Mail, MessageCircle, Music2, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { boutique, boutiqueSans, boutiqueSerif } from "@/lib/boutique-theme";
import { productsCategoryHref } from "@/lib/products/search";

const COLUMNS = [
  {
    title: "Comprar",
    links: [
      { href: "/productos", label: "Toda la colección" },
      { href: productsCategoryHref("Limpiadores"), label: "Limpiadores" },
      { href: productsCategoryHref("Tónicos"), label: "Tónicos" },
      { href: productsCategoryHref("Sueros"), label: "Sueros y Ampollas" },
      { href: productsCategoryHref("Hidratantes"), label: "Hidratantes" },
      {
        href: productsCategoryHref("Protectores"),
        label: "Protectores Solares",
      },
      { href: productsCategoryHref("Maquillaje"), label: "Maquillaje" },
      { href: productsCategoryHref("Sets"), label: "Sets & Regalos" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { href: "/contacto", label: "Contacto" },
      { href: "/productos", label: "Envíos" },
      { href: "/productos", label: "Cambios y devoluciones" },
      { href: "/contacto", label: "Preguntas frecuentes" },
    ],
  },
  {
    title: "Nuestro Mundo",
    links: [
      { href: "/sobre-nosotros", label: "Sobre BUYU" },
      { href: "/marcas", label: "Marcas" },
      { href: "/productos", label: "Novedades" },
    ],
  },
] as const;

const SOCIAL = [
  { href: "https://instagram.com", label: "Instagram", Icon: Camera },
  { href: "https://facebook.com", label: "Facebook", Icon: Share2 },
  { href: "https://youtube.com", label: "YouTube", Icon: Music2 },
] as const;

export function BoutiqueFooter() {
  return (
    <footer
      className={cn(boutiqueSans.className, "border-t bg-white text-[#2C2C2C]")}
      style={{ borderColor: boutique.border }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 md:py-14 lg:grid-cols-[1.2fr_repeat(3,1fr)_1.1fr] lg:gap-8">
        <div className="space-y-4 sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-block">
            <span
              className={cn(
                boutiqueSerif.className,
                "block text-[1.35rem] font-semibold tracking-[0.18em] uppercase",
              )}
            >
              BUYU
            </span>
            <span className="mt-1 block text-[0.58rem] font-medium tracking-[0.35em] text-[#2C2C2C]/65 uppercase">
              Boutique
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-[#2C2C2C]/70">
            Skincare coreano auténtico. Rutinas suaves, glow natural y productos
            seleccionados para tu piel.
          </p>
          <div className="flex items-center gap-1 text-[#2C2C2C]/55">
            {SOCIAL.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex size-10 items-center justify-center hover:text-[#D68C96]"
              >
                <Icon className="size-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="mb-3 text-[11px] font-semibold tracking-[0.16em] text-[#2C2C2C] uppercase">
              {column.title}
            </h3>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#2C2C2C]/65 transition-colors hover:text-[#D68C96]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="mb-3 text-[11px] font-semibold tracking-[0.16em] text-[#2C2C2C] uppercase">
            Atención al cliente
          </h3>
          <ul className="space-y-3 text-sm text-[#2C2C2C]/70">
            <li>Lun – Sáb · 10:00 – 19:00</li>
            <li className="flex items-start gap-2">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-[#D68C96]" />
              <span>WhatsApp · Consultas de rutina</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-[#D68C96]" />
              <a href="mailto:hola@buyu.pe" className="hover:text-[#D68C96]">
                hola@buyu.pe
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="border-t px-4 py-4 text-center text-xs text-[#2C2C2C]/50 sm:px-6"
        style={{ borderColor: boutique.border }}
      >
        © {new Date().getFullYear()} BUYU Boutique. Skincare coreano auténtico.
      </div>
    </footer>
  );
}
