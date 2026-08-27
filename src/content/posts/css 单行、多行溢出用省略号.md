---
title: css 单行、多行溢出用省略号
date: 2022-12-25 21:22:50
updated: 2022-12-25 21:23:12
tags:
  - js
permalink: /2022/12/25/css%E5%8D%95%E8%A1%8C%E3%80%81%E5%A4%9A%E8%A1%8C%E6%BA%A2%E5%87%BA%E7%94%A8%E7%9C%81%E7%95%A5%E5%8F%B7/
---
# 单行

```plaintext
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

# 多行

```plaintext
overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```

# 多行不生效

```plaintext
overflow: hidden;
 text-overflow: ellipsis;
 display: -webkit-box;
 /*! autoprefixer: off */
 -webkit-box-orient: vertical;
 /* autoprefixer: on */
 -webkit-line-clamp: 3;
```

打包时，警告

```plaintext
Emitted value instead of an instance of Error) autoprefixer: \static\css\reset\index.css:99:3: Second Autoprefixer control comment was ignored. Autoprefixer applies control comment to whole block, not to next rules.
```

解决办法

```plaintext
/*! autoprefixer: ignore next */
-webkit-box-orient: vertical;
```
