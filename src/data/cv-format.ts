/**
 * Locale-aware formatting for the print résumé (`cv-print/[lang].astro`).
 *
 * Pure, side-effect-free helpers so they can be unit-tested directly and reused
 * at RENDER time without mutating the source frontmatter. English is the source
 * form and passes through untouched; only Turkish is localized.
 */
import type { Locale } from './i18n';

/** English 3-letter month abbreviation → Turkish abbreviation. */
const TR_MONTHS: Readonly<Record<string, string>> = {
  Jan: 'Oca.',
  Feb: 'Şub.',
  Mar: 'Mar.',
  Apr: 'Nis.',
  May: 'May.',
  Jun: 'Haz.',
  Jul: 'Tem.',
  Aug: 'Ağu.',
  Sep: 'Eyl.',
  Oct: 'Eki.',
  Nov: 'Kas.',
  Dec: 'Ara.',
};

/** Place names that differ between locales on the résumé. */
const TR_PLACES: Readonly<Record<string, string>> = {
  Istanbul: 'İstanbul',
};

/**
 * Localize a single date token: `"Dec 2025"` → `"Ara. 2025"`,
 * `"Present"` → `"Günümüz"`. Bare years (`"2024"`) and unknown tokens pass
 * through unchanged. English is a no-op.
 */
export function localizeDate(value: string, locale: Locale): string {
  if (locale !== 'tr') return value;
  if (value === 'Present') return 'Günümüz';
  const match = value.match(/^([A-Za-z]{3})\s+(\d{4})$/);
  const month = match ? TR_MONTHS[match[1]] : undefined;
  return match && month ? `${month} ${match[2]}` : value;
}

/** Localize a location token: `"Istanbul"` → `"İstanbul"` on TR. EN is a no-op. */
export function localizeLocation(value: string, locale: Locale): string {
  if (locale !== 'tr') return value;
  return TR_PLACES[value] ?? value;
}

/** A start–end period, locale-aware: `"Ara. 2025 – Günümüz"` on TR. */
export function formatPeriod(start: string, end: string, locale: Locale): string {
  return `${localizeDate(start, locale)} – ${localizeDate(end, locale)}`;
}

/**
 * Drop a trailing version marker from a single tech token so the résumé reads
 * cleanly: `"React 19"` → `"React"`, `"Astro 5"` → `"Astro"`,
 * `"Next.js 16"` → `"Next.js"`, `"Tailwind CSS v4"` → `"Tailwind CSS"`.
 *
 * Only a *trailing* space-separated version (optional `v`, then a digit and
 * any dots) is stripped — so embedded product numbers stay intact
 * (`"GTM/GA4"`, `"Ed25519"`, `"Three.js"` are untouched). Locale-independent:
 * the tech line is the same in both résumé variants.
 */
export function stripTechVersion(tech: string): string {
  return tech.replace(/\s+v?\d[\d.]*$/, '');
}

/**
 * Characters that Unicode NFKD decomposition does NOT reduce to an ASCII base
 * (they carry no separable combining mark), plus the typographic punctuation an
 * ATS parser (Workday / Greenhouse) mishandles. Applied AFTER NFKD, so accented
 * Latin/Turkish letters like `ö ü ç ş ğ İ` are already handled by the strip; the
 * only Turkish letter needing an explicit rule is the dotless `ı`.
 */
const ASCII_FALLBACK: Readonly<Record<string, string>> = {
  ı: 'i',
  İ: 'I',
  ß: 'ss',
  Æ: 'AE',
  æ: 'ae',
  Œ: 'OE',
  œ: 'oe',
  Ø: 'O',
  ø: 'o',
  Ł: 'L',
  ł: 'l',
  Đ: 'D',
  đ: 'd',
  Þ: 'Th',
  þ: 'th',
  '–': '-', // en dash
  '—': '-', // em dash
  '―': '-', // horizontal bar
  '‐': '-', // hyphen
  '‑': '-', // non-breaking hyphen
  '‒': '-', // figure dash
  '−': '-', // minus sign
  '‘': "'", // left single quote
  '’': "'", // right single quote / apostrophe
  '“': '"', // left double quote
  '”': '"', // right double quote
  '„': '"', // low double quote
  '…': '...', // ellipsis
  ' ': ' ', // non-breaking space
  ' ': ' ', // thin space
  ' ': ' ', // narrow no-break space
};

/**
 * Fold a string to ASCII-safe form for the international / EU résumé variants:
 * strips diacritics from Latin and Turkish letters (`Ömer Yasir Önal` →
 * `Omer Yasir Onal`, `Türkiye` → `Turkiye`, `TÜBİTAK` → `TUBITAK`) and
 * normalizes smart punctuation (curly quotes, en/em dashes, the minus sign,
 * ellipsis) to plain ASCII so Workday/Greenhouse-style parsers read the text
 * cleanly. Pure and idempotent; the Turkish variant never calls it.
 *
 * Decorative separators the résumé uses as dividers (`·`, `→`) are intentionally
 * left untouched — they are not textual content and parse fine.
 */
export function asciiFold(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // drop combining diacritical marks
    .replace(/[^\u0000-\u007f]/g, (ch) => ASCII_FALLBACK[ch] ?? ch);
}
