import { describe, it, expect } from 'vitest';
import { readingTimeMinutes } from '../src/lib/reading-time';

describe('readingTimeMinutes', () => {
  it('floors at 1 minute for short or empty texts', () => {
    expect(readingTimeMinutes('a few words only')).toBe(1);
    expect(readingTimeMinutes('')).toBe(1);
  });

  it('rounds by 200 words per minute', () => {
    expect(readingTimeMinutes(Array(400).fill('word').join(' '))).toBe(2);
    expect(readingTimeMinutes(Array(500).fill('word').join(' '))).toBe(3);
  });

  it('does not count fenced code blocks', () => {
    const code = '```js\n' + Array(400).fill('token').join(' ') + '\n```';
    expect(readingTimeMinutes(`intro words here ${code}`)).toBe(1);
  });

  it('excludes an unclosed code fence to end of input', () => {
    const code = '```js\n' + Array(400).fill('token').join(' ');
    expect(readingTimeMinutes(`intro words here ${code}`)).toBe(1);
  });
});
