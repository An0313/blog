---
title: "处理 windows 系统 yarn 提示 无法加载文件 D:\\nodejs\\yarn.ps1,因为在此系统上禁止运行脚本"
date: 2023-06-06 23:27:50
updated: 2023-06-30 11:00:22
tags:
  - 运维
permalink: /2023/06/06/yarn%E5%9B%A0%E4%B8%BA%E5%9C%A8%E6%AD%A4%E7%B3%BB%E7%BB%9F%E4%B8%8A%E7%A6%81%E6%AD%A2%E8%BF%90%E8%A1%8C%E8%84%9A%E6%9C%AC/
---
### 错误提示

```plaintext
yarn : 无法加载文件 D:\nodejs\yarn.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_ 
Execution_Policies。
所在位置 行:1 字符: 1
```

### 解决问题

```plaintext
get-ExecutionPolicy

// CurrentUser
```

```plaintext
set-ExecutionPolicy -Scope CurrentUser
位于命令管道位置 1 的 cmdlet Set-ExecutionPolicy
请为以下参数提供值:
ExecutionPolicy: // 这里输入 “RemoteSigned”
```

```plaintext
get-ExecutionPolicy
```

#### 解决完成，安装依赖

```plaintext
yarn
```
