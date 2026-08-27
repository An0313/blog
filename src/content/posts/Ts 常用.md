---
title: Ts 常用
date: 2023-05-16 16:13:50
updated: 2023-05-16 16:27:31
tags:
  - typescript
permalink: /2023/05/16/ts%20%E5%B8%B8%E7%94%A8/
---
```typescript
interface a {
  z: 1
  x: 2
}

type b = a

enum c  {
  a,
  b,
  c,
}

declare namespace API {
  type get = {}
  
  interface post {}
}

Omit<a, z>
Pick<a, x>

Partial<a> // 可选
Required<a> // 必选
Readonly<a> // 只读
Mutable<a> // 移除只读

Exclude<'key1' | 'key2', 'key2'> // 'key1'
Extract<'key1' | 'key2', 'key1'> // 'key1'

typeof a

type d = keyof a
```

# Record

```typescript
type petsGroup = 'dog' | 'cat' | 'fish';
interface IPetInfo {
    name:string,
    age:number,
}

type IPets = Record<petsGroup, IPetInfo>;

const animalsInfo:IPets = {
    dog:{
        name:'dogName',
        age:2
    },
    cat:{
        name:'catName',
        age:3
    },
    fish:{
        name:'fishName',
        age:5
    }
}
```
