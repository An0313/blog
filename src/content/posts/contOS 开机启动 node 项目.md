---
title: contOS 开机启动 node 项目
date: 2018-09-17 17:57:50
updated: 2022-12-25 18:13:36
tags:
  - 运维
  - node
permalink: /2018/09/17/contOS%E5%BC%80%E6%9C%BA%E5%90%AF%E5%8A%A8node%E9%A1%B9%E7%9B%AE/
---
### 1.安装pm2
```
sudo npm install pm2 -g
```


### 2.开机启动

```
pm2 start /api/server.js --name="nodeServer"
```

### 3.将pm2设置为开机启动
```
pm2 startup
```
