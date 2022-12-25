---
title: mysql 修改时区
date: 2019-03-01 17:57:50
tag:
- mysql
---

mysql默认使用的是UTC通用标准时
```javascript
1. 可以将数据库的时区也改成utc的
2. 在连接mysql的配置文件中添加一条，timezone:"08:00"
```
