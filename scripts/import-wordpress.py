#!/usr/bin/env python3
"""Convert the WordPress (WXR) export of the old contivalves.com into src/data/catalog.json.

Usage:  python3 scripts/import-wordpress.py path/to/export.xml

Only the product catalogue is imported automatically (125 products, ACF fields,
qTranslate-X multilingual strings). Page copy was rewritten by hand in src/content/pages.
The WordPress export itself is NOT committed: it contains user accounts and e-mails.
"""
import html
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

NS = {
    "wp": "http://wordpress.org/export/1.2/",
    "content": "http://purl.org/rss/1.0/modules/content/",
}
OUT = Path(__file__).resolve().parent.parent / "src" / "data" / "catalog.json"

# Old taxonomy slug -> new family key (English, stable). Order = display order.
FAMILIES = [
    ("valvole-a-sfera", "ball-valves"),
    ("valvole-a-saracinesca", "gate-valves"),
    ("valvole-a-globo", "globe-valves"),
    ("valvole-a-ritegno", "check-valves"),
    ("valvole-a-filtro", "y-strainers"),
    ("rubinetto-a-maschio", "plug-valves"),
    ("valvole-di-sicurezza", "safety-valves"),
    ("idranti", "fire-valves"),
    ("riduttori-di-pressione", "pressure-reducing-valves"),
    ("stopcocks", "stopcocks"),
    ("indicatori-di-livello", "level-indicators"),
]

# Material table part names (EN key). Some Italian labels slipped into the EN tables.
PARTS = {
    "CORPO": "BODY", "SFERA": "BALL", "ASTA": "STEM", "SEDE": "SEAT",
}

# Dimension-table row labels that are words (letters like "L mm" stay as they are).
ROW_LABELS = [
    (r"^weight\s*\(?kg\)?$", "weight"),
    (r"^holes? (per|x) cm2$", "holesPerCm2"),
    (r"^holes? dimension$", "holeSize"),
    (r"^holes pitch mm$", "holePitch"),
    (r"^holes percentage on total surface$", "openArea"),
    (r"^inscribed hole diam\.micron$", "holeMicron"),
    (r"^n°fori$", "holeCount"),
    (r"^mesh$", "mesh"),
    (r"^op\.torque nm$", "torque"),
    (r"^square on plug dim\.$", "plugSquare"),
    (r"^connection mm$", "connection"),
]


def split_langs(s):
    """qTranslate-X '[:en]..[:it]..[:]' -> {'en':..., 'it':...}. Unmarked text belongs to all."""
    out = {l: "" for l in ("en", "it", "es", "fr", "de")}
    if not s:
        return out
    pos, cur = 0, None
    for m in re.finditer(r"\[:(\w\w)?\]", s):
        seg = s[pos:m.start()]
        for l in ([cur] if cur else out):
            out[l] += seg
        cur, pos = m.group(1), m.end()
    for l in ([cur] if cur else out):
        out[l] += s[pos:]
    return out


def text(s):
    s = html.unescape(re.sub(r"<[^>]+>", " ", s or ""))
    return re.sub(r"\s+", " ", s).strip()


def table_rows(h):
    rows = []
    for tr in re.findall(r"<tr[^>]*>(.*?)</tr>", h or "", re.S):
        cells = [text(c) for c in re.findall(r"<t[dh][^>]*>(.*?)</t[dh]>", tr, re.S)]
        if any(cells):
            rows.append(cells)
    return rows


def norm_size(v):
    v = re.sub(r"(\d)-(\d)", r"\1/\2", v)  # 1-4" -> 1/4", 1"1-4 -> 1"1/4
    return v


def norm_row_label(label):
    low = label.strip().lower()
    for pat, key in ROW_LABELS:
        if re.match(pat, low):
            return {"key": key}
    label = re.sub(r"\s*mm\b", " mm", label).replace("  ", " ").strip()
    label = label.replace("Φ.", "Ø").replace("J.mm", "J mm").replace("(", " (").replace("  ", " ")
    return {"label": label}


DUPLICATES = []
SIZE_RE = re.compile(r'^(\d+(/\d+)?"(\d+/\d+)?(PS|PI)?|\d{2,3}|FERULE|BANJO|)$')


def is_header(row):
    vals = [norm_size(v) for v in row[1:]]
    return not row[0].strip() and sum(bool(SIZE_RE.match(v)) for v in vals) >= max(1, len(vals) - 1)


def one_table(header, body_rows):
    sizes = [norm_size(c) for c in header[1:]]
    if any(re.fullmatch(r"0\d\d", s) for s in sizes):
        sizes = ["DN " + s.lstrip("0") if re.fullmatch(r"\d+", s) else s for s in sizes]
    # Some tables carry an extra qualifier column (e.g. "F mm | max", "| min").
    qualifier = sizes and sizes[0] == ""
    if qualifier:
        sizes = sizes[1:]
    body, prev = [], None
    for r in body_rows:
        label, values = r[0], r[1:]
        if qualifier and len(values) == len(sizes) + 1:
            q, values = values[0], values[1:]
            label = f"{label or prev} ({q})" if q else (label or prev)
        prev = r[0] or prev
        if len(values) != len(sizes):
            print(f"  dropped row {label!r}: {len(values)} values for {len(sizes)} sizes", file=sys.stderr)
            continue
        entry = norm_row_label(label)
        entry["values"] = values
        body.append(entry)
    return {"head": header[0] or None, "sizes": sizes, "rows": body}


def split_side_by_side(rows):
    """70057: 'FERULE | BANJO' caption row + two tables laid out next to each other."""
    if len(rows) < 3 or len(rows[0]) >= len(rows[1]):
        return None
    captions, header, body = rows[0], rows[1], rows[2:]
    k = next((i for i in range(1, len(header)) if header[i] == "" and
              any(len(r) > i and re.search(r"[A-Za-z]", r[i]) for r in body)), None)
    if k is None:
        return None
    tables = []
    for n, (a, b) in enumerate(((0, k), (k, len(header)))):
        part = [header[a:b]] + [r[a:b] for r in body if any(c.strip() for c in r[a:b])]
        t = one_table(part[0], part[1:])
        t["head"] = captions[n] if n < len(captions) else None
        tables.append(t)
    return tables


def dims(h):
    rows = table_rows(h)
    if not rows:
        return []
    side = split_side_by_side(rows)
    if side:
        return side
    groups = [[rows[0], []]]
    for r in rows[1:]:
        if is_header(r):
            groups.append([r, []])
        else:
            groups[-1][1].append(r)
    # The old site often carried a second, near-identical copy of the table below the first
    # one (leftovers from editing). Keep the first; the report lists the others for review.
    tables = [t for t in (one_table(h, b) for h, b in groups) if t["rows"]]
    if len(tables) > 1:
        DUPLICATES.append(tables)
    return tables[:1]


MATERIAL_RE = re.compile(r"^(?P<name>[A-Z][A-Z +]*?)[- ]?(?P<grade>C[A-Z]\d{3}[A-Z]?)?\s*(?P<std>UNI EN ?\d+)?$")
GRADE_FIX = {"CW614": "CW614N", "CW617": "CW617N"}


def material(raw):
    """'BRONZE-CC491K UNI EN1982' -> {'name': 'BRONZE', 'grade': 'CC491K', 'standard': 'UNI EN 1982'}"""
    raw = re.sub(r"\s+", " ", raw).strip()
    raw = re.sub(r"^OTTONE", "BRASS", raw)
    if raw in ("INOX", "STAINLESS STEEL"):
        return {"name": "STAINLESS STEEL"}
    if raw == "STAINLESS STEEL AISI 316":
        return {"name": "AISI 316"}
    m = MATERIAL_RE.match(raw)
    if not m or not (m.group("grade") or m.group("std")):
        return {"name": raw}
    out = {"name": m.group("name").strip()}
    if m.group("grade"):
        out["grade"] = GRADE_FIX.get(m.group("grade"), m.group("grade"))
    if m.group("std"):
        out["standard"] = re.sub(r"UNI EN ?", "UNI EN ", m.group("std"))
    return out


def materials(h):
    out = []
    for r in table_rows(h):
        if len(r) < 2:
            continue
        part = PARTS.get(r[0].upper(), r[0].upper())
        out.append({"part": part, **material(r[1])})
    return out


# Old free-text version descriptions -> one clean English wording (translated in src/data/glossary.ts).
VARIANT_TEXT = {
    "ALL IN BRONZE": "All bronze",
    "ALL IN Bz/Al": "All aluminium bronze",
    "ALL IN BZ/AL": "All aluminium bronze",
    "ALL Bz/Al": "All aluminium bronze",
    "ALL IN BRONZE AND FACE TO FACE ASTM B16,10 ASA150": "All bronze, face-to-face to ASTM B16.10 (ASA 150)",
    "ALL IN BRONZE, WITH FACE TO FACE ASTM B16,10 ASA150": "All bronze, face-to-face to ASTM B16.10 (ASA 150)",
    "ALL IN Bz/Al, WITH FACE TO FACE ASTM B16,10 ASA150": "All aluminium bronze, face-to-face to ASTM B16.10 (ASA 150)",
    "AS1628 MATERIAL": "Materials to AS 1628",
    "AS 1628 MATERIAL": "Materials to AS 1628",
    "AISI1628 MATERIAL": "Materials to AS 1628",
    "PTFE DISC": "PTFE disc",
    "NBR DISC": "NBR disc",
    "METAL DISC": "Metal disc",
    "PTFE DISC AND STAINLESS STEEL SPRING": "PTFE disc and stainless steel spring",
    "NBR DISC AND STAINLESS STEEL SPRING": "NBR disc and stainless steel spring",
    "STAINLESS STEEL SEAT AND DISC": "Stainless steel seat and disc",
    "STAINLESS STEEL SEAT, DISC AND SPRING": "Stainless steel seat, disc and spring",
    "STAINLESS STEEL SEAT, SPRING AND PTFE DISC": "Stainless steel seat and spring, PTFE disc",
    "AISI316 DISC AND RENEVABLE SEAT": "AISI 316 disc and renewable seat",
    "DISC AND RENEWABLE SEAT AISI 316": "AISI 316 disc and renewable seat",
    "WITH DISC AND RENEVABLE SEAT AISI 316": "AISI 316 disc and renewable seat",
    "WITH DISC AND RENEVABLE SEAT AISI 316, DZR BRASS STEM": "AISI 316 disc and renewable seat, DZR brass stem",
    "AISI 316 TRIM AND RENEVABLE SEAT": "AISI 316 trim and renewable seat",
    "TRIM IN AISI316 AND RENEWABLE SEAT": "AISI 316 trim and renewable seat",
    "TRIM IN AISI 316 AND RENAWABLE SEAT": "AISI 316 trim and renewable seat",
    "MONEL DISC AND RENEWABLE SEAT": "Monel disc and renewable seat",
    "MONEL SEAT AND DISC": "Monel seat and disc",
    "TRIM IN MONEL AND RENEWABLE SEAT": "Monel trim and renewable seat",
    "AISI 316 BALL AND STEM": "AISI 316 ball and stem",
    "BALL AND STEM AISI 316": "AISI 316 ball and stem",
    "BALL AISI 316 BALL SUITABLE FOR DRINKING WATER": "AISI 316 ball, suitable for drinking water",
    "MONEL 400 BALL AND STEM": "Monel 400 ball and stem",
    "Bz/Al BALL": "Aluminium bronze ball",
    "Bz/Al BALL AND STEM": "Aluminium bronze ball and stem",
    "BALL AND STEM Bz/Al": "Aluminium bronze ball and stem",
    "Bz/Al BODY, AISI 316 BALL AND STEM": "Aluminium bronze body, AISI 316 ball and stem",
    "TIPE L": "L-port (type L)",
    "ONLY BANJO": "Banjo only",
    "WITH PLUG": "With drain plug",
}


def variants(meta):
    found = []
    for key, val in meta.items():
        if key.startswith("_") or not val:
            continue
        if not (key.endswith("_testo") or key == "monel_400"):
            continue
        parts = split_langs(val)
        raw = parts["en"] or parts["it"]
        for m in re.finditer(r"<h2[^>]*>(.*?)</h2>(.*?)(?=<h2|\Z)", raw, re.S):
            code = text(m.group(1))
            body = m.group(2)
            rating = re.search(r'class="sottotitolo"[^>]*>(.*?)</div>', body, re.S)
            desc = text(re.sub(r'<div class="sottotitolo".*?</div>', "", body, flags=re.S))
            if desc not in VARIANT_TEXT:
                print(f"  unknown version text {desc!r} ({code})", file=sys.stderr)
            found.append({
                "code": code,
                "text": VARIANT_TEXT.get(desc, desc),
                "rating": text(rating.group(1)) if rating else None,
            })
    # stable order by code
    return sorted(found, key=lambda v: v["code"])


def media_path(url):
    m = re.search(r"/wp-content/uploads/(.+)$", url or "")
    return m.group(1) if m else None


def main(xml_path):
    ch = ET.parse(xml_path).getroot().find("channel")
    items, terms = [], {}
    for it in ch.findall("item"):
        items.append({
            "id": int(it.findtext("wp:post_id", namespaces=NS)),
            "type": it.findtext("wp:post_type", namespaces=NS),
            "status": it.findtext("wp:status", namespaces=NS),
            "slug": it.findtext("wp:post_name", namespaces=NS),
            "title": it.findtext("title"),
            "order": int(it.findtext("wp:menu_order", namespaces=NS) or 0),
            "content": it.findtext("content:encoded", namespaces=NS),
            "url": it.findtext("wp:attachment_url", namespaces=NS),
            "cats": [c.get("nicename") for c in it.findall("category") if c.get("domain") == "categorie_prodotti"],
            "meta": {m.findtext("wp:meta_key", namespaces=NS): m.findtext("wp:meta_value", namespaces=NS)
                     for m in it.findall("wp:postmeta", NS)},
        })
    for t in ch.findall("wp:term", NS):
        if t.findtext("wp:term_taxonomy", namespaces=NS) != "categorie_prodotti":
            continue
        meta = {m.findtext("wp:meta_key", namespaces=NS): m.findtext("wp:meta_value", namespaces=NS)
                for m in t.findall("wp:termmeta", NS)}
        slug = t.findtext("wp:term_slug", namespaces=NS)
        terms[slug] = {
            "slug": slug,
            "parent": t.findtext("wp:term_parent", namespaces=NS) or None,
            "name_it": t.findtext("wp:term_name", namespaces=NS),
            "key": meta.get("_qts_slug_en") or slug,
            "image": meta.get("immagine_categoria"),
        }

    att = {i["id"]: i for i in items if i["type"] == "attachment"}

    def att_path(v):
        return media_path(att[int(v)]["url"]) if v and v.isdigit() and int(v) in att else None

    fam_by_slug = dict(FAMILIES)
    subcats, products = {}, []
    for p in items:
        if p["type"] != "prodotti" or p["status"] != "publish":
            continue
        fam = next((fam_by_slug[c] for c in p["cats"] if c in fam_by_slug), None)
        if not fam:
            print(f"skip {p['title']}: no product family", file=sys.stderr)
            continue
        sub = next((terms[c] for c in p["cats"] if c in terms and terms[c]["parent"]), None)
        if sub:
            subcats.setdefault(sub["key"], {
                "key": sub["key"], "family": fam, "wpSlug": sub["slug"],
                "name_it": sub["name_it"], "image": att_path(sub["image"]),
            })
        desc = split_langs(p["content"])
        mats = split_langs(p["meta"].get("materiali"))
        code = text(p["title"])
        DUPLICATES.clear()
        dim_tables = dims(p["meta"].get("tabella"))
        if DUPLICATES:
            print(f"  {text(p['title'])}: {len(DUPLICATES[0])} dimension tables, kept the first", file=sys.stderr)
        products.append({
            "code": code,
            "slug": code.lower(),
            "wpId": p["id"],
            "wpSlug": p["slug"],
            "family": fam,
            "subcategory": sub["key"] if sub else None,
            "order": p["order"],
            "rating": text(p["meta"].get("sottotitolo")) or None,
            "description": {"en": text(desc["en"]), "it": text(desc["it"])},
            "materials": materials(mats["en"]),
            "dimensions": dim_tables,
            "variants": variants(p["meta"]),
            "image": att_path(p["meta"].get("_thumbnail_id")),
            "drawing": att_path(p["meta"].get("disegno_tecnico")),
        })

    # Subcategory display order follows the old mega-menu (roughly: threaded, flanged, special).
    sub_order = [s for s in terms.values() if s["parent"]]
    catalog = {
        "families": [{"key": key, "wpSlug": slug} for slug, key in FAMILIES],
        "subcategories": [subcats[s["key"]] for s in sub_order if s["key"] in subcats],
        "products": sorted(products, key=lambda p: (p["family"], p["subcategory"] or "", p["order"], p["code"])),
    }
    OUT.write_text(json.dumps(catalog, ensure_ascii=False, indent=1) + "\n")
    print(f"{len(products)} products, {len(catalog['subcategories'])} subcategories -> {OUT}")


if __name__ == "__main__":
    main(sys.argv[1])
