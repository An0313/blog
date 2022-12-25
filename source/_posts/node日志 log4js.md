---
title: node 日志 log4js
date: 2019-01-19 17:57:50
tag:
- node
---

### 安装log4js
```javascript
npm install log4js
```     

### 简单实用
```javascript
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug'; 
logger.debug("Some debug messages")
```

###
> 如果不调用configure，log4js将使用LOG4JS_CONFIG（如果已定义）或默认配置。

> 默认配置定义了一个appender，它将使用彩色布局记录到stdout，但也将默认日志级别定义为OFF - 这意味着不会输出任何日志。

> 配置对象必须至少定义一个appender和一个默认类别。如果配置无效，Log4js将抛出异常。

```javascript
const log4js = require('log4js');

log4js.configure(object || string)      //  配置入口。string参数被视为用于加载配置的文件名(json文件)
```

```javascript
log4js.configure({
    levels: Object,                     //  用于定义自定义日志级别或重新定义现有日志级别
    appenders: Object,                  //  Appenders将日志事件序列化为某种形式的输出。
})
```

[jog4js官方文档](https://log4js-node.github.io/log4js-node/api.html)
