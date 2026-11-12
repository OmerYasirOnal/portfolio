/**
 * Brand kit generator. The ÖY mark: an "O" ring with two square umlaut dots and
 * a node-graph "Y" inside (engineering + networks/AI). Writes:
 *   public/favicon.svg, public/favicon.ico, public/apple-touch-icon.png,
 *   public/brand/logo-mark.svg, logo-mark-dark.svg, logo-lockup.svg,
 *   logo-512.png, instagram-avatar-1080.png, instagram-highlight-*.png
 * Run: node scripts/build-brand.mjs  (then commit the outputs)
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const INK = '#07110d';
const PAPER = '#f7f6f2';
const A1 = '#5eead4';
const A2 = '#34d399';
const A3 = '#0b8a63';

const defs = (id) => `<defs>
  <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${A1}"/><stop offset=".5" stop-color="${A2}"/><stop offset="1" stop-color="${A3}"/>
  </linearGradient>
</defs>`;

/** The mark drawn on a 64x64 grid. `ring` is the O colour. */
const markBody = (ring, grad) => `
  <circle cx="32" cy="36" r="18" fill="none" stroke="${ring}" stroke-width="5"/>
  <rect x="21.5" y="5.5" width="6" height="6" rx="1.4" fill="url(#${grad})"/>
  <rect x="36.5" y="5.5" width="6" height="6" rx="1.4" fill="url(#${grad})"/>
  <path d="M24.5 27.5 L32 36 L39.5 27.5 M32 36 V46" fill="none" stroke="url(#${grad})" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="24.5" cy="27.5" r="2.6" fill="${A1}"/>
  <circle cx="39.5" cy="27.5" r="2.6" fill="${A2}"/>
  <circle cx="32" cy="46" r="2.6" fill="${A3}"/>`;

const tile = (size, pad = 0.16) => {
  const s = 64 * (1 - pad * 2);
  const o = 64 * pad;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
${defs('g')}
<rect width="64" height="64" rx="14" fill="${INK}"/>
<g transform="translate(${o} ${o}) scale(${s / 64})">${markBody(PAPER, 'g')}</g>
</svg>`;
};

const round = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
${defs('g')}
<radialGradient id="bg" cx=".3" cy=".2" r="1"><stop offset="0" stop-color="#0f2a20"/><stop offset="1" stop-color="${INK}"/></radialGradient>
<rect width="64" height="64" fill="url(#bg)"/>
<g transform="translate(11 10) scale(${42 / 64})">${markBody(PAPER, 'g')}</g>
</svg>`;

const mark = (ring) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Ömer Yasir Önal logo">
${defs('g')}${markBody(ring, 'g')}
</svg>`;

const lockup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" role="img" aria-label="Ömer Yasir Önal">
${defs('g')}
<g transform="translate(10 10) scale(1.5625)">${markBody(INK, 'g')}</g>
<text x="128" y="66" font-family="Inter, 'Helvetica Neue', Arial, sans-serif" font-size="44" font-weight="700" letter-spacing="-1.2" fill="${INK}">ömer yasir önal</text>
<text x="130" y="96" font-family="'JetBrains Mono', Menlo, monospace" font-size="15" font-weight="500" letter-spacing="2.4" fill="${A3}">ENGINEER · WEB · ADS · AI CONTENT</text>
</svg>`;

mkdirSync('public/brand', { recursive: true });
writeFileSync('public/favicon.svg', tile(64, 0.14));
writeFileSync('public/brand/logo-mark.svg', mark(INK));
writeFileSync('public/brand/logo-mark-dark.svg', mark(PAPER));
writeFileSync('public/brand/logo-lockup.svg', lockup);

const png = (svg, size) => sharp(Buffer.from(svg), { density: 600 }).resize(size, size).png().toBuffer();
writeFileSync('public/apple-touch-icon.png', await png(tile(180, 0.16), 180));
writeFileSync('public/brand/logo-512.png', await png(tile(512, 0.16), 512));
writeFileSync('public/brand/instagram-avatar-1080.png', await png(round(1080), 1080));

// favicon.ico: single 32x32 PNG entry.
const ico = await png(tile(32, 0.12), 32);
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);
entry.writeUInt8(32, 1);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(ico.length, 8);
entry.writeUInt32LE(22, 12);
writeFileSync('public/favicon.ico', Buffer.concat([header, entry, ico]));

// Instagram story-highlight covers (1080x1920, icon centred in safe circle).
const highlight = (label, glyph) => `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
${defs('g')}
<rect width="1080" height="1920" fill="${INK}"/>
<circle cx="540" cy="960" r="300" fill="none" stroke="url(#g)" stroke-width="10" opacity=".55"/>
<g transform="translate(540 930)">${glyph}</g>
<text x="540" y="1150" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-size="64" font-weight="700" letter-spacing="6" fill="${PAPER}">${label}</text>
</svg>`;
const glyphs = {
  web: `<rect x="-120" y="-90" width="240" height="170" rx="18" fill="none" stroke="url(#g)" stroke-width="16"/><path d="M-40 -20 L-75 10 L-40 40 M40 -20 L75 10 L40 40" fill="none" stroke="${PAPER}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>`,
  reklam: `<path d="M-110 -30 L40 -95 V95 L-110 30 Z" fill="none" stroke="url(#g)" stroke-width="16" stroke-linejoin="round"/><path d="M75 -45 Q115 0 75 45" fill="none" stroke="${PAPER}" stroke-width="14" stroke-linecap="round"/>`,
  icerik: `<rect x="-80" y="-120" width="160" height="240" rx="26" fill="none" stroke="url(#g)" stroke-width="16"/><path d="M-25 -40 L40 0 L-25 40 Z" fill="${PAPER}"/>`,
  ai: `<path d="M0 -120 L28 -28 L120 0 L28 28 L0 120 L-28 28 L-120 0 L-28 -28 Z" fill="url(#g)"/>`,
};
for (const [name, label] of [['web', 'WEB'], ['reklam', 'REKLAM'], ['icerik', 'İÇERİK'], ['ai', 'AI']]) {
  const buf = await sharp(Buffer.from(highlight(label, glyphs[name]))).png().toBuffer();
  writeFileSync(`public/brand/instagram-highlight-${name}.png`, buf);
}
console.log('brand kit written to public/brand, favicon.svg/.ico, apple-touch-icon.png');
