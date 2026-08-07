import type { Product } from "@/lib/db/types";

export type ProductDetailContent = {
  editorNote: string;
  benefits: string[];
  howToUse: string[];
  /** Lista corta de ingredientes destacados (viñetas) */
  ingredients: string[];
  /** Lista INCI completa (texto corrido) */
  ingredientsFull?: string;
  ingredientsDisclaimer?: string;
};

const AIR_FIT_INGREDIENTS =
  "Centella Asiatica (Gotu Kola) Extract(35.8%), Cyclopentasiloxane, Zinc Oxide, Butyloctyl Salicylate, Titanium Oxide, Propanediol, Benzotriazolyl Dodecyl p-Cresol, Coptis Chinensis Root Extract, PEG-10 Dimethicone, Niacinamide, Disteardimonium Hectorite, Butylene Glycol, Magnesium Sulfate, 1,2-Hexanediol, Caprylic/Capric Glycerides, Dimethicone, VP/Hexadecene Copolymer, Polymethylsilsesquioxane, Aluminum Hydroxide, Stearic Acid, Sorbitan Sesquioleate, Triethoxycaprylylsilane, Dimethicone Crosspolymer, Dimethicone/Vinyl Dimethicone Crosspolymer, Dextrin, Theobroma Cacao (Cocoa) Extract, Pelargonium Graveolens Flower Oil, Water, Citrus Aurantium Bergamia (Bergamot) Fruit Oil, Betaine, Scutellaria Baicalensis Root Extract, Polygonum Cuspidatum Root Extract, Glycyrrhiza Glabra (Licorice) Root Extract, Camellia Sinensis Leaf Extract, Sodium Hyaluronate, Rosmarinus Officinalis (Rosemary) Leaf Extract, Chamomilla Recutita (Matricaria) Flower Extract, Rosa Damascena Flower Oil, Pentylene Glycol, Madecassoside, Citronellol, Geraniol, Linalool";

const INGREDIENTS_DISCLAIMER =
  "Los ingredientes pueden cambiar por decisión del fabricante. Para obtener una lista completa y actualizada de los ingredientes, consulta el envase del producto.";

const PRODUCT_DETAILS: Record<string, ProductDetailContent> = {
  "centella air-fit suncream plus skin1004": {
    editorNote:
      "Un protector solar ligero con textura air-fit que calma, protege e hidrata en igual medida. Formulado con extracto de centella asiática para cuidar pieles sensibles mientras ofrece una cobertura cómoda para el uso diario, sin sensación grasa ni residuo blanco.",
    benefits: [
      "Protección solar de uso diario con acabado ligero y cómodo",
      "Calma e hidrata gracias al extracto de centella asiática",
      "Textura air-fit de rápida absorción, ideal bajo maquillaje",
      "Ayuda a minimizar la sensación de grasa y el residuo blanco",
      "Adecuado para rutinas de piel sensible o reactiva",
    ],
    howToUse: [
      "Tras la rutina de cuidado (tónico, sérum y crema), aplique una cantidad generosa como último paso de la mañana.",
      "Extienda de forma uniforme sobre rostro y cuello, evitando el contacto directo con los ojos.",
      "Reaplique cada 2–3 horas si permanece bajo el sol, suda o se expone al agua.",
      "Para un acabado más fresco, dé golpecitos suaves hasta completar la absorción.",
    ],
    ingredients: [],
    ingredientsFull: AIR_FIT_INGREDIENTS,
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },
  "skin1004 - madagascar centella air-fit": {
    editorNote:
      "Un protector solar ligero con textura air-fit que calma, protege e hidrata en igual medida. Formulado con extracto de centella asiática para cuidar pieles sensibles mientras ofrece una cobertura cómoda para el uso diario, sin sensación grasa ni residuo blanco.",
    benefits: [
      "Protección solar de uso diario con acabado ligero y cómodo",
      "Calma e hidrata gracias al extracto de centella asiática",
      "Textura air-fit de rápida absorción, ideal bajo maquillaje",
      "Ayuda a minimizar la sensación de grasa y el residuo blanco",
      "Adecuado para rutinas de piel sensible o reactiva",
    ],
    howToUse: [
      "Tras la rutina de cuidado (tónico, sérum y crema), aplique una cantidad generosa como último paso de la mañana.",
      "Extienda de forma uniforme sobre rostro y cuello, evitando el contacto directo con los ojos.",
      "Reaplique cada 2–3 horas si permanece bajo el sol, suda o se expone al agua.",
      "Para un acabado más fresco, dé golpecitos suaves hasta completar la absorción.",
    ],
    ingredients: [],
    ingredientsFull: AIR_FIT_INGREDIENTS,
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },
  "centella hyalu-cica skin1004": {
    editorNote:
      "Un cuidado Hyalu-Cica suave que calma, hidrata e ilumina en igual medida. Combina extracto de centella asiática con ácido hialurónico y activos humectantes para producir un acabado fresco, flexible y confortable. Ideal para pieles sensibles o deshidratadas que buscan recuperación e hidratación profunda.",
    benefits: [
      "Hidratación profunda con sensación fresca y ligera",
      "Calma e irritaciones gracias a la centella asiática",
      "Refuerza la barrera cutánea y mejora la elasticidad",
      "Ayuda a suavizar la apariencia de sequedad y tirantez",
      "Compatible con rutinas mínimas y pieles sensibles",
    ],
    howToUse: [
      "Sobre el rostro limpio, aplique una cantidad adecuada tras el tónico.",
      "Extienda con suavidad o dé golpecitos para una absorción óptima.",
      "Puede usarse mañana y noche, solo o bajo su crema habitual.",
      "Si lo usa en la mañana, continúe con protector solar.",
    ],
    ingredients: [
      "Extracto de Centella Asiática — calma y repara la barrera",
      "Ácido Hialurónico — hidratación multi-nivel",
      "Complejo Hyalu-Cica — confort e hidratación prolongada",
      "Activos humectantes — mantienen la piel flexible y suave",
    ],
  },
};

function normalizeName(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

function fallbackContent(product: Product): ProductDetailContent {
  return {
    editorNote:
      product.description?.trim() ||
      "Fórmula de skincare coreano seleccionada para una rutina limpia, efectiva y cómoda en el día a día.",
    benefits: [
      "Fórmula pensada para el cuidado diario de la piel",
      "Textura cómoda y de rápida absorción",
      "Ayuda a mantener la piel calmada e hidratada",
      "Acabado fresco y natural",
    ],
    howToUse: [
      "Aplique sobre la piel limpia una cantidad adecuada del producto.",
      "Extienda con suavidad o use una almohadilla de algodón según el formato.",
      "Dé golpecitos suaves para favorecer la absorción.",
      "Continúe con el resto de su rutina y, en el día, finalice con protector solar.",
    ],
    ingredients: [
      "Activos botánicos de cuidado coreano",
      "Agentes hidratantes para confort cutáneo",
      "Componentes calmantes para piel sensible",
    ],
  };
}

export function getProductDetailContent(
  product: Product,
): ProductDetailContent {
  const key = normalizeName(product.name);

  if (PRODUCT_DETAILS[key]) {
    return PRODUCT_DETAILS[key];
  }

  // Coincide variantes del nombre Air-Fit / Madagascar Centella
  if (
    key.includes("air-fit") ||
    key.includes("air fit") ||
    (key.includes("madagascar centella") && key.includes("sun"))
  ) {
    return PRODUCT_DETAILS["centella air-fit suncream plus skin1004"];
  }

  return fallbackContent(product);
}

export function formatPenPrice(price: number) {
  return `S/ ${price.toFixed(2)}`;
}
