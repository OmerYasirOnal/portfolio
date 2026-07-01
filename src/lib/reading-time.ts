/**
 * Reading-time estimate for a markdown body. Fenced code blocks are excluded —
 * they're skimmed, not read linearly — and the result never drops below one
 * minute so the label stays honest for short notes.
 */
const WORDS_PER_MINUTE = 200;

export function readingTimeMinutes(markdown: string): number {
  const prose = markdown.replace(/```[\s\S]*?```/g, ' ').replace(/```[\s\S]*$/, ' ');
  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
