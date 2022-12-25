---
title: centOS 安装 nginx
date: 2018-10-08 17:57:50
tag: 
    - nginx
    - linux
    - centOS
---
系统版本：centOS7.4

# nginx安装
## 1、 判断有无Nginx的源
 ```
yum search nginx
```
无源：先安装源
```
sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

## 2、 安装nginx
```
sudo yum install -y nginx
```

## 3、 启动、停止、重启 nginx
```
//  启动
systemctl start nginx.service
//  停止
systemctl stop nginx.service
//  重启
service nginx restart
```

[nginx开机启动配置](https://www.jianshu.com/p/42476846cd8a)
