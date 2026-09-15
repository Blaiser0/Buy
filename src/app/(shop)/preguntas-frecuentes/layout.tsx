import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Preguntas Frecuentes | Buyú Beauty",
  "Resuelve tus dudas sobre los productos de K-Beauty, pedidos, pagos y envíos de Buyú Beauty. Consulta las respuestas antes de elegir tu rutina de skincare coreano.",
  "/preguntas-frecuentes",
);

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
