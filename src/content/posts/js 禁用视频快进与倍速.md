---
title: js 禁用视频快进与倍速
date: 2023-04-18 19:29:50
updated: 2023-04-18 19:31:06
tags:
  - js
permalink: /2023/04/18/js%20%E7%A6%81%E7%94%A8%E8%A7%86%E9%A2%91%E5%BF%AB%E8%BF%9B%E4%B8%8E%E5%80%8D%E9%80%9F/
---
```javascript
video.ontimeupdate = function () {
  let old = (window.localStorage.getItem(playTimeKey) * 1) || 0;
  // 进制使用倍速
  const {playbackRate} = video
  if (playbackRate !== 1) video.playbackRate = 1

  const cuTime = video.currentTime;
  if (cuTime - old > 2) {
    video.currentTime = old;
  } else {
    old = cuTime;
  }
  window.localStorage.setItem(playTimeKey, old)
}
```
