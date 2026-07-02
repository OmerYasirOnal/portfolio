/**
 * Renders public/favicon.svg to a 32x32 favicon.ico so the browsers' implicit
 * /favicon.ico request stops 404ing. The .ico is a single PNG-encoded entry
 * (valid per the ICO spec, universally supported by modern browsers).
 * Regenerate with `pnpm favicon` after changing favicon.svg; commit the output.
 */
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const SIZE = 32;
const png = await sharp('public/favicon.svg').resize(SIZE, SIZE).png().toBuffer();

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count

const entry = Buffer.alloc(16);
entry.writeUInt8(SIZE, 0); // width
entry.writeUInt8(SIZE, 1); // height
entry.writeUInt8(0, 2); // palette count
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(1, 4); // color planes
entry.writeUInt16LE(32, 6); // bits per pixel
entry.writeUInt32LE(png.length, 8); // image data size
entry.writeUInt32LE(22, 12); // image data offset (6 + 16)

writeFileSync('public/favicon.ico', Buffer.concat([header, entry, png]));
console.log(`public/favicon.ico written (${22 + png.length} bytes)`);
