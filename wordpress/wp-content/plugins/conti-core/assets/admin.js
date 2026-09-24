/* Conti – structured editor for the JSON content fields (pages, product materials/versions). */
(function ($) {
  'use strict';

  const LABELS = {
    heading: 'Titolo (H1)', lead: 'Sottotitolo', text: 'Testo', title: 'Titolo', eyebrow: 'Occhiello',
    facts: 'Dati in evidenza', value: 'Valore', label: 'Etichetta', faq: 'Domande frequenti', faqHeading: 'Titolo FAQ',
    q: 'Domanda', a: 'Risposta', steps: 'Fasi', blocks: 'Blocchi', image: 'Immagine', images: 'Immagini',
    milestones: 'Tappe', year: 'Anno', items: 'Notizie', date: 'Data (AAAA-MM-GG)', paragraphs: 'Paragrafi',
    options: 'Opzioni', optionsHeading: 'Titolo opzioni', properties: 'Caratteristiche', propertiesHeading: 'Titolo caratteristiche',
    industries: 'Settori', industriesHeading: 'Titolo settori', name: 'Nome', photos: 'Foto', gallery: 'Galleria', galleryHeading: 'Titolo galleria',
    sections: 'Sezioni', h: 'Titolo sezione', p: 'Paragrafi', quote: 'Citazione', quoteBy: 'Autore della citazione', mission: 'Missione',
    factsHeading: 'Titolo dati', exploreHeading: 'Titolo “scopri di più”', exploreImages: 'Immagini “scopri di più”',
    file: 'File', meta: 'Info file', family: 'Famiglia (chiave)', youtube: 'ID video YouTube', videoTitle: 'Titolo video',
    quality: 'Qualità', custom: 'Soluzioni personalizzate', environment: 'Ambiente', productsHeading: 'Titolo prodotti',
    productsText: 'Testo prodotti', sun: 'Sole', water: 'Acqua', air: 'Aria', sunText: 'Testo sole', waterText: 'Testo acqua',
    airText: 'Testo aria', iso: 'ISO 14001', stats: 'Numeri', pillars: 'Sole, acqua, aria', pillarsHeading: 'Titolo sezione',
    certificate: 'Etichetta certificato', certificates: 'Certificati', certificateFile: 'PDF certificato',
    catalogues: 'Titolo cataloghi', manuals: 'Titolo istruzioni', catalogueFiles: 'Cataloghi', manualFiles: 'Istruzioni',
    certificateFiles: 'Certificati', departments: 'Titolo uffici', visit: 'Titolo “dove siamo”', updated: 'Etichetta aggiornamento',
    updatedDate: 'Data aggiornamento (AAAA-MM-GG)', materialsHeading: 'Titolo materiali', materialsText: 'Testo materiali',
    rangeHeading: 'Titolo gamma', cta: 'Testo pulsante', hero: 'Immagine principale', history: 'Storia', production: 'Produzione',
    certifications: 'Certificazioni', part: 'Componente', grade: 'Grado', standard: 'Norma', code: 'Codice', rating: 'Pressione',
  };
  const MEDIA_KEYS = ['image', 'file', 'certificateFile'];
  const MEDIA_PARENTS = ['images', 'exploreImages'];
  const LONG = ['text', 'lead', 'a', 'mission', 'intro', 'productsText', 'materialsText', 'sunText', 'waterText', 'airText'];

  const label = (k) => LABELS[k] || String(k).replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
  const isMedia = (key, parent) => MEDIA_KEYS.includes(key) || MEDIA_PARENTS.includes(parent);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  /** Empty copy of a value, used when adding a new item to a list. */
  function blank(v) {
    if (Array.isArray(v)) return v.length && typeof v[0] !== 'object' ? v.map(() => '') : v.length ? [blank(v[0])] : [];
    if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)]));
    return typeof v === 'number' ? 0 : '';
  }

  function summaryOf(item) {
    if (typeof item === 'string') return item;
    if (Array.isArray(item)) return item.filter((x) => typeof x === 'string').join(' · ');
    const firstText = Object.values(item || {}).find((x) => typeof x === 'string' && x.trim());
    return firstText || '—';
  }

  function mediaField(value, set, type) {
    const wrap = el('div', 'conti-media');
    const preview = el('span', 'conti-media__preview');
    const pick = el('button', 'button', 'Scegli…'); pick.type = 'button';
    const clear = el('button', 'button-link', 'Rimuovi'); clear.type = 'button';
    const refresh = (id) => {
      preview.textContent = '';
      clear.hidden = !id;
      if (!id) return;
      if (typeof id === 'string') { preview.textContent = id + ' (da importare)'; return; }
      const att = wp.media.attachment(id);
      att.fetch().then(() => {
        const url = att.get('sizes')?.thumbnail?.url || att.get('icon');
        if (url) { const img = el('img'); img.src = url; preview.append(img); }
        preview.append(el('span', 'conti-media__name', att.get('filename') || ''));
      });
    };
    pick.addEventListener('click', () => {
      const frame = wp.media({ title: 'Scegli un file', multiple: false, library: type === 'file' ? {} : { type: 'image' } });
      frame.on('select', () => { const id = frame.state().get('selection').first().id; set(id); refresh(id); });
      frame.open();
    });
    clear.addEventListener('click', () => { set(0); refresh(0); });
    wrap.append(preview, pick, clear);
    refresh(value);
    return wrap;
  }

  function scalarField(key, value, set, parent) {
    if (isMedia(key, parent)) return mediaField(value, set, key === 'image' || MEDIA_PARENTS.includes(parent) ? 'image' : 'file');
    const long = LONG.includes(key) || String(value).length > 90 || String(value).includes('\n');
    const input = el(long ? 'textarea' : 'input', long ? 'large-text' : 'regular-text');
    if (long) input.rows = Math.min(8, Math.max(3, Math.ceil(String(value).length / 90)));
    else input.type = typeof value === 'number' ? 'number' : 'text';
    input.value = value ?? '';
    input.addEventListener('input', () => set(typeof value === 'number' ? Number(input.value) : input.value));
    return input;
  }

  /** Renders any JSON value; set(v) writes it back into the parent. */
  function render(key, value, set, parent) {
    // tuple like ["Founded", "1919, by Giovanni Conti"]
    if (Array.isArray(value) && value.every((x) => typeof x !== 'object')) {
      if (parent && Array.isArray(parent)) {
        const row = el('div', 'conti-tuple');
        value.forEach((v, i) => row.append(scalarField(i, v, (nv) => { value[i] = nv; set(value); })));
        return row;
      }
      return listField(key, value, set, true);
    }
    if (Array.isArray(value)) return listField(key, value, set, false);
    if (value && typeof value === 'object') {
      const box = el('div', 'conti-group');
      Object.keys(value).forEach((k) => box.append(row(k, value[k], (v) => { value[k] = v; set(value); }, key)));
      return box;
    }
    return scalarField(key, value, set, parent);
  }

  function row(key, value, set, parent) {
    const wrap = el('div', 'conti-row' + (value && typeof value === 'object' ? ' conti-row--block' : ''));
    wrap.append(el('label', 'conti-row__label', key === 'heading' && parent ? 'Titolo' : label(key)));
    wrap.append(render(key, value, set, parent));
    return wrap;
  }

  function listField(key, list, set, simple) {
    const box = el('div', 'conti-list');
    const draw = () => {
      box.textContent = '';
      list.forEach((item, i) => {
        const card = el(simple ? 'div' : 'details', 'conti-item');
        const head = el(simple ? 'div' : 'summary', 'conti-item__head');
        if (!simple) head.append(el('span', 'conti-item__title', `${i + 1}. ${summaryOf(item).slice(0, 80)}`));
        const tools = el('span', 'conti-item__tools');
        const btn = (t, title, fn) => { const b = el('button', 'button-link', t); b.type = 'button'; b.title = title; b.addEventListener('click', (e) => { e.preventDefault(); fn(); }); tools.append(b); };
        btn('↑', 'Sposta su', () => { if (i > 0) { [list[i - 1], list[i]] = [list[i], list[i - 1]]; set(list); draw(); } });
        btn('↓', 'Sposta giù', () => { if (i < list.length - 1) { [list[i + 1], list[i]] = [list[i], list[i + 1]]; set(list); draw(); } });
        btn('✕', 'Elimina', () => { if (confirm('Eliminare questo elemento?')) { list.splice(i, 1); set(list); draw(); } });
        if (simple) {
          card.append(scalarField(key, item, (v) => { list[i] = v; set(list); }), tools);
        } else {
          head.append(tools);
          card.append(head, render(i, item, (v) => { list[i] = v; set(list); }, list));
        }
        box.append(card);
      });
      const add = el('button', 'button', '+ Aggiungi'); add.type = 'button';
      add.addEventListener('click', () => { list.push(list.length ? blank(list[list.length - 1]) : ''); set(list); draw(); });
      box.append(add);
    };
    draw();
    return box;
  }

  function init(box) {
    const input = box.querySelector('.conti-json__data');
    const ui = box.querySelector('.conti-json__ui');
    let data;
    try { data = JSON.parse(input.value || '{}'); } catch (e) { ui.textContent = 'Dati non validi.'; return; }
    const save = () => { input.value = JSON.stringify(data); };
    if (Array.isArray(data)) ui.append(listField(box.dataset.root, data, (v) => { data = v; save(); }, false));
    else Object.keys(data).forEach((k) => ui.append(row(k, data[k], (v) => { data[k] = v; save(); }, null)));
    save();
  }

  function initMediaInputs(root) {
    root.querySelectorAll('.conti-media[data-type]').forEach((wrap) => {
      const input = wrap.querySelector('input');
      const preview = wrap.querySelector('.conti-media__preview');
      const clear = wrap.querySelector('.conti-media__clear');
      wrap.querySelector('.conti-media__pick').addEventListener('click', () => {
        const type = wrap.dataset.type;
        const frame = wp.media({ title: 'Scegli un file', multiple: false, library: type === 'image' ? { type: 'image' } : { type } });
        frame.on('select', () => {
          const att = frame.state().get('selection').first().toJSON();
          input.value = att.id;
          preview.innerHTML = '';
          const url = att.sizes?.thumbnail?.url || att.icon;
          if (url) { const img = el('img'); img.src = url; preview.append(img); }
          preview.append(el('span', 'conti-media__name', att.filename || ''));
          clear.hidden = false;
        });
        frame.open();
      });
      clear.addEventListener('click', () => { input.value = ''; preview.innerHTML = ''; clear.hidden = true; });
    });
  }

  function initCounters() {
    document.querySelectorAll('.conti-count').forEach((c) => {
      const field = document.getElementById(c.dataset.for);
      const update = () => { c.textContent = `(${field.value.length} caratteri)`; };
      field.addEventListener('input', update); update();
    });
  }

  $(function () {
    document.querySelectorAll('.conti-json').forEach(init);
    initMediaInputs(document);
    initCounters();
  });
})(jQuery);
