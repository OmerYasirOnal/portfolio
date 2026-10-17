import { describe, it, expect } from 'vitest';
import { t, localizePath, altLocalePath } from '../src/data/i18n';

describe('i18n', () => {
  it('returns localized strings', () => {
    expect(t('en', 'nav.work')).toBe('Projects');
    expect(t('tr', 'nav.work')).toBe('Projeler');
  });
  it('localizes paths (tr unprefixed at root, en prefixed under /en)', () => {
    expect(localizePath('tr', '/projects')).toBe('/projects');
    expect(localizePath('en', '/projects')).toBe('/en/projects');
    expect(localizePath('tr', '/')).toBe('/');
    expect(localizePath('en', '/')).toBe('/en/');
  });
  it('maps a path to its other-locale twin', () => {
    expect(altLocalePath('tr', '/projects')).toBe('/en/projects');
    expect(altLocalePath('en', '/en/projects')).toBe('/projects');
  });
  it('handles the bare EN root', () => {
    expect(altLocalePath('en', '/en/')).toBe('/');
    expect(altLocalePath('en', '/en')).toBe('/');
  });
  it('only strips a whole /en segment (leaves /en-prefixed real routes intact)', () => {
    expect(altLocalePath('en', '/enterprise')).toBe('/enterprise');
    expect(altLocalePath('en', '/engineering')).toBe('/engineering');
    expect(altLocalePath('en', '/en/engineering')).toBe('/engineering');
  });
});
