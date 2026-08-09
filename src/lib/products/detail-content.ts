import type { Product } from "@/lib/db/types";

export type ProductDetailContent = {
  editorNote: string;
  benefits: string[];
  howToUse: string[];
  ingredients: string[];
  ingredientsFull?: string;
  ingredientsDisclaimer?: string;
};

const INGREDIENTS_DISCLAIMER =
  "Los ingredientes pueden cambiar por decisión del fabricante. Para obtener una lista completa y actualizada de los ingredientes, consulta el envase del producto.";

const AIR_FIT_INGREDIENTS =
  "Centella Asiatica (Gotu Kola) Extract(35.8%), Cyclopentasiloxane, Zinc Oxide, Butyloctyl Salicylate, Titanium Oxide, Propanediol, Benzotriazolyl Dodecyl p-Cresol, Coptis Chinensis Root Extract, PEG-10 Dimethicone, Niacinamide, Disteardimonium Hectorite, Butylene Glycol, Magnesium Sulfate, 1,2-Hexanediol, Caprylic/Capric Glycerides, Dimethicone, VP/Hexadecene Copolymer, Polymethylsilsesquioxane, Aluminum Hydroxide, Stearic Acid, Sorbitan Sesquioleate, Triethoxycaprylylsilane, Dimethicone Crosspolymer, Dimethicone/Vinyl Dimethicone Crosspolymer, Dextrin, Theobroma Cacao (Cocoa) Extract, Pelargonium Graveolens Flower Oil, Water, Citrus Aurantium Bergamia (Bergamot) Fruit Oil, Betaine, Scutellaria Baicalensis Root Extract, Polygonum Cuspidatum Root Extract, Glycyrrhiza Glabra (Licorice) Root Extract, Camellia Sinensis Leaf Extract, Sodium Hyaluronate, Rosmarinus Officinalis (Rosemary) Leaf Extract, Chamomilla Recutita (Matricaria) Flower Extract, Rosa Damascena Flower Oil, Pentylene Glycol, Madecassoside, Citronellol, Geraniol, Linalool";

const PRODUCT_DETAILS: Record<string, ProductDetailContent> = {
  "mixsoon centella cleansing water": {
    editorNote:
      "Agua micelar de mixsoon pensada como primer paso de limpieza: elimina maquillaje ligero e impurezas sin fricción agresiva. La fórmula combina extracto de Centella con Panthenol, Allantoin y Betaine para dejar la piel limpia, calmada e hidratada, lista para el segundo limpiador o el tónico.",
    benefits: [
      "Limpieza micelar suave que retira maquillaje e impurezas del día",
      "Centella Asiática para calmar piel sensible o reactiva",
      "Panthenol y Allantoin aportan confort y sensación de reparación",
      "Betaine ayuda a mantener el equilibrio hídrico tras la limpieza",
      "Textura acuosa que no deja residuo jabonoso ni tirantez",
    ],
    howToUse: [
      "Empapa un disco de algodón con una cantidad generosa del producto.",
      "Pasa suavemente por rostro, ojos y labios para retirar maquillaje e impurezas.",
      "Repite con un disco limpio hasta que salga sin residuo.",
      "Continúa con tu limpiador en espuma o gel si haces doble limpieza.",
    ],
    ingredients: [
      "Centella Asiatica Extract — calma e irritaciones tras la limpieza",
      "Panthenol (pro-vitamina B5) — hidrata y refuerza el confort cutáneo",
      "Allantoin — suaviza y protege piel sensible",
      "Betaine — equilibra la hidratación y reduce la tirantez",
      "Surfactantes poliglicerol — limpieza micelar sin jabón agresivo",
    ],
    ingredientsFull:
      "Water, Propanediol, Polyglyceryl-4 Caprate, 1,2-Hexanediol, Polyglyceryl-6 Caprylate, Polyglyceryl-6 Ricinoleate, Polyglyceryl-3 Cocoate, Butylene Glycol, Betaine, Panthenol, Erythritol, Centella Asiatica Extract, Houttuynia Cordata Extract, Illicium Verum (Anise) Fruit Extract, Caprylyl Glycol, Allantoin, Disodium EDTA, Citric Acid, Sodium Citrate",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "skin1004 madagascar centella ampoule foam": {
    editorNote:
      "Espuma limpiadora de SKIN1004 formulada a pH 5 con extracto de Centella de Madagascar y surfactantes derivados del coco. Limpia en profundidad con una espuma cremosa que no reseca, dejando la piel suave, calmada e hidratada gracias al ácido hialurónico y al ácido cítrico que equilibra el pH.",
    benefits: [
      "pH 5 cercano al de la piel para una limpieza respetuosa de la barrera",
      "Surfactantes de coco que generan espuma cremosa sin resecar",
      "Centella Asiática calma e irritaciones durante la limpieza",
      "Ácido hialurónico aporta confort e hidratación inmediata",
      "Ácido cítrico ayuda a equilibrar el pH de la fórmula",
    ],
    howToUse: [
      "Humedece el rostro y dispensa una cantidad del tamaño de una moneda.",
      "Emulsiona entre las manos húmedas hasta formar una espuma densa.",
      "Masajea suavemente rostro y cuello durante 30–60 segundos.",
      "Enjuaga con abundante agua tibia y seca a toques.",
      "Continúa con tónico o sérum sobre la piel limpia.",
    ],
    ingredients: [
      "Centella Asiatica Extract — calma y repara durante la limpieza",
      "Sodium Cocoyl Isethionate — surfactante suave de origen coco",
      "Sodium Methyl Cocoyl Taurate — espuma cremosa sin resecar",
      "Citric Acid — equilibra el pH cerca de 5",
      "Sodium Hyaluronate — hidratación residual tras el enjuague",
    ],
    ingredientsFull:
      "Centella Asiatica Extract, Sodium Cocoyl Isethionate, Glycerin, Water, Sodium Methyl Cocoyl Taurate, Coco-Betaine, Potassium Cocoyl Glycinate, Caprylyl Glycol, Sodium Chloride, Potassium Cocoate, Polyquaternium-67, Citric Acid, Sodium Bicarbonate, Hydroxypropyl Starch Phosphate, Potassium Benzoate, Theobroma Cacao (Cocoa) Extract, Disodium EDTA, 1,2-Hexanediol, Butylene Glycol, Coptis Chinensis Root Extract, Sodium Hyaluronate, Eclipta Prostrata Extract, Coccinia Indica Fruit Extract",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "skin1004 madagascar centella tone brightening cleansing gel foam": {
    editorNote:
      "Gel-espuma iluminadora de SKIN1004 con un 41% de extracto de Centella, niacinamida y etil ácido ascórbico. Limpia e ilumina en el mismo paso: elimina impurezas mientras trabaja sobre el tono irregular y la falta de luminosidad, con extractos de fruta que aportan frescura y un acabado más uniforme.",
    benefits: [
      "41% de Centella Asiática para calmar mientras limpia",
      "Niacinamida ayuda a unificar el tono y minimizar poros visibles",
      "Etil ácido ascórbico (derivado de vitamina C) aporta luminosidad",
      "Extractos de fruta refrescan y apoyan el efecto brightening",
      "Textura gel-espuma que limpia sin dejar sensación grasa",
    ],
    howToUse: [
      "Humedece el rostro y aplica una cantidad del tamaño de un guisante.",
      "Emulsiona con agua hasta obtener espuma ligera.",
      "Masajea en círculos suaves prestando atención a la zona T.",
      "Enjuaga bien y continúa con tónico iluminador si lo usas.",
    ],
    ingredients: [
      "Centella Asiatica Extract 41% — calma e hidrata en la limpieza",
      "Niacinamida — unifica el tono y equilibra la piel",
      "Ethyl Ascorbic Acid — luminosidad antioxidante",
      "Extractos de fruta — frescura y apoyo brightening",
      "Surfactantes suaves — limpieza sin tirantez excesiva",
    ],
    ingredientsFull:
      "Centella Asiatica Extract, Water, Glycerin, Sodium Cocoyl Isethionate, Cocamidopropyl Betaine, Niacinamide, 3-O-Ethyl Ascorbic Acid, Caprylyl Glycol, Sodium Chloride, Citric Acid, Butylene Glycol, Sodium Hyaluronate, Citrus Aurantium Dulcis (Orange) Fruit Extract, Pyrus Malus (Apple) Fruit Extract, Prunus Persica (Peach) Fruit Extract, 1,2-Hexanediol, Disodium EDTA",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "tocobo coconut clay cleansing foam": {
    editorNote:
      "Espuma limpiadora de TOCOBO con un 27% de surfactantes de origen coco/palma y arcillas bentonita + calamina. Ideal para piel mixta o grasa: limpia poros, absorbe exceso de sebo y deja un acabado fresco sin resecar en exceso, gracias a la glicerina y al extracto de saponaria.",
    benefits: [
      "27% de surfactantes de coco/palma para una limpieza profunda y cremosa",
      "Bentonita (9.000 ppm) absorbe sebo e impurezas de los poros",
      "Calamina aporta efecto matificante y calmante en piel oleosa",
      "Pensada para piel mixta o grasa con tendencia a brillos",
      "Glicerina equilibra la limpieza para evitar resecar en exceso",
    ],
    howToUse: [
      "Humedece el rostro y dispensa una cantidad del tamaño de una moneda.",
      "Emulsiona hasta formar espuma y masajea prestando atención a zona T.",
      "Deja actuar unos segundos en zonas con más sebo si lo necesitas.",
      "Enjuaga con abundante agua e hidrata a continuación.",
    ],
    ingredients: [
      "Potassium Cocoate / surfactantes coco — limpieza profunda cremosa",
      "Bentonite — arcilla que absorbe sebo e impurezas",
      "Calamine — matifica y calma piel oleosa",
      "Glycerin — hidratación que equilibra la limpieza",
      "Saponaria Extract — apoyo botánico en la fórmula",
    ],
    ingredientsFull:
      "Water, Glycerin, Hydrogenated Palm Acid (25%), Potassium Hydroxide, Potassium Cocoate (2.9%), Calamine (1,000 ppm), Saponaria Officinalis Extract (100 ppm), Bentonite (9,000 ppm), Glyceryl Stearate, Butylene Glycol, Polyquaternium-7, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Sodium Phytate, EDTA, Sodium Benzoate, Fragrance, CI 14700",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "mixsoon centella cleansing foam": {
    editorNote:
      "Espuma de limpieza de mixsoon con bajo pH, extracto de Centella y una dosis suave de ácido salicílico. Ideal como segundo paso de la doble limpieza: elimina residuos del día sin alterar la barrera, dejando la piel limpia, calmada y preparada para el resto de la rutina.",
    benefits: [
      "Bajo pH que respeta el equilibrio natural de la piel",
      "Centella Asiática calma durante y después de la limpieza",
      "Ácido salicílico suave ayuda a limpiar poros sin agresividad",
      "Espuma ligera apta para uso diario, incluso en piel sensible",
      "Deja la piel limpia sin sensación jabonosa ni tirantez",
    ],
    howToUse: [
      "Tras el limpiador oleoso o micelar, humedece el rostro.",
      "Dispensa una cantidad pequeña y genera espuma entre las manos.",
      "Masajea suavemente evitando frotar con fuerza.",
      "Enjuaga bien y continúa con tónico o sérum.",
    ],
    ingredients: [
      "Centella Asiatica Extract — calma e irritaciones",
      "Ácido salicílico (BHA) — limpieza suave de poros",
      "Surfactantes suaves de bajo pH — limpieza respetuosa",
      "Humectantes — confort cutáneo tras el enjuague",
      "Activos calmantes — reducen la sensación de tirantez",
    ],
  },

  "skin1004 madagascar centella toning toner": {
    editorNote:
      "Tónico PHA de SKIN1004 con un 84% de extracto de Centella Asiática, gluconolactona (PHA), niacinamida y ácido hialurónico. Exfolia con suavidad, calma, hidrata e ilumina en un solo paso: ideal para pieles sensibles que quieren renovación sin la agresividad de un AHA clásico.",
    benefits: [
      "84% de Centella Asiática para calmar e hidratar en profundidad",
      "Gluconolactona (PHA) exfolia suavemente sin sensibilizar al sol como los AHA",
      "Niacinamida ilumina y refuerza la síntesis de ceramidas",
      "Ácido hialurónico aporta flexibilidad y confort inmediato",
      "Textura acuosa apta para uso diario mañana y noche",
    ],
    howToUse: [
      "Tras limpiar, empapa un disco de algodón con una cantidad adecuada.",
      "Pasa suavemente por el rostro evitando el contorno de ojos.",
      "Da golpecitos con las yemas para favorecer la absorción.",
      "Continúa con sérum y crema; de día, finaliza con protector solar.",
    ],
    ingredients: [
      "Centella Asiatica Extract 84% — calma, repara e hidrata",
      "Gluconolactone (PHA) — exfoliación suave de nueva generación",
      "Niacinamida — luminosidad y refuerzo de barrera",
      "Hyaluronic Acid — hidratación multi-nivel",
      "Betaine — equilibrio osmótico y confort",
    ],
    ingredientsFull:
      "Centella Asiatica Extract (84%), Water, Propanediol, Caprylyl Glycol, Niacinamide, Gluconolactone, Tromethamine, Carbomer, Sodium Citrate, Adenosine, Allantoin, Disodium EDTA, Betaine, Hyaluronic Acid, Ethylhexylglycerin",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "skin1004 madagascar centella hyalu-cica brightening toner": {
    editorNote:
      "Tónico iluminador Hyalu-Cica de SKIN1004 que combina agua de hoja de Centella, un complejo de ácido hialurónico, AHA+LHA y ceramida NP. Renueva la superficie cutánea con suavidad mientras hidrata y refuerza la barrera, dejando un tono más luminoso y uniforme sin sensación agresiva.",
    benefits: [
      "Agua de hoja de Centella calma e hidrata desde el primer contacto",
      "Complejo de HA aporta hidratación en distintas capas de la piel",
      "AHA + LHA renuevan la superficie y apoyan el efecto brightening",
      "Ceramida NP refuerza la barrera tras la exfoliación suave",
      "Prepara la piel para absorber mejor sérums iluminadores",
    ],
    howToUse: [
      "Sobre el rostro limpio, aplica con las manos o un disco de algodón.",
      "Extiende de dentro hacia fuera evitando el contorno de ojos.",
      "Da golpecitos hasta absorber; no enjuagues.",
      "Sigue con sérum brightening o hidratante según tu rutina.",
      "De día, usa siempre protector solar tras activos exfoliantes.",
    ],
    ingredients: [
      "Centella Asiatica Leaf Water — calma e hidratación base",
      "Complejo de ácido hialurónico — hidratación multi-capa",
      "AHA + LHA — renovación suave e iluminación",
      "Ceramide NP — refuerzo de la barrera cutánea",
      "Activos humectantes — confort sin tirantez",
    ],
    ingredientsFull:
      "Centella Asiatica Leaf Water, Water, Butylene Glycol, Glycerin, Niacinamide, 1,2-Hexanediol, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Hyaluronic Acid, Glycolic Acid, Capryloyl Salicylic Acid, Ceramide NP, Panthenol, Allantoin, Ethylhexylglycerin, Sodium Citrate, Citric Acid",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "skin1004 madagascar centella hyalu-cica blue serum": {
    editorNote:
      "Sérum gel Hyalu-Cica de SKIN1004 con agua de hoja de Centella, cinco capas de ácido hialurónico, niacinamida, ceramida y adenosina. Hidrata en profundidad, calma e ilumina con una textura acuosa de rápida absorción, ideal para pieles mixtas, grasas o sensibles que buscan confort sin pesadez.",
    benefits: [
      "Agua de hoja de Centella (~38%) calma e hidrata al instante",
      "Cinco formas de HA hidratan en distintas capas de la piel",
      "Niacinamida unifica el tono y refuerza la barrera",
      "Ceramida NP aporta elasticidad y protección lipídica",
      "Adenosina apoya la firmeza y el cuidado anti-edad suave",
    ],
    howToUse: [
      "Tras el tónico, aplica 2–3 gotas o una bomba sobre el rostro.",
      "Extiende con suavidad o da golpecitos hasta absorber.",
      "Usa mañana y noche solo o bajo tu crema habitual.",
      "De día, continúa con protector solar.",
    ],
    ingredients: [
      "Centella Asiatica Leaf Water — calma e hidratación base",
      "5 capas de HA — hidratación profunda y prolongada",
      "Niacinamida — luminosidad y refuerzo de barrera",
      "Ceramide NP — reparación lipídica",
      "Adenosina — firmeza y cuidado anti-edad",
    ],
    ingredientsFull:
      "Water, Centella Asiatica Leaf Water, Butylene Glycol, 1,2-Hexanediol, Niacinamide, Glycerin, Pantolactone, Hibiscus Esculentus Fruit Extract, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Hyaluronic Acid, Methylpropanediol, Panthenol, Cetearyl Olivate, Carbomer, Arginine, Sorbitan Olivate, Caprylic/Capric Triglyceride, Pyrus Communis (Pear) Fruit Extract, Pentylene Glycol, Adenosine, Polyglutamic Acid, Rosa Damascena Flower Water, Artemisia Princeps Leaf Extract, Cucumis Melo (Melon) Fruit Extract, Iris Florentina Root Extract, Ethylhexylglycerin, Hedera Helix (Ivy) Leaf/Stem Extract, Sodium Phytate, Xanthan Gum, Maltodextrin, Hydrolyzed Gardenia Florida Extract, Hydrogenated Lecithin, Ceramide NP, Sodium Hyaluronate Crosspolymer, Hydrolyzed Sodium Hyaluronate",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "skin1004 madagascar centella niacinamide 10 boosting shot ampoule": {
    editorNote:
      "Ampolla concentrada de SKIN1004 con un 10% de niacinamida, ácido tranexámico, ascorbil glucósido y espículas. Pensada para unificar el tono, minimizar poros y potenciar la luminosidad; su potencia exige una introducción gradual (2–3 veces por semana) hasta tolerar el uso más frecuente.",
    benefits: [
      "10% de niacinamida para poros, tono irregular y exceso de sebo",
      "Ácido tranexámico apoya la reducción de manchas visibles",
      "Ascorbil glucósido (vitamina C estable) aporta luminosidad antioxidante",
      "Espículas favorecen la penetración de activos",
      "Formato shot para potenciar rutinas de brightening",
    ],
    howToUse: [
      "Tras limpiar y tonificar, aplica 2–3 gotas sobre el rostro.",
      "Empieza 2–3 veces por semana; aumenta según tolerancia.",
      "Evita combinar la misma noche con ácidos fuertes o retinol si eres principiante.",
      "Sella con crema hidratante.",
      "De día, usa siempre SPF 50+.",
    ],
    ingredients: [
      "Niacinamida 10% — unifica tono, poros y sebo",
      "Ácido tranexámico (TXA) — apoyo antimanchas",
      "Ascorbyl Glucoside — luminosidad antioxidante",
      "Espículas — potencian la absorción de activos",
      "Centella — calma en una fórmula concentrada",
    ],
  },

  "anua 7+ rice ceramide hydrating barrier serum": {
    editorNote:
      "Sérum barrera de Anua con complejo de arroz, ceramida NP, un 3% de niacinamida y ácido hialurónico. Refuerza la barrera cutánea, aporta hidratación duradera y deja la piel más suave y flexible: ideal para pieles secas, deshidratadas o sensibilizadas por activos potentes.",
    benefits: [
      "Complejo de arroz hidrata y suaviza la textura",
      "Ceramida NP refuerza la barrera lipídica",
      "3% de niacinamida equilibra e ilumina con suavidad",
      "Ácido hialurónico aporta confort multi-nivel",
      "Textura ligera apta bajo crema o como capa hidratante",
    ],
    howToUse: [
      "Tras el tónico, aplica una cantidad del tamaño de un guisante.",
      "Extiende por rostro y cuello con movimientos ascendentes.",
      "Usa mañana y noche; sella con crema si tu piel es seca.",
      "De día, finaliza con protector solar.",
    ],
    ingredients: [
      "Complejo de arroz — hidratación y suavidad",
      "Ceramide NP — refuerzo de barrera",
      "Niacinamida 3% — equilibrio e iluminación suave",
      "Ácido hialurónico — retención de humedad",
      "Humectantes — confort prolongado",
    ],
    ingredientsFull:
      "Oryza Sativa (Rice) Bran Water, Water, Glycerin, Butylene Glycol, Niacinamide, 1,2-Hexanediol, Ceramide NP, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Panthenol, Betaine, Caprylic/Capric Triglyceride, Hydrogenated Lecithin, Allantoin, Ethylhexylglycerin, Xanthan Gum, Carbomer, Tromethamine",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "anua 10+ azelaic acid 10 hyaluron redness soothing serum": {
    editorNote:
      "Sérum calmante de Anua con un 10% de ácido azelaico, ácido hialurónico y complejo cica. Ayuda a calmar el enrojecimiento, equilibrar piel con tendencia a imperfecciones y aportar hidratación. Introduce de forma gradual si tu piel es sensible o no ha usado azelaico antes.",
    benefits: [
      "10% de ácido azelaico para enrojecimiento e irregularidades",
      "Complejo cica (Centella + madecassoside) calma la piel reactiva",
      "HA y panthenol aportan hidratación y confort",
      "Textura acuosa de rápida absorción, sin sensación grasa",
      "Apoya un tono más uniforme con uso constante",
    ],
    howToUse: [
      "Tras limpiar y tonificar, aplica una capa fina sobre el rostro.",
      "Empieza en noches alternas; aumenta según tolerancia.",
      "Evita el contorno de ojos y zonas con barrera comprometida.",
      "Sella con crema hidratante.",
      "De día, usa protector solar de amplio espectro.",
    ],
    ingredients: [
      "Ácido azelaico 10% — calma enrojecimiento e irregularidades",
      "Complejo cica — repara y suaviza piel sensible",
      "Sodium Hyaluronate — hidratación inmediata",
      "Panthenol y Allantoin — confort anti-irritación",
      "Ceramide NP — refuerzo de barrera",
    ],
    ingredientsFull:
      "Water, Azelaic Acid, Propylene Glycol, Sodium Hydroxide, Dipropylene Glycol, 1,2-Hexanediol, Panthenol, Hydroxyethylcellulose, Betaine Salicylate, Glycerin, Biosaccharide Gum-1, Ethylhexylglycerin, Allantoin, Dipotassium Glycyrrhizate, Melia Azadirachta Leaf Extract, Camellia Sinensis Leaf Water, Sodium Hyaluronate, Melia Azadirachta Flower Extract, Niacinamide, Aloe Barbadensis Leaf Juice, Beta-Glucan, Centella Asiatica Extract, Centella Asiatica Leaf Extract, Centella Asiatica Root Extract, Madecassoside, Asiaticoside, Asiatic Acid, Madecassic Acid, Squalane, Zinc PCA, Butylene Glycol, Pentylene Glycol, Caprylyl/Capryl Glucoside, Hydrogenated Lecithin, Ceramide NP",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "anua 10+ niacinamide 10 txa 4 serum": {
    editorNote:
      "Sérum iluminador de Anua con un 10% de niacinamida, 4% de ácido tranexámico y 2% de arbutina. Trío concentrado para manchas, tono irregular y poros visibles, acompañado de HA y ceramidas para mantener la hidratación mientras se trabaja la claridad del cutis.",
    benefits: [
      "10% de niacinamida para poros, sebo y tono desigual",
      "4% de TXA apoya la reducción de manchas y opacidad",
      "2% de arbutina refuerza el efecto brightening",
      "Complejo de HA hidrata sin pesar",
      "Ceramidas protegen la barrera durante el tratamiento",
    ],
    howToUse: [
      "Tras el tónico, aplica 2–3 gotas sobre rostro y cuello.",
      "Extiende con suavidad hasta absorber.",
      "Puedes usarlo mañana y noche según tolerancia.",
      "De día, siempre continúa con SPF alto.",
    ],
    ingredients: [
      "Niacinamida 10% — claridad, poros y equilibrio",
      "Ácido tranexámico 4% — apoyo antimanchas",
      "Arbutina 2% — luminosidad e uniformidad",
      "Complejo de HA — hidratación multi-forma",
      "Ceramide NP — protección de barrera",
    ],
    ingredientsFull:
      "Water, Glycerin, Niacinamide, Tranexamic Acid, Butylene Glycol, Diethoxyethyl Succinate, 1,2-Hexanediol, Arbutin, Sodium Hyaluronate, Alpha-Arbutin, Coccinia Indica Fruit Extract, Eclipta Prostrata Extract, Macadamia Integrifolia Seed Oil, Olea Europaea (Olive) Fruit Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Vitis Vinifera (Grape) Seed Oil, Theobroma Cacao (Cocoa) Extract, Hydrolyzed Hyaluronic Acid, Chamaecyparis Obtusa Leaf Extract, Prunus Persica (Peach) Flower Extract, Camellia Sinensis Seed Oil, Yeast Ferment Extract, Centella Asiatica Extract, Artemisia Princeps Leaf Extract, Candida Bombicola/Glucose/Methyl Rapeseedate Ferment, Hyaluronic Acid, Pentylene Glycol, Betaine Salicylate, Sucrose Palmitate, Hydrogenated Lecithin, Gellan Gum, Sodium Phytate, Cellulose, Caprylic/Capric Triglyceride, Panthenol, Cyanocobalamin, Polyglutamic Acid, 3-O-Ethyl Ascorbic Acid, Ceramide NP, Dextrin, Asiaticoside, Madecassic Acid, Asiatic Acid, Dimethylsilanol Hyaluronate, Hydrolyzed Sodium Hyaluronate, Potassium Hyaluronate, Hydroxypropyltrimonium Hyaluronate, Sodium Hyaluronate Crosspolymer, Sodium Hyaluronate Dimethylsilanol, Sodium Acetylated Hyaluronate, Xanthan Gum",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "tocobo cica calming serum": {
    editorNote:
      "Sérum calmante de TOCOBO con cica fermentada, árbol de té y multi-HA. Pensado para pieles irritadas, mixtas o con tendencia a enrojecimiento: calma, equilibra e hidrata con una textura ligera que se absorbe rápido y deja un acabado fresco, sin oclusión.",
    benefits: [
      "Cica fermentada potencia el efecto calmante y reparador",
      "Árbol de té ayuda a equilibrar piel con tendencia a imperfecciones",
      "Multi-HA hidrata en distintas capas sin sensación pegajosa",
      "Textura ligera ideal bajo maquillaje o crema",
      "Apoya la recuperación de piel estresada o sensible",
    ],
    howToUse: [
      "Tras el tónico, aplica 2–3 gotas sobre el rostro.",
      "Da golpecitos suaves hasta completar la absorción.",
      "Usa mañana y noche; sella con gel-crema si lo necesitas.",
      "De día, finaliza con protector solar.",
    ],
    ingredients: [
      "Centella fermentada — calma y reparación potenciada",
      "Tea Tree — equilibra piel con tendencia a brotes",
      "Multi-HA — hidratación ligera multi-nivel",
      "Panthenol — confort anti-irritación",
      "Activos botánicos calmantes — frescura inmediata",
    ],
    ingredientsFull:
      "Water, Centella Asiatica Extract, Butylene Glycol, Glycerin, 1,2-Hexanediol, Panthenol, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Hyaluronic Acid, Melaleuca Alternifolia (Tea Tree) Leaf Extract, Madecassoside, Asiaticoside, Allantoin, Dipotassium Glycyrrhizate, Ethylhexylglycerin, Carbomer, Tromethamine",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "skin1004 madagascar centella retinol 0.2 boosting shot ampoule": {
    editorNote:
      "Ampolla nocturna de SKIN1004 con retinol 0.2% combinado con retinal y espículas para potenciar la renovación celular. Reduce la apariencia de líneas finas y textura irregular; debe introducirse despacio, solo por la noche, y siempre acompañarse de SPF al día siguiente.",
    benefits: [
      "Retinol 0.2% + retinal para renovación celular progresiva",
      "Espículas favorecen la entrega de activos retinoides",
      "Centella ayuda a calmar en una fórmula potencialmente activa",
      "Mejora la textura y la apariencia de líneas finas con constancia",
      "Formato shot concentrado para potenciar la rutina nocturna",
    ],
    howToUse: [
      "Solo por la noche, tras limpiar y tonificar (piel seca).",
      "Empieza 1–2 veces por semana; aumenta según tolerancia.",
      "Aplica una capa fina evitando el contorno de ojos y labios.",
      "Sella con crema hidratante; no combines con ácidos fuertes al inicio.",
      "Al día siguiente, usa protector solar de amplio espectro.",
    ],
    ingredients: [
      "Retinol 0.2% — renovación y textura más lisa",
      "Retinal — forma activa de vitamina A de acción más rápida",
      "Espículas — potencian la penetración",
      "Centella Asiática — apoyo calmante",
      "Humectantes — confort durante la adaptación",
    ],
    ingredientsFull:
      "Water, Centella Asiatica Extract, Caprylic/Capric Triglyceride, Glycerin, Butylene Glycol, Niacinamide, 1,2-Hexanediol, Retinol, Retinal, Polysorbate 20, Sodium Hyaluronate, Panthenol, Tocopherol, Madecassoside, Asiaticoside, Ethylhexylglycerin, Carbomer, Tromethamine",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "k-secret seoul 1988 serum : retinal liposome 2% + black ginseng": {
    editorNote:
      "Sérum nocturno de K-SECRET con un 2% de retinal en liposomas, un 58% de ginseng negro y bakuchiol. Combina potencia retiniana encapsulada con un enfoque botánico anti-edad: renueva la textura, aporta luminosidad y firmeza. Uso exclusivo nocturno y SPF obligatorio al día siguiente.",
    benefits: [
      "Retinal liposoma 2% para renovación celular encapsulada",
      "58% de ginseng negro aporta vitalidad y luminosidad",
      "Bakuchiol apoya el efecto anti-edad con perfil más suave",
      "Textura sérum apta para potenciar la rutina de noche",
      "Mejora la apariencia de firmeza y tono con uso constante",
    ],
    howToUse: [
      "Solo por la noche, sobre piel limpia y seca.",
      "Aplica una capa fina evitando el contorno de ojos.",
      "Empieza 2–3 noches por semana si eres principiante en retinal.",
      "Sella con crema hidratante; evita ácidos fuertes la misma noche.",
      "Al día siguiente, aplica protector solar generoso.",
    ],
    ingredients: [
      "Retinal Liposome 2% — renovación encapsulada de vitamina A",
      "Black Ginseng 58% — vitalidad y luminosidad",
      "Bakuchiol — apoyo anti-edad botánico",
      "Liposomas — mejor entrega y tolerancia del retinal",
      "Humectantes — confort durante la adaptación",
    ],
    ingredientsFull:
      "Panax Ginseng Root Extract, Water, Glycerin, Butylene Glycol, Caprylic/Capric Triglyceride, 1,2-Hexanediol, Retinal, Hydrogenated Lecithin, Bakuchiol, Panthenol, Sodium Hyaluronate, Tocopherol, Adenosine, Ethylhexylglycerin, Carbomer, Tromethamine, Xanthan Gum",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "skin1004 madagascar centella hyalu-cica sleeping pack": {
    editorNote:
      "Mascarilla gel overnight Hyalu-Cica de SKIN1004 con melatonina, ácido hialurónico y ceramida. Se deja toda la noche para hidratar, calmar y recuperar la piel mientras duermes: textura fresca que no marca la almohada y deja el cutis más flexible al despertar.",
    benefits: [
      "Hidratación overnight con complejo Hyalu-Cica",
      "Melatonina apoya la recuperación nocturna de la piel",
      "HA y ceramida refuerzan la barrera mientras duermes",
      "Textura gel fresca que no deja sensación pesada",
      "Ideal como último paso de la rutina nocturna",
    ],
    howToUse: [
      "Por la noche, tras sérum y/o crema, aplica una capa generosa.",
      "Extiende de forma uniforme evitando el contorno de ojos si es sensible.",
      "No enjuagues: déjala actuar toda la noche.",
      "Por la mañana, limpia el rostro y continúa con tu rutina + SPF.",
    ],
    ingredients: [
      "Complejo Hyalu-Cica — hidratación y calma overnight",
      "Melatonina — apoyo a la recuperación nocturna",
      "Ácido hialurónico — flexibilidad al despertar",
      "Ceramida — refuerzo de barrera durante la noche",
      "Textura gel — confort sin oclusión pesada",
    ],
    ingredientsFull:
      "Centella Asiatica Leaf Water, Water, Butylene Glycol, Glycerin, 1,2-Hexanediol, Niacinamide, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Hyaluronic Acid, Melatonin, Ceramide NP, Panthenol, Adenosine, Allantoin, Carbomer, Arginine, Ethylhexylglycerin, Xanthan Gum",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "tocobo cica calming gel cream": {
    editorNote:
      "Gel-crema calmante de TOCOBO con cica y panthenol. Hidrata y alivia la piel sensible o irritada con una textura fresca de rápida absorción: cierra la rutina sin pesadez, ideal para climas cálidos, piel mixta o como capa ligera bajo protector solar.",
    benefits: [
      "Cica calma enrojecimiento e irritaciones leves",
      "Panthenol refuerza el confort y la hidratación",
      "Textura gel-crema fresca, sin acabado graso",
      "Apta para sellar sérums calmantes o hidratantes",
      "Uso diario mañana y noche según necesidad",
    ],
    howToUse: [
      "Como último paso de cuidado (antes del SPF de día).",
      "Aplica una cantidad del tamaño de un guisante sobre el rostro.",
      "Extiende con suavidad hasta absorber.",
      "Puedes reforzar en zonas más secas o irritadas.",
    ],
    ingredients: [
      "Centella Asiatica — calma e irritaciones",
      "Panthenol — hidratación y reparación suave",
      "Madecassoside / Asiaticoside — apoyo reparador cica",
      "Humectantes — confort fresco prolongado",
      "Textura gel — sellado ligero sin oclusión",
    ],
  },

  "mixsoon bean cream": {
    editorNote:
      "Crema hidratante de mixsoon con soja fermentada pensada para reparar la barrera cutánea. Nutre sin sensación pesada, mejora la flexibilidad y deja la piel más resistente frente a la sequedad: un cierre de rutina confiable para pieles deshidratadas o sensibilizadas.",
    benefits: [
      "Soja fermentada apoya la reparación de la barrera",
      "Hidratación nutritiva sin acabado excesivamente graso",
      "Mejora la flexibilidad y reduce la sensación de tirantez",
      "Ideal como crema de cierre mañana y/o noche",
      "Complementa rutinas con activos potentes (ácidos, retinoides)",
    ],
    howToUse: [
      "Tras el sérum, toma una cantidad del tamaño de un guisante.",
      "Calienta entre los dedos y aplica sobre rostro y cuello.",
      "Masajea hasta absorber; refuerza zonas más secas.",
      "De día, continúa con protector solar.",
    ],
    ingredients: [
      "Soja fermentada — reparación y nutrición de barrera",
      "Humectantes — retención de humedad",
      "Emolientes — suavidad y flexibilidad",
      "Activos fermentados — confort cutáneo",
      "Base cremosa — sellado hidratante diario",
    ],
  },

  "centellian 24 360° shot pdrn lifting eye cream": {
    editorNote:
      "Crema de ojos Centellian24 con PDRN pensada para el contorno: hidrata, aporta sensación de lifting y mejora la apariencia de fatiga. La fórmula shot se masajea en la zona orbital para un acabado más firme, suave y descansado sin migrar al ojo.",
    benefits: [
      "PDRN apoya la regeneración y el aspecto más firme del contorno",
      "Hidrata la zona delicada del ojo propensa a sequedad",
      "Mejora la apariencia de fatiga y líneas de deshidratación",
      "Textura crema apta para masaje 360° en la órbita",
      "Uso diario mañana y noche como cuidado específico de ojos",
    ],
    howToUse: [
      "Tras el sérum, toma una cantidad mínima (grano de arroz por ojo).",
      "Aplica en el contorno inferior y externo del ojo.",
      "Masajea con el anular en movimientos suaves 360° hasta absorber.",
      "Evita el contacto directo con el globo ocular.",
      "De día, continúa con SPF en el rostro (no en el párpado móvil si irrita).",
    ],
    ingredients: [
      "PDRN — regeneración y efecto lifting del contorno",
      "Activos hidratantes — confort en piel fina",
      "Péptidos / soporte firming — apariencia más tersa",
      "Humectantes — menos líneas de deshidratación",
      "Base cremosa — cuidado específico de ojos",
    ],
  },

  "skin1004 madagascar centella hyalu-cica water-fit sun serum": {
    editorNote:
      "Protector solar tipo sérum acuoso Hyalu-Cica de SKIN1004, estilo SPF50+: hidrata, calma y protege en el último paso de la mañana. Textura water-fit de rápida absorción, ideal bajo maquillaje o solo, sin sensación grasa ni película pesada.",
    benefits: [
      "Protección solar diaria con textura sérum acuosa",
      "Complejo Hyalu-Cica hidrata y calma mientras protege",
      "Acabado water-fit ligero, apto bajo maquillaje",
      "Sensación fresca sin residuo blanco marcado",
      "Último paso ideal de la rutina AM",
    ],
    howToUse: [
      "Como último paso de la mañana, tras crema o sérum.",
      "Aplica una cantidad generosa (aprox. dos dedos) en rostro y cuello.",
      "Extiende de forma uniforme y espera a que asiente.",
      "Reaplica cada 2–3 horas si hay sol directo, sudor o exposición prolongada.",
    ],
    ingredients: [
      "Filtros UV de amplio espectro — protección diaria",
      "Complejo Hyalu-Cica — hidratación y calma bajo el SPF",
      "Ácido hialurónico — confort acuoso",
      "Centella — suaviza piel sensible al sol",
      "Textura sérum — absorción rápida sin pesadez",
    ],
    ingredientsFull:
      "Water, Centella Asiatica Leaf Water, Propanediol, Dibutyl Adipate, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Ethylhexyl Triazone, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Niacinamide, 1,2-Hexanediol, Caprylyl Methicone, Glycerin, Butylene Glycol, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Hyaluronic Acid, Panthenol, Tromethamine, Carbomer, Ethylhexylglycerin",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "celimax pore + dark spot brightening care sunscreen": {
    editorNote:
      "Protector solar de Celimax orientado a poros y manchas: protege del sol mientras aporta un enfoque brightening para tono irregular. Textura de cuidado diario que ayuda a prevenir nuevas manchas y mantiene un acabado más limpio y luminoso bajo la exposición UV.",
    benefits: [
      "Protección UV diaria con enfoque pore + dark spot",
      "Ayuda a prevenir el oscurecimiento de manchas por el sol",
      "Acabado cuidado que favorece un tono más uniforme",
      "Textura cómoda para uso cotidiano bajo maquillaje",
      "Complementa rutinas con niacinamida o TXA",
    ],
    howToUse: [
      "Como último paso de la rutina de mañana.",
      "Aplica generosamente en rostro, orejas y cuello.",
      "Espera a que se asiente antes del maquillaje.",
      "Reaplica tras sudar, secarte la cara o exposición prolongada.",
    ],
    ingredients: [
      "Filtros UV — protección de amplio espectro",
      "Activos brightening — apoyo a manchas y tono irregular",
      "Cuidado de poros — acabado más limpio y mate-ligero",
      "Humectantes — confort sin tirantez",
      "Base sunscreen — uso diario preventivo",
    ],
  },

  "beauty of joseon relief sun : rice + probiotics": {
    editorNote:
      "El Relief Sun de Beauty of Joseon combina arroz y probióticos en un SPF50+ PA++++ legendario por su cero cast blanco y su acabado de skin tint sutil. Protege, hidrata y deja la piel luminosa: el sunscreen de uso diario que se siente como skincare, no como filtro pesado.",
    benefits: [
      "SPF50+ PA++++ de amplio espectro para uso diario",
      "Extracto de arroz aporta luminosidad y suavidad",
      "Probióticos apoyan el equilibrio de la barrera",
      "Sin white cast; acabado natural tipo segunda piel",
      "Textura crema hidratante ideal bajo maquillaje",
    ],
    howToUse: [
      "Último paso de la rutina AM, tras hidratante.",
      "Aplica dos dedos de producto en rostro y cuello.",
      "Extiende bien hasta un acabado uniforme.",
      "Reaplica cada 2–3 horas en exterior o tras sudar.",
    ],
    ingredients: [
      "Filtros químicos de amplio espectro — SPF50+ PA++++",
      "Oryza Sativa (Rice) Extract — luminosidad y suavidad",
      "Probióticos / fermentos — equilibrio de barrera",
      "Niacinamida — apoyo brightening suave",
      "Humectantes — sensación skincare, no película pesada",
    ],
  },

  "tocobo bio watery sun cream": {
    editorNote:
      "Protector solar acuoso de TOCOBO pensado para hidratar mientras protege. Textura watery de rápida absorción, ideal para pieles que odian el efecto graso del SPF: aporta confort, frescura y protección diaria sin sensación pegajosa.",
    benefits: [
      "Textura watery hidratante, sin acabado oleoso",
      "Protección solar cómoda para el día a día",
      "Absorción rápida apta bajo maquillaje ligero",
      "Sensación fresca ideal en climas cálidos",
      "Cierra la rutina AM sin pesar sobre la piel",
    ],
    howToUse: [
      "Como último paso de la mañana.",
      "Aplica una cantidad generosa en rostro y cuello.",
      "Da golpecitos hasta absorber por completo.",
      "Reaplica según exposición solar y actividad.",
    ],
    ingredients: [
      "Filtros UV — protección diaria de amplio espectro",
      "Base acuosa — hidratación y frescura",
      "Humectantes — confort sin pegajosidad",
      "Activos calmantes — suavidad bajo el SPF",
      "Textura watery — acabado ligero",
    ],
  },

  "tirtir mask fit red cushion 27c cool beige": {
    editorNote:
      "Cushion foundation TIRTIR en el tono 27C Cool Beige: cobertura modulable con acabado mask-fit que se adhiere a la piel y resiste bien el día. El formato cushion permite construir de ligero a medio con la puff, ideal para un look natural o más cubierto según capas.",
    benefits: [
      "Tono 27C Cool Beige para subtonos fríos/medios",
      "Cobertura modulable de ligera a media",
      "Acabado mask-fit de larga duración",
      "Formato cushion práctico para retoques",
      "Acabado natural que no enmascara la piel por completo",
    ],
    howToUse: [
      "Agita el cushion suavemente antes de abrir.",
      "Presiona la puff sobre el producto (no frotes el pan).",
      "Aplica a toques desde el centro del rostro hacia afuera.",
      "Construye cobertura en capas finas donde lo necesites.",
      "Sella con polvo si deseas más duración.",
    ],
    ingredients: [
      "Pigmentos — cobertura uniforme en tono 27C",
      "Base cushion — acabado mask-fit adherente",
      "Emolientes — confort bajo el maquillaje",
      "Filtros / protectores de fórmula — estabilidad del color",
      "Agentes filmógenos — mayor duración",
    ],
  },

  "skin1004 madagascar centella hyalu-cica silky-fit sun stick": {
    editorNote:
      "Protector solar en stick SPF50+ PA++++ de la línea Hyalu-Cica. Se desliza con acabado sedoso mate, controla el brillo con sílice y aporta confort con Centella y ácido hialurónico. Ideal para reaplicación rápida sobre piel o maquillaje, sin white cast.",
    benefits: [
      "Protege del sol con SPF50+ (rayos UVA y UVB)",
      "No deja mancha blanca ni sensación grasosa",
      "Acabado mate que ayuda a controlar el brillo",
      "Hidrata y calma con Centella y ácido hialurónico",
      "Fácil de reaplicar durante el día, incluso con maquillaje",
      "Sin perfume, cómodo para piel sensible",
    ],
    howToUse: [
      "Desliza el stick en rostro y cuello",
      "Reaplica cada 2 a 3 horas al sol",
      "No presiones con fuerza para no romper el stick",
      "Puedes retocarlo sobre maquillaje con pasadas suaves",
    ],
    ingredients: [
      "Filtros químicos de amplio espectro — protección UVA/UVB SPF50+ PA++++",
      "Silica — control de sebo y acabado mate sedoso",
      "Centella Asiatica Extract — calma la piel bajo el sol",
      "Sodium Hyaluronate / Hyaluronic Acid — hidratación superficial",
      "Bisabolol y extractos botánicos — confort antioxidante",
    ],
    ingredientsFull:
      "Methyl Methacrylate Crosspolymer, Synthetic Wax, Coco-Caprylate/Caprate, Cetyl Ethylhexanoate, Butylene Glycol Dicaprylate/Dicaprate, Dibutyl Adipate, Butyloctyl Salicylate, Vinyl Dimethicone/Methicone Silsesquioxane Crosspolymer, Silica, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Dicaprylyl Carbonate, Isopropyl Palmitate, Ethylhexyl Triazone, Tocopheryl Acetate, Diethylhexyl 2,6-Naphthalate, Vinyl Dimethicone, Polysilicone-15, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Ozokerite, Melia Azadirachta Leaf Extract, Melia Azadirachta Flower Extract, Coccinia Indica Fruit Extract, Solanum Melongena (Eggplant) Fruit Extract, Aloe Barbadensis Flower Extract, Curcuma Longa (Turmeric) Root Extract, Corallina Officinalis Extract, Ocimum Sanctum Leaf Extract, Centella Asiatica Extract(0.98ppm), Agave Tequilana Leaf Extract, Diospyros Kaki Leaf Extract, Camellia Sinensis Leaf Extract, Castanea Crenata (Chestnut) Shell Extract, Carthamus Tinctorius (Safflower) Flower Extract, Zanthoxylum Piperitum Fruit Extract, Coffea Arabica (Coffee) Seed Extract, Vitis Vinifera (Grape) Fruit Extract, Polygonum Cuspidatum Root Extract, Simmondsia Chinensis (Jojoba) Seed Oil, Sodium Hyaluronate(1ppm), Bisabolol, Glyceryl Caprylate, Caprylyl Glycol, Polyglyceryl-4 Diisostearate/Polyhydroxystearate/Sebacate, Ethylhexylglycerin, Water, Hydrolyzed Hyaluronic Acid (1 ppm), Butylene Glycol, 1,2-Hexanediol, Glycerin, Hyaluronic Acid (0.01 ppm)",
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

  "centella air-fit suncream plus skin1004": {
    editorNote:
      "Protector solar Air-Fit de SKIN1004 con un 35.8% de extracto de Centella Asiática, óxido de zinc y dióxido de titanio. Textura ligera air-fit que calma, protege e hidrata sin sensación grasa ni residuo blanco marcado: el SPF diario para pieles sensibles que buscan comodidad bajo maquillaje.",
    benefits: [
      "35.8% de Centella Asiática para calmar piel sensible al sol",
      "Filtros minerales (ZnO / TiO2) de protección diaria",
      "Textura air-fit de rápida absorción, ideal bajo maquillaje",
      "Minimiza la sensación grasa y el white cast",
      "Niacinamida aporta luminosidad suave en la fórmula",
    ],
    howToUse: [
      "Tras tónico, sérum y crema, aplica una cantidad generosa como último paso AM.",
      "Extiende de forma uniforme sobre rostro y cuello, evitando el contacto directo con los ojos.",
      "Reaplica cada 2–3 horas si permanece bajo el sol, suda o se expone al agua.",
      "Para un acabado más fresco, da golpecitos suaves hasta completar la absorción.",
    ],
    ingredients: [
      "Centella Asiatica Extract 35.8% — calma e hidrata bajo el SPF",
      "Zinc Oxide — filtro mineral de amplio espectro",
      "Titanium Oxide — refuerzo de protección UV",
      "Niacinamida — luminosidad y confort de barrera",
      "Madecassoside — apoyo reparador de la línea Centella",
    ],
    ingredientsFull: AIR_FIT_INGREDIENTS,
    ingredientsDisclaimer: INGREDIENTS_DISCLAIMER,
  },

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
  // ONLY match Air-Fit specifically — do NOT match other sun products
  if (key.includes("air-fit") || key.includes("air fit")) {
    return PRODUCT_DETAILS["centella air-fit suncream plus skin1004"];
  }
  return fallbackContent(product);
}

export function formatPenPrice(price: number) {
  return `S/ ${price.toFixed(2)}`;
}
