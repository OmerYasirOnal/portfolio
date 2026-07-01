import { describe, it, expect } from 'vitest';
import { buildFeedJson, rssItems } from '../src/lib/feed';

const SITE = 'https://omeryasironal.com';
const post = {
  slug: 'writing-comes-home',
  lang: 'en',
  title: 'Writing comes home',
  description: 'D',
  date: '2026-07-01',
  tags: ['meta'],
};
const course = {
  slug: 'demo-course',
  lang: 'en',
  title: 'Demo',
  description: 'CD',
  tags: [],
  lessons: [{ slug: '01-first-lesson', title: 'L1' }],
};

describe('buildFeedJson', () => {
  const feed = buildFeedJson({ site: SITE, posts: [post], courses: [course] });

  it('pins the contract version and site (no trailing slash)', () => {
    expect(feed.version).toBe('1');
    expect(feed.site).toBe(SITE);
    const fromSlashed = buildFeedJson({ site: SITE + '/', posts: [], courses: [] });
    expect(fromSlashed.site).toBe(SITE);
  });

  it('maps posts with absolute trailing-slashed URLs and no lessons key', () => {
    const p = feed.items.find((i) => i.type === 'post')!;
    expect(p.url).toBe(`${SITE}/writing/writing-comes-home/`);
    expect(p.date).toBe('2026-07-01');
    expect(p.tags).toEqual(['meta']);
    expect('lessons' in p).toBe(false);
  });

  it('maps courses with lesson URLs', () => {
    const c = feed.items.find((i) => i.type === 'course')!;
    expect(c.url).toBe(`${SITE}/courses/demo-course/`);
    expect(c.lessons![0].url).toBe(`${SITE}/courses/demo-course/01-first-lesson/`);
    expect('date' in c).toBe(false);
  });

  it('omits updated when absent, includes it when present', () => {
    expect('updated' in feed.items.find((i) => i.type === 'post')!).toBe(false);
    const f = buildFeedJson({ site: SITE, posts: [{ ...post, updated: '2026-07-02' }], courses: [] });
    expect(f.items[0].updated).toBe('2026-07-02');
  });

  it('orders posts newest-first', () => {
    const f = buildFeedJson({
      site: SITE,
      posts: [post, { ...post, slug: 'newer', date: '2026-07-05' }],
      courses: [],
    });
    expect(f.items[0].slug).toBe('newer');
  });

  it('breaks same-date ties deterministically by slug', () => {
    const f = buildFeedJson({
      site: SITE,
      posts: [{ ...post, slug: 'zzz-later-in-alphabet' }, post],
      courses: [],
    });
    expect(f.items.map((i) => i.slug)).toEqual(['writing-comes-home', 'zzz-later-in-alphabet']);
  });
});

describe('rssItems', () => {
  it('merges native posts and external articles newest-first', () => {
    const items = rssItems({
      site: SITE,
      posts: [post],
      external: [{ title: 'Old medium', url: 'https://medium.com/x', date: '2023-03-13' }],
    });
    expect(items[0].link).toBe(`${SITE}/writing/writing-comes-home/`);
    expect(items[0].description).toBe('D');
    expect(items[0].pubDate.toISOString().startsWith('2026-07-01')).toBe(true);
    expect(items[1].link).toBe('https://medium.com/x');
  });

  it('breaks same-date ties deterministically by link', () => {
    const items = rssItems({
      site: SITE,
      posts: [{ ...post, slug: 'zzz-later' }, post],
      external: [],
    });
    expect(items.map((i) => i.link)).toEqual([
      `${SITE}/writing/writing-comes-home/`,
      `${SITE}/writing/zzz-later/`,
    ]);
  });
});
