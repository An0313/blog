---
title: Vue px转化为rem
date: 2019-08-16 17:57:50
updated: 2022-12-15 17:23:34
tag:
- Vue2
- Vue3
---

index.html
```html
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
```

# vue3
## Viewport 布局
### 安装插件
```
npm i amfe-flexible postcss-pxtorem;
```
### 配置
```javascript
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  },
}
```
## Rem 布局适配
### 安装插件
```
npm i amfe-flexible postcss-pxtorem;
```
### 配置
postcss.config.js
```javascript
module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue: 75,
      exclude: /node_modules/i
    },
  },
};
```

### vite
vite.config.js
```javascript
import postcsspxtoviewport from "postcss-px-to-viewport"

import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport({
          viewportWidth: 750,
          exclude: /node_modules/i,
        })
      ]
    }
  }
})
```

# Vue2

## vue-cli4

### 安装插件
```
npm i amfe-flexible postcss-pxtorem -S;
```

### 配置插件
mainjs
```javascript
import 'lib-flexible'
```
vue.config.js
```javascript
module.exports = {
    css: {
        loaderOptions: {
          css: {},
          postcss: {
            plugins: [
              require('postcss-pxtorem')({
                rootValue: 37.5
              })
            ]
          }
        }
    },
}
```
或者 package.json
```json
{
  "postcss": {
    "plugins": {
      "autoprefixer": {},
      "postcss-pxtorem": {
        "rootValue": 75
      }
    }
  }
}
```
或者 postcss.config.js
```javascript
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  },
};
```

## vue-cli3

### 安装插件 

``` 
npm i lib-flexible px2rem-loader -S;
```

### 配置插件

main.js
``` javascript
import 'lib-flexible'
```

1.  打开build/utils.js文件，找到exports.cssLoaders方法，在里面添加如下代码

```javascript
const px2remLoader = {
    loader: 'px2rem-loader',
    options: {
      remUint: 75
    }
  }
```
2. 打开build/utils.js文件，找到generateLoaders方法 

```javascript
function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader, px2remLoader];                //  1.添加px2remLoader 插件
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }   
 }
```

3. build/utils.js文件 添加 generateSassResourceLoader方法
```javascript
    function generateSassResourceLoader () {                
       const loaders = [
          cssLoader,
          px2remLoader,
          'less-loader'
       ]
       if (options.extract) {
          return ExtractTextPlugin.extract({
             use: loaders,
             fallback: 'vue-style-loader'
          })
       } else {
           return ['vue-style-loader'].concat(loaders)
       }
    }
```

4. 修改 build/utils.js文件 return
```javascript
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateSassResourceLoader()                //  修改less的值
    } 
```

5. 修改/node_modules/px2rem-loader/lib/px2rem-loader.js
```javascript
var loaderUtils = require('loader-utils')
var Px2rem = require('px2rem')

module.exports = function (source) {
  var options = loaderUtils.getOptions(this)
  if (/node_modules/.test(this.resourcePath)) return source
  var px2remIns = new Px2rem(options)
  return px2remIns.generateRem(source)
}
```

### 重启，一切ok~
```
npm run dev
```

# 插件文档地址
[postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)

[postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)

[lib-flexible](https://github.com/amfe/lib-flexible/tree/master)

[amfe-flexible](https://github.com/amfe/lib-flexible)


