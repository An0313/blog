---
title: React-px2rem
date: 2018-12-28 17:57:50
tag:
- react
---

安装依赖
```
npm install px2rem-loader

// rem 推荐 lib-flexible
npm i lib-flexible --save
```

```javascript

// /src/index.js 添加
import 'lib-flexible'
```
暴露webpack配置文件
```
npm run eject
```

配置px2rem-px2rem-loader
1. 打开/config/webpack.config.js
2. 修改 getStyleLoaders 方法

```javascript
const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      //  ......
      //  在这个数组里最后添加px2rem-loader
      {
        loader: 'px2rem-loader',
        options: {
          remUni: 75,
          remPrecision: 8
        }
      }
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      });
    }
    return loaders;
  }
```

