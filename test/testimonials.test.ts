import { describe, it, expect } from 'vitest';
import { testimonials } from '../src/data/testimonials';

describe('testimonials', () => {
  it('starts empty until a real client quote is added', () => {
    expect(testimonials).toEqual([]);
  });

  it('gives every entry bilingual copy, should any be added', () => {
    for (const item of testimonials) {
      expect(item.quote.en).toBeTruthy();
      expect(item.quote.tr).toBeTruthy();
      expect(item.author).toBeTruthy();
      expect(item.role.en).toBeTruthy();
      expect(item.role.tr).toBeTruthy();
    }
  });
});
