import { describe, it, expect } from 'vitest';
import { validateFeed } from '../scripts/check-dist-contract.mjs';

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
});
