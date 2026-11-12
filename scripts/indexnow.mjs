/**
 * Pings IndexNow (Bing, Yandex, Seznam, Naver; Bing also feeds ChatGPT search
 * and Copilot) with every URL in the live sitemap. Run after a deploy:
 *   node scripts/indexnow.mjs
 * The key file is public/5514dd2933594bf7b667ab00e2ae7705.txt (served at the site root).
 */
const SITE = 'https://omeryasironal.com';
const KEY = '5514dd2933594bf7b667ab00e2ae7705';

const xml = async (url) => (await fetch(url)).text();
const locs = (s) => [...s.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const index = await xml(`${SITE}/sitemap-index.xml`);
const urls = (await Promise.all(locs(index).map(async (m) => locs(await xml(m))))).flat();
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${urls.length} URLs -> HTTP ${res.status}`);
