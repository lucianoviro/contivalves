import type { L } from '../i18n/config';

export type FamilyKey =
  | 'ball-valves' | 'gate-valves' | 'globe-valves' | 'check-valves' | 'y-strainers' | 'plug-valves'
  | 'safety-valves' | 'fire-valves' | 'pressure-reducing-valves' | 'stopcocks' | 'level-indicators';

export interface Family {
  key: FamilyKey;
  slug: L;
  name: L;
  /** Singular noun, used in product titles and schema.org category. */
  singular: L;
  /** Short, fact-dense intro (also used as meta description). */
  intro: L;
  /** Image on the old site (wp-content/uploads/…) – see scripts/fetch-media.mjs */
  image: string;
}

export const families: Family[] = [
  {
    key: 'ball-valves',
    slug: { en: 'ball-valves', it: 'valvole-a-sfera', fr: 'robinets-a-tournant-spherique', es: 'valvulas-de-bola', de: 'kugelhaehne' },
    name: { en: 'Ball valves', it: 'Valvole a sfera', fr: 'Robinets à tournant sphérique', es: 'Válvulas de bola', de: 'Kugelhähne' },
    singular: { en: 'Ball valve', it: 'Valvola a sfera', fr: 'Robinet à tournant sphérique', es: 'Válvula de bola', de: 'Kugelhahn' },
    intro: {
      en: 'Quarter-turn ball valves in brass, DZR brass, bronze and cast iron, from PN10 to PN64. Full and reduced bore, threaded, flanged, copper compression and press-fit ends, with blow-out proof stem and adjustable packing. Trim options in AISI 316, Monel 400 and aluminium bronze.',
      it: 'Valvole a sfera a un quarto di giro in ottone, ottone DZR, bronzo e ghisa, da PN10 a PN64. Passaggio totale o ridotto, estremità filettate, flangiate, a compressione e a pressare, asta antiespulsione e premistoppa regolabile. Versioni con sfera e asta in AISI 316, Monel 400 e bronzo-alluminio.',
      fr: 'Robinets à tournant sphérique quart de tour en laiton, laiton DZR, bronze et fonte, de PN10 à PN64. Passage intégral ou réduit, extrémités taraudées, à brides, à compression ou à sertir, tige anti-éjection et presse-étoupe réglable. Versions avec sphère et tige en AISI 316, Monel 400 et bronze-aluminium.',
      es: 'Válvulas de bola de un cuarto de vuelta en latón, latón DZR, bronce y fundición, de PN10 a PN64. Paso total o reducido, extremos roscados, bridados, de compresión o para prensar, vástago antiexpulsión y empaquetadura ajustable. Versiones con bola y vástago en AISI 316, Monel 400 y bronce-aluminio.',
      de: 'Kugelhähne mit Vierteldrehung aus Messing, entzinkungsbeständigem Messing (DZR), Bronze und Grauguss, von PN10 bis PN64. Voller oder reduzierter Durchgang, Gewinde-, Flansch-, Klemmring- und Pressanschlüsse, ausblassichere Spindel und nachstellbare Stopfbuchse. Ausführungen mit Kugel und Spindel aus AISI 316, Monel 400 und Aluminiumbronze.',
    },
    image: '2018/12/valvole-sfera-conti-rubinetterie.jpg',
  },
  {
    key: 'gate-valves',
    slug: { en: 'gate-valves', it: 'saracinesche', fr: 'robinets-vannes', es: 'valvulas-de-compuerta', de: 'absperrschieber' },
    name: { en: 'Gate valves', it: 'Saracinesche', fr: 'Robinets-vannes', es: 'Válvulas de compuerta', de: 'Absperrschieber' },
    singular: { en: 'Gate valve', it: 'Saracinesca', fr: 'Robinet-vanne', es: 'Válvula de compuerta', de: 'Absperrschieber' },
    intro: {
      en: 'Bronze and brass gate valves from PN10 to PN64 with screwed, union or bolted bonnet, rising or non-rising stem and solid or flexible wedge. Threaded, flanged, copper compression and solder ends; all-bronze, aluminium-bronze and AS 1628 versions available.',
      it: 'Saracinesche in bronzo e ottone da PN10 a PN64 con coperchio avvitato, a bocchettone o imbullonato, asta saliente o fissa e cuneo pieno o flessibile. Estremità filettate, flangiate, a compressione e a saldare; disponibili versioni tutto bronzo, in bronzo-alluminio e secondo AS 1628.',
      fr: 'Robinets-vannes en bronze et en laiton de PN10 à PN64, chapeau vissé, à écrou-raccord ou boulonné, tige montante ou non montante, opercule plein ou flexible. Extrémités taraudées, à brides, à compression ou à braser ; versions tout bronze, bronze-aluminium et AS 1628 disponibles.',
      es: 'Válvulas de compuerta de bronce y latón de PN10 a PN64 con bonete roscado, con tuerca de unión o atornillado, vástago ascendente o no ascendente y cuña maciza o flexible. Extremos roscados, bridados, de compresión o para soldar; versiones todo bronce, bronce-aluminio y AS 1628.',
      de: 'Absperrschieber aus Bronze und Messing von PN10 bis PN64 mit eingeschraubtem, Überwurf- oder verschraubtem Oberteil, steigender oder nicht steigender Spindel und Voll- oder elastischem Keil. Gewinde-, Flansch-, Klemmring- und Lötanschlüsse; auch ganz aus Bronze, aus Aluminiumbronze und nach AS 1628.',
    },
    image: '2018/12/valvole-saracinesca-conti-rubinetterie.jpg',
  },
  {
    key: 'globe-valves',
    slug: { en: 'globe-valves', it: 'valvole-a-globo', fr: 'robinets-a-soupape', es: 'valvulas-de-globo', de: 'absperrventile' },
    name: { en: 'Globe valves', it: 'Valvole a globo', fr: 'Robinets à soupape', es: 'Válvulas de globo', de: 'Absperrventile' },
    singular: { en: 'Globe valve', it: 'Valvola a globo', fr: 'Robinet à soupape', es: 'Válvula de globo', de: 'Absperrventil' },
    intro: {
      en: 'Bronze globe valves for shut-off and throttling, from PN16 to PN64: straight, angle and Y-pattern bodies, screwed, union or bolted bonnet (OS&Y), metal, PTFE or NBR discs. Renewable seats and trims in AISI 316 or Monel 400; threaded and flanged ends.',
      it: 'Valvole a globo in bronzo per intercettazione e regolazione, da PN16 a PN64: corpo diritto, ad angolo o inclinato, coperchio avvitato, a bocchettone o imbullonato con vite esterna, otturatore metallico, in PTFE o NBR. Sede ricambiabile e interni in AISI 316 o Monel 400; estremità filettate e flangiate.',
      fr: 'Robinets à soupape en bronze pour le sectionnement et le réglage, de PN16 à PN64 : corps droit, d’équerre ou incliné, chapeau vissé, à écrou-raccord ou boulonné (vis extérieure et étrier), clapet métallique, PTFE ou NBR. Sièges remplaçables et garnitures en AISI 316 ou Monel 400 ; extrémités taraudées et à brides.',
      es: 'Válvulas de globo de bronce para cierre y regulación, de PN16 a PN64: cuerpo recto, en ángulo o en Y, bonete roscado, con tuerca de unión o atornillado (husillo exterior y yugo), obturador metálico, de PTFE o NBR. Asientos recambiables e internos en AISI 316 o Monel 400; extremos roscados y bridados.',
      de: 'Absperrventile aus Bronze zum Absperren und Regeln, von PN16 bis PN64: Durchgangs-, Eck- und Schrägsitzform, eingeschraubtes, Überwurf- oder verschraubtes Oberteil (außenliegende Spindel mit Joch), Metall-, PTFE- oder NBR-Kegel. Austauschbare Sitze und Innenteile aus AISI 316 oder Monel 400; Gewinde- und Flanschanschluss.',
    },
    image: '2018/12/valvole-globo-conti-rubinetterie.jpg',
  },
  {
    key: 'check-valves',
    slug: { en: 'check-valves', it: 'valvole-di-ritegno', fr: 'clapets-anti-retour', es: 'valvulas-de-retencion', de: 'rueckschlagventile' },
    name: { en: 'Check valves', it: 'Valvole di ritegno', fr: 'Clapets anti-retour', es: 'Válvulas de retención', de: 'Rückschlagventile' },
    singular: { en: 'Check valve', it: 'Valvola di ritegno', fr: 'Clapet anti-retour', es: 'Válvula de retención', de: 'Rückschlagventil' },
    intro: {
      en: 'Non-return valves in bronze and brass from PN10 to PN40: swing, horizontal piston, angle piston and vertical lift check valves, plus foot valves with brass or stainless steel strainer. Threaded and flanged ends; metal, PTFE or NBR discs, stainless steel springs.',
      it: 'Valvole di non ritorno in bronzo e ottone da PN10 a PN40: a battente, a pistone orizzontali e ad angolo, a sollevamento verticale, oltre alle valvole di fondo con filtro in ottone o acciaio inox. Estremità filettate e flangiate; otturatori metallici, in PTFE o NBR, molle in acciaio inox.',
      fr: 'Clapets de non-retour en bronze et en laiton de PN10 à PN40 : à battant, à piston droits et d’équerre, à levée verticale, ainsi que des clapets de pied avec crépine en laiton ou en inox. Extrémités taraudées et à brides ; clapets métalliques, PTFE ou NBR, ressorts en acier inoxydable.',
      es: 'Válvulas antirretorno de bronce y latón de PN10 a PN40: de clapeta, de pistón horizontales y en ángulo, de elevación vertical y válvulas de pie con filtro de latón o de acero inoxidable. Extremos roscados y bridados; obturadores metálicos, de PTFE o NBR, muelles de acero inoxidable.',
      de: 'Rückflussverhinderer aus Bronze und Messing von PN10 bis PN40: Rückschlagklappen, Kolben-Rückschlagventile in Durchgangs- und Eckform, Rückschlagventile mit Vertikalhub sowie Fußventile mit Sieb aus Messing oder Edelstahl. Gewinde- und Flanschanschluss; Metall-, PTFE- oder NBR-Dichtung, Federn aus Edelstahl.',
    },
    image: '2018/12/valvole-ritegno-conti-rubinetterie.jpg',
  },
  {
    key: 'y-strainers',
    slug: { en: 'y-strainers', it: 'filtri-a-y', fr: 'filtres-en-y', es: 'filtros-en-y', de: 'schmutzfaenger' },
    name: { en: 'Y strainers', it: 'Filtri a Y', fr: 'Filtres en Y', es: 'Filtros en Y', de: 'Schmutzfänger' },
    singular: { en: 'Y strainer', it: 'Filtro a Y', fr: 'Filtre en Y', es: 'Filtro en Y', de: 'Schmutzfänger' },
    intro: {
      en: 'Brass and bronze Y strainers from PN16 to PN32 that protect pumps, valves and instruments from debris. Threaded and flanged ends, stainless steel screens with declared mesh and open area, optional drain plug.',
      it: 'Filtri a Y in ottone e bronzo da PN16 a PN32 per proteggere pompe, valvole e strumenti dalle impurità. Estremità filettate e flangiate, cestello in acciaio inox con maglia e superficie filtrante dichiarate, tappo di scarico a richiesta.',
      fr: 'Filtres en Y en laiton et en bronze de PN16 à PN32 qui protègent pompes, robinets et instruments contre les impuretés. Extrémités taraudées et à brides, tamis en acier inoxydable à maille et surface filtrante déclarées, bouchon de purge en option.',
      es: 'Filtros en Y de latón y bronce de PN16 a PN32 que protegen bombas, válvulas e instrumentos de las impurezas. Extremos roscados y bridados, tamiz de acero inoxidable con malla y superficie filtrante declaradas, tapón de purga opcional.',
      de: 'Schmutzfänger in Y-Form aus Messing und Bronze von PN16 bis PN32 zum Schutz von Pumpen, Armaturen und Messgeräten. Gewinde- und Flanschanschluss, Siebeinsatz aus Edelstahl mit angegebener Maschenweite und offener Fläche, Entleerungsstopfen optional.',
    },
    image: '2018/12/valvole-filtro-conti-rubinetterie.jpg',
  },
  {
    key: 'plug-valves',
    slug: { en: 'plug-valves', it: 'rubinetti-a-maschio', fr: 'robinets-a-boisseau', es: 'valvulas-de-macho', de: 'kuekenhaehne' },
    name: { en: 'Plug valves', it: 'Rubinetti a maschio', fr: 'Robinets à boisseau', es: 'Válvulas de macho', de: 'Kükenhähne' },
    singular: { en: 'Plug valve', it: 'Rubinetto a maschio', fr: 'Robinet à boisseau', es: 'Válvula de macho', de: 'Kükenhahn' },
    intro: {
      en: 'Bronze plug valves PN16 in 2-way, 3-way (T or L port) and 4-way configurations, with threaded or flanged ends. A simple, robust design for diverting and shutting off water, air and gas lines.',
      it: 'Rubinetti a maschio in bronzo PN16 a 2 vie, 3 vie (tipo T o L) e 4 vie, con estremità filettate o flangiate. Una costruzione semplice e robusta per deviare e intercettare linee di acqua, aria e gas.',
      fr: 'Robinets à boisseau en bronze PN16 à 2 voies, 3 voies (en T ou en L) et 4 voies, extrémités taraudées ou à brides. Une construction simple et robuste pour dériver et sectionner les circuits d’eau, d’air et de gaz.',
      es: 'Válvulas de macho de bronce PN16 de 2 vías, 3 vías (en T o en L) y 4 vías, con extremos roscados o bridados. Un diseño sencillo y robusto para desviar y cerrar líneas de agua, aire y gas.',
      de: 'Kükenhähne aus Bronze PN16 als 2-Wege-, 3-Wege- (T- oder L-Bohrung) und 4-Wege-Ausführung mit Gewinde- oder Flanschanschluss. Eine einfache, robuste Bauart zum Umschalten und Absperren von Wasser-, Luft- und Gasleitungen.',
    },
    image: '2018/12/rubinetto-maschio-conti-rubinetterie.jpg',
  },
  {
    key: 'safety-valves',
    slug: { en: 'safety-valves', it: 'valvole-di-sicurezza', fr: 'soupapes-de-surete', es: 'valvulas-de-seguridad', de: 'sicherheitsventile' },
    name: { en: 'Safety valves', it: 'Valvole di sicurezza', fr: 'Soupapes de sûreté', es: 'Válvulas de seguridad', de: 'Sicherheitsventile' },
    singular: { en: 'Safety valve', it: 'Valvola di sicurezza', fr: 'Soupape de sûreté', es: 'Válvula de seguridad', de: 'Sicherheitsventil' },
    intro: {
      en: 'Brass and bronze safety relief valves PN16 with spring or lever-and-weight loading, top or side outlet, threaded and flanged ends, for protecting vessels and piping against overpressure.',
      it: 'Valvole di sicurezza in ottone e bronzo PN16 a molla o a leva e contrappeso, con scarico in testa o laterale ed estremità filettate o flangiate, per proteggere recipienti e tubazioni dalle sovrapressioni.',
      fr: 'Soupapes de sûreté en laiton et en bronze PN16 à ressort ou à levier et contrepoids, échappement en tête ou latéral, extrémités taraudées ou à brides, pour protéger réservoirs et tuyauteries contre les surpressions.',
      es: 'Válvulas de seguridad de latón y bronce PN16 de resorte o de palanca y contrapeso, con descarga superior o lateral y extremos roscados o bridados, para proteger depósitos y tuberías contra sobrepresiones.',
      de: 'Sicherheitsventile aus Messing und Bronze PN16 mit Feder- oder Hebel-Gewichtsbelastung, Abblasung oben oder seitlich, Gewinde- oder Flanschanschluss, zum Schutz von Behältern und Rohrleitungen vor Überdruck.',
    },
    image: '2018/12/valvole-sicurezza-conti-rubinetterie.jpg',
  },
  {
    key: 'fire-valves',
    slug: { en: 'fire-valves', it: 'idranti', fr: 'robinets-incendie', es: 'valvulas-contra-incendios', de: 'hydrantenventile' },
    name: { en: 'Fire valves', it: 'Idranti', fr: 'Robinets d’incendie', es: 'Válvulas contra incendios', de: 'Hydrantenventile' },
    singular: { en: 'Fire valve', it: 'Idrante', fr: 'Robinet d’incendie', es: 'Válvula contra incendios', de: 'Hydrantenventil' },
    intro: {
      en: 'Bronze fire hydrant valves PN16 with UNI outlet connection, female or male threaded or flanged inlet, in angle and straight patterns for fire-fighting networks on land and on board ships.',
      it: 'Idranti in bronzo PN16 con attacco di uscita UNI, ingresso filettato femmina o maschio oppure flangiato, nelle versioni ad angolo e orizzontale, per reti antincendio civili, industriali e navali.',
      fr: 'Robinets d’incendie en bronze PN16 avec raccord de sortie UNI, entrée taraudée, filetée ou à bride, en versions d’équerre et droite, pour les réseaux de lutte contre l’incendie à terre et à bord des navires.',
      es: 'Válvulas de hidrante de bronce PN16 con conexión de salida UNI, entrada roscada hembra o macho o bridada, en versión en ángulo y recta, para redes contra incendios en tierra y a bordo.',
      de: 'Hydrantenventile aus Bronze PN16 mit UNI-Abgangsanschluss, Eingang mit Innen- oder Außengewinde oder Flansch, in Eck- und Durchgangsform, für Löschwassernetze an Land und an Bord.',
    },
    image: '2018/12/idranti-conti-rubinetterie.jpg',
  },
  {
    key: 'pressure-reducing-valves',
    slug: { en: 'pressure-reducing-valves', it: 'riduttori-di-pressione', fr: 'reducteurs-de-pression', es: 'reductores-de-presion', de: 'druckminderer' },
    name: { en: 'Pressure reducing valves', it: 'Riduttori di pressione', fr: 'Réducteurs de pression', es: 'Reductores de presión', de: 'Druckminderer' },
    singular: { en: 'Pressure reducing valve', it: 'Riduttore di pressione', fr: 'Réducteur de pression', es: 'Reductor de presión', de: 'Druckminderer' },
    intro: {
      en: 'Brass water pressure reducing valves PN10 and PN20 that keep downstream pressure stable in domestic and irrigation networks. Male, female and union threaded ends; PN20 models with built-in stainless steel strainer.',
      it: 'Riduttori di pressione per acqua in ottone PN10 e PN20 che mantengono stabile la pressione a valle in impianti civili e di irrigazione. Estremità filettate maschio, femmina o a bocchettone; modelli PN20 con filtro inox incorporato.',
      fr: 'Réducteurs de pression d’eau en laiton PN10 et PN20 qui stabilisent la pression aval dans les réseaux domestiques et d’irrigation. Extrémités filetées mâles, taraudées ou à raccord union ; modèles PN20 avec filtre inox intégré.',
      es: 'Reductores de presión de agua de latón PN10 y PN20 que mantienen estable la presión aguas abajo en redes domésticas y de riego. Extremos roscados macho, hembra o con racor; modelos PN20 con filtro de acero inoxidable integrado.',
      de: 'Druckminderer aus Messing PN10 und PN20 für Wasser, die den Hinterdruck in Haus- und Bewässerungsnetzen stabil halten. Außen-, Innengewinde oder Verschraubung; PN20-Modelle mit integriertem Edelstahlsieb.',
    },
    image: '2018/12/riduttori-pressione-conti-rubinetterie.jpg',
  },
  {
    key: 'stopcocks',
    slug: { en: 'stopcocks', it: 'rubinetti-di-arresto', fr: 'robinets-d-arret', es: 'llaves-de-paso', de: 'absperrhaehne' },
    name: { en: 'Stopcocks', it: 'Rubinetti di arresto', fr: 'Robinets d’arrêt', es: 'Llaves de paso', de: 'Absperrhähne' },
    singular: { en: 'Stopcock', it: 'Rubinetto di arresto', fr: 'Robinet d’arrêt', es: 'Llave de paso', de: 'Absperrhahn' },
    intro: {
      en: 'Bronze stopcocks PN16 and PN20 for water service lines: threaded, copper compression and push-fit connections, underground stopcocks, and tapping ferrules with banjo fittings.',
      it: 'Rubinetti di arresto in bronzo PN16 e PN20 per allacciamenti idrici: attacchi filettati, a compressione per tubo rame e push-fit, rubinetti interrati, prese a staffa (ferrule) con raccordo banjo.',
      fr: 'Robinets d’arrêt en bronze PN16 et PN20 pour les branchements d’eau : raccords taraudés, à compression pour tube cuivre et instantanés (push-fit), robinets enterrés, prises en charge (ferrule) avec raccord banjo.',
      es: 'Llaves de paso de bronce PN16 y PN20 para acometidas de agua: conexiones roscadas, de compresión para tubo de cobre y push-fit, llaves enterradas y tomas en carga (ferrule) con racor banjo.',
      de: 'Absperrhähne aus Bronze PN16 und PN20 für Wasser-Hausanschlüsse: Gewinde-, Klemmring- (Kupferrohr) und Steckanschlüsse, Erdeinbau-Absperrhähne sowie Anbohrschellen (Ferrule) mit Banjo-Anschluss.',
    },
    image: '2018/12/stopcocks.jpg',
  },
  {
    key: 'level-indicators',
    slug: { en: 'level-indicators', it: 'indicatori-di-livello', fr: 'indicateurs-de-niveau', es: 'indicadores-de-nivel', de: 'fuellstandsanzeiger' },
    name: { en: 'Level indicators', it: 'Indicatori di livello', fr: 'Indicateurs de niveau', es: 'Indicadores de nivel', de: 'Füllstandsanzeiger' },
    singular: { en: 'Level indicator', it: 'Indicatore di livello', fr: 'Indicateur de niveau', es: 'Indicador de nivel', de: 'Füllstandsanzeiger' },
    intro: {
      en: 'Brass level indicator cocks PN16 with drain and male threaded ends, for reading the liquid level of tanks and boilers.',
      it: 'Indicatori di livello in ottone PN16 con scarico ed estremità filettate maschio, per la lettura del livello del liquido in serbatoi e caldaie.',
      fr: 'Indicateurs de niveau en laiton PN16 avec purge et extrémités filetées mâles, pour la lecture du niveau de liquide dans les réservoirs et les chaudières.',
      es: 'Indicadores de nivel de latón PN16 con purga y extremos roscados macho, para leer el nivel de líquido en depósitos y calderas.',
      de: 'Füllstandsanzeiger aus Messing PN16 mit Entleerung und Außengewinde, zum Ablesen des Flüssigkeitsstands in Behältern und Kesseln.',
    },
    image: '2018/12/indicatori-livello-conti-rubinetterie.jpg',
  },
];

/** Sub-category names (keys come from the old taxonomy, see catalog.json). */
export const subcategoryNames: Record<string, L> = {
  'threaded-ball-valves': { en: 'Threaded ball valves', it: 'Valvole a sfera filettate', fr: 'Robinets à tournant sphérique taraudés', es: 'Válvulas de bola roscadas', de: 'Kugelhähne mit Gewinde' },
  'threaded-mini-ball-valves': { en: 'Threaded mini ball valves', it: 'Mini valvole a sfera filettate', fr: 'Mini-robinets à tournant sphérique', es: 'Mini válvulas de bola roscadas', de: 'Mini-Kugelhähne mit Gewinde' },
  'copper-compression-end-ball-valves': { en: 'Compression and press-fit ball valves', it: 'Valvole a sfera a compressione e a pressare', fr: 'Robinets à compression et à sertir', es: 'Válvulas de bola de compresión y para prensar', de: 'Kugelhähne mit Klemmring- und Pressanschluss' },
  'ball-valves-with-hose-joints': { en: 'Ball valves with hose connection', it: 'Valvole a sfera con portagomma', fr: 'Robinets avec raccord cannelé', es: 'Válvulas de bola con portagoma', de: 'Kugelhähne mit Schlauchtülle' },
  'flanged-ball-valves': { en: 'Flanged ball valves', it: 'Valvole a sfera flangiate', fr: 'Robinets à tournant sphérique à brides', es: 'Válvulas de bola bridadas', de: 'Kugelhähne mit Flanschanschluss' },
  'threaded-gate-valves': { en: 'Threaded gate valves', it: 'Saracinesche filettate', fr: 'Robinets-vannes taraudés', es: 'Válvulas de compuerta roscadas', de: 'Absperrschieber mit Gewinde' },
  'light-threaded-gate-valves': { en: 'Light-series threaded gate valves', it: 'Saracinesche filettate serie leggera', fr: 'Robinets-vannes taraudés série légère', es: 'Válvulas de compuerta roscadas serie ligera', de: 'Absperrschieber mit Gewinde, leichte Baureihe' },
  'flanged-gate-valves': { en: 'Flanged gate valves', it: 'Saracinesche flangiate', fr: 'Robinets-vannes à brides', es: 'Válvulas de compuerta bridadas', de: 'Absperrschieber mit Flanschanschluss' },
  'copper-compression-and-solder-end-gate-valves': { en: 'Compression and solder-end gate valves', it: 'Saracinesche a compressione e a saldare', fr: 'Robinets-vannes à compression et à braser', es: 'Válvulas de compuerta de compresión y para soldar', de: 'Absperrschieber mit Klemmring- und Lötanschluss' },
  'threaded-globe-valves': { en: 'Threaded globe valves', it: 'Valvole a globo filettate', fr: 'Robinets à soupape taraudés', es: 'Válvulas de globo roscadas', de: 'Absperrventile mit Gewinde' },
  'threaded-angle-globe-valves': { en: 'Threaded angle and Y-pattern globe valves', it: 'Valvole a globo filettate ad angolo e inclinate', fr: 'Robinets à soupape taraudés d’équerre et obliques', es: 'Válvulas de globo roscadas en ángulo y en Y', de: 'Eck- und Schrägsitzventile mit Gewinde' },
  'flanged-globe-valves': { en: 'Flanged globe valves', it: 'Valvole a globo flangiate', fr: 'Robinets à soupape à brides', es: 'Válvulas de globo bridadas', de: 'Absperrventile mit Flanschanschluss' },
  'flanged-angle-globe-valves': { en: 'Flanged angle globe valves', it: 'Valvole a globo flangiate ad angolo', fr: 'Robinets à soupape d’équerre à brides', es: 'Válvulas de globo bridadas en ángulo', de: 'Eckventile mit Flanschanschluss' },
  'threaded-swing-check-valves': { en: 'Threaded swing check valves', it: 'Valvole di ritegno a battente filettate', fr: 'Clapets à battant taraudés', es: 'Válvulas de retención de clapeta roscadas', de: 'Rückschlagklappen mit Gewinde' },
  'flanged-swing-check-valves': { en: 'Flanged swing check valves', it: 'Valvole di ritegno a battente flangiate', fr: 'Clapets à battant à brides', es: 'Válvulas de retención de clapeta bridadas', de: 'Rückschlagklappen mit Flanschanschluss' },
  'threaded-piston-check-valves': { en: 'Threaded piston check valves', it: 'Valvole di ritegno a pistone filettate', fr: 'Clapets à piston taraudés', es: 'Válvulas de retención de pistón roscadas', de: 'Kolben-Rückschlagventile mit Gewinde' },
  'flanged-piston-check-valves': { en: 'Flanged piston check valves', it: 'Valvole di ritegno a pistone flangiate', fr: 'Clapets à piston à brides', es: 'Válvulas de retención de pistón bridadas', de: 'Kolben-Rückschlagventile mit Flanschanschluss' },
  'threaded-angle-piston-check-valves': { en: 'Threaded angle piston check valves', it: 'Valvole di ritegno ad angolo filettate', fr: 'Clapets à piston d’équerre taraudés', es: 'Válvulas de retención en ángulo roscadas', de: 'Eck-Rückschlagventile mit Gewinde' },
  'flanged-angle-piston-check-valves': { en: 'Flanged angle piston check valves', it: 'Valvole di ritegno ad angolo flangiate', fr: 'Clapets à piston d’équerre à brides', es: 'Válvulas de retención en ángulo bridadas', de: 'Eck-Rückschlagventile mit Flanschanschluss' },
  'threaded-vertical-lift-and-foot-check-valves': { en: 'Vertical lift check valves and foot valves', it: 'Valvole di ritegno verticali e valvole di fondo', fr: 'Clapets à levée verticale et clapets de pied', es: 'Válvulas de retención verticales y válvulas de pie', de: 'Vertikal-Rückschlagventile und Fußventile' },
  'threaded-y-strainers': { en: 'Threaded Y strainers', it: 'Filtri a Y filettati', fr: 'Filtres en Y taraudés', es: 'Filtros en Y roscados', de: 'Schmutzfänger mit Gewinde' },
  'flanged-y-strainers': { en: 'Flanged Y strainers', it: 'Filtri a Y flangiati', fr: 'Filtres en Y à brides', es: 'Filtros en Y bridados', de: 'Schmutzfänger mit Flanschanschluss' },
  'threaded-plug-valves': { en: 'Threaded plug valves', it: 'Rubinetti a maschio filettati', fr: 'Robinets à boisseau taraudés', es: 'Válvulas de macho roscadas', de: 'Kükenhähne mit Gewinde' },
  'flanged-plug-valves': { en: 'Flanged plug valves', it: 'Rubinetti a maschio flangiati', fr: 'Robinets à boisseau à brides', es: 'Válvulas de macho bridadas', de: 'Kükenhähne mit Flanschanschluss' },
  'threaded-safety-valves': { en: 'Threaded safety valves', it: 'Valvole di sicurezza filettate', fr: 'Soupapes de sûreté taraudées', es: 'Válvulas de seguridad roscadas', de: 'Sicherheitsventile mit Gewinde' },
  'flanged-safety-valves': { en: 'Flanged safety valves', it: 'Valvole di sicurezza flangiate', fr: 'Soupapes de sûreté à brides', es: 'Válvulas de seguridad bridadas', de: 'Sicherheitsventile mit Flanschanschluss' },
  'threaded-fire-valves': { en: 'Threaded fire valves', it: 'Idranti filettati', fr: 'Robinets d’incendie taraudés', es: 'Válvulas contra incendios roscadas', de: 'Hydrantenventile mit Gewinde' },
  'flanged-fire-valves': { en: 'Flanged fire valves', it: 'Idranti flangiati', fr: 'Robinets d’incendie à brides', es: 'Válvulas contra incendios bridadas', de: 'Hydrantenventile mit Flanschanschluss' },
};

/** Display order of sub-categories inside each family. */
export const subcategoryOrder = Object.keys(subcategoryNames);

export const familyByKey = Object.fromEntries(families.map((f) => [f.key, f])) as Record<FamilyKey, Family>;
