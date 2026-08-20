/** Contacto BUYU para consultas y confirmación de pedidos. */
export const BUYU_WHATSAPP = {
  display: "+51 973 371 522",
  /** Digits only for wa.me links */
  e164: "51973371522",
} as const;

/** Datos de ejemplo para Yape / Plin (reemplazar por los reales). */
export const PAYMENT_ACCOUNTS = {
  titular: "BUYU Boutique S.A.C. (Ejemplo)",
  yape: {
    label: "Yape",
    number: "973 371 522",
    qrPath: "/payments/yape-qr.svg",
  },
  plin: {
    label: "Plin",
    number: "973 371 522",
    qrPath: "/payments/plin-qr.svg",
  },
} as const;

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${BUYU_WHATSAPP.e164}?text=${encodeURIComponent(message)}`;
}

export function stockInquiryMessage(productName: string, priceLabel: string) {
  return [
    "Hola, ¿tienen stock de este producto?",
    `${productName} (${priceLabel})`,
  ].join("\n");
}

export function orderConfirmationMessage(params: {
  totalLabel: string;
  itemsSummary: string;
}) {
  return [
    "Hola, acabo de pagar mi pedido.",
    `Monto: ${params.totalLabel}`,
    params.itemsSummary,
    "Adjunto la captura del pago.",
  ].join("\n");
}

export function summarizeCartItems(
  items: Array<{ name: string; quantity: number; price: number }>,
) {
  return items
    .map(
      (item) =>
        `• ${item.name} x${item.quantity} (S/ ${(item.price * item.quantity).toFixed(2)})`,
    )
    .join("\n");
}
