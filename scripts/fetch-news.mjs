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
  // Canada-scoped Google News queries. Canadian ALPR coverage is thin and
  // scattered across local outlets, so a targeted search finds what no single
  // Canadian feed does. canadaOnly drops the US spillover these still return.
  { url: 'https://news.google.com/rss/search?q=(%22licence+plate+reader%22+OR+%22license+plate+reader%22+OR+ALPR)+(Canada+OR+Ontario+OR+Toronto+OR+RCMP+OR+OPP+OR+%22police+service%22)&hl=en-CA&gl=CA&ceid=CA:en',
    outlet: 'Google News (Canada)', trust: 'trusted', canadaOnly: true },
  { url: 'https://news.google.com/rss/search?q=%22licence+plate+recognition%22+OR+%22automatic+licence+plate%22&hl=en-CA&gl=CA&ceid=CA:en',
    outlet: 'Google News (Canada)', trust: 'trusted', canadaOnly: true },
  { url: 'https://stateline.org/feed/',               outlet: 'Stateline',            trust: 'review'  },
  { url: 'https://www.cbc.ca/webfeed/rss/rss-canada-toronto', outlet: 'CBC Toronto',   trust: 'review'  },
  { url: 'https://evanstonroundtable.com/feed/',      outlet: 'Evanston RoundTable',  trust: 'review'  },
];

// Must match at least one. Deliberately narrow: "surveillance" alone pulls
// in far too much unrelated material.
const MATCH = /\b(alpr|anpr|licence plate|license plate|plate reader|plate recognition|flock safety|automatic number.?plate)\b/i;

// Canadian relevance is a bonus signal, not a filter — US developments
// matter here too.
// Kills the recurring false positive: Ontario plate-sticker renewal stories.
const EXCLUDE = /\b(renewal|renewals|sticker|licence plate renewal|plate sticker)\b/i;

// Enforcement stories — "ALPR nabs suspended driver", "hit leads to drug
// seizure". Kept and labelled rather than dropped: they are a real part of
// what is happening, and readers can weigh them knowing what they are.
const BLOTTER = /\b(charged|arrest\w*|nabbed|seizure|seized|impaired|stolen vehicle|lays? charges|cocaine|fentanyl|drugs?|wanted man|suspended driver|evade|traffic stop|recover\w* stolen)\b/i;

// A story earns a place only if it touches policy, deployment, oversight or
// privacy — the accountability beat, not the crime beat. Stems matter:
// "install" must catch "installed"/"installing". Bare "law" is deliberately
// absent — it matches "law enforcement" in every police blotter item.
const SIGNAL = /\b(privacy|surveillance|civil liberties|oversight|watchdog|commissioner|retention|policy|policies|council|contract\w*|procurement|tender|expand\w*|install\w*|deploy\w*|rollout|roll out|program\w*|legislation|bill\b|court|lawsuit|ruling|appeal|charter|audit\w*|concern\w*|debate|oppos\w*|ban\b|cancel\w*|scrap|data.?sharing|ICE\b|freedom of information|outrage|backlash|scrutiny|question\w*|new tech\w*|highway|considering|eyes\b)\b/i;

// Only surface reasonably current items in the auto feed.
const MAX_AGE_DAYS = 550;

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
    return items.map((i) => ({ ...i, outlet: feed.outlet, trust: feed.trust, canadaOnly: !!feed.canadaOnly }));
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
  .filter((i) => !EXCLUDE.test(`${i.title} ${i.summary}`))

  .map((i) => ({
    ...i,
    canada: CANADA.test(`${i.title} ${i.summary}`),
    // 'enforcement' = police-blotter style (an arrest, a seizure, a stop).
    // 'policy' = deployment, oversight, litigation, privacy. Labelled on the
    // page so readers can tell the police narrative from the accountability one.
    kind: BLOTTER.test(i.title) && !SIGNAL.test(i.title) ? 'enforcement' : 'policy',
    iso: (() => { const d = new Date(i.date); return isNaN(d) ? null : d.toISOString(); })(),
  }))
  // Canada-scoped feeds still return US spillover — drop it rather than
  // letting a Canada query pad the international pile.
  .filter((i) => !i.canadaOnly || i.canada);

console.log(`${relevant.length} ALPR-relevant of ${all.length} total items (${relevant.filter(i=>i.canada).length} Canadian)`);

// Dedupe against everything we've already seen or published.
const pubPath = join(root, 'public/data/news.json');
const quePath = join(root, 'data/news-queue.json');
const prevPub = existsSync(pubPath) ? JSON.parse(readFileSync(pubPath, 'utf8')) : { items: [] };
const prevQue = existsSync(quePath) ? JSON.parse(readFileSync(quePath, 'utf8')) : { items: [] };
const norm = (t) => t.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim().slice(0, 90);
const seenUrl = new Set([...prevPub.items, ...prevQue.items].map((i) => i.url));
const seenTitle = new Set([...prevPub.items, ...prevQue.items].map((i) => norm(i.title)));

const cutoff = Date.now() - MAX_AGE_DAYS * 86400000;
const fresh = [];
for (const i of relevant) {
  if (seenUrl.has(i.url) || seenTitle.has(norm(i.title))) continue;   // same story, two queries
  if (i.iso && new Date(i.iso).getTime() < cutoff) continue;          // stale
  seenUrl.add(i.url); seenTitle.add(norm(i.title));
  fresh.push(i);
}
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
