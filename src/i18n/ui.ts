import type { L, Locale } from './config';

export const ui = {
  'nav.products': { en: 'Products', it: 'Prodotti', fr: 'Produits', es: 'Productos', de: 'Produkte' },
  'nav.company': { en: 'Company', it: 'Azienda', fr: 'Entreprise', es: 'Empresa', de: 'Unternehmen' },
  'nav.companyOverview': { en: 'About Conti', it: 'Chi siamo', fr: 'Qui sommes-nous', es: 'Quiénes somos', de: 'Über Conti' },
  'nav.history': { en: 'History', it: 'Storia', fr: 'Histoire', es: 'Historia', de: 'Geschichte' },
  'nav.production': { en: 'Production process', it: 'Produzione', fr: 'Production', es: 'Producción', de: 'Produktion' },
  'nav.certifications': { en: 'Certifications', it: 'Certificazioni', fr: 'Certifications', es: 'Certificaciones', de: 'Zertifizierungen' },
  'nav.environment': { en: 'Environment', it: 'Ambiente', fr: 'Environnement', es: 'Medio ambiente', de: 'Umwelt' },
  'nav.applications': { en: 'Applications', it: 'Applicazioni', fr: 'Applications', es: 'Aplicaciones', de: 'Anwendungen' },
  'nav.industries': { en: 'Industries we serve', it: 'Settori di applicazione', fr: 'Secteurs d’application', es: 'Sectores de aplicación', de: 'Branchen' },
  'nav.custom': { en: 'Custom engineered solutions', it: 'Soluzioni personalizzate', fr: 'Solutions sur mesure', es: 'Soluciones a medida', de: 'Sonderlösungen' },
  'nav.alubronze': { en: 'Aluminium bronze valves', it: 'Valvole in bronzo-alluminio', fr: 'Robinetterie en bronze-aluminium', es: 'Válvulas de bronce-aluminio', de: 'Armaturen aus Aluminiumbronze' },
  'nav.literature': { en: 'Literature', it: 'Documentazione', fr: 'Documentation', es: 'Documentación', de: 'Dokumentation' },
  'nav.news': { en: 'News', it: 'News', fr: 'Actualités', es: 'Noticias', de: 'Aktuelles' },
  'nav.contact': { en: 'Contact', it: 'Contatti', fr: 'Contact', es: 'Contacto', de: 'Kontakt' },
  'nav.privacy': { en: 'Privacy policy', it: 'Privacy policy', fr: 'Politique de confidentialité', es: 'Política de privacidad', de: 'Datenschutz' },
  'nav.home': { en: 'Home', it: 'Home', fr: 'Accueil', es: 'Inicio', de: 'Startseite' },
  'nav.menu': { en: 'Menu', it: 'Menu', fr: 'Menu', es: 'Menú', de: 'Menü' },
  'nav.close': { en: 'Close', it: 'Chiudi', fr: 'Fermer', es: 'Cerrar', de: 'Schließen' },
  'nav.allProducts': { en: 'All products', it: 'Tutti i prodotti', fr: 'Tous les produits', es: 'Todos los productos', de: 'Alle Produkte' },
  'nav.skip': { en: 'Skip to content', it: 'Vai al contenuto', fr: 'Aller au contenu', es: 'Ir al contenido', de: 'Zum Inhalt' },
  'nav.language': { en: 'Language', it: 'Lingua', fr: 'Langue', es: 'Idioma', de: 'Sprache' },
  'nav.breadcrumb': { en: 'Breadcrumb', it: 'Percorso', fr: 'Fil d’Ariane', es: 'Ruta', de: 'Brotkrümelnavigation' },

  'cta.contact': { en: 'Contact us', it: 'Contattaci', fr: 'Nous contacter', es: 'Contáctenos', de: 'Kontakt aufnehmen' },
  'cta.quote': { en: 'Request a quote', it: 'Richiedi un preventivo', fr: 'Demander un devis', es: 'Solicitar presupuesto', de: 'Angebot anfordern' },
  'cta.discover': { en: 'Discover more', it: 'Scopri di più', fr: 'En savoir plus', es: 'Saber más', de: 'Mehr erfahren' },
  'cta.viewRange': { en: 'View the range', it: 'Vedi la gamma', fr: 'Voir la gamme', es: 'Ver la gama', de: 'Zum Sortiment' },
  'cta.print': { en: 'Print / save as PDF', it: 'Stampa / salva in PDF', fr: 'Imprimer / enregistrer en PDF', es: 'Imprimir / guardar en PDF', de: 'Drucken / als PDF speichern' },
  'cta.datasheet': { en: 'Download datasheet (PDF)', it: 'Scarica la scheda tecnica (PDF)', fr: 'Télécharger la fiche technique (PDF)', es: 'Descargar la ficha técnica (PDF)', de: 'Datenblatt herunterladen (PDF)' },
  'cta.download': { en: 'Download', it: 'Scarica', fr: 'Télécharger', es: 'Descargar', de: 'Herunterladen' },

  'product.code': { en: 'Item', it: 'Articolo', fr: 'Article', es: 'Artículo', de: 'Artikel' },
  'product.rating': { en: 'Pressure rating', it: 'Pressione nominale', fr: 'Pression nominale', es: 'Presión nominal', de: 'Nenndruck' },
  'product.family': { en: 'Product family', it: 'Famiglia', fr: 'Famille', es: 'Familia', de: 'Produktfamilie' },
  'product.type': { en: 'Type', it: 'Tipologia', fr: 'Type', es: 'Tipo', de: 'Bauart' },
  'product.bodyMaterial': { en: 'Body material', it: 'Materiale del corpo', fr: 'Matériau du corps', es: 'Material del cuerpo', de: 'Gehäusewerkstoff' },
  'product.sizes': { en: 'Sizes', it: 'Misure', fr: 'Dimensions nominales', es: 'Medidas', de: 'Nennweiten' },
  'product.size': { en: 'Size', it: 'Misura', fr: 'Dimension', es: 'Medida', de: 'Größe' },
  'product.dimensions': { en: 'Dimensions and weights', it: 'Dimensioni e pesi', fr: 'Dimensions et poids', es: 'Dimensiones y pesos', de: 'Abmessungen und Gewichte' },
  'product.dimensionsNote': { en: 'Dimensions in mm, weights in kg. Letters refer to the technical drawing.', it: 'Dimensioni in mm, pesi in kg. Le lettere si riferiscono al disegno tecnico.', fr: 'Dimensions en mm, poids en kg. Les lettres renvoient au dessin technique.', es: 'Dimensiones en mm, pesos en kg. Las letras remiten al dibujo técnico.', de: 'Abmessungen in mm, Gewichte in kg. Die Buchstaben beziehen sich auf die technische Zeichnung.' },
  'product.materials': { en: 'Materials', it: 'Materiali', fr: 'Matériaux', es: 'Materiales', de: 'Werkstoffe' },
  'product.part': { en: 'Component', it: 'Componente', fr: 'Composant', es: 'Componente', de: 'Bauteil' },
  'product.material': { en: 'Material', it: 'Materiale', fr: 'Matériau', es: 'Material', de: 'Werkstoff' },
  'product.variants': { en: 'Available versions', it: 'Versioni disponibili', fr: 'Versions disponibles', es: 'Versiones disponibles', de: 'Lieferbare Ausführungen' },
  'product.variant': { en: 'Version', it: 'Versione', fr: 'Version', es: 'Versión', de: 'Ausführung' },
  'product.drawing': { en: 'Technical drawing', it: 'Disegno tecnico', fr: 'Dessin technique', es: 'Dibujo técnico', de: 'Technische Zeichnung' },
  'product.related': { en: 'Related products', it: 'Prodotti correlati', fr: 'Produits associés', es: 'Productos relacionados', de: 'Ähnliche Produkte' },
  'product.custom': { en: 'Need a different alloy, end connection or trim? Every Conti valve can be engineered to your specification.', it: 'Serve una lega, un attacco o un interno diverso? Ogni valvola Conti può essere realizzata su vostra specifica.', fr: 'Besoin d’un autre alliage, raccordement ou garniture ? Chaque robinet Conti peut être réalisé selon votre cahier des charges.', es: '¿Necesita otra aleación, conexión o interno? Cada válvula Conti puede fabricarse según su especificación.', de: 'Andere Legierung, anderer Anschluss oder andere Innengarnitur? Jede Conti-Armatur kann nach Ihrer Spezifikation gefertigt werden.' },
  'product.madeIn': { en: 'Cast, machined, assembled and 100% tested in Valduggia, Italy.', it: 'Fuso, lavorato, assemblato e collaudato al 100% a Valduggia, Italia.', fr: 'Fondu, usiné, assemblé et testé à 100 % à Valduggia, Italie.', es: 'Fundido, mecanizado, montado y probado al 100 % en Valduggia, Italia.', de: 'Gegossen, bearbeitet, montiert und zu 100 % geprüft in Valduggia, Italien.' },
  'product.count': { en: 'items', it: 'articoli', fr: 'articles', es: 'artículos', de: 'Artikel' },
  'product.quoteSubject': { en: 'Quote request', it: 'Richiesta preventivo', fr: 'Demande de devis', es: 'Solicitud de presupuesto', de: 'Angebotsanfrage' },

  'footer.tagline': { en: 'Valve manufacturer since 1919', it: 'Produttori di valvole dal 1919', fr: 'Fabricant de robinetterie depuis 1919', es: 'Fabricante de válvulas desde 1919', de: 'Armaturenhersteller seit 1919' },
  'footer.vat': { en: 'VAT no.', it: 'P. IVA', fr: 'N° TVA', es: 'NIF-IVA', de: 'USt-IdNr.' },
  'footer.rights': { en: 'All rights reserved.', it: 'Tutti i diritti riservati.', fr: 'Tous droits réservés.', es: 'Todos los derechos reservados.', de: 'Alle Rechte vorbehalten.' },

  'contact.address': { en: 'Address', it: 'Indirizzo', fr: 'Adresse', es: 'Dirección', de: 'Adresse' },
  'contact.phone': { en: 'Phone', it: 'Telefono', fr: 'Téléphone', es: 'Teléfono', de: 'Telefon' },
  'contact.email': { en: 'E-mail', it: 'E-mail', fr: 'E-mail', es: 'Correo electrónico', de: 'E-Mail' },
  'contact.general': { en: 'General enquiries', it: 'Informazioni generali', fr: 'Renseignements généraux', es: 'Información general', de: 'Allgemeine Anfragen' },
  'contact.sales': { en: 'Sales department', it: 'Ufficio commerciale', fr: 'Service commercial', es: 'Departamento comercial', de: 'Vertrieb' },
  'contact.accounting': { en: 'Accounting & shipping', it: 'Amministrazione e spedizioni', fr: 'Comptabilité et expéditions', es: 'Administración y envíos', de: 'Buchhaltung und Versand' },
  'contact.technical': { en: 'Technical department', it: 'Ufficio tecnico', fr: 'Bureau technique', es: 'Oficina técnica', de: 'Technische Abteilung' },
  'contact.map': { en: 'Open in Google Maps', it: 'Apri in Google Maps', fr: 'Ouvrir dans Google Maps', es: 'Abrir en Google Maps', de: 'In Google Maps öffnen' },

  'news.readMore': { en: 'Read more', it: 'Leggi tutto', fr: 'Lire la suite', es: 'Leer más', de: 'Weiterlesen' },
  'notFound.title': { en: 'Page not found', it: 'Pagina non trovata', fr: 'Page introuvable', es: 'Página no encontrada', de: 'Seite nicht gefunden' },
  'notFound.text': { en: 'The page you are looking for has moved or no longer exists. Try the product catalogue or the home page.', it: 'La pagina che cerchi è stata spostata o non esiste più. Prova dal catalogo prodotti o dalla home page.', fr: 'La page recherchée a été déplacée ou n’existe plus. Essayez le catalogue ou la page d’accueil.', es: 'La página que busca se ha movido o ya no existe. Pruebe desde el catálogo o la página de inicio.', de: 'Die gesuchte Seite wurde verschoben oder existiert nicht mehr. Versuchen Sie es über den Produktkatalog oder die Startseite.' },
  'media.missing': { en: 'Image coming soon', it: 'Immagine in arrivo', fr: 'Image à venir', es: 'Imagen próximamente', de: 'Bild folgt' },
} satisfies Record<string, L>;

export type UiKey = keyof typeof ui;

export function useT(lang: Locale) {
  return (key: UiKey) => ui[key][lang];
}
