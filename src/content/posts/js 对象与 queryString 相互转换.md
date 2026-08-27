---
title: js 对象与 queryString 相互转换
date: 2022-12-30 11:14:50
updated: 2022-12-30 11:31:50
tags:
  - js
permalink: /2022/12/30/js%20%E5%AF%B9%E8%B1%A1%E4%B8%8EqueryString%E7%9B%B8%E4%BA%92%E8%BD%AC%E6%8D%A2/
---
对象转queryString

```javascript
(new URLSearchParams(obj)).toString()
```

queryString 转对象

```javascript
const getQueryObj = () => {
  const query = window.location.href.split('?')[1]
  if (!query) return {}
  const obj = {}
  query.split('&').forEach(q => {
    const item = q.split('=')
    obj[item[0]] = item[1] 
  })
  return obj
}
```
