---
title: Vue 页面加载进度条
date: 2018-12-19 17:57:50
updated: 2022-12-25 19:45:07
tags:
  - vue
  - 性能优化
permalink: /2018/12/19/vue%E9%A1%B5%E9%9D%A2%E5%8A%A0%E8%BD%BD%E8%BF%9B%E5%BA%A6%E6%9D%A1/
---
# 页面加载进度条

### 安装

```plaintext
npm install --save nprogress
```

### 配置

> mian.js

```plaintext
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
    NProgress.start();
    next()
  }
});

router.afterEach(transition => {
  NProgress.done();
});
```
