/**
 * Build-time tripwire for the machine-feed contract (spec §5, contract v1).
 * The Flutter app and AI crawlers consume /feed.json — a contract break must
 * fail the build, not ship. Runs as the tail of `pnpm build`; also directly:
 *   node scripts/check-dist-contract.mjs [distDir=dist]
 *
 * Unknown extra fields are tolerated by design: contract v1 evolves
 * additively, so the checker only asserts what consumers rely on.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const LANGS = new Set(['en', 'tr']);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Validate a parsed feed.json against contract v1. Empty array = pass. */
export function validateFeed(feed) {
  if (!feed || typeof feed !== 'object' || Array.isArray(feed)) {
    return ['feed.json: expected a JSON object'];
  }
  const errors = [];
  if (feed.version !== '1') {
    errors.push(`version: expected "1", got ${JSON.stringify(feed.version)}`);
  }
  if (typeof feed.site !== 'string' || !/^https:\/\/[^/]+$/.test(feed.site)) {
    errors.push(`site: expected an https origin without trailing slash, got ${JSON.stringify(feed.site)}`);
  }
  if (!Array.isArray(feed.items) || feed.items.length === 0) {
    errors.push('items: expected a non-empty array');
    return errors;
  }
  feed.items.forEach((item, i) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      errors.push(`items[${i}]: expected an object`);
      return;
    }
    const at = `items[${i}] (${item?.slug ?? '?'})`;
    if (item.type !== 'post' && item.type !== 'course') {
      errors.push(`${at}: type must be "post" or "course"`);
    }
    for (const key of ['slug', 'title', 'description']) {
      if (typeof item[key] !== 'string' || item[key] === '') {
        errors.push(`${at}: ${key} must be a non-empty string`);
      }
    }
    if (!LANGS.has(item.lang)) errors.push(`${at}: lang must be "en" or "tr"`);
    if (!Array.isArray(item.tags) || item.tags.some((t) => typeof t !== 'string')) {
      errors.push(`${at}: tags must be an array of strings`);
    }
    if (
      typeof item.url !== 'string' ||
      !item.url.startsWith(`${feed.site}/`) ||
      !item.url.endsWith('/')
    ) {
      errors.push(`${at}: url must be absolute under site and trailing-slashed`);
    }
    if (item.type === 'post') {
      if (!ISO_DATE.test(item.date ?? '')) errors.push(`${at}: post date must be YYYY-MM-DD`);
      if (item.updated !== undefined && !ISO_DATE.test(item.updated)) {
        errors.push(`${at}: updated must be YYYY-MM-DD when present`);
      }
      if ('lessons' in item) errors.push(`${at}: a post must not carry lessons`);
    } else if (item.type === 'course') {
      if (item.date !== undefined && !ISO_DATE.test(item.date)) {
        errors.push(`${at}: course date must be YYYY-MM-DD when present`);
      }
      if (!Array.isArray(item.lessons) || item.lessons.length === 0) {
        errors.push(`${at}: a course must carry a non-empty lessons array`);
      } else {
        item.lessons.forEach((lesson, j) => {
          const lat = `${at}.lessons[${j}]`;
          if (typeof lesson.slug !== 'string' || lesson.slug === '') {
            errors.push(`${lat}: slug must be a non-empty string`);
          }
          if (typeof lesson.title !== 'string' || lesson.title === '') {
            errors.push(`${lat}: title must be a non-empty string`);
          }
          if (
            typeof lesson.url !== 'string' ||
            !lesson.url.startsWith(`${feed.site}/courses/${item.slug}/`) ||
            !lesson.url.endsWith('/')
          ) {
            errors.push(`${lat}: url must live under the course URL and be trailing-slashed`);
          }
        });
      }
    }
  });
  return errors;
}

/** A feed URL must map to a built page: <dist>/<url path>/index.html. */
function pageFileErrors(distDir, site, url) {
  const rel = url.slice(site.length).replace(/^\/+|\/+$/g, '');
  const page = path.join(distDir, rel, 'index.html');
  return existsSync(page) ? [] : [`feed url ${url} has no built page at dist/${rel}/index.html`];
}

/** Validate the built dist/ surface: feed contract + companion feeds exist. */
export function checkDist(distDir) {
  const errors = [];
  const feedPath = path.join(distDir, 'feed.json');
  if (!existsSync(feedPath)) {
    errors.push('dist/feed.json missing');
  } else {
    let feed;
    try {
      feed = JSON.parse(readFileSync(feedPath, 'utf8'));
    } catch (e) {
      errors.push(`dist/feed.json is not valid JSON: ${e.message}`);
    }
    if (feed !== undefined) {
      const feedErrors = validateFeed(feed);
      errors.push(...feedErrors);
      // Only map URLs to pages when the shape is valid — bad shapes already failed.
      if (feedErrors.length === 0) {
        for (const item of feed.items) {
          errors.push(...pageFileErrors(distDir, feed.site, item.url));
          for (const lesson of item.lessons ?? []) {
            errors.push(...pageFileErrors(distDir, feed.site, lesson.url));
          }
        }
      }
    }
  }
  const rssPath = path.join(distDir, 'rss.xml');
  if (!existsSync(rssPath)) errors.push('dist/rss.xml missing');
  else if (!readFileSync(rssPath, 'utf8').includes('<rss')) {
    errors.push('dist/rss.xml has no <rss> element');
  }
  for (const name of ['llms.txt', 'llms-full.txt', 'sitemap-index.xml']) {
    const p = path.join(distDir, name);
    if (!existsSync(p) || readFileSync(p, 'utf8').trim() === '') {
      errors.push(`dist/${name} missing or empty`);
    }
  }
  return errors;
}

const isMain =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const distDir = path.resolve(process.argv[2] ?? 'dist');
  const errors = checkDist(distDir);
  if (errors.length > 0) {
    console.error(`feed contract check FAILED (${errors.length} violation${errors.length === 1 ? '' : 's'}):`);
    for (const e of errors) console.error(` - ${e}`);
    process.exit(1);
  }
  console.log('feed contract check passed');
}
