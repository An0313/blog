---
title: nginx 重定向
date: 2018-10-26 17:57:50
tag:
- nginx
---

### http重定向到https
```
server {  
    listen  111.11.1.111:80;  
    server_name test.com;  
      
    rewrite ^(.*)$  https://$host$1 permanent;  
} 
```
