import { describe, it, expect } from 'vitest';
import {
  projectSchema,
  experienceSchema,
  writingSchema,
  publicationSchema,
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
