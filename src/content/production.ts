import type { L } from '../i18n/config';

export const production: L<{
  title: string;
  description: string;
  heading: string;
  lead: string;
  text: string;
  steps: { title: string; text: string }[];
  videoTitle: string;
}> = {
  en: {
    title: 'Production process – from foundry to 100% testing | Conti Valves',
    description: 'How Conti valves are made in Valduggia, Italy: design, engineering, certified raw materials (EN 10204), in-house bronze foundry with induction furnaces, CNC machining, assembly and pressure testing of every valve.',
    heading: 'Every step under one roof',
    lead: 'Conti valves are recognised internationally for quality, reliability and safety. The key is control of the entire process – from design to the final test performed on 100% of production.',
    text: 'Keeping foundry, machining, assembly and testing in-house gives us full traceability, short lead times and the flexibility to build variants and custom valves.',
    steps: [
      { title: 'Design', text: 'New products, variants of standard products and valves developed on customer specifications are designed by our technical department with modern CAD software and decades of experience – fast, flexible and right from the first drawing.' },
      { title: 'Engineering', text: 'The technical department and the prototype workshop build and test samples to verify compliance with the design specifications. Our toolroom then makes all the tooling, while CAM software sends CNC programs straight to the machines that produce foundry patterns and machining tools.' },
      { title: 'Raw materials', text: 'All raw materials are certified according to EN 10204 and inspected on arrival. On request, and in line with EU rules, the quality office issues certificates of origin for the metals used in your valves.' },
      { title: 'Foundry', text: 'Conti has cast its own bronze since the early days, controlling quality from the very first step. The foundry runs latest-generation electric induction furnaces.' },
      { title: 'Machining', text: 'Bodies and components are machined in-house by qualified staff on advanced CNC machining centres and lathes.' },
      { title: 'Assembly', text: 'Depending on type and size, valves are assembled on semi-automatic or manual lines, in dedicated cells for each product family.' },
      { title: 'Testing', text: 'Every valve is tested by qualified staff under the supervision of Quality Control, at a pressure well above its rated class. On request we issue test certificates stating the medium (air or water) and parameters (pressure and duration). Components are also checked at every stage before assembly.' },
      { title: 'Packing and warehousing', text: 'After a final visual inspection, valves are packed and stored, ready for shipment.' },
    ],
    videoTitle: 'Conti Rubinetterie – production video',
  },
  it: {
    title: 'Processo produttivo – dalla fonderia al collaudo al 100% | Conti Valves',
    description: 'Come nascono le valvole Conti a Valduggia: progettazione, ingegnerizzazione, materie prime certificate EN 10204, fonderia di bronzo interna con forni a induzione, lavorazioni CNC, assemblaggio e collaudo di ogni valvola.',
    heading: 'Ogni fase sotto lo stesso tetto',
    lead: 'Le valvole Conti sono riconosciute a livello internazionale per qualità, affidabilità e sicurezza. Il segreto è il controllo dell’intero processo: dalla progettazione al collaudo finale, eseguito sul 100% della produzione.',
    text: 'Fonderia, lavorazioni meccaniche, assemblaggio e collaudo interni ci garantiscono tracciabilità completa, tempi rapidi e la flessibilità per realizzare varianti e valvole su misura.',
    steps: [
      { title: 'Progettazione', text: 'Nuovi prodotti, varianti di prodotti standard e valvole sviluppate su specifica del cliente sono progettati dal nostro ufficio tecnico con software CAD moderni e decenni di esperienza: rapidità e flessibilità fin dal primo disegno.' },
      { title: 'Ingegnerizzazione', text: 'Ufficio tecnico e reparto prototipi realizzano e collaudano campionature per verificare la conformità alle specifiche di progetto. L’attrezzeria interna costruisce poi tutte le attrezzature, mentre un software CAM trasmette i programmi alle macchine CNC che producono modelli per la fonderia e utensili.' },
      { title: 'Materie prime', text: 'Tutte le materie prime sono certificate secondo EN 10204 e controllate all’arrivo. Su richiesta, e in conformità alle norme UE, l’ufficio qualità rilascia i certificati di origine dei metalli impiegati nelle vostre valvole.' },
      { title: 'Fonderia', text: 'Conti fonde il proprio bronzo fin dalle origini, controllando la qualità dal primo passo. La fonderia utilizza forni elettrici a induzione di ultima generazione.' },
      { title: 'Lavorazioni meccaniche', text: 'Corpi e componenti sono lavorati internamente da personale qualificato su centri di lavoro e torni CNC di ultima generazione.' },
      { title: 'Assemblaggio', text: 'In base a tipologia e dimensione, le valvole sono assemblate su linee semiautomatiche o manuali, in isole dedicate a ciascuna famiglia di prodotti.' },
      { title: 'Collaudo', text: 'Ogni valvola è collaudata da personale qualificato sotto la supervisione del Controllo Qualità, a una pressione ben superiore alla sua classe nominale. Su richiesta rilasciamo certificati di collaudo con fluido (aria o acqua) e parametri (pressione e durata). Anche i componenti sono controllati in ogni fase prima dell’assemblaggio.' },
      { title: 'Imballaggio e magazzino', text: 'Dopo un controllo visivo finale, le valvole vengono imballate e stoccate a magazzino, pronte per la spedizione.' },
    ],
    videoTitle: 'Conti Rubinetterie – video della produzione',
  },
  fr: {
    title: 'Processus de fabrication – de la fonderie aux essais à 100 % | Conti Valves',
    description: 'Comment sont fabriqués les robinets Conti à Valduggia : conception, industrialisation, matières premières certifiées EN 10204, fonderie de bronze intégrée à fours à induction, usinage CNC, assemblage et essai de chaque robinet.',
    heading: 'Toutes les étapes sous un même toit',
    lead: 'Les robinets Conti sont reconnus dans le monde entier pour leur qualité, leur fiabilité et leur sécurité. La clé : la maîtrise de tout le processus, de la conception jusqu’à l’essai final réalisé sur 100 % de la production.',
    text: 'Fonderie, usinage, assemblage et essais internes nous assurent une traçabilité complète, des délais courts et la souplesse nécessaire pour réaliser variantes et robinets sur mesure.',
    steps: [
      { title: 'Conception', text: 'Nouveaux produits, variantes de produits standard et robinets développés selon le cahier des charges du client sont conçus par notre bureau d’études, avec des logiciels CAO modernes et des décennies d’expérience – rapidité et flexibilité dès le premier plan.' },
      { title: 'Industrialisation', text: 'Le bureau d’études et l’atelier prototypes réalisent et testent des échantillons pour vérifier leur conformité aux spécifications. Notre atelier d’outillage fabrique ensuite tous les outillages, tandis qu’un logiciel FAO transmet les programmes aux machines CNC qui produisent les modèles de fonderie et les outils.' },
      { title: 'Matières premières', text: 'Toutes les matières premières sont certifiées selon EN 10204 et contrôlées à réception. Sur demande, et conformément à la réglementation européenne, le service qualité délivre des certificats d’origine des métaux utilisés.' },
      { title: 'Fonderie', text: 'Conti coule son propre bronze depuis ses débuts et maîtrise ainsi la qualité dès la première étape. La fonderie est équipée de fours électriques à induction de dernière génération.' },
      { title: 'Usinage', text: 'Corps et composants sont usinés en interne par un personnel qualifié sur des centres d’usinage et des tours CNC modernes.' },
      { title: 'Assemblage', text: 'Selon le type et la taille, les robinets sont assemblés sur des lignes semi-automatiques ou manuelles, dans des îlots dédiés à chaque famille de produits.' },
      { title: 'Essais', text: 'Chaque robinet est testé par un personnel qualifié sous la supervision du contrôle qualité, à une pression nettement supérieure à sa classe nominale. Sur demande, nous délivrons des certificats d’essai indiquant le fluide (air ou eau) et les paramètres (pression et durée). Les composants sont également contrôlés à chaque étape avant l’assemblage.' },
      { title: 'Emballage et stockage', text: 'Après un contrôle visuel final, les robinets sont emballés et stockés, prêts à être expédiés.' },
    ],
    videoTitle: 'Conti Rubinetterie – vidéo de la production',
  },
  es: {
    title: 'Proceso de producción – de la fundición a la prueba al 100 % | Conti Valves',
    description: 'Cómo se fabrican las válvulas Conti en Valduggia: diseño, ingeniería, materias primas certificadas EN 10204, fundición de bronce propia con hornos de inducción, mecanizado CNC, montaje y prueba de cada válvula.',
    heading: 'Todas las fases bajo el mismo techo',
    lead: 'Las válvulas Conti son reconocidas internacionalmente por su calidad, fiabilidad y seguridad. La clave es el control de todo el proceso, desde el diseño hasta la prueba final realizada sobre el 100 % de la producción.',
    text: 'Tener en casa la fundición, el mecanizado, el montaje y las pruebas nos da trazabilidad completa, plazos cortos y la flexibilidad para fabricar variantes y válvulas a medida.',
    steps: [
      { title: 'Diseño', text: 'Los nuevos productos, las variantes de productos estándar y las válvulas desarrolladas según especificaciones del cliente se diseñan en nuestra oficina técnica con software CAD moderno y décadas de experiencia: rapidez y flexibilidad desde el primer plano.' },
      { title: 'Ingeniería', text: 'La oficina técnica y el taller de prototipos fabrican y prueban muestras para verificar el cumplimiento de las especificaciones. Nuestro taller de utillaje fabrica después todas las herramientas, mientras un software CAM envía los programas a las máquinas CNC que producen los modelos de fundición y las herramientas.' },
      { title: 'Materias primas', text: 'Todas las materias primas están certificadas según EN 10204 y se inspeccionan a su llegada. Bajo pedido, y conforme a la normativa de la UE, la oficina de calidad emite certificados de origen de los metales utilizados.' },
      { title: 'Fundición', text: 'Conti funde su propio bronce desde sus inicios y controla así la calidad desde el primer paso. La fundición cuenta con hornos eléctricos de inducción de última generación.' },
      { title: 'Mecanizado', text: 'Los cuerpos y componentes se mecanizan internamente por personal cualificado en centros de mecanizado y tornos CNC de última generación.' },
      { title: 'Montaje', text: 'Según el tipo y el tamaño, las válvulas se montan en líneas semiautomáticas o manuales, en islas dedicadas a cada familia de productos.' },
      { title: 'Pruebas', text: 'Cada válvula es probada por personal cualificado bajo la supervisión de Control de Calidad, a una presión muy superior a su clase nominal. Bajo pedido emitimos certificados de prueba con el fluido (aire o agua) y los parámetros (presión y duración). Los componentes también se controlan en cada fase antes del montaje.' },
      { title: 'Embalaje y almacén', text: 'Tras una inspección visual final, las válvulas se embalan y se almacenan, listas para su envío.' },
    ],
    videoTitle: 'Conti Rubinetterie – vídeo de la producción',
  },
  de: {
    title: 'Fertigung – von der Gießerei bis zur 100-%-Prüfung | Conti Valves',
    description: 'So entstehen Conti-Armaturen in Valduggia: Konstruktion, Industrialisierung, zertifizierte Rohstoffe nach EN 10204, eigene Bronzegießerei mit Induktionsöfen, CNC-Bearbeitung, Montage und Druckprüfung jeder Armatur.',
    heading: 'Jeder Schritt unter einem Dach',
    lead: 'Conti-Armaturen sind international für Qualität, Zuverlässigkeit und Sicherheit anerkannt. Der Schlüssel ist die Kontrolle über den gesamten Prozess – von der Konstruktion bis zur Endprüfung, die an 100 % der Produktion erfolgt.',
    text: 'Gießerei, Bearbeitung, Montage und Prüfung im eigenen Haus sichern uns lückenlose Rückverfolgbarkeit, kurze Lieferzeiten und die Flexibilität für Varianten und Sonderarmaturen.',
    steps: [
      { title: 'Konstruktion', text: 'Neue Produkte, Varianten von Standardprodukten und Armaturen nach Kundenspezifikation werden in unserer technischen Abteilung mit moderner CAD-Software und jahrzehntelanger Erfahrung konstruiert – schnell und flexibel ab der ersten Zeichnung.' },
      { title: 'Industrialisierung', text: 'Technische Abteilung und Prototypenbau fertigen und prüfen Muster, um die Übereinstimmung mit den Konstruktionsvorgaben sicherzustellen. Der eigene Werkzeugbau stellt anschließend alle Werkzeuge her; CAM-Software überträgt die Programme direkt an die CNC-Maschinen für Gießereimodelle und Bearbeitungswerkzeuge.' },
      { title: 'Rohstoffe', text: 'Alle Rohstoffe sind nach EN 10204 zertifiziert und werden beim Wareneingang geprüft. Auf Wunsch stellt die Qualitätsabteilung gemäß EU-Vorschriften Ursprungszeugnisse für die verwendeten Metalle aus.' },
      { title: 'Gießerei', text: 'Conti gießt seine Bronze seit den Anfängen selbst und kontrolliert die Qualität so ab dem ersten Schritt. Die Gießerei arbeitet mit elektrischen Induktionsöfen der neuesten Generation.' },
      { title: 'Mechanische Bearbeitung', text: 'Gehäuse und Bauteile werden im eigenen Haus von qualifiziertem Personal auf modernen CNC-Bearbeitungszentren und Drehmaschinen gefertigt.' },
      { title: 'Montage', text: 'Je nach Typ und Größe werden die Armaturen auf halbautomatischen oder manuellen Linien montiert – in eigenen Fertigungsinseln für jede Produktfamilie.' },
      { title: 'Prüfung', text: 'Jede Armatur wird von qualifiziertem Personal unter Aufsicht der Qualitätssicherung mit einem Druck deutlich über ihrer Nenndruckstufe geprüft. Auf Wunsch erhalten Sie Prüfzeugnisse mit Prüfmedium (Luft oder Wasser) und Parametern (Druck und Dauer). Auch die Bauteile werden vor der Montage in jeder Phase kontrolliert.' },
      { title: 'Verpackung und Lager', text: 'Nach einer abschließenden Sichtprüfung werden die Armaturen verpackt und eingelagert – bereit für den Versand.' },
    ],
    videoTitle: 'Conti Rubinetterie – Produktionsvideo',
  },
};

export const certifications: L<{
  title: string;
  description: string;
  heading: string;
  lead: string;
  blocks: { title: string; text: string }[];
  galleryHeading: string;
}> = {
  en: {
    title: 'Certifications – ISO 9001, ISO 14001, PED 2014/68/EU | Conti Valves',
    description: 'Conti Rubinetterie quality: ISO 9001 certified since 1999, ISO 14001 environmental management, valves built to PED 2014/68/EU, EN 10204 material certificates and 100% pressure testing.',
    heading: 'Quality you can document',
    lead: 'Our valves are designed and made in our own plants by a skilled team and tested one by one before shipping. Today, as 100 years ago, product quality is at the heart of every stage of production.',
    blocks: [
      { title: 'Company certification – ISO 9001', text: 'Since 1999 Conti Rubinetterie has operated a quality management system certified to UNI EN ISO 9001, now in its 2015 edition.' },
      { title: 'Material certificates – EN 10204', text: 'All raw materials are supplied with certificates to EN 10204 attesting origin and chemical composition. On request, Quality Control issues certificates for the metals used in your valves.' },
      { title: 'Test certificates', text: '100% of production is leak-tested on certified test benches according to European standards or customer specifications. On request we issue an inspection certificate with the type and parameters of the tests performed.' },
      { title: 'Product certifications – PED 2014/68/EU', text: 'Our valves are manufactured according to the European Pressure Equipment Directive 2014/68/EU and have been certified for performance, soundness and durability by qualified laboratories worldwide.' },
    ],
    galleryHeading: 'Certificates',
  },
  it: {
    title: 'Certificazioni – ISO 9001, ISO 14001, PED 2014/68/UE | Conti Valves',
    description: 'La qualità di Conti Rubinetterie: certificazione ISO 9001 dal 1999, gestione ambientale ISO 14001, valvole costruite secondo PED 2014/68/UE, certificati dei materiali EN 10204 e collaudo al 100%.',
    heading: 'Una qualità documentata',
    lead: 'Le nostre valvole sono progettate e prodotte nei nostri stabilimenti da personale esperto e collaudate una a una prima della spedizione. Oggi come 100 anni fa, la qualità del prodotto è al centro di ogni fase della produzione.',
    blocks: [
      { title: 'Certificazione aziendale – ISO 9001', text: 'Dal 1999 Conti Rubinetterie opera con un sistema di gestione qualità certificato UNI EN ISO 9001, oggi nell’edizione 2015.' },
      { title: 'Certificati dei materiali – EN 10204', text: 'Tutte le materie prime sono fornite con certificati secondo EN 10204 che ne attestano origine e composizione chimica. Su richiesta il Controllo Qualità rilascia i certificati dei metalli impiegati nelle vostre valvole.' },
      { title: 'Certificati di collaudo', text: 'Il 100% della produzione è sottoposto a prova di tenuta su banchi certificati secondo le norme europee o le specifiche del cliente. Su richiesta rilasciamo il certificato di collaudo con tipologia e parametri delle prove eseguite.' },
      { title: 'Certificazioni di prodotto – PED 2014/68/UE', text: 'Le nostre valvole sono costruite secondo la Direttiva europea Attrezzature a Pressione 2014/68/UE e sono state certificate per prestazioni, solidità e durata da laboratori qualificati in tutto il mondo.' },
    ],
    galleryHeading: 'Certificati',
  },
  fr: {
    title: 'Certifications – ISO 9001, ISO 14001, PED 2014/68/UE | Conti Valves',
    description: 'La qualité Conti Rubinetterie : certification ISO 9001 depuis 1999, management environnemental ISO 14001, robinets conformes à la PED 2014/68/UE, certificats matière EN 10204 et essais à 100 %.',
    heading: 'Une qualité documentée',
    lead: 'Nos robinets sont conçus et fabriqués dans nos usines par une équipe expérimentée et testés un par un avant expédition. Aujourd’hui comme il y a 100 ans, la qualité du produit est au cœur de chaque étape de la production.',
    blocks: [
      { title: 'Certification de l’entreprise – ISO 9001', text: 'Depuis 1999, Conti Rubinetterie dispose d’un système de management de la qualité certifié UNI EN ISO 9001, aujourd’hui dans sa version 2015.' },
      { title: 'Certificats matière – EN 10204', text: 'Toutes les matières premières sont livrées avec des certificats selon EN 10204 attestant leur origine et leur composition chimique. Sur demande, le contrôle qualité délivre les certificats des métaux utilisés pour vos robinets.' },
      { title: 'Certificats d’essai', text: '100 % de la production subit un essai d’étanchéité sur des bancs certifiés selon les normes européennes ou les spécifications du client. Sur demande, nous délivrons un certificat d’inspection précisant le type et les paramètres des essais.' },
      { title: 'Certifications produit – PED 2014/68/UE', text: 'Nos robinets sont fabriqués conformément à la directive européenne Équipements sous pression 2014/68/UE et ont été certifiés pour leurs performances, leur robustesse et leur durabilité par des laboratoires qualifiés dans le monde entier.' },
    ],
    galleryHeading: 'Certificats',
  },
  es: {
    title: 'Certificaciones – ISO 9001, ISO 14001, PED 2014/68/UE | Conti Valves',
    description: 'La calidad de Conti Rubinetterie: certificación ISO 9001 desde 1999, gestión ambiental ISO 14001, válvulas fabricadas según PED 2014/68/UE, certificados de materiales EN 10204 y pruebas al 100 %.',
    heading: 'Una calidad documentada',
    lead: 'Nuestras válvulas se diseñan y fabrican en nuestras propias plantas con un equipo experto y se prueban una a una antes del envío. Hoy, como hace 100 años, la calidad del producto está en el centro de cada fase de la producción.',
    blocks: [
      { title: 'Certificación de empresa – ISO 9001', text: 'Desde 1999 Conti Rubinetterie trabaja con un sistema de gestión de la calidad certificado según UNI EN ISO 9001, hoy en su edición 2015.' },
      { title: 'Certificados de materiales – EN 10204', text: 'Todas las materias primas se suministran con certificados según EN 10204 que acreditan su origen y composición química. Bajo pedido, Control de Calidad emite los certificados de los metales utilizados en sus válvulas.' },
      { title: 'Certificados de prueba', text: 'El 100 % de la producción se somete a una prueba de estanqueidad en bancos certificados según las normas europeas o las especificaciones del cliente. Bajo pedido emitimos el certificado de inspección con el tipo y los parámetros de las pruebas.' },
      { title: 'Certificaciones de producto – PED 2014/68/UE', text: 'Nuestras válvulas se fabrican conforme a la Directiva europea de Equipos a Presión 2014/68/UE y han sido certificadas por su rendimiento, solidez y durabilidad por laboratorios cualificados de todo el mundo.' },
    ],
    galleryHeading: 'Certificados',
  },
  de: {
    title: 'Zertifizierungen – ISO 9001, ISO 14001, PED 2014/68/EU | Conti Valves',
    description: 'Qualität von Conti Rubinetterie: ISO 9001 seit 1999, Umweltmanagement nach ISO 14001, Armaturen nach Druckgeräterichtlinie 2014/68/EU, Werkstoffzeugnisse nach EN 10204 und 100-%-Prüfung.',
    heading: 'Nachweisbare Qualität',
    lead: 'Unsere Armaturen werden in den eigenen Werken von einem erfahrenen Team konstruiert und gefertigt und vor dem Versand einzeln geprüft. Heute wie vor 100 Jahren steht die Produktqualität im Mittelpunkt jeder Fertigungsstufe.',
    blocks: [
      { title: 'Unternehmenszertifizierung – ISO 9001', text: 'Seit 1999 arbeitet Conti Rubinetterie mit einem nach UNI EN ISO 9001 zertifizierten Qualitätsmanagementsystem, heute in der Ausgabe 2015.' },
      { title: 'Werkstoffzeugnisse – EN 10204', text: 'Alle Rohstoffe werden mit Zeugnissen nach EN 10204 geliefert, die Herkunft und chemische Zusammensetzung belegen. Auf Wunsch stellt die Qualitätssicherung Zeugnisse für die in Ihren Armaturen verwendeten Metalle aus.' },
      { title: 'Prüfzeugnisse', text: '100 % der Produktion werden auf zertifizierten Prüfständen nach europäischen Normen oder Kundenvorgaben auf Dichtheit geprüft. Auf Wunsch erhalten Sie ein Abnahmeprüfzeugnis mit Art und Parametern der Prüfungen.' },
      { title: 'Produktzertifizierungen – PED 2014/68/EU', text: 'Unsere Armaturen werden gemäß der europäischen Druckgeräterichtlinie 2014/68/EU gefertigt und wurden von qualifizierten Prüfstellen weltweit auf Leistung, Festigkeit und Lebensdauer zertifiziert.' },
    ],
    galleryHeading: 'Zertifikate',
  },
};

/** Certificate images shown in the gallery (open full size). */
export const certificateImages = [
  { image: '2023/10/ISO-9001.jpg', label: 'UNI EN ISO 9001:2015' },
  { image: '2023/10/ISO-14001.jpg', label: 'UNI EN ISO 14001:2015' },
  { image: '2023/05/CE-BALL-VALVES-scaled.jpg', label: 'PED 2014/68/EU – Ball valves' },
  { image: '2023/05/CE-GATE-VALVES-scaled.jpg', label: 'PED 2014/68/EU – Gate valves' },
  { image: '2023/05/CE-GLOBE-VALVES-scaled.jpg', label: 'PED 2014/68/EU – Globe valves' },
  { image: '2021/05/CE-CHECK-VALVES.jpg', label: 'PED 2014/68/EU – Check valves' },
  { image: '2021/05/CE-PLUG-VALVES.jpg', label: 'PED 2014/68/EU – Plug valves' },
  { image: '2021/05/CE-Y-STRAINER.jpg', label: 'PED 2014/68/EU – Y strainers' },
];
