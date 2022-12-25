---
title: js 时间戳转日期
date: 2019-08-16 17:57:50
tag:
- js
---

```javascript
(new Date(1565835493922 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '.'))
//  yyyy.MM.dd HH:mm:ss
```
