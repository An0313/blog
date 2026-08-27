---
title: vite 清除缓存
date: 2023-11-20 17:35:50
updated: 2023-11-20 17:38:59
tags:
  - 工程化
permalink: /2023/11/20/vite%20%E6%B8%85%E9%99%A4%E7%BC%93%E5%AD%98/
---
### 清除办法

1. `--force ` 选项，来重新构建依赖项;
2. 手动删除 `node_modules/.vite` 缓存目录

### 文件系统缓存

Vite 将预构建的依赖项缓存到 `node_modules/.vite` 中。它会基于以下几个来源来决定是否需要重新运行预构建步骤：

- 包管理器的锁文件内容，例如 `package-lock.json`，`yarn.lock`，`pnpm-lock.yaml`，或者 `bun.lockb`；
- 补丁文件夹的修改时间；
- `vite.config.js` 中的相关字段；
- `NODE_ENV` 的值

只有在上述其中一项发生更改时，才需要重新运行预构建。

[参考文档](https://cn.vitejs.dev/guide/dep-pre-bundling.html#caching)
