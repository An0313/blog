---
title: nginx 相关命令
date: 2018-12-18 17:57:50
tag:
- nginx
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
