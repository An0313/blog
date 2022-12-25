---
title: node 中的 this 指针
date: 2019-01-19 17:57:50
tag:
- node
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
