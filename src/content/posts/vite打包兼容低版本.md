---
title: vite打包兼容低版本
date: 2024-01-26 14:38:50
updated: 2024-01-26 14:39:15
tags:
  - 工程化
permalink: /2024/01/26/vite%E6%89%93%E5%8C%85%E5%85%BC%E5%AE%B9%E4%BD%8E%E7%89%88%E6%9C%AC/
---
```plaintext
yarn add @vitejs/plugin-legacy -D
// 或
yarn add terser --dev
```

```javascript
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  //...
  plugins: [
    // ...
    legacy({
      targets: ['defaults', "> 1%", "last 2 versions", "not ie <= 8"],
      cssTarget: ['defaults', "> 1%", "last 2 versions", "not ie <= 8"],
      additionalLegacyPolyfills:['regenerator-runtime/runtime'] // 面向IE11时需要此插件

    })
  ]
})
```
