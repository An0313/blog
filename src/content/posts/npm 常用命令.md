---
title: npm 常用命令
date: 2023-01-16 15:29:50
updated: 2023-02-06 10:13:16
tags:
  - 工程化
permalink: /2023/01/16/npm%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4/
---
##### 查看 npm 版本

```plaintext
npm -v
```

##### 初始化

```plaintext
npm init

// 快速跳到问答界面
npm init -yes
// 简写
npm init -y
```

##### 安装

项目中的 package.json 文件自动给下载项目中所需的全部依赖

```plaintext
npm install

// 简写
npm i

// 安装开发环境，不用于生产环境，在 package.json 文件中的 dependenceies 属性中
// 安装推荐的版本
npm install --sava-dev <包名>
// 简写
npm i -D <包名>

// 安装的包生产环境的，在 package.json 文件中的 dependenceies 属性中
// 安装推荐的版本
npm install --sava <包名>
// 简写
npm i -S <包名>
npm i <包名>

// 安装包指定的版本
npm i <包名>@<版本号>

// 装到配置的全局
npm i [-g|--global] <包名>
```

##### 查看

```plaintext
// 查看当前目录
npm list
npm ls

// 查看全局
npm list -g

// 查看本地安装包的版本信息
npm ls <包名>

// 查看全局安装包的版本信息
npm ls <包名> -g

// 查看远程所有版本信息
npm info <包名>

// 查看历史版本
// 最多100条
npm view <包名> versions 
// 所有版本信息
npm view <包名> versions --json

// 查看最新版本信息
npm view <包名> version  

// 查看当前本地安装地址
npm root
 
// 查看全局的包的安装路径
npm root -g

// 查看配置信息
npm config list

// 查看npm镜像设置
npm config get registry
```

##### 更新与卸载

```plaintext
npm update <包名>

npm update -g <包名>

npm uninstall <包名>

// 清除项目中没有被使用的依赖
npm prune
```

##### 运行命令

```plaintext
npm run <命令>
```

##### 更改下载源

```plaintext
npm install -g cnpm --registry=https://registry.npmmirror.com

npm config set registry https://registry.npm.taobao.org

// 切换回默认全局镜像
npm config set registry https://registry.npmjs.org
```

##### 缓存

```plaintext
npm cache clean --force
```

##### 帮助

```plaintext
npm --help

npm <命令> --help
```

##### 账号

```plaintext
// 添加账号
// 在指定注册表中创建或验证名为<username>的用户，并将凭据保存在到 .npmrc 文件中。如果未指定注册表，则使用默认注册表。
npm adduser [--registry=url] [--scope=@orgname] [--always-auth] [--auth-type=legacy]
npm login
```

##### 发布

```plaintext
npm publish
```

##### 撤销发布

```plaintext
npm unpublish <命令>

// 强制撤销
npm unpublish test --force

// 撤销发布自己发布过的某个版本代码
npm unpublish test@1.0.2
```

##### 其他

```plaintext
// 检查依赖是否已经弃用
npm outdated

// 打开默认浏览器跳转到github中包的主页
npm home <包名>

// 打开默认浏览器跳转到github中包的页面
npm repo <包名>

// 打开默认浏览器跳转到github中包的README.MD文件
npm docs <包名>
```
