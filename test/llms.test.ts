import { describe, it, expect } from 'vitest';
import { llmsTxt, llmsFullTxt } from '../src/lib/llms';

const data = {
  site: 'https://omeryasironal.com',
  projects: [
    {
      slug: 'akis',
      title: 'AKIS',
      tagline: 'Multi-agent platform.',
      category: 'AI-Agents',
      stack: ['TypeScript'],
      status: 'Live',
      problem: 'P',
      whatIDid: 'W',
      highlights: ['H'],
      links: {},
    },
  ],
  writing: [
    { title: 'RxDart', url: 'https://medium.com/x', source: 'Medium', date: '2025-01-02', lang: 'en' },
  ],
  publications: [{ title: 'Paper', venue: 'IEEE SIU 2025', year: 2025, url: 'https://x' }],
  posts: [
    {
      slug: 'writing-comes-home',
      title: 'Writing comes home',
      description: 'Native now.',
      date: '2026-07-01',
      lang: 'en',
      body: 'Full body text of the announcement.',
    },
  ],
  courses: [
    {
      slug: 'demo-course',
      title: 'Demo',
      description: 'CD',
      level: 'beginner',
      lang: 'en',
      lessons: [{ slug: '01-a', title: 'L1' }],
    },
  ],
};

describe('llmsTxt', () => {
  const out = llmsTxt(data);
  it('starts with the H1 name and a blockquote summary', () => {
    expect(out.startsWith('# Ömer Yasir Önal')).toBe(true);
    expect(out).toMatch(/\n> /);
  });
  it('lists projects with absolute URLs and taglines', () => {
    expect(out).toContain('- [AKIS](https://omeryasironal.com/projects/akis/): Multi-agent platform.');
  });
  it('links writing to its external URL', () => {
    expect(out).toContain('[RxDart](https://medium.com/x)');
  });
  it('reserves a Courses section for Phase 2', () => {
    expect(out).toContain('## Courses');
  });
  it('references the CV PDFs', () => {
    expect(out).toContain('/cv/omer-yasir-onal-en.pdf');
  });
});

describe('llmsFullTxt', () => {
  const out = llmsFullTxt(data);
  it('inlines the full bio and per-project problem/what-I-did', () => {
    expect(out).toContain(data.projects[0].problem);
    expect(out).toContain('Ömer Yasir Önal is a back-end');
  });
});

describe('llmsTxt phase-2 content', () => {
  const out = llmsTxt(data);

  it('lists native posts with absolute internal URLs', () => {
    expect(out).toContain(
      '- [Writing comes home](https://omeryasironal.com/writing/writing-comes-home/): Native now. (2026-07-01, en)',
    );
  });

  it('lists courses when present', () => {
    expect(out).toContain(
      '- [Demo](https://omeryasironal.com/courses/demo-course/): CD (beginner, 1 lesson, en)',
    );
    expect(out).not.toContain('_Coming soon');
  });

  it('keeps the coming-soon line when no course is published', () => {
    expect(llmsTxt({ ...data, courses: [] })).toContain('_Coming soon');
  });

  it('references the feeds', () => {
    expect(out).toContain('https://omeryasironal.com/rss.xml');
    expect(out).toContain('https://omeryasironal.com/feed.json');
  });

  it('interleaves native and external writing newest-first', () => {
    const out = llmsTxt({
      ...data,
      writing: [
        {
          title: 'Newest external',
          url: 'https://medium.com/new',
          source: 'Medium',
          date: '2026-08-01',
          lang: 'en',
        },
        ...data.writing,
      ],
    });
    const newest = out.indexOf('Newest external');
    const native = out.indexOf('Writing comes home');
    const oldest = out.indexOf('RxDart');
    expect(newest).toBeGreaterThan(-1);
    expect(newest).toBeLessThan(native);
    expect(native).toBeLessThan(oldest);
  });
});

describe('llmsFullTxt phase-2 content', () => {
  const out = llmsFullTxt(data);

  it('inlines the full native post body', () => {
    expect(out).toContain('Full body text of the announcement.');
  });

  it('indexes course lessons with absolute URLs', () => {
    expect(out).toContain('- L1: https://omeryasironal.com/courses/demo-course/01-a/');
  });

  it('labels the external-links section distinctly from the merged llms.txt list', () => {
    expect(out).toContain('## External writing');
  });
});
