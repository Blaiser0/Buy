import {
  HeartHandshake,
  Leaf,
  MessageCircleHeart,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { HomeReveal } from "@/components/home/home-reveal";
import { cn } from "@/lib/utils";
import { boutiqueSans, boutiqueSerif } from "@/lib/boutique-theme";

const COMMITMENTS = [
  {
    Icon: Leaf,
    title: "K-Beauty auténtico",
    description:
      "Seleccionamos fórmulas coreanas reales, con activos claros y texturas pensadas para el día a día.",
  },
  {
    Icon: Sparkles,
    title: "Glow natural",
    description:
      "Rutinas orientadas a hidratación, calma y luminosidad sin sensación pesada.",
  },
  {
    Icon: ShieldCheck,
    title: "Cuidado confiable",
    description:
      "Priorizamos marcas reconocidas y productos con foco en confort, también para piel sensible.",
  },
  {
    Icon: MessageCircleHeart,
    title: "Asesoría cercana",
    description:
      "Te ayudamos a armar una rutina simple según tu tipo de piel, sin pasos innecesarios.",
  },
  {
    Icon: HeartHandshake,
    title: "Compra con confianza",
    description:
      "Productos originales, información clara y acompañamiento si tienes dudas antes o después de comprar.",
  },
  {
    Icon: PackageCheck,
    title: "Selección curada",
    description:
      "No es un catálogo infinito: es una boutique de esenciales que sí vale la pena.",
  },
] as const;

export function HomeCommitments() {
  return (
    <section
      className={cn(
        boutiqueSans.className,
        "bg-white px-4 py-12 sm:px-6 sm:py-16",
      )}
    >
      <div className="mx-auto max-w-6xl">
        <HomeReveal>
          <h2
            className={cn(
              boutiqueSerif.className,
              "mb-8 text-center text-2xl font-semibold text-[#2C2C2C] sm:mb-10 sm:text-3xl",
            )}
          >
            Nuestros compromisos
          </h2>
        </HomeReveal>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {COMMITMENTS.map(({ Icon, title, description }, index) => (
            <HomeReveal key={title} delay={index * 60}>
              <div className="group flex gap-4 rounded-xl p-2 transition-colors duration-300 hover:bg-[#FEFAF9]">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FEFAF9] text-[#D68C96] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#F7E8EA]">
                  <Icon className="size-5" strokeWidth={1.4} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-[#2C2C2C]">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#2C2C2C]/65">
                    {description}
                  </p>
                </div>
              </div>
            </HomeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
