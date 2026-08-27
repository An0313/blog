---
title: git 代理
date: 2023-07-10 11:04:50
updated: 2023-07-10 11:12:27
tags:
  - git
permalink: /2023/07/10/git%20%E4%BB%A3%E7%90%86/
---
# 配置

1. 打开翻墙软件，查看 http 代理服务器。例如 Shadowsocks.app为：127.0.0.1:1087
2. 设置 git 全局代理：`git config --global http.proxy SOCKS://127.0.0.1:1087`

# 还原

```plaintext
# 方式一
git config --global --unset http.proxy

# 方式二
git config --global --unset http.https://github.com.proxy
```
