/**
 * Helpers for the courses/lessons collections. A course lives in
 * `src/content/courses/<slug>/` — `index.md` is the course meta and each
 * `NN-*.md` file is one lesson. Entry ids are `<slug>/index` and
 * `<slug>/NN-lesson`, so the course slug is always the first path segment
 * (robust even if a loader version strips the `index` segment).
 */
export function courseSlugOf(id: string): string {
  return id.split('/')[0];
}

/** Lesson path under the course dir, e.g. "01-first-lesson". */
export function lessonSlugOf(id: string): string {
  return id.split('/').slice(1).join('/');
}

/** Lessons ordered by their zero-padded `NN-` filename prefix. */
export function sortLessons<T extends { id: string }>(lessons: T[]): T[] {
  return [...lessons].sort((a, b) => (a.id < b.id ? -1 : 1));
}
