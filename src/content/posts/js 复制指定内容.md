---
title: js 复制指定内容
date: 2019-08-16 17:57:50
updated: 2022-12-25 19:05:27
tags:
  - js
permalink: /2019/08/16/js%E5%A4%8D%E5%88%B6%E6%8C%87%E5%AE%9A%E5%86%85%E5%AE%B9/
---
```
npm install clipboard –save
```

> html
``` 
    <div class="fr blue" id="copy" @click="copy" data-clipboard-text="要复制的内容">
        点击复制微信号:{{d.busWechat}}
    /div>   
```

> js
```
    import Clipboard from 'clipboard'
    new ClipboardJS('#copy');
```
