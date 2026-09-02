#!/usr/bin/env node
// Fetches ALPR-relevant stories from RSS feeds, filters and dedupes them,
// and splits them two ways:
//   public/data/news.json   — auto-published (trusted specialist outlets)
//   data/news-queue.json    — needs review (general outlets; may be noise)
//
// Always writes lastChecked, even when nothing new turns up, so the page
// can prove it is alive during a quiet week.

import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// trusted: an ALPR keyword hit here is almost certainly a real story, so it
// publishes automatically. review: general-interest feeds where keyword
// matches produce false positives — those queue for a human.
const FEEDS = [
  { url: 'https://www.404media.co/rss/',              outlet: '404 Media',            trust: 'trusted' },
  { url: 'https://www.eff.org/rss/updates.xml',       outlet: 'EFF',                  trust: 'trusted' },
  { url: 'https://ij.org/feed/',                      outlet: 'Institute for Justice',trust: 'trusted' },
  { url: 'https://therecord.media/feed',              outlet: 'The Record',           trust: 'trusted' },
  { url: 'https://www.ipc.on.ca/en/rss.xml',          outlet: 'IPC Ontario',          trust: 'trusted' },
  { url: 'https://stateline.org/feed/',               outlet: 'Stateline',            trust: 'review'  },
  { url: 'https://www.blueline.ca/feed/',             outlet: 'Blue Line',            trust: 'review'  },
  { url: 'https://www.cbc.ca/webfeed/rss/rss-canada-toronto', outlet: 'CBC Toronto',   trust: 'review'  },
  { url: 'https://evanstonroundtable.com/feed/',      outlet: 'Evanston RoundTable',  trust: 'review'  },
];

// Must match at least one. Deliberately narrow: "surveillance" alone pulls
// in far too much unrelated material.
const MATCH = /\b(alpr|anpr|licence plate|license plate|plate reader|plate recognition|flock safety|automatic number.?plate)\b/i;

// Canadian relevance is a bonus signal, not a filter — US developments
// matter here too.
const CANADA = /\b(canada|canadian|ontario|toronto|peel|york region|waterloo|halton|ottawa|rcmp|opp|quebec|british columbia|alberta)\b/i;

const strip = (s = '') =>
  s.replace(/<!\[CDATA\[|\]\]>/g, '')
   .replace(/<[^>]+>/g, ' ')
   .replace(/&(#\d+|[a-z]+);/gi, ' ')
   .replace(/\s+/g, ' ')
   .trim();

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? strip(m[1]) : '';
};

function parseItems(xml) {
  // Handles both RSS <item> and Atom <entry>.
  const chunks = xml.match(/<(item|entry)[\s\S]*?<\/\1>/gi) || [];
  return chunks.map((c) => {
    let link = tag(c, 'link');
    if (!link) {
      const m = c.match(/<link[^>]*href="([^"]+)"/i);   // Atom
      link = m ? m[1] : '';
    }
    return {
      title: tag(c, 'title'),
      url: link,
      date: tag(c, 'pubDate') || tag(c, 'published') || tag(c, 'updated') || '',
      summary: (tag(c, 'description') || tag(c, 'summary') || '').slice(0, 400),
    };
  });
}

async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: { 'User-Agent': 'Readback/1.0 (readback.ofrecord.ca; ALPR transparency)' },
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = parseItems(await res.text());
    console.log(`  ✓ ${feed.outlet}: ${items.length} items`);
    return items.map((i) => ({ ...i, outlet: feed.outlet, trust: feed.trust }));
  } catch (err) {
    // One dead feed must not fail the run.
    console.warn(`  ✗ ${feed.outlet}: ${err.message}`);
    return [];
  }
}

console.log('Fetching news feeds…');
const all = (await Promise.all(FEEDS.map(fetchFeed))).flat();

const relevant = all
  .filter((i) => i.url && i.title)
  .filter((i) => MATCH.test(`${i.title} ${i.summary}`))
  .map((i) => ({
    ...i,
    canada: CANADA.test(`${i.title} ${i.summary}`),
    iso: (() => { const d = new Date(i.date); return isNaN(d) ? null : d.toISOString(); })(),
  }));

console.log(`${relevant.length} ALPR-relevant of ${all.length} total items`);

// Dedupe against everything we've already seen or published.
const pubPath = join(root, 'public/data/news.json');
const quePath = join(root, 'data/news-queue.json');
const prevPub = existsSync(pubPath) ? JSON.parse(readFileSync(pubPath, 'utf8')) : { items: [] };
const prevQue = existsSync(quePath) ? JSON.parse(readFileSync(quePath, 'utf8')) : { items: [] };
const seen = new Set([...prevPub.items, ...prevQue.items].map((i) => i.url));

const fresh = relevant.filter((i) => !seen.has(i.url));
const autoPublish = fresh.filter((i) => i.trust === 'trusted');
const needsReview = fresh.filter((i) => i.trust === 'review');

const byDate = (a, b) => (b.iso || '').localeCompare(a.iso || '');
const now = new Date().toISOString();

const published = {
  lastChecked: now,
  items: [...autoPublish, ...prevPub.items].sort(byDate).slice(0, 40),
};
const queue = {
  lastChecked: now,
  items: [...needsReview, ...prevQue.items].sort(byDate).slice(0, 60),
};

mkdirSync(dirname(pubPath), { recursive: true });
writeFileSync(pubPath, JSON.stringify(published, null, 2));
mkdirSync(dirname(quePath), { recursive: true });
writeFileSync(quePath, JSON.stringify(queue, null, 2));

console.log(`Auto-published: +${autoPublish.length} (${published.items.length} total)`);
console.log(`Queued for review: +${needsReview.length} (${queue.items.length} total)`);
if (needsReview.length) {
  console.log('\nNeeds your review (data/news-queue.json):');
  for (const i of needsReview.slice(0, 10)) console.log(`  · [${i.outlet}] ${i.title}`);
}
