---
title: npm发包、更新与删除
date: 2023-02-14 16:57:50
updated: 2023-02-14 17:02:59
tags:
  - 工程化
permalink: /2023/02/14/npm%E5%8F%91%E5%8C%85%E3%80%81%E6%9B%B4%E6%96%B0%E4%B8%8E%E5%88%A0%E9%99%A4/
---
# 发包

## 创建包

1. 新建目录
2. 创建文件`package.json` `index.js` `README.md`
3. 配置 `package.json` `index.js` 文件1
  2
  3
  4
  5
  6
  7
  8
  9
  10
  11
  12
  13
  {
   "name": "包名",
   "version": "1.0.0", // 版本
   "description": "描述",
   "main": "index.js", // 入口文件
   "author": "作者",
   "license": "ISC", // 证书
   "keywords": ['关键字1', '关键字2'],
   "publishConfig": {
   "access": "public", // 公共包
   "registry": "https://registry.npmjs.org/"
   }
  }
   1
  2
  3
  module.exports = {
   a: 'a',
  };

## 发布

```plaintext
// 切换源
npm config set registry https://registry.npmjs.org

// 注册
npm adduser

// 登录
npm login

// 发布
npm publish
```

## 发布带scope命名空间的包

1. 新建 [组织](https://www.npmjs.com/org/create)
2. 修改 `package.json` name 属性1
  2
  3
  {
   "name": "@[空间名]/[包名]"
  }
3. 发布1
  npm publish

# 更新

```plaintext
npm version patch // 1.0.0 => 1.0.1
npm version minor // 1.0.0 => 1.1.0
npm version major // 1.0.0 => 2.0.0
```

```plaintext
npm publish
```

# 删除

```plaintext
npm deprecate 包名
```
