---
title: Vue 本地开发跨域
date: 2019-02-19 17:57:50
updated: 2022-12-25 18:51:10
tags:
  - vue
  - 工程化
permalink: /2019/02/19/vue%E6%9C%AC%E5%9C%B0%E5%BC%80%E5%8F%91%E8%B7%A8%E5%9F%9F/
---
# vue-cli3
```javascript
// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

// ajax

// 请求 http://localhost:8080/api/XXXXXX 
// 实际请求  http://localhost:3000/XXXXXX
```
