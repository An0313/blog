---
title: "Webpack5 构建优化链路拆解：从分析到落地的工程实践"
date: 2023-04-15 10:00:00
tags:
  - 工程化
  - 性能优化
description: 不堆配置, 用 stats.json + bundle-analyzer + speed-measure 定位瓶颈, 从处理范围、externals、tree-shaking、持久缓存、多线程到分包压缩, 给出可量化对比与取舍依据。
permalink: /2023/04/15/webpack5-构建优化链路拆解/
---

构建慢这件事, 多数人第一反应是"加点插件"。但优化前如果不先量化"慢在哪、慢多少", 所有调整都是凭感觉。本文按一条完整链路拆解: 先定位, 再做减法, 然后复用结果, 最后才是工具替换。示例数字仅供参照, 实际以你项目基线为准。

## 一、第一步: 量化现状, 别凭感觉调参

定位瓶颈用两个工具, 一个管时间, 一个管体积。

```bash
# 体积 + 依赖关系
webpack --profile --json > stats.json
# 可视化体积
npx webpack-bundle-analyzer stats.json
# 耗时
yarn add -D speed-measure-webpack-plugin
```

```javascript
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap({
  /* 你的 webpack 配置 */
});
```

跑完拿到两份结论, 后面每个措施都要能回到这两份数据解释"为什么这么改":

- **耗时 Top3**: 一般是 babel-loader、eslint、ts-loader 这种全量转译
- **体积 Top3**: 一般是 moment 全量、lodash 全量、UI 库全量引入

> 这一步是整篇的"证据基础"。面试时讲到优化, 能拿出"我先跑了 smp 和 analyzer, 发现 babel 占了 40% 耗时"的人, 和"我加了 cache-loader"的人, 是两个段位。

## 二、缩小处理范围: 成本最低的减法

webpack 默认递归解析所有依赖, 缩小解析范围能立竿见影。

```javascript
const path = require('path');
module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'], // 按使用频率排序, 减少 try
    modules: [path.resolve(__dirname, 'node_modules')], // 不向上递归
    alias: { '@': path.resolve(__dirname, 'src') }, // 缩短路径查找
  },
  module: {
    noParse: /^(vue|react|react-dom|lodash)$/, // 无依赖的大库跳过解析
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: path.resolve(__dirname, 'src'), // 只处理源码
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
```

- `include` 比 `exclude` 优先用: 精确匹配 src, 比排除 node_modules 更不容易漏
- `noParse` 适合 lodash、jquery 这种"不 import 别人"的库, 跳过整个解析

> 这一段没有花哨的东西, 但 80% 的项目根本没做。仅这一步, 解析耗时就能降 30% 以上。

## 三、externals: 把不变的库剥离出打包

体积大、版本稳、CDN 可控的库适合走 externals, 代价是失去 tree-shaking 和升级要同步 HTML。

```javascript
module.exports = {
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    lodash: '_',
    'crypto-js': 'CryptoJS',
  },
};
// index.html
// <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
```

取舍: antd、lodash-es 这种按需加载收益大于全量 CDN 的, 不要走 externals。判定标准是"库体积 > 80KB 且月度更新 < 1 次"。

> 这一步要讲清"为什么这个库走、那个库不走"。无脑全走 externals 是初级做法, 体现不出判断力。

## 四、Tree Shaking 的深坑: sideEffects 配错样式就废了

ESM + production 模式默认开启 tree shaking, 真正的坑在 `sideEffects`。

```json
// package.json
{
  "sideEffects": ["**/*.css", "**/*.less", "antd-mobile/es/global"]
}
```

```javascript
// 显式标记纯函数, 帮助压缩工具安全删除
export const debounce = /*#__PURE__*/ (fn, wait) => { /* ... */ };
```

踩坑场景: `sideEffects: false` 会让 `import './index.less'` 被当作无副作用直接删除, 样式整个失效。修复就是上面的白名单——告诉 webpack "样式文件和全局模块有副作用, 别删"。

验证手段: 改完跑 `webpack --json`, 比对前后产物体积。

> tree shaking 不是"配置开了就完事"。能讲出 sideEffects 语义和样式丢失坑的人, 是真在生产里踩过的。

## 五、持久化缓存: webpack5 最该用的一项

webpack5 内置 filesystem cache, 二次构建提速最明显, 而且是全链路缓存, 不只是 loader 级。

```javascript
module.exports = {
  cache: {
    type: 'filesystem',
    version: createEnvironmentHash(env.raw), // 环境变化时失效
    cacheDirectory: path.resolve(__dirname, '.cache/webpack'),
    buildDependencies: {
      config: [__filename],        // 配置变了, 缓存自动失效
      tsconfig: [path.resolve(__dirname, 'tsconfig.json')],
    },
  },
};
```

- 默认缓存上限 500MB / 两周, 旧缓存先淘汰
- 失效边界: 改 babel/eslint 配置会触发 key 变化, 这是符合预期的
- CI 里把 `.cache/webpack` 缓存到 actions/cache, 跨构建复用, 每次省几分钟

我们项目示例: 冷构建 180s → 二次构建 22s。这是单项收益最大的一步。

> webpack4 时代要靠 babel 的 `cacheDirectory` 和 hard-source-webpack-plugin, 后者维护已停。webpack5 的 filesystem cache 基本替代了这些方案。

## 六、多线程: thread-loader 的适用边界

HappyPack 已停维, 用 thread-loader 把耗时 loader 丢到 worker 池。

```javascript
{
  test: /\.[jt]sx?$/,
  include: path.resolve(__dirname, 'src'),
  use: [
    { loader: 'thread-loader', options: { workers: Math.max(1, require('os').cpus().length - 1) } },
    { loader: 'babel-loader', options: { cacheDirectory: true } },
  ],
}
```

但 thread-loader 不是越多越好。官方明确提示: worker 启动有开销, 模块在 worker 和主进程间传输(IPC)很贵。

适用边界:

- 中大型项目(源码 100+ 文件)才值得, 小项目开了反而变慢
- workers 数量 = CPU 核数 - 1, 别全占
- css-loader、file-loader 这种轻量 loader 不要开线程, 开了反而慢

> 能讲"我加了 thread-loader 后 css-loader 反而变慢, 所以移除了"——这种细节是实战才会有的。

## 七、压缩、分包与长缓存

```javascript
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  output: {
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].js',
  },
  optimization: {
    moduleIds: 'deterministic',          // 稳定 module id, 改一个文件不全量失效
    runtimeChunk: 'single',              // runtime 单独抽出, manifest 变化不影响业务 chunk
    minimize: true,
    minimizer: [new TerserPlugin({ parallel: true }), new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: { test: /[\\/]node_modules[\\/]/, name: 'vendor', priority: 10 },
        ui:     { test: /(antd|element-plus)/, name: 'ui', priority: 9 },
        commons:{ minChunks: 2, name: 'commons', priority: 1 },
      },
    },
  },
};
```

- `moduleIds: 'deterministic'` + `contenthash`: 内容不变的 chunk 哈希不变, 浏览器缓存命中率拉满
- `runtimeChunk: 'single'`: runtime 改动不影响业务, 这是长缓存的关键
- 分包按"vendor / UI 库 / commons"分, 避免单包过大

## 八、为什么我没用 DllPlugin 和 swc-loader

DllPlugin 把 vendor 预打包, 看着快, 但维护成本高: 每次升依赖要重跑 dll build, 而且和持久化缓存收益重叠。webpack5 时代, filesystem cache 基本替代了它的场景, 所以我没用。

swc-loader / esbuild-loader 比 babel-loader 快一个数量级, 但兼容性和生态是代价: 复杂的 babel 插件(比如特定 babel-preset)在 swc 里没有等价物, 团队迁移成本不小。在我们项目里 babel 不是首要瓶颈(持久缓存已经把二次构建压到 22s), 没必要为这点收益承担迁移风险。

> 主动讲"我为什么不用某个流行方案", 比堆配置更体现判断力。优化不是把所有工具都加上, 是知道哪个该加哪个不该加。

## 九、结果与长期维护

示例基线对比:

| 指标 | 优化前 | 优化后 | 变化 |
|---|---|---|---|
| 冷构建 | 180s | 95s | ↓ 47% |
| 二次构建 | 180s | 22s | ↓ 88% |
| 主包体积 | 2.4MB | 1.1MB | ↓ 54% |
| HMR | 4s | 0.8s | ↓ 80% |

长期维护动作:

- `build:analyze` 脚本接进 CI, 每次发版归档 stats.json, 体积回归能告警
- CI 缓存 `.cache/webpack` 和 `node_modules`, 跨构建复用
- 依赖升级前看 bundle 变化, 防止"升个小版本体积涨 200KB"这种回归

> 收尾要给"可长期维护"的工程动作, 不是"优化完就完事"。这一段是高级前端和初级前端最大的分水岭。

## 小结

整条链路的核心思路是三句话: 让 webpack 只做必要的事(缩小范围)、让重复工作复用结果(缓存)、让多核并行干活(多线程)。所有具体配置都是这三句话的落地。优化不是把插件全加上, 是知道每一步的代价和边界在哪。
