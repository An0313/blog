title: Vue 页面加载进度条
date: 2018-12-19 17:57:50
tag:
- Vue2
---

# 页面加载进度条

### 安装

```
 npm install --save nprogress
```

### 配置

> mian.js

```
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
