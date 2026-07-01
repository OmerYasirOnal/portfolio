import { describe, it, expect } from 'vitest';
import { localizeDate, localizeLocation, formatPeriod } from '../src/data/cv-format';

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
});
