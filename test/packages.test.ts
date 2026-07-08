import { describe, it, expect } from 'vitest';
import { packageTiers, packageFaqs } from '../src/data/packages';

describe('packageTiers', () => {
  it('has exactly one highlighted (most popular) tier', () => {
    expect(packageTiers.filter((tier) => tier.highlighted)).toHaveLength(1);
  });

  it('is priced in ascending order', () => {
    const prices = packageTiers.map((tier) => tier.priceFrom);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it('gives every tier bilingual copy and at least one feature', () => {
    for (const tier of packageTiers) {
      expect(tier.name.en).toBeTruthy();
      expect(tier.name.tr).toBeTruthy();
      expect(tier.tagline.en).toBeTruthy();
      expect(tier.tagline.tr).toBeTruthy();
      expect(tier.features.length).toBeGreaterThan(0);
      for (const feature of tier.features) {
        expect(feature.en).toBeTruthy();
        expect(feature.tr).toBeTruthy();
      }
    }
  });
});

describe('packageFaqs', () => {
  it('has at least one entry, each with bilingual question and answer', () => {
    expect(packageFaqs.length).toBeGreaterThan(0);
    for (const faq of packageFaqs) {
      expect(faq.question.en).toBeTruthy();
      expect(faq.question.tr).toBeTruthy();
      expect(faq.answer.en).toBeTruthy();
      expect(faq.answer.tr).toBeTruthy();
    }
  });
});
