/**
 * Pure builders for the machine feeds. `feed.json` implements the versioned
 * contract in docs/specs/2026-07-01-content-platform-design.md §5 — the
 * Flutter app and AI crawlers depend on it, so changes within version "1"
 * must be additive only. Kept free of astro:content (unit-tested with Vitest);
 * the routes load the collections and hand plain objects in.
 */

export interface FeedPostInput {
  slug: string;
  lang: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
}

export interface FeedCourseInput {
  slug: string;
  lang: string;
  title: string;
  description: string;
  tags: string[];
  lessons: { slug: string; title: string }[];
}

export interface FeedItem {
  type: 'post' | 'course';
  slug: string;
  lang: string;
  title: string;
  description: string;
  date?: string;
  updated?: string;
  tags: string[];
  url: string;
  lessons?: { slug: string; title: string; url: string }[];
}

export interface FeedJson {
  version: '1';
  site: string;
  items: FeedItem[];
}

const abs = (site: string, path: string) => new URL(path, site).toString();

export function buildFeedJson(input: {
  site: string;
  posts: FeedPostInput[];
  courses: FeedCourseInput[];
}): FeedJson {
  const posts = [...input.posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const postItems: FeedItem[] = posts.map((p) => ({
    type: 'post',
    slug: p.slug,
    lang: p.lang,
    title: p.title,
    description: p.description,
    date: p.date,
    ...(p.updated ? { updated: p.updated } : {}),
    tags: p.tags,
    url: abs(input.site, `/writing/${p.slug}/`),
  }));
  const courseItems: FeedItem[] = input.courses.map((c) => ({
    type: 'course',
    slug: c.slug,
    lang: c.lang,
    title: c.title,
    description: c.description,
    tags: c.tags,
    url: abs(input.site, `/courses/${c.slug}/`),
    lessons: c.lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      url: abs(input.site, `/courses/${c.slug}/${l.slug}/`),
    })),
  }));
  return {
    version: '1',
    site: input.site.replace(/\/$/, ''),
    items: [...postItems, ...courseItems],
  };
}

export interface FeedExternalInput {
  title: string;
  url: string;
  date: string;
  description?: string;
}

export interface RssItem {
  title: string;
  link: string;
  pubDate: Date;
  description?: string;
}

/** Native posts + external articles as one newest-first RSS item list. */
export function rssItems(input: {
  site: string;
  posts: FeedPostInput[];
  external: FeedExternalInput[];
}): RssItem[] {
  const native = input.posts.map((p) => ({
    title: p.title,
    link: abs(input.site, `/writing/${p.slug}/`),
    pubDate: new Date(`${p.date}T00:00:00Z`),
    description: p.description,
  }));
  const external = input.external.map((e) => ({
    title: e.title,
    link: e.url,
    pubDate: new Date(`${e.date}T00:00:00Z`),
    ...(e.description ? { description: e.description } : {}),
  }));
  return [...native, ...external].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}
