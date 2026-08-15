"use client";

import { FormEvent, useState } from "react";
import { HomeReveal } from "@/components/home/home-reveal";
import { cn } from "@/lib/utils";
import { boutique, boutiqueSans, boutiqueSerif } from "@/lib/boutique-theme";

export function HomeNewsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  }

  return (
    <section className={cn(boutiqueSans.className, "bg-[#FEFAF9]")}>
      <HomeReveal>
        <div
          className="px-4 py-12 sm:px-6 sm:py-14"
          style={{ backgroundColor: boutique.roseSoft }}
        >
          <div className="mx-auto max-w-3xl text-center text-white">
            <h2
              className={cn(
                boutiqueSerif.className,
                "text-2xl font-semibold sm:text-3xl",
              )}
            >
              Sé la primera en descubrir
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/90 sm:text-base">
              Recibe novedades de skincare coreano, rutinas y lanzamientos BUYU.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-6 flex max-w-xl flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setSent(false);
                }}
                placeholder="Tu correo electrónico"
                className="h-11 flex-1 rounded-md border-0 bg-white px-4 text-sm text-[#2C2C2C] outline-none transition-shadow duration-300 placeholder:text-[#2C2C2C]/40 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.35)]"
              />
              <button
                type="submit"
                className="h-11 rounded-md bg-[#2C2C2C] px-6 text-[11px] font-semibold tracking-[0.14em] text-white uppercase transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
              >
                Suscribirme
              </button>
            </form>
            {sent ? (
              <p className="mt-3 text-sm text-white/95 transition-opacity duration-300">
                Gracias. Te avisaremos con las próximas novedades.
              </p>
            ) : null}
          </div>
        </div>
      </HomeReveal>
    </section>
  );
}
