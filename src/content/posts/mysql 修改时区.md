---
title: mysql 修改时区
date: 2019-03-01 17:57:50
updated: 2022-12-25 18:41:30
tags:
  - node
permalink: /2019/03/01/mysql%20%E6%97%B6%E5%8C%BA/
---
mysql默认使用的是UTC通用标准时
```javascript
1. 可以将数据库的时区也改成utc的
2. 在连接mysql的配置文件中添加一条，timezone:"08:00"
```
