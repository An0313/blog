---
title: js 判断客户端是否断网
date: 2022-12-28 12:14:50
updated: 2022-12-28 12:17:05
tags:
  - js
permalink: /2022/12/28/js%E5%88%A4%E6%96%AD%E6%98%AF%E5%90%A6%E6%96%AD%E7%BD%91/
---
```javascript
if (navigator.onLine) {
  console.log("有网");
} else {
  console.log("没网");
}
```

```javascript
window.addEventListener("online", online, false);
window.addEventListener("offline", offline, false);

function online() {
  alert("重新连接");
}

function offline() {
  alert("连接断开");
}
```
