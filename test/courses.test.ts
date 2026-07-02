import { describe, it, expect } from 'vitest';
import { courseSlugOf, lessonSlugOf, sortLessons } from '../src/lib/courses';

describe('course id helpers', () => {
  it('derives the course slug from entry ids', () => {
    expect(courseSlugOf('demo-course/index')).toBe('demo-course');
    expect(courseSlugOf('demo-course/01-first-lesson')).toBe('demo-course');
    expect(courseSlugOf('demo-course')).toBe('demo-course');
  });

  it('derives the lesson slug (path under the course dir)', () => {
    expect(lessonSlugOf('demo-course/01-first-lesson')).toBe('01-first-lesson');
  });

  it('sorts lessons by their NN- filename prefix', () => {
    const sorted = sortLessons([{ id: 'c/02-b' }, { id: 'c/01-a' }, { id: 'c/10-j' }]);
    expect(sorted.map((l) => l.id)).toEqual(['c/01-a', 'c/02-b', 'c/10-j']);
  });

  it('does not mutate its input', () => {
    const input = [{ id: 'c/02-b' }, { id: 'c/01-a' }];
    sortLessons(input);
    expect(input[0].id).toBe('c/02-b');
  });

  it('returns 0 for equal ids (valid comparator, no reorder)', () => {
    const sorted = sortLessons([{ id: 'c/01-a' }, { id: 'c/01-a' }]);
    expect(sorted.map((l) => l.id)).toEqual(['c/01-a', 'c/01-a']);
  });

  it('returns an empty lesson slug for a slashless id (documented behavior)', () => {
    expect(lessonSlugOf('demo-course')).toBe('');
  });
});
