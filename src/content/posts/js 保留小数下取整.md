---
title: js 保留小数下取整
date: 2023-04-12 15:35:50
updated: 2023-04-12 15:37:46
tags:
  - js
permalink: /2023/04/12/js%20%E4%BF%9D%E7%95%99%E5%B0%8F%E6%95%B0%E4%B8%8B%E5%8F%96%E6%95%B4/
---
```typescript
const setPrice = (price: number) => Math.floor(price * 100) / 100;
setPrice(35.66) // 35.65 存在精度问题

/**
 * 保留小数（下取整）
 * @param n {Number} 要保留小数的数字
 * @param len {Number} 要保留小数的位数
 */
const toFixed = (n: number, len: number): number => {
  let val = "";
  const nStr = n + "";
  // 小数
  const [integer, decimal] = nStr.split(".");

  if (decimal === undefined) val = nStr;
  else if (decimal.length <= len) val = `${integer}.${decimal}`;
  else val = `${integer}.${decimal.substring(0, len)}`;

  return Number(val);
};
```
