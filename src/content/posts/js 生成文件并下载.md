---
title: js 生成文件并下载
date: 2023-04-28 15:30:50
updated: 2023-04-28 15:29:21
tags:
  - js
permalink: /2023/04/28/js%20%E7%94%9F%E6%88%90%E6%96%87%E4%BB%B6%E5%B9%B6%E4%B8%8B%E8%BD%BD/
---
```javascript
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  
  element.style.display = 'none';
  document.body.appendChild(element);
  
  element.click(); 
  document.body.removeChild(element);
} 
  
download("hello.txt","This is the content of my file :)");
```
