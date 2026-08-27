---
title: React在TS中声明函数组件的方式与区别
date: 2024-01-03 14:35:50
updated: 2024-01-03 14:39:29
tags:
  - react
  - typescript
permalink: /2024/01/03/react%E5%9C%A8TS%E4%B8%AD%E5%A3%B0%E6%98%8E%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E7%9A%84%E6%96%B9%E5%BC%8F%E4%B8%8E%E5%8C%BA%E5%88%AB/
---
##### 方式一

```tsx
const Component: React.FC<ComponentProps> = (props) => {}
```

使用`React.F`C的好处是类型定义更为明确，可以清楚地看出这是一个React函数组件。此外，`React.FC`还自动为props添加了`childre`n属性，所以如果你的组件需要接收`children`，这种方式会更方便。

然而，`React.FC`也有一些缺点。首先，它不能很好地支持默认props。其次，由于`React.FC`自动添加了`children`属性，如果你的组件不应该接收`children`，这可能会导致类型错误。

##### 方式二

```tsx
const Component = (props: IProps) => {}
```

这种方式的好处是更加灵活，你可以完全控制props的类型。此外，它也更好地支持默认props。

##### 总结

总的来说，哪种方式更好取决于你的具体需求。如果你需要更明确的类型定义，或者你的组件需要接收`children`，那么`React.FC`可能是更好的选择。如果你需要更大的灵活性，或者你的组件不应该接收`children`，那么直接定义`props`类型可能
