---
title: 单页面配置页面标题
date: 2018-12-19 17:57:50
updated: 2022-12-15 17:59:34
tag:
- Vue2
- Vue3
---

# vue2、3

### 安装
```
npm install vue-wechat-title --save
```


### 配置

> mian.js
```
Vue.use(require('vue-wechat-title'))
```

> router.js
```
 {
    name: 'Home',
    path: '/home',
    meta: {
      title: '首页'
    },
    component: require('../views/Home.vue')
  }
```

> App.vue 
```
<router-view v-wechat-title="$route.meta.title" img-set="/static/logo.png"></router-view>
```



[文档链接](https://www.npmjs.com/package/vue-wechat-title)
