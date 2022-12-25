---
title: Vue 本地开发跨域
date: 2019-02-19 17:57:50
tag:
- Vue2
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
