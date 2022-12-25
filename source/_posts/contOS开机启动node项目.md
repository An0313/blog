---
title: contOS 开机启动 node 项目
date: 2018-09-17 17:57:50
tag:
- linux
- centOS
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
