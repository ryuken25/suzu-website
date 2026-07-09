#!/usr/bin/env node
import fs from 'node:fs/promises';
import fss from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const handle = process.env.X_USERNAME || 'ssuzudayo';
const outCollabs = path.join(root, 'src/data/collabs.generated.json');
const outArt = path.join(root, 'src/data/x-art.generated.json');
const outReject = path.join(root, 'data/suzu-x.rejected.json');
const rawOut = path.join(root, 'data/suzu-x.raw.json');
const mediaDir = path.join(root, 'public/suzu/x-art');

const seedIds = new Set([
  // Verified via x_search/fxtwitter. Keep strict classifier; non-art/VRC gets rejected.
  '2002850925304836354',
  '2074969274993795198',
  '2072723512511594669',
  '2074528739103572103',
]);

const extraSeeds = (process.env.SUZU_X_TWEET_IDS || '')
  .split(/[\s,]+/)
  .map((x) => x.trim())
  .filter(Boolean);
extraSeeds.forEach((id) => seedIds.add(id));

function uniq(arr) { return [...new Set(arr.filter(Boolean))]; }
function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
}
function statusUrl(id) { return `https://x.com/${handle}/status/${id}`; }
function textOf(tweet) { return String(tweet?.text || '').replace(/\s+/g, ' ').trim(); }

function classify(tweet) {
  const text = textOf(tweet);
  const lower = text.toLowerCase();
  const photos = tweet?.media?.photos || [];
  const videos = tweet?.media?.videos || [];
  const hasMedia = photos.length > 0 || videos.length > 0;
  const reasons = [];
  const reject = [];

  const gamingSignals = [
    '#mafuyu3d', 'mafuyu3d', 'vrchat', 'vrc', 'game', 'gaming', 'valorant', 'genshin', 'steam',
    'screenshot', 'avatar', '3d model', 'nitro', 'discord nitro', 'school elegant', 'おはよ', 'おやすみ',
  ];
  // Status / gift-received / non-drawing posts must never enter art feed.
  const negativeSignals = [
    'commission open', 'open commission', 'pricelist', 'price list', 'wip', 'sketch', 'practice',
    'raffle', 'giveaway', 'rt @', 'repost', '貰いました', 'プレゼントも', '祝いの言葉',
    '誕生日でした', 'was my birthday', 'received', 'gift from', 'from friends',
  ];
  // Only wording that indicates SHE drew/made illustration.
  const artSignals = [
    '絵しか描けない', '絵を描', '絵描', '描いた', '描き', '描く', '描け', 'イラスト',
    'illust', 'illustration', 'draw', 'drawing', 'drew', 'chibi', '簡単な絵',
  ];
  const collabSignals = [
    'collab', 'collaboration', 'cover', 'mv', 'music video', 'thumbnail', 'visualizer',
    'assets for', 'illustration for', 'art for', 'made for', 'thank you for trusting',
    'commission for', 'joined this project', 'for @', '歌ってみた', 'コラボ', 'イラスト担当', 'mvイラスト',
  ];

  for (const sig of gamingSignals) if (lower.includes(sig)) reject.push(`game/vrc/status signal: ${sig}`);
  for (const sig of negativeSignals) if (lower.includes(sig)) reject.push(`negative signal: ${sig}`);
  if (!hasMedia) reject.push('no artwork media');

  const isArtText = artSignals.some((sig) => lower.includes(sig) || text.includes(sig));
  const isCollabText = collabSignals.some((sig) => lower.includes(sig) || text.includes(sig));
  const mentionMatches = text.match(/@[a-zA-Z0-9_]+/g) || [];
  const collaborators = uniq(mentionMatches.map((x) => x.slice(1)).filter((x) => x.toLowerCase() !== handle.toLowerCase()));
  const hasProjectLink = /https?:\/\//i.test(text) && !text.includes('x.com') && !text.includes('twitter.com');

  if (isArtText) reasons.push('art/illustration wording');
  if (isCollabText) reasons.push('collab/project wording');
  if (collaborators.length) reasons.push(`mentions: ${collaborators.join(', ')}`);
  if (hasProjectLink) reasons.push('external project link');
  if (hasMedia) reasons.push('has media');

  // Require explicit drawing wording + media. Birthday/gift dumps fail without artSignals.
  const artScore = (hasMedia ? 0.3 : 0) + (isArtText ? 0.55 : 0) + (isCollabText ? 0.1 : 0) + (collaborators.length ? 0.05 : 0) - (reject.length ? 0.6 : 0);
  const collabScore = (hasMedia ? 0.2 : 0) + (isCollabText ? 0.35 : 0) + (collaborators.length ? 0.25 : 0) + (hasProjectLink ? 0.1 : 0) + (/thank you for trusting|trusted me|イラスト担当/i.test(text) ? 0.1 : 0) - (reject.length ? 0.5 : 0);

  const approvedArt = artScore >= 0.72 && hasMedia && isArtText && reject.length === 0;
  const approvedCollab = collabScore >= 0.72 && hasMedia && reject.length === 0 && (collaborators.length || hasProjectLink || /for @|illustration for|art for|commission for|イラスト担当/i.test(text));

  if (!approvedArt && reject.length === 0) reject.push(`insufficient art confidence (${artScore.toFixed(2)})`);
  return { text, hasMedia, photos, videos, collaborators, reasons, reject, artScore: +artScore.toFixed(2), collabScore: +collabScore.toFixed(2), approvedArt, approvedCollab };
}

async function discoverWithPlaywright() {
  const ids = [];
  try {
    const { chromium } = await import('playwright');
    const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled'] });
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36' });
    const page = await ctx.newPage();
    await page.addInitScript('Object.defineProperty(navigator, "webdriver", {get: () => undefined})');
    const urls = [
      `https://x.com/${handle}/media`,
      `https://x.com/search?q=from%3A${handle}%20filter%3Aimages&src=typed_query&f=live`,
      `https://x.com/search?q=from%3A${handle}%20(%E7%B5%B5%20OR%20%E6%8F%8F%20OR%20%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%20OR%20chibi%20OR%20art)&src=typed_query&f=live`,
    ];
    for (const url of urls) {
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.waitForTimeout(5000);
        for (let i = 0; i < 7; i++) { await page.mouse.wheel(0, 900); await page.waitForTimeout(1000); }
        const hrefs = await page.evaluate(() => [...document.querySelectorAll('a[href*="/status/"]')].map((a) => a.href));
        for (const href of hrefs) {
          const m = href.match(/status\/(\d+)/);
          if (m) ids.push(m[1]);
        }
      } catch (e) {
        console.warn('playwright page failed:', url, e.message);
      }
    }
    await browser.close();
  } catch (e) {
    console.warn('Playwright discovery unavailable:', e.message);
  }
  return uniq(ids);
}

async function fetchFx(id) {
  const url = `https://api.fxtwitter.com/${handle}/status/${id}`;
  const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 suzu-fetcher' } });
  if (!r.ok) throw new Error(`fxtwitter ${id} HTTP ${r.status}`);
  const d = await r.json();
  return d.tweet || d;
}

async function download(url, file) {
  const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 suzu-fetcher' } });
  if (!r.ok) throw new Error(`media HTTP ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await fs.writeFile(file, buf);
}

async function main() {
  await fs.mkdir(path.dirname(outCollabs), { recursive: true });
  await fs.mkdir(path.dirname(rawOut), { recursive: true });
  await fs.mkdir(mediaDir, { recursive: true });

  const discovered = await discoverWithPlaywright();
  discovered.forEach((id) => seedIds.add(id));
  console.log(`Candidate tweet IDs: ${seedIds.size} (${discovered.length} from Playwright)`);

  const raw = [];
  const artItems = [];
  const collabs = [];
  const rejects = [];

  for (const id of seedIds) {
    try {
      const tweet = await fetchFx(id);
      const c = classify(tweet);
      raw.push({ id, url: statusUrl(id), text: c.text, mediaCount: c.photos.length + c.videos.length, artScore: c.artScore, collabScore: c.collabScore, approvedArt: c.approvedArt, approvedCollab: c.approvedCollab });

      if (c.approvedArt) {
        const media = [];
        let idx = 0;
        for (const p of c.photos.slice(0, 4)) {
          const ext = '.jpg';
          const name = `${id}-${idx}${ext}`;
          const rel = `/suzu/x-art/${name}`;
          const dest = path.join(mediaDir, name);
          const photoUrl = p.url || p.image || p.original || p.proxy_url;
          if (photoUrl && !fss.existsSync(dest)) await download(photoUrl, dest);
          media.push({ url: rel, type: 'photo', alt: `Suzu art from X post ${id}` });
          idx++;
        }
        artItems.push({
          id,
          source: 'x-scrape',
          url: statusUrl(id),
          text: c.text,
          createdAt: tweet.created_at || tweet.createdAt || '',
          media,
          tags: c.approvedCollab ? ['art', 'collab'] : ['art'],
          confidence: c.artScore,
          acceptedReason: c.reasons,
        });
      }

      if (c.approvedCollab) {
        collabs.push({
          id,
          source: 'x-api',
          url: statusUrl(id),
          date: tweet.created_at || tweet.createdAt || new Date().toISOString(),
          text: c.text,
          mediaUrls: artItems.find((x) => x.id === id)?.media?.map((m) => m.url) || [],
          projectLinks: [],
          collaborators: c.collaborators,
          category: /cover|mv|music|歌ってみた/i.test(c.text) ? 'cover-mv' : 'other-collab',
          evidence: c.reasons,
          score: c.collabScore,
          approved: true,
        });
      }

      if (!c.approvedArt && !c.approvedCollab) {
        rejects.push({ id, url: statusUrl(id), text: c.text, rejectReason: c.reject, artScore: c.artScore, collabScore: c.collabScore });
      }
    } catch (e) {
      rejects.push({ id, url: statusUrl(id), rejectReason: [`fetch failed: ${e.message}`] });
    }
  }

  await fs.writeFile(rawOut, JSON.stringify(raw, null, 2) + '\n');
  await fs.writeFile(outArt, JSON.stringify(artItems, null, 2) + '\n');
  await fs.writeFile(outCollabs, JSON.stringify(collabs, null, 2) + '\n');
  await fs.writeFile(outReject, JSON.stringify(rejects, null, 2) + '\n');
  console.log(`Accepted X art: ${artItems.length}`);
  console.log(`Accepted collabs: ${collabs.length}`);
  console.log(`Rejected: ${rejects.length}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
