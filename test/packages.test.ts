import { describe, it, expect } from 'vitest';
import { packageTiers, packageFaqs, packageProcess, rapidSprints } from '../src/data/packages';

describe('rapidSprints', () => {
  it('offers one web and one mobile sprint with fixed positive prices', () => {
    expect(rapidSprints.map((sprint) => sprint.id)).toEqual(['web-sprint', 'mobile-mvp']);
    for (const sprint of rapidSprints) {
      expect(sprint.price).toBeGreaterThan(0);
      expect(sprint.timeline.en).toBeTruthy();
      expect(sprint.timeline.tr).toBeTruthy();
      expect(sprint.features.length).toBeGreaterThan(0);
      expect(sprint.exclusions.en).toBeTruthy();
      expect(sprint.exclusions.tr).toBeTruthy();
    }
  });

  it('has exactly one highlighted rapid sprint', () => {
    expect(rapidSprints.filter((sprint) => sprint.highlighted)).toHaveLength(1);
  });
});

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

  it('gives every tier bilingual comparison dimensions (pages + brand scope)', () => {
    for (const tier of packageTiers) {
      expect(tier.pages.en).toBeTruthy();
      expect(tier.pages.tr).toBeTruthy();
      expect(tier.brandScope.en).toBeTruthy();
      expect(tier.brandScope.tr).toBeTruthy();
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

describe('packageProcess', () => {
  it('has ordered steps, each with a bilingual title and description', () => {
    expect(packageProcess.length).toBeGreaterThan(0);
    for (const step of packageProcess) {
      expect(step.title.en).toBeTruthy();
      expect(step.title.tr).toBeTruthy();
      expect(step.description.en).toBeTruthy();
      expect(step.description.tr).toBeTruthy();
    }
  });
});
