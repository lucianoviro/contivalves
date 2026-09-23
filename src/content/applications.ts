import type { L } from '../i18n/config';

export const applications: L<{
  title: string;
  description: string;
  heading: string;
  lead: string;
  text: string;
  industriesHeading: string;
}> = {
  en: {
    title: 'Industries we serve – marine, oil & gas, power, water | Conti Valves',
    description: 'Conti bronze and brass valves are used in chemical plants and refineries, offshore oil & gas, power generation, desalination, water supply, steam, shipbuilding, compressed air, fire fighting and textile industry.',
    heading: 'Industries we serve',
    lead: 'Conti Rubinetterie is a valve manufacturer and supplier to diversified industries. A 100-year tradition, technological know-how and engineering expertise, backed by total control of the production process, make Conti a trusted partner for standard and custom valves.',
    text: 'Decades of supplying flow-control products to new construction projects and a wide variety of piping applications have created a large installed base worldwide. Conti valves are designed, engineered and manufactured in a broad range of materials, styles, sizes and pressure classes for:',
    industriesHeading: 'Main applications',
  },
  it: {
    title: 'Settori di applicazione – navale, oil & gas, energia, acqua | Conti Valves',
    description: 'Le valvole Conti in bronzo e ottone sono impiegate in impianti chimici e raffinerie, oil & gas offshore, produzione di energia, dissalazione, acquedotti, vapore, cantieristica navale, aria compressa, antincendio e industria tessile.',
    heading: 'Settori di applicazione',
    lead: 'Conti Rubinetterie produce e fornisce valvole per settori molto diversi. Una tradizione centenaria, competenze tecnologiche e ingegneristiche e il controllo totale del processo produttivo fanno di Conti un partner affidabile per valvole standard e personalizzate.',
    text: 'Decenni di forniture per nuovi impianti e per le più diverse applicazioni di tubazioni hanno creato un’ampia base installata in tutto il mondo. Le valvole Conti sono progettate e prodotte in un’ampia gamma di materiali, tipologie, misure e classi di pressione per:',
    industriesHeading: 'Principali applicazioni',
  },
  fr: {
    title: 'Secteurs d’application – naval, pétrole et gaz, énergie, eau | Conti Valves',
    description: 'La robinetterie Conti en bronze et en laiton équipe usines chimiques et raffineries, production offshore, centrales électriques, dessalement, distribution d’eau, vapeur, construction navale, air comprimé, protection incendie et industrie textile.',
    heading: 'Secteurs d’application',
    lead: 'Conti Rubinetterie fabrique et fournit de la robinetterie pour des industries très variées. Un siècle de tradition, un savoir-faire technique et d’ingénierie et la maîtrise totale du processus de fabrication font de Conti un partenaire de confiance pour les robinets standard et sur mesure.',
    text: 'Des décennies de fournitures pour de nouveaux projets et pour les applications de tuyauterie les plus diverses ont constitué un large parc installé dans le monde entier. Les robinets Conti sont conçus et fabriqués dans une large gamme de matériaux, de types, de dimensions et de classes de pression pour :',
    industriesHeading: 'Principales applications',
  },
  es: {
    title: 'Sectores de aplicación – naval, petróleo y gas, energía, agua | Conti Valves',
    description: 'Las válvulas Conti de bronce y latón se utilizan en plantas químicas y refinerías, producción offshore, generación de energía, desalinización, abastecimiento de agua, vapor, construcción naval, aire comprimido, protección contra incendios e industria textil.',
    heading: 'Sectores de aplicación',
    lead: 'Conti Rubinetterie fabrica y suministra válvulas para industrias muy diversas. Cien años de tradición, conocimiento tecnológico y de ingeniería y el control total del proceso productivo hacen de Conti un socio de confianza para válvulas estándar y a medida.',
    text: 'Décadas de suministros para nuevos proyectos y para las más variadas aplicaciones de tuberías han creado una amplia base instalada en todo el mundo. Las válvulas Conti se diseñan y fabrican en una amplia gama de materiales, tipos, medidas y clases de presión para:',
    industriesHeading: 'Principales aplicaciones',
  },
  de: {
    title: 'Branchen – Schiffbau, Öl und Gas, Energie, Wasser | Conti Valves',
    description: 'Conti-Armaturen aus Bronze und Messing werden in Chemieanlagen und Raffinerien, Offshore-Förderung, Energieerzeugung, Meerwasserentsalzung, Wasserversorgung, Dampf, Schiffbau, Druckluft, Brandschutz und Textilindustrie eingesetzt.',
    heading: 'Branchen',
    lead: 'Conti Rubinetterie fertigt und liefert Armaturen für die unterschiedlichsten Branchen. Hundert Jahre Tradition, technisches Know-how, Engineering-Kompetenz und die vollständige Kontrolle über die Fertigung machen Conti zum verlässlichen Partner für Standard- und Sonderarmaturen.',
    text: 'Jahrzehntelange Lieferungen für Neubauprojekte und unterschiedlichste Rohrleitungsanwendungen haben weltweit eine große installierte Basis geschaffen. Conti-Armaturen werden in einer großen Auswahl an Werkstoffen, Bauarten, Nennweiten und Druckstufen konstruiert und gefertigt für:',
    industriesHeading: 'Wichtige Einsatzbereiche',
  },
};

export const industries: { image: string; name: L }[] = [
  { image: '2018/12/conti-industria-chimica-petrolchimica.jpg', name: { en: 'Chemical plants and petroleum refining', it: 'Industria chimica e raffinazione', fr: 'Chimie et raffinage du pétrole', es: 'Química y refino de petróleo', de: 'Chemieanlagen und Erdölraffinerien' } },
  { image: '2018/12/conti-estrazione-petrolio.jpg', name: { en: 'Offshore oil and gas production', it: 'Estrazione offshore di petrolio e gas', fr: 'Production offshore de pétrole et de gaz', es: 'Producción offshore de petróleo y gas', de: 'Offshore-Förderung von Öl und Gas' } },
  { image: '2018/12/conti-gasdotti.jpg', name: { en: 'Oil refineries and gas industry', it: 'Raffinerie e industria del gas', fr: 'Raffineries et industrie gazière', es: 'Refinerías e industria del gas', de: 'Raffinerien und Gasindustrie' } },
  { image: '2018/12/conti-industria-mineraria.jpg', name: { en: 'Mining and infrastructure', it: 'Miniere e infrastrutture', fr: 'Mines et infrastructures', es: 'Minería e infraestructuras', de: 'Bergbau und Infrastruktur' } },
  { image: '2018/12/conti-energia.jpg', name: { en: 'Power generation', it: 'Produzione di energia', fr: 'Production d’énergie', es: 'Generación de energía', de: 'Energieerzeugung' } },
  { image: '2018/12/conti-trattamento-acque-desalinizzazione.jpg', name: { en: 'Desalination and water treatment', it: 'Dissalazione e trattamento acque', fr: 'Dessalement et traitement de l’eau', es: 'Desalinización y tratamiento de agua', de: 'Meerwasserentsalzung und Wasseraufbereitung' } },
  { image: '2018/12/conti-acquedottistica-irrigazione.jpg', name: { en: 'Water supply and irrigation', it: 'Acquedotti e irrigazione', fr: 'Distribution d’eau et irrigation', es: 'Abastecimiento de agua y riego', de: 'Wasserversorgung und Bewässerung' } },
  { image: '2018/12/conti-applicazioni-vapore.jpg', name: { en: 'Steam applications', it: 'Applicazioni a vapore', fr: 'Applications vapeur', es: 'Aplicaciones de vapor', de: 'Dampfanwendungen' } },
  { image: '2018/12/conti-industria-navale.jpg', name: { en: 'Shipbuilding', it: 'Cantieristica navale', fr: 'Construction navale', es: 'Construcción naval', de: 'Schiffbau' } },
  { image: '2018/12/conti-aria-compressa.jpg', name: { en: 'Compressed air', it: 'Aria compressa', fr: 'Air comprimé', es: 'Aire comprimido', de: 'Druckluft' } },
  { image: '2018/12/conti-antincendio.jpg', name: { en: 'Fire fighting', it: 'Antincendio', fr: 'Protection incendie', es: 'Protección contra incendios', de: 'Brandschutz' } },
  { image: '2018/12/conti-industria-tessile.jpg', name: { en: 'Textile industry', it: 'Industria tessile', fr: 'Industrie textile', es: 'Industria textil', de: 'Textilindustrie' } },
];

export const custom: L<{
  title: string;
  description: string;
  heading: string;
  lead: string;
  paragraphs: string[];
  optionsHeading: string;
  options: string[];
  cta: string;
}> = {
  en: {
    title: 'Custom engineered valve solutions | Conti Valves',
    description: 'Custom valves designed to your specification since 2006: special alloys, end connections, bonnets, trims, packings and operating parameters, built on Conti’s bronze and brass valve portfolio.',
    heading: 'Custom engineered solutions',
    lead: 'We began a century ago with a precise focus: meeting our customers’ needs with quality products. Customers and specifying engineers around the world keep coming back for products and solutions they know and trust.',
    paragraphs: [
      'With the Custom Engineered Solutions division, founded in 2006, we bring the same research and development we apply to our own products to yours. Combined with our in-house foundry and machining, it is a strong partner for unique product needs.',
      'Your custom valve starts from our product portfolio: review our range and send us your specification – we will help you choose the valve type and configuration that meets your requirements. Each valve can be made with most flange types and sizes, welded connections, NPT threads or tube fittings.',
    ],
    optionsHeading: 'Main customisation options',
    options: ['Valve alloys', 'End connections', 'Bonnet types', 'Trim sets and materials', 'Packing choices', 'Operating temperature and pressure', 'Custom-fit accessories'],
    cta: 'Send us your specification',
  },
  it: {
    title: 'Valvole personalizzate su specifica | Conti Valves',
    description: 'Valvole progettate su specifica del cliente dal 2006: leghe speciali, attacchi, coperchi, interni, guarnizioni e parametri di esercizio, a partire dalla gamma Conti di valvole in bronzo e ottone.',
    heading: 'Soluzioni personalizzate',
    lead: 'Abbiamo iniziato un secolo fa con un obiettivo preciso: soddisfare le esigenze dei clienti con prodotti di qualità. Clienti e progettisti di tutto il mondo tornano da noi per prodotti e soluzioni che conoscono e di cui si fidano.',
    paragraphs: [
      'Con la divisione Custom Engineered Solutions, nata nel 2006, mettiamo al servizio dei vostri prodotti la stessa ricerca e sviluppo che dedichiamo ai nostri. Unita alla fonderia e alle lavorazioni interne, è una combinazione vincente per esigenze uniche.',
      'La vostra valvola su misura parte dalla nostra gamma: consultate i prodotti e inviateci le vostre specifiche, vi aiuteremo a scegliere tipologia e configurazione più adatte. Ogni valvola può essere realizzata con la maggior parte dei tipi e delle misure di flange, attacchi a saldare, filettature NPT o raccordi per tubo.',
    ],
    optionsHeading: 'Principali opzioni di personalizzazione',
    options: ['Leghe della valvola', 'Attacchi di estremità', 'Tipi di coperchio', 'Interni e relativi materiali', 'Guarnizioni e premistoppa', 'Temperatura e pressione di esercizio', 'Accessori su misura'],
    cta: 'Inviateci le vostre specifiche',
  },
  fr: {
    title: 'Robinetterie sur mesure selon cahier des charges | Conti Valves',
    description: 'Des robinets conçus selon vos spécifications depuis 2006 : alliages spéciaux, raccordements, chapeaux, garnitures, presse-étoupes et conditions de service, à partir de la gamme Conti en bronze et laiton.',
    heading: 'Solutions sur mesure',
    lead: 'Nous avons commencé il y a un siècle avec un objectif précis : répondre aux besoins de nos clients avec des produits de qualité. Clients et prescripteurs du monde entier reviennent vers nous pour des produits et des solutions qu’ils connaissent et en lesquels ils ont confiance.',
    paragraphs: [
      'Avec la division Custom Engineered Solutions, créée en 2006, nous mettons au service de vos produits la même recherche et développement que pour les nôtres. Alliée à notre fonderie et à notre usinage internes, c’est une combinaison gagnante pour les besoins les plus spécifiques.',
      'Votre robinet sur mesure part de notre gamme : consultez nos produits et envoyez-nous vos spécifications, nous vous aiderons à choisir le type et la configuration adaptés. Chaque robinet peut être réalisé avec la plupart des types et dimensions de brides, des raccordements à souder, des filetages NPT ou des raccords pour tube.',
    ],
    optionsHeading: 'Principales options de personnalisation',
    options: ['Alliages', 'Raccordements d’extrémité', 'Types de chapeau', 'Garnitures internes et matériaux', 'Presse-étoupes et garnitures d’étanchéité', 'Température et pression de service', 'Accessoires sur mesure'],
    cta: 'Envoyez-nous votre cahier des charges',
  },
  es: {
    title: 'Válvulas a medida según especificación | Conti Valves',
    description: 'Válvulas diseñadas según su especificación desde 2006: aleaciones especiales, conexiones, bonetes, internos, empaquetaduras y condiciones de servicio, a partir de la gama Conti de bronce y latón.',
    heading: 'Soluciones a medida',
    lead: 'Empezamos hace un siglo con un objetivo claro: responder a las necesidades de nuestros clientes con productos de calidad. Clientes e ingenieros de todo el mundo vuelven a nosotros por productos y soluciones que conocen y en los que confían.',
    paragraphs: [
      'Con la división Custom Engineered Solutions, creada en 2006, ponemos al servicio de sus productos la misma investigación y desarrollo que aplicamos a los nuestros. Junto con nuestra fundición y mecanizado propios, es una combinación ganadora para necesidades únicas.',
      'Su válvula a medida parte de nuestra gama: consulte nuestros productos y envíenos sus especificaciones; le ayudaremos a elegir el tipo y la configuración adecuados. Cada válvula puede fabricarse con la mayoría de tipos y medidas de bridas, conexiones para soldar, roscas NPT o racores para tubo.',
    ],
    optionsHeading: 'Principales opciones de personalización',
    options: ['Aleaciones de la válvula', 'Conexiones de extremo', 'Tipos de bonete', 'Internos y sus materiales', 'Empaquetaduras', 'Temperatura y presión de servicio', 'Accesorios a medida'],
    cta: 'Envíenos su especificación',
  },
  de: {
    title: 'Sonderarmaturen nach Kundenspezifikation | Conti Valves',
    description: 'Armaturen nach Ihrer Spezifikation seit 2006: Sonderlegierungen, Anschlüsse, Oberteile, Innengarnituren, Packungen und Betriebsbedingungen – auf Basis des Conti-Programms aus Bronze und Messing.',
    heading: 'Sonderlösungen nach Maß',
    lead: 'Wir haben vor einem Jahrhundert mit einem klaren Ziel begonnen: die Anforderungen unserer Kunden mit hochwertigen Produkten zu erfüllen. Kunden und Planer in aller Welt kommen immer wieder zu uns – für Produkte und Lösungen, die sie kennen und denen sie vertrauen.',
    paragraphs: [
      'Mit der 2006 gegründeten Abteilung Custom Engineered Solutions setzen wir für Ihre Produkte dieselbe Forschung und Entwicklung ein wie für unsere eigenen. Zusammen mit eigener Gießerei und mechanischer Fertigung ist das eine starke Kombination für besondere Anforderungen.',
      'Ihre Sonderarmatur basiert auf unserem Produktprogramm: Sehen Sie sich das Sortiment an und senden Sie uns Ihre Spezifikation – wir helfen Ihnen bei der Wahl von Bauart und Ausführung. Jede Armatur ist mit den meisten Flanschtypen und -größen, Schweißenden, NPT-Gewinden oder Rohrverschraubungen lieferbar.',
    ],
    optionsHeading: 'Wichtigste Anpassungsmöglichkeiten',
    options: ['Legierungen', 'Anschlussenden', 'Oberteilausführungen', 'Innengarnituren und Werkstoffe', 'Packungen und Dichtungen', 'Betriebstemperatur und -druck', 'Passendes Zubehör'],
    cta: 'Spezifikation senden',
  },
};

export const alubronze: L<{
  title: string;
  description: string;
  heading: string;
  lead: string;
  paragraphs: string[];
  propertiesHeading: string;
  properties: string[];
  rangeHeading: string;
}> = {
  en: {
    title: 'Aluminium bronze valves for seawater and corrosive service | Conti Valves',
    description: 'Aluminium-bronze gate, globe, check and ball valves cast in Conti’s own foundry: exceptional resistance to seawater, pitting, stress corrosion and corrosion fatigue, in several pressure classes and sizes.',
    heading: 'Aluminium bronze valves',
    lead: 'Thanks to decades of experience in high-quality valves, technological know-how and our in-house bronze foundry, Conti designs and manufactures a dedicated line of aluminium-bronze valves, available in several pressure classes, sizes and styles.',
    paragraphs: [
      'Corrosion rate is the single most important factor when estimating the service life of a valve. Aluminium bronze is a copper alloy in which aluminium is the main alloying element – unlike standard bronze (copper and tin) or brass (copper and zinc). It is the strongest of the standard copper-based alloys and is chosen where higher mechanical properties are required.',
      'Aluminium-bronze valves are valued for exceptional corrosion resistance, toughness and strength compared with other bronzes. They are suitable for seawater service and particularly for applications exposed to pitting, stress corrosion and corrosion fatigue. The alloy also casts well, is weldable and can be used as trim material.',
    ],
    propertiesHeading: 'Why aluminium bronze',
    properties: ['Highest strength among standard copper alloys', 'Excellent resistance to seawater', 'Resists pitting, stress corrosion and corrosion fatigue', 'Good castability and weldability', 'Also available as trim (ball, stem, disc)'],
    rangeHeading: 'Available in aluminium bronze',
  },
  it: {
    title: 'Valvole in bronzo-alluminio per acqua di mare e fluidi corrosivi | Conti Valves',
    description: 'Saracinesche, valvole a globo, di ritegno e a sfera in bronzo-alluminio fuse nella fonderia Conti: resistenza eccezionale ad acqua di mare, vaiolatura, tensocorrosione e fatica da corrosione, in diverse classi di pressione e misure.',
    heading: 'Valvole in bronzo-alluminio',
    lead: 'Grazie a decenni di esperienza nelle valvole di alta qualità, al know-how tecnologico e alla fonderia di bronzo interna, Conti progetta e produce una linea dedicata di valvole in bronzo-alluminio, disponibili in diverse classi di pressione, misure e tipologie.',
    paragraphs: [
      'La velocità di corrosione è il fattore più importante per stimare la vita utile di una valvola. Il bronzo-alluminio è una lega di rame in cui l’alluminio è il principale elemento di lega – a differenza del bronzo standard (rame e stagno) o dell’ottone (rame e zinco). È la più resistente tra le leghe di rame standard e si sceglie quando servono proprietà meccaniche superiori.',
      'Le valvole in bronzo-alluminio sono apprezzate per l’eccezionale resistenza alla corrosione, la tenacità e la robustezza rispetto agli altri bronzi. Sono adatte all’acqua di mare e in particolare ad applicazioni soggette a vaiolatura (pitting), tensocorrosione e fatica da corrosione. La lega ha inoltre buona colabilità, è saldabile e può essere usata anche per gli interni.',
    ],
    propertiesHeading: 'Perché il bronzo-alluminio',
    properties: ['Massima resistenza meccanica tra le leghe di rame standard', 'Ottima resistenza all’acqua di mare', 'Resiste a vaiolatura, tensocorrosione e fatica da corrosione', 'Buona colabilità e saldabilità', 'Disponibile anche per gli interni (sfera, asta, otturatore)'],
    rangeHeading: 'Disponibili in bronzo-alluminio',
  },
  fr: {
    title: 'Robinetterie en bronze-aluminium pour l’eau de mer et les fluides corrosifs | Conti Valves',
    description: 'Robinets-vannes, robinets à soupape, clapets et robinets à tournant sphérique en bronze-aluminium coulés dans la fonderie Conti : résistance exceptionnelle à l’eau de mer, à la corrosion par piqûres, sous contrainte et en fatigue.',
    heading: 'Robinetterie en bronze-aluminium',
    lead: 'Forte de décennies d’expérience dans la robinetterie de qualité, de son savoir-faire technique et de sa fonderie de bronze intégrée, Conti conçoit et fabrique une gamme dédiée de robinets en bronze-aluminium, disponibles en plusieurs classes de pression, dimensions et modèles.',
    paragraphs: [
      'La vitesse de corrosion est le facteur déterminant pour estimer la durée de vie d’un robinet. Le bronze-aluminium est un alliage de cuivre dont le principal élément d’addition est l’aluminium – contrairement au bronze standard (cuivre et étain) ou au laiton (cuivre et zinc). C’est le plus résistant des alliages cuivreux standard, choisi lorsque des propriétés mécaniques supérieures sont nécessaires.',
      'Les robinets en bronze-aluminium sont appréciés pour leur résistance exceptionnelle à la corrosion, leur ténacité et leur robustesse par rapport aux autres bronzes. Ils conviennent à l’eau de mer et en particulier aux applications exposées à la corrosion par piqûres, à la corrosion sous contrainte et à la fatigue-corrosion. L’alliage se coule bien, est soudable et peut aussi servir de matériau de garniture.',
    ],
    propertiesHeading: 'Pourquoi le bronze-aluminium',
    properties: ['Résistance mécanique la plus élevée des alliages cuivreux standard', 'Excellente tenue à l’eau de mer', 'Résiste aux piqûres, à la corrosion sous contrainte et à la fatigue-corrosion', 'Bonne coulabilité et soudabilité', 'Disponible aussi pour les garnitures (sphère, tige, clapet)'],
    rangeHeading: 'Disponibles en bronze-aluminium',
  },
  es: {
    title: 'Válvulas de bronce-aluminio para agua de mar y servicio corrosivo | Conti Valves',
    description: 'Válvulas de compuerta, de globo, de retención y de bola de bronce-aluminio fundidas en la fundición Conti: resistencia excepcional al agua de mar, a la corrosión por picaduras, bajo tensión y por fatiga.',
    heading: 'Válvulas de bronce-aluminio',
    lead: 'Gracias a décadas de experiencia en válvulas de alta calidad, al conocimiento tecnológico y a su fundición de bronce propia, Conti diseña y fabrica una línea específica de válvulas de bronce-aluminio, disponibles en varias clases de presión, medidas y tipos.',
    paragraphs: [
      'La velocidad de corrosión es el factor más importante para estimar la vida útil de una válvula. El bronce-aluminio es una aleación de cobre cuyo principal elemento aleante es el aluminio, a diferencia del bronce estándar (cobre y estaño) o del latón (cobre y zinc). Es la más resistente de las aleaciones de cobre estándar y se elige cuando se requieren mejores propiedades mecánicas.',
      'Las válvulas de bronce-aluminio se valoran por su excepcional resistencia a la corrosión, tenacidad y robustez frente a otros bronces. Son adecuadas para agua de mar y especialmente para aplicaciones expuestas a corrosión por picaduras, corrosión bajo tensión y fatiga por corrosión. La aleación además tiene buena colabilidad, es soldable y puede usarse como material de internos.',
    ],
    propertiesHeading: 'Por qué el bronce-aluminio',
    properties: ['Máxima resistencia mecánica entre las aleaciones de cobre estándar', 'Excelente resistencia al agua de mar', 'Resiste picaduras, corrosión bajo tensión y fatiga por corrosión', 'Buena colabilidad y soldabilidad', 'Disponible también para internos (bola, vástago, obturador)'],
    rangeHeading: 'Disponibles en bronce-aluminio',
  },
  de: {
    title: 'Armaturen aus Aluminiumbronze für Meerwasser und korrosive Medien | Conti Valves',
    description: 'Absperrschieber, Absperr-, Rückschlagventile und Kugelhähne aus Aluminiumbronze aus der eigenen Conti-Gießerei: außergewöhnlich beständig gegen Meerwasser, Lochfraß, Spannungsrisskorrosion und Korrosionsermüdung.',
    heading: 'Armaturen aus Aluminiumbronze',
    lead: 'Dank jahrzehntelanger Erfahrung mit hochwertigen Armaturen, technischem Know-how und der eigenen Bronzegießerei konstruiert und fertigt Conti eine eigene Baureihe aus Aluminiumbronze – in verschiedenen Druckstufen, Nennweiten und Bauformen.',
    paragraphs: [
      'Die Korrosionsrate ist der wichtigste Faktor für die Lebensdauer einer Armatur. Aluminiumbronze ist eine Kupferlegierung mit Aluminium als Hauptlegierungselement – anders als Standardbronze (Kupfer und Zinn) oder Messing (Kupfer und Zink). Sie ist die festeste der Standard-Kupferlegierungen und wird gewählt, wenn höhere mechanische Eigenschaften gefordert sind.',
      'Armaturen aus Aluminiumbronze überzeugen durch außergewöhnliche Korrosionsbeständigkeit, Zähigkeit und Festigkeit im Vergleich zu anderen Bronzen. Sie eignen sich für Meerwasser und besonders für Anwendungen mit Gefahr von Lochfraß, Spannungsrisskorrosion und Korrosionsermüdung. Die Legierung lässt sich zudem gut gießen und schweißen und dient auch als Werkstoff für Innenteile.',
    ],
    propertiesHeading: 'Warum Aluminiumbronze',
    properties: ['Höchste Festigkeit unter den Standard-Kupferlegierungen', 'Hervorragende Meerwasserbeständigkeit', 'Beständig gegen Lochfraß, Spannungsrisskorrosion und Korrosionsermüdung', 'Gut gieß- und schweißbar', 'Auch als Innengarnitur lieferbar (Kugel, Spindel, Kegel)'],
    rangeHeading: 'Lieferbar in Aluminiumbronze',
  },
};
