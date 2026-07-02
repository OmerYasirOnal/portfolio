import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

const raw = readFileSync(new URL('../vercel.json', import.meta.url), 'utf8');
const config = JSON.parse(raw);
type HeaderRule = { source: string; headers: { key: string; value: string }[] };
const rules: HeaderRule[] = config.headers;

describe('vercel.json', () => {
  it('contains only a headers config (no functions/rewrites/redirects)', () => {
    const keys = Object.keys(config).filter((k) => k !== '$schema');
    expect(keys).toEqual(['headers']);
  });

  it('applies the full security header set to every route', () => {
    const all = rules.find((r) => r.source === '/(.*)');
    expect(all).toBeDefined();
    const byKey = Object.fromEntries(all!.headers.map((h) => [h.key, h.value]));
    expect(byKey['X-Content-Type-Options']).toBe('nosniff');
    expect(byKey['Referrer-Policy']).toBe('strict-origin-when-cross-origin');
    expect(byKey['X-Frame-Options']).toBe('DENY');
    expect(byKey['Content-Security-Policy']).toBe("frame-ancestors 'none'");
    expect(byKey['Permissions-Policy']).toBe('camera=(), microphone=(), geolocation=()');
  });

  it('gives OG images and CV PDFs a one-hour browser cache (not the /cv/ HTML page)', () => {
    for (const source of ['/og/(.*)', '/cv/(.*\\.pdf)']) {
      const rule = rules.find((r) => r.source === source);
      expect(rule, source).toBeDefined();
      const cache = rule!.headers.find((h) => h.key === 'Cache-Control');
      expect(cache?.value).toBe('public, max-age=3600');
    }
    expect(rules.some((r) => r.source === '/cv/(.*)')).toBe(false);
  });

  it('does not duplicate platform behavior (no HSTS, no /_astro override)', () => {
    const allHeaderKeys = rules.flatMap((r) => r.headers.map((h) => h.key.toLowerCase()));
    expect(allHeaderKeys).not.toContain('strict-transport-security');
    expect(rules.some((r) => r.source.includes('_astro'))).toBe(false);
  });
});
