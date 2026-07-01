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
});
