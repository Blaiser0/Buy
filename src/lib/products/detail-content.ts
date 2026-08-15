import type { Product } from "@/lib/db/types";

export type ProductDetailContent = {
  editorNote: string;
  /** Short copy for the info container Descripción column (fits without truncation) */
  cardDescription?: string;
  /** Concise technical blurb shown under the price on the product page */
  pitch?: string;
  /** Short line under the product title */
  tagline?: string;
  benefits: string[];
  howToUse: string[];
  ingredients: string[];
  ingredientsFull?: string;
  ingredientsDisclaimer?: string;
  /** Optional labels/content for the product info container */
  ingredientsTitle?: string;
  closingTitle?: string;
  closingItems?: string[];
  closingNote?: string;
};

const INGREDIENTS_DISCLAIMER =
  "Los ingredientes pueden cambiar por decisión del fabricante. Para obtener una lista completa y actualizada de los ingredientes, consulta el envase del producto.";

const TIRTIR_MASK_FIT_RED_CUSHION: ProductDetailContent = {
  editorNote:
    "Cobertura impecable al estilo K-Beauty. El TIRTIR Mask Fit Red Cushion 27C Cool Beige es una base cushion coreana de alta cobertura que ayuda a unificar el tono y disimular visualmente imperfecciones. Su fórmula ligera e hidratante deja un acabado semi-mate natural y mantiene la piel cómoda durante el día. El tono 27C Cool Beige está orientado a un matiz frío.",
  tagline: "Base cushion coreana · Alta cobertura · Acabado semi-mate",
  pitch:
    "Base cushion coreana de alta cobertura en tono 27C Cool Beige (matiz frío). Textura ligera e hidratante, acabado semi-mate natural y protección UV SPF40 como plus del maquillaje.",
  cardDescription:
    "Cushion foundation coreana de alta cobertura que unifica el tono y disimula imperfecciones. Acabado semi-mate natural, textura ligera y tono 27C de matiz frío.",
  benefits: [
    "High Coverage — Alta cobertura para ayudar a disimular manchas, rojeces e imperfecciones.",
    "Semi-Matte Finish — Acabado natural semi-mate para una apariencia uniforme y pulida.",
    "Lightweight Fit — Textura ligera que se integra fácilmente sobre la piel.",
    "Moisture Care — Ingredientes que ayudan a mantener la piel hidratada y confortable.",
    "SPF40 PA++ — Protección UV como beneficio complementario del maquillaje.",
  ],
  howToUse: [
    "Úsalo como paso de maquillaje después de tu rutina de skincare.",
    "Toma una pequeña cantidad con la esponja y aplica a toques suaves, sin arrastrar.",
    "Empieza con una capa fina y aumenta la cobertura solo donde lo necesites.",
  ],
  ingredients: [
    "Red Propolis Extract — Complementa la nutrición y el cuidado de la piel.",
    "Hibiscus / Roselle Extract — Apoya el cuidado hidratante y nutritivo de la fórmula.",
    "Sea Daffodil Extract — Ayuda a mantener la piel hidratada y con aspecto revitalizado.",
    "Water Lily Extract — Complementa la hidratación y un aspecto fresco y luminoso.",
  ],
  ingredientsTitle: "Ingredientes",
  closingTitle: "Te va a encantar",
  closingItems: [
    "Alta cobertura",
    "Acabado semi-mate natural",
    "Formato cushion práctico",
  ],
  closingNote: "Korean Makeup · Alta cobertura · Acabado semi-mate · SPF40 PA++",
};

const SKIN1004_NIACINAMIDE_10_BOOSTING_SHOT: ProductDetailContent = {
  editorNote:
    "Pore Care + Glow al estilo K-Beauty. El SKIN1004 Niacinamide 10 Boosting Shot Ampoule es una ampoule coreana de alto rendimiento con 10% de niacinamida y Centella Asiática de Madagascar. Su tecnología con microespículas favorece la entrega de los activos, ayudando a mejorar la apariencia de poros, textura y luminosidad.",
  tagline: "Ampolla concentrada · Niacinamida 10% · Pore Care",
  pitch:
    "Ampolla de alto rendimiento con 10% de niacinamida y Centella de Madagascar. Enfocada en mejorar visualmente la apariencia de poros, textura y luminosidad.",
  cardDescription:
    "Boosting Shot Ampoule coreana con 10% de niacinamida y microespículas. Ayuda a mejorar poros, textura y glow, con Centella para un cuidado más confortable.",
  benefits: [
    "Pore Care — Ayuda a reducir visiblemente la apariencia del tamaño y profundidad de los poros.",
    "Brightening Care — El 10% de niacinamida ayuda a un tono más uniforme y luminoso.",
    "Skin Smoothing — Ayuda a refinar visualmente la textura para un aspecto más liso.",
    "Glow Care — Orientada a potenciar una apariencia más clara y radiante.",
    "Soothing Support — Centella Asiática y pantenol complementan el cuidado calmante.",
  ],
  howToUse: [
    "Después del tónico y antes de la crema hidratante.",
    "Aplica una cantidad adecuada y distribúyela suavemente sobre el rostro.",
    "Puede producir un ligero hormigueo por las microespículas; empieza con uso moderado.",
  ],
  ingredients: [
    "Niacinamide 10% — Mejora la apariencia de poros, tono desigual y luminosidad.",
    "Madagascar Centella Asiatica — Complementa el cuidado calmante de la piel.",
    "Panthenol — Mantiene la piel hidratada y confortable con activos potentes.",
    "Tranexamic Acid + Vitamin C Derivative — Apoya el Brightening Care y la opacidad.",
  ],
  ingredientsTitle: "Ingredientes",
  closingTitle: "Te va a encantar",
  closingItems: [
    "Pore Care intensivo",
    "10% de Niacinamida",
    "Glow + textura más uniforme",
  ],
  closingNote: "Korean Skincare · Niacinamide 10% · Pore Care · Glow Boost",
};

const SKIN1004_RETINOL_02_BOOSTING_SHOT: ProductDetailContent = {
  editorNote:
    "Firming Care al estilo K-Beauty. El SKIN1004 Retinol 0.2% Boosting Shot Ampoule es una ampoule coreana de noche con 0.2% de retinol + retinal, diseñada para mejorar la apariencia de firmeza, elasticidad y textura. Su tecnología Boosting Shot con microespículas favorece la distribución de los activos, mientras la Centella y el pantenol complementan el cuidado de la barrera.",
  tagline: "Ampolla de noche · Retinol 0.2% · Firmeza",
  pitch:
    "Ampoule de noche con 0.2% retinol, retinal, Centella de Madagascar, pantenol y microespículas. Enfocada en firmeza, elasticidad y textura.",
  cardDescription:
    "Boosting Shot Ampoule nocturna con 0.2% retinol + retinal. Ayuda a mejorar firmeza, elasticidad y textura, con Centella y pantenol para mayor confort.",
  benefits: [
    "Firming Care — Ayuda a conseguir una apariencia más firme y elástica.",
    "Skin Smoothing — Con uso constante, mejora visualmente la textura y suavidad de la piel.",
    "Elasticity Care — Orientada a apoyar la resiliencia y elasticidad cutánea.",
    "Skin Barrier Care — Centella Asiática y pantenol complementan barrera y confort.",
    "Slow-Aging Care — Cuidado para firmeza y signos visibles del envejecimiento.",
  ],
  howToUse: [
    "Solo por la noche, siguiendo las instrucciones del envase y de forma gradual.",
    "Si es tu primera vez con retinoides, empieza poco a poco y mantén una rutina sencilla.",
    "Durante el día, completa siempre con protector solar.",
  ],
  ingredients: [
    "Retinol 0.2% — Mejora la apariencia de textura, firmeza y signos visibles de la edad.",
    "Retinal — Complementa la acción renovadora y reafirmante de la fórmula.",
    "Madagascar Centella Asiatica — Cuidado calmante dentro de una fórmula con retinoides.",
    "Panthenol — Mantiene la hidratación y apoya la barrera de la piel.",
  ],
  ingredientsTitle: "Ingredientes",
  closingTitle: "Te va a encantar",
  closingItems: [
    "0.2% Retinol + Retinal",
    "Firmeza y elasticidad",
    "Cuidado de textura",
  ],
  closingNote:
    "Korean Skincare · Firming Care · Retinol 0.2% · Skin Smoothing",
  ingredientsFull:
    "Water, Centella Asiatica Extract, Caprylic/Capric Triglyceride, Glycerin, Butylene Glycol, Niacinamide, 1,2-Hexanediol, Retinol, Retinal, Polysorbate 20, Sodium Hyaluronate, Panthenol, Tocopherol, Madecassoside, Asiaticoside, Ethylhexylglycerin, Carbomer, Tromethamine",
  ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
};

const K_SECRET_SEOUL_1988_RETINAL: ProductDetailContent = {
  editorNote:
    "Retinal Care inspirado en Seoul. El K-SECRET SEOUL 1988 Serum es un sérum renovador formulado con Retinal Liposome 2% + Black Ginseng. Su fórmula está diseñada para mejorar la apariencia de líneas finas, firmeza, textura y tono desigual, dejando la piel más lisa, luminosa y revitalizada.",
  tagline: "Sérum renovador · Retinal 2% · Ginseng negro",
  pitch:
    "Sérum enfocado en firmeza, arrugas visibles, pigmentación y textura irregular. Formulada con 2% de retinal liposomado, ginseng negro, bakuchiol, vitamina C y péptidos.",
  cardDescription:
    "Retinal Serum coreano con Retinal Liposome 2% y Black Ginseng. Ayuda a mejorar líneas finas, firmeza, textura y tono, con glow revitalizado.",
  benefits: [
    "Firming Care — Ayuda a mejorar la apariencia de firmeza y elasticidad de la piel.",
    "Wrinkle Care — El retinal liposomado suaviza la apariencia de líneas finas y arrugas.",
    "Brightening Care — Ayuda a mejorar el tono desigual y las zonas apagadas.",
    "Skin Smoothing — Favorece una textura visualmente más lisa y uniforme.",
    "Antioxidant Care — Ginseng negro y antioxidantes frente a factores externos.",
  ],
  howToUse: [
    "Preferentemente en la rutina de noche, después de limpiar y tonificar.",
    "Aplica una pequeña cantidad sobre el rostro seco y sella con crema hidratante.",
    "Incorpóralo gradualmente y usa protección solar durante el día.",
  ],
  ingredients: [
    "Retinal Liposome 2% — Retinal encapsulado para arrugas, firmeza y textura.",
    "Black Ginseng — Antioxidante que complementa elasticidad y vitalidad.",
    "Bakuchiol — Complementa firmeza, suavidad y signos visibles de la edad.",
    "Peptides + Vitamin C — Complementan elasticidad y luminosidad del rostro.",
  ],
  ingredientsTitle: "Ingredientes",
  closingTitle: "Te va a encantar",
  closingItems: [
    "Retinal Liposome 2%",
    "Firmeza + textura más uniforme",
    "Glow & Wrinkle Care",
  ],
  closingNote:
    "Korean Skincare · Retinal Care · Firming · Brightening Glow",
  ingredientsFull:
    "Panax Ginseng Root Extract, Water, Glycerin, Butylene Glycol, Caprylic/Capric Triglyceride, 1,2-Hexanediol, Retinal, Hydrogenated Lecithin, Bakuchiol, Panthenol, Sodium Hyaluronate, Tocopherol, Adenosine, Ethylhexylglycerin, Carbomer, Tromethamine, Xanthan Gum",
  ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
};

const PURE_GLOW_ESSENTIALS_SET: ProductDetailContent = {
  editorNote:
    "Tu rutina K-Beauty completa para un Pure Glow. El mixsoon Pure Glow Essentials Set reúne 5 esenciales de skincare coreano en tamaño mini para limpiar, calmar, hidratar y nutrir la piel. Combina Centella Asiática + ingredientes de soja fermentada en una rutina diseñada para dejar la piel más suave, hidratada y naturalmente luminosa.",
  tagline: "Kit 5 pasos · Mini · Glass Skin Glow",
  pitch:
    "Kit K-Beauty de 5 pasos en formato mini pensado para realizar una rutina completa: limpiar, tonificar, tratar e hidratar. Set suave e hidratante orientado a una apariencia fresca y luminosa tipo Glass Skin.",
  cardDescription:
    "Set mini mixsoon de 5 pasos: doble limpieza, tónico, esencia y crema. Cica + Bean Care para hidratar y un glow tipo Glass Skin. Ideal para probar o viajar.",
  benefits: [
    "5-Step K-Beauty Routine — Una rutina completa de 5 pasos en un solo set.",
    "Gentle Cleansing — Incluye doble limpieza para retirar maquillaje, sebo e impurezas.",
    "Cica Soothing Care — La Centella Asiática complementa el cuidado calmante y confortable de la piel.",
    "Deep Hydration — Sus productos ayudan a mantener la piel hidratada y equilibrada.",
    "Glass Skin Glow — Rutina enfocada en conseguir una apariencia más suave, fresca y luminosa.",
  ],
  howToUse: [
    "Tu rutina K-Beauty en 5 pasos.",
    "1. Bean Cleansing Oil → retira maquillaje e impurezas.",
    "2. Centella Cleansing Foam → completa la limpieza.",
    "3. Centella Toner → tonifica y prepara.",
    "4. Bean Essence → aporta tratamiento e hidratación.",
    "5. Bean Cream → sella la humedad.",
    "K-Beauty Tip: úsalo siguiendo el orden de texturas más ligeras a más cremosas para completar tu rutina de layering.",
  ],
  ingredients: [
    "Bean Cleansing Oil — Aceite limpiador que ayuda a retirar maquillaje e impurezas.",
    "Centella Cleansing Foam — Espuma facial para completar una limpieza suave.",
    "Centella Asiatica Toner — Tónico que prepara e hidrata la piel después de la limpieza.",
    "Bean Essence — Esencia con ingredientes fermentados enfocada en hidratación, suavidad y glow.",
    "Bean Cream — Crema nutritiva que ayuda a sellar la hidratación de la rutina.",
  ],
  ingredientsTitle: "Qué incluye",
  closingTitle: "Te va a encantar",
  closingItems: [
    "Rutina completa de 5 pasos",
    "Perfecto para probar mixsoon o viajar",
    "Hidratación + Glass Skin Glow",
  ],
  closingNote:
    "Korean Skincare · 5-Step Routine · Cica + Bean Care · Glass Skin Glow",
};

const CENTELLIAN_MADECA_MELA_CAPTURE_CAPSULE_CREAM: ProductDetailContent = {
  editorNote:
    "Brightening + Capsule Care al estilo K-Beauty. La Centellian24 Madeca Mela Capture Ampoule Capsule Cream es una Capsule Cream —crema facial con cápsulas de ampoule— diseñada para hidratar y mejorar la apariencia de manchas, tono desigual y piel apagada. Sus cápsulas blancas se mezclan con una fresca gel cream rosada al aplicarla, dejando la piel con una apariencia más suave, firme y luminosa.",
  tagline: "Capsule Cream · Mela Care · Glow hidratante",
  pitch:
    "Crema coreana de doble textura: cápsulas blancas de ampoule suspendidas en una gel cream rosada. Enfocada en luminosidad, manchas visibles, hidratación y firmeza.",
  cardDescription:
    "Capsule Cream coreana: cápsulas de ampoule + gel cream rosada. Mela Care para manchas, 10 HA, péptidos y Cica para hidratar, firmar e iluminar.",
  benefits: [
    "Dark Spot Care — Los complejos patentados Mela-Zero™ + Mela-Clean™ están orientados al cuidado de manchas visibles y pecas.",
    "Brightening Care — La niacinamida ayuda a conseguir una apariencia más uniforme y luminosa.",
    "Deep Hydration — Contiene 10 tipos de ácido hialurónico para complementar la hidratación de la piel.",
    "Firming Care — Sus 6 tipos de péptidos + 6 tipos de colágeno complementan el cuidado de firmeza y elasticidad.",
    "Soothing Cica Care — TECA y madecassoside aportan cuidado calmante y confortable.",
  ],
  howToUse: [
    "Último paso de tu rutina de skincare.",
    "Toma una cantidad adecuada incluyendo la cápsula blanca y la gel cream rosada, mézclalas suavemente y distribuye de manera uniforme sobre el rostro.",
    "K-Beauty Tip: mezcla ambas texturas justo antes de aplicarlas para disfrutar la experiencia característica de esta Ampoule Capsule Cream.",
  ],
  ingredients: [
    "TECA + Madecassoside — Derivados de Centella Asiática utilizados para complementar el cuidado calmante, hidratante y de la piel sensible.",
    "Niacinamide — Ayuda a mejorar la luminosidad y la apariencia del tono desigual.",
    "10 Hyaluronic Acids — Complejo de diferentes formas de ácido hialurónico para mantener la piel hidratada y con apariencia más rellena.",
    "6 Peptides + 6 Collagens — Combinación enfocada en complementar el cuidado de firmeza, elasticidad y textura.",
  ],
  ingredientsTitle: "Ingredientes",
  closingTitle: "Te va a encantar",
  closingItems: [
    "Dark Spot + Brightening Care",
    "10 tipos de ácido hialurónico",
    "Cápsulas + gel cream en una sola fórmula",
  ],
  closingNote:
    "Korean Skincare · Capsule Cream · Mela Care · Hydrating Glow",
};

const CENTELLIAN_MADECA_MELA_CAPTURE_AMPOULE_PAD: ProductDetailContent = {
  editorNote:
    "Dark Spot Care en un solo pad. El Centellian24 Madeca Mela Capture Ampoule Pad es un Ampoule Pad —almohadilla facial impregnada en esencia— creado para complementar una rutina K-Beauty enfocada en manchas y luminosidad. Cada pad aporta una esencia concentrada que ayuda a mejorar la apariencia de manchas oscuras, tono desigual y textura, dejando la piel visualmente más clara, suave y radiante.",
  tagline: "Ampoule Pad · Dark Spot Care · 60 pads",
  pitch:
    "Set de 60 ampoule pads / 165 ml empapados en una esencia concentrada, enfocado especialmente en manchas visibles, tono desigual, luminosidad y textura. Destaca MadeWhiteMax y tecnologías patentadas para el cuidado de la pigmentación.",
  cardDescription:
    "60 Ampoule Pads con esencia concentrada. Dark Spot + Brightening Care con MadeWhiteMax, niacinamida y madecassoside para manchas, tono y textura.",
  benefits: [
    "Dark Spot Care — Ayuda a reducir visiblemente la apariencia de manchas, pecas y marcas.",
    "Brightening Care — Favorece un rostro de apariencia más luminosa y uniforme.",
    "Skin Smoothing — Ayuda a suavizar la textura para una piel visualmente más refinada.",
    "Soothing Care — Madecassoside complementa el cuidado calmante mientras se trabaja la luminosidad.",
    "Ampoule Essence Care — Los pads están abundantemente impregnados en una esencia lechosa y concentrada para facilitar el cuidado localizado.",
  ],
  howToUse: [
    "Después de la limpieza facial.",
    "Coloca los pads sobre las zonas que quieras tratar durante 10–20 minutos.",
    "Luego retíralos y desliza suavemente el pad siguiendo la textura de la piel.",
    "K-Beauty Tip: úsalo como un pequeño “toner pad mask” en las zonas con tono desigual y después continúa con tu sérum y crema.",
  ],
  ingredients: [
    "Madecassoside — Derivado de Centella Asiática que complementa el cuidado calmante y confortable de la piel.",
    "Niacinamide — Ayuda a mejorar la apariencia de luminosidad y tono desigual.",
    "Alpha-Bisabolol — Ingrediente destacado para complementar el cuidado iluminador y calmante.",
    "MadeWhiteMax — Complejo destacado por Centellian24 dentro de su tecnología enfocada en el cuidado de la melanina y las manchas visibles.",
  ],
  ingredientsTitle: "Ingredientes",
  closingTitle: "Te va a encantar",
  closingItems: [
    "Cuidado focalizado de manchas",
    "Esencia concentrada en cada pad",
    "Luminosidad + textura más suave",
  ],
  closingNote:
    "Korean Skincare · Ampoule Pad · Dark Spot Care · Brightening Glow",
};

const SKIN1004_TONE_BRIGHTENING_CAPSULE_AMPOULE: ProductDetailContent = {
  editorNote:
    "Dark Spot + Glow Care al estilo K-Beauty. La SKIN1004 Madagascar Centella Tone Brightening Capsule Ampoule es una Brightening Ampoule —ampoule iluminadora— creada para mejorar la apariencia de manchas, tono desigual y piel opaca. Sus microcápsulas de Madewhite™ se funden al aplicarse, mientras su textura tipo esencia se absorbe rápidamente y deja un acabado suave, luminoso y no pegajoso.",
  tagline: "Brightening Ampoule · Madewhite™ · Daily Glow",
  pitch:
    "Ampoule iluminadora de uso diario formulada con 4% de niacinamida, 2% de ácido tranexámico y Madewhite™ encapsulado, enfocada en manchas visibles, tono desigual y piel apagada.",
  cardDescription:
    "Brightening Ampoule con 4% niacinamida, 2% TXA y Madewhite™ encapsulado. Mejora manchas y tono, con glow suave y textura de rápida absorción.",
  benefits: [
    "Dark Spot Care — Ayuda a reducir la apariencia de manchas y marcas visibles.",
    "Brightening Care — Ayuda a conseguir un tono visualmente más uniforme y luminoso.",
    "Glow Care — Madewhite™ aporta un acabado de apariencia naturalmente radiante.",
    "Soothing Care — La Centella Asiática complementa el cuidado calmante de la piel.",
    "Long-Lasting Hydration — Su tecnología Oil-in-Water-Gel ayuda a mantener una hidratación más prolongada.",
  ],
  howToUse: [
    "Después del tónico y antes de la crema.",
    "Aplica una cantidad adecuada sobre rostro y cuello y distribuye suavemente hasta que las microcápsulas se fundan y el producto se absorba.",
    "Puede incorporarse a la rutina diaria.",
    "K-Beauty Tip: aplica con suaves toques para ayudar a que las cápsulas de Madewhite™ se integren completamente sobre la piel.",
  ],
  ingredients: [
    "Niacinamide 4% — Ayuda a mejorar la apariencia del tono desigual y potenciar la luminosidad.",
    "Tranexamic Acid 2% — Complementa el Dark Spot Care, ayudando a mejorar visualmente manchas y pigmentación irregular.",
    "Madewhite™ — Ingrediente patentado encapsulado que ayuda a aportar luminosidad y una apariencia más clara y uniforme.",
    "3-O-Ethyl Ascorbic Acid — Derivado de vitamina C que complementa el cuidado iluminador de la fórmula.",
  ],
  ingredientsTitle: "Ingredientes",
  closingTitle: "Te va a encantar",
  closingItems: [
    "4% Niacinamida + 2% TXA",
    "Cuidado de manchas y tono desigual",
    "Glow suave sin sensación pegajosa",
  ],
  closingNote:
    "Korean Skincare · Dark Spot Care · Capsule Ampoule · Brightening Glow",
};

const AIR_FIT_INGREDIENTS =
  "Centella Asiatica (Gotu Kola) Extract(35.8%), Cyclopentasiloxane, Zinc Oxide, Butyloctyl Salicylate, Titanium Oxide, Propanediol, Benzotriazolyl Dodecyl p-Cresol, Coptis Chinensis Root Extract, PEG-10 Dimethicone, Niacinamide, Disteardimonium Hectorite, Butylene Glycol, Magnesium Sulfate, 1,2-Hexanediol, Caprylic/Capric Glycerides, Dimethicone, VP/Hexadecene Copolymer, Polymethylsilsesquioxane, Aluminum Hydroxide, Stearic Acid, Sorbitan Sesquioleate, Triethoxycaprylylsilane, Dimethicone Crosspolymer, Dimethicone/Vinyl Dimethicone Crosspolymer, Dextrin, Theobroma Cacao (Cocoa) Extract, Pelargonium Graveolens Flower Oil, Water, Citrus Aurantium Bergamia (Bergamot) Fruit Oil, Betaine, Scutellaria Baicalensis Root Extract, Polygonum Cuspidatum Root Extract, Glycyrrhiza Glabra (Licorice) Root Extract, Camellia Sinensis Leaf Extract, Sodium Hyaluronate, Rosmarinus Officinalis (Rosemary) Leaf Extract, Chamomilla Recutita (Matricaria) Flower Extract, Rosa Damascena Flower Oil, Pentylene Glycol, Madecassoside, Citronellol, Geraniol, Linalool";

const SKIN1004_AIR_FIT_SUNCREAM_PLUS: ProductDetailContent = {
  editorNote:
    "Mineral Sun Care + Soft Matte al estilo K-Beauty. El SKIN1004 Madagascar Centella Air-Fit Suncream Plus es un Mineral Sun Cream —protección solar mineral— con SPF50+ PA++++ y un ligero tono beige. Su fórmula ayuda a proteger frente a los rayos UV mientras aporta Cica Care y deja un Natural Matte Finish —acabado mate natural—, ayudando además a difuminar visualmente poros y textura.",
  tagline: "Mineral Sun Cream · Soft Matte · Cica Care",
  pitch:
    "Sun Cream mineral con ligero tono beige, pensado especialmente para piel mixta y grasa. Acabado natural mate, efecto visual difuminador sobre poros y textura, y cuidado calmante con Centella Asiática.",
  cardDescription:
    "Mineral Sun Cream SPF50+ PA++++ con tono beige suave. Natural Matte Finish, efecto blur en poros y Cica Care. Ideal para piel mixta y grasa.",
  benefits: [
    "SPF50+ PA++++ — Alta protección diaria frente a los rayos UVA y UVB.",
    "Cica Soothing Care — La Centella Asiática complementa el cuidado calmante y confortable de la piel.",
    "Pore Blurring Effect — Su ligero tono ayuda a difuminar visualmente la apariencia de poros y textura irregular.",
    "Natural Matte Finish — Deja un acabado mate y natural sin sensación pegajosa.",
    "Sebum-Friendly Care — Su acabado está especialmente orientado a piel mixta y grasa.",
  ],
  howToUse: [
    "Último paso de tu rutina AM.",
    "Aplica una cantidad adecuada de manera uniforme sobre rostro, cuello y zonas expuestas al sol como último paso del skincare.",
    "K-Beauty Tip: al tener un ligero tono beige y efecto blur, puede funcionar muy bien como último paso del skincare antes del maquillaje para conseguir una apariencia más uniforme y mate.",
  ],
  ingredients: [
    "Centella Asiatica Extract — Ingrediente emblemático de SKIN1004 que aporta cuidado calmante y ayuda a mantener la piel confortable.",
    "Madecassoside — Activo derivado de la Centella Asiática que complementa el cuidado calmante de la fórmula.",
    "Multi BSASM — Complejo botánico destacado por SKIN1004 dentro de esta fórmula orientada al confort de la piel.",
    "Niacinamide — Complementa el cuidado de la apariencia del tono y luminosidad de la piel.",
  ],
  ingredientsTitle: "Ingredientes",
  closingTitle: "Te va a encantar",
  closingItems: [
    "SPF50+ PA++++",
    "Acabado mate + efecto blur",
    "Cica Care para piel mixta/grasa",
  ],
  closingNote:
    "Korean Skincare · Mineral Sun Care · Pore Blur · Natural Matte",
  ingredientsFull: AIR_FIT_INGREDIENTS,
  ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
};

const BEAUTY_OF_JOSEON_MATTE_SUN_STICK: ProductDetailContent = {
  editorNote:
    "Matte Sun Care al estilo K-Beauty. El Beauty of Joseon Matte Sun Stick: Mugwort + Camelia es un Sun Stick —protección solar facial en barra— con SPF50+ PA++++, diseñado especialmente para reaplicar fácilmente durante el día. Su textura se desliza suavemente y deja un Soft Matte Finish —acabado mate y sedoso—, ayudando a controlar el brillo sin dejar una sensación grasosa o pegajosa.",
  tagline: "Matte Sun Stick · Sebum Control · Soft Finish",
  pitch:
    "Sun Stick coreano de 18 g desarrollado para ofrecer alta protección UV con un acabado mate y suave. Su fórmula destaca sílica para controlar el exceso de sebo y extractos botánicos como Mugwort (artemisia) y té verde/camelia para complementar el cuidado calmante de la piel.",
  cardDescription:
    "Sun Stick SPF50+ PA++++ con Soft Matte Finish. Controla brillo con sílica y calma con Mugwort + camelia. Ideal para reaplicar on-the-go.",
  benefits: [
    "SPF50+ PA++++ — Alta protección diaria frente a los rayos UVA y UVB.",
    "Sebum Control — El polvo de sílica ayuda a absorber y regular el exceso de grasa y brillo.",
    "Soft Matte Finish — Deja un acabado suave, fresco y mate incluso al reaplicarlo.",
    "Soothing Botanical Care — Mugwort y extractos botánicos complementan el cuidado calmante y nutritivo de la piel.",
    "Easy Reapplication — Su formato compacto permite reaplicar la protección solar fácilmente sin tocar el producto con las manos.",
  ],
  howToUse: [
    "Último paso de tu rutina AM.",
    "Desliza el Sun Stick uniformemente sobre las zonas expuestas al sol, como rostro y cuello.",
    "Durante el día, vuelve a aplicarlo para mantener la protección UV.",
    "K-Beauty Tip: es especialmente práctico para el Sun Care On-the-Go —reaplicación de protección solar durante el día— gracias a su formato compacto.",
  ],
  ingredients: [
    "Mugwort (Artemisia) — Ingrediente botánico destacado por su enfoque calmante y nutritivo dentro de la fórmula.",
    "Silica Powder — Ayuda a absorber el exceso de sebo para conseguir un acabado mate y sedoso.",
    "Camellia Sinensis Leaf Extract — Extracto de té verde que complementa el cuidado antioxidante y calmante de la piel.",
  ],
  ingredientsTitle: "Ingredientes",
  closingTitle: "Te va a encantar",
  closingItems: [
    "SPF50+ PA++++",
    "Control de brillo y sebo",
    "Acabado mate suave",
  ],
  closingNote:
    "Korean Skincare · Matte Sun Care · Sebum Control · Soft Finish",
};

const COSRX_ADVANCED_SNAIL_96_MUCIN_POWER_ESSENCE: ProductDetailContent = {
  editorNote:
    "Snail Glow al estilo K-Beauty. La COSRX Advanced Snail 96 Mucin Power Essence es una Snail Essence —esencia facial con mucina de caracol— formulada con 96.3% Snail Secretion Filtrate. Su textura ligera y elástica aporta hidratación intensa y ayuda a mejorar la apariencia de la textura, dejando la piel más suave, confortable y luminosa tipo Glass Skin.",
  tagline: "Snail Essence · 96.3% Mucin · Glass Skin Glow",
  pitch:
    "Su fórmula contiene 96.3% de filtrado de secreción de caracol, y está enfocada en hidratación, confort, recuperación de la apariencia de la piel y mejora de la textura. COSRX la recomienda para todo tipo de piel, incluida piel sensible.",
  cardDescription:
    "Snail Essence con 96.3% mucina de caracol. Hidrata en profundidad, suaviza la textura y deja un glow tipo Glass Skin. Apta para piel sensible.",
  benefits: [
    "Deep Hydration — Aporta hidratación intensa y ayuda a mantener la piel confortable.",
    "Skin Recovery Care — Ayuda a mejorar la apariencia de piel debilitada o afectada por factores externos.",
    "Skin Smoothing — Favorece una textura visualmente más suave, uniforme y flexible.",
    "Soothing Care — Su fórmula ayuda a calmar y reducir la apariencia de enrojecimiento en piel sensible.",
    "Glass Skin Glow — La hidratación ayuda a conseguir una apariencia más jugosa y luminosa característica del K-Beauty.",
  ],
  howToUse: [
    "Después de la limpieza y el tónico.",
    "Aplica una cantidad adecuada sobre el rostro y distribuye suavemente con las yemas de los dedos.",
    "Da pequeños toques hasta su absorción y continúa con tu crema hidratante.",
    "K-Beauty Tip: aplícala sobre la piel ligeramente húmeda después del tónico para potenciar la sensación de hidratación y conseguir un acabado más jugoso.",
  ],
  ingredients: [
    "Snail Secretion Filtrate 96.3% — Ingrediente protagonista que ayuda a hidratar, suavizar y mejorar la apariencia general de la piel.",
    "Sodium Hyaluronate — Ayuda a retener humedad para mantener la piel hidratada y flexible.",
    "Allantoin — Complementa el cuidado calmante y ayuda a mantener la piel confortable.",
    "Panthenol — Apoya la hidratación y el confort de la piel.",
  ],
  ingredientsTitle: "Ingredientes",
  closingTitle: "Te va a encantar",
  closingItems: [
    "96.3% Snail Mucin",
    "Hidratación + textura más suave",
    "Glow tipo Glass Skin",
  ],
  closingNote:
    "Korean Skincare · Snail Mucin 96.3% · Deep Hydration · Glass Skin Glow",
};

const SKIN1004_HYALU_CICA_FIRST_AMPOULE: ProductDetailContent = {
  editorNote:
    "First Step Hydration al estilo K-Beauty. La SKIN1004 Madagascar Centella Hyalu-Cica First Ampoule es una First Ampoule —ampoule preparadora e hidratante— de textura ligera y acuosa que se utiliza al inicio de la rutina. Su fórmula Hyalu-Cica combina Centella Asiática y 5 tipos de ácido hialurónico para hidratar, calmar y preparar la piel para recibir los siguientes productos de skincare.",
  tagline: "First Ampoule · Hyalu-Cica · Watery Finish",
  pitch:
    "First Ampoule de textura acuosa formulada con 5 tipos de ácido hialurónico, Centella Asiática de Madagascar, savia de abedul e hiedra, diseñada para aportar hidratación rápida y preparar la piel para los siguientes pasos de la rutina.",
  cardDescription:
    "First Ampoule Hyalu-Cica de textura acuosa. 5 HA + Centella para hidratar, calmar y preparar la piel antes del resto de la rutina.",
  benefits: [
    "Instant Hydration — Aporta una dosis rápida de hidratación y ayuda a aliviar la sensación de resequedad.",
    "Cica Soothing Care — La Centella Asiática ayuda a mantener la piel calmada y confortable.",
    "5 Hyaluronic Acids — Diferentes formas de ácido hialurónico complementan la hidratación de la piel.",
    "Skin Prep Care — Está diseñada para preparar la piel antes de los siguientes pasos de la rutina K-Beauty.",
    "Watery Lightweight Texture — Textura acuosa y ligera que se absorbe rápidamente sin sensación pesada.",
  ],
  howToUse: [
    "Primer paso de tratamiento después de la limpieza.",
    "Aplica una cantidad adecuada sobre el rostro y distribuye suavemente con las manos dando pequeños toques hasta su absorción.",
    "Después continúa con los demás pasos de tu rutina, como tónico, sérum o crema según corresponda.",
    "K-Beauty Tip: úsala como tu First Care Step —primer paso de preparación— para aportar hidratación ligera antes de aplicar productos más densos.",
  ],
  ingredients: [
    "Madagascar Centella Asiatica — Ingrediente protagonista de SKIN1004 que aporta cuidado calmante e hidratante. YesStyle indica 92% de extracto de Cica en esta ampoule.",
    "5 Hyaluronic Acids — Combinación de diferentes tipos de ácido hialurónico enfocada en mantener la piel hidratada y flexible.",
    "Birch Sap — Savia de abedul que complementa el cuidado hidratante y refrescante de la fórmula.",
    "Ivy Extract — Extracto vegetal incorporado para complementar el cuidado hidratante y confortable.",
  ],
  ingredientsTitle: "Ingredientes",
  closingTitle: "Te va a encantar",
  closingItems: [
    "5 tipos de ácido hialurónico",
    "Cica calmante e hidratante",
    "Textura acuosa y ultraligera",
  ],
  closingNote:
    "Korean Skincare · Hyalu-Cica Care · First Step Hydration · Watery Finish",
};

const PRODUCT_DETAILS: Record<string, ProductDetailContent> = {
  "mixsoon centella cleansing water": {
    editorNote:
      "Limpieza suave con esencia K-Beauty. El Mixsoon Centella Cleansing Water es un agua limpiadora facial coreana de 300 ml que ayuda a retirar maquillaje, suciedad y exceso de sebo sin dejar sensación pesada. Enriquecido con Centella Asiática, limpia mientras aporta una sensación calmante, fresca y confortable. Ideal para una limpieza suave diaria y también para piel sensible.",
    tagline: "Agua limpiadora coreana · Centella · Limpieza suave",
    pitch:
      "Agua limpiadora coreana de 300 ml con Centella Asiática. Retira maquillaje, sebo e impurezas con suavidad; textura acuosa fresca, adecuada también para piel sensible.",
    cardDescription:
      "Cleansing Water coreano que retira maquillaje, suciedad y exceso de sebo sin sensación pesada. Con Centella Asiática para una limpieza suave, fresca y confortable.",
    benefits: [
      "Gentle Cleansing — Retira suavemente suciedad, impurezas y exceso de sebo.",
      "Makeup Removal — Ayuda a eliminar maquillaje de manera práctica y delicada.",
      "Cica Soothing Care — La Centella Asiática deja la piel calmada y confortable tras limpiar.",
      "Fresh Finish — Textura acuosa que deja una sensación fresca y ligera.",
      "Sensitive Skin Care — Fórmula suave indicada también para piel sensible.",
    ],
    howToUse: [
      "Primer paso de tu rutina de limpieza.",
      "Humedece un algodón con el producto y pásalo suavemente sobre rostro y labios.",
      "Repite hasta que el algodón salga limpio. Úsalo mañana o noche según necesites.",
    ],
    ingredients: [
      "Centella Asiatica Extract — Complementa el cuidado calmante de la piel durante la limpieza.",
      "Panthenol — Apoya el cuidado hidratante y confortable de la piel.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "Limpieza suave y fresca",
      "Cuidado calmante con Cica",
      "Textura acuosa y ligera",
    ],
    closingNote:
      "Korean Skincare · Limpieza suave · Cica Care · Acabado fresco",
    ingredientsFull:
      "Water, Propanediol, Polyglyceryl-4 Caprate, 1,2-Hexanediol, Polyglyceryl-6 Caprylate, Polyglyceryl-6 Ricinoleate, Polyglyceryl-3 Cocoate, Butylene Glycol, Betaine, Panthenol, Erythritol, Centella Asiatica Extract, Houttuynia Cordata Extract, Illicium Verum (Anise) Fruit Extract, Caprylyl Glycol, Allantoin, Disodium EDTA, Citric Acid, Sodium Citrate",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "skin1004 madagascar centella ampoule foam": {
    editorNote:
      "Limpieza suave y equilibrada al estilo K-Beauty. El SKIN1004 Madagascar Centella Ampoule Foam es un limpiador facial en espuma coreano con Centella Asiática de Madagascar y pH 5. Su espuma rica ayuda a retirar suciedad, maquillaje e impurezas mientras mantiene la piel confortable y equilibrada después de la limpieza.",
    tagline: "Espuma limpiadora coreana · Centella · pH 5",
    pitch:
      "Limpiador facial en espuma coreano con Centella de Madagascar y pH 5. Retira impurezas y exceso de sebo sin dejar la piel tirante; espuma rica y cuidado calmante.",
    cardDescription:
      "Foam Cleanser coreano con Centella Asiática y pH 5. Espuma rica que limpia suciedad e impurezas manteniendo la piel confortable y equilibrada.",
    benefits: [
      "Gentle Cleansing — Limpia eficazmente sin dejar una sensación excesivamente tirante.",
      "Deep Clean Care — Ayuda a retirar impurezas, exceso de sebo y residuos de los poros.",
      "Cica Soothing Care — La Centella Asiática deja la piel calmada y equilibrada.",
      "pH Balance — pH aproximado de 5, más respetuoso con el equilibrio natural de la piel.",
      "Moisture Care — Surfactantes de coco que limpian conservando la humedad de la piel.",
    ],
    howToUse: [
      "Úsalo como paso de limpieza facial.",
      "Aplica una pequeña cantidad en manos húmedas, crea espuma y masajea el rostro húmedo.",
      "Enjuaga completamente. Ideal en rutina de mañana y noche.",
    ],
    ingredients: [
      "Centella Asiatica Extract — Aporta sensación calmante y confortable durante la limpieza.",
      "Baking Soda ultrafino — Ayuda a retirar exceso de sebo y residuos sobre la piel.",
      "Coconut-Derived Surfactants — Limpian suavemente manteniendo el equilibrio de humedad.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "Espuma rica y suave",
      "Limpieza sin sensación tirante",
      "Cuidado calmante con Centella",
    ],
    closingNote: "Korean Skincare · Limpieza suave · Cica Care · pH 5",
    ingredientsFull:
      "Centella Asiatica Extract, Sodium Cocoyl Isethionate, Glycerin, Water, Sodium Methyl Cocoyl Taurate, Coco-Betaine, Potassium Cocoyl Glycinate, Caprylyl Glycol, Sodium Chloride, Potassium Cocoate, Polyquaternium-67, Citric Acid, Sodium Bicarbonate, Hydroxypropyl Starch Phosphate, Potassium Benzoate, Theobroma Cacao (Cocoa) Extract, Disodium EDTA, 1,2-Hexanediol, Butylene Glycol, Coptis Chinensis Root Extract, Sodium Hyaluronate, Eclipta Prostrata Extract, Coccinia Indica Fruit Extract",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "skin1004 madagascar centella tone brightening cleansing gel foam": {
    editorNote:
      "Limpieza + luminosidad al estilo K-Beauty. El SKIN1004 Madagascar Centella Tone Brightening Cleansing Gel Foam es un limpiador facial en gel que forma espuma, diseñado para retirar suciedad, exceso de grasa y residuos de maquillaje sin dejar la piel tirante. Su fórmula combina cuidado limpiador, hidratante y Brightening Care para dejar la piel más suave, fresca y con luminosidad natural.",
    tagline: "Gel-espuma limpiadora · Luminosidad · Centella",
    pitch:
      "Gel limpiador hidratante de 125 ml que forma espuma suave. Limpia maquillaje e impurezas sin retirar en exceso la humedad natural y ayuda a mejorar la apariencia luminosa de la piel.",
    cardDescription:
      "Gel Foam Cleanser coreano que retira suciedad y maquillaje sin tirantez. Combina limpieza, hidratación y cuidado iluminador para una piel fresca con glow natural.",
    benefits: [
      "Gentle Cleansing — Limpia maquillaje e impurezas sin eliminar excesivamente la humedad natural.",
      "Brightening Care — Madewhite™ ayuda a mejorar la luminosidad y uniformidad del rostro.",
      "Gentle Exfoliation — El complejo SINGREEN retira suavemente células muertas para una textura más lisa.",
      "pH Balance — pH similar al de una piel saludable, para mantener su equilibrio al limpiar.",
      "Moisture Care — Gel hidratante con espuma delicada que deja la piel confortable tras el lavado.",
    ],
    howToUse: [
      "Úsalo como paso de limpieza facial.",
      "Aplica una pequeña cantidad en manos húmedas, añade agua y crea una espuma suave.",
      "Masajea el rostro húmedo y enjuaga con abundante agua.",
    ],
    ingredients: [
      "Madewhite™ — Ingrediente natural patentado para mejorar la luminosidad y el glow natural.",
      "Centella Asiatica — Complementa el cuidado calmante y confortable de la piel.",
      "SINGREEN Complex — Exfoliante frutal (papaya, manzana, uva y ciruela) para retirar células muertas suavemente.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "Limpieza suave sin tirantez",
      "Exfoliación delicada",
      "Piel fresca y luminosa",
    ],
    closingNote:
      "Korean Skincare · Brightening Care · Exfoliación suave · Natural Glow",
    ingredientsFull:
      "Centella Asiatica Extract, Water, Glycerin, Sodium Cocoyl Isethionate, Cocamidopropyl Betaine, Niacinamide, 3-O-Ethyl Ascorbic Acid, Caprylyl Glycol, Sodium Chloride, Citric Acid, Butylene Glycol, Sodium Hyaluronate, Citrus Aurantium Dulcis (Orange) Fruit Extract, Pyrus Malus (Apple) Fruit Extract, Prunus Persica (Peach) Fruit Extract, 1,2-Hexanediol, Disodium EDTA",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "tocobo coconut clay cleansing foam": {
    editorNote:
      "Deep Cleansing al estilo K-Beauty. El TOCOBO Coconut Clay Cleansing Foam es un limpiador facial espumoso con arcilla que ayuda a eliminar impurezas, exceso de sebo y residuos acumulados en los poros. Su espuma cremosa de microburbujas limpia profundamente mientras ayuda a conservar la hidratación, dejando la piel fresca, suave y equilibrada. Ideal para piel mixta o grasa con tendencia a poros obstruidos.",
    tagline: "Espuma con arcilla · Poros · Control de sebo",
    pitch:
      "Limpiador facial coreano de 150 ml con arcillas minerales y 27% de agentes limpiadores derivados del coco. Limpieza profunda de poros y exceso de sebo sin dejar la piel excesivamente seca.",
    cardDescription:
      "Clay Foam Cleanser coreano que limpia poros e impurezas con espuma cremosa de microburbujas. Absorbe exceso de sebo sin resecar, dejando la piel fresca y equilibrada.",
    benefits: [
      "Deep Pore Cleansing — Ayuda a retirar impurezas y residuos acumulados dentro de los poros.",
      "Sebum Care — Las arcillas minerales ayudan a absorber el exceso de grasa de la piel.",
      "Micro-Bubble Cleanse — Espuma de microburbujas para una limpieza profunda y delicada.",
      "Gentle Exfoliation — Arcillas rosa y blanca ayudan a retirar células muertas e impurezas superficiales.",
      "Non-Drying Finish — Limpia sin eliminar excesivamente la humedad natural de la piel.",
    ],
    howToUse: [
      "Úsalo como paso de limpieza facial.",
      "Coloca una pequeña cantidad en manos húmedas y forma una espuma cremosa.",
      "Masajea el rostro húmedo y enjuaga completamente con agua.",
    ],
    ingredients: [
      "Coconut-Derived Cleansing Agents – 27% — Limpieza eficaz manteniendo una sensación confortable.",
      "Pink & White Mineral Clay — Absorben sebo, impurezas y células muertas.",
      "Saponaria Officinalis Extract — Complementa la limpieza y ayuda a mantener la piel hidratada.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "Limpieza profunda de poros",
      "Control del exceso de sebo",
      "Espuma cremosa sin sensación tirante",
    ],
    closingNote:
      "Korean Skincare · Pore Care · Control de sebo · Deep Cleansing",
    ingredientsFull:
      "Water, Glycerin, Hydrogenated Palm Acid (25%), Potassium Hydroxide, Potassium Cocoate (2.9%), Calamine (1,000 ppm), Saponaria Officinalis Extract (100 ppm), Bentonite (9,000 ppm), Glyceryl Stearate, Butylene Glycol, Polyquaternium-7, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Sodium Phytate, EDTA, Sodium Benzoate, Fragrance, CI 14700",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "mixsoon centella cleansing foam": {
    editorNote:
      "Limpieza calmante y fresca al estilo K-Beauty. El Mixsoon Centella Cleansing Foam es un limpiador facial en espuma con 32.8% de Centella Asiática, diseñado para eliminar impurezas y exceso de grasa mientras mantiene la piel suave y confortable. Su espuma rica y delicada ofrece una limpieza eficaz sin sensación de resequedad o tirantez.",
    tagline: "Espuma limpiadora · Centella 32.8% · Limpieza suave",
    pitch:
      "Foam Cleanser coreano de 150 ml con 32.8% de Centella Asiática y fórmula suavemente ácida. Limpia impurezas y exceso de sebo sin dejar la piel excesivamente tirante.",
    cardDescription:
      "Foam Cleanser coreano con 32.8% de Centella Asiática. Espuma rica que limpia impurezas y grasa manteniendo la piel suave, fresca y confortable.",
    benefits: [
      "Gentle Cleansing — Limpia profundamente sin retirar en exceso la humedad natural de la piel.",
      "Cica Soothing Care — La Centella Asiática ayuda a calmar y mantener la piel confortable.",
      "Sebum & Pore Care — Ayuda a retirar exceso de sebo e impurezas acumuladas.",
      "Moisture Care — Ayuda a mantener la piel hidratada y suave después de la limpieza.",
      "pH Balance — Fórmula suavemente ácida (pH 3.0–5.0) que respeta el equilibrio natural de la piel.",
    ],
    howToUse: [
      "Úsalo como paso de limpieza facial.",
      "Aplica una pequeña cantidad en manos húmedas y crea una espuma suave.",
      "Masajea el rostro húmedo y enjuaga con agua tibia.",
    ],
    ingredients: [
      "Centella Asiatica Extract – 32.8% — Cica Care para calmar e hidratar la piel.",
      "Alteromonas Ferment Extract — Complementa la hidratación y el cuidado calmante.",
      "Salicylic Acid — Apoya el cuidado de poros y el exceso de sebo.",
      "Sea Algae Extract — Complementa el cuidado hidratante durante la limpieza.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "Limpieza suave sin tirantez",
      "32.8% de Centella Asiática",
      "Piel fresca y confortable",
    ],
    closingNote:
      "Korean Skincare · Cica Care · Limpieza suave · Moisture Care",
  },

  "skin1004 madagascar centella toning toner": {
    editorNote:
      "Suavidad y renovación al estilo K-Beauty. El SKIN1004 Madagascar Centella Toning Toner es un tónico diario coreano que combina Centella Asiática de Madagascar y PHA para exfoliar suavemente, retirar células muertas y dejar la piel más lisa y luminosa. Su textura ligera y acuosa prepara la piel después de la limpieza sin sensación pesada.",
    tagline: "Tónico coreano · Centella 84% · Exfoliación suave",
    pitch:
      "Tónico coreano con Centella Asiática 84% y PHA, un exfoliante suave. Ayuda a renovar la piel, calmarla e hidratarla después de limpiar, sin sensación pesada.",
    cardDescription:
      "Tónico K-Beauty con Centella de Madagascar y PHA. Exfolia con suavidad, calma e hidrata, y deja la piel más lisa y luminosa. Ideal después de limpiar, sin sensación pesada.",
    benefits: [
      "Exfoliación suave con PHA — Retira células muertas y suaviza la textura.",
      "Calma y confort con Centella — Apoya piel sensible o reactiva.",
      "Apariencia más clara y luminosa — Ayuda a unificar el tono del cutis.",
      "Hidratación fresca y ligera — Prepara la piel para sérum y crema.",
    ],
    howToUse: [
      "Tras limpiar, aplica con algodón o las manos y da toques suaves.",
      "Úsalo antes de tu sérum, ampoule o crema.",
      "Continúa con el resto de tu rutina; de día, finaliza con protector solar.",
    ],
    ingredients: [
      "Madagascar Centella Asiatica 84% — Calma e hidrata como base del tónico.",
      "PHA (Gluconolactone) — Exfoliación suave apta para uso diario.",
      "Ácido hialurónico — Aporta suavidad e hidratación ligera.",
      "Betaine — Ayuda a mantener el confort cutáneo.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "Exfoliación suave",
      "Cuidado calmante e hidratante",
      "Piel más lisa y luminosa",
    ],
    closingNote: "Korean Skincare · Centella 84% · PHA · Uso diario",
    ingredientsFull:
      "Centella Asiatica Extract (84%), Water, Dipropylene Glycol, 1,2-Hexanediol, Niacinamide, Gluconolactone, Tromethamine, Carbomer, Sodium Citrate, Adenosine, Disodium EDTA, Dipotassium Glycyrrhizate, Betaine, Hyaluronic Acid, Ethylhexylglycerin",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "skin1004 madagascar centella hyalu-cica brightening toner": {
    editorNote:
      "Hidratación + luminosidad al estilo K-Beauty. El SKIN1004 Madagascar Centella Hyalu-Cica Brightening Toner es un tónico facial hidratante que combina Hyalu-Cica, AHA y LHA para hidratar mientras exfolia suavemente la superficie de la piel. Ayuda a dejar el rostro más suave, fresco y luminoso, preparando la piel para los siguientes pasos de la rutina. Recomendado principalmente para piel normal y seca.",
    tagline: "Tónico hidratante · Hyalu-Cica · Exfoliación suave",
    pitch:
      "Tónico hidratante con exfoliación suave AHA + LHA. Aporta hidratación, suaviza la textura y mejora la luminosidad. Ideal para piel normal y seca.",
    cardDescription:
      "Hydrating Toner coreano con Hyalu-Cica, AHA y LHA. Hidrata, exfolia suavemente y deja la piel más suave, fresca y luminosa para el resto de la rutina.",
    benefits: [
      "Deep Hydration — Hidratación intensa gracias a Centella y ácido hialurónico.",
      "Gentle Exfoliation — AHA + LHA ayudan a retirar células muertas y mejorar la textura.",
      "Brightening Care — Ayuda a devolver luminosidad y una apariencia más radiante.",
      "Cica Soothing Care — La Centella Asiática complementa el cuidado calmante y confortable.",
      "Skin Smoothing — Exfoliación suave para una textura más lisa y uniforme.",
    ],
    howToUse: [
      "Después de la limpieza facial.",
      "Aplica con las manos o un algodón y distribuye suavemente hasta absorber.",
      "Continúa con sérum y crema. De día, completa con protector solar.",
    ],
    ingredients: [
      "Centella Asiatica Leaf Water — Hidratación y cuidado calmante (74% Cica Leaf Water de Madagascar).",
      "Hyaluronic Acid — Retiene humedad para mantener la piel suave y confortable.",
      "AHA + LHA — Exfoliación suave que mejora la textura y retira células muertas.",
      "Ceramide NP — Complementa el cuidado de la barrera de hidratación.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "Hidratación intensa",
      "Exfoliación suave",
      "Glow natural",
    ],
    closingNote:
      "Korean Skincare · Hyalu-Cica Care · Exfoliación suave · Hydrating Glow",
    ingredientsFull:
      "Centella Asiatica Leaf Water, Water, Butylene Glycol, Glycerin, Niacinamide, 1,2-Hexanediol, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Hyaluronic Acid, Glycolic Acid, Capryloyl Salicylic Acid, Ceramide NP, Panthenol, Allantoin, Ethylhexylglycerin, Sodium Citrate, Citric Acid",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "skin1004 madagascar centella hyalu-cica blue serum": {
    editorNote:
      "Hidratación ligera al estilo K-Beauty. El SKIN1004 Madagascar Centella Hyalu-Cica Blue Serum es un sérum facial hidratante que combina la tecnología Hyalu-Cica, Centella Asiática y 5 tipos de ácido hialurónico. Su textura ligera aporta hidratación y calma sin sentirse pesada, dejando la piel más suave, flexible y confortable. Especialmente orientado a piel normal o seca.",
    tagline: "Sérum hidratante · Hyalu-Cica · Textura ligera",
    pitch:
      "Sérum hidratante ligero all-in-one con Centella Asiática, 5 tipos de ácido hialurónico, Ceramide NP, niacinamida y adenosina. Aporta hidratación y confort a piel normal o seca.",
    cardDescription:
      "Hydrating Serum coreano con Hyalu-Cica y 5 tipos de ácido hialurónico. Textura ligera que hidrata y calma sin pesadez, dejando la piel suave y confortable.",
    benefits: [
      "Deep Hydration — 5 tipos de ácido hialurónico ayudan a mantener distintos niveles de hidratación.",
      "Cica Soothing Care — La Centella Asiática de Madagascar calma y brinda confort a la piel.",
      "Skin Barrier Care — Ceramide NP complementa el cuidado de la barrera de humedad.",
      "Brightening Care — La niacinamida apoya una apariencia más uniforme y luminosa.",
      "Lightweight Moisture — Textura ligera diseñada para hidratar sin sensación pesada.",
    ],
    howToUse: [
      "Después de la limpieza y el tónico.",
      "Aplica una cantidad adecuada y masajea o da toques suaves hasta absorber.",
      "Continúa con crema hidratante y, de día, con protección solar.",
    ],
    ingredients: [
      "Centella Asiatica Leaf Water — Hidratación y cuidado calmante para mantener la piel confortable.",
      "5 Hyaluronic Acids — Cinco tipos de ácido hialurónico para piel hidratada y flexible.",
      "Ceramide NP — Refuerza la barrera de humedad y reduce la sensación de resequedad.",
      "Niacinamide — Complementa luminosidad y apariencia uniforme de la piel.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "Hidratación multicapa",
      "Cuidado calmante con Cica",
      "Textura ligera y confortable",
    ],
    closingNote:
      "Korean Skincare · Hyalu-Cica Care · Deep Hydration · Skin Barrier Care",
    ingredientsFull:
      "Water, Centella Asiatica Leaf Water, Butylene Glycol, 1,2-Hexanediol, Niacinamide, Glycerin, Pantolactone, Hibiscus Esculentus Fruit Extract, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Hyaluronic Acid, Methylpropanediol, Panthenol, Cetearyl Olivate, Carbomer, Arginine, Sorbitan Olivate, Caprylic/Capric Triglyceride, Pyrus Communis (Pear) Fruit Extract, Pentylene Glycol, Adenosine, Polyglutamic Acid, Rosa Damascena Flower Water, Artemisia Princeps Leaf Extract, Cucumis Melo (Melon) Fruit Extract, Iris Florentina Root Extract, Ethylhexylglycerin, Hedera Helix (Ivy) Leaf/Stem Extract, Sodium Phytate, Xanthan Gum, Maltodextrin, Hydrolyzed Gardenia Florida Extract, Hydrogenated Lecithin, Ceramide NP, Sodium Hyaluronate Crosspolymer, Hydrolyzed Sodium Hyaluronate",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "skin1004 madagascar centella niacinamide 10 boosting shot ampoule":
    SKIN1004_NIACINAMIDE_10_BOOSTING_SHOT,
  "skin1004 madagascar centella niacinamide 10% boosting shot ampoule":
    SKIN1004_NIACINAMIDE_10_BOOSTING_SHOT,

  "anua 7+ rice ceramide hydrating barrier serum": {
    editorNote:
      "Glass Skin + Barrier Care al estilo K-Beauty. El ANUA 7+ Rice Ceramide Hydrating Barrier Serum es un sérum para el cuidado de la barrera cutánea formulado con 7 tipos de ingredientes derivados del arroz, ceramidas y ácido hialurónico. Aporta hidratación profunda y ayuda a mantener la barrera natural de humedad, dejando la piel más suave, confortable y con un glow saludable tipo Glass Skin. Sin fragancia.",
    tagline: "Sérum barrera · Arroz + ceramidas · Glass Skin",
    pitch:
      "Sérum hidratante y calmante, sin fragancia. Refuerza la barrera de humedad, equilibra el exceso de sebo y aporta un acabado luminoso tipo Glass Skin.",
    cardDescription:
      "Barrier Serum coreano con 7 derivados del arroz, ceramidas y ácido hialurónico. Hidrata en profundidad, refuerza la barrera y deja un glow tipo Glass Skin.",
    benefits: [
      "Deep Hydration — Ayuda a mantener la hidratación y reducir la sensación de piel seca o tirante.",
      "Skin Barrier Care — Ceramidas + pantenol ayudan a mantener y reforzar la barrera de humedad.",
      "Glass Skin Glow — Derivados del arroz ayudan a una piel más luminosa y uniforme.",
      "Sebum Balance — 3% de niacinamida ayuda a equilibrar el exceso de grasa y sebo.",
      "Soothing Care — Enfoque hidratante y calmante para piel cómoda y equilibrada.",
    ],
    howToUse: [
      "Después de la limpieza y el tónico.",
      "Aplica unas gotas y distribuye con toques suaves de las yemas de los dedos.",
      "Úsalo mañana y noche antes de crema. De día, acompaña con SPF 30 o superior.",
    ],
    ingredients: [
      "7 Rice Complex — Siete derivados del arroz que nutren, hidratan y mejoran la luminosidad.",
      "Ceramide NP — Mantiene la barrera de humedad y evita pérdida excesiva de hidratación.",
      "Hyaluronic Acid — Hidratación para una piel más suave y rellena.",
      "Niacinamide 3% — Equilibra el sebo y complementa luminosidad y uniformidad.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "Hidratación profunda",
      "Refuerza la barrera de humedad",
      "Glow tipo Glass Skin",
    ],
    closingNote:
      "Korean Skincare · Rice Care · Ceramide Barrier · Glass Skin Glow",
    ingredientsFull:
      "Oryza Sativa (Rice) Bran Water, Water, Glycerin, Butylene Glycol, Niacinamide, 1,2-Hexanediol, Ceramide NP, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Panthenol, Betaine, Caprylic/Capric Triglyceride, Hydrogenated Lecithin, Allantoin, Ethylhexylglycerin, Xanthan Gum, Carbomer, Tromethamine",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "anua 10+ azelaic acid 10 hyaluron redness soothing serum": {
    editorNote:
      "Calm + Clear Skin al estilo K-Beauty. El ANUA Azelaic Acid 10 Hyaluron Redness Soothing Serum es un sérum calmante formulado con 10% de ácido azelaico y ácido hialurónico. Su fórmula ligera combina Redness Care + Hydration, ayudando a mejorar la apariencia del enrojecimiento, la textura irregular y las zonas problemáticas mientras mantiene la piel hidratada y confortable. Especialmente pensado para piel sensible.",
    tagline: "Sérum calmante · Ácido azelaico 10% · Redness Care",
    pitch:
      "Sérum ligero con 10% de ácido azelaico, ingredientes hidratantes y calmantes. Pensado para piel sensible y para mejorar la apariencia del enrojecimiento por resequedad o irritación externa.",
    cardDescription:
      "Soothing Serum coreano con 10% de ácido azelaico y ácido hialurónico. Ayuda a calmar el enrojecimiento y la textura irregular manteniendo la piel hidratada y confortable.",
    benefits: [
      "Redness Care — Ayuda a reducir visiblemente el enrojecimiento asociado a piel seca o irritada.",
      "Trouble Care — Formulada para cuidar zonas con apariencia problemática o congestionada.",
      "Hydration Care — El ácido hialurónico ayuda a mantener hidratación y sensación de piel suave.",
      "Skin Smoothing — El ácido azelaico apoya una textura y tono visualmente más uniformes.",
      "Sensitive Skin Friendly — Ingredientes calmantes e hidratantes, adecuado para piel sensible.",
    ],
    howToUse: [
      "Después de la limpieza y el tónico.",
      "Aplica una pequeña cantidad sobre el rostro y distribuye suavemente hasta absorber.",
      "Continúa con tu crema hidratante. Si empiezas con azelaico, mantén una rutina sencilla.",
    ],
    ingredients: [
      "Azelaic Acid 10% — Cuidado del enrojecimiento, zonas problemáticas y textura desigual.",
      "Hyaluronic Acid — Atrae y conserva humedad para piel hidratada y confortable.",
      "Centella Asiatica — Complejo calmante para piel sensible o irritada.",
      "Green Tea + Aloe — Complementan el cuidado hidratante y reconfortante de la piel.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "10% de ácido azelaico",
      "Calma la apariencia del enrojecimiento",
      "Hidratación ligera",
    ],
    closingNote:
      "Korean Skincare · Redness Care · Azelaic 10% · Soothing Hydration",
    ingredientsFull:
      "Water, Azelaic Acid, Propylene Glycol, Sodium Hydroxide, Dipropylene Glycol, 1,2-Hexanediol, Panthenol, Hydroxyethylcellulose, Betaine Salicylate, Glycerin, Biosaccharide Gum-1, Ethylhexylglycerin, Allantoin, Dipotassium Glycyrrhizate, Melia Azadirachta Leaf Extract, Camellia Sinensis Leaf Water, Sodium Hyaluronate, Melia Azadirachta Flower Extract, Niacinamide, Aloe Barbadensis Leaf Juice, Beta-Glucan, Centella Asiatica Extract, Centella Asiatica Leaf Extract, Centella Asiatica Root Extract, Madecassoside, Asiaticoside, Asiatic Acid, Madecassic Acid, Squalane, Zinc PCA, Butylene Glycol, Pentylene Glycol, Caprylyl/Capryl Glucoside, Hydrogenated Lecithin, Ceramide NP",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "anua 10+ niacinamide 10 txa 4 serum": {
    editorNote:
      "Dark Spot + Glow Care al estilo K-Beauty. El ANUA Niacinamide 10 TXA 4 Serum es un sérum iluminador formulado con 10% Niacinamide + 4% TXA + 2% Arbutin. Esta combinación ayuda a mejorar la apariencia de manchas oscuras, tono desigual y piel apagada, mientras aporta hidratación con una textura ligera y de rápida absorción.",
    tagline: "Sérum iluminador · Niacinamida 10% · TXA 4%",
    pitch:
      "Sérum iluminador con 10% niacinamida + 4% ácido tranexámico (TXA) + 2% arbutina. Enfocado en manchas visibles, tono desigual, opacidad y apariencia de poros. Textura acuosa, ligera y no grasa.",
    cardDescription:
      "Brightening Serum coreano con 10% niacinamida, 4% TXA y 2% arbutina. Ayuda a mejorar manchas, tono desigual y glow, con textura ligera de rápida absorción.",
    benefits: [
      "Dark Spot Care — Ayuda a disminuir visiblemente la apariencia de manchas y marcas post-imperfecciones.",
      "Brightening Care — Ayuda a conseguir un tono visualmente más uniforme, claro y luminoso.",
      "Pore Care — La niacinamida complementa el cuidado de la apariencia de los poros.",
      "Hydration Care — Ácido hialurónico y humectantes ayudan a conservar la hidratación.",
      "Lightweight Finish — Textura acuosa y no grasa que se absorbe fácilmente.",
    ],
    howToUse: [
      "Después de la limpieza y el tónico.",
      "Aplica una pequeña cantidad y distribuye suavemente hasta absorber. Continúa con crema y, de día, SPF.",
      "Si empiezas con este sérum, úsalo 2–3 veces por semana y aumenta según tolerancia.",
    ],
    ingredients: [
      "Niacinamide 10% — Mejora la apariencia del tono desigual, la opacidad y los poros.",
      "Tranexamic Acid (TXA) 4% — Activo de Dark Spot Care para manchas y tono irregular.",
      "Arbutin 2% — Complementa la fórmula iluminadora frente a pigmentación desigual.",
      "Hyaluronic Acid — Ayuda a mantener la piel hidratada, suave y confortable.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "10% Niacinamida + 4% TXA",
      "Dark Spot & Glow Care",
      "Textura ligera y acuosa",
    ],
    closingNote:
      "Korean Skincare · Dark Spot Care · Brightening · Glow Skin",
    ingredientsFull:
      "Water, Glycerin, Niacinamide, Tranexamic Acid, Butylene Glycol, Diethoxyethyl Succinate, 1,2-Hexanediol, Arbutin, Sodium Hyaluronate, Alpha-Arbutin, Coccinia Indica Fruit Extract, Eclipta Prostrata Extract, Macadamia Integrifolia Seed Oil, Olea Europaea (Olive) Fruit Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Vitis Vinifera (Grape) Seed Oil, Theobroma Cacao (Cocoa) Extract, Hydrolyzed Hyaluronic Acid, Chamaecyparis Obtusa Leaf Extract, Prunus Persica (Peach) Flower Extract, Camellia Sinensis Seed Oil, Yeast Ferment Extract, Centella Asiatica Extract, Artemisia Princeps Leaf Extract, Candida Bombicola/Glucose/Methyl Rapeseedate Ferment, Hyaluronic Acid, Pentylene Glycol, Betaine Salicylate, Sucrose Palmitate, Hydrogenated Lecithin, Gellan Gum, Sodium Phytate, Cellulose, Caprylic/Capric Triglyceride, Panthenol, Cyanocobalamin, Polyglutamic Acid, 3-O-Ethyl Ascorbic Acid, Ceramide NP, Dextrin, Asiaticoside, Madecassic Acid, Asiatic Acid, Dimethylsilanol Hyaluronate, Hydrolyzed Sodium Hyaluronate, Potassium Hyaluronate, Hydroxypropyltrimonium Hyaluronate, Sodium Hyaluronate Crosspolymer, Sodium Hyaluronate Dimethylsilanol, Sodium Acetylated Hyaluronate, Xanthan Gum",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "tocobo cica calming serum": {
    editorNote:
      "Calma + hidratación al estilo K-Beauty. El TOCOBO Cica Calming Serum es un sérum calmante de textura acuosa y ligera, diseñado para aportar hidratación y confort a la piel sensible. Su fórmula con Cica fermentada + Tea Tree + ácido hialurónico ayuda a mantener la piel fresca, equilibrada y suave sin sensación grasa. Vegano y de rápida absorción.",
    tagline: "Sérum calmante · Cica fermentada · Hidratación ligera",
    pitch:
      "Sérum vegano, ligero y de rápida absorción. Calma, hidrata y apoya la barrera de la piel sensible o deshidratada, con Cica fermentada, Tea Tree y complejo de ácido hialurónico.",
    cardDescription:
      "Soothing Serum coreano de textura acuosa con Cica fermentada, Tea Tree y ácido hialurónico. Hidrata y calma sin grasa, ideal para piel sensible.",
    benefits: [
      "Soothing Care — Ayuda a calmar y brindar confort a la piel sensible o con apariencia irritada.",
      "24H Hydration — Hidratación de larga duración gracias al complejo de ácido hialurónico.",
      "Skin Barrier Care — Ceramide NP y Bifida Ferment complementan el cuidado de la barrera.",
      "Fresh & Lightweight — Textura acuosa, ligera y de rápida absorción, fácil de aplicar en capas.",
      "Moisture Balance — Mantiene la piel hidratada, suave y equilibrada sin acabado pesado.",
    ],
    howToUse: [
      "Después del tónico y antes de la crema.",
      "Aplica una cantidad adecuada y distribuye suavemente hasta absorber.",
      "Su textura ligera permite usarlo en una rutina de hidratación por capas.",
    ],
    ingredients: [
      "Fermented Cica — Centella fermentada para un cuidado calmante y confortable.",
      "Multi-Hyaluronic Acid Complex — Mantiene la hidratación y reduce la pérdida de humedad.",
      "Tea Tree Extract — Complementa el cuidado calmante de la piel.",
      "Ceramide NP — Complementa el cuidado de la barrera de humedad.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "Calma + hidratación",
      "Textura acuosa y ligera",
      "Cuidado de la barrera",
    ],
    closingNote:
      "Korean Skincare · Cica Care · 24H Hydration · Skin Barrier Care",
    ingredientsFull:
      "Water, Centella Asiatica Extract, Butylene Glycol, Glycerin, 1,2-Hexanediol, Panthenol, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Hyaluronic Acid, Melaleuca Alternifolia (Tea Tree) Leaf Extract, Madecassoside, Asiaticoside, Allantoin, Dipotassium Glycyrrhizate, Ethylhexylglycerin, Carbomer, Tromethamine",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "skin1004 madagascar centella retinol 0.2 boosting shot ampoule":
    SKIN1004_RETINOL_02_BOOSTING_SHOT,
  "skin1004 madagascar centella retinol 0.2% boosting shot ampoule":
    SKIN1004_RETINOL_02_BOOSTING_SHOT,

  "k-secret seoul 1988 serum : retinal liposome 2% + black ginseng":
    K_SECRET_SEOUL_1988_RETINAL,
  "k-secret seoul 1988 serum: retinal liposome 2% + black ginseng":
    K_SECRET_SEOUL_1988_RETINAL,

  "skin1004 madagascar centella hyalu-cica sleeping pack": {
    editorNote:
      "Overnight Hydration al estilo K-Beauty. El SKIN1004 Madagascar Centella Hyalu-Cica Sleeping Pack es una mascarilla hidratante nocturna de textura gel ligera que actúa durante la noche. Su fórmula Hyalu-Cica combina Centella Asiática y múltiples tipos de ácido hialurónico para aportar hidratación y calma, ayudando a despertar con la piel suave, confortable y luminosa.",
    tagline: "Mascarilla nocturna · Hyalu-Cica · Gel ligero",
    pitch:
      "Mascarilla nocturna hidratante en gel, ligera, con Centella Asiática, 5 tipos de ácido hialurónico, melatonina y Ceramide NP. Hidrata, calma y mejora la apariencia del tono mientras duermes.",
    cardDescription:
      "Sleeping Pack coreano Hyalu-Cica de textura gel ligera. Hidrata y calma durante la noche para despertar con piel suave, confortable y luminosa.",
    benefits: [
      "Overnight Hydration — Aporta hidratación durante la noche sin una sensación pesada.",
      "Cica Soothing Care — La Centella Asiática ayuda a calmar y mantener la piel confortable.",
      "Skin Barrier Care — Ceramide NP complementa el cuidado de la barrera de humedad.",
      "Glow Care — Ayuda a despertar con una apariencia más suave y luminosa.",
      "Lightweight Gel — Textura gel ligera, ideal para una rutina nocturna cómoda y fresca.",
    ],
    howToUse: [
      "Último paso de tu rutina nocturna.",
      "Tras limpiar, tonificar y tratamientos, aplica una cantidad generosa en rostro y cuello.",
      "Déjala actuar toda la noche como mascarilla; no enjuagues.",
    ],
    ingredients: [
      "Centella Asiatica Leaf Water — Hidratación y cuidado calmante de la piel.",
      "5 Hyaluronic Acids — Hidratación intensa durante la noche.",
      "Ceramide NP — Refuerza la barrera de humedad y el confort cutáneo.",
      "Melatonin — Activo nocturno orientado al cuidado mientras descansas.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "Hidratación mientras duermes",
      "Calma + cuidado de barrera",
      "Gel ligero con glow saludable",
    ],
    closingNote:
      "Korean Skincare · Hyalu-Cica Care · Overnight Hydration · Glow Skin",
    ingredientsFull:
      "Centella Asiatica Leaf Water, Water, Butylene Glycol, Glycerin, 1,2-Hexanediol, Niacinamide, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Hyaluronic Acid, Melatonin, Ceramide NP, Panthenol, Adenosine, Allantoin, Carbomer, Arginine, Ethylhexylglycerin, Xanthan Gum",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "tocobo cica calming gel cream": {
    editorNote:
      "Calma + hidratación fresca al estilo K-Beauty. La TOCOBO Cica Calming Gel Cream es una crema hidratante calmante en gel diseñada para aportar hidratación sin sensación pesada. Su textura fresca y ligera combina Cica fermentada + ácido hialurónico + Tea Tree, dejando la piel hidratada, confortable y equilibrada.",
    tagline: "Gel-crema calmante · Cica · Hidratación fresca",
    pitch:
      "Crema hidratante en gel de textura ligera, con Cica fermentada, complejo de ácido hialurónico, Tea Tree y Ceramide NP. Calma, hidrata y cuida la barrera de la piel.",
    cardDescription:
      "Soothing Gel Cream coreana con Cica fermentada, ácido hialurónico y Tea Tree. Hidrata y calma con textura gel ligera, sin acabado pesado.",
    benefits: [
      "Soothing Care — Ayuda a calmar y brindar confort a la piel sensible o irritada.",
      "Hydration Care — El complejo de ácido hialurónico mantiene la piel hidratada y suave.",
      "Skin Barrier Care — Ceramide NP refuerza el cuidado de la barrera de humedad.",
      "Sebum Balance — Tea Tree equilibra el exceso de grasa manteniendo la hidratación.",
      "Fresh Gel Finish — Textura gel ligera, ideal sin acabado pesado.",
    ],
    howToUse: [
      "Último paso de tu rutina de skincare.",
      "Tras el sérum, aplica una cantidad adecuada en rostro y cuello hasta absorber.",
      "Úsala de día o de noche según tu rutina de hidratación.",
    ],
    ingredients: [
      "Fermented Cica — Centella fermentada para un cuidado calmante y confortable.",
      "Multi-Hyaluronic Acid — Mantiene la hidratación y suavidad de la piel.",
      "Tea Tree Extract — Complementa el cuidado calmante y el equilibrio de grasa.",
      "Ceramide NP — Conserva la humedad y apoya la barrera cutánea.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "Calma + hidratación",
      "Textura gel fresca y ligera",
      "Cuidado de la barrera",
    ],
    closingNote:
      "Korean Skincare · Cica Care · Fresh Hydration · Skin Barrier Care",
  },

  "mixsoon bean cream": {
    editorNote:
      "Nutrición + hidratación al estilo K-Beauty. La mixsoon Bean Cream es una crema facial nutritiva formulada con ingredientes fermentados derivados de la soja. Aporta hidratación intensa y ayuda a proteger la barrera de humedad, dejando la piel suave, nutrida y con una apariencia saludable, sin un acabado pesado o pegajoso.",
    tagline: "Crema nutritiva · Soja fermentada · Hidratación intensa",
    pitch:
      "Crema nutritiva e intensamente hidratante con soja fermentada. Conserva la humedad, suaviza la textura y apoya la barrera de la piel, con acabado suave y no graso.",
    cardDescription:
      "Nourishing Cream coreana con soja fermentada. Hidratación intensa y cuidado de barrera, dejando la piel suave y nutrida sin acabado pesado.",
    benefits: [
      "Deep Hydration — Aporta hidratación intensa y ayuda a evitar la pérdida de humedad.",
      "Skin Barrier Care — Ayuda a fortalecer y proteger la barrera natural de la piel.",
      "Nourishing Care — La soja fermentada nutre piel seca o áspera.",
      "Skin Smoothing — Ayuda a dejar la textura más suave y uniforme.",
      "Non-Greasy Finish — Se absorbe sin sensación excesivamente grasa o pegajosa.",
    ],
    howToUse: [
      "Último paso de tu rutina de skincare.",
      "Tras tónico, essence o sérum, aplica en rostro y cuello hasta absorber.",
      "Úsala a diario para sellar la hidratación, ideal en piel seca o áspera.",
    ],
    ingredients: [
      "Fermented Soybean Extract — Nutre, hidrata y mejora la suavidad de la piel.",
      "Fermented Pomegranate Extract — Complementa el cuidado de la textura.",
      "Barley Seed Ferment Filtrate — Fermento nutritivo que revitaliza la fórmula.",
      "Pear Juice Ferment Filtrate — Componentes antioxidantes para el cuidado diario.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "Hidratación intensa",
      "Nutrición con soja fermentada",
      "Piel suave sin acabado graso",
    ],
    closingNote:
      "Korean Skincare · Fermented Bean Care · Deep Moisture · Skin Barrier Care",
  },

  "centellian 24 360° shot pdrn lifting eye cream": {
    editorNote:
      "Lifting Eye Care al estilo K-Beauty. El Centellian24 360° Shot PDRN Lifting Eye Cream es una crema para el contorno de ojos diseñada para cuidar la firmeza, elasticidad y apariencia de líneas alrededor de los ojos. Su fórmula combina PDRN + Cica Care para un cuidado intensivo del contorno, manteniendo la piel hidratada y con apariencia más lisa y revitalizada.",
    tagline: "Crema de ojos · PDRN · Lifting Care",
    pitch:
      "Crema para el contorno de ojos con PDRN de salmón, componentes de Centella Asiática y complejo TECA-2X PDRN. Enfocada en elasticidad y apariencia de arrugas del contorno.",
    cardDescription:
      "Eye Cream coreana con PDRN y Cica Care. Cuida firmeza, elasticidad y líneas del contorno, dejando la piel hidratada y revitalizada.",
    benefits: [
      "Lifting Care — Ayuda a mejorar visualmente la firmeza del delicado contorno de ojos.",
      "Wrinkle Care — Formulada para reducir la apariencia de arrugas alrededor de los ojos.",
      "Elasticity Care — El complejo TECA-2X PDRN mejora la apariencia de elasticidad.",
      "Brightening Care — La niacinamida complementa un contorno más luminoso.",
      "Moisture Care — Emolientes como jojoba mantienen el área hidratada y confortable.",
    ],
    howToUse: [
      "Después del sérum y antes de la crema facial.",
      "Aplica una pequeña cantidad alrededor del contorno de ojos.",
      "Distribuye con movimientos ascendentes suaves hasta absorber.",
    ],
    ingredients: [
      "PDRN (Sodium DNA) — Protagonista del enfoque de firmeza y elasticidad.",
      "Centella Asiatica + TECA — Complementa elasticidad y confort del contorno.",
      "Niacinamide — Complementa el cuidado iluminador y el tono.",
      "Adenosine — Complementa el cuidado de líneas y elasticidad.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "PDRN + Cica Care",
      "Firmeza y elasticidad",
      "Cuidado de líneas del contorno",
    ],
    closingNote:
      "Korean Skincare · PDRN Care · Eye Lifting · Elasticity Care",
  },

  "centellian 24 360 shot pdrn lifting eye cream": {
    editorNote:
      "Lifting Eye Care al estilo K-Beauty. El Centellian24 360° Shot PDRN Lifting Eye Cream es una crema para el contorno de ojos diseñada para cuidar la firmeza, elasticidad y apariencia de líneas alrededor de los ojos. Su fórmula combina PDRN + Cica Care para un cuidado intensivo del contorno, manteniendo la piel hidratada y con apariencia más lisa y revitalizada.",
    tagline: "Crema de ojos · PDRN · Lifting Care",
    pitch:
      "Crema para el contorno de ojos con PDRN de salmón, componentes de Centella Asiática y complejo TECA-2X PDRN. Enfocada en elasticidad y apariencia de arrugas del contorno.",
    cardDescription:
      "Eye Cream coreana con PDRN y Cica Care. Cuida firmeza, elasticidad y líneas del contorno, dejando la piel hidratada y revitalizada.",
    benefits: [
      "Lifting Care — Ayuda a mejorar visualmente la firmeza del delicado contorno de ojos.",
      "Wrinkle Care — Formulada para reducir la apariencia de arrugas alrededor de los ojos.",
      "Elasticity Care — El complejo TECA-2X PDRN mejora la apariencia de elasticidad.",
      "Brightening Care — La niacinamida complementa un contorno más luminoso.",
      "Moisture Care — Emolientes como jojoba mantienen el área hidratada y confortable.",
    ],
    howToUse: [
      "Después del sérum y antes de la crema facial.",
      "Aplica una pequeña cantidad alrededor del contorno de ojos.",
      "Distribuye con movimientos ascendentes suaves hasta absorber.",
    ],
    ingredients: [
      "PDRN (Sodium DNA) — Protagonista del enfoque de firmeza y elasticidad.",
      "Centella Asiatica + TECA — Complementa elasticidad y confort del contorno.",
      "Niacinamide — Complementa el cuidado iluminador y el tono.",
      "Adenosine — Complementa el cuidado de líneas y elasticidad.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "PDRN + Cica Care",
      "Firmeza y elasticidad",
      "Cuidado de líneas del contorno",
    ],
    closingNote:
      "Korean Skincare · PDRN Care · Eye Lifting · Elasticity Care",
  },

  "skin1004 madagascar centella hyalu-cica water-fit sun serum": {
    editorNote:
      "Sun Care + hidratación al estilo K-Beauty. El SKIN1004 Hyalu-Cica Water-Fit Sun Serum es una protección solar con textura de sérum, SPF50+ PA++++, diseñada para proteger frente a UVA y UVB mientras hidrata y calma la piel. Su textura acuosa y ultraligera se absorbe rápidamente y deja un acabado fresco y luminoso, sin sensación grasa ni efecto blanco.",
    tagline: "Sun Serum · SPF50+ · Acabado luminoso",
    pitch:
      "Sun Serum químico, ultraligero y de rápida absorción. Combina protección UV con hidratación y cuidado calmante. Acabado dewy luminoso, no graso y sin efecto blanco.",
    cardDescription:
      "Sun Serum coreano SPF50+ PA++++ con Hyalu-Cica. Textura acuosa ultraligera, acabado luminoso sin grasa ni efecto blanco.",
    benefits: [
      "SPF50+ PA++++ — Alta protección diaria frente a los rayos UVA y UVB.",
      "Hyalu-Cica Care — Centella + ácido hialurónico hidratan y mantienen la piel confortable.",
      "No White Cast — Se absorbe sin dejar residuos blancos visibles.",
      "Dewy Finish — Acabado fresco, hidratado y naturalmente luminoso.",
      "Lightweight Sun Care — Textura tipo sérum, ligera y de rápida absorción diaria.",
    ],
    howToUse: [
      "Último paso de tu rutina AM.",
      "Aplica de forma uniforme en rostro y cuello antes de exponerte al sol.",
      "Reaplica la protección solar durante el día cuando sea necesario.",
    ],
    ingredients: [
      "Centella Asiatica Extract — Complementa el cuidado calmante y confortable.",
      "Hyaluronic Acid — Mantiene hidratación y sensación de piel suave y flexible.",
      "Panthenol — Complementa hidratación y cuidado de la barrera cutánea.",
      "Niacinamide — Complementa luminosidad y uniformidad de la piel.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "SPF50+ PA++++",
      "Hidratación Hyalu-Cica",
      "Glow ligero sin efecto blanco",
    ],
    closingNote:
      "Korean Skincare · Daily Sun Care · Hyalu-Cica · Dewy Glow",
    ingredientsFull:
      "Water, Centella Asiatica Leaf Water, Propanediol, Dibutyl Adipate, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Ethylhexyl Triazone, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Niacinamide, 1,2-Hexanediol, Caprylyl Methicone, Glycerin, Butylene Glycol, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Hyaluronic Acid, Panthenol, Tromethamine, Carbomer, Ethylhexylglycerin",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "celimax pore + dark spot brightening care sunscreen": {
    editorNote:
      "Sun Care + Dark Spot Care al estilo K-Beauty. El CELIMAX Pore + Dark Spot Brightening Care Sunscreen es una protección solar iluminadora con SPF50+ PA++++. Protege frente a los rayos UV mientras ayuda a mejorar la apariencia de manchas oscuras y tono desigual. Su textura ligera tipo esencia se absorbe rápidamente, sin efecto blanco ni sensación grasa.",
    tagline: "Sunscreen iluminador · SPF50+ · Dark Spot Care",
    pitch:
      "Sun Care químico SPF50+ PA++++ que combina protección UV con cuidado de manchas, luminosidad e hidratación. 5% niacinamida + 1% ácido tranexámico, con fórmula tipo esencia hidratante.",
    cardDescription:
      "Brightening Sunscreen coreano SPF50+ PA++++. Protege del sol y ayuda con manchas y tono desigual. Textura esencia ligera, sin efecto blanco ni grasa.",
    benefits: [
      "SPF50+ PA++++ — Alta protección diaria frente a los rayos UVA y UVB.",
      "Dark Spot Care — Ayuda a reducir la apariencia de manchas y pigmentación desigual.",
      "Brightening Care — Niacinamida + TXA para una piel más uniforme y luminosa.",
      "Hydration Care — 79.3% de esencia hidratante para piel suave y confortable.",
      "No White Cast — Textura ligera de rápida absorción sin efecto blanco visible.",
    ],
    howToUse: [
      "Último paso de tu rutina AM.",
      "Aplica de forma uniforme en rostro y cuello antes de la exposición solar.",
      "Reaplica durante el día según sea necesario.",
    ],
    ingredients: [
      "Niacinamide 5% — Mejora luminosidad, uniformidad del tono y apariencia de manchas.",
      "Tranexamic Acid 1% — Activo de Dark Spot Care para pigmentación y tono desigual.",
      "Panthenol — Complementa la hidratación y el confort cutáneo.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "SPF50+ PA++++",
      "5% Niacinamida + 1% TXA",
      "Glow sin efecto blanco",
    ],
    closingNote:
      "Korean Skincare · Daily Sun Care · Dark Spot Care · Brightening Glow",
  },

  "beauty of joseon relief sun : rice + probiotics": {
    editorNote:
      "Rice Glow + Sun Care al estilo K-Beauty. El Beauty of Joseon Relief Sun: Rice + Probiotics es una protección solar diaria con SPF50+ PA++++, formulada para proteger frente a UVA y UVB mientras aporta hidratación y nutrición. Su textura tipo crema hidratante se absorbe cómodamente y deja un acabado naturalmente luminoso, sin sensación pesada ni efecto blanco.",
    tagline: "Daily Sun Care · Arroz 30% · Glow natural",
    pitch:
      "Protección solar diaria SPF50+ PA++++ con 30% extracto de arroz y granos fermentados. Textura cremosa ligera, hidratante y sin efecto blanco.",
    cardDescription:
      "Daily Sun Care coreano SPF50+ PA++++ con arroz y fermentos. Textura crema hidratante, acabado luminoso sin efecto blanco ni pesadez.",
    benefits: [
      "SPF50+ PA++++ — Alta protección diaria frente a los rayos UVA y UVB.",
      "Rice Hydration — El 30% de extracto de arroz mantiene la piel hidratada y confortable.",
      "Probiotic Care — Extractos de granos fermentados complementan el cuidado nutritivo.",
      "No White Cast — Se integra en la piel sin dejar una capa blanca visible.",
      "Natural Glow Finish — Apariencia hidratada y luminosa, ideal para un look K-Beauty.",
    ],
    howToUse: [
      "Último paso de tu rutina AM.",
      "Aplica uniformemente en rostro y cuello antes de la exposición al sol.",
      "Reaplica durante el día para mantener una protección adecuada.",
    ],
    ingredients: [
      "Rice Extract 30% — Hidrata, nutre y mantiene una apariencia saludable.",
      "Fermented Grain Extracts — Fermentos con vitaminas, aminoácidos y minerales.",
      "Niacinamide — Complementa luminosidad y tono más uniforme.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "SPF50+ PA++++",
      "30% Rice + Fermented Grains",
      "Glow hidratado sin efecto blanco",
    ],
    closingNote:
      "Korean Skincare · Daily Sun Care · Rice Glow · No White Cast",
  },

  "beauty of joseon relief sun: rice + probiotics": {
    editorNote:
      "Rice Glow + Sun Care al estilo K-Beauty. El Beauty of Joseon Relief Sun: Rice + Probiotics es una protección solar diaria con SPF50+ PA++++, formulada para proteger frente a UVA y UVB mientras aporta hidratación y nutrición. Su textura tipo crema hidratante se absorbe cómodamente y deja un acabado naturalmente luminoso, sin sensación pesada ni efecto blanco.",
    tagline: "Daily Sun Care · Arroz 30% · Glow natural",
    pitch:
      "Protección solar diaria SPF50+ PA++++ con 30% extracto de arroz y granos fermentados. Textura cremosa ligera, hidratante y sin efecto blanco.",
    cardDescription:
      "Daily Sun Care coreano SPF50+ PA++++ con arroz y fermentos. Textura crema hidratante, acabado luminoso sin efecto blanco ni pesadez.",
    benefits: [
      "SPF50+ PA++++ — Alta protección diaria frente a los rayos UVA y UVB.",
      "Rice Hydration — El 30% de extracto de arroz mantiene la piel hidratada y confortable.",
      "Probiotic Care — Extractos de granos fermentados complementan el cuidado nutritivo.",
      "No White Cast — Se integra en la piel sin dejar una capa blanca visible.",
      "Natural Glow Finish — Apariencia hidratada y luminosa, ideal para un look K-Beauty.",
    ],
    howToUse: [
      "Último paso de tu rutina AM.",
      "Aplica uniformemente en rostro y cuello antes de la exposición al sol.",
      "Reaplica durante el día para mantener una protección adecuada.",
    ],
    ingredients: [
      "Rice Extract 30% — Hidrata, nutre y mantiene una apariencia saludable.",
      "Fermented Grain Extracts — Fermentos con vitaminas, aminoácidos y minerales.",
      "Niacinamide — Complementa luminosidad y tono más uniforme.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "SPF50+ PA++++",
      "30% Rice + Fermented Grains",
      "Glow hidratado sin efecto blanco",
    ],
    closingNote:
      "Korean Skincare · Daily Sun Care · Rice Glow · No White Cast",
  },

  "tocobo bio watery sun cream": {
    editorNote:
      "Watery Sun Care al estilo K-Beauty. El TOCOBO Bio Watery Sun Cream es un Sun Cream —protección solar facial— con SPF50+ PA++++ y una textura acuosa tipo sérum. Se absorbe fácilmente, aporta hidratación y deja un acabado fresco y natural, sin sensación pesada ni efecto blanco visible.",
    tagline: "Sun Cream · SPF50+ · Acabado fresco",
    pitch:
      "Sun Cream vegano de textura muy ligera tipo sérum, formulado con Bio-Hyaluronic Acid y extracto de frijol mungo, pensado para combinar alta protección UV con hidratación y un acabado fresco, sin efecto blanco.",
    cardDescription:
      "Watery Sun Care coreano SPF50+ PA++++. Textura sérum acuosa, hidratante, sin efecto blanco. Vegano y cruelty-free, ideal antes del maquillaje.",
    benefits: [
      "SPF50+ PA++++ — Alta protección diaria frente a los rayos UVA y UVB.",
      "Hydration Care — El Bio-Hyaluronic Acid ayuda a aumentar y mantener la hidratación de la piel.",
      "No White Cast — Se integra sobre la piel sin dejar una capa blanca visible.",
      "Watery Lightweight Finish — Textura ligera tipo sérum que aporta una sensación fresca y cómoda.",
      "Makeup Friendly — Su fórmula ligera puede utilizarse cómodamente antes del maquillaje.",
    ],
    howToUse: [
      "Último paso de tu rutina AM.",
      "Aplica uniformemente sobre rostro, cuello y demás zonas expuestas al sol como último paso del skincare.",
      "Reaplica durante el día cuando sea necesario para mantener la protección.",
      "K-Beauty Tip: gracias a su textura tipo sérum, úsalo como tu último paso de Daily Sun Care antes del maquillaje.",
    ],
    ingredients: [
      "Bio-Hyaluronic Acid – 1,000 ppm — Ayuda a aumentar la hidratación y mantener la piel suave y confortable.",
      "Mung Bean Extract – 1,000 ppm — Extracto de frijol mungo que complementa el cuidado calmante y nutritivo de la piel.",
      "Fórmula vegana y cruelty-free según la ficha de YesStyle.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "SPF50+ PA++++",
      "Hidratación ligera tipo sérum",
      "Sin efecto blanco",
    ],
    closingNote:
      "Korean Skincare · Watery Sun Care · Bio-Hyaluronic Acid · Fresh Finish",
  },

  "pure glow essentials set": PURE_GLOW_ESSENTIALS_SET,
  "mixsoon pure glow essentials set": PURE_GLOW_ESSENTIALS_SET,

  "centellian 24+ madeca mela capture ampoule capsule cream":
    CENTELLIAN_MADECA_MELA_CAPTURE_CAPSULE_CREAM,
  "centellian 24 madeca mela capture ampoule capsule cream":
    CENTELLIAN_MADECA_MELA_CAPTURE_CAPSULE_CREAM,
  "centellian24 madeca mela capture ampoule capsule cream":
    CENTELLIAN_MADECA_MELA_CAPTURE_CAPSULE_CREAM,

  "centellian 24+ madeca mela capture ampoule pad":
    CENTELLIAN_MADECA_MELA_CAPTURE_AMPOULE_PAD,
  "centellian 24 madeca mela capture ampoule pad":
    CENTELLIAN_MADECA_MELA_CAPTURE_AMPOULE_PAD,
  "centellian24 madeca mela capture ampoule pad":
    CENTELLIAN_MADECA_MELA_CAPTURE_AMPOULE_PAD,

  "skin1004 madagascar centella tone brightening capsule ampoule":
    SKIN1004_TONE_BRIGHTENING_CAPSULE_AMPOULE,

  "beauty of joseon matte sun stick : mugwort + camelia spf50+ pa++++":
    BEAUTY_OF_JOSEON_MATTE_SUN_STICK,
  "beauty of joseon matte sun stick: mugwort + camelia spf50+ pa++++":
    BEAUTY_OF_JOSEON_MATTE_SUN_STICK,
  "beauty of joseon matte sun stick : mugwort + camelia":
    BEAUTY_OF_JOSEON_MATTE_SUN_STICK,
  "beauty of joseon matte sun stick: mugwort + camelia":
    BEAUTY_OF_JOSEON_MATTE_SUN_STICK,

  "cosrx advanced snail 96 mucin power essence":
    COSRX_ADVANCED_SNAIL_96_MUCIN_POWER_ESSENCE,

  "skin1004 madagascar centella hyalu-cica first ampoule":
    SKIN1004_HYALU_CICA_FIRST_AMPOULE,
  "skin1004 madagascar centella hyalu-cica first ampoul":
    SKIN1004_HYALU_CICA_FIRST_AMPOULE,

  "tirtir mask fit red cushion 27c cool beige": TIRTIR_MASK_FIT_RED_CUSHION,
  "tirtir mask fit red cushion (27c cool beige)": TIRTIR_MASK_FIT_RED_CUSHION,

  "skin1004 madagascar centella hyalu-cica silky-fit sun stick": {
    editorNote:
      "Protección solar K-Beauty para llevar a todas partes. El SKIN1004 Hyalu-Cica Silky-Fit Sun Stick es un Sun Stick coreano SPF50+ PA++++ que ayuda a proteger la piel de los rayos UVA y UVB mientras aporta hidratación. Su textura se desliza suavemente y deja un Silky Finish —acabado sedoso y ligero— sin efecto blanco. Ideal para tu Daily Sun Care: protección solar diaria y práctica.",
    tagline: "Protector solar en stick · Alta protección · Acabado sedoso",
    pitch:
      "Protector solar coreano en stick de alta protección (SPF50+). Hidrata con Centella y ácido hialurónico, deja un acabado sedoso y no deja mancha blanca. Ideal para llevar y reaplicar.",
    cardDescription:
      "Protección solar K-Beauty SPF50+ PA++++ en stick. Se desliza suave, hidrata con Hyalu-Cica y deja un Silky Finish sedoso, sin efecto blanco. Ideal para tu Daily Sun Care y para reaplicar on-the-go.",
    benefits: [
      "SPF50+ PA++++ — Alta protección diaria frente a rayos UVA y UVB.",
      "Silky Finish — Acabado suave y sedoso sin sensación pesada.",
      "No White Cast — Se integra en la piel sin dejar residuos blancos visibles.",
      "Hyalu-Cica Care — Centella Asiática + ácido hialurónico para complementar el cuidado hidratante y calmante de la piel.",
      "On-the-Go Sun Care — Formato compacto de 20 g, práctico para llevar y reaplicar durante el día.",
    ],
    howToUse: [
      "Último paso de tu rutina AM.",
      "Desliza el Sun Stick uniformemente sobre rostro, cuello y zonas expuestas al sol.",
      "Reaplica durante el día para mantener la protección, especialmente con exposición prolongada.",
    ],
    ingredients: [
      "Centella Asiatica — Ingrediente emblemático de SKIN1004 que complementa el cuidado calmante de la piel.",
      "Hyaluronic Acid — Ayuda a mantener la hidratación y sensación de suavidad.",
      "Chestnut Shell Extract — Extracto de cáscara de castaña asociado al cuidado del sebo y la textura.",
    ],
    ingredientsTitle: "Ingredientes",
    closingTitle: "Te va a encantar",
    closingItems: [
      "Alta protección UV",
      "Acabado sedoso y ligero",
      "Práctico para reaplicar",
    ],
    closingNote:
      "Korean Skincare · SPF50+ PA++++ · Hyalu-Cica Care · Silky Finish",
    ingredientsFull:
      "Methyl Methacrylate Crosspolymer, Synthetic Wax, Coco-Caprylate/Caprate, Cetyl Ethylhexanoate, Butylene Glycol Dicaprylate/Dicaprate, Dibutyl Adipate, Butyloctyl Salicylate, Vinyl Dimethicone/Methicone Silsesquioxane Crosspolymer, Silica, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Dicaprylyl Carbonate, Isopropyl Palmitate, Ethylhexyl Triazone, Tocopheryl Acetate, Diethylhexyl 2,6-Naphthalate, Vinyl Dimethicone, Polysilicone-15, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Ozokerite, Melia Azadirachta Leaf Extract, Melia Azadirachta Flower Extract, Coccinia Indica Fruit Extract, Solanum Melongena (Eggplant) Fruit Extract, Aloe Barbadensis Flower Extract, Curcuma Longa (Turmeric) Root Extract, Corallina Officinalis Extract, Ocimum Sanctum Leaf Extract, Centella Asiatica Extract(0.98ppm), Agave Tequilana Leaf Extract, Diospyros Kaki Leaf Extract, Camellia Sinensis Leaf Extract, Castanea Crenata (Chestnut) Shell Extract, Carthamus Tinctorius (Safflower) Flower Extract, Zanthoxylum Piperitum Fruit Extract, Coffea Arabica (Coffee) Seed Extract, Vitis Vinifera (Grape) Fruit Extract, Polygonum Cuspidatum Root Extract, Simmondsia Chinensis (Jojoba) Seed Oil, Sodium Hyaluronate(1ppm), Bisabolol, Glyceryl Caprylate, Caprylyl Glycol, Polyglyceryl-4 Diisostearate/Polyhydroxystearate/Sebacate, Ethylhexylglycerin, Water, Hydrolyzed Hyaluronic Acid (1 ppm), Butylene Glycol, 1,2-Hexanediol, Glycerin, Hyaluronic Acid (0.01 ppm)",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "centella air-fit suncream plus skin1004": SKIN1004_AIR_FIT_SUNCREAM_PLUS,
  "skin1004 madagascar centella air-fit suncream plus spf50+ pa++++":
    SKIN1004_AIR_FIT_SUNCREAM_PLUS,
  "skin1004 madagascar centella air-fit suncream plus":
    SKIN1004_AIR_FIT_SUNCREAM_PLUS,

  "centella hyalu-cica skin1004": {
    editorNote:
      "Cuidado Hyalu-Cica de SKIN1004 en la línea hidratante calmada: combina agua/extracto de Centella con múltiples formas de ácido hialurónico, niacinamida, ceramida y adenosina. Hidrata en profundidad, calma e ilumina con sensación fresca de sérum, ideal para pieles deshidratadas o sensibles.",
    benefits: [
      "Hidratación profunda con complejo Hyalu-Cica multi-HA",
      "Centella calma irritaciones y aporta confort",
      "Niacinamida unifica el tono con suavidad",
      "Ceramida refuerza la barrera y la elasticidad",
      "Adenosina apoya firmeza en una rutina diaria",
    ],
    howToUse: [
      "Sobre el rostro limpio, aplica una cantidad adecuada tras el tónico.",
      "Extiende con suavidad o da golpecitos para una absorción óptima.",
      "Puede usarse mañana y noche, solo o bajo tu crema habitual.",
      "Si lo usas por la mañana, continúa con protector solar.",
    ],
    ingredients: [
      "Centella Asiatica Leaf Water — calma e hidratación base",
      "5 capas de HA — hidratación multi-nivel",
      "Niacinamida — luminosidad y refuerzo de barrera",
      "Ceramide NP — reparación lipídica",
      "Adenosina — firmeza y cuidado anti-edad suave",
    ],
    ingredientsFull:
      "Water, Centella Asiatica Leaf Water, Butylene Glycol, 1,2-Hexanediol, Niacinamide, Glycerin, Pantolactone, Hibiscus Esculentus Fruit Extract, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Hyaluronic Acid, Methylpropanediol, Panthenol, Cetearyl Olivate, Carbomer, Arginine, Sorbitan Olivate, Caprylic/Capric Triglyceride, Pyrus Communis (Pear) Fruit Extract, Pentylene Glycol, Adenosine, Polyglutamic Acid, Rosa Damascena Flower Water, Artemisia Princeps Leaf Extract, Cucumis Melo (Melon) Fruit Extract, Iris Florentina Root Extract, Ethylhexylglycerin, Hedera Helix (Ivy) Leaf/Stem Extract, Sodium Phytate, Xanthan Gum, Maltodextrin, Hydrolyzed Gardenia Florida Extract, Hydrogenated Lecithin, Ceramide NP, Sodium Hyaluronate Crosspolymer, Hydrolyzed Sodium Hyaluronate",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },
};

function normalizeName(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

function fallbackContent(product: Product): ProductDetailContent {
  const category = product.category;
  const baseNote =
    product.description?.trim() ||
    "Fórmula de skincare coreano seleccionada para una rutina limpia, efectiva y cómoda en el día a día.";

  switch (category) {
    case "Limpiadores":
      return {
        editorNote: baseNote,
        benefits: [
          "Limpia impurezas respetando el equilibrio de la piel",
          "Textura cómoda para uso diario",
          "Deja la piel fresca sin tirantez excesiva",
          "Prepara el cutis para el resto de la rutina",
        ],
        howToUse: [
          "Humedece el rostro y aplica una cantidad adecuada.",
          "Masajea suavemente y enjuaga con agua tibia.",
          "Seca a toques y continúa con tónico.",
        ],
        ingredients: [
          "Surfactantes suaves de limpieza",
          "Activos calmantes o hidratantes",
          "Humectantes de confort cutáneo",
        ],
      };
    case "Tónicos":
      return {
        editorNote: baseNote,
        benefits: [
          "Equilibra e hidrata tras la limpieza",
          "Prepara la piel para sérums y cremas",
          "Sensación fresca de rápida absorción",
          "Aporta confort sin residuo pegajoso",
        ],
        howToUse: [
          "Tras limpiar, aplica con las manos o un disco de algodón.",
          "Da golpecitos hasta absorber.",
          "Continúa con sérum y crema.",
        ],
        ingredients: [
          "Humectantes de hidratación ligera",
          "Activos calmantes o exfoliantes suaves",
          "Base acuosa de absorción rápida",
        ],
      };
    case "Sueros y Ampollas":
      return {
        editorNote: baseNote,
        benefits: [
          "Concentrado de activos para el cuidado dirigido",
          "Textura de rápida absorción",
          "Complementa tónico y crema",
          "Aporta resultados visibles con uso constante",
        ],
        howToUse: [
          "Tras el tónico, aplica unas gotas sobre el rostro.",
          "Extiende con suavidad hasta absorber.",
          "Sella con crema; de día, usa protector solar.",
        ],
        ingredients: [
          "Activos concentrados de tratamiento",
          "Humectantes de soporte",
          "Componentes calmantes o reparadores",
        ],
      };
    case "Hidratantes":
      return {
        editorNote: baseNote,
        benefits: [
          "Hidrata y sella la rutina de cuidado",
          "Refuerza el confort y la flexibilidad",
          "Textura cómoda para el día a día",
          "Ayuda a mantener la barrera cutánea",
        ],
        howToUse: [
          "Tras el sérum, aplica una cantidad adecuada.",
          "Extiende por rostro y cuello hasta absorber.",
          "De día, continúa con protector solar.",
        ],
        ingredients: [
          "Humectantes e hidratantes",
          "Emolientes de sellado",
          "Activos de barrera o calma",
        ],
      };
    case "Protectores Solares":
      return {
        editorNote: baseNote,
        benefits: [
          "Protección UV de uso diario",
          "Textura cómoda para el día a día",
          "Cierra la rutina de la mañana",
          "Ayuda a prevenir daño solar visible",
        ],
        howToUse: [
          "Como último paso de la rutina AM.",
          "Aplica una cantidad generosa en rostro y cuello.",
          "Reaplica cada 2–3 horas según exposición.",
        ],
        ingredients: [
          "Filtros UV de protección",
          "Humectantes de confort",
          "Activos calmantes o hidratantes",
        ],
      };
    case "Maquillaje":
      return {
        editorNote: baseNote,
        benefits: [
          "Acabado uniforme y natural",
          "Aplicación práctica para el día a día",
          "Cobertura modulable según capas",
          "Complementa una piel bien preparada",
        ],
        howToUse: [
          "Sobre piel hidratada y con SPF.",
          "Aplica con puff, brocha o dedos según el formato.",
          "Construye cobertura en capas finas.",
        ],
        ingredients: [
          "Pigmentos de cobertura",
          "Base emoliente de confort",
          "Agentes de acabado y duración",
        ],
      };
    default:
      return {
        editorNote: baseNote,
        benefits: [
          "Fórmula pensada para el cuidado diario de la piel",
          "Textura cómoda y de rápida absorción",
          "Ayuda a mantener la piel calmada e hidratada",
          "Acabado fresco y natural",
        ],
        howToUse: [
          "Aplique sobre la piel limpia una cantidad adecuada del producto.",
          "Extienda con suavidad según el formato.",
          "Continúe con el resto de su rutina y, de día, finalice con protector solar.",
        ],
        ingredients: [
          "Activos botánicos de cuidado coreano",
          "Agentes hidratantes para confort cutáneo",
          "Componentes calmantes para piel sensible",
        ],
      };
  }
}

export function getProductDetailContent(
  product: Product,
): ProductDetailContent {
  const key = normalizeName(product.name);
  if (PRODUCT_DETAILS[key]) return PRODUCT_DETAILS[key];
  if (key.includes("air-fit") || key.includes("air fit")) {
    return SKIN1004_AIR_FIT_SUNCREAM_PLUS;
  }
  return fallbackContent(product);
}

/** Concise technical blurb for the product hero (under the price). */
export function getProductPitch(
  details: ProductDetailContent,
  fallbackDescription?: string | null,
) {
  if (details.pitch?.trim()) return details.pitch.trim();
  if (details.cardDescription?.trim()) return details.cardDescription.trim();

  const source = (details.editorNote || fallbackDescription || "").replace(
    /\s+/g,
    " ",
  ).trim();
  if (!source) {
    return "Fórmula K-Beauty de uso diario: textura ligera, activos claros y acabado cómodo en piel.";
  }

  const sentences = source.match(/[^.!?]+[.!?]?/g)?.map((s) => s.trim()).filter(Boolean) ?? [
    source,
  ];
  const compact = sentences.slice(0, 2).join(" ");
  if (compact.length <= 160) return compact;
  const cut = compact.slice(0, 160);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : 160).trimEnd()}.`;
}

export function getProductTagline(
  details: ProductDetailContent,
  fallbackDescription?: string | null,
) {
  if (details.tagline?.trim()) return details.tagline.trim();
  const source = (fallbackDescription || details.editorNote || "")
    .replace(/\s+/g, " ")
    .trim();
  const first = source.split(/[.!?]/)[0]?.trim();
  if (first && first.length <= 72) return first;
  return "Cuidado facial K-Beauty";
}

export function formatPenPrice(price: number) {
  return `S/ ${price.toFixed(2)}`;
}
