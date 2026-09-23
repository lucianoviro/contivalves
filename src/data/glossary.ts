import type { L, Locale } from '../i18n/config';

/** Valve components used in the material tables. */
export const parts: Record<string, L> = {
  BODY: { en: 'Body', it: 'Corpo', fr: 'Corps', es: 'Cuerpo', de: 'Gehäuse' },
  'BODY END': { en: 'Body end', it: 'Manicotto', fr: 'Embout', es: 'Manguito', de: 'Anschlussstück' },
  BONNET: { en: 'Bonnet', it: 'Coperchio', fr: 'Chapeau', es: 'Bonete', de: 'Oberteil' },
  CAP: { en: 'Cap', it: 'Tappo', fr: 'Couvercle', es: 'Tapa', de: 'Deckel' },
  DISC: { en: 'Disc', it: 'Otturatore', fr: 'Clapet', es: 'Obturador', de: 'Kegel' },
  SEAT: { en: 'Seat', it: 'Sede', fr: 'Siège', es: 'Asiento', de: 'Sitz' },
  STEM: { en: 'Stem', it: 'Asta', fr: 'Tige', es: 'Vástago', de: 'Spindel' },
  WEDGE: { en: 'Wedge', it: 'Cuneo', fr: 'Opercule', es: 'Cuña', de: 'Keil' },
  BALL: { en: 'Ball', it: 'Sfera', fr: 'Sphère', es: 'Bola', de: 'Kugel' },
  SCREEN: { en: 'Screen', it: 'Cestello filtrante', fr: 'Tamis', es: 'Tamiz', de: 'Siebeinsatz' },
  FILTER: { en: 'Filter', it: 'Filtro', fr: 'Filtre', es: 'Filtro', de: 'Filter' },
  STRAINER: { en: 'Strainer', it: 'Filtro', fr: 'Crépine', es: 'Filtro', de: 'Saugkorb' },
  PLUG: { en: 'Plug', it: 'Maschio', fr: 'Boisseau', es: 'Macho', de: 'Küken' },
  GLAND: { en: 'Gland', it: 'Premistoppa', fr: 'Presse-étoupe', es: 'Prensaestopas', de: 'Stopfbuchse' },
  'O-RING': { en: 'O-ring', it: 'O-ring', fr: 'Joint torique', es: 'Junta tórica', de: 'O-Ring' },
};

/** Material names (grades and standards such as CC491K / UNI EN 1982 are not translated). */
export const materialNames: Record<string, L> = {
  BRONZE: { en: 'Bronze', it: 'Bronzo', fr: 'Bronze', es: 'Bronce', de: 'Bronze' },
  BRASS: { en: 'Brass', it: 'Ottone', fr: 'Laiton', es: 'Latón', de: 'Messing' },
  'DZR BRASS': { en: 'DZR brass', it: 'Ottone DZR', fr: 'Laiton DZR', es: 'Latón DZR', de: 'DZR-Messing' },
  'CAST IRON G25': { en: 'Cast iron G25', it: 'Ghisa G25', fr: 'Fonte G25', es: 'Fundición G25', de: 'Grauguss G25' },
  'STAINLESS STEEL': { en: 'Stainless steel', it: 'Acciaio inox', fr: 'Acier inoxydable', es: 'Acero inoxidable', de: 'Edelstahl' },
  'AISI 316': { en: 'Stainless steel AISI 316', it: 'Acciaio inox AISI 316', fr: 'Acier inoxydable AISI 316', es: 'Acero inoxidable AISI 316', de: 'Edelstahl AISI 316' },
  'INTEGRAL SEAT': { en: 'Integral with body', it: 'Ricavata nel corpo', fr: 'Intégré au corps', es: 'Integrado en el cuerpo', de: 'Im Gehäuse integriert' },
  'ACETAL COPOLYMER': { en: 'Acetal copolymer', it: 'Copolimero acetalico', fr: 'Copolymère acétal', es: 'Copolímero de acetal', de: 'Acetal-Copolymer' },
  'PTFE+GRAPHITE': { en: 'PTFE + graphite', it: 'PTFE + grafite', fr: 'PTFE + graphite', es: 'PTFE + grafito', de: 'PTFE + Graphit' },
  'NYLON+NBR': { en: 'Nylon + NBR', it: 'Nylon + NBR', fr: 'Nylon + NBR', es: 'Nylon + NBR', de: 'Nylon + NBR' },
};

/** Words used for body material detection in product summaries. */
export const bodyMaterialOrder = ['DZR BRASS', 'BRASS', 'BRONZE', 'CAST IRON G25'];

/** Named rows of the dimension tables. */
export const rowLabels: Record<string, L> = {
  weight: { en: 'Weight (kg)', it: 'Peso (kg)', fr: 'Poids (kg)', es: 'Peso (kg)', de: 'Gewicht (kg)' },
  holesPerCm2: { en: 'Holes per cm²', it: 'Fori per cm²', fr: 'Trous par cm²', es: 'Orificios por cm²', de: 'Löcher pro cm²' },
  holeSize: { en: 'Hole size (mm)', it: 'Diametro fori (mm)', fr: 'Diamètre des trous (mm)', es: 'Diámetro de orificios (mm)', de: 'Lochdurchmesser (mm)' },
  holePitch: { en: 'Hole pitch (mm)', it: 'Passo fori (mm)', fr: 'Pas des trous (mm)', es: 'Paso de orificios (mm)', de: 'Lochteilung (mm)' },
  openArea: { en: 'Open area (%)', it: 'Superficie aperta (%)', fr: 'Surface ouverte (%)', es: 'Superficie abierta (%)', de: 'Offene Fläche (%)' },
  holeMicron: { en: 'Inscribed hole diameter (µm)', it: 'Diametro foro inscritto (µm)', fr: 'Diamètre inscrit des trous (µm)', es: 'Diámetro inscrito de orificio (µm)', de: 'Eingeschriebener Lochdurchmesser (µm)' },
  holeCount: { en: 'Number of holes', it: 'Numero di fori', fr: 'Nombre de trous', es: 'Número de orificios', de: 'Anzahl Löcher' },
  mesh: { en: 'Mesh', it: 'Mesh', fr: 'Mesh', es: 'Mesh', de: 'Mesh' },
  torque: { en: 'Operating torque (Nm)', it: 'Coppia di manovra (Nm)', fr: 'Couple de manœuvre (Nm)', es: 'Par de maniobra (Nm)', de: 'Betätigungsmoment (Nm)' },
  plugSquare: { en: 'Square on plug', it: 'Quadro del maschio', fr: 'Carré du boisseau', es: 'Cuadradillo del macho', de: 'Vierkant am Küken' },
  connection: { en: 'Connection (mm)', it: 'Attacco (mm)', fr: 'Raccordement (mm)', es: 'Conexión (mm)', de: 'Anschluss (mm)' },
};

/** Captions of the two side-by-side tables of item 70057. */
export const tableHeads: Record<string, L> = {
  FERULE: { en: 'Ferrule', it: 'Ferrule', fr: 'Ferrule', es: 'Ferrule', de: 'Ferrule' },
  BANJO: { en: 'Banjo', it: 'Banjo', fr: 'Banjo', es: 'Banjo', de: 'Banjo' },
};

/** Version descriptions (English wording normalised by scripts/import-wordpress.py). */
export const variantTexts: Record<string, L> = {
  'All bronze': { en: 'All bronze', it: 'Tutto bronzo', fr: 'Tout bronze', es: 'Todo bronce', de: 'Ganz aus Bronze' },
  'All aluminium bronze': { en: 'All aluminium bronze', it: 'Tutto bronzo-alluminio', fr: 'Tout bronze-aluminium', es: 'Todo bronce-aluminio', de: 'Ganz aus Aluminiumbronze' },
  'All bronze, face-to-face to ASTM B16.10 (ASA 150)': { en: 'All bronze, face-to-face to ASTM B16.10 (ASA 150)', it: 'Tutto bronzo, scartamento ASTM B16.10 (ASA 150)', fr: 'Tout bronze, encombrement ASTM B16.10 (ASA 150)', es: 'Todo bronce, distancia entre caras ASTM B16.10 (ASA 150)', de: 'Ganz aus Bronze, Baulänge nach ASTM B16.10 (ASA 150)' },
  'All aluminium bronze, face-to-face to ASTM B16.10 (ASA 150)': { en: 'All aluminium bronze, face-to-face to ASTM B16.10 (ASA 150)', it: 'Tutto bronzo-alluminio, scartamento ASTM B16.10 (ASA 150)', fr: 'Tout bronze-aluminium, encombrement ASTM B16.10 (ASA 150)', es: 'Todo bronce-aluminio, distancia entre caras ASTM B16.10 (ASA 150)', de: 'Ganz aus Aluminiumbronze, Baulänge nach ASTM B16.10 (ASA 150)' },
  'Materials to AS 1628': { en: 'Materials to AS 1628', it: 'Materiali secondo AS 1628', fr: 'Matériaux selon AS 1628', es: 'Materiales según AS 1628', de: 'Werkstoffe nach AS 1628' },
  'PTFE disc': { en: 'PTFE disc', it: 'Otturatore in PTFE', fr: 'Clapet PTFE', es: 'Obturador de PTFE', de: 'PTFE-Kegel' },
  'NBR disc': { en: 'NBR disc', it: 'Otturatore in NBR', fr: 'Clapet NBR', es: 'Obturador de NBR', de: 'NBR-Kegel' },
  'Metal disc': { en: 'Metal disc', it: 'Otturatore metallico', fr: 'Clapet métallique', es: 'Obturador metálico', de: 'Metallkegel' },
  'PTFE disc and stainless steel spring': { en: 'PTFE disc and stainless steel spring', it: 'Otturatore in PTFE e molla inox', fr: 'Clapet PTFE et ressort inox', es: 'Obturador de PTFE y muelle inoxidable', de: 'PTFE-Kegel und Edelstahlfeder' },
  'NBR disc and stainless steel spring': { en: 'NBR disc and stainless steel spring', it: 'Otturatore in NBR e molla inox', fr: 'Clapet NBR et ressort inox', es: 'Obturador de NBR y muelle inoxidable', de: 'NBR-Kegel und Edelstahlfeder' },
  'Stainless steel seat and disc': { en: 'Stainless steel seat and disc', it: 'Sede e otturatore in acciaio inox', fr: 'Siège et clapet en inox', es: 'Asiento y obturador de acero inoxidable', de: 'Sitz und Kegel aus Edelstahl' },
  'Stainless steel seat, disc and spring': { en: 'Stainless steel seat, disc and spring', it: 'Sede, otturatore e molla in acciaio inox', fr: 'Siège, clapet et ressort en inox', es: 'Asiento, obturador y muelle de acero inoxidable', de: 'Sitz, Kegel und Feder aus Edelstahl' },
  'Stainless steel seat and spring, PTFE disc': { en: 'Stainless steel seat and spring, PTFE disc', it: 'Sede e molla in acciaio inox, otturatore in PTFE', fr: 'Siège et ressort en inox, clapet PTFE', es: 'Asiento y muelle de acero inoxidable, obturador de PTFE', de: 'Sitz und Feder aus Edelstahl, PTFE-Kegel' },
  'AISI 316 disc and renewable seat': { en: 'AISI 316 disc and renewable seat', it: 'Otturatore e sede ricambiabile in AISI 316', fr: 'Clapet et siège remplaçable en AISI 316', es: 'Obturador y asiento recambiable de AISI 316', de: 'Kegel und austauschbarer Sitz aus AISI 316' },
  'AISI 316 disc and renewable seat, DZR brass stem': { en: 'AISI 316 disc and renewable seat, DZR brass stem', it: 'Otturatore e sede ricambiabile in AISI 316, asta in ottone DZR', fr: 'Clapet et siège remplaçable en AISI 316, tige en laiton DZR', es: 'Obturador y asiento recambiable de AISI 316, vástago de latón DZR', de: 'Kegel und austauschbarer Sitz aus AISI 316, Spindel aus DZR-Messing' },
  'AISI 316 trim and renewable seat': { en: 'AISI 316 trim and renewable seat', it: 'Interni in AISI 316 e sede ricambiabile', fr: 'Garniture en AISI 316 et siège remplaçable', es: 'Internos de AISI 316 y asiento recambiable', de: 'Innengarnitur aus AISI 316 und austauschbarer Sitz' },
  'Monel disc and renewable seat': { en: 'Monel disc and renewable seat', it: 'Otturatore e sede ricambiabile in Monel', fr: 'Clapet et siège remplaçable en Monel', es: 'Obturador y asiento recambiable de Monel', de: 'Kegel und austauschbarer Sitz aus Monel' },
  'Monel seat and disc': { en: 'Monel seat and disc', it: 'Sede e otturatore in Monel', fr: 'Siège et clapet en Monel', es: 'Asiento y obturador de Monel', de: 'Sitz und Kegel aus Monel' },
  'Monel trim and renewable seat': { en: 'Monel trim and renewable seat', it: 'Interni in Monel e sede ricambiabile', fr: 'Garniture en Monel et siège remplaçable', es: 'Internos de Monel y asiento recambiable', de: 'Innengarnitur aus Monel und austauschbarer Sitz' },
  'AISI 316 ball and stem': { en: 'AISI 316 ball and stem', it: 'Sfera e asta in AISI 316', fr: 'Sphère et tige en AISI 316', es: 'Bola y vástago de AISI 316', de: 'Kugel und Spindel aus AISI 316' },
  'AISI 316 ball, suitable for drinking water': { en: 'AISI 316 ball, suitable for drinking water', it: 'Sfera in AISI 316, idonea per acqua potabile', fr: 'Sphère en AISI 316, adaptée à l’eau potable', es: 'Bola de AISI 316, apta para agua potable', de: 'Kugel aus AISI 316, trinkwassergeeignet' },
  'Monel 400 ball and stem': { en: 'Monel 400 ball and stem', it: 'Sfera e asta in Monel 400', fr: 'Sphère et tige en Monel 400', es: 'Bola y vástago de Monel 400', de: 'Kugel und Spindel aus Monel 400' },
  'Aluminium bronze ball': { en: 'Aluminium bronze ball', it: 'Sfera in bronzo-alluminio', fr: 'Sphère en bronze-aluminium', es: 'Bola de bronce-aluminio', de: 'Kugel aus Aluminiumbronze' },
  'Aluminium bronze ball and stem': { en: 'Aluminium bronze ball and stem', it: 'Sfera e asta in bronzo-alluminio', fr: 'Sphère et tige en bronze-aluminium', es: 'Bola y vástago de bronce-aluminio', de: 'Kugel und Spindel aus Aluminiumbronze' },
  'Aluminium bronze body, AISI 316 ball and stem': { en: 'Aluminium bronze body, AISI 316 ball and stem', it: 'Corpo in bronzo-alluminio, sfera e asta in AISI 316', fr: 'Corps en bronze-aluminium, sphère et tige en AISI 316', es: 'Cuerpo de bronce-aluminio, bola y vástago de AISI 316', de: 'Gehäuse aus Aluminiumbronze, Kugel und Spindel aus AISI 316' },
  'L-port (type L)': { en: 'L-port (type L)', it: 'Foratura a L (tipo L)', fr: 'Perçage en L (type L)', es: 'Paso en L (tipo L)', de: 'L-Bohrung (Typ L)' },
  'Banjo only': { en: 'Banjo only', it: 'Solo banjo', fr: 'Banjo seul', es: 'Solo banjo', de: 'Nur Banjo' },
  'With drain plug': { en: 'With drain plug', it: 'Con tappo di scarico', fr: 'Avec bouchon de purge', es: 'Con tapón de purga', de: 'Mit Entleerungsstopfen' },
};

export const tr = (dict: Record<string, L>, key: string, lang: Locale) => dict[key]?.[lang] ?? key;
