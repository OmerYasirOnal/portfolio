import { describe, it, expect } from 'vitest';
import {
  projectSchema,
  experienceSchema,
  writingSchema,
  publicationSchema,
  postSchema,
  courseSchema,
  lessonSchema,
} from '../src/content/schemas';

const validProject = {
  title: 'AKIS',
  tagline_en: 'Multi-agent software platform with human-approval gates.',
  tagline_tr: 'İnsan onay kapılı çok-ajanlı yazılım platformu.',
  category: 'AI-Agents',
  stack: ['TypeScript', 'Node', 'Astro'],
  status_en: 'Live self-hosted instance',
  status_tr: 'Canlı self-hosted örnek',
};

describe('projects schema', () => {
  it('accepts a minimal valid entry and applies defaults', () => {
    const parsed = projectSchema.parse(validProject);
    expect(parsed.featured).toBe(false);
    expect(parsed.order).toBe(99);
    expect(parsed.draft).toBe(false);
    expect(parsed.links).toEqual({});
    expect(parsed.highlights_en).toEqual([]);
    expect(parsed.highlights_tr).toEqual([]);
  });

  it('requires bilingual taglines and status', () => {
    expect(projectSchema.safeParse({ ...validProject, tagline_tr: undefined }).success).toBe(false);
    expect(projectSchema.safeParse({ ...validProject, status_tr: undefined }).success).toBe(false);
  });

  it('rejects an unknown category', () => {
    expect(projectSchema.safeParse({ ...validProject, category: 'Blockchain' }).success).toBe(false);
  });

  it('requires at least one stack entry', () => {
    expect(projectSchema.safeParse({ ...validProject, stack: [] }).success).toBe(false);
  });

  it('validates link URLs', () => {
    expect(
      projectSchema.safeParse({ ...validProject, links: { repo: 'not-a-url' } }).success,
    ).toBe(false);
    const ok = projectSchema.parse({
      ...validProject,
      links: { repo: 'https://github.com/OmerYasirOnal/akis', live: 'https://akisflow.com' },
    });
    expect(ok.links.live).toBe('https://akisflow.com');
  });

  it('coerces featured/order/draft when provided', () => {
    const parsed = projectSchema.parse({ ...validProject, featured: true, order: 1, draft: true });
    expect(parsed.featured).toBe(true);
    expect(parsed.order).toBe(1);
    expect(parsed.draft).toBe(true);
  });
});

describe('experience schema', () => {
  const validExperience = {
    role_en: 'AI Fellow',
    role_tr: 'AI Fellow',
    org: 'Program',
    start: '2024',
    end: '2025',
    bullets_en: ['Did a thing'],
    bullets_tr: ['Bir şey yaptım'],
    order: 1,
  };

  it('accepts a valid entry and defaults location', () => {
    const parsed = experienceSchema.parse(validExperience);
    expect(parsed.location).toBe('Istanbul');
  });

  it('requires order and bilingual bullets', () => {
    expect(experienceSchema.safeParse({ ...validExperience, order: undefined }).success).toBe(false);
    expect(experienceSchema.safeParse({ ...validExperience, bullets_tr: undefined }).success).toBe(
      false,
    );
  });
});

describe('writing schema', () => {
  const validWriting = {
    title: 'On agents',
    url: 'https://medium.com/@omer/on-agents',
    source: 'Medium',
    date: '2025-10-22',
    lang: 'en',
  };

  it('requires a valid url and defaults order and home', () => {
    const parsed = writingSchema.parse(validWriting);
    expect(parsed.order).toBe(99);
    expect(parsed.home).toBe(false);
    expect(parsed.date).toBe('2025-10-22');
    expect(parsed.lang).toBe('en');
    expect(writingSchema.safeParse({ ...validWriting, url: 'nope' }).success).toBe(false);
  });

  it('accepts the optional home flag', () => {
    expect(writingSchema.parse({ ...validWriting, home: true }).home).toBe(true);
    expect(writingSchema.safeParse({ ...validWriting, home: 'yes' }).success).toBe(false);
  });

  it('requires an ISO date and a valid lang', () => {
    expect(writingSchema.safeParse({ ...validWriting, date: undefined }).success).toBe(false);
    expect(writingSchema.safeParse({ ...validWriting, date: '19-12-2025' }).success).toBe(false);
    expect(writingSchema.safeParse({ ...validWriting, lang: undefined }).success).toBe(false);
    expect(writingSchema.safeParse({ ...validWriting, lang: 'de' }).success).toBe(false);
  });
});

describe('publications schema', () => {
  it('accepts a valid entry with optional url', () => {
    const parsed = publicationSchema.parse({
      title_en: 'A study',
      title_tr: 'Bir çalışma',
      venue: 'IEEE SIU 2025',
      year: 2025,
    });
    expect(parsed.year).toBe(2025);
    expect(parsed.url).toBeUndefined();
  });

  it('rejects a non-numeric year', () => {
    expect(
      publicationSchema.safeParse({
        title_en: 'A study',
        title_tr: 'Bir çalışma',
        venue: 'IEEE SIU 2025',
        year: '2025',
      }).success,
    ).toBe(false);
  });
});

describe('post schema', () => {
  const validPost = {
    title: 'Writing comes home',
    description: 'New articles publish natively on this site.',
    date: '2026-07-01',
    lang: 'en',
  };

  it('accepts a minimal entry and applies defaults', () => {
    const parsed = postSchema.parse(validPost);
    expect(parsed.tags).toEqual([]);
    expect(parsed.draft).toBe(false);
    expect(parsed.home).toBe(false);
    expect(parsed.updated).toBeUndefined();
  });

  it('requires an ISO date and a valid lang', () => {
    expect(postSchema.safeParse({ ...validPost, date: '01-07-2026' }).success).toBe(false);
    expect(postSchema.safeParse({ ...validPost, date: undefined }).success).toBe(false);
    expect(postSchema.safeParse({ ...validPost, lang: 'de' }).success).toBe(false);
  });

  it('validates optional updated and canonical', () => {
    expect(postSchema.parse({ ...validPost, updated: '2026-07-02' }).updated).toBe('2026-07-02');
    expect(postSchema.safeParse({ ...validPost, updated: 'yesterday' }).success).toBe(false);
    expect(postSchema.safeParse({ ...validPost, canonical: 'not-a-url' }).success).toBe(false);
  });

  it('rejects empty title/description strings', () => {
    expect(postSchema.safeParse({ ...validPost, title: '' }).success).toBe(false);
    expect(postSchema.safeParse({ ...validPost, description: '' }).success).toBe(false);
  });
});

describe('course schema', () => {
  const validCourse = {
    title: 'Demo course',
    description: 'A skeleton course.',
    level: 'beginner',
    lang: 'en',
  };

  it('accepts a minimal entry and applies defaults', () => {
    const parsed = courseSchema.parse(validCourse);
    expect(parsed.tags).toEqual([]);
    expect(parsed.order).toBe(99);
    expect(parsed.draft).toBe(false);
  });

  it('rejects an unknown level and a missing description', () => {
    expect(courseSchema.safeParse({ ...validCourse, level: 'expert' }).success).toBe(false);
    expect(courseSchema.safeParse({ ...validCourse, description: undefined }).success).toBe(false);
  });

  it('rejects empty title/description strings', () => {
    expect(courseSchema.safeParse({ ...validCourse, title: '' }).success).toBe(false);
    expect(courseSchema.safeParse({ ...validCourse, description: '' }).success).toBe(false);
  });
});

describe('lesson schema', () => {
  it('requires only a title', () => {
    const parsed = lessonSchema.parse({ title: 'How lessons work' });
    expect(parsed.description).toBeUndefined();
  });

  it('rejects a missing title', () => {
    expect(lessonSchema.safeParse({}).success).toBe(false);
  });

  it('rejects an empty title', () => {
    expect(lessonSchema.safeParse({ title: '' }).success).toBe(false);
  });
});
