import type { L } from '../i18n/config';

/**
 * Privacy policy for the static site (no cookies, no analytics, no forms).
 * DRAFT – to be reviewed by the company’s legal/privacy advisor before going live.
 * Keep it in sync with what the site really does (e.g. if analytics or a contact form are added).
 */
export const privacy: L<{ title: string; description: string; heading: string; updated: string; sections: { h: string; p: string[] }[] }> = {
  en: {
    title: 'Privacy policy | Conti Valves',
    description: 'How Conti Rubinetterie processes personal data on contivalves.com: no cookies, no tracking, e-mail enquiries only.',
    heading: 'Privacy policy',
    updated: 'Last updated',
    sections: [
      { h: 'Data controller', p: ['Conti Rubinetterie di Conti Giorgio & C. s.a.s., Via Astabbio 5, 13018 Valduggia (VC), Italy – info@contivalves.com. This notice is given under Articles 13 and 14 of Regulation (EU) 2016/679 (GDPR).'] },
      { h: 'No cookies, no tracking', p: ['This website does not use cookies, analytics or advertising trackers and does not load fonts, maps or other content from third parties while you browse. That is why you do not see a cookie banner.'] },
      { h: 'Technical data', p: ['To deliver the pages, our hosting provider automatically records technical logs (IP address, date and time, requested page, browser type). They are processed only to operate and protect the site, on the basis of our legitimate interest (Art. 6(1)(f) GDPR), and deleted after a short period, unless needed to investigate abuse.'] },
      { h: 'E-mails and phone calls', p: ['If you write to one of our e-mail addresses or call us, we use the data you provide (name, company, contact details, content of the request) only to answer you and, where relevant, to prepare a quote or perform a contract (Art. 6(1)(b) GDPR). Data are kept for as long as needed for that purpose and for the periods required by law (e.g. tax and accounting records).'] },
      { h: 'Video', p: ['The production page contains a YouTube video that is loaded only if you click on it. From that moment YouTube (Google Ireland Ltd.) may process data according to its own privacy policy.'] },
      { h: 'Recipients', p: ['Data may be processed by staff authorised by the controller and by service providers acting as processors (hosting, IT and e-mail providers). They are not sold or disclosed to third parties for marketing.'] },
      { h: 'Your rights', p: ['You can ask for access to, rectification or erasure of your data, restriction of or objection to processing, and data portability (Articles 15–22 GDPR) by writing to info@contivalves.com. You also have the right to lodge a complaint with the Italian data protection authority (Garante per la protezione dei dati personali, www.garanteprivacy.it).'] },
    ],
  },
  it: {
    title: 'Informativa privacy | Conti Valves',
    description: 'Come Conti Rubinetterie tratta i dati personali su contivalves.com: nessun cookie, nessun tracciamento, solo richieste via e-mail.',
    heading: 'Informativa privacy',
    updated: 'Ultimo aggiornamento',
    sections: [
      { h: 'Titolare del trattamento', p: ['Conti Rubinetterie di Conti Giorgio & C. s.a.s., Via Astabbio 5, 13018 Valduggia (VC) – info@contivalves.com. La presente informativa è resa ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (GDPR).'] },
      { h: 'Nessun cookie, nessun tracciamento', p: ['Questo sito non utilizza cookie, strumenti di statistica o tracciamento pubblicitario e durante la navigazione non carica font, mappe o altri contenuti da terze parti. Per questo non trovate un banner cookie.'] },
      { h: 'Dati tecnici di navigazione', p: ['Per erogare le pagine, il fornitore di hosting registra automaticamente log tecnici (indirizzo IP, data e ora, pagina richiesta, tipo di browser). Sono trattati solo per il funzionamento e la sicurezza del sito, sulla base del legittimo interesse (art. 6, par. 1, lett. f GDPR), e cancellati dopo un breve periodo, salvo necessità di accertare abusi.'] },
      { h: 'E-mail e telefonate', p: ['Se ci scrivete a uno dei nostri indirizzi e-mail o ci telefonate, utilizziamo i dati forniti (nome, azienda, recapiti, contenuto della richiesta) solo per rispondervi e, se del caso, per formulare un’offerta o eseguire un contratto (art. 6, par. 1, lett. b GDPR). I dati sono conservati per il tempo necessario a tale scopo e per i periodi previsti dalla legge (ad esempio obblighi fiscali e contabili).'] },
      { h: 'Video', p: ['La pagina Produzione contiene un video YouTube che viene caricato solo se ci cliccate sopra. Da quel momento YouTube (Google Ireland Ltd.) può trattare dati secondo la propria informativa.'] },
      { h: 'Destinatari', p: ['I dati possono essere trattati da personale autorizzato dal titolare e da fornitori che agiscono come responsabili del trattamento (hosting, servizi informatici e di posta elettronica). Non sono venduti né comunicati a terzi per finalità di marketing.'] },
      { h: 'I vostri diritti', p: ['Potete chiedere l’accesso, la rettifica o la cancellazione dei dati, la limitazione o l’opposizione al trattamento e la portabilità (artt. 15–22 GDPR) scrivendo a info@contivalves.com. Avete inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).'] },
    ],
  },
  fr: {
    title: 'Politique de confidentialité | Conti Valves',
    description: 'Comment Conti Rubinetterie traite les données personnelles sur contivalves.com : pas de cookies, pas de suivi, uniquement des demandes par e-mail.',
    heading: 'Politique de confidentialité',
    updated: 'Dernière mise à jour',
    sections: [
      { h: 'Responsable du traitement', p: ['Conti Rubinetterie di Conti Giorgio & C. s.a.s., Via Astabbio 5, 13018 Valduggia (VC), Italie – info@contivalves.com. La présente information est fournie en application des articles 13 et 14 du règlement (UE) 2016/679 (RGPD).'] },
      { h: 'Ni cookies, ni suivi', p: ['Ce site n’utilise ni cookies, ni outils de mesure d’audience, ni traceurs publicitaires et ne charge pas de polices, cartes ou autres contenus de tiers pendant la navigation. C’est pourquoi aucun bandeau cookies n’apparaît.'] },
      { h: 'Données techniques', p: ['Pour afficher les pages, notre hébergeur enregistre automatiquement des journaux techniques (adresse IP, date et heure, page demandée, type de navigateur). Ils sont traités uniquement pour le fonctionnement et la sécurité du site, sur la base de notre intérêt légitime (art. 6, par. 1, point f RGPD), et supprimés après une courte durée, sauf nécessité d’enquêter sur un abus.'] },
      { h: 'E-mails et appels', p: ['Si vous nous écrivez ou nous appelez, nous utilisons les données fournies (nom, société, coordonnées, contenu de la demande) uniquement pour vous répondre et, le cas échéant, établir une offre ou exécuter un contrat (art. 6, par. 1, point b RGPD). Elles sont conservées le temps nécessaire à cette fin et pendant les durées imposées par la loi (obligations comptables et fiscales).'] },
      { h: 'Vidéo', p: ['La page Production contient une vidéo YouTube qui n’est chargée que si vous cliquez dessus. À partir de ce moment, YouTube (Google Ireland Ltd.) peut traiter des données selon sa propre politique de confidentialité.'] },
      { h: 'Destinataires', p: ['Les données peuvent être traitées par le personnel autorisé et par des prestataires agissant en tant que sous-traitants (hébergement, informatique, messagerie). Elles ne sont ni vendues ni communiquées à des tiers à des fins de marketing.'] },
      { h: 'Vos droits', p: ['Vous pouvez demander l’accès, la rectification ou l’effacement de vos données, la limitation du traitement ou vous y opposer, ainsi que la portabilité (articles 15 à 22 du RGPD) en écrivant à info@contivalves.com. Vous pouvez également introduire une réclamation auprès de l’autorité italienne de protection des données (Garante per la protezione dei dati personali) ou de l’autorité de votre pays.'] },
    ],
  },
  es: {
    title: 'Política de privacidad | Conti Valves',
    description: 'Cómo trata Conti Rubinetterie los datos personales en contivalves.com: sin cookies, sin seguimiento, solo consultas por correo electrónico.',
    heading: 'Política de privacidad',
    updated: 'Última actualización',
    sections: [
      { h: 'Responsable del tratamiento', p: ['Conti Rubinetterie di Conti Giorgio & C. s.a.s., Via Astabbio 5, 13018 Valduggia (VC), Italia – info@contivalves.com. Esta información se facilita conforme a los artículos 13 y 14 del Reglamento (UE) 2016/679 (RGPD).'] },
      { h: 'Sin cookies ni seguimiento', p: ['Este sitio no utiliza cookies, herramientas de analítica ni rastreadores publicitarios y no carga fuentes, mapas u otros contenidos de terceros durante la navegación. Por eso no verá ningún aviso de cookies.'] },
      { h: 'Datos técnicos', p: ['Para servir las páginas, nuestro proveedor de alojamiento registra automáticamente registros técnicos (dirección IP, fecha y hora, página solicitada, tipo de navegador). Se tratan únicamente para el funcionamiento y la seguridad del sitio, sobre la base de nuestro interés legítimo (art. 6.1.f RGPD), y se eliminan tras un breve período, salvo que sean necesarios para investigar abusos.'] },
      { h: 'Correos electrónicos y llamadas', p: ['Si nos escribe o nos llama, utilizamos los datos facilitados (nombre, empresa, datos de contacto, contenido de la consulta) solo para responderle y, en su caso, preparar una oferta o ejecutar un contrato (art. 6.1.b RGPD). Se conservan el tiempo necesario para ello y durante los plazos exigidos por la ley (obligaciones fiscales y contables).'] },
      { h: 'Vídeo', p: ['La página de Producción contiene un vídeo de YouTube que solo se carga si hace clic en él. A partir de ese momento YouTube (Google Ireland Ltd.) puede tratar datos según su propia política de privacidad.'] },
      { h: 'Destinatarios', p: ['Los datos pueden ser tratados por personal autorizado y por proveedores que actúan como encargados del tratamiento (alojamiento, servicios informáticos y de correo). No se venden ni se ceden a terceros con fines de marketing.'] },
      { h: 'Sus derechos', p: ['Puede solicitar el acceso, la rectificación o la supresión de sus datos, la limitación u oposición al tratamiento y la portabilidad (artículos 15 a 22 del RGPD) escribiendo a info@contivalves.com. También tiene derecho a presentar una reclamación ante la autoridad italiana de protección de datos (Garante per la protezione dei dati personali) o ante la autoridad de su país.'] },
    ],
  },
  de: {
    title: 'Datenschutzerklärung | Conti Valves',
    description: 'Wie Conti Rubinetterie personenbezogene Daten auf contivalves.com verarbeitet: keine Cookies, kein Tracking, nur Anfragen per E-Mail.',
    heading: 'Datenschutzerklärung',
    updated: 'Stand',
    sections: [
      { h: 'Verantwortlicher', p: ['Conti Rubinetterie di Conti Giorgio & C. s.a.s., Via Astabbio 5, 13018 Valduggia (VC), Italien – info@contivalves.com. Diese Information erfolgt gemäß Art. 13 und 14 der Verordnung (EU) 2016/679 (DSGVO).'] },
      { h: 'Keine Cookies, kein Tracking', p: ['Diese Website verwendet keine Cookies, keine Webanalyse und keine Werbe-Tracker und lädt beim Surfen keine Schriften, Karten oder sonstigen Inhalte von Dritten. Deshalb sehen Sie kein Cookie-Banner.'] },
      { h: 'Technische Daten', p: ['Zur Auslieferung der Seiten speichert unser Hosting-Anbieter automatisch technische Protokolle (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp). Sie werden ausschließlich für Betrieb und Sicherheit der Website auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO) verarbeitet und nach kurzer Zeit gelöscht, sofern sie nicht zur Aufklärung von Missbrauch benötigt werden.'] },
      { h: 'E-Mails und Anrufe', p: ['Wenn Sie uns schreiben oder anrufen, verwenden wir Ihre Angaben (Name, Firma, Kontaktdaten, Inhalt der Anfrage) nur zur Beantwortung und gegebenenfalls zur Angebotserstellung oder Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO). Die Daten werden so lange gespeichert, wie es dafür erforderlich ist, sowie für die gesetzlichen Aufbewahrungsfristen (z. B. steuer- und handelsrechtlich).'] },
      { h: 'Video', p: ['Die Seite Produktion enthält ein YouTube-Video, das erst nach Anklicken geladen wird. Ab diesem Zeitpunkt kann YouTube (Google Ireland Ltd.) Daten gemäß seiner eigenen Datenschutzerklärung verarbeiten.'] },
      { h: 'Empfänger', p: ['Die Daten können von befugten Mitarbeitern und von Dienstleistern als Auftragsverarbeiter (Hosting, IT- und E-Mail-Dienste) verarbeitet werden. Sie werden weder verkauft noch zu Werbezwecken an Dritte weitergegeben.'] },
      { h: 'Ihre Rechte', p: ['Sie können Auskunft, Berichtigung oder Löschung Ihrer Daten, Einschränkung der Verarbeitung, Widerspruch und Datenübertragbarkeit (Art. 15–22 DSGVO) verlangen, indem Sie an info@contivalves.com schreiben. Außerdem haben Sie das Recht, Beschwerde bei der italienischen Datenschutzbehörde (Garante per la protezione dei dati personali) oder der Aufsichtsbehörde Ihres Landes einzulegen.'] },
    ],
  },
};

export const privacyUpdated = '2026-09-23';
