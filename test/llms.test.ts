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
