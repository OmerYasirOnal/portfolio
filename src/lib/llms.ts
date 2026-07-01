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
export interface LlmsData {
  site: string;
  projects: LlmsProject[];
  writing: LlmsWriting[];
  publications: LlmsPublication[];
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
  for (const w of data.writing) {
    lines.push(`- [${w.title}](${w.url}): ${w.source}, ${w.date} (${w.lang})`);
  }
  lines.push('');
  lines.push('## Publications');
  for (const pub of data.publications) {
    lines.push(`- ${pub.title} — ${pub.venue}, ${pub.year}${pub.url ? ` (${pub.url})` : ''}`);
  }
  lines.push('');
  lines.push('## Courses');
  lines.push('_Coming soon — small, focused courses will be published here and in the mobile app._');
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
  s.push('## Publications');
  for (const pub of data.publications) s.push(`- ${pub.title} — ${pub.venue}, ${pub.year}`);
  s.push('');
  return s.join('\n');
}
