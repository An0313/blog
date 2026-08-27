---
title: js手机号
date: 2019-08-16 17:57:50
updated: 2023-01-12 10:03:48
tags:
  - js
permalink: /2019/08/16/js%E6%89%8B%E6%9C%BA%E5%8F%B7%E8%84%B1%E6%95%8F/
---
```typescript
const telDesensitization = (phone: string): string =>
  phone?.length === 11 ? phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2') : '';
```
