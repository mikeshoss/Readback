#!/usr/bin/env node
// Renders the social share card and favicon from inline SVG. Run with
// `npm run og` after changing the wordmark or the headline figure; the PNGs
// are committed so the normal build stays dependency-free.
//
// sharp comes in with Astro's image pipeline — no direct dependency added.

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// The count on the card comes from the real dataset, so the card can't drift
// into claiming a number the site doesn't actually show.
const dataPath = join(root, 'public/data/cameras.json');
const total = existsSync(dataPath)
  ? JSON.parse(readFileSync(dataPath, 'utf8')).cameras.length
  : 0;
const count = total.toLocaleString('en-CA');

// Site palette, matched to src/layouts/Base.astro.
const BG = '#101418';
const PANEL = '#161b21';
const LINE = '#232a33';
const TEXT = '#e7ecf2';
const MUTED = '#93a1b1';
const RED = '#ff5a5f';

const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="0" y="0" width="1200" height="8" fill="${RED}"/>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
    <text x="80" y="140" font-size="52" font-weight="700" fill="${TEXT}">Read<tspan fill="${RED}">back</tspan></text>
    <text x="80" y="260" font-size="66" font-weight="700" fill="${TEXT}">Who&#8217;s scanning your plate?</text>
    <text x="80" y="330" font-size="34" fill="${MUTED}">Automated licence plate readers in Canada &#8212; mapped,</text>
    <text x="80" y="378" font-size="34" fill="${MUTED}">with every claim linked to its source.</text>
    <g transform="translate(80,440)">
      <rect width="330" height="110" rx="14" fill="${PANEL}" stroke="${LINE}"/>
      <text x="26" y="58" font-size="44" font-weight="700" fill="${TEXT}">${count}</text>
      <text x="26" y="88" font-size="21" fill="${MUTED}">cameras mapped</text>
    </g>
    <g transform="translate(440,440)">
      <rect width="330" height="110" rx="14" fill="${PANEL}" stroke="${LINE}"/>
      <text x="26" y="58" font-size="44" font-weight="700" fill="${TEXT}">3 min &#8211; forever</text>
      <text x="26" y="88" font-size="21" fill="${MUTED}">how long they keep it</text>
    </g>
    <text x="80" y="592" font-size="24" fill="${MUTED}">readback.ofrecord.ca</text>
  </g>
</svg>`;

// Favicon: the wordmark reduced to its initial, which is what survives at 32px.
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="${BG}"/>
  <rect x="0" y="0" width="512" height="34" fill="${RED}"/>
  <text x="256" y="368" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="330" font-weight="700" fill="${TEXT}">R</text>
</svg>`;

const write = async (svg, out, w, h) => {
  const buf = await sharp(Buffer.from(svg)).resize(w, h).png().toBuffer();
  const dest = join(root, 'public', out);
  writeFileSync(dest, buf);
  console.log(`  ✓ ${out} (${(buf.length / 1024).toFixed(0)} KB)`);
};

console.log(`Rendering share card and icons (${count} cameras)…`);
await write(card, 'og.png', 1200, 630);
await write(icon, 'favicon.png', 180, 180);
await write(icon, 'apple-touch-icon.png', 180, 180);
writeFileSync(join(root, 'public/favicon.svg'), icon);
console.log('  ✓ favicon.svg');
