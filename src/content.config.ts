import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  projectSchema,
  experienceSchema,
  writingSchema,
  publicationSchema,
  postSchema,
  courseSchema,
  lessonSchema,
} from './content/schemas';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: projectSchema,
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: experienceSchema,
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: writingSchema,
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: publicationSchema,
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: postSchema,
});

// A course = directory `src/content/courses/<slug>/` with `index.md` (meta)
// plus `NN-*.md` lesson files. Two collections over the same base: `courses`
// loads only the index files, `lessons` everything else.
const courses = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/courses' }),
  schema: courseSchema,
});

const lessons = defineCollection({
  loader: glob({ pattern: ['*/*.md', '!*/index.md'], base: './src/content/courses' }),
  schema: lessonSchema,
});

export const collections = { projects, experience, writing, publications, posts, courses, lessons };
