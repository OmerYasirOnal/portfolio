import { describe, it, expect } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { validateFeed, checkDist } from '../scripts/check-dist-contract.mjs';

const SITE = 'https://omeryasironal.com';

const validPost = {
  type: 'post',
  slug: 'writing-comes-home',
  lang: 'en',
  title: 'Writing comes home',
  description: 'D',
  date: '2026-07-01',
  tags: ['meta'],
  url: `${SITE}/writing/writing-comes-home/`,
};

const validCourse = {
  type: 'course',
  slug: 'demo-course',
  lang: 'en',
  title: 'Demo',
  description: 'CD',
  tags: [],
  url: `${SITE}/courses/demo-course/`,
  lessons: [
    { slug: '01-first-lesson', title: 'L1', url: `${SITE}/courses/demo-course/01-first-lesson/` },
  ],
};

const validFeed = { version: '1', site: SITE, items: [validPost, validCourse] };

describe('validateFeed', () => {
  it('passes a contract-v1 feed with a post and a course', () => {
    expect(validateFeed(validFeed)).toEqual([]);
  });

  it('rejects a wrong version and a trailing-slashed site', () => {
    expect(validateFeed({ ...validFeed, version: '2' }).join()).toMatch(/version/);
    expect(validateFeed({ ...validFeed, site: `${SITE}/` }).join()).toMatch(/site/);
  });

  it('rejects a post carrying lessons and a missing post date', () => {
    const withLessons = { ...validPost, lessons: [] };
    expect(validateFeed({ ...validFeed, items: [withLessons] }).join()).toMatch(/lessons/);
    const { date: _drop, ...noDate } = validPost;
    expect(validateFeed({ ...validFeed, items: [noDate] }).join()).toMatch(/date/);
  });

  it('rejects non-trailing-slash and off-site URLs', () => {
    const badUrl = { ...validPost, url: `${SITE}/writing/writing-comes-home` };
    expect(validateFeed({ ...validFeed, items: [badUrl] }).join()).toMatch(/url/);
    const offSite = { ...validPost, url: 'https://example.com/writing/x/' };
    expect(validateFeed({ ...validFeed, items: [offSite] }).join()).toMatch(/url/);
  });

  it('rejects a course without lessons and a lesson URL outside the course', () => {
    const noLessons = { ...validCourse, lessons: [] };
    expect(validateFeed({ ...validFeed, items: [noLessons] }).join()).toMatch(/lessons/);
    const strayLesson = {
      ...validCourse,
      lessons: [{ slug: 'x', title: 'X', url: `${SITE}/writing/x/` }],
    };
    expect(validateFeed({ ...validFeed, items: [strayLesson] }).join()).toMatch(/lessons\[0\]/);
  });

  it('tolerates unknown extra fields (additive evolution within v1)', () => {
    const extended = {
      ...validFeed,
      generator: 'astro',
      items: [{ ...validPost, readingMinutes: 3 }, { ...validCourse, level: 'beginner' }],
    };
    expect(validateFeed(extended)).toEqual([]);
  });

  it('rejects an empty items array and a non-object feed', () => {
    expect(validateFeed({ ...validFeed, items: [] }).join()).toMatch(/items/);
    expect(validateFeed(null).length).toBeGreaterThan(0);
  });

  it('reports malformed (non-object) items as violations instead of throwing', () => {
    const out = validateFeed({ ...validFeed, items: [null, 42, validPost] });
    expect(out.join()).toMatch(/items\[0\].*object/);
    expect(out.join()).toMatch(/items\[1\].*object/);
  });
});

function scaffoldDist(feed: unknown): string {
  const dir = mkdtempSync(path.join(tmpdir(), 'dist-'));
  writeFileSync(path.join(dir, 'feed.json'), JSON.stringify(feed));
  writeFileSync(path.join(dir, 'rss.xml'), '<rss version="2.0"></rss>');
  writeFileSync(path.join(dir, 'llms.txt'), 'x');
  writeFileSync(path.join(dir, 'llms-full.txt'), 'x');
  writeFileSync(path.join(dir, 'sitemap-index.xml'), 'x');
  return dir;
}

function addPage(dir: string, rel: string): void {
  mkdirSync(path.join(dir, rel), { recursive: true });
  writeFileSync(path.join(dir, rel, 'index.html'), 'x');
}

describe('checkDist url→page mapping', () => {
  it('passes when every feed url has a built page', () => {
    const dir = scaffoldDist(validFeed);
    addPage(dir, 'writing/writing-comes-home');
    addPage(dir, 'courses/demo-course');
    addPage(dir, 'courses/demo-course/01-first-lesson');
    expect(checkDist(dir)).toEqual([]);
  });

  it('flags feed urls with no built page', () => {
    const dir = scaffoldDist(validFeed);
    const out = checkDist(dir).join('\n');
    expect(out).toMatch(/writing\/writing-comes-home.*no built page/);
    expect(out).toMatch(/courses\/demo-course\/01-first-lesson.*no built page/);
  });
});
