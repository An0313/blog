---
title: Vue 全局less sess变量
date: 2018-12-19 17:57:50
updated: 2022-12-15 17:37:34
tag:
- Vue2
- Vue3
---
## vue-cli4+
## #安装插件
```
yarn add --dev less-loader less
yarn add --dev style-resources-loader

npm install node-sass -D
npm install sass-loader -D
```

### 配置
vue.config.js

```javascript
module.exports = {
  sass: {
    loaderOptions: {
      //scss 全局变量引用
      //sass-loader v8-，这个选项名是 "data"
      //sass-loader v8 中，这个选项名是 "prependData"
      //sass-loader v10+，这个选项名是 "additionalData"
      sass: {
        prependData: `@import "";`,
      },
    },
  },
  pluginOptions: { // 第三方插件配置
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, '')] // less所在文件路径
    }
  }
}
```

## vue-cli3

## #安装插件

```
npm install sass-resources-loader
```

### 配置

```
module: {
  rules: [
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            // Provide path to the file with resources
            resources: './path/to/resources.scss',
 
            // Or array of paths
            resources: ['./path/to/vars.scss', './path/to/mixins.scss']
          },
        },
      ],
    },
  ],
},
```

[sass-resources-loader文档](https://www.npmjs.com/package/sass-resources-loader)
