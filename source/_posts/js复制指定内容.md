---
title: js 复制指定内容
date: 2022-12-23 17:57:50
tag:
- js
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
