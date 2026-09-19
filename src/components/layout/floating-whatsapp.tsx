import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { buildWhatsAppUrl } from "@/lib/checkout";

export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl("Hola, Quisiera información sobre sus productos.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp (abre en una nueva pestaña)"
      title="Escríbenos por WhatsApp"
      className="fixed right-5 bottom-5 z-[105] flex size-[58px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-transform duration-200 ease-out hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#128C7E] motion-reduce:transform-none motion-reduce:transition-none lg:size-[65px]"
    >
      <span aria-hidden="true">
        <WhatsAppIcon className="size-8 lg:size-9" />
      </span>
    </a>
  );
}
