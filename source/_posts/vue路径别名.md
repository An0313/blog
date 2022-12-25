title: 单页面配置页面标题
date: 2018-12-19 17:57:50
tag:
- Vue2
---

修改 /build/webpack.base.conf.js
```javascript
let webpackConfig = {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '别名': "路径"
        }
      }
}
```
