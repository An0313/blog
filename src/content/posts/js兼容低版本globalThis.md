---
title: js兼容低版本globalThis
date: 2024-01-26 14:38:50
updated: 2024-01-26 14:39:31
tags:
  - js
permalink: /2024/01/26/js%E5%85%BC%E5%AE%B9%E4%BD%8E%E7%89%88%E6%9C%ACgobalThis/
---
```html
<script>
    if (typeof globalThis === 'undefined') {
      if (typeof window !== 'undefined') {
        window.globalThis = window;
      } else if (typeof self !== 'undefined') {
        self.globalThis = self;
      } else if (typeof global !== 'undefined') {
        global.globalThis = global;
      } else {
        // 注意：在严格模式下，这将在全局范围内定义一个全局变量
        this.globalThis = this;
      }
    }
  </script>
```
