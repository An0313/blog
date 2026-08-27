---
title: "React 错误边界: 从 API 用法到生产级异常监控"
date: 2024-11-05 11:00:00
tags:
  - react
  - 工程化
description: 错误边界不是写个 class 组件就完事, 讲清两个生命周期分工、三类抓不到的错误, 接入 Sentry 做生产级监控, 含 source map 上传、版本聚合与复现路径的完整链路。
permalink: /2024/11/05/react-错误边界到生产级监控/
---

错误边界这个 API 看着简单——写个 class 组件, 实现 `getDerivedStateFromError` 就行。但"会用 API"和"在生产里真的接住错误并复现"之间, 隔着好几层: 边界在哪、抓不到的怎么办、怎么定位到源码、怎么按版本判断回归。这篇按这条链路完整拆一遍。

## 一、渲染异常为什么会卸载整树

React 16 之前, 组件 render 抛错会破坏整个组件树状态, 整页白屏。16 引入错误边界, 机制类似 JS 的 `catch {}`, 但只对 React 子树生效——错误边界抓到子组件渲染异常后, 用降级 UI 替换崩溃的子树, 其他部分不受影响。

只有 class 组件能做错误边界, 这是 React 的限制, 不是 Sentry 的限制。

## 二、两个生命周期的分工

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true }; // 渲染期间调用, 只能 setState
  }

  componentDidCatch(error, errorInfo) {
    // commit 阶段调用, 能做副作用: 上报
    logErrorToService(error, errorInfo);
  }

  render() {
    return this.state.hasError
      ? <Fallback error={this.state.error} />
      : this.props.children;
  }
}
```

- `getDerivedStateFromError`: 渲染期调用, **只能 setState**, 不能做副作用(比如发请求上报), 因为这时还没 commit
- `componentDidCatch`: commit 期调用, **能做副作用**, 适合上报错误

> 这个分工是面试常问的细节。"为什么不能在 getDerivedStateFromError 里上报"——答案是渲染阶段不允许副作用, 会被 React 警告甚至重复触发。能答上来的人不多。

## 三、三类抓不到的错误, 以及替代方案

错误边界只抓"React 渲染流程内"的错误, 这三类抓不到:

| 场景 | 为什么抓不到 | 替代方案 |
|---|---|---|
| 事件处理 `onClick` 里抛错 | 不在 React 渲染流程内 | try/catch + window.onerror |
| 异步 `setTimeout / fetch.then` | 已脱离 React 调用栈 | unhandledrejection 监听 |
| 服务端渲染 | 错误边界在 SSR 不工作 | Node 进程级 uncaughtException |

```javascript
// 兜底: 捕获边界抓不到的错误
window.addEventListener('error', (e) => report(e.error));
window.addEventListener('unhandledrejection', (e) => report(e.reason));
```

> 主动讲"边界在哪结束", 比讲"怎么用"更体现深度。面试官追问"事件里的错误怎么抓", 你能接得上, 这就是分水岭。

## 四、React 19: 全局 error hooks 与局部边界的分工

React 19 在 `createRoot` 里引入了三个 error hooks: `onUncaughtError`、`onCaughtError`、`onRecoverableError`。Sentry 提供了 `reactErrorHandler` 与之集成:

```jsx
import * as Sentry from '@sentry/react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'), {
  onUncaughtError: Sentry.reactErrorHandler(),
  onCaughtError: Sentry.reactErrorHandler(),
  onRecoverableError: Sentry.reactErrorHandler(),
});
```

分工:

- `reactErrorHandler`(React 19+): **全局**报告所有错误, 不处理 UI
- `ErrorBoundary`: **局部**捕获特定子树错误, 渲染 fallback, 带组件栈

React 19+ 两者互补: 全局兜底上报 + 局部边界恢复 UI。React 18 及以下, ErrorBoundary 同时承担报告和 UI 恢复。

> 这一段体现你跟得上版本演进。React 19 的 error hooks 是新东西, 多数人还在用 React 18 写法。能讲清新旧分工, 说明你在持续跟进。

## 五、接入 Sentry: 初始化与降噪

```javascript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: process.env.APP_VERSION, // 与构建版本对应, 用于聚合和回归判断
  environment: process.env.NODE_ENV,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({ maskAllText: false }), // 会话回放, 复现神器
  ],
  tracesSampleRate: 0.1,        // 性能采样, 别 100%, 否则流量炸
  allowUrls: [/yourdomain\.com/],          // 仅采集自家域名, 减噪音
  denyUrls: [/extensions\//, /^chrome:\/\//], // 屏蔽浏览器扩展错误
  beforeSend(event, hint) {
    // 脱敏: 清掉敏感头
    if (event.request?.headers) delete event.request.headers.Authorization;
    // 过滤已知噪音
    const msg = hint?.originalException?.message || event.message || '';
    if (/ResizeObserver loop limit/i.test(msg)) return null;
    return event;
  },
});
```

关键点:

- `release` 必须和 source map 上传时的 release 一致, 这是版本聚合的前提
- `allowUrls / denyUrls` 过滤三方脚本和扩展错误, 不然噪音淹没真问题
- `beforeSend` 做两件事: 脱敏(清 Authorization、PII)、降噪(丢已知无用错误)
- `tracesSampleRate` 性能采样别开 100%, 高流量站会超额度

Sentry 自带 `Sentry.ErrorBoundary`, 比手写省心(自带 fallback、reset、componentStack):

```jsx
<Sentry.ErrorBoundary fallback={<ErrorFallback />} showDialog>
  <App />
</Sentry.ErrorBoundary>
```

> 用现成的 `Sentry.ErrorBoundary` 比手写 class 强在"自带 componentStack、resetError、showDialog", 而且上报时自动带上 React 组件栈。讲清"为什么用现成的"也是判断力。

## 六、错误分组与上下文采集

光有堆栈不够, 要知道用户在什么环境、点了什么:

```javascript
// 自定义分组: 把同类错误按业务维度聚合
Sentry.captureException(new Error('API /orders 500'), {
  fingerprint: ['api-error', 'orders', '500'],
  tags: { route: '/orders', feature: 'order-list', severity: 'high' },
  extra: { cartSize: 3, coupon: 'SPRING' },
});

// 面包屑: 记录用户操作链路, 便于复现
Sentry.addBreadcrumb({ category: 'click', message: '点了提交按钮', level: 'info' });

// 用户与全局标签
Sentry.setUser({ id: userId, role: userRole });
Sentry.setTag('channel', 'web');
```

- `fingerprint` 控制"哪些错误算同一个", 避免同一问题被拆成 N 个 issue
- `tags` 给路由、功能、严重级别打标, 方便筛选和告警
- `breadcrumbs` 记录操作链路, 是复现的核心

> 能复现的错误才能修。讲清"采集哪些上下文 + 怎么保护用户隐私(脱敏 PII)"是高级前端该有的产品 + 工程视角。

## 七、Source Map 与 Release: 让线上错误能定位到源码

生产 bundle 是压缩混淆的, 错误堆栈指向 `chunk-abc.js:1:23456`, 看不出哪行源码。解法是把 source map 上传到 Sentry, **不发布到生产服务器**(否则源码泄漏)。

新版机制用 Debug ID(推荐), 由 bundler 插件注入, 不再依赖 release 匹配:

```bash
# 用向导自动配置 bundler 的 source map 上传
npx @sentry/wizard@latest -i sourcemaps
```

webpack 配置(生产构建):

```javascript
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');

module.exports = {
  devtool: 'source-map', // 生产生成独立 .map 文件供上传
  plugins: [
    sentryWebpackPlugin({
      org: 'your-org',
      project: 'your-project',
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: process.env.APP_VERSION,
      sourcemaps: { assets: ['./dist/assets'] },
    }),
  ],
};
```

CI 流程:

```yaml
- run: sentry-cli releases new "$APP_VERSION" --finalize
- run: npm run build             # 生成 + 上传 source map
- run: rm -rf ./dist/assets/*.map # 删本地 map, 防止部署到 CDN 泄漏
- run: sentry-cli releases finalize "$APP_VERSION"
```

坑点:

- 必须跑**生产构建**不是 dev/watch, 否则 map 和 SDK 不兼容
- 上传完删本地 map, 只让 Sentry 拿到, CDN 不给
- `release` 在 init、上传、finalize 三处必须完全一致, 否则聚合不上

> 这一段是"生产级"的核心。能讲 source map 上传策略和"只上传不部署"的人, 是真在生产接过的监控。

## 八、边界粒度策略: 分层兜底

不是只包一层在 App 外层:

- **全局边界**: 兜底白屏, fallback 给"整页崩了"的恢复入口
- **关键路由边界**: 每个路由级包一层, 单页崩了不影响其他路由
- **高危组件边界**: 第三方组件、实验性功能单独包, 隔离爆炸半径

```jsx
<Route path="/dashboard" element={
  <Sentry.ErrorBoundary fallback={<DashboardCrash />}>
    <Dashboard />
  </Sentry.ErrorBoundary>
} />
```

> 给出"分层兜底"策略, 体现你考虑过粒度而非一刀切。这是从"会用 API"到"会设计容错架构"的差距。

## 九、小结: 错误监控的价值链

错误边界的价值链是五步: 能兜底白屏 → 能抓到错误 → 能定位到源码 → 能按版本聚合 → 能复现路径。走到第五步, 才算生产级监控, 而不是 demo 级 demo。

- 错误边界: 渲染期错误(React 19+ 配合 error hooks 全局兜底)
- `window.onerror` / `unhandledrejection`: 非渲染期兜底
- Sentry: 上报 + 聚合 + 回放
- source map: 源码定位
- release / version: 回归判断

写完错误边界不算完事, 把这条链路接通, 才是"我接的是监控", 不是"我加了个组件"。
