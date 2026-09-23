/** Company data, used in the footer, contact page and schema.org markup. */
export const site = {
  url: 'https://www.contivalves.com',
  brand: 'Conti Valves',
  name: 'Conti Rubinetterie',
  legalName: 'Conti Rubinetterie di Conti Giorgio & C. s.a.s.',
  /** TODO: add the VAT number (P. IVA) – required on Italian company websites. Rendered only when set. */
  vatNumber: '',
  foundingYear: 1919,
  founder: 'Giovanni Conti',
  address: {
    street: 'Via Astabbio 5',
    postalCode: '13018',
    city: 'Valduggia',
    province: 'VC',
    region: 'Piemonte',
    country: 'IT',
    countryName: 'Italia',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Conti+Rubinetterie+Via+Astabbio+5+13018+Valduggia+VC',
  phone: '+39 0163 487704',
  phoneHref: 'tel:+390163487704',
  emails: {
    general: 'info@contivalves.com',
    sales: 'sales@contivalves.com',
    accounting: 'amministrazione@contivalves.com',
    technical: 'ufficiotecnico@contivalves.com',
  },
  youtubeVideo: 'ANRmM6FdydY',
  /** Profiles of the company elsewhere (LinkedIn, YouTube…) – used for schema.org sameAs. */
  sameAs: [] as string[],
};
