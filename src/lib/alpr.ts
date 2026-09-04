// Shared loaders for the generated /alpr/* pages. The camera dataset is read
// once at build time from the same public/data/cameras.json the map fetches at
// runtime, so the pages and the map can never disagree.
import { readFileSync } from 'node:fs';
import retentionData from '../data/retention.json';
import foi from '../data/foi.json';

export type Camera = {
  id: number;
  lat: number;
  lon: number;
  province: string | null;
  // Which OSM tag put this node in the dataset — the denominator behind the
  // tolling finding on /findings.
  source: 'alpr_tagged' | 'toll_gantry' | 'border_control' | 'other';
  category: 'police_alpr' | 'toll' | 'border' | 'private';
  operator: string | null;
  rawOperator: string | null;
  vendorDisputed: boolean;
  manufacturer: string | null;
  zone: string | null;
  cameraType: string | null;
  photo: string | null;
  direction: number | null;
  tollMethod: string | null;
};

const dataPath = new URL('../../public/data/cameras.json', import.meta.url).pathname;
const data = JSON.parse(readFileSync(dataPath, 'utf8')) as {
  generated: string;
  cameras: Camera[];
};

export const cameras = data.cameras;
export const generated = data.generated;

export const CATEGORY_LABEL: Record<Camera['category'], string> = {
  police_alpr: 'Police ALPR',
  toll: 'Toll gantry',
  border: 'Border control',
  private: 'Private / institutional',
};

export const slugify = (s: string) =>
  s.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const osmNode = (id: number) => `https://www.openstreetmap.org/node/${id}`;

export const num = (n: number) => n.toLocaleString('en-CA');

// Search engines truncate meta descriptions around 155-160 characters, and
// Bing reports anything outside roughly 120-160 as an error. Generated pages
// interpolate names of wildly different lengths ("407 ETR" vs "United Chiefs
// and Councils of Manitoulin Anishnaabe Police Service"), so the templates
// aim short and this clamps the outliers at a word boundary rather than
// mid-word.
export const MAX_DESC = 158;

// Length must be measured after HTML-attribute escaping, not before: a single
// double quote renders as &#34; and an apostrophe as &#39;, so a string that
// looks 158 characters long in source can arrive well over the limit. Quotes
// are dropped outright — they read badly in a search result and cost 5
// characters each.
const encodedLen = (s: string) => s.length + (s.match(/[&<>']/g)?.length ?? 0) * 4;

export const clampDesc = (s: string) => {
  let t = s.replace(/["“”]/g, '').replace(/\s+/g, ' ').trim();
  if (encodedLen(t) <= MAX_DESC) return t;
  // Trim whole words until the escaped form fits.
  while (t.length && encodedLen(t) > MAX_DESC - 1) {
    const at = t.lastIndexOf(' ');
    if (at < 60) break;
    t = t.slice(0, at);
  }
  // Prefer ending on a clause boundary. Cutting mid-thought ("...and as a.")
  // reads as broken in a search result; ending a sentence early does not.
  // ...but only when the shorter version still clears the 120-character floor,
  // otherwise the fix trades "too long" for "too short".
  const clause = Math.max(t.lastIndexOf('. '), t.lastIndexOf(' — '), t.lastIndexOf('; '), t.lastIndexOf(', '));
  if (clause > 0 && encodedLen(t.slice(0, clause)) >= 124) t = t.slice(0, clause);
  // A truncation that ends on a dangling connective ("...crime centre that")
  // reads worse than one that stops a word earlier.
  return `${t
    .replace(/[\s,;:.–—-]+$/, '')
    .replace(/\s+(that|and|or|with|which|the|a|an|for|to|of|in|on|plus)$/i, '')
    .replace(/[\s,;:.–—-]+$/, '')}.`;
};

export const countByCategory = (list: Camera[]) => {
  const c: Partial<Record<Camera['category'], number>> = {};
  for (const x of list) c[x.category] = (c[x.category] ?? 0) + 1;
  return Object.entries(c).sort((a, b) => b[1] - a[1]) as [Camera['category'], number][];
};

// Retention and FOI facts are joined by name — both files carry join keys that
// match the operator strings in cameras.json. A miss means we have nothing
// sourced to say, which the pages state plainly rather than papering over.
export const retentionFor = (opts: { operator?: string; province?: string }) =>
  retentionData.entries.filter(
    (e: any) =>
      (opts.operator && e.operator === opts.operator) ||
      (opts.province && e.province === opts.province),
  );

export const foiFor = (operator: string) =>
  foi.requests.filter((r: any) => r.institution === operator);

// The quality floor from the SEO plan: a page earns its place with enough
// cameras to be worth reading, or with a sourced policy fact to report.
// Everything else stays on the map only — thin pages hurt the whole site.
export const MIN_CAMERAS = 3;
export const earnsAPage = (list: Camera[], facts: unknown[]) =>
  list.length >= MIN_CAMERAS || facts.length > 0;
