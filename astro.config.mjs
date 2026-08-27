// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// 站点 URL 与生产一致, sitemap / RSS / canonical 都依赖它
export default defineConfig({
  site: 'https://an0313.github.io',
  // GitHub Pages 用户名仓 (an0313.github.io) 部署在根路径, 无需 base
  base: '/',
  integrations: [sitemap(), mdx()],
  markdown: {
    shikiConfig: {
      // 代码高亮: 双主题, 浅色用 github-light, 深色用 github-dark
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: false,
    },
  },
});
