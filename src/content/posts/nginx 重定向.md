---
title: nginx 重定向
date: 2018-10-26 17:57:50
updated: 2022-12-25 16:38:14
tags:
  - nginx
permalink: /2018/10/26/nginx%E9%87%8D%E5%AE%9A%E5%90%91/
---
### http重定向到https
```
server {  
    listen  111.11.1.111:80;  
    server_name test.com;  
      
    rewrite ^(.*)$  https://$host$1 permanent;  
} 
```
