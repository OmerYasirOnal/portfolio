import { describe, it, expect } from 'vitest';
import {
  localizeDate,
  localizeLocation,
  formatPeriod,
  stripTechVersion,
  asciiFold,
} from '../src/data/cv-format';

describe('cv-format — locale-aware résumé formatting', () => {
  it('leaves English untouched (source form)', () => {
    expect(localizeDate('Dec 2025', 'en')).toBe('Dec 2025');
    expect(localizeDate('Present', 'en')).toBe('Present');
    expect(localizeLocation('Istanbul', 'en')).toBe('Istanbul');
    expect(formatPeriod('Dec 2025', 'Present', 'en')).toBe('Dec 2025 – Present');
  });

  it('localizes month abbreviations to Turkish', () => {
    expect(localizeDate('Jan 2026', 'tr')).toBe('Oca. 2026');
    expect(localizeDate('Jun 2023', 'tr')).toBe('Haz. 2023');
    expect(localizeDate('Aug 2025', 'tr')).toBe('Ağu. 2025');
    expect(localizeDate('Dec 2025', 'tr')).toBe('Ara. 2025');
  });

  it('localizes "Present" and passes bare years / unknown tokens through', () => {
    expect(localizeDate('Present', 'tr')).toBe('Günümüz');
    expect(localizeDate('2024', 'tr')).toBe('2024');
    expect(localizeDate('Q1 2025', 'tr')).toBe('Q1 2025');
  });

  it('localizes the location on TR only', () => {
    expect(localizeLocation('Istanbul', 'tr')).toBe('İstanbul');
    expect(localizeLocation('Remote', 'tr')).toBe('Remote');
  });

  it('formats a full period the way the résumé renders it', () => {
    expect(formatPeriod('Dec 2025', 'Present', 'tr')).toBe('Ara. 2025 – Günümüz');
    expect(formatPeriod('Jul 2025', 'Aug 2025', 'tr')).toBe('Tem. 2025 – Ağu. 2025');
    expect(formatPeriod('2024', '2025', 'tr')).toBe('2024 – 2025');
  });

  it('strips a trailing version marker from a tech token', () => {
    expect(stripTechVersion('React 19')).toBe('React');
    expect(stripTechVersion('Astro 5')).toBe('Astro');
    expect(stripTechVersion('Next.js 16')).toBe('Next.js');
    expect(stripTechVersion('Tailwind CSS v4')).toBe('Tailwind CSS');
    expect(stripTechVersion('Swift 6')).toBe('Swift');
  });

  it('leaves embedded product numbers and version-less tokens intact', () => {
    expect(stripTechVersion('GTM/GA4')).toBe('GTM/GA4');
    expect(stripTechVersion('Ed25519')).toBe('Ed25519');
    expect(stripTechVersion('Three.js')).toBe('Three.js');
    expect(stripTechVersion('TypeScript')).toBe('TypeScript');
    expect(stripTechVersion('PostgreSQL/pgvector')).toBe('PostgreSQL/pgvector');
  });

  describe('asciiFold — international / EU résumé variant', () => {
    it('strips Turkish diacritics from the name and place names', () => {
      expect(asciiFold('Ömer Yasir Önal')).toBe('Omer Yasir Onal');
      expect(asciiFold('Istanbul, Türkiye')).toBe('Istanbul, Turkiye');
      expect(asciiFold('İstanbul')).toBe('Istanbul');
      expect(asciiFold('TÜBİTAK')).toBe('TUBITAK');
    });

    it('handles every Turkish letter, including the dotless ı', () => {
      expect(asciiFold('çĞğıİöÖşŞüÜ')).toBe('cGgiIoOsSuU');
    });

    it('normalizes smart punctuation an ATS parser mishandles', () => {
      expect(asciiFold('AKIS — a platform')).toBe('AKIS - a platform');
      expect(asciiFold('Dec 2025 – Present')).toBe('Dec 2025 - Present');
      expect(asciiFold('Docker image −198MB')).toBe('Docker image -198MB');
      expect(asciiFold('a task is ‘done’ only')).toBe("a task is 'done' only");
      expect(asciiFold('“quoted”')).toBe('"quoted"');
      expect(asciiFold('Résumé')).toBe('Resume');
    });

    it('leaves plain ASCII and decorative dividers untouched, and is idempotent', () => {
      expect(asciiFold('Node.js, Express, TypeScript')).toBe('Node.js, Express, TypeScript');
      expect(asciiFold('GitHub · LinkedIn')).toBe('GitHub · LinkedIn');
      expect(asciiFold(asciiFold('Ömer Yasir Önal'))).toBe('Omer Yasir Onal');
    });
  });
});
