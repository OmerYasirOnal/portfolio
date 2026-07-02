/**
 * Pure builders for the llms.txt AIO corpus. Kept independent of astro:content
 * so they unit-test with Vitest; the routes (src/pages/llms*.txt.ts) load the
 * collections and hand plain objects in, guaranteeing the output never drifts
 * from the visible site.
 */
import { profile } from '../data/profile';

export interface LlmsProject {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  stack: string[];
  status: string;
  problem?: string;
  whatIDid?: string;
  highlights: string[];
  links: Record<string, string | undefined>;
}
export interface LlmsWriting {
  title: string;
  url: string;
  source: string;
  date: string;
  lang: string;
}
export interface LlmsPublication {
  title: string;
  venue: string;
  year: number;
  url?: string;
}
export interface LlmsPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  lang: string;
  /** Raw markdown body — inlined into llms-full.txt. */
  body: string;
}
export interface LlmsCourse {
  slug: string;
  title: string;
  description: string;
  level: string;
  lang: string;
  lessons: { slug: string; title: string }[];
}
export interface LlmsData {
  site: string;
  projects: LlmsProject[];
  writing: LlmsWriting[];
  publications: LlmsPublication[];
  posts: LlmsPost[];
  courses: LlmsCourse[];
}

const abs = (site: string, path: string) => new URL(path, site).toString();

export function llmsTxt(data: LlmsData): string {
  const { site } = data;
  const lines: string[] = [];
  lines.push('# Ömer Yasir Önal');
  lines.push('');
  lines.push(`> ${profile.role.en} in Istanbul, Türkiye — ${profile.availability.en}`);
  lines.push('');
  lines.push(profile.about.en);
  lines.push('');
  lines.push('## Projects');
  for (const p of data.projects) {
    lines.push(`- [${p.title}](${abs(site, `/projects/${p.slug}/`)}): ${p.tagline}`);
  }
  lines.push('');
  lines.push('## Writing');
  const writingLines = [
    ...data.posts.map((p) => ({
      date: p.date,
      line: `- [${p.title}](${abs(site, `/writing/${p.slug}/`)}): ${p.description} (${p.date}, ${p.lang})`,
    })),
    ...data.writing.map((w) => ({
      date: w.date,
      line: `- [${w.title}](${w.url}): ${w.source}, ${w.date} (${w.lang})`,
    })),
  ].sort((a, b) => (a.date === b.date ? 0 : a.date < b.date ? 1 : -1));
  for (const { line } of writingLines) lines.push(line);
  lines.push('');
  lines.push('## Publications');
  for (const pub of data.publications) {
    lines.push(`- ${pub.title} — ${pub.venue}, ${pub.year}${pub.url ? ` (${pub.url})` : ''}`);
  }
  lines.push('');
  lines.push('## Courses');
  if (data.courses.length) {
    for (const c of data.courses) {
      lines.push(
        `- [${c.title}](${abs(site, `/courses/${c.slug}/`)}): ${c.description} (${c.level}, ${c.lessons.length} lesson${c.lessons.length === 1 ? '' : 's'}, ${c.lang})`,
      );
    }
  } else {
    lines.push('_Coming soon — small, focused courses will be published here and in the mobile app._');
  }
  lines.push('');
  lines.push('## Feeds');
  lines.push(`- [RSS](${abs(site, '/rss.xml')}): new articles`);
  lines.push(`- [feed.json](${abs(site, '/feed.json')}): versioned JSON feed of posts + courses (contract v1)`);
  lines.push('');
  lines.push('## CV');
  lines.push(`- [Résumé (English)](${abs(site, '/cv/omer-yasir-onal-en.pdf')})`);
  lines.push(`- [Résumé (EU / GDPR)](${abs(site, '/cv/omer-yasir-onal-eu.pdf')})`);
  lines.push(`- [Résumé (Türkçe)](${abs(site, '/cv/omer-yasir-onal-tr.pdf')})`);
  lines.push('');
  lines.push('## Contact');
  lines.push(`- Email: ${profile.email}`);
  for (const [, link] of Object.entries(profile.links)) {
    lines.push(`- ${link.label}: ${link.url}`);
  }
  lines.push('');
  return lines.join('\n');
}

export function llmsFullTxt(data: LlmsData): string {
  const { site } = data;
  const s: string[] = [];
  s.push('# Ömer Yasir Önal — Full Profile');
  s.push('');
  s.push('## About');
  s.push(profile.about.en);
  s.push('');
  s.push('### Taglines');
  for (const tl of profile.taglines.en) s.push(`- ${tl}`);
  s.push('');
  s.push('### Skills');
  for (const g of profile.skillGroups) s.push(`- ${g.title_en}: ${g.items.join(', ')}`);
  s.push('');
  s.push('### Education');
  s.push(
    `${profile.education.degree_en}, ${profile.education.school_en} (${profile.education.graduation_en})`,
  );
  s.push('');
  s.push('## Projects');
  for (const p of data.projects) {
    s.push(`### ${p.title} — ${abs(site, `/projects/${p.slug}/`)}`);
    s.push(`${p.tagline}`);
    s.push(`Status: ${p.status}. Stack: ${p.stack.join(', ')}.`);
    if (p.problem) s.push(`Problem: ${p.problem}`);
    if (p.whatIDid) s.push(`What I did: ${p.whatIDid}`);
    if (p.highlights.length) s.push(`Highlights: ${p.highlights.join('; ')}`);
    const links = Object.entries(p.links).filter(([, v]) => v);
    if (links.length) s.push(`Links: ${links.map(([k, v]) => `${k}: ${v}`).join(', ')}`);
    s.push('');
  }
  s.push('## Writing');
  for (const w of data.writing) s.push(`- ${w.title} (${w.source}, ${w.date}): ${w.url}`);
  s.push('');
  s.push('## Articles (native, full text)');
  for (const p of data.posts) {
    s.push(`### ${p.title} — ${abs(site, `/writing/${p.slug}/`)}`);
    s.push(`${p.description} (${p.date}, ${p.lang})`);
    s.push('');
    s.push(p.body.trim());
    s.push('');
  }
  s.push('## Courses');
  for (const c of data.courses) {
    s.push(`### ${c.title} — ${abs(site, `/courses/${c.slug}/`)}`);
    s.push(`${c.description} (level: ${c.level}, ${c.lang})`);
    for (const l of c.lessons) {
      s.push(`- ${l.title}: ${abs(site, `/courses/${c.slug}/${l.slug}/`)}`);
    }
    s.push('');
  }
  s.push('## Publications');
  for (const pub of data.publications) s.push(`- ${pub.title} — ${pub.venue}, ${pub.year}`);
  s.push('');
  return s.join('\n');
}
