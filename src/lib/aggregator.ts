import { load } from 'cheerio';
import type { FeedSource } from '../config/feeds';

export interface FeedItem {
  title: string;
  link: string;
  date: Date | null;
  source: string;   // feed 显示名
  group: '国内' | '国际';
}

const UA = 'an0313-blog-feed-aggregator/1.0 (+https://an0313.github.io)';

// 单个源拉取: 带超时 + 异常兜底 (失败返回空, 不影响其他源与整体构建)
export async function fetchFeed(source: FeedSource, timeoutMs = 8000): Promise<FeedItem[]> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch(source.url, {
      signal: ctrl.signal,
      headers: { 'user-agent': UA, accept: 'application/rss+xml, application/atom+xml, text/xml, */*' },
      redirect: 'follow',
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    const xml = await res.text();
    return parseFeed(source, xml);
  } catch {
    return [];
  }
}

// 并发拉取所有源, 聚合 + 按时间倒序
export async function fetchAllFeeds(sources: FeedSource[]): Promise<FeedItem[]> {
  const results = await Promise.all(sources.map(s => fetchFeed(s)));
  const all = results.flat();
  // 有日期的优先并按时间倒序, 无日期的放后面
  return all.sort((a, b) => {
    if (a.date && b.date) return b.date.getTime() - a.date.getTime();
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });
}

// cheerio 解析 RSS 2.0 与 Atom, 容错处理
function parseFeed(source: FeedSource, xml: string): FeedItem[] {
  const $ = load(xml, { xml: true });
  const items: FeedItem[] = [];

  // Atom: feed > entry, <link href="..."/>, <title>, <published>/<updated>
  $('entry').each((_, el) => {
    const $el = $(el);
    const title = $el.find('title').first().text().trim();
    const $link = $el.find('link[rel="alternate"], link:not([rel])').first();
    let link = $link.attr('href') || $el.find('link').first().attr('href') || '';
    if (!link) link = $el.find('id').first().text().trim();
    const dateRaw = $el.find('published, updated').first().text().trim();
    if (title && link) {
      items.push({ title, link, date: parseDate(dateRaw), source: source.name, group: source.group });
    }
  });
  if (items.length) return items;

  // RSS 2.0: channel > item, <link>URL</link>, <title>, <pubDate>
  $('item').each((_, el) => {
    const $el = $(el);
    const title = $el.find('title').first().text().trim();
    let link = $el.find('link').first().text().trim();
    // 某些 RSS 把 link 放在 link 元素的 href, 或 guid
    if (!link) link = $el.find('link').attr('href') || $el.find('guid').first().text().trim();
    const dateRaw = $el.find('pubDate').first().text().trim() || $el.find('date').first().text().trim();
    if (title && link) {
      items.push({ title, link, date: parseDate(dateRaw), source: source.name, group: source.group });
    }
  });
  return items;
}

function parseDate(raw: string): Date | null {
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d;
}

// 格式化日期为 MM-DD
export function fmtDate(d: Date | null): string {
  if (!d) return '';
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${m}-${day}`;
}
