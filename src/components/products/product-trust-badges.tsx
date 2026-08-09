import { Leaf, ShieldCheck, Store } from "lucide-react";

function BunnyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <path d="M8 9c-1.5-3.5-2.2-6-1-7 .8 2 2.5 4.2 3.5 5.5" />
      <path d="M16 9c1.5-3.5 2.2-6 1-7-.8 2-2.5 4.2-3.5 5.5" />
      <path d="M6.5 12.5a5.5 5.5 0 0 1 11 0v2a4 4 0 0 1-4 4h-3a4 4 0 0 1-4-4v-2Z" />
      <circle cx="10" cy="13" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="14" cy="13" r="0.7" fill="currentColor" stroke="none" />
      <path d="M12 14.2v1.2" />
    </svg>
  );
}

const BADGES = [
  {
    icon: Store,
    label: "Recojo en tienda",
    sub: "en cualquier compra",
  },
  {
    icon: ShieldCheck,
    label: "Pago seguro",
    sub: "100% protegido",
  },
  {
    icon: Leaf,
    label: "Ingredientes",
    sub: "de alta calidad",
  },
  {
    icon: BunnyIcon,
    label: "Cruelty free",
    sub: "No testado en animales",
  },
] as const;

export function ProductTrustBadges() {
  return (
    <div className="grid grid-cols-4 gap-2 border-t border-[#F0E4E5] pt-3 lg:pt-2.5">
      {BADGES.map(({ icon: Icon, label, sub }) => (
        <div key={label} className="flex flex-col items-center gap-1 text-center">
          <Icon className="size-4 text-[#D68C96] lg:size-[15px]" strokeWidth={1.5} />
          <div>
            <p className="text-[9px] leading-tight font-semibold text-[#2C2C2C]/75">
              {label}
            </p>
            <p className="text-[8px] leading-tight text-[#2C2C2C]/50">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
