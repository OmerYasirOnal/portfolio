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
  blogPostingJsonLd,
  courseJsonLd,
  serviceOfferCatalogJsonLd,
  faqPageJsonLd,
  jsonLdScript,
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

describe('blogPostingJsonLd', () => {
  it('emits a BlogPosting with dates, language and keywords', () => {
    const p = blogPostingJsonLd(
      {
        title: 'T',
        description: 'D',
        url: SITE + '/writing/t/',
        date: '2026-07-01',
        updated: '2026-07-02',
        lang: 'en',
        tags: ['meta', 'site'],
      },
      SITE,
    );
    expect(p['@type']).toBe('BlogPosting');
    expect(p.datePublished).toBe('2026-07-01');
    expect(p.dateModified).toBe('2026-07-02');
    expect(p.inLanguage).toBe('en');
    expect(p.keywords).toBe('meta, site');
    expect(p.author.name).toBe('Ömer Yasir Önal');
    expect(p.mainEntityOfPage).toBe(SITE + '/writing/t/');
  });

  it('falls back dateModified to the publish date and omits empty keywords', () => {
    const p = blogPostingJsonLd(
      { title: 'T', description: 'D', url: SITE + '/writing/t/', date: '2026-07-01', lang: 'tr', tags: [] },
      SITE,
    );
    expect(p.dateModified).toBe('2026-07-01');
    expect('keywords' in p).toBe(false);
  });
});

describe('serviceOfferCatalogJsonLd', () => {
  it('emits a Service with an OfferCatalog of priced tiers', () => {
    const s = serviceOfferCatalogJsonLd(
      {
        name: 'Packages',
        description: 'Fixed-scope brand + website tiers.',
        url: SITE + '/packages/',
        tiers: [
          { name: 'Starter', description: 'One-page site.', priceFrom: 15000 },
          { name: 'Growth', description: 'Multi-page site.', priceFrom: 35000 },
        ],
      },
      SITE,
    );
    expect(s['@type']).toBe('Service');
    expect(s.provider.name).toBe('Ömer Yasir Önal');
    expect(s.hasOfferCatalog['@type']).toBe('OfferCatalog');
    expect(s.hasOfferCatalog.itemListElement).toHaveLength(2);
    expect(s.hasOfferCatalog.itemListElement[1].price).toBe(35000);
    expect(s.hasOfferCatalog.itemListElement[1].priceCurrency).toBe('TRY');
  });
});

describe('faqPageJsonLd', () => {
  it('emits a FAQPage with each Q wrapped as a Question + accepted Answer', () => {
    const f = faqPageJsonLd([
      { question: 'Are these the final prices?', answer: 'They are starting points.' },
      { question: 'How long does it take?', answer: 'About a week.' },
    ]);
    expect(f['@type']).toBe('FAQPage');
    expect(f.mainEntity).toHaveLength(2);
    expect(f.mainEntity[0]['@type']).toBe('Question');
    expect(f.mainEntity[0].name).toBe('Are these the final prices?');
    expect(f.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
    expect(f.mainEntity[0].acceptedAnswer.text).toBe('They are starting points.');
  });
});

describe('jsonLdScript', () => {
  it('escapes </script> sequences for safe inline injection', () => {
    const out = jsonLdScript({ headline: 'Why </script> breaks embeds' });
    expect(out).not.toContain('</script>');
    expect(JSON.parse(out).headline).toBe('Why </script> breaks embeds');
  });
});

describe('courseJsonLd', () => {
  it('emits a free online Course with an instance and lesson parts', () => {
    const c = courseJsonLd(
      {
        title: 'C',
        description: 'D',
        url: SITE + '/courses/c/',
        lang: 'en',
        level: 'beginner',
        tags: ['demo'],
        lessons: [{ title: 'L1', url: SITE + '/courses/c/01-l1/' }],
      },
      SITE,
    );
    expect(c['@type']).toBe('Course');
    expect(c.isAccessibleForFree).toBe(true);
    expect(c.hasCourseInstance.courseMode).toBe('online');
    expect(c.hasPart[0].url).toBe(SITE + '/courses/c/01-l1/');
    expect(c.educationalLevel).toBe('beginner');
    expect(c.provider.name).toBe('Ömer Yasir Önal');
  });

  it('omits keywords when tags are empty and shares one author node', () => {
    const c = courseJsonLd(
      {
        title: 'C',
        description: 'D',
        url: SITE + '/courses/c/',
        lang: 'en',
        level: 'beginner',
        tags: [],
        lessons: [],
      },
      SITE,
    );
    expect('keywords' in c).toBe(false);
    expect(c.provider).toBe(c.author);
  });
});
