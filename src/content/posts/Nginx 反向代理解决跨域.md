---
title: Nginx 反向代理解决跨域
date: 2019-08-26 17:57:50
updated: 2022-12-25 18:38:35
tags:
  - nginx
permalink: /2019/08/26/nginx%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F/
---
```
location /api/ {
   rewrite  ^/api/(.*)$ /$1 break;
   proxy_pass http://bbb.com:3000/;
}
```
