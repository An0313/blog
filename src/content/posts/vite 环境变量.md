---
title: vite 环境变量
date: 2023-04-24 10:20:50
updated: 2024-01-26 14:36:53
tags:
  - 工程化
permalink: /2023/04/24/vite%20%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F/
---
// package.json

```json
{
  "scripts": {
    "dev": "server --mode dev",
    "lq": "server --mode lq",
    "prod": "server --mode prod",
    "abc": "server --mode abc"
  }
}
```

// .env 文件

```plaintext
.env
.env.dev
.env.lq
.env.prod
.env.abc
```

// 程序内

```typescript
import.meta.env['环境变量key']
```
