---
title: ts 找不到模块“.module.less”或其相应的类型声明
date: 2023-03-10 11:20:50
updated: 2023-03-10 11:17:40
tags:
  - typescript
permalink: /2023/03/10/ts%20%E6%89%BE%E4%B8%8D%E5%88%B0%E6%A8%A1%E5%9D%97%E2%80%9C.module.less%E2%80%9D%E6%88%96%E5%85%B6%E7%9B%B8%E5%BA%94%E7%9A%84%E7%B1%BB%E5%9E%8B%E5%A3%B0%E6%98%8E/
---
```plaintext
declare module '*.module.less' {
  const classes: {
    readonly [key: string]: string
  }
  export default classes
  declare module '*.less'
}
```
