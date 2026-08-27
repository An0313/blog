---
title: "AGENTS.md 与 AI 约束文件: 把项目规矩写进 AI 读得到的地方"
date: 2025-12-05 15:00:00
tags:
  - ai
  - 工程化
description: AI 编程助手不知道你项目的代码风格、目录约定和不能碰的边界。AGENTS.md / .cursorrules / copilot-instructions 这类文件就是写给 AI 的项目说明书。这篇讲该写什么、不该写什么。
permalink: /2025/12/05/ai约束文件实战/
---

AI 工具每次会话都从零开始。你让它"重构这个组件",它不知道:你们项目用 Provider 不用 Redux、状态变量加 _ 前缀是约定、某个 legacy 目录不能动。结果它给的方案你每次都要纠正一遍,纠正到第三次你就嫌 AI 笨了——其实是它没拿到 context。

约束文件就是把这些"项目常识"写一次,让 AI 每次自动读。

## 一、几种文件的区别

- **AGENTS.md**:跨工具通用约定。放仓库根,是新兴开放标准,目标是让所有 AI 编程工具读同一份项目说明。
- **.cursor/rules/**:Cursor 专用规则目录,可按文件路径触发不同规则(改 RN 文件读 A,改 Flutter 文件读 B)。
- **.github/copilot-instructions.md**:GitHub Copilot 在仓库根读的指令。
- **.clinerules**:Cline 工具读。

实务:写一份 AGENTS.md 放根目录做主,工具专用的(.cursor/rules)只放工具特有、AGENTS.md 表达不了的(比如按路径触发的规则)。别每样写一份,会烂掉。

## 二、该写什么(按重要性排)

### 1. 目录结构和不能动的地方

```
src/
  pages/        # 路由页面,每个对应一个 URL
  components/   # 跨页面复用组件
  legacy/       # 2022 老代码,不要重构,改 bug 才动
```

"不要动 legacy/"这种边界比"要做什么"更重要——AI 默认会热情地帮你重构一切,而很多老代码是碰不得的雷区。

### 2. 技术栈和约定

- 状态管理用 Provider/Riverpod,不用 Redux、不用 GetX
- 组件 props 用 TypeScript interface,不用 PropTypes
- 样式用 CSS Variables(变量在 global.css),不要内联 style

要写"用什么"**和**"不用什么"——只写"用什么"不够,AI 会自作主张用别的。

### 3. 提交前自查

- 改组件跑 `npm test -- <组件名>`
- PR 要过 `astro check`
- 性能改动附 Profiler 截图

让 AI 知道交付前要自检什么。

### 4. 提交规范

- commit 用 conventional commits
- PR 描述写 before/after

## 三、不该写什么(更重要)

**不要写通用编码规范**。"函数要短"、"命名要清晰"这种 AI 本来就会,写了浪费 context 还稀释重点。

**不要写工具教程**。"Cursor 怎么用 @file"不该出现在 AGENTS.md,那是工具的事不是项目的事。

**不要写空泛原则**。"代码要高质量"、"注重性能"——这种谁都会说、AI 读了没用。要写就写具体的:"首屏列表虚拟化必须用 react-window,不要手写"。

## 四、一个最小可用结构

```markdown
# AGENTS.md

## 项目结构
(目录说明 + legacy 边界)

## 技术栈
(用什么 + 不用什么)

## 提交前自查
(命令清单)

## AI 协作约定
- 改函数前先读 prompts/refactor.md
- 不确定的设计先提方案再改代码
- legacy/ 不重构
```

四节,每节三五行,够了。AGENTS.md 超过 100 行基本就是没想清楚重点。

## 五、维护

- 每次 onboarding 新人,让他改 AGENTS.md 里他踩过的坑——这是最准的"该加什么"信号
- 每季度删一次,把 AI 已经默认会做的条目砍掉
- 不要让 AGENTS.md 变成"项目宪法",它是"项目近期注意事项",时效性强

## 小结

约束文件的本质和 [prompt 模板库](/2025/09/18/项目内提示词模板库怎么搭/)一样:把散在各人脑子里的"项目常识"沉淀成 AI 读得到的文件。区别在于——模板库管"怎么提需求",约束文件管"项目长什么样"。两份配齐了,AI 才能从"每次会话都从零开始的实习生"变成"读过项目说明的实习生"。

注意还是实习生。读完说明不等于会做决策,架构和业务的边界仍然得自己来。这点见 [AI 辅助开发的工程化边界](/2025/03/12/ai辅助开发的工程化边界/)。
