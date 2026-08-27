import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 文章集合: 从 src/content/posts/*.md 加载
// permalink 字段是零 SEO 损失的关键, 直接承载原 Hexo 的 :year/:month/:day/:title/ 路径
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    description: z.string().optional(),
    permalink: z.string().optional(),
  }),
});

export const collections = { posts };
