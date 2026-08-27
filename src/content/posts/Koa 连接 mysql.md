---
title: Koa 连接 mysql
date: 2019-02-22 17:57:50
updated: 2023-04-28 18:20:16
tags:
  - node
permalink: /2019/02/22/koa%E8%BF%9E%E6%8E%A5mysql/
---
mysql.config.js

```javascript
const mysql = require('mysql');

// 创建 mysql 连接池资源
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mima',
    database: 'db'
});

module.exports = function (sql, value) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) reject(false);
            else connection.query(sql, value, (error, results, fields) => {
                //将链接返回到连接池中，准备由其他人重复使用
                connection.release();
                if (error) reject(false);
                else resolve(results)
            });
        });
    })

}
```

使用

```javascript
async function xxx () {
   const s = await query("sql", value)
   s ? '操作成功': '操作失败'
 }
```
