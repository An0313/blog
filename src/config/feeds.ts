// 行业资讯源: build 时拉取, 失败兜底为空, 不影响整体构建
// 选用稳定、活跃、对前端工程师有价值的信息源
export interface FeedSource {
  name: string;       // 显示名 (短, 用于 source 列)
  url: string;        // RSS / Atom feed URL
  group: '国内' | '国际';
}

export const feeds: FeedSource[] = [
  // 国内
  { name: '阮一峰', url: 'https://www.ruanyifeng.com/blog/atom.xml', group: '国内' },
  // 国际
  { name: 'web.dev', url: 'https://web.dev/feed.xml', group: '国际' },
  { name: 'V8', url: 'https://v8.dev/blog/feed', group: '国际' },
  { name: 'CSS-Tricks', url: 'https://css-tricks.com/feed/', group: '国际' },
  { name: 'JS Weekly', url: 'https://javascriptweekly.com/rss/IK6BDDOR', group: '国际' },
  { name: 'Hacker News', url: 'https://hnrss.org/frontpage', group: '国际' },
  // AI 媒体 (紧跟 AI 时代)
  { name: '机器之心', url: 'https://www.jiqizhixin.com/rss', group: '国内' },
  { name: 'Latent Space', url: 'https://www.latent.space/feed', group: '国际' },
];
