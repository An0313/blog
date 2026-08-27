---
title: RN项目中遇到的问题
date: 2023-08-28 17:39:50
updated: 2023-12-15 14:04:15
tags:
  - react-native
permalink: /2023/08/28/RN%E9%A1%B9%E7%9B%AE%E4%B8%AD%E9%81%87%E5%88%B0%E7%9A%84%E9%97%AE%E9%A2%98/
---
1. 圆角在 ios 设备 Text 中不生效
2. Text 自带边距
3. 安卓transform skewX 属性不生效
4. 安卓通过`measure` `measureInWindow`api获取不到坐标与元素尺寸，ios可以正常返回，安卓需要给要获取的元素添加 `collapsable={false} `属性
5. ` position: 'absolute'` 相对父元素定位
