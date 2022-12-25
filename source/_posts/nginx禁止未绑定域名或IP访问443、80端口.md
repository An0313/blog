---
title: nginx 禁止未绑定域名或IP访问
date: 2018-10-08 17:57:50
tag:
- nginx
---

> 把下面这个server  放到最前面  
> 把其他server里 listen 中的  default_server删掉

#### 80端口

```
    server {
        listen       80 default_server;
        server_name  _;
        return       403;
    }
```

#### 443端口
```
    server {
        listen       80 default_server;
        listen       443 default_server;
        server_name  _;
        return       403;

        ssl_certificate "/etc/nginx/cert/214744744310771.pem";
        ssl_certificate_key "/etc/nginx/cert/214744744310771.key";
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  5m;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;
    }
```

> 个人感觉443的没有太大用处 因为没有证书浏览器直接显示 不是私密链接
