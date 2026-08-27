import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
  return rss({
    title: 'An0313',
    description: 'An0313 的前端开发笔记',
    site: context.site!,
    items: posts.map(p => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: p.data.permalink || `/${p.id}/`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
