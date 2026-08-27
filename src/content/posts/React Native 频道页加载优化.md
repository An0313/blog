---
title: "React Native 频道页加载优化: 从 Hermes 到桥接开销的 15% 提速"
date: 2023-10-12 14:00:00
tags:
  - react-native
  - 性能优化
description: 汽车之家 RN 频道页加载慢。从 Hermes 预编译、Bundle 拆分、图片优化、桥接开销到首屏骨架,一条链路把页面加载提速 15%。
permalink: /2023/10/12/react-native性能优化实战/
---

汽车之家二手车 App 的核心频道页是 RN 实现,业务迭代多了之后首屏加载开始吃力。这篇记一下我们怎么把频道页加载时间平均缩短约 15%——不是某个单点优化,是一串链路调整的叠加。

## 一、先量化: 别凭感觉

RN 性能问题最怕凭感觉改。先用工具量清楚瓶颈在哪:

- **Hermes Profile**:Chrome Debugger 连 Hermes,抓首屏 JS 执行 profile,看哪个 module 慢
- **React Profiler**:标记录组件渲染次数和耗时,找重复渲染
- **Bundle 体积**:`metro bundle --analyze` 看 Bundle 组成,找大块依赖

我们测下来瓶颈集中在四处:Bundle 体积、首屏图片、桥调用频繁、首屏空白。15% 是综合优化后的平均改善,不是单点。

## 二、Hermes 引擎预编译字节码

换 Hermes 是最划算的一步。Hermes 预编译 JS 到字节码,启动时跳过解析:

```groovy
// android/app/build.gradle
project.ext.react = [
  enableHermes: true
]
```

iOS 在 Podfile 开 `use_react_native!(:hermes_enabled => true)`。换完后冷启动跳过 JS 解析,首屏 JS 执行快一截。注意 Hermes 不支持的个别 API(某些 `Function` 构造、`with` 语句)要先测,别上线才发现挂了。

## 三、Bundle 拆分 + 内联 requires

频道页 Bundle 一开始打成一个,体积大、解析慢。两步处理:

1. **拆分**:把频道页不立刻需要的模块(二级页 / 活动模块)拆成独立 Bundle,首屏只加载核心,二级页懒加载
2. **内联 requires**:顶层 `import` 会在启动时全加载,改成内联(用时再 `require`),把首屏不需要的推迟

```tsx
// ❌ 顶层 import,启动全加载
import HeavyChart from './HeavyChart';
// ✅ 懒加载,首屏不加载
const HeavyChart = React.lazy(() => import('./HeavyChart'));
```

Bundle 拆完,首屏 JS 体积降一截,解析和执行都跟着快。代价是二级页首次进入有加载延迟,要用过渡态兜住。

## 四、图片: 缓存 + 占位 + 懒加载

频道页图片密集,首屏卡顿一半来自图片。三招:

- **缓存**:用 `react-native-fast-image`(基于原生 SDWebImage / Glide)替代 `Image`,磁盘缓存命中后秒出
- **占位**:首屏骨架屏(Skeleton),数据回来前不空白,体感快很多
- **懒加载**:列表图片 `removeClippedSubviews`,屏幕外不渲染

```tsx
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: item.cover, priority: FastImage.priority.normal }}
  resizeMode={FastImage.resizeMode.cover}
/>;
```

骨架屏对"体感快"贡献最大——首屏不空白,用户感知加载立刻完成,哪怕实际数据还没全回来。

## 五、桥接开销: 批量 + 减少 native call

RN JS 和原生走桥接,频繁 native call 是隐性瓶颈。两步:

1. **批量**:多个 native 操作合并,别在循环里每次都过桥(批量设状态、批量读)
2. **少过桥**:能在 JS 算的不丢给原生(布局计算、数据转换),原生只做 JS 做不了的(传感器 / 系统能力)

DevTools 的 Bridge 面板能看到调用频率,高频的优先优化。桥接是 RN 性能的暗礁,很多"莫名卡顿"根子在这里。

## 六、结果与边界

综合下来,频道页首屏加载平均缩短约 15%。不是单点 15%,是 Hermes + Bundle + 图片 + 桥接四项叠加。边界要诚实:

- Hermes 有 API 兼容,要测
- Bundle 拆分增加复杂度,二级页加载有延迟
- FastImage 多一个依赖,包体积增加

> 15% 这个数字要诚实——它是平均改善,低端机改善更大,高端机可能只感觉首屏快了点。性能优化别吹单点大跃进,链路各处挤一点,加起来才实在。

## 小结

RN 性能优化没有银弹。**Hermes 预编译 + Bundle 拆分 + 图片缓存占位 + 桥接精简**,四步叠加把频道页首屏提速 15%。起点永远是量化(profile + bundle analyze + bridge),不是猜。和 Flutter 那篇性能文同理——先量化再优化,是所有性能工作的铁律。
