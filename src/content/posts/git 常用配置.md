---
title: git 常用配置
date: 2023-01-09 17:04:50
updated: 2023-06-30 10:59:15
tags:
  - git
permalink: /2023/01/09/git%20%E5%B8%B8%E7%94%A8%E9%85%8D%E7%BD%AE/
---
查看配置

- local仓库级别
- global用户级别: 当前用户在所有仓库都用这个配置
- system系统级别: 整台计算机都用这个配置

优先级： `git config --local` > `git config --global` > `git config --system`

```plaintext
git config --list
git config --global
git config --system
```

# 配置账号邮箱

查看

```plaintext
// 查看当前项目
git config user.name
git config user.email
```

修改

```plaintext
git config user.name "your name"
git config user.email "your email"
```

# 忽略文件夹名称大小写

- 默认忽略文件夹大小写

查看当前配置配置

```plaintext
git config --get core.ignorecase
```

修改

```plaintext
// 不忽略
git config core.ignorecase false
// 忽略
git config core.ignorecase true
```

ssh

```plaintext
ssh-keygen -t rsa -C "邮箱"
```
