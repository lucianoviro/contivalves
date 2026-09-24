# contivalves.com – versione WordPress

Stesso sito della versione statica (Astro), stesso design e stessi URL, ma gestibile da WordPress.
È composto da due pezzi:

| Cartella | Cosa fa |
|---|---|
| `wp-content/themes/conti/` | **Tema "Conti"**: solo l'aspetto (template PHP, CSS, font self-hosted). Niente page builder. |
| `wp-content/plugins/conti-core/` | **Plugin "Conti Core"**: prodotti e famiglie, URL multilingua, SEO/GEO (schema.org, sitemap con hreflang, `llms.txt`), redirect 301 dal vecchio sito, campi di modifica e importatore dei contenuti. |

Requisiti: WordPress 6.4+, PHP 8.0+, plugin gratuito **Polylang** (lingue). Nessun altro plugin necessario.

## Installazione (circa 15 minuti)

1. Installa WordPress sul nuovo hosting (o in una cartella di prova, es. `staging.contivalves.com`).
2. **Plugin → Aggiungi nuovo**: installa e attiva **Polylang**. Il wizard iniziale si può saltare (le lingue le crea l’importatore).
3. Carica tema e plugin: **Aspetto → Temi → Aggiungi → Carica** `conti-theme.zip` e **Plugin → Aggiungi → Carica** `conti-core.zip` (oppure copia le due cartelle via FTP in `wp-content/`). Attiva prima il plugin, poi il tema.
4. Immagini: se puoi, copia la cartella `wp-content/uploads/` del vecchio sito nella stessa posizione del nuovo. Altrimenti l’importatore le scarica da `https://www.contivalves.com/wp-content/uploads/` (il vecchio sito deve essere ancora online).
5. **Strumenti → Importa contenuti Conti → Avvia importazione.** Crea lingue (EN predefinita senza prefisso, IT, FR, ES, DE), ~320 immagini e PDF, 11 famiglie e 28 sottocategorie, 14 pagine e 123 prodotti in 5 lingue, e cerca le schede tecniche PDF nelle vecchie pagine prodotto. Con WP-CLI: `wp conti import`.
6. **Impostazioni → Conti**: inserisci la **Partita IVA** (obbligatoria) e, se ci sono, i profili LinkedIn/YouTube.
7. **Lingue → Impostazioni → URL**: verifica “La lingua è impostata dal nome della directory”, “Nascondi le informazioni sulla lingua predefinita nell’URL” e “Rimuovi /language/” (l’importatore le imposta già).
8. **Impostazioni → Permalink**: clicca “Salva” una volta (rigenera gli URL).
9. Attiva la cache dell’hosting o un plugin di cache pagina (es. WP Super Cache): il sito è quasi statico e diventa velocissimo.

> ⚠️ Rilanciare l’importazione riporta testi e dati tecnici alla versione originale: va usata per il primo caricamento, non dopo aver fatto modifiche.

## Cosa può modificare il cliente

- **Pagine → (pagina)**: box “Contenuti della pagina” con tutti i testi, le liste (dati, FAQ, fasi, tappe della storia, notizie…) e le immagini; box “SEO” per titolo e descrizione su Google. L’impaginazione è bloccata nel tema. Ogni lingua è una pagina separata (colonna bandierine in Pagine).
- **Prodotti**: il titolo è la descrizione del prodotto nella lingua. I **dati tecnici** (codice, pressione, foto, disegno, PDF, tabella dimensioni incollabile da Excel, materiali, versioni) si modificano **solo nella versione inglese** e valgono per tutte le lingue.
- **Prodotti → Famiglie prodotto**: nome, introduzione, immagine per lingua.
- **Impostazioni → Conti**: dati aziendali (footer, contatti, dati strutturati).
- Nuovo prodotto: crealo in inglese (con codice e famiglia), poi aggiungi le traduzioni dalla colonna Polylang.

## URL

Identici alla versione statica: `/products/ball-valves/04352/`, `/it/prodotti/valvole-a-sfera/04352/`, `/de/produkte/kugelhaehne/04352/`…
Pagine: `/company/history/`, `/it/azienda/storia/`, `/fr/entreprise/histoire/`…
Extra: `/sitemap.xml` (con hreflang), `/robots.txt`, `/llms.txt`, `/llms-full.txt`.
I vecchi URL di WordPress/qTranslate (1.649 regole, tutte le lingue) rispondono con un redirect 301 alla pagina nuova.

## Aggiornare i dati di partenza

I file in `conti-core/data/*.json` sono generati dal sito statico: `npm run export:wp` nella radice del repository.
Servono all’importatore e contengono glossario (traduzione di componenti/materiali), testi dell’interfaccia e redirect.

## Test eseguiti

WordPress 6.7 + SQLite in locale: importazione completa (ripetibile senza duplicati), 740 pagine tutte 200, nessun link interno rotto,
1 H1 per pagina, JSON-LD valido, titoli univoci, redirect dai vecchi URL, 404 corretti, modifica e salvataggio di pagine e prodotti dal pannello.

**Da verificare con Polylang vero** (qui non era scaricabile e al suo posto è stato usato un sostituto delle sue funzioni):
selettore lingua e hreflang, home `/it/` ecc., elenco famiglie filtrato per lingua nella scheda prodotto, creazione automatica delle lingue.
Se la creazione automatica delle lingue non riuscisse, basta crearle a mano in **Lingue** (English come predefinita, poi Italiano, Français, Español, Deutsch) e rilanciare l’importazione.
