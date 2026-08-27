---
title: webpack5 优化
date: 2023-01-05 13:57:50
updated: 2023-03-10 13:23:20
tags:
  - 工程化
  - 性能优化
permalink: /2023/01/05/webpack5%20%E6%89%93%E5%8C%85%E4%BC%98%E5%8C%96/
---
# 配置打包体积分析与耗时分析

[Webpack Bundle Analyzer 文档](https://github.com/webpack-contrib/webpack-bundle-analyzer)

[Speed Measure Plugin 文档](https://github.com/stephencookdev/speed-measure-webpack-plugin#readme)

```plaintext
yarn add webpack-bundle-analyzer speed-measure-webpack-plugin
```

webpakc.config.js

```javascript
// 可视化打包
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// 打包耗时分析插件
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    new BundleAnalyzerPlugin(),
    new SpeedMeasureWebpackPlugin(),
    // ...
  ]
  // ...
}
```

根据体积分析与耗时插件的分析结果在针对优化

# 配置 externals

[externals 文档](https://webpack.docschina.org/configuration/externals#root)

webpakc.config.js

```javascript
module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      files: {
        js: [
          './static/js/lodash.min.js',
          './static/js/crypto-js.js',
          './static/js/vconsole.min.js',
        ],
        css: []
      }
    })
  ],
  externals: {
    vconsole: 'VConsole',
    lodash: '_',
    'crypto-js': 'CryptoJS',
    // vue react vue-router....
  }
}
```

- 项目中可根据环境针对配置

# 配置 Tree Shaking

[Tree Shaking 文档](https://webpack.docschina.org/guides/tree-shaking/#root)

package.json

```plaintext
{
  "name": "xxx",
  // "sideEffects": false,
  "sideEffects": [
    "*.less",
    "*.css"
  ],
}
```

webpack.config.js

```javascript
module.exports = {
  mode: 'development',
  optimization: {
    usedExports: true,
  }
}
```

代码

```javascript
export default /*#__PURE__*/ () => {
  /// ...
}
```

- 开启 Tree Shaking 后 `import './index.less'` 将不会被打包…

解决方案
package.json

```json
{
  "sideEffects": [
    "**/*.less",
    "antd-mobile/es/global"
  ]
}
```

- 添加副作用 `sideEffects` 后，下面情况样式失效1
  2
  3
  4
  5
  import './index.less'
  
  export { default as CompontentA } from './CompontentA'
  export { CompontentB } from './Compontent'; // 图片压缩

# 多线程打包

## HappyPack (不推荐，不再维护)

[HappyPack 文档](https://github.com/amireh/happypack#readme)

```plaintext
npm install --save-dev happypack
```

webpack.config.js

```javascript
const HappyPack = require('happypack');

exports.module = {
  rules: [
    {
      test: /.js$/,
      // 1) replace your original list of loaders with "happypack/loader":
      // loaders: [ 'babel-loader?presets[]=es2015' ],
      use: 'happypack/loader',
      include: [ /* ... */ ],
      exclude: [ /* ... */ ]
    }
  ],
  plugins: [
    new HappyPack({
      // 3) re-add the loaders you replaced above in #1:
      loaders: [ 'babel-loader?presets[]=es2015' ]
    })
  ]
};
```

## thread-loader

[thread-loader 文档](https://github.com/webpack-contrib/thread-loader)

```plaintext
npm install --save-dev thread-loader
```

webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {}
          },
          {
            loader: 'thread-loader',
            options: {
              workers: 3
            }
          }
        ],
      },
    ],
  },
};
```

# 缓存已编译过的文件

## webpack4

[cacheDirectory 文档](https://webpack.docschina.org/loaders/babel-loader#options)

webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  }
}
```

## webpack5

[Cache 文档](https://webpack.docschina.org/configuration/cache/#root)

- 开发环境默认开启缓存，生产模式禁用，缓存默认是在内存里。可以对 cache 进行设置

文件缓存：

webpack.config.js

```javascript
module.exports = {
  cache: {
    type: 'filesystem',
    version: createEnvironmentHash(env.raw),
    cacheDirectory: paths.appWebpackCache,
    store: 'pack',
    buildDependencies: {
      defaultWebpack: ['webpack/lib/'],
      config: [__filename],
      tsconfig: [paths.appTsConfig, paths.appJsConfig].filter(f =>
        fs.existsSync(f)
      ),
    },
  },
}
```

缓存淘汰策略：文件缓存存储在 node_ modules/.cache/webpack，最大 500 MB, 缓存时常两个星期，旧的缓存先淘汰

# DllPlugin

> 该插件可以将特定的类库提前打包然后引入，这种方式可以极大的减少类库的打包次数，只有当类库有更新版本时才会重新打包，并且也实现了将公共代码抽离成单独文件的优化方案
