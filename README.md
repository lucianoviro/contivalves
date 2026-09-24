# contivalves.com

Nuovo sito di **Conti Rubinetterie** (Conti Valves): statico, multilingua (EN · IT · FR · ES · DE), costruito con [Astro](https://astro.build).
Nessun CMS, database, cookie o script di terze parti: l'hosting è HTML puro su CDN.

> **Versione WordPress**: lo stesso sito (design, testi, URL, SEO) come tema + plugin WordPress è in [`wordpress/`](wordpress/README.md).
> I dati per WordPress si rigenerano con `npm run export:wp`, gli zip da caricare con `npm run wp:zip`.

## Comandi

```bash
npm install            # Node 22+
npm run fetch-media    # scarica immagini e PDF dal vecchio sito (una volta, finché è online)
npm run dev            # anteprima locale su http://localhost:4321
npm run build          # genera il sito in dist/
npm run preview        # serve dist/
```

## Struttura

| Percorso | Contenuto |
|---|---|
| `src/data/catalog.json` | Catalogo prodotti (123 articoli) generato da `scripts/import-wordpress.py` dall'export WordPress |
| `src/data/product-text.ts` | Descrizioni prodotto nelle 5 lingue |
| `src/data/families.ts` | Famiglie di prodotto: nomi, slug URL e testi introduttivi nelle 5 lingue |
| `src/data/glossary.ts` | Traduzioni di componenti, materiali e versioni (tabelle tecniche) |
| `src/data/site.ts` | Dati aziendali (indirizzo, email, telefono, **P. IVA da inserire**) |
| `src/content/*.ts` | Testi delle pagine (home, azienda, storia, produzione, certificazioni, ambiente, applicazioni, documentazione, news, contatti, privacy) |
| `src/i18n/` | Lingue, URL localizzati, testi dell'interfaccia |
| `src/views/` | Template delle pagine · `src/components/` componenti · `src/styles/global.css` design system |
| `src/data/redirects.ts` | Redirect 301 dai vecchi URL WordPress (generati in `dist/_redirects`) |
| `scripts/` | Import dall'export WordPress e download dei media |

Tutte le pagine vengono generate da `src/pages/[...slug].astro`; gli URL sono localizzati
(es. `/products/ball-valves/` → `/it/prodotti/valvole-a-sfera/` → `/de/produkte/kugelhaehne/`).

### Modificare i contenuti
I testi sono in file TypeScript con un blocco per lingua: si modifica il testo, si esegue `npm run build` e si ripubblica.
Per aggiungere un prodotto: una voce in `catalog.json` (o rieseguire l'import) + la descrizione in `product-text.ts`.

### Immagini
`npm run fetch-media` legge tutti i percorsi `aaaa/mm/file.jpg` citati nel codice e li scarica da
`https://www.contivalves.com/wp-content/uploads/`: le immagini vanno in `src/assets/media/` (Astro le converte in AVIF/WebP
responsive), i PDF in `public/media/`. Cerca anche i PDF delle schede tecniche nelle vecchie pagine prodotto
(`public/media/datasheets/<codice>.pdf`). Finché un'immagine manca, il sito mostra un segnaposto neutro.
Per sostituire un'immagine basta sovrascrivere il file con lo stesso nome.

## SEO e GEO
- URL puliti e localizzati, `hreflang` + `x-default`, canonical, sitemap con alternate (`/sitemap.xml`), `robots.txt`.
- Dati strutturati schema.org (JSON-LD): Organization, WebSite, BreadcrumbList, Product (per ogni articolo, con materiali e proprietà),
  ItemList, FAQPage, HowTo (processo produttivo), NewsArticle, AboutPage/ContactPage.
- `/llms.txt` e `/llms-full.txt`: sintesi aziendale e catalogo completo in testo semplice per gli assistenti AI.
- Dati tecnici in vere tabelle HTML (non immagini): dimensioni, pesi, materiali, versioni.
- FAQ in home con risposte fattuali; pagine prodotto stampabili come scheda tecnica (Stampa → PDF).
- Performance: HTML statico, zero JavaScript salvo menu mobile e video (caricato solo al clic), font self-hosted, immagini AVIF/WebP.
- 1.600+ redirect 301 dai vecchi URL (pagine, categorie, prodotti nelle 5 lingue, PDF in `/wp-content/uploads/`).

## Pubblicazione
Consigliato **Cloudflare Pages** o **Netlify** (gratuiti, CDN, supportano `_redirects` e `_headers`):
build command `npm run build`, output directory `dist`, Node 22. Dominio canonico: `https://www.contivalves.com`
(impostare il redirect apex → www sull'hosting). Dopo il go-live: inviare la sitemap a Google Search Console e Bing Webmaster Tools.

## Da completare / verificare
- [ ] **P. IVA** in `src/data/site.ts` (obbligatoria sul sito di un'azienda italiana).
- [ ] **Logo vettoriale** (SVG) al posto di `public/logo-conti.png` (attuale: 199×70 px).
- [ ] **Informativa privacy** (`src/content/privacy.ts`): bozza per un sito senza cookie/analytics, da far validare.
- [ ] Profili social/LinkedIn in `site.sameAs` (rafforzano l'identità dell'azienda per motori di ricerca e AI).
- [ ] Verificare con l'ufficio tecnico i dati segnalati dall'import: 27 prodotti avevano nel vecchio sito una seconda tabella dimensioni
      quasi identica (è stata mantenuta la prima); per il filtro 54217 è stata rimossa la riga "PN" non allineata alle misure.
- [ ] Verificare: impianto fotovoltaico indicato come 150 kWp (nel vecchio testo "150 KWH").
- [ ] Traduzioni FR/ES/DE: riviste e uniformate nella terminologia tecnica; consigliata una rilettura da madrelingua del settore.
