---
title: package.json 常见配置
date: 2023-02-06 10:22:50
updated: 2023-02-22 10:29:11
tags:
  - 工程化
permalink: /2023/02/06/npm%20package.json%E9%85%8D%E7%BD%AE/
---
[package.json 官方文档](https://docs.npmjs.com/cli/v8/configuring-npm/package-json/)

```json
{
  "name": "项目名称",
  "version": "当前版本号",
  "description": "项目描述",
  "keywords": [
    "关键字",
    "关键字"
  ],
  "author": "作者",
  "contributors": [
    "贡献者 <邮箱> （链接）",
    "贡献者 <邮箱> （链接）"
  ],
  // 或
  //  "contributors": [
  //    {
  //      name: "贡献者",
  //      email: "xxx@xx.com",
  //      url: "链接"
  //    }
  //  ],
  "homepage": "项目主页",
  "repository": "仓库地址",
  // 或
  // "repository": {
  //  "type": "git",
  //  "url": "仓库地址"
  // },
  "bugs": {
    "url": "bug反馈地址，常见的就是github 中的 issues"
  },
  "dependencies": {
    "生产依赖包名": "版本号， 安装固定版本号 1.0.0",
    "生产依赖包名": "安装1.0.x最新版本 ～1.0.0(不低于1.0.0)",
    "生产依赖包名": "安装1.x.x最新版本 ^1.0.0(不低于1.0.0)",
    "生产依赖包名": "安装最新版本 latest"
  },
  "devDependencies": {
    "开发依赖包": "版本号"
  },
  "peerDependencies": {
    "包名": "项目依赖版本与用户依赖版本冲突所使用的版本"
  }
}
```
