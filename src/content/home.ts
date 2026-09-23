import type { L } from '../i18n/config';

export interface Fact { value: string; label: string }
export interface Faq { q: string; a: string }

export const home: L<{
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  lead: string;
  facts: Fact[];
  quality: { heading: string; text: string };
  custom: { heading: string; text: string };
  productsHeading: string;
  productsText: string;
  environment: { heading: string; text: string; sun: string; water: string; air: string; sunText: string; waterText: string; airText: string };
  faqHeading: string;
  faq: Faq[];
}> = {
  en: {
    title: 'Conti Valves – bronze and brass industrial valves made in Italy since 1919',
    description: 'Conti Rubinetterie designs, casts, machines and 100% tests bronze and brass gate, globe, check, ball and plug valves in Valduggia, Italy. Family-owned since 1919, ISO 9001 and ISO 14001 certified.',
    eyebrow: 'Valve manufacturer since 1919',
    heading: 'Bronze and brass valves, built to last.',
    lead: 'Conti Rubinetterie designs, casts, machines, assembles and tests industrial valves in Valduggia, Italy – for shipbuilding, oil & gas, power, water and industrial plants in more than 50 countries.',
    facts: [
      { value: '1919', label: 'Founded in Valduggia by Giovanni Conti' },
      { value: '100%', label: 'of valves pressure-tested before shipping' },
      { value: '50+', label: 'countries supplied worldwide' },
      { value: '40%', label: 'of our energy comes from the sun' },
    ],
    quality: {
      heading: 'Guaranteed quality since 1919',
      text: 'For more than a century our goal has been to be our customers’ first choice in every market we serve: exceeding commitments, providing innovative solutions and keeping the highest standards of quality. Every step – from the in-house bronze foundry to final testing – happens under one roof.',
    },
    custom: {
      heading: 'Custom engineered solutions',
      text: 'Special alloys, end connections, bonnets, trims and packings: since 2006 our engineering division designs valves around your specification, backed by our own foundry and machining shop.',
    },
    productsHeading: 'Our products',
    productsText: '123 catalogue items in 11 families, from ⅛" to DN 250 and from PN10 to PN64. Each one has its own page with dimensions, weights and materials.',
    environment: {
      heading: 'Respecting the environment',
      text: 'Environmental responsibility is part of how we manufacture. Our Environmental Management System is certified to ISO 14001.',
      sun: 'Sun', water: 'Water', air: 'Air',
      sunText: 'With the POWERED BY THE SUN project, photovoltaic panels on our roofs provide 40% of our total energy needs.',
      waterText: 'Water used in the production process is purified through a filtration system and recycled.',
      airText: 'Fumes from the foundry are collected by a certified air-filtration system and returned cleaner to the environment.',
    },
    faqHeading: 'Frequently asked questions',
    faq: [
      { q: 'Where are Conti valves made?', a: 'All Conti valves are designed, cast, machined, assembled and tested in the company’s own plants in Valduggia (Vercelli), in Piedmont, northern Italy. The company has run its own bronze foundry since 1921.' },
      { q: 'Which materials does Conti use?', a: 'Bodies are cast in bronze CC491K (UNI EN 1982) or made of brass and DZR (dezincification-resistant) brass, with trims in stainless steel AISI 316, Monel 400 or aluminium bronze on request. An aluminium-bronze line is available for seawater and highly corrosive service.' },
      { q: 'What pressure ratings and sizes are available?', a: 'The standard range covers pressure ratings from PN10 to PN64 and sizes from ⅛" up to DN 250, depending on the valve type. Threaded valves are mostly offered from ¼" to 4", flanged valves from DN 15.' },
      { q: 'Which certifications does Conti hold?', a: 'The quality management system has been certified to UNI EN ISO 9001 since 1999 and the environmental management system to ISO 14001. Valves are manufactured according to the Pressure Equipment Directive PED 2014/68/EU, and material certificates to EN 10204 are available on request.' },
      { q: 'Can Conti manufacture custom valves?', a: 'Yes. The Custom Engineered Solutions division, founded in 2006, designs valves to customer specifications: special alloys, end connections, bonnets, trims, packings and operating parameters.' },
      { q: 'How can I request a quote or technical information?', a: 'Write to sales@contivalves.com for quotes and to ufficiotecnico@contivalves.com for technical questions, or call +39 0163 487704.' },
    ],
  },
  it: {
    title: 'Conti Valves – valvole industriali in bronzo e ottone made in Italy dal 1919',
    description: 'Conti Rubinetterie progetta, fonde, lavora e collauda al 100% saracinesche, valvole a globo, di ritegno, a sfera e rubinetti a maschio in bronzo e ottone a Valduggia. Azienda di famiglia dal 1919, certificata ISO 9001 e ISO 14001.',
    eyebrow: 'Produttori di valvole dal 1919',
    heading: 'Valvole in bronzo e ottone, costruite per durare.',
    lead: 'Conti Rubinetterie progetta, fonde, lavora, assembla e collauda valvole industriali a Valduggia – per l’industria navale, oil & gas, energia, acqua e impianti industriali in oltre 50 Paesi.',
    facts: [
      { value: '1919', label: 'Fondata a Valduggia da Giovanni Conti' },
      { value: '100%', label: 'delle valvole collaudate prima della spedizione' },
      { value: '50+', label: 'Paesi serviti nel mondo' },
      { value: '40%', label: 'della nostra energia arriva dal sole' },
    ],
    quality: {
      heading: 'Qualità garantita dal 1919',
      text: 'Da oltre cento anni il nostro obiettivo è essere la prima scelta dei clienti in ogni mercato servito, con valvole e soluzioni innovative caratterizzate dai più alti standard qualitativi. Ogni fase – dalla fonderia interna al collaudo finale – avviene sotto lo stesso tetto.',
    },
    custom: {
      heading: 'Soluzioni personalizzate',
      text: 'Leghe speciali, attacchi, coperchi, interni e guarnizioni: dal 2006 la nostra divisione tecnica progetta valvole su specifica del cliente, con il supporto della fonderia e dell’officina interne.',
    },
    productsHeading: 'I nostri prodotti',
    productsText: '123 articoli a catalogo in 11 famiglie, da ⅛" a DN 250 e da PN10 a PN64. Ognuno ha la sua pagina con dimensioni, pesi e materiali.',
    environment: {
      heading: 'Rispetto per l’ambiente',
      text: 'La responsabilità ambientale fa parte del nostro modo di produrre. Il nostro Sistema di Gestione Ambientale è certificato ISO 14001.',
      sun: 'Sole', water: 'Acqua', air: 'Aria',
      sunText: 'Con il progetto POWERED BY THE SUN i pannelli fotovoltaici sui nostri tetti coprono il 40% del fabbisogno energetico totale.',
      waterText: 'L’acqua utilizzata nel processo produttivo viene depurata con un sistema di filtrazione e riciclata.',
      airText: 'I fumi della fonderia sono captati da un impianto di filtrazione certificato e restituiti all’ambiente più puliti.',
    },
    faqHeading: 'Domande frequenti',
    faq: [
      { q: 'Dove vengono prodotte le valvole Conti?', a: 'Tutte le valvole Conti sono progettate, fuse, lavorate, assemblate e collaudate negli stabilimenti di Valduggia (Vercelli), in Piemonte. L’azienda dispone di una propria fonderia di bronzo dal 1921.' },
      { q: 'Quali materiali utilizza Conti?', a: 'I corpi sono fusi in bronzo CC491K (UNI EN 1982) o realizzati in ottone e ottone DZR (resistente alla dezincificazione), con interni in acciaio inox AISI 316, Monel 400 o bronzo-alluminio a richiesta. Per acqua di mare e fluidi molto corrosivi è disponibile una linea in bronzo-alluminio.' },
      { q: 'Quali pressioni e misure sono disponibili?', a: 'La gamma standard copre pressioni nominali da PN10 a PN64 e misure da ⅛" fino a DN 250, a seconda della tipologia di valvola. Le valvole filettate vanno per lo più da ¼" a 4", quelle flangiate partono da DN 15.' },
      { q: 'Quali certificazioni ha Conti?', a: 'Il sistema di gestione qualità è certificato UNI EN ISO 9001 dal 1999 e il sistema di gestione ambientale ISO 14001. Le valvole sono costruite secondo la Direttiva Attrezzature a Pressione PED 2014/68/UE e su richiesta sono disponibili i certificati dei materiali secondo EN 10204.' },
      { q: 'Conti realizza valvole personalizzate?', a: 'Sì. La divisione Custom Engineered Solutions, nata nel 2006, progetta valvole su specifica del cliente: leghe speciali, attacchi, coperchi, interni, guarnizioni e parametri di esercizio.' },
      { q: 'Come posso richiedere un preventivo o informazioni tecniche?', a: 'Scrivete a sales@contivalves.com per i preventivi e a ufficiotecnico@contivalves.com per le domande tecniche, oppure chiamate il +39 0163 487704.' },
    ],
  },
  fr: {
    title: 'Conti Valves – robinetterie industrielle en bronze et laiton fabriquée en Italie depuis 1919',
    description: 'Conti Rubinetterie conçoit, fond, usine et teste à 100 % des robinets-vannes, robinets à soupape, clapets, robinets à tournant sphérique et à boisseau en bronze et laiton à Valduggia (Italie). Entreprise familiale depuis 1919, certifiée ISO 9001 et ISO 14001.',
    eyebrow: 'Fabricant de robinetterie depuis 1919',
    heading: 'Une robinetterie en bronze et laiton, faite pour durer.',
    lead: 'Conti Rubinetterie conçoit, fond, usine, assemble et teste sa robinetterie industrielle à Valduggia, en Italie – pour la construction navale, le pétrole et le gaz, l’énergie, l’eau et l’industrie dans plus de 50 pays.',
    facts: [
      { value: '1919', label: 'Fondée à Valduggia par Giovanni Conti' },
      { value: '100 %', label: 'des robinets testés sous pression avant expédition' },
      { value: '50+', label: 'pays livrés dans le monde' },
      { value: '40 %', label: 'de notre énergie vient du soleil' },
    ],
    quality: {
      heading: 'Une qualité garantie depuis 1919',
      text: 'Depuis plus d’un siècle, notre objectif est d’être le premier choix de nos clients sur chaque marché, avec des produits et des solutions innovantes conformes aux plus hauts standards de qualité. Chaque étape – de la fonderie intégrée aux essais finaux – se déroule sous un même toit.',
    },
    custom: {
      heading: 'Solutions sur mesure',
      text: 'Alliages spéciaux, raccordements, chapeaux, garnitures et presse-étoupes : depuis 2006, notre division d’ingénierie conçoit des robinets selon votre cahier des charges, avec l’appui de notre fonderie et de notre atelier d’usinage.',
    },
    productsHeading: 'Nos produits',
    productsText: '123 articles au catalogue répartis en 11 familles, de ⅛" à DN 250 et de PN10 à PN64. Chacun dispose de sa page avec dimensions, poids et matériaux.',
    environment: {
      heading: 'Respect de l’environnement',
      text: 'La responsabilité environnementale fait partie de notre façon de produire. Notre système de management environnemental est certifié ISO 14001.',
      sun: 'Soleil', water: 'Eau', air: 'Air',
      sunText: 'Avec le projet POWERED BY THE SUN, les panneaux photovoltaïques installés sur nos toits couvrent 40 % de nos besoins énergétiques.',
      waterText: 'L’eau utilisée dans le processus de fabrication est épurée par un système de filtration, puis recyclée.',
      airText: 'Les fumées de la fonderie sont captées par un système de filtration de l’air certifié et rejetées plus propres dans l’environnement.',
    },
    faqHeading: 'Questions fréquentes',
    faq: [
      { q: 'Où sont fabriqués les robinets Conti ?', a: 'Tous les robinets Conti sont conçus, fondus, usinés, assemblés et testés dans les usines de l’entreprise à Valduggia (Verceil), dans le Piémont, en Italie du Nord. L’entreprise possède sa propre fonderie de bronze depuis 1921.' },
      { q: 'Quels matériaux Conti utilise-t-il ?', a: 'Les corps sont coulés en bronze CC491K (UNI EN 1982) ou réalisés en laiton et en laiton DZR (résistant à la dézincification), avec des garnitures en acier inoxydable AISI 316, Monel 400 ou bronze-aluminium sur demande. Une gamme en bronze-aluminium est proposée pour l’eau de mer et les fluides très corrosifs.' },
      { q: 'Quelles pressions et dimensions sont disponibles ?', a: 'La gamme standard couvre des pressions nominales de PN10 à PN64 et des dimensions de ⅛" à DN 250, selon le type de robinet. Les versions taraudées vont généralement de ¼" à 4", les versions à brides commencent à DN 15.' },
      { q: 'Quelles certifications Conti possède-t-il ?', a: 'Le système de management de la qualité est certifié UNI EN ISO 9001 depuis 1999 et le système de management environnemental ISO 14001. Les robinets sont fabriqués conformément à la directive Équipements sous pression PED 2014/68/UE ; des certificats matière selon EN 10204 sont disponibles sur demande.' },
      { q: 'Conti fabrique-t-il des robinets sur mesure ?', a: 'Oui. La division Custom Engineered Solutions, créée en 2006, conçoit des robinets selon les spécifications du client : alliages spéciaux, raccordements, chapeaux, garnitures, presse-étoupes et conditions de service.' },
      { q: 'Comment demander un devis ou des informations techniques ?', a: 'Écrivez à sales@contivalves.com pour un devis et à ufficiotecnico@contivalves.com pour les questions techniques, ou appelez le +39 0163 487704.' },
    ],
  },
  es: {
    title: 'Conti Valves – válvulas industriales de bronce y latón fabricadas en Italia desde 1919',
    description: 'Conti Rubinetterie diseña, funde, mecaniza y prueba al 100 % válvulas de compuerta, de globo, de retención, de bola y de macho de bronce y latón en Valduggia (Italia). Empresa familiar desde 1919, certificada ISO 9001 e ISO 14001.',
    eyebrow: 'Fabricante de válvulas desde 1919',
    heading: 'Válvulas de bronce y latón, hechas para durar.',
    lead: 'Conti Rubinetterie diseña, funde, mecaniza, monta y prueba válvulas industriales en Valduggia, Italia, para la industria naval, petróleo y gas, energía, agua y plantas industriales en más de 50 países.',
    facts: [
      { value: '1919', label: 'Fundada en Valduggia por Giovanni Conti' },
      { value: '100 %', label: 'de las válvulas probadas antes del envío' },
      { value: '50+', label: 'países atendidos en todo el mundo' },
      { value: '40 %', label: 'de nuestra energía procede del sol' },
    ],
    quality: {
      heading: 'Calidad garantizada desde 1919',
      text: 'Desde hace más de un siglo nuestro objetivo es ser la primera opción de nuestros clientes en cada mercado, con productos y soluciones innovadoras que cumplen los más altos estándares de calidad. Cada fase, desde la fundición propia hasta la prueba final, se realiza bajo el mismo techo.',
    },
    custom: {
      heading: 'Soluciones a medida',
      text: 'Aleaciones especiales, conexiones, bonetes, internos y empaquetaduras: desde 2006 nuestra división de ingeniería diseña válvulas según su especificación, con el respaldo de nuestra fundición y taller de mecanizado.',
    },
    productsHeading: 'Nuestros productos',
    productsText: '123 artículos de catálogo en 11 familias, de ⅛" a DN 250 y de PN10 a PN64. Cada uno tiene su propia página con dimensiones, pesos y materiales.',
    environment: {
      heading: 'Respeto por el medio ambiente',
      text: 'La responsabilidad ambiental forma parte de nuestra manera de fabricar. Nuestro sistema de gestión ambiental está certificado según ISO 14001.',
      sun: 'Sol', water: 'Agua', air: 'Aire',
      sunText: 'Con el proyecto POWERED BY THE SUN, los paneles fotovoltaicos de nuestras cubiertas aportan el 40 % de nuestra demanda energética total.',
      waterText: 'El agua utilizada en el proceso de producción se depura mediante un sistema de filtración y se recicla.',
      airText: 'Los humos de la fundición se captan con un sistema certificado de filtración de aire y vuelven más limpios al medio ambiente.',
    },
    faqHeading: 'Preguntas frecuentes',
    faq: [
      { q: '¿Dónde se fabrican las válvulas Conti?', a: 'Todas las válvulas Conti se diseñan, funden, mecanizan, montan y prueban en las plantas de la empresa en Valduggia (Vercelli), en el Piamonte, norte de Italia. La empresa cuenta con fundición propia de bronce desde 1921.' },
      { q: '¿Qué materiales utiliza Conti?', a: 'Los cuerpos se funden en bronce CC491K (UNI EN 1982) o se fabrican en latón y latón DZR (resistente a la descincificación), con internos de acero inoxidable AISI 316, Monel 400 o bronce-aluminio bajo pedido. Para agua de mar y fluidos muy corrosivos existe una línea de bronce-aluminio.' },
      { q: '¿Qué presiones y medidas están disponibles?', a: 'La gama estándar cubre presiones nominales de PN10 a PN64 y medidas de ⅛" a DN 250, según el tipo de válvula. Las válvulas roscadas van por lo general de ¼" a 4"; las bridadas empiezan en DN 15.' },
      { q: '¿Qué certificaciones tiene Conti?', a: 'El sistema de gestión de la calidad está certificado según UNI EN ISO 9001 desde 1999 y el sistema de gestión ambiental según ISO 14001. Las válvulas se fabrican conforme a la Directiva de Equipos a Presión PED 2014/68/UE y, bajo pedido, se entregan certificados de materiales según EN 10204.' },
      { q: '¿Fabrica Conti válvulas a medida?', a: 'Sí. La división Custom Engineered Solutions, creada en 2006, diseña válvulas según las especificaciones del cliente: aleaciones especiales, conexiones, bonetes, internos, empaquetaduras y condiciones de servicio.' },
      { q: '¿Cómo puedo solicitar un presupuesto o información técnica?', a: 'Escriba a sales@contivalves.com para presupuestos y a ufficiotecnico@contivalves.com para consultas técnicas, o llame al +39 0163 487704.' },
    ],
  },
  de: {
    title: 'Conti Valves – Industriearmaturen aus Bronze und Messing, hergestellt in Italien seit 1919',
    description: 'Conti Rubinetterie konstruiert, gießt, bearbeitet und prüft zu 100 % Absperrschieber, Absperrventile, Rückschlagventile, Kugel- und Kükenhähne aus Bronze und Messing in Valduggia (Italien). Familienunternehmen seit 1919, zertifiziert nach ISO 9001 und ISO 14001.',
    eyebrow: 'Armaturenhersteller seit 1919',
    heading: 'Armaturen aus Bronze und Messing – gebaut für Jahrzehnte.',
    lead: 'Conti Rubinetterie konstruiert, gießt, bearbeitet, montiert und prüft Industriearmaturen in Valduggia, Italien – für Schiffbau, Öl und Gas, Energie, Wasser und Industrieanlagen in über 50 Ländern.',
    facts: [
      { value: '1919', label: 'in Valduggia von Giovanni Conti gegründet' },
      { value: '100 %', label: 'der Armaturen vor dem Versand druckgeprüft' },
      { value: '50+', label: 'belieferte Länder weltweit' },
      { value: '40 %', label: 'unserer Energie liefert die Sonne' },
    ],
    quality: {
      heading: 'Garantierte Qualität seit 1919',
      text: 'Seit über hundert Jahren ist es unser Ziel, in jedem Markt die erste Wahl unserer Kunden zu sein – mit innovativen Produkten und Lösungen nach höchsten Qualitätsstandards. Jeder Schritt, von der eigenen Bronzegießerei bis zur Endprüfung, findet unter einem Dach statt.',
    },
    custom: {
      heading: 'Sonderlösungen nach Maß',
      text: 'Sonderlegierungen, Anschlüsse, Oberteile, Innengarnituren und Packungen: Seit 2006 konstruiert unsere Engineering-Abteilung Armaturen nach Ihrer Spezifikation – mit eigener Gießerei und mechanischer Fertigung im Rücken.',
    },
    productsHeading: 'Unsere Produkte',
    productsText: '123 Katalogartikel in 11 Produktfamilien, von ⅛" bis DN 250 und von PN10 bis PN64. Jeder Artikel hat eine eigene Seite mit Abmessungen, Gewichten und Werkstoffen.',
    environment: {
      heading: 'Umweltschutz',
      text: 'Verantwortung für die Umwelt gehört zu unserer Art zu produzieren. Unser Umweltmanagementsystem ist nach ISO 14001 zertifiziert.',
      sun: 'Sonne', water: 'Wasser', air: 'Luft',
      sunText: 'Mit dem Projekt POWERED BY THE SUN decken Photovoltaikmodule auf unseren Dächern 40 % unseres gesamten Energiebedarfs.',
      waterText: 'Das im Produktionsprozess eingesetzte Wasser wird über ein Filtersystem gereinigt und wiederverwendet.',
      airText: 'Die Abgase der Gießerei werden von einer zertifizierten Luftfilteranlage erfasst und gereinigt an die Umwelt abgegeben.',
    },
    faqHeading: 'Häufige Fragen',
    faq: [
      { q: 'Wo werden Conti-Armaturen hergestellt?', a: 'Alle Conti-Armaturen werden in den eigenen Werken in Valduggia (Vercelli) im Piemont, Norditalien, konstruiert, gegossen, bearbeitet, montiert und geprüft. Das Unternehmen betreibt seit 1921 eine eigene Bronzegießerei.' },
      { q: 'Welche Werkstoffe verwendet Conti?', a: 'Die Gehäuse werden aus Bronze CC491K (UNI EN 1982) gegossen oder aus Messing bzw. entzinkungsbeständigem DZR-Messing gefertigt; Innengarnituren aus Edelstahl AISI 316, Monel 400 oder Aluminiumbronze sind auf Anfrage lieferbar. Für Meerwasser und stark korrosive Medien gibt es eine eigene Aluminiumbronze-Baureihe.' },
      { q: 'Welche Druckstufen und Nennweiten sind lieferbar?', a: 'Das Standardprogramm deckt Nenndrücke von PN10 bis PN64 und Nennweiten von ⅛" bis DN 250 ab – je nach Armaturentyp. Gewindearmaturen reichen meist von ¼" bis 4", Flanscharmaturen beginnen bei DN 15.' },
      { q: 'Welche Zertifizierungen hat Conti?', a: 'Das Qualitätsmanagementsystem ist seit 1999 nach UNI EN ISO 9001 zertifiziert, das Umweltmanagementsystem nach ISO 14001. Die Armaturen werden gemäß Druckgeräterichtlinie PED 2014/68/EU gefertigt; Werkstoffzeugnisse nach EN 10204 sind auf Anfrage erhältlich.' },
      { q: 'Fertigt Conti Sonderarmaturen?', a: 'Ja. Die 2006 gegründete Abteilung Custom Engineered Solutions konstruiert Armaturen nach Kundenspezifikation: Sonderlegierungen, Anschlüsse, Oberteile, Innengarnituren, Packungen und Betriebsbedingungen.' },
      { q: 'Wie erhalte ich ein Angebot oder technische Informationen?', a: 'Schreiben Sie an sales@contivalves.com für Angebote und an ufficiotecnico@contivalves.com für technische Fragen oder rufen Sie +39 0163 487704 an.' },
    ],
  },
};
