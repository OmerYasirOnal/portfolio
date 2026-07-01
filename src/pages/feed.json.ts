import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildFeedJson } from '../lib/feed';
import { courseSlugOf, lessonSlugOf, sortLessons } from '../lib/courses';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('posts', (e) => !e.data.draft);
  const courses = (await getCollection('courses', (e) => !e.data.draft)).sort(
    (a, b) => a.data.order - b.data.order,
  );
  const lessons = await getCollection('lessons');

  const feed = buildFeedJson({
    site: site!.toString(),
    posts: posts.map((p) => ({
      slug: p.id,
      lang: p.data.lang,
      title: p.data.title,
      description: p.data.description,
      date: p.data.date,
      updated: p.data.updated,
      tags: p.data.tags,
    })),
    courses: courses.map((c) => {
      const slug = courseSlugOf(c.id);
      return {
        slug,
        lang: c.data.lang,
        title: c.data.title,
        description: c.data.description,
        tags: c.data.tags,
        lessons: sortLessons(lessons.filter((l) => courseSlugOf(l.id) === slug)).map((l) => ({
          slug: lessonSlugOf(l.id),
          title: l.data.title,
        })),
      };
    }),
  });

  return new Response(JSON.stringify(feed, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
