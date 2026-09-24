/**
 * Editing interface of the "Conti" blocks (no build step: plain JavaScript on the wp.* globals).
 *
 * The blocks are dynamic: PHP renders the page (inc/blocks-render.php) and the editor shows the
 * same markup, with the texts editable in place. Options and links are in the sidebar.
 */
(function (wp, cfg) {
	'use strict';

	const { registerBlockType, getBlockTypes } = wp.blocks;
	const { createElement: h, Fragment } = wp.element;
	const { RichText, InspectorControls, MediaUpload, MediaUploadCheck, InnerBlocks, useBlockProps, useInnerBlocksProps } = wp.blockEditor;
	const { PanelBody, SelectControl, ToggleControl, TextControl, Button, Notice } = wp.components;
	const { useSelect } = wp.data;
	const ServerSideRender = wp.serverSideRender;

	cfg = cfg || {};
	const LINKS = cfg.links || [];
	const ICONS = cfg.icons || {};

	const HEAD = ['core/bold', 'core/italic'];
	const INLINE = ['core/bold', 'core/italic', 'core/link'];
	const NONE = [];

	/* ── Helpers ─────────────────────────────────────────────────────────── */

	const plain = (html) => (html ? new DOMParser().parseFromString(String(html), 'text/html').body.textContent || '' : '');

	/** Editable text bound to a block attribute. */
	function T(p, key, tag, className, placeholder, o) {
		o = o || {};
		const value = p.attributes[key] || '';
		if (o.optional && !value && !p.isSelected) {
			return null;
		}
		return h(RichText, {
			key,
			tagName: tag,
			className: className || undefined,
			value,
			placeholder,
			allowedFormats: o.formats || INLINE,
			disableLineBreaks: !o.multiline,
			onChange: (v) => p.setAttributes({ [key]: v }),
		});
	}

	/** Repeater stored in an array attribute ("items" by default). */
	function useItems(p, key) {
		key = key || 'items';
		const items = Array.isArray(p.attributes[key]) ? p.attributes[key] : [];
		const set = (next) => p.setAttributes({ [key]: next });
		return {
			items,
			selected: p.isSelected,
			update: (i, patch) => set(items.map((it, j) => (j === i ? Object.assign({}, it, patch) : it))),
			move: (i, d) => {
				const next = items.slice();
				const moved = next.splice(i, 1)[0];
				next.splice(i + d, 0, moved);
				set(next);
			},
			remove: (i) => set(items.filter((_, j) => j !== i)),
			add: (tpl) => set(items.concat([Object.assign({}, tpl)])),
		};
	}

	/** Editable text of one repeater item. */
	function IT(list, i, key, tag, className, placeholder, formats, optional) {
		const value = list.items[i][key] || '';
		if (optional && !value && !list.selected) {
			return null;
		}
		return h(RichText, {
			key,
			tagName: tag,
			className: className || undefined,
			value,
			placeholder,
			allowedFormats: formats || NONE,
			disableLineBreaks: true,
			onChange: (v) => list.update(i, { [key]: v }),
		});
	}

	/** Move / delete buttons of a repeater item (visible when the block is selected). */
	function Tools(props) {
		const { list, i } = props;
		if (!list.selected) {
			return null;
		}
		return h(
			'span',
			{ className: 'cbe-tools', contentEditable: false },
			h(Button, { icon: 'arrow-up-alt2', label: 'Sposta prima', disabled: i === 0, onClick: () => list.move(i, -1) }),
			h(Button, { icon: 'arrow-down-alt2', label: 'Sposta dopo', disabled: i === list.items.length - 1, onClick: () => list.move(i, 1) }),
			h(Button, { icon: 'trash', label: 'Elimina', isDestructive: true, onClick: () => list.remove(i) })
		);
	}

	function Add(props) {
		if (!props.list.selected) {
			return null;
		}
		return h(Button, { className: 'cbe-add', variant: 'secondary', icon: 'plus', onClick: () => props.list.add(props.tpl) }, props.label);
	}

	function Empty(props) {
		return props.list.items.length ? null : h('p', { className: 'cbe-empty' }, props.text);
	}

	/** Image picker: click the image to choose or replace it from the media library. */
	function Media(props) {
		const id = typeof props.value === 'number' ? props.value : 0;
		const media = useSelect((select) => (id ? select('core').getMedia(id) : null), [id]);
		const sizes = (media && media.media_details && media.media_details.sizes) || {};
		const size = sizes.medium_large || sizes.large || sizes.medium || null;
		const src = media ? (size ? size.source_url : media.source_url) : '';
		const label = props.label || 'Scegli immagine';
		const empty = props.value && !id ? 'Immagine non ancora importata – clicca per sceglierne una' : label;
		return h(
			MediaUploadCheck,
			null,
			h(MediaUpload, {
				allowedTypes: props.allowedTypes || ['image'],
				value: id,
				onSelect: (m) => props.onChange(m.id),
				render: (o) =>
					h(
						'span',
						{ className: 'cbe-media' },
						h(
							'button',
							{ type: 'button', className: 'cbe-media__pick', onClick: o.open, title: label },
							src ? h('img', { src, alt: '' }) : h('span', { className: 'cbe-media__empty' }, id && !media ? 'Caricamento…' : empty)
						),
						props.value && props.selected ? h(Button, { className: 'cbe-media__remove', icon: 'no-alt', label: 'Rimuovi immagine', onClick: () => props.onChange(0) }) : null
					),
			})
		);
	}

	/** File picker (PDF or image) for downloads. */
	function FilePick(props) {
		const id = typeof props.value === 'number' ? props.value : 0;
		const media = useSelect((select) => (id ? select('core').getMedia(id) : null), [id]);
		const name = media ? decodeURIComponent(String(media.source_url).split('/').pop()) : props.value && !id ? String(props.value).split('/').pop() + ' (da importare)' : '';
		return h(
			MediaUploadCheck,
			null,
			h(MediaUpload, {
				allowedTypes: ['application/pdf', 'image'],
				value: id,
				onSelect: (m) => props.onChange(m.id),
				render: (o) =>
					h(
						'span',
						{ className: 'cbe-file' },
						h(Button, { variant: 'secondary', icon: 'media-document', onClick: o.open }, name || props.label || 'Scegli file'),
						props.value ? h(Button, { icon: 'no-alt', label: 'Togli il file', onClick: () => props.onChange(0) }) : null
					),
			})
		);
	}

	/** Link: a page / product family / office of the site (always in the page language) or any address. */
	function LinkField(props) {
		const value = props.value || '';
		const known = LINKS.some((o) => o.value === value);
		const choice = known ? value : value ? '_custom' : '';
		return h(
			Fragment,
			null,
			h(SelectControl, {
				label: props.label || 'Collegamento',
				value: choice,
				options: [{ value: '', label: '— nessuno —' }].concat(LINKS, [{ value: '_custom', label: 'Altro indirizzo…' }]),
				onChange: (v) => props.onChange(v === '_custom' ? (choice === '_custom' ? value : 'https://') : v),
				__nextHasNoMarginBottom: true,
			}),
			choice === '_custom'
				? h(TextControl, {
						value,
						onChange: props.onChange,
						help: 'https://…, mailto:…, oppure email:technical?subject=Oggetto per un ufficio aziendale.',
						__nextHasNoMarginBottom: true,
				  })
				: null
		);
	}

	/** Sidebar list with the non-text fields of each item (links, files, icons…). */
	function ItemsPanel(props) {
		const { list } = props;
		return h(
			PanelBody,
			{ title: props.title, initialOpen: props.initialOpen !== false },
			list.items.length
				? list.items.map((it, i) =>
						h(
							'div',
							{ key: i, className: 'cbe-panel-item' },
							h('p', { className: 'cbe-panel-item__title' }, i + 1 + '. ' + (plain(props.label(it)) || '—')),
							props.fields(it, (patch) => list.update(i, patch), i)
						)
				  )
				: h('p', { className: 'cbe-muted' }, 'Nessun elemento.')
		);
	}

	function Select(p, label, key, options, help, cast) {
		return h(SelectControl, {
			label,
			help,
			value: String(p.attributes[key]),
			options: options.map((o) => ({ value: String(o[0]), label: o[1] })),
			onChange: (v) => p.setAttributes({ [key]: cast ? cast(v) : v }),
			__nextHasNoMarginBottom: true,
		});
	}

	function Toggle(p, label, key, help) {
		return h(ToggleControl, { label, help, checked: !!p.attributes[key], onChange: (v) => p.setAttributes({ [key]: v }), __nextHasNoMarginBottom: true });
	}

	function Side() {
		return h(InspectorControls, null, ...arguments);
	}

	const gridClass = (a) => ({ 2: 'grid-2', 3: 'grid-3' })[a.columns] || 'grid-4';
	const BTN = { primary: 'btn btn--primary', ghost: 'btn btn--ghost', arrow: 'link-arrow' };
	const BTN_STYLES = [['arrow', 'Link con freccia'], ['primary', 'Pulsante pieno (bronzo)'], ['ghost', 'Pulsante con bordo']];
	const COLUMNS = [[2, '2'], [3, '3'], [4, '4']];

	/** Blocks that can go inside a section / column (no nested sections or page-level blocks). */
	function allowedInside(exclude) {
		return getBlockTypes()
			.map((t) => t.name)
			.filter((n) => exclude.indexOf(n) === -1);
	}
	const PAGE_LEVEL = ['conti/section', 'conti/page-head', 'conti/hero', 'conti/cta', 'conti/column'];

	/** Live preview rendered by the server (catalogue grids, contacts). */
	function Preview(p, name, extra) {
		return h('div', useBlockProps({ className: 'cbe-ssr' }), extra || null, h(ServerSideRender, { block: name, attributes: p.attributes }));
	}

	function ButtonsEdit(props) {
		const { list } = props;
		return h(
			Fragment,
			null,
			h(
				'div',
				{ className: 'btn-row' },
				list.items.map((b, i) =>
					h('span', { key: i, className: 'cbe-item cbe-item--inline ' + (BTN[b.style] || BTN.arrow) }, IT(list, i, 'label', 'span', '', 'Testo'), h(Tools, { list, i }))
				)
			),
			h(Add, { list, tpl: { label: '', url: '', style: props.style || 'arrow' }, label: props.addLabel || 'Aggiungi link' })
		);
	}

	function buttonFields(b, set) {
		return [
			h(LinkField, { key: 'u', label: 'Collegamento', value: b.url, onChange: (url) => set({ url }) }),
			h(FilePick, { key: 'f', value: b.file, label: 'oppure un file da scaricare', onChange: (file) => set({ file }) }),
			h(SelectControl, { key: 's', label: 'Aspetto', value: b.style || 'arrow', options: BTN_STYLES.map((o) => ({ value: o[0], label: o[1] })), onChange: (style) => set({ style }), __nextHasNoMarginBottom: true }),
		];
	}

	/* ── Edit functions ──────────────────────────────────────────────────── */

	const edit = {};

	edit['page-head'] = (p) =>
		h(
			'section',
			useBlockProps({ className: 'page-head' }),
			h(
				'div',
				{ className: 'container' },
				h('nav', { className: 'breadcrumb', 'aria-hidden': true }, h('ol', null, h('li', null, 'Home'), h('li', null, '…'))),
				T(p, 'eyebrow', 'p', 'eyebrow', 'Occhiello (facoltativo)', { optional: true, formats: NONE }),
				T(p, 'heading', 'h1', '', 'Titolo della pagina', { formats: HEAD }),
				T(p, 'lead', 'p', 'lead', 'Testo introduttivo (facoltativo)', { optional: true }),
				T(p, 'intro', 'p', 'intro', 'Testo aggiuntivo (facoltativo)', { optional: true })
			)
		);

	edit.hero = (p) => {
		const a = p.attributes;
		const list = useItems(p, 'buttons');
		return h(
			Fragment,
			null,
			Side(h(ItemsPanel, { list, title: 'Pulsanti', label: (b) => b.label, fields: buttonFields })),
			h(
				'section',
				useBlockProps({ className: 'hero' }),
				h(
					'div',
					{ className: 'container hero__grid' },
					h(
						'div',
						{ className: 'hero__text' },
						T(p, 'eyebrow', 'p', 'eyebrow', 'Occhiello', { optional: true, formats: NONE }),
						T(p, 'heading', 'h1', '', 'Titolo principale', { formats: HEAD }),
						T(p, 'lead', 'p', 'lead', 'Testo introduttivo'),
						h(ButtonsEdit, { list, style: 'primary', addLabel: 'Aggiungi pulsante' })
					),
					h(
						'div',
						{ className: 'hero__media' },
						h(Media, { value: a.image, selected: p.isSelected, onChange: (image) => p.setAttributes({ image }) }),
						h('span', { className: 'hero__badge' }, T(p, 'badgeTitle', 'strong', '', '1919', { formats: NONE }), T(p, 'badgeText', 'span', '', 'Valduggia · Italy', { formats: NONE }))
					)
				)
			)
		);
	};

	edit.section = (p) => {
		const a = p.attributes;
		const cls = (a.padding === 'tight' ? 'section--tight' : 'section') + ({ mist: ' section--mist', night: ' section--night' }[a.background] || '');
		const blockProps = useBlockProps({ className: cls });
		const inner = useInnerBlocksProps(
			{ className: 'container' + ({ narrow: ' narrow', text: ' prose' }[a.width] || '') },
			{ allowedBlocks: allowedInside(PAGE_LEVEL), template: [['core/heading'], ['core/paragraph']] }
		);
		return h(
			Fragment,
			null,
			Side(
				h(
					PanelBody,
					{ title: 'Aspetto della sezione' },
					Select(p, 'Sfondo', 'background', [['white', 'Bianco'], ['mist', 'Grigio chiaro'], ['night', 'Scuro']]),
					Select(p, 'Spazio sopra e sotto', 'padding', [['normal', 'Normale'], ['tight', 'Ridotto']]),
					Select(p, 'Larghezza del contenuto', 'width', [['wide', 'Piena'], ['narrow', 'Stretta (testi, FAQ)'], ['text', 'Colonna di testo']])
				)
			),
			h('section', blockProps, h('div', inner))
		);
	};

	edit.split = (p) =>
		h(
			Fragment,
			null,
			Side(
				h(
					PanelBody,
					{ title: 'Colonne' },
					Toggle(p, 'Inverti: seconda colonna a sinistra', 'reverse', 'Su schermi piccoli le colonne sono sempre una sotto l’altra.'),
					Select(p, 'Allineamento verticale', 'align', [['center', 'Al centro'], ['start', 'In alto']])
				)
			),
			h(
				'div',
				useInnerBlocksProps(useBlockProps({ className: 'split' + (p.attributes.reverse ? ' split--reverse' : '') + (p.attributes.align === 'start' ? ' split--start' : '') }), {
					allowedBlocks: ['conti/column'],
					template: [['conti/column'], ['conti/column']],
					templateLock: 'all',
					orientation: 'horizontal',
				})
			)
		);

	edit.column = () =>
		h(
			'div',
			useInnerBlocksProps(useBlockProps({ className: 'cbe-col' }), {
				allowedBlocks: allowedInside(PAGE_LEVEL.concat(['conti/split'])),
				templateLock: false,
				template: [['core/paragraph']],
			})
		);

	edit['section-head'] = (p) =>
		h(
			Fragment,
			null,
			Side(h(PanelBody, { title: 'Link a destra' }, h(LinkField, { value: p.attributes.linkUrl, onChange: (linkUrl) => p.setAttributes({ linkUrl }) }))),
			h(
				'div',
				useBlockProps({ className: 'section-head' }),
				h(
					'div',
					null,
					T(p, 'eyebrow', 'p', 'eyebrow', 'Occhiello', { optional: true, formats: NONE }),
					T(p, 'heading', 'h2', '', 'Titolo della sezione', { formats: HEAD }),
					T(p, 'text', 'p', '', 'Testo (facoltativo)', { optional: true })
				),
				T(p, 'linkLabel', 'span', 'link-arrow', 'Testo del link (facoltativo)', { optional: true, formats: NONE })
			)
		);

	edit.image = (p) => {
		const a = p.attributes;
		const cls = 'frame' + ({ '16/10': ' frame--wide', '4/3': ' frame--43', '1/1': ' frame--square', auto: ' frame--auto' }[a.ratio] || '') + (a.fit === 'contain' ? ' frame--contain' : '');
		return h(
			Fragment,
			null,
			Side(
				h(
					PanelBody,
					{ title: 'Immagine' },
					Select(p, 'Proporzioni', 'ratio', [['6/5', '6:5 (standard)'], ['16/10', '16:10 (panoramica)'], ['4/3', '4:3'], ['1/1', 'Quadrata'], ['auto', 'Originale, senza cornice']]),
					Select(p, 'Adattamento', 'fit', [['cover', 'Riempi la cornice (ritaglia i bordi)'], ['contain', 'Mostra tutta l’immagine']]),
					h(TextControl, { label: 'Testo alternativo', help: 'Descrive l’immagine a Google e a chi non vede.', value: a.alt || '', onChange: (alt) => p.setAttributes({ alt }), __nextHasNoMarginBottom: true })
				)
			),
			h(
				'figure',
				useBlockProps({ className: 'figure' }),
				h('div', { className: cls }, h(Media, { value: a.image, selected: p.isSelected, onChange: (image) => p.setAttributes({ image }) })),
				T(p, 'caption', 'figcaption', 'small muted', 'Didascalia (facoltativa)', { optional: true })
			)
		);
	};

	edit.stats = (p) => {
		const list = useItems(p);
		const value = 'stat__value' + (p.attributes.color === 'patina' ? ' stat__value--patina' : '');
		return h(
			Fragment,
			null,
			Side(h(PanelBody, { title: 'Aspetto' }, Select(p, 'Colore dei numeri', 'color', [['bronze', 'Bronzo'], ['patina', 'Verde patina']]))),
			h(
				'div',
				useBlockProps(),
				h(
					'div',
					{ className: 'stats' },
					list.items.map((it, i) => h('div', { key: i, className: 'stat cbe-item' }, IT(list, i, 'value', 'div', value, '100%'), IT(list, i, 'label', 'div', 'stat__label', 'Descrizione'), h(Tools, { list, i })))
				),
				h(Empty, { list, text: 'Numeri in evidenza: aggiungi il primo.' }),
				h(Add, { list, tpl: { value: '', label: '' }, label: 'Aggiungi numero' })
			)
		);
	};

	edit['family-grid'] = (p) =>
		h(
			Fragment,
			null,
			Side(h(PanelBody, { title: 'Griglia' }, Select(p, 'Colonne', 'columns', [[3, '3 (schede più grandi)'], [4, '4']], null, Number), Toggle(p, 'Mostra la descrizione della famiglia', 'showIntro'))),
			Preview(p, 'conti/family-grid', h('p', { className: 'cbe-note' }, 'Famiglie di prodotto: si aggiornano da sole dal catalogo.'))
		);

	edit['product-grid'] = (p) => {
		const a = p.attributes;
		return h(
			Fragment,
			null,
			Side(
				h(
					PanelBody,
					{ title: 'Prodotti da mostrare' },
					Select(p, 'Origine', 'source', [['family', 'Tutti i prodotti di una famiglia'], ['alubronze', 'Prodotti disponibili in bronzo-alluminio'], ['codes', 'Codici scelti a mano']]),
					a.source === 'family' || !a.source ? h(SelectControl, { label: 'Famiglia', value: a.family, options: cfg.families || [], onChange: (family) => p.setAttributes({ family }), __nextHasNoMarginBottom: true }) : null,
					a.source === 'codes' ? h(TextControl, { label: 'Codici articolo', help: 'Separati da virgola, es. 04352, 04442', value: a.codes || '', onChange: (codes) => p.setAttributes({ codes }), __nextHasNoMarginBottom: true }) : null
				)
			),
			Preview(p, 'conti/product-grid', h('p', { className: 'cbe-note' }, 'Prodotti dal catalogo: schede sempre aggiornate.'))
		);
	};

	edit.cards = (p) => {
		const a = p.attributes;
		const list = useItems(p);
		const style = a.style || 'cover';
		let body;
		if (style === 'teaser') {
			body = h(
				'div',
				{ className: 'grid grid-2' },
				list.items.map((it, i) =>
					h(
						'div',
						{ key: i, className: 'teaser cbe-item' + (i % 2 ? ' teaser--bronze' : '') },
						IT(list, i, 'eyebrow', 'span', 'eyebrow', 'Occhiello', NONE, true),
						IT(list, i, 'title', 'h2', '', 'Titolo'),
						IT(list, i, 'text', 'p', '', 'Testo (facoltativo)', HEAD, true),
						IT(list, i, 'linkLabel', 'span', 'link-arrow', 'Testo del link', NONE, true),
						h(Tools, { list, i })
					)
				)
			);
		} else {
			body = h(
				'ul',
				{ className: 'grid ' + gridClass(a) + ' cards' },
				list.items.map((it, i) =>
					h(
						'li',
						{ key: i, className: 'card cbe-item' },
						style === 'plain' ? null : h('div', { className: 'card__media card__media--cover' }, h(Media, { value: it.image, selected: list.selected, onChange: (image) => list.update(i, { image }) })),
						h('div', { className: 'card__body' }, IT(list, i, 'title', 'h3', 'card__title', 'Titolo'), IT(list, i, 'text', 'p', 'card__text', 'Testo (facoltativo)', HEAD, true)),
						h(Tools, { list, i })
					)
				)
			);
		}
		return h(
			Fragment,
			null,
			Side(
				h(
					PanelBody,
					{ title: 'Aspetto' },
					Select(p, 'Stile', 'style', [['cover', 'Schede con foto'], ['plain', 'Schede solo testo'], ['teaser', 'Riquadri grandi, 2 per riga']]),
					style !== 'teaser' ? Select(p, 'Colonne', 'columns', COLUMNS, null, Number) : null
				),
				h(ItemsPanel, { list, title: 'Collegamenti delle schede', label: (it) => it.title, fields: (it, set) => h(LinkField, { label: 'Collegamento (facoltativo)', value: it.url, onChange: (url) => set({ url }) }) })
			),
			h('div', useBlockProps(), body, h(Empty, { list, text: 'Schede: aggiungi la prima.' }), h(Add, { list, tpl: { title: '' }, label: 'Aggiungi scheda' }))
		);
	};

	edit.pillars = (p) => {
		const list = useItems(p);
		const style = p.attributes.style === 'patina' ? 'patina' : 'dark';
		return h(
			Fragment,
			null,
			Side(
				h(PanelBody, { title: 'Aspetto' }, Select(p, 'Stile', 'style', [['dark', 'Riquadri scuri (per sezione scura)'], ['patina', 'Riquadri verde chiaro']])),
				h(ItemsPanel, {
					list,
					title: 'Icone',
					label: (it) => it.title,
					fields: (it, set) => h(SelectControl, { label: 'Icona', value: it.icon || '', options: [{ value: '', label: 'Nessuna' }, { value: 'sun', label: 'Sole' }, { value: 'water', label: 'Acqua' }, { value: 'air', label: 'Aria' }], onChange: (icon) => set({ icon }), __nextHasNoMarginBottom: true }),
				})
			),
			h(
				'div',
				useBlockProps(),
				h(
					'div',
					{ className: 'grid grid-3 pillars pillars--' + style },
					list.items.map((it, i) =>
						h(
							'article',
							{ key: i, className: 'pillar cbe-item' },
							it.icon && ICONS[it.icon] ? h('span', { className: 'cbe-icon', dangerouslySetInnerHTML: { __html: ICONS[it.icon] } }) : null,
							IT(list, i, 'title', 'h3', '', 'Titolo'),
							IT(list, i, 'text', 'p', '', 'Testo', INLINE),
							h(Tools, { list, i })
						)
					)
				),
				h(Empty, { list, text: 'Aggiungi il primo punto.' }),
				h(Add, { list, tpl: { title: '', text: '' }, label: 'Aggiungi punto' })
			)
		);
	};

	edit.faq = (p) => {
		const list = useItems(p);
		return h(
			'div',
			useBlockProps(),
			h(
				'div',
				{ className: 'faq' },
				list.items.map((it, i) => h('div', { key: i, className: 'cbe-item cbe-faq' }, IT(list, i, 'q', 'p', 'cbe-faq__q', 'Domanda'), IT(list, i, 'a', 'p', 'cbe-faq__a', 'Risposta', INLINE), h(Tools, { list, i })))
			),
			h(Empty, { list, text: 'Domande frequenti: aggiungi la prima. Google le legge come FAQ.' }),
			h(Add, { list, tpl: { q: '', a: '' }, label: 'Aggiungi domanda' })
		);
	};

	edit.timeline = (p) => {
		const list = useItems(p);
		return h(
			'div',
			useBlockProps(),
			h(
				'ol',
				{ className: 'timeline' },
				list.items.map((it, i) =>
					h(
						'li',
						{ key: i, className: 'milestone cbe-item' },
						IT(list, i, 'year', 'div', 'milestone__year', 'Anno'),
						h('div', { className: 'milestone__body' }, IT(list, i, 'text', 'p', '', 'Cosa è successo', INLINE)),
						h('div', { className: 'milestone__media' }, h(Media, { value: it.image, selected: list.selected, label: 'Foto (facoltativa)', onChange: (image) => list.update(i, { image }) })),
						h(Tools, { list, i })
					)
				)
			),
			h(Empty, { list, text: 'Timeline: aggiungi la prima tappa.' }),
			h(Add, { list, tpl: { year: '', text: '' }, label: 'Aggiungi tappa' })
		);
	};

	edit.steps = (p) => {
		const list = useItems(p);
		const blocks = p.attributes.style === 'blocks';
		const n = (i) => String(i + 1).padStart(2, '0');
		const items = list.items.map((it, i) =>
			blocks
				? h('article', { key: i, className: 'block cbe-item' }, h('span', { className: 'block__n' }, n(i)), IT(list, i, 'title', 'h2', '', 'Titolo'), IT(list, i, 'text', 'p', '', 'Testo', INLINE), h(Tools, { list, i }))
				: h('li', { key: i, className: 'step cbe-item' }, h('span', { className: 'step__n' }, n(i)), IT(list, i, 'title', 'h2', 'step__title', 'Titolo'), IT(list, i, 'text', 'p', '', 'Testo', INLINE), h(Tools, { list, i }))
		);
		return h(
			Fragment,
			null,
			Side(
				h(
					PanelBody,
					{ title: 'Aspetto' },
					Select(p, 'Stile', 'style', [['cards', 'Schede numerate'], ['blocks', 'Paragrafi numerati, 2 per riga']]),
					Toggle(p, 'Descrive un processo (dati strutturati “HowTo” per Google)', 'howTo')
				)
			),
			h('div', useBlockProps(), blocks ? h('div', { className: 'grid grid-2' }, items) : h('ol', { className: 'steps' }, items), h(Empty, { list, text: 'Aggiungi la prima fase.' }), h(Add, { list, tpl: { title: '', text: '' }, label: 'Aggiungi fase' }))
		);
	};

	edit.gallery = (p) => {
		const a = p.attributes;
		const list = useItems(p);
		const style = a.style || 'certificate';
		const pick = (it, i) => h(Media, { value: it.image, selected: list.selected, onChange: (image) => list.update(i, { image }) });
		let body;
		if (style === 'photo') {
			body = h('div', { className: 'photos' }, list.items.map((it, i) => h('div', { key: i, className: 'photo cbe-item' }, pick(it, i), h(Tools, { list, i }))));
		} else if (style === 'plain') {
			body = h('div', { className: 'certs' }, list.items.map((it, i) => h('span', { key: i, className: 'cbe-item' }, pick(it, i), h(Tools, { list, i }))));
		} else {
			const manual = style === 'manual';
			body = h(
				'div',
				{ className: 'grid ' + gridClass(a) + (manual ? ' manuals' : ' gallery') },
				list.items.map((it, i) =>
					h(
						'figure',
						{ key: i, className: 'card cbe-item' },
						h('div', { className: 'card__media ' + (manual ? 'manual' : 'card__media--cert') }, pick(it, i)),
						h('figcaption', { className: 'card__body' + (manual ? '' : ' small') }, IT(list, i, 'label', manual ? 'span' : 'span', manual ? 'card__title' : '', 'Didascalia')),
						h(Tools, { list, i })
					)
				)
			);
		}
		const captionless = style === 'photo' || style === 'plain';
		return h(
			Fragment,
			null,
			Side(
				h(
					PanelBody,
					{ title: 'Aspetto' },
					Select(p, 'Stile', 'style', [['certificate', 'Documenti con didascalia (certificati)'], ['manual', 'Copertine con titolo (manuali)'], ['photo', 'Foto quadrate'], ['plain', 'Documenti affiancati, senza didascalia']]),
					captionless ? null : Select(p, 'Colonne', 'columns', COLUMNS, null, Number)
				),
				h(ItemsPanel, {
					list,
					title: captionless ? 'Descrizione delle immagini' : 'Collegamenti',
					label: (it) => it.label,
					fields: (it, set) =>
						captionless
							? h(TextControl, { label: 'Testo alternativo', value: plain(it.label), onChange: (label) => set({ label }), __nextHasNoMarginBottom: true })
							: h(LinkField, { label: 'Didascalia con link a (facoltativo)', value: it.url, onChange: (url) => set({ url }) }),
				})
			),
			h('div', useBlockProps(), body, h(Empty, { list, text: 'Galleria: aggiungi la prima immagine.' }), h(Add, { list, tpl: { image: 0, label: '' }, label: 'Aggiungi immagine' }))
		);
	};

	edit.documents = (p) => {
		const list = useItems(p);
		return h(
			'div',
			useBlockProps(),
			h(
				'ul',
				{ className: 'docs' },
				list.items.map((it, i) =>
					h(
						'li',
						{ key: i, className: 'doc cbe-item' },
						h('span', { className: 'doc__icon', 'aria-hidden': true }, (plain(it.meta) || 'PDF').split(' ')[0]),
						h('span', { className: 'doc__name' }, IT(list, i, 'name', 'span', '', 'Nome del documento'), IT(list, i, 'meta', 'small', '', 'Tipo e anno, es. PDF · 2024')),
						h(FilePick, { value: it.file, onChange: (file) => list.update(i, { file }) }),
						h(Tools, { list, i })
					)
				)
			),
			h(Empty, { list, text: 'Documenti: aggiungi il primo.' }),
			h(Add, { list, tpl: { name: '', meta: 'PDF', file: 0 }, label: 'Aggiungi documento' })
		);
	};

	edit.facts = (p) => {
		const list = useItems(p);
		return h(
			'div',
			useBlockProps(),
			h(
				'dl',
				{ className: 'facts' },
				list.items.map((it, i) =>
					h(Fragment, { key: i }, IT(list, i, 'term', 'dt', '', 'Voce'), h('dd', { className: 'cbe-item' }, IT(list, i, 'value', 'span', '', 'Valore', INLINE), h(Tools, { list, i })))
				)
			),
			h(Empty, { list, text: 'Scheda dati: aggiungi la prima voce.' }),
			h(Add, { list, tpl: { term: '', value: '' }, label: 'Aggiungi voce' })
		);
	};

	edit.checklist = (p) => {
		const a = p.attributes;
		const list = useItems(p);
		const box = a.style === 'box';
		return h(
			Fragment,
			null,
			Side(
				h(
					PanelBody,
					{ title: 'Aspetto e pulsante' },
					Select(p, 'Stile', 'style', [['plain', 'Semplice'], ['box', 'Riquadro grigio con pulsante']]),
					h(LinkField, { label: 'Collegamento del pulsante', value: a.buttonUrl, onChange: (buttonUrl) => p.setAttributes({ buttonUrl }) })
				)
			),
			h(
				'div',
				useBlockProps({ className: box ? 'options' : 'checklist' }),
				T(p, 'heading', 'h2', box ? '' : 'props-title', 'Titolo (facoltativo)', { optional: true, formats: HEAD }),
				h('ul', { className: 'check-list' }, list.items.map((it, i) => h('li', { key: i, className: 'cbe-item' }, IT(list, i, 'text', 'span', '', 'Voce', INLINE), h(Tools, { list, i })))),
				h(Add, { list, tpl: { text: '' }, label: 'Aggiungi voce' }),
				box || a.buttonLabel ? T(p, 'buttonLabel', 'span', 'btn btn--primary', 'Testo del pulsante', { optional: !box, formats: NONE }) : null
			)
		);
	};

	edit.links = (p) => {
		const list = useItems(p);
		return h(
			Fragment,
			null,
			Side(h(ItemsPanel, { list, title: 'Collegamenti', label: (b) => b.label, fields: buttonFields })),
			h('div', useBlockProps(), h(ButtonsEdit, { list }), h(Empty, { list, text: 'Pulsanti e link: aggiungi il primo e scegli la destinazione nella barra a destra.' }))
		);
	};

	edit.quote = (p) =>
		h(
			'blockquote',
			useBlockProps({ className: 'quote' }),
			h('p', null, '“', T(p, 'text', 'span', '', 'Citazione', { formats: HEAD }), '”'),
			h('footer', null, '— ', T(p, 'author', 'span', '', 'Autore', { formats: NONE }))
		);

	edit.contact = (p) =>
		h(
			Fragment,
			null,
			Side(
				h(
					PanelBody,
					{ title: 'Titoli' },
					h(TextControl, { label: 'Titolo degli uffici', value: plain(p.attributes.departmentsHeading), onChange: (departmentsHeading) => p.setAttributes({ departmentsHeading }), __nextHasNoMarginBottom: true }),
					h(TextControl, { label: 'Titolo dell’indirizzo', value: plain(p.attributes.visitHeading), onChange: (visitHeading) => p.setAttributes({ visitHeading }), __nextHasNoMarginBottom: true }),
					h('p', { className: 'cbe-muted' }, 'Email, telefono e indirizzo si modificano in Impostazioni → Conti.')
				)
			),
			Preview(p, 'conti/contact')
		);

	edit.video = (p) => {
		const id = p.attributes.youtube || '';
		return h(
			Fragment,
			null,
			Side(
				h(
					PanelBody,
					{ title: 'Video' },
					h(TextControl, {
						label: 'Video YouTube (indirizzo o codice)',
						value: id,
						onChange: (v) => {
							const m = String(v).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
							p.setAttributes({ youtube: m ? m[1] : v.trim() });
						},
						help: 'Il video si carica solo quando il visitatore preme play (niente cookie di YouTube prima).',
						__nextHasNoMarginBottom: true,
					})
				)
			),
			h(
				'div',
				useBlockProps(),
				id ? null : h(Notice, { status: 'warning', isDismissible: false }, 'Inserisci l’indirizzo del video nella barra a destra.'),
				h('div', { className: 'yt' }, h('div', { className: 'yt__btn' }, h('span', { className: 'yt__play', dangerouslySetInnerHTML: { __html: cfg.play || '' } }), T(p, 'title', 'span', 'yt__title', 'Titolo del video', { formats: NONE })))
			)
		);
	};

	edit.news = (p) => {
		const list = useItems(p);
		return h(
			Fragment,
			null,
			Side(h(ItemsPanel, { list, title: 'Date', label: (it) => it.title, fields: (it, set) => h(TextControl, { type: 'date', label: 'Data', value: it.date || '', onChange: (date) => set({ date }), __nextHasNoMarginBottom: true }) })),
			h(
				'div',
				useBlockProps({ className: 'news-list' }),
				list.items.map((it, i) =>
					h(
						'article',
						{ key: i, className: 'news cbe-item' },
						h('div', { className: 'news__media' }, h(Media, { value: it.image, selected: list.selected, onChange: (image) => list.update(i, { image }) })),
						h('div', null, h('time', { className: 'small muted' }, it.date || 'Data: impostala a destra'), IT(list, i, 'title', 'h2', '', 'Titolo'), IT(list, i, 'text', 'p', '', 'Testo', INLINE)),
						h(Tools, { list, i })
					)
				),
				h(Empty, { list, text: 'Notizie: aggiungi la prima.' }),
				h(Add, { list, tpl: { date: new Date().toISOString().slice(0, 10), title: '', text: '' }, label: 'Aggiungi notizia' })
			)
		);
	};

	edit.cta = (p) =>
		h(
			Fragment,
			null,
			Side(
				h(
					PanelBody,
					{ title: 'Richiesta di preventivo' },
					h('p', { className: 'cbe-muted' }, 'Titolo e testo lasciati vuoti = testi standard, tradotti automaticamente nella lingua della pagina.'),
					h(TextControl, { label: 'Oggetto dell’email', help: 'Facoltativo: precompila l’oggetto dell’email all’ufficio commerciale.', value: p.attributes.subject || '', onChange: (subject) => p.setAttributes({ subject }), __nextHasNoMarginBottom: true })
				)
			),
			h(
				'section',
				useBlockProps({ className: 'cta' }),
				h(
					'div',
					{ className: 'container cta__inner' },
					h('div', null, T(p, 'title', 'h2', '', cfg.ctaTitle || 'Titolo', { formats: NONE }), T(p, 'text', 'p', '', cfg.ctaText || 'Testo', { formats: NONE, multiline: true })),
					h('div', { className: 'btn-row' }, h('span', { className: 'btn btn--light' }, cfg.ctaQuote || 'Preventivo'), h('span', { className: 'btn cta__ghost' }, cfg.ctaContact || 'Contatti'))
				)
			)
		);

	/* ── Registration (attributes, titles, icons come from PHP) ──────────── */

	const CONTAINERS = ['section', 'split', 'column'];
	Object.keys(edit).forEach((slug) => {
		registerBlockType('conti/' + slug, {
			edit: edit[slug],
			save: CONTAINERS.indexOf(slug) === -1 ? () => null : () => h(InnerBlocks.Content),
		});
	});
})(window.wp, window.contiBlocks);
