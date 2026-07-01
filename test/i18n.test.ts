import { describe, it, expect } from 'vitest';
import { t, localizePath, altLocalePath } from '../src/data/i18n';

describe('i18n', () => {
  it('returns localized strings', () => {
    expect(t('en', 'nav.work')).toBe('Work');
    expect(t('tr', 'nav.work')).toBe('Projeler');
  });
  it('localizes paths (en unprefixed, tr prefixed)', () => {
    expect(localizePath('en', '/projects')).toBe('/projects');
    expect(localizePath('tr', '/projects')).toBe('/tr/projects');
    expect(localizePath('en', '/')).toBe('/');
    expect(localizePath('tr', '/')).toBe('/tr/');
  });
  it('maps a path to its other-locale twin', () => {
    expect(altLocalePath('en', '/projects')).toBe('/tr/projects');
    expect(altLocalePath('tr', '/tr/projects')).toBe('/projects');
  });
  it('handles the bare TR root', () => {
    expect(altLocalePath('tr', '/tr/')).toBe('/');
    expect(altLocalePath('tr', '/tr')).toBe('/');
  });
  it('only strips a whole /tr segment (leaves /tr-prefixed real routes intact)', () => {
    // `/trending` starts with the letters "tr" but is not the `/tr` locale
    // segment, so it must map unchanged rather than becoming `/ending`.
    expect(altLocalePath('tr', '/trending')).toBe('/trending');
    expect(altLocalePath('tr', '/transactions')).toBe('/transactions');
    // And a genuinely TR-prefixed nested route still maps correctly.
    expect(altLocalePath('tr', '/tr/trending')).toBe('/trending');
  });
});
