---
title: node 中的 this 指针
date: 2019-01-19 17:57:50
updated: 2022-12-25 18:55:07
tags:
  - node
permalink: /2019/01/19/node%E4%B8%ADthis%E6%8C%87%E9%92%88/
---
# 全局中的this
```javascript
const fn = () => {
    this.num = 20
}
fn()
console.log(this)                   // {}
console.log(this.num)               // undefined
console.log(global.num)             // 20
```

# 函数中this
```javascript
const fn = () => {
    this.num = 20
}
fn()
console.log(this)                   // {}
console.log(this.num)               // undefined
console.log(global.num)             // 20

function fn(){
  function fn2(){
    this.age = 18;
  }
  fn2();
  console.log(this);              // global
  console.log(this.age);          // 18
  console.log(global.age);        // 18
}
fn();

function Fn(){
  this.num = 998;
}
var fn = new Fn();
console.log(this);                  // {}
console.log(fn.num);                // 998
console.log(global.num);            // undefined
```
