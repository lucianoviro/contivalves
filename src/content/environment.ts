import type { L } from '../i18n/config';

export const environment: L<{
  title: string;
  description: string;
  heading: string;
  lead: string;
  iso: { title: string; text: string };
  sun: { title: string; text: string };
  stats: { value: string; label: string }[];
  pillarsHeading: string;
  certificate: string;
}> = {
  en: {
    title: 'Respecting the environment – ISO 14001 and solar power | Conti Valves',
    description: 'Environmental commitment at Conti Rubinetterie: ISO 14001 certified environmental management, 40% of energy from photovoltaics, recycled process water and certified air filtration in the foundry.',
    heading: 'Respecting the environment',
    lead: 'We consider environmental responsibility an integral part of our business and of our mission. Looking to the next generation, we keep improving our performance to reduce our ecological footprint.',
    iso: {
      title: 'ISO 14001 certified',
      text: 'ISO 14001 is the international standard for effective Environmental Management Systems. Certified companies must show that energy consumption, use of natural resources and waste management are built into their management systems, with measurable targets and continual improvement. Conti Rubinetterie was awarded ISO 14001 after a rigorous external audit by an independent body accredited by Accredia.',
    },
    sun: {
      title: 'POWERED BY THE SUN – since 2011',
      text: 'The roofs of our plants were insulated with polyurethane panels and covered with a 150 kWp photovoltaic system. It generates more than 140,000 kWh a year – 40% of our total energy needs – avoiding around 74,340 kg of CO₂ emissions every year, the equivalent of about 10,600 trees.',
    },
    stats: [
      { value: '40%', label: 'of energy from the sun' },
      { value: '140,000 kWh', label: 'produced every year' },
      { value: '74 t', label: 'of CO₂ avoided per year' },
    ],
    pillarsHeading: 'Sun, water, air',
    certificate: 'ISO 14001 certificate',
  },
  it: {
    title: 'Rispetto per l’ambiente – ISO 14001 ed energia solare | Conti Valves',
    description: 'L’impegno ambientale di Conti Rubinetterie: sistema di gestione ambientale certificato ISO 14001, 40% dell’energia dal fotovoltaico, acqua di processo riciclata e filtrazione certificata dei fumi di fonderia.',
    heading: 'Rispetto per l’ambiente',
    lead: 'Consideriamo la responsabilità ambientale parte integrante della nostra attività e della nostra missione. Guardando alla prossima generazione, miglioriamo costantemente le nostre prestazioni per ridurre il nostro impatto ecologico.',
    iso: {
      title: 'Certificazione ISO 14001',
      text: 'La ISO 14001 è la norma internazionale per i Sistemi di Gestione Ambientale. Le aziende certificate devono dimostrare di aver integrato nei propri sistemi di gestione il consumo di energia, l’uso delle risorse naturali e la gestione dei rifiuti, con obiettivi misurabili e miglioramento continuo. Conti Rubinetterie ha ottenuto la certificazione ISO 14001 dopo un rigoroso audit esterno di un ente indipendente accreditato Accredia.',
    },
    sun: {
      title: 'POWERED BY THE SUN – dal 2011',
      text: 'I tetti dei nostri stabilimenti sono stati isolati con pannelli in poliuretano e coperti da un impianto fotovoltaico da 150 kWp. Produce oltre 140.000 kWh all’anno – il 40% del nostro fabbisogno energetico – evitando ogni anno l’emissione di circa 74.340 kg di CO₂, pari a circa 10.600 alberi.',
    },
    stats: [
      { value: '40%', label: 'dell’energia dal sole' },
      { value: '140.000 kWh', label: 'prodotti ogni anno' },
      { value: '74 t', label: 'di CO₂ evitate ogni anno' },
    ],
    pillarsHeading: 'Sole, acqua, aria',
    certificate: 'Certificato ISO 14001',
  },
  fr: {
    title: 'Respect de l’environnement – ISO 14001 et énergie solaire | Conti Valves',
    description: 'L’engagement environnemental de Conti Rubinetterie : management environnemental certifié ISO 14001, 40 % de l’énergie issue du photovoltaïque, eau de process recyclée et filtration certifiée des fumées de fonderie.',
    heading: 'Respect de l’environnement',
    lead: 'La responsabilité environnementale fait partie intégrante de notre activité et de notre mission. En pensant à la génération suivante, nous améliorons sans cesse nos performances pour réduire notre empreinte écologique.',
    iso: {
      title: 'Certification ISO 14001',
      text: 'L’ISO 14001 est la norme internationale des systèmes de management environnemental. Les entreprises certifiées doivent démontrer que la consommation d’énergie, l’utilisation des ressources naturelles et la gestion des déchets sont intégrées à leur management, avec des objectifs mesurables et une amélioration continue. Conti Rubinetterie a obtenu la certification ISO 14001 après un audit externe rigoureux mené par un organisme indépendant accrédité Accredia.',
    },
    sun: {
      title: 'POWERED BY THE SUN – depuis 2011',
      text: 'Les toits de nos usines ont été isolés avec des panneaux en polyuréthane et recouverts d’une installation photovoltaïque de 150 kWc. Elle produit plus de 140 000 kWh par an – 40 % de nos besoins énergétiques – et évite chaque année l’émission d’environ 74 340 kg de CO₂, soit l’équivalent d’environ 10 600 arbres.',
    },
    stats: [
      { value: '40 %', label: 'de l’énergie issue du soleil' },
      { value: '140 000 kWh', label: 'produits chaque année' },
      { value: '74 t', label: 'de CO₂ évitées par an' },
    ],
    pillarsHeading: 'Soleil, eau, air',
    certificate: 'Certificat ISO 14001',
  },
  es: {
    title: 'Respeto por el medio ambiente – ISO 14001 y energía solar | Conti Valves',
    description: 'El compromiso ambiental de Conti Rubinetterie: gestión ambiental certificada ISO 14001, 40 % de la energía de origen fotovoltaico, agua de proceso reciclada y filtración certificada de los humos de fundición.',
    heading: 'Respeto por el medio ambiente',
    lead: 'Consideramos la responsabilidad ambiental parte integral de nuestra actividad y de nuestra misión. Pensando en la próxima generación, mejoramos continuamente nuestro desempeño para reducir nuestro impacto ecológico.',
    iso: {
      title: 'Certificación ISO 14001',
      text: 'La ISO 14001 es la norma internacional de sistemas de gestión ambiental. Las empresas certificadas deben demostrar que el consumo de energía, el uso de recursos naturales y la gestión de residuos están integrados en su gestión, con objetivos medibles y mejora continua. Conti Rubinetterie obtuvo la certificación ISO 14001 tras una rigurosa auditoría externa de un organismo independiente acreditado por Accredia.',
    },
    sun: {
      title: 'POWERED BY THE SUN – desde 2011',
      text: 'Las cubiertas de nuestras plantas se aislaron con paneles de poliuretano y se cubrieron con una instalación fotovoltaica de 150 kWp. Produce más de 140.000 kWh al año – el 40 % de nuestra demanda energética – y evita cada año la emisión de unos 74.340 kg de CO₂, el equivalente a unos 10.600 árboles.',
    },
    stats: [
      { value: '40 %', label: 'de la energía procede del sol' },
      { value: '140.000 kWh', label: 'producidos cada año' },
      { value: '74 t', label: 'de CO₂ evitadas al año' },
    ],
    pillarsHeading: 'Sol, agua, aire',
    certificate: 'Certificado ISO 14001',
  },
  de: {
    title: 'Umweltschutz – ISO 14001 und Solarenergie | Conti Valves',
    description: 'Umweltengagement bei Conti Rubinetterie: Umweltmanagement nach ISO 14001, 40 % der Energie aus Photovoltaik, recyceltes Prozesswasser und zertifizierte Abluftfilterung in der Gießerei.',
    heading: 'Umweltschutz',
    lead: 'Verantwortung für die Umwelt ist fester Bestandteil unseres Geschäfts und unserer Mission. Mit Blick auf die nächste Generation verbessern wir laufend unsere Leistung, um unseren ökologischen Fußabdruck zu verringern.',
    iso: {
      title: 'Zertifiziert nach ISO 14001',
      text: 'ISO 14001 ist die internationale Norm für Umweltmanagementsysteme. Zertifizierte Unternehmen müssen nachweisen, dass Energieverbrauch, Ressourcennutzung und Abfallmanagement in ihre Managementsysteme integriert sind – mit messbaren Zielen und kontinuierlicher Verbesserung. Conti Rubinetterie erhielt die ISO-14001-Zertifizierung nach einem strengen externen Audit durch eine unabhängige, von Accredia akkreditierte Stelle.',
    },
    sun: {
      title: 'POWERED BY THE SUN – seit 2011',
      text: 'Die Dächer unserer Werke wurden mit Polyurethan-Dämmplatten isoliert und mit einer Photovoltaikanlage von 150 kWp belegt. Sie erzeugt über 140.000 kWh pro Jahr – 40 % unseres gesamten Energiebedarfs – und vermeidet jährlich rund 74.340 kg CO₂, so viel wie etwa 10.600 Bäume binden.',
    },
    stats: [
      { value: '40 %', label: 'der Energie aus Sonnenkraft' },
      { value: '140.000 kWh', label: 'Jahresproduktion' },
      { value: '74 t', label: 'CO₂ pro Jahr vermieden' },
    ],
    pillarsHeading: 'Sonne, Wasser, Luft',
    certificate: 'ISO-14001-Zertifikat',
  },
};
