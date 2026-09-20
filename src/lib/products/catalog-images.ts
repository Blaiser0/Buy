import type { Product } from "@/lib/db/types";

// Local photos supplied for the catalog. Keep existing database images first.
const CATALOG_IMAGE_FOLDERS = [
  "ANUA Heartleaf Pore Control Cleansing Oil",
  "Anua PDRN Hyaluronic Acid Capsule 100 Serum 30ml",
  "BEAUTY OF JOSEON RELIEF SUN AQUA-FRESH RICE + B5 50ML",
  "CENTELLIAN24 Madeca Cream Time Reverse",
  "COSRX Advanced Snail 92 All In One Cream",
  "K-SECRET Seoul 1988 Cleansing Foam Pine Cica 1% + Probiotics",
  "K-SECRET Seoul 1988 Cleansing Oil Pine Cica 1% + Probiotics",
  "K-SECRET Seoul 1988 Essence Snail Mucin 97% + Rice",
  "K-SECRET SEOUL 1988 EYE CREAM RETINAL LIPOSOME 4% + FERMENTED BEAN",
  "K-SECRET Seoul 1988 Sun Pine Tree + Ceramide",
  "MIXSOON BEAN CLEANSING OIL 195ML",
  "MIXSOON CENTELLA SUN CREAM",
  "MIXSOON COLLAGEN CLEANSING BALM 50ml",
  "MIXSOON GLACIER WATER HYALORONIC ACID SERUM 300ML",
  "Mixsoon Glass Skin Suitcase",
  "MIXSOON MASTER SERUM 60ML",
  "MIXSOON SOONDY CENTELLA ASIATICA ESSENCE",
  "SKIN 1004 TEA-TRICA TRAVEL KIT",
  "SKIN1004 CENTELLA TONE BRIGHTENING TONE-UP SUNSCREEN",
  "SKIN1004 HYALU-CICA TRAVEL KIT",
  "SKIN1004 Madagascar Centella Air Fit Suncream Light",
  "SKIN1004 Madagascar Centella Ampoule Set",
  "SKIN1004 Madagascar Centella Even Tone Kit 20ml",
  "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum Twin Pack SPF50+ PA++++",
  "SKIN1004 Madagascar Centella Poremizing Clear Toner",
  "SKIN1004 Madagascar Centella Poremizing Light Gel Cream",
  "SKIN1004 MADAGASCAR CENTELLA TEA-TRICA PURIFYING TONER 210M",
  "SKIN1004 Madagascar Centella Tea-Trica Soothing Sun Milk",
  "SKIN1004 MADAGASCAR CENTELLA TONE BRIGHTENING CAPSULE CREAM 75ml",
  "SKIN1004 Poremizing Velvet Finish Sunscreen",
  "SKIN1004 Soothing cream CENTELLA -crema",
  "TOCOBO - Cica Calming Sun Serum SPF50+ PA++++ - 50ML",
  "TOCOBO BIFIDA BIOME ESSENCE 50ML",
  "TOCOBO Blur Finish Sun Cushion 01 COTTON BLUE",
  "TOCOBO CALAMINE PORE CONTROL CLEANSING OIL 200ml",
  "TOCOBO COLLAGEN BRIGHTENING EYE GEL CREAM",
  "TOCOBO Double Cleansing Duo",
  "TOCOBO Mini Cica Cooling Sun Stick",
  "TOCOBO Mini Cotton Soft Sun Stick",
  "TOCOBO Mini Sun Stick Trio",
  "TOCOBO MULTI CERAMIDE CREAM",
  "TOCOBO STICK CENTELLA ASIATICA",
  "TOCOBO SUN STICK COTTON SOFT- BARRA",
  "TONYMOLY Tomatox Magic Massage Pack 80gr"
] as const;

function normalizeName(name: string) {
  return name.replace(/:/g, "").trim().toLowerCase().replace(/\s+/g, " ");
}

const catalogImages = new Map(
  CATALOG_IMAGE_FOLDERS.map((folder) => [
    normalizeName(folder),
    `/products/${encodeURIComponent(folder)}/1.jpg`,
  ]),
);

export function withCatalogImage(product: Product): Product {
  if (product.image_url?.trim()) return product;
  const image = catalogImages.get(normalizeName(product.name));
  return image ? { ...product, image_url: image } : product;
}

