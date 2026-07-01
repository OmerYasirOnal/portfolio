import { describe, it, expect } from 'vitest';
import {
  withTrailingSlash,
  canonicalHref,
  hreflangLinks,
  personJsonLd,
  webSiteJsonLd,
  breadcrumbJsonLd,
  creativeWorkJsonLd,
  writingItemListJsonLd,
  scholarlyArticleJsonLd,
} from '../src/lib/seo';

const SITE = 'https://omeryasironal.com';

describe('withTrailingSlash', () => {
  it('adds a trailing slash and is idempotent on non-root paths', () => {
    expect(withTrailingSlash('/cv')).toBe('/cv/');
    expect(withTrailingSlash('/cv/')).toBe('/cv/');
    expect(withTrailingSlash('/projects/akis')).toBe('/projects/akis/');
  });
  it('leaves the root untouched', () => {
    expect(withTrailingSlash('/')).toBe('/');
  });
});

describe('canonicalHref', () => {
  it('builds an absolute, trailing-slashed URL matching the sitemap loc', () => {
    expect(canonicalHref('/cv', SITE)).toBe('https://omeryasironal.com/cv/');
    expect(canonicalHref('/', SITE)).toBe('https://omeryasironal.com/');
    expect(canonicalHref('/tr/projects/akis', SITE)).toBe(
      'https://omeryasironal.com/tr/projects/akis/',
    );
  });
});

describe('hreflangLinks', () => {
  it('emits en, tr, and x-default with x-default pointing at the EN twin', () => {
    const links = hreflangLinks('en', '/cv', SITE);
    expect(links).toEqual([
      { hreflang: 'en', href: 'https://omeryasironal.com/cv/' },
      { hreflang: 'tr', href: 'https://omeryasironal.com/tr/cv/' },
      { hreflang: 'x-default', href: 'https://omeryasironal.com/cv/' },
    ]);
  });
  it('computes the EN twin from a TR page', () => {
    const links = hreflangLinks('tr', '/tr/cv', SITE);
    expect(links[0]).toEqual({ hreflang: 'en', href: 'https://omeryasironal.com/cv/' });
    expect(links[1]).toEqual({ hreflang: 'tr', href: 'https://omeryasironal.com/tr/cv/' });
  });
  it('handles the home pair', () => {
    const links = hreflangLinks('en', '/', SITE);
    expect(links[0].href).toBe('https://omeryasironal.com/');
    expect(links[1].href).toBe('https://omeryasironal.com/tr/');
  });
});

describe('personJsonLd', () => {
  it('uses the locale-specific jobTitle', () => {
    expect(personJsonLd(SITE, 'en').jobTitle).toBe('Back-End & Applied AI Engineer');
    expect(personJsonLd(SITE, 'tr').jobTitle).toContain('Yapay Zeka');
  });
  it('defaults to English and lists social profiles in sameAs', () => {
    const p = personJsonLd(SITE);
    expect(p['@type']).toBe('Person');
    expect(p.sameAs).toContain('https://github.com/OmerYasirOnal');
  });
});

describe('webSiteJsonLd', () => {
  it('emits a WebSite node bound to the origin', () => {
    const w = webSiteJsonLd(SITE);
    expect(w['@type']).toBe('WebSite');
    expect(w.url).toBe('https://omeryasironal.com');
    expect(w.inLanguage).toEqual(['en', 'tr']);
  });
});

describe('breadcrumbJsonLd', () => {
  it('numbers positions from 1', () => {
    const b = breadcrumbJsonLd([
      { name: 'Home', url: SITE + '/' },
      { name: 'Projects', url: SITE + '/projects/' },
    ]);
    expect(b['@type']).toBe('BreadcrumbList');
    expect(b.itemListElement[0].position).toBe(1);
    expect(b.itemListElement[1].item).toBe(SITE + '/projects/');
  });
});

describe('creativeWorkJsonLd', () => {
  it('binds the work to the person as author', () => {
    const c = creativeWorkJsonLd(
      {
        title: 'AKIS',
        description: 'Multi-agent platform.',
        category: 'AI-Agents',
        url: SITE + '/projects/akis/',
        stack: ['TypeScript', 'Node'],
      },
      SITE,
    );
    expect(c['@type']).toBe('CreativeWork');
    expect(c.name).toBe('AKIS');
    expect(c.author.name).toBe('Ömer Yasir Önal');
    expect(c.keywords).toBe('TypeScript, Node');
  });
});

describe('writingItemListJsonLd', () => {
  it('wraps each article as a positioned BlogPosting', () => {
    const l = writingItemListJsonLd(
      [{ title: 'RxDart', url: 'https://medium.com/x', date: '2025-01-02' }],
      SITE,
    );
    expect(l['@type']).toBe('ItemList');
    expect(l.itemListElement[0].item['@type']).toBe('BlogPosting');
    expect(l.itemListElement[0].item.datePublished).toBe('2025-01-02');
  });
});

describe('scholarlyArticleJsonLd', () => {
  it('emits a ScholarlyArticle with venue + year', () => {
    const s = scholarlyArticleJsonLd({ title: 'Paper', venue: 'IEEE SIU 2025', year: 2025 }, SITE);
    expect(s['@type']).toBe('ScholarlyArticle');
    expect(s.publication.name).toBe('IEEE SIU 2025');
    expect(s.datePublished).toBe('2025');
  });
});
