/**
 * Product gallery folders live under /public/products/<slug>/
 * with photos named 1.jpg, 2.jpg, 3.jpg, 4.jpg
 *
 * Example:
 *   public/products/skin1004-sun-stick/1.jpg
 *   public/products/skin1004-sun-stick/2.jpg
 *   public/products/skin1004-sun-stick/3.jpg
 *   public/products/skin1004-sun-stick/4.jpg
 */
const PRODUCT_GALLERY_FOLDERS: Record<string, string> = {
  "skin1004 madagascar centella hyalu-cica silky-fit sun stick":
    "skin1004-sun-stick",
  "skin1004 madagascar centella toning toner": "skin1004-toning-toner",
  "tirtir mask fit red cushion 27c cool beige": "tirtir-mask-fit-red-cushion",
  "tirtir mask fit red cushion (27c cool beige)": "tirtir-mask-fit-red-cushion",
  "mixsoon centella cleansing water": "mixsoon-centella-cleansing-water",
  "skin1004 madagascar centella ampoule foam":
    "skin1004-madagascar-centella-ampoule-foam",
  "skin1004 madagascar centella tone brightening cleansing gel foam":
    "skin1004-madagascar-centella-tone-brightening-cleansing-gel-foam",
  "tocobo coconut clay cleansing foam": "tocobo-coconut-clay-cleansing-foam",
  "mixsoon centella cleansing foam": "mixsoon-centella-cleansing-foam",
  "skin1004 madagascar centella hyalu-cica brightening toner":
    "skin1004-madagascar-centella-hyalu-cica-brightening-toner",
  "skin1004 madagascar centella hyalu-cica blue serum":
    "skin1004-madagascar-centella-hyalu-cica-blue-serum",
  "skin1004 madagascar centella niacinamide 10 boosting shot ampoule":
    "skin1004-madagascar-centella-niacinamide-10-boosting-shot-ampoule",
  "skin1004 madagascar centella niacinamide 10% boosting shot ampoule":
    "skin1004-madagascar-centella-niacinamide-10-boosting-shot-ampoule",
  "anua 7+ rice ceramide hydrating barrier serum":
    "anua-7-rice-ceramide-hydrating-barrier-serum",
  "anua 10+ azelaic acid 10 hyaluron redness soothing serum":
    "anua-10-azelaic-acid-10-hyaluron-redness-soothing-serum",
  "anua 10+ niacinamide 10 txa 4 serum":
    "anua-10-niacinamide-10-txa-4-serum",
  "tocobo cica calming serum": "tocobo-cica-calming-serum",
  "skin1004 madagascar centella retinol 0.2 boosting shot ampoule":
    "skin1004-madagascar-centella-retinol-0-2-boosting-shot-ampoule",
  "skin1004 madagascar centella retinol 0.2% boosting shot ampoule":
    "skin1004-madagascar-centella-retinol-0-2-boosting-shot-ampoule",
  "k-secret seoul 1988 serum : retinal liposome 2% + black ginseng":
    "k-secret-seoul-1988-serum-retinal-liposome-2-black-ginseng",
  "k-secret seoul 1988 serum: retinal liposome 2% + black ginseng":
    "k-secret-seoul-1988-serum-retinal-liposome-2-black-ginseng",
  "skin1004 madagascar centella hyalu-cica sleeping pack":
    "skin1004-madagascar-centella-hyalu-cica-sleeping-pack",
  "tocobo cica calming gel cream": "tocobo-cica-calming-gel-cream",
  "mixsoon bean cream": "mixsoon-bean-cream",
  "centellian 24 360° shot pdrn lifting eye cream":
    "centellian-24-360-shot-pdrn-lifting-eye-cream",
  "centellian 24 360 shot pdrn lifting eye cream":
    "centellian-24-360-shot-pdrn-lifting-eye-cream",
  "skin1004 madagascar centella hyalu-cica water-fit sun serum":
    "skin1004-madagascar-centella-hyalu-cica-water-fit-sun-serum",
  "celimax pore + dark spot brightening care sunscreen":
    "celimax-pore-dark-spot-brightening-care-sunscreen",
  "beauty of joseon relief sun : rice + probiotics":
    "beauty-of-joseon-relief-sun-rice-probiotics",
  "beauty of joseon relief sun: rice + probiotics":
    "beauty-of-joseon-relief-sun-rice-probiotics",
  "tocobo bio watery sun cream": "tocobo-bio-watery-sun-cream",
  "pure glow essentials set": "pure-glow-essentials-set",
  "mixsoon pure glow essentials set": "pure-glow-essentials-set",
  "centellian 24+ madeca mela capture ampoule capsule cream":
    "centellian-24-madeca-mela-capture-ampoule-capsule-cream",
  "centellian 24 madeca mela capture ampoule capsule cream":
    "centellian-24-madeca-mela-capture-ampoule-capsule-cream",
  "centellian24 madeca mela capture ampoule capsule cream":
    "centellian-24-madeca-mela-capture-ampoule-capsule-cream",
  "centellian 24+ madeca mela capture ampoule pad":
    "centellian-24-madeca-mela-capture-ampoule-pad",
  "centellian 24 madeca mela capture ampoule pad":
    "centellian-24-madeca-mela-capture-ampoule-pad",
  "centellian24 madeca mela capture ampoule pad":
    "centellian-24-madeca-mela-capture-ampoule-pad",
  "skin1004 madagascar centella tone brightening capsule ampoule":
    "skin1004-madagascar-centella-tone-brightening-capsule-ampoule",
  "skin1004 madagascar centella air-fit suncream plus spf50+ pa++++":
    "skin1004-madagascar-centella-air-fit-suncream-plus-spf50-pa",
  "skin1004 madagascar centella air-fit suncream plus":
    "skin1004-madagascar-centella-air-fit-suncream-plus-spf50-pa",
  "centella air-fit suncream plus skin1004":
    "skin1004-madagascar-centella-air-fit-suncream-plus-spf50-pa",
  "beauty of joseon matte sun stick : mugwort + camelia spf50+ pa++++":
    "beauty-of-joseon-matte-sun-stick-mugwort-camelia-spf50-pa",
  "beauty of joseon matte sun stick: mugwort + camelia spf50+ pa++++":
    "beauty-of-joseon-matte-sun-stick-mugwort-camelia-spf50-pa",
  "beauty of joseon matte sun stick : mugwort + camelia":
    "beauty-of-joseon-matte-sun-stick-mugwort-camelia-spf50-pa",
  "beauty of joseon matte sun stick: mugwort + camelia":
    "beauty-of-joseon-matte-sun-stick-mugwort-camelia-spf50-pa",
  "cosrx advanced snail 96 mucin power essence":
    "cosrx-advanced-snail-96-mucin-power-essence",
  "skin1004 madagascar centella hyalu-cica first ampoule":
    "skin1004-madagascar-centella-hyalu-cica-first-ampoule",
  "skin1004 madagascar centella hyalu-cica first ampoul":
    "skin1004-madagascar-centella-hyalu-cica-first-ampoule",
};

const GALLERY_FILE_NAMES = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"] as const;

function normalizeName(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

export function getProductGalleryFolder(productName: string): string | null {
  return PRODUCT_GALLERY_FOLDERS[normalizeName(productName)] ?? null;
}

export function getProductGalleryImages(
  productName: string,
  fallbackImageUrl: string | null,
): string[] {
  const folder = getProductGalleryFolder(productName);
  if (folder) {
    return GALLERY_FILE_NAMES.map((file) => `/products/${folder}/${file}`);
  }
  return fallbackImageUrl ? [fallbackImageUrl] : [];
}
