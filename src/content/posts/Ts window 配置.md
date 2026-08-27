---
title: Ts window 配置
date: 2023-03-08 15:20:50
updated: 2024-01-12 16:08:12
tags:
  - typescript
permalink: /2023/03/08/ts%20window%E9%85%8D%E7%BD%AE/
---
src/global.d.ts

```typescript
export {}
declare global {
  interface Window {
    VConsole: any;//全局变量名
    $: any;//全局变量名
  }
}

declare interface Window {
    aayh: any;
    aadsh:any;
}

// 或者

declare namespace Window {
    export var vrequest:any;
}
```

tsconfig.json

```plaintext
{
  //...
  "include": [
    //...
    "./src/global.d.ts"
  ]
}
```
