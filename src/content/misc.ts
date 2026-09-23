import type { L } from '../i18n/config';

type Meta = { title: string; description: string };

export const productsPage: L<Meta & { heading: string; lead: string; materialsHeading: string; materialsText: string }> = {
  en: {
    title: 'Industrial valves catalogue – bronze and brass valves | Conti Valves',
    description: 'Full catalogue of Conti bronze and brass valves: ball, gate, globe, check and plug valves, Y strainers, safety, fire and pressure reducing valves, stopcocks and level indicators, with dimensions and materials.',
    heading: 'Products',
    lead: '123 bronze and brass valves in 11 families, made in Valduggia, Italy. Every item has its own page with pressure rating, dimensions, weights, materials and available versions.',
    materialsHeading: 'Materials and options',
    materialsText: 'Bodies in bronze CC491K, aluminium bronze, brass and DZR brass. Trims in AISI 316 stainless steel or Monel 400; PTFE, NBR or metal seals. All-bronze and aluminium-bronze versions of many items, and custom valves on request.',
  },
  it: {
    title: 'Catalogo valvole industriali in bronzo e ottone | Conti Valves',
    description: 'Il catalogo completo delle valvole Conti in bronzo e ottone: valvole a sfera, saracinesche, valvole a globo e di ritegno, rubinetti a maschio, filtri a Y, valvole di sicurezza, idranti, riduttori di pressione, rubinetti di arresto e indicatori di livello.',
    heading: 'Prodotti',
    lead: '123 valvole in bronzo e ottone in 11 famiglie, prodotte a Valduggia. Ogni articolo ha la sua pagina con pressione nominale, dimensioni, pesi, materiali e versioni disponibili.',
    materialsHeading: 'Materiali e opzioni',
    materialsText: 'Corpi in bronzo CC491K, bronzo-alluminio, ottone e ottone DZR. Interni in acciaio inox AISI 316 o Monel 400; tenute in PTFE, NBR o metalliche. Versioni tutto bronzo e bronzo-alluminio per molti articoli e valvole su misura a richiesta.',
  },
  fr: {
    title: 'Catalogue de robinetterie industrielle en bronze et laiton | Conti Valves',
    description: 'Le catalogue complet de la robinetterie Conti en bronze et laiton : robinets à tournant sphérique, robinets-vannes, robinets à soupape, clapets, robinets à boisseau, filtres en Y, soupapes de sûreté, robinets d’incendie, réducteurs de pression, robinets d’arrêt et indicateurs de niveau.',
    heading: 'Produits',
    lead: '123 robinets en bronze et laiton répartis en 11 familles, fabriqués à Valduggia (Italie). Chaque article a sa page avec pression nominale, dimensions, poids, matériaux et versions disponibles.',
    materialsHeading: 'Matériaux et options',
    materialsText: 'Corps en bronze CC491K, bronze-aluminium, laiton et laiton DZR. Garnitures en acier inoxydable AISI 316 ou Monel 400 ; étanchéité PTFE, NBR ou métal-métal. Versions tout bronze et bronze-aluminium pour de nombreux articles et robinets sur mesure sur demande.',
  },
  es: {
    title: 'Catálogo de válvulas industriales de bronce y latón | Conti Valves',
    description: 'El catálogo completo de válvulas Conti de bronce y latón: válvulas de bola, de compuerta, de globo, de retención y de macho, filtros en Y, válvulas de seguridad, contra incendios, reductores de presión, llaves de paso e indicadores de nivel.',
    heading: 'Productos',
    lead: '123 válvulas de bronce y latón en 11 familias, fabricadas en Valduggia (Italia). Cada artículo tiene su propia página con presión nominal, dimensiones, pesos, materiales y versiones disponibles.',
    materialsHeading: 'Materiales y opciones',
    materialsText: 'Cuerpos de bronce CC491K, bronce-aluminio, latón y latón DZR. Internos de acero inoxidable AISI 316 o Monel 400; cierres de PTFE, NBR o metálicos. Versiones todo bronce y bronce-aluminio de muchos artículos y válvulas a medida bajo pedido.',
  },
  de: {
    title: 'Katalog Industriearmaturen aus Bronze und Messing | Conti Valves',
    description: 'Der komplette Katalog der Conti-Armaturen aus Bronze und Messing: Kugelhähne, Absperrschieber, Absperr- und Rückschlagventile, Kükenhähne, Schmutzfänger, Sicherheits- und Hydrantenventile, Druckminderer, Absperrhähne und Füllstandsanzeiger.',
    heading: 'Produkte',
    lead: '123 Armaturen aus Bronze und Messing in 11 Produktfamilien, gefertigt in Valduggia (Italien). Jeder Artikel hat eine eigene Seite mit Nenndruck, Abmessungen, Gewichten, Werkstoffen und lieferbaren Ausführungen.',
    materialsHeading: 'Werkstoffe und Optionen',
    materialsText: 'Gehäuse aus Bronze CC491K, Aluminiumbronze, Messing und DZR-Messing. Innengarnituren aus Edelstahl AISI 316 oder Monel 400; Dichtungen aus PTFE, NBR oder metallisch. Viele Artikel auch ganz aus Bronze oder Aluminiumbronze sowie Sonderarmaturen auf Anfrage.',
  },
};

export const literature: L<Meta & { heading: string; lead: string; catalogues: string; manuals: string; certificates: string }> = {
  en: {
    title: 'Literature – catalogues, instructions and certificates | Conti Valves',
    description: 'Download Conti Rubinetterie catalogues (industrial valves, ball valves), installation, operation and maintenance instructions and ISO certificates.',
    heading: 'Literature',
    lead: 'Catalogues, installation and maintenance instructions and certificates. For the latest datasheet of a specific item, open its product page or contact our technical department.',
    catalogues: 'Catalogues',
    manuals: 'Installation, operation and maintenance instructions',
    certificates: 'Certificates',
  },
  it: {
    title: 'Documentazione – cataloghi, istruzioni e certificati | Conti Valves',
    description: 'Scarica i cataloghi Conti Rubinetterie (valvole industriali, valvole a sfera), le istruzioni di installazione, uso e manutenzione e i certificati ISO.',
    heading: 'Documentazione',
    lead: 'Cataloghi, istruzioni di installazione e manutenzione e certificati. Per la scheda aggiornata di un singolo articolo aprite la sua pagina prodotto o contattate il nostro ufficio tecnico.',
    catalogues: 'Cataloghi',
    manuals: 'Istruzioni di installazione, uso e manutenzione',
    certificates: 'Certificati',
  },
  fr: {
    title: 'Documentation – catalogues, notices et certificats | Conti Valves',
    description: 'Téléchargez les catalogues Conti Rubinetterie (robinetterie industrielle, robinets à tournant sphérique), les notices d’installation, d’utilisation et d’entretien et les certificats ISO.',
    heading: 'Documentation',
    lead: 'Catalogues, notices d’installation et d’entretien et certificats. Pour la fiche à jour d’un article, ouvrez sa page produit ou contactez notre bureau technique.',
    catalogues: 'Catalogues',
    manuals: 'Notices d’installation, d’utilisation et d’entretien',
    certificates: 'Certificats',
  },
  es: {
    title: 'Documentación – catálogos, instrucciones y certificados | Conti Valves',
    description: 'Descargue los catálogos de Conti Rubinetterie (válvulas industriales, válvulas de bola), las instrucciones de instalación, uso y mantenimiento y los certificados ISO.',
    heading: 'Documentación',
    lead: 'Catálogos, instrucciones de instalación y mantenimiento y certificados. Para la ficha actualizada de un artículo, abra su página de producto o contacte con nuestra oficina técnica.',
    catalogues: 'Catálogos',
    manuals: 'Instrucciones de instalación, uso y mantenimiento',
    certificates: 'Certificados',
  },
  de: {
    title: 'Dokumentation – Kataloge, Anleitungen und Zertifikate | Conti Valves',
    description: 'Kataloge von Conti Rubinetterie (Industriearmaturen, Kugelhähne), Einbau-, Betriebs- und Wartungsanleitungen sowie ISO-Zertifikate zum Herunterladen.',
    heading: 'Dokumentation',
    lead: 'Kataloge, Einbau- und Wartungsanleitungen und Zertifikate. Das aktuelle Datenblatt eines Artikels finden Sie auf seiner Produktseite oder erhalten es von unserer technischen Abteilung.',
    catalogues: 'Kataloge',
    manuals: 'Einbau-, Betriebs- und Wartungsanleitungen',
    certificates: 'Zertifikate',
  },
};

/** Downloadable documents (paths relative to wp-content/uploads on the old site). */
export const documents = {
  catalogues: [
    { file: '2018/12/industrial_valves_2012.pdf', name: { en: 'Industrial valves – general catalogue', it: 'Valvole industriali – catalogo generale', fr: 'Robinetterie industrielle – catalogue général', es: 'Válvulas industriales – catálogo general', de: 'Industriearmaturen – Gesamtkatalog' } as L, meta: 'PDF · 2012' },
    { file: '2018/12/ball_valves_2012.pdf', name: { en: 'Ball valves catalogue', it: 'Catalogo valvole a sfera', fr: 'Catalogue robinets à tournant sphérique', es: 'Catálogo válvulas de bola', de: 'Katalog Kugelhähne' } as L, meta: 'PDF · 2012' },
  ],
  manuals: [
    { file: '2022/05/SFERA.jpg', family: 'ball-valves' },
    { file: '2022/05/SARACINESCA.jpg', family: 'gate-valves' },
    { file: '2022/05/GLOBO.jpg', family: 'globe-valves' },
    { file: '2022/05/RITEGNO.jpg', family: 'check-valves' },
    { file: '2022/05/FILTRI.jpg', family: 'y-strainers' },
    { file: '2022/05/MASCHIO.jpg', family: 'plug-valves' },
  ] as const,
  certificates: [
    { file: '2023/10/ISO-9001.jpg', name: 'UNI EN ISO 9001:2015', meta: 'JPG' },
    { file: '2021/03/Certificato-ISO-14001-2015.pdf', name: 'UNI EN ISO 14001:2015', meta: 'PDF' },
  ],
};

export interface NewsItem { date: string; image: string; title: L; text: L }

export const newsPage: L<Meta & { heading: string }> = {
  en: { title: 'News | Conti Valves', description: 'News from Conti Rubinetterie: certifications, new product lines and company updates.', heading: 'News' },
  it: { title: 'News e novità | Conti Valves', description: 'Le novità di Conti Rubinetterie: certificazioni, nuove linee di prodotto e aggiornamenti aziendali.', heading: 'News' },
  fr: { title: 'Actualités | Conti Valves', description: 'Les actualités de Conti Rubinetterie : certifications, nouvelles gammes et informations sur l’entreprise.', heading: 'Actualités' },
  es: { title: 'Noticias | Conti Valves', description: 'Novedades de Conti Rubinetterie: certificaciones, nuevas líneas de producto y noticias de la empresa.', heading: 'Noticias' },
  de: { title: 'Aktuelles | Conti Valves', description: 'Neuigkeiten von Conti Rubinetterie: Zertifizierungen, neue Produktlinien und Unternehmensmeldungen.', heading: 'Aktuelles' },
};

export const news: NewsItem[] = [
  {
    date: '2015-08-03',
    image: '2015/08/bm-trada-ems-certification.jpg',
    title: { en: 'Conti awarded ISO 14001 certification', it: 'Conti ottiene la certificazione ISO 14001', fr: 'Conti obtient la certification ISO 14001', es: 'Conti obtiene la certificación ISO 14001', de: 'Conti erhält die ISO-14001-Zertifizierung' },
    text: {
      en: 'We are pleased to announce that we have been awarded the ISO 14001 certification. It certifies Conti’s Environmental Management System (EMS) and marks our commitment to meeting the highest environmental standards.',
      it: 'Siamo lieti di annunciare di aver ottenuto la certificazione ISO 14001. Il riconoscimento certifica il Sistema di Gestione Ambientale di Conti e conferma il nostro impegno a rispettare i più elevati standard ambientali.',
      fr: 'Nous avons le plaisir d’annoncer l’obtention de la certification ISO 14001. Elle atteste le système de management environnemental de Conti et confirme notre engagement à respecter les plus hautes exigences environnementales.',
      es: 'Nos complace anunciar que hemos obtenido la certificación ISO 14001. Certifica el Sistema de Gestión Ambiental de Conti y confirma nuestro compromiso con los más altos estándares ambientales.',
      de: 'Wir freuen uns, die Zertifizierung nach ISO 14001 bekannt zu geben. Sie bestätigt das Umweltmanagementsystem von Conti und unser Engagement für höchste Umweltstandards.',
    },
  },
  {
    date: '2014-05-08',
    image: '2014/05/water-lead-free.jpg',
    title: { en: 'New lead-free line for drinking water', it: 'Nuova linea senza piombo per acqua potabile', fr: 'Nouvelle gamme sans plomb pour l’eau potable', es: 'Nueva línea sin plomo para agua potable', de: 'Neue bleifreie Linie für Trinkwasser' },
    text: {
      en: 'A new lead-free product line is available, designed for critical applications such as drinking water, the food industry and the medical and pharmaceutical industries. The line is manufactured with methods and treatments that meet the requirements of NSF/ANSI 61.',
      it: 'È disponibile una nuova linea di prodotti senza piombo, pensata per settori esigenti come acqua potabile, industria alimentare, medicale e farmaceutica. La linea è realizzata con metodi e trattamenti conformi ai requisiti della norma NSF/ANSI 61.',
      fr: 'Une nouvelle gamme sans plomb est disponible, conçue pour des applications exigeantes comme l’eau potable, l’agroalimentaire et les industries médicale et pharmaceutique. Elle est fabriquée selon des méthodes et traitements conformes aux exigences de la norme NSF/ANSI 61.',
      es: 'Está disponible una nueva línea de productos sin plomo, pensada para aplicaciones exigentes como agua potable, industria alimentaria, médica y farmacéutica. Se fabrica con métodos y tratamientos que cumplen los requisitos de la norma NSF/ANSI 61.',
      de: 'Eine neue bleifreie Produktlinie ist verfügbar – für anspruchsvolle Anwendungen wie Trinkwasser, Lebensmittel-, Medizin- und Pharmaindustrie. Sie wird mit Verfahren und Behandlungen gefertigt, die die Anforderungen der NSF/ANSI 61 erfüllen.',
    },
  },
];

export const contactPage: L<Meta & { heading: string; lead: string; departments: string; visit: string }> = {
  en: {
    title: 'Contact Conti Rubinetterie – Valduggia, Italy | Conti Valves',
    description: 'Contact Conti Rubinetterie, Via Astabbio 5, 13018 Valduggia (VC), Italy. Phone +39 0163 487704. Sales, technical department, accounting and shipping.',
    heading: 'Contact us',
    lead: 'For quotes, technical questions or documentation, write directly to the right department.',
    departments: 'Departments',
    visit: 'Where we are',
  },
  it: {
    title: 'Contatti Conti Rubinetterie – Valduggia (VC) | Conti Valves',
    description: 'Contatta Conti Rubinetterie, Via Astabbio 5, 13018 Valduggia (VC). Telefono +39 0163 487704. Ufficio commerciale, ufficio tecnico, amministrazione e spedizioni.',
    heading: 'Contatti',
    lead: 'Per preventivi, domande tecniche o documentazione scrivete direttamente all’ufficio competente.',
    departments: 'Uffici',
    visit: 'Dove siamo',
  },
  fr: {
    title: 'Contacter Conti Rubinetterie – Valduggia, Italie | Conti Valves',
    description: 'Contactez Conti Rubinetterie, Via Astabbio 5, 13018 Valduggia (VC), Italie. Téléphone +39 0163 487704. Service commercial, bureau technique, comptabilité et expéditions.',
    heading: 'Nous contacter',
    lead: 'Pour un devis, une question technique ou de la documentation, écrivez directement au service concerné.',
    departments: 'Services',
    visit: 'Où nous trouver',
  },
  es: {
    title: 'Contactar con Conti Rubinetterie – Valduggia, Italia | Conti Valves',
    description: 'Contacte con Conti Rubinetterie, Via Astabbio 5, 13018 Valduggia (VC), Italia. Teléfono +39 0163 487704. Departamento comercial, oficina técnica, administración y envíos.',
    heading: 'Contacto',
    lead: 'Para presupuestos, consultas técnicas o documentación, escriba directamente al departamento adecuado.',
    departments: 'Departamentos',
    visit: 'Dónde estamos',
  },
  de: {
    title: 'Kontakt Conti Rubinetterie – Valduggia, Italien | Conti Valves',
    description: 'Kontakt zu Conti Rubinetterie, Via Astabbio 5, 13018 Valduggia (VC), Italien. Telefon +39 0163 487704. Vertrieb, technische Abteilung, Buchhaltung und Versand.',
    heading: 'Kontakt',
    lead: 'Für Angebote, technische Fragen oder Unterlagen schreiben Sie bitte direkt an die zuständige Abteilung.',
    departments: 'Abteilungen',
    visit: 'Anfahrt',
  },
};

/** Family page <title>: "<name> – <body materials> · <PN range> | Conti Valves" is built in the page. */
export const familyCount: L<(n: number) => string> = {
  en: (n) => `${n} items`,
  it: (n) => `${n} articoli`,
  fr: (n) => `${n} articles`,
  es: (n) => `${n} artículos`,
  de: (n) => `${n} Artikel`,
};
