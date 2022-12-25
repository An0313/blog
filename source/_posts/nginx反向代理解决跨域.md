---
title: Nginx 反向代理解决跨域
date: 2019-08-26 17:57:50
tag:
- nginx
---

```
location /api/ {
   rewrite  ^/api/(.*)$ /$1 break;
   proxy_pass http://bbb.com:3000/;
}
```
