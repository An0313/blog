---
title: js 时间戳转日期
date: 2019-08-16 17:57:50
updated: 2022-12-25 19:05:14
tags:
  - js
permalink: /2019/08/16/js%E6%97%B6%E9%97%B4%E6%88%B3%E8%BD%AC%E6%97%A5%E6%9C%9F/
---
```javascript
(new Date(1565835493922 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '.'))
//  yyyy.MM.dd HH:mm:ss
```
