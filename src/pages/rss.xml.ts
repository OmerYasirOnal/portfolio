import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { t } from '../data/i18n';
import { rssItems, RSS_TITLE } from '../lib/feed';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', (e) => !e.data.draft);
  const writing = await getCollection('writing');

  const items = rssItems({
    site: context.site!.toString(),
    posts: posts.map((p) => ({
      slug: p.id,
      lang: p.data.lang,
      title: p.data.title,
      description: p.data.description,
      date: p.data.date,
      tags: p.data.tags,
    })),
    external: writing.map((w) => ({
      title: w.data.title,
      url: w.data.url,
      date: w.data.date,
    })),
  });

  return rss({
    title: RSS_TITLE,
    description: t('en', 'seo.writing.description'),
    site: context.site!,
    items,
  });
}
