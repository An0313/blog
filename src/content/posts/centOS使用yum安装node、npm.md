---
title: centOS使用yum安装node、npm
date: 2018-10-08 17:57:50
updated: 2022-12-25 18:07:11
tags:
  - 运维
permalink: /2018/10/08/centOS%E4%BD%BF%E7%94%A8yuman%E5%AE%89%E8%A3%85node%E3%80%81npm/
---
### 1

```
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -

// 或者

curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -
```

### 2
```
sudo yum -y install nodejs
```

> 可选：： 安装构建工具
```
sudo yum install gcc-c++ make
# or: sudo yum groupinstall 'Development Tools'
```
