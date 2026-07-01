import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { llmsTxt, type LlmsData } from '../lib/llms';

export const GET: APIRoute = async ({ site }) => {
  const data = await loadLlmsData(site!.toString());
  return new Response(llmsTxt(data), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

/** Load + normalize the collections into the pure builder's input shape. */
export async function loadLlmsData(site: string): Promise<LlmsData> {
  const projects = (await getCollection('projects', (e) => !e.data.draft)).sort(
    (a, b) => a.data.order - b.data.order,
  );
  const writing = (await getCollection('writing')).sort((a, b) =>
    a.data.date < b.data.date ? 1 : -1,
  );
  const publications = await getCollection('publications');
  return {
    site,
    projects: projects.map((p) => ({
      slug: p.id,
      title: p.data.title,
      tagline: p.data.tagline_en,
      category: p.data.category,
      stack: p.data.stack,
      status: p.data.status_en,
      problem: p.data.problem_en,
      whatIDid: p.data.what_i_did_en,
      highlights: p.data.highlights_en,
      links: p.data.links,
    })),
    writing: writing.map((w) => ({
      title: w.data.title,
      url: w.data.url,
      source: w.data.source,
      date: w.data.date,
      lang: w.data.lang,
    })),
    publications: publications.map((p) => ({
      title: p.data.title_en,
      venue: p.data.venue,
      year: p.data.year,
      url: p.data.url,
    })),
  };
}
