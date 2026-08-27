---
title: nginx 相关命令
date: 2018-12-18 17:57:50
updated: 2022-12-25 16:36:40
tags:
  - nginx
permalink: /2018/12/18/nginx%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4/
---
#### 查看版本
```
    nginx -v
```

#### 验证配置是否正确
```
     nginx -t
```
通过语法测试，并不一定就代表配置文件真的是没问题的。 可以通过-c选项来进一步进行测试
```
    nginx -t -c 
```


#### 快速 启动|关闭|重启 Nginx
```
    nginx -s reload|reopen|stop|quit
```

#### 优雅地停止 Nginx
```
    nginx -s quit
    
    // 或者
    
    kill -s SIGQUIT <nginx master pid>
```
