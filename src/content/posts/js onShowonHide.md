---
title: js onShow/onHide
date: 2022-12-26 12:26:50
updated: 2022-12-26 13:03:28
tags:
  - js
permalink: /2022/12/26/js%20onShow%E4%B8%8EonHide/
---
# js 原生

## visibilitychange 事件

```javascript
document.addEventListener("visibilitychange", function() {
  // document.visibilityState === 'visible' // 显示
  // document.visibilityState === 'hidden' // 隐藏
  console.log(document.visibilityState);
  
  //或者
  
  // document.hidden === true // 隐藏
  // document.hidden === false // 显示
  console.log(document.hidden)
});
```

## pageshow/pagehide 事件

```javascript
window.addEventListener('pageshow', function () {
    log('pageshow: 页面显示');
});
window.addEventListener('pagehide', function () {
    log('pagehide: 页面隐藏');
});
```

## visibilitychange 与 pageshow/pagehide 的区别

### 功能

虽然都是有显示与隐藏的含义，但是 visibilitychange 指的是页面的可见与不可见，pageshow/pagehide 指的是页面的进入与离开。

触发时机：

> 页面加载与刷新：pageshow
> 
> 选项卡切换：visibilitychange
> 
> 前进和后退：依次触发 pagehide，visibilitychange 和 pageshow

- Safari浏览器不触发 visibilitychange

### 注册方式

visibilitychange 事件通常都是挂载在 document 对象上，然现在最新的浏览器也支持挂载在 window 对象上，不过由于 Safari 14 之前的版本不支持

```javascript
document.addEventListener('visibilitychange', () => {});
```

pageshow 和 pagehide 事件都是通过 window 对象进行注册的

```javascript
window.addEventListener('pageshow', ()=> {});
window.addEventListener('pagehide', ()=> {});
```

### 兼容

pageshow 和 pagehide 事件是 IE11 及其以上浏览器支持的，

而 visibilitychange 事件是 IE10 及其以上版本支持的

# 插件与工具

## vue

[vue-visibility-change](https://github.com/Yuliang-Lee/vue-visibility-change)

### 安装

```plaintext
npm i vue-visibility-change -S
```

### 引入

main.js

```javascript
import visibility from 'vue-visibility-change';

Vue.use(visibility);
```

### 使用

#### 全局

main.js

```javascript
visibility.change((evt, hidden) => {
  console.log('global callback: ' + hidden);
});
```

#### 局部

```plaintext
<template>
    <div v-visibility-change="change"></div>
</template>

<script>
export default {
  methods:{
    change(evt, hidden) {
      //hidden为false的时候，表示从别的页面切换回当前页面
      //hidden为true的时候，表示从当前页面切换到别的页面
    }
  }
}
</script>
```

## PageLifecycle.js

深入了解请查看：

[PageLifecycle.js](https://github.com/GoogleChromeLabs/page-lifecycle)

[google 官方的文章](https://developer.chrome.com/blog/page-lifecycle-api/)

```html
<script src="./lifecycle.es5.js"></script>
<script>
lifecycle.addEventListener('statechange', function(event) {
    console.log('状态变化：' + event.oldState + ' → ' + event.newState);
});
</script>
```

# 补充

## 页面的生命周期

- ACTIVE 激活
- PASSIVE 未激活（页面可以看到，但焦点不在此页面，打开开发者工具可以触发此状态）
- HIDDEN 隐藏，最小化、标签页切换都属于隐藏
- FROZEN 冻结
- TERMINATED 结束 （页面被关闭）
- DISCARDED 废弃（页面内容被浏览器清空）

从 HIDDEN 状态到 FROZEN 状态之间的变化是有新的 API 事件名称检测的，分别是 resume 事件和 freeze 事件，使用示意如下：

```javascript
document.addEventListener('freeze', (event) => {
  // 页面被冻结
});

document.addEventListener('resume', (event) => {
  // 页面解冻了
});
```
