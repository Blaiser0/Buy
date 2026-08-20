"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { boutiqueSans, boutiqueSerif } from "@/lib/boutique-theme";

const FAQS = [
  {
    question: "¿Qué tipo de productos vende BUYU?",
    answer:
      "Somos una boutique de skincare y maquillaje K-Beauty. Encontrarás limpiadores, tónicos, sueros y ampollas, hidratantes, protectores solares, maquillaje y sets seleccionados de marcas coreanas.",
  },
  {
    question: "¿Las marcas son originales?",
    answer:
      "Sí. Trabajamos con firmas K-Beauty reconocidas como Anua, mixsoon, TOCOBO, SKIN1004, COSRX, Beauty of Joseon, Celimax, Centellian24, K-SECRET y TIRTIR. Priorizamos productos auténticos y una selección curada, no un catálogo infinito.",
  },
  {
    question: "¿Cómo encuentro un producto o marca?",
    answer:
      "Puedes usar el buscador del encabezado escribiendo el nombre del producto o la marca. También puedes ir a Marcas, elegir una firma, o filtrar en Productos por tipo, marca, precio y disponibilidad.",
  },
  {
    question: "¿Puedo guardar productos para después?",
    answer:
      "Sí. Puedes añadir artículos a Mis deseos desde la ficha del producto. El carrito y la lista de deseos se guardan en tu navegador para que no se pierdan al salir de la página.",
  },
  {
    question: "¿Cómo funciona el carrito?",
    answer:
      "Al pulsar Añadir, el producto entra al carrito. Desde el ícono de bolsa puedes revisar cantidades, quitar productos y continuar tu compra sin salir de la página en la que estabas.",
  },
  {
    question: "¿Ofrecen recojo en tienda?",
    answer:
      "Sí. En las fichas de producto indicamos recojo en tienda como opción disponible. Si tienes dudas sobre horarios o tu pedido, escríbenos por correo o WhatsApp.",
  },
  {
    question: "¿Cuál es el horario de atención?",
    answer:
      "Atendemos de lunes a sábado de 8:30 a. m. a 9:00 p. m., y los domingos de 9:00 a. m. a 8:00 p. m.",
  },
  {
    question: "¿Cómo puedo contactarlos?",
    answer:
      "Puedes escribirnos a hola@buyu.pe, usar la página de Contacto o consultarnos por WhatsApp para dudas de rutina y pedidos. Estamos para ayudarte a armar una rutina simple según tu tipo de piel.",
  },
  {
    question: "¿Sirve para piel sensible?",
    answer:
      "Muchas de nuestras marcas priorizan fórmulas suaves y calmantes (por ejemplo con centella o heartleaf). Aun así, cada piel es distinta: revisa la descripción del producto y, si tienes dudas, contáctanos antes de comprar.",
  },
  {
    question: "¿Puedo comprar sets o regalos?",
    answer:
      "Sí. Tenemos la categoría Sets & Regalos con opciones listas para regalar o para empezar una rutina completa con esenciales seleccionados.",
  },
] as const;

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#F0E4E5] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 py-4 text-left sm:py-5"
        aria-expanded={open}
      >
        <span className="text-[15px] font-semibold text-[#2C2C2C] sm:text-base">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "mt-1 size-5 shrink-0 text-[#D68C96] transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-sm leading-relaxed text-[#2C2C2C]/70 sm:pb-5 sm:text-[15px]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className={cn(
        boutiqueSans.className,
        "bg-gradient-to-b from-[#FEFAF9] to-white",
      )}
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14 md:py-16">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[#D68C96] uppercase">
          Ayuda BUYU
        </p>
        <h1
          className={cn(
            boutiqueSerif.className,
            "mt-2 text-3xl font-semibold text-[#2C2C2C] sm:text-4xl",
          )}
        >
          Preguntas frecuentes
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#2C2C2C]/65 sm:text-base">
          Respuestas claras sobre nuestra boutique, productos, marcas y cómo
          comprar en BUYU.
        </p>

        <div className="mt-8 rounded-2xl border border-[#F0E4E5] bg-white px-4 shadow-[0_10px_30px_rgba(214,140,150,0.08)] sm:px-6">
          {FAQS.map((item, index) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              open={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
            />
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-[#FEFAF9] px-5 py-6 text-center sm:px-8">
          <p className="text-sm text-[#2C2C2C]/70">
            ¿No encontraste lo que buscabas?
          </p>
          <Link
            href="/contacto"
            className="mt-3 inline-flex h-10 items-center justify-center rounded-full bg-[#D68C96] px-5 text-[11px] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#C46F7A]"
          >
            Ir a contacto
          </Link>
        </div>
      </div>
    </section>
  );
}
