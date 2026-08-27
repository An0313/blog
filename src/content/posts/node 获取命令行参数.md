---
title: node 获取命令行参数
date: 2023-07-11 17:57:50
updated: 2023-07-11 11:00:20
tags:
  - node
permalink: /2023/07/11/node%20%E8%8E%B7%E5%8F%96%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%8F%82%E6%95%B0/
---
```plaintext
node index.js --name=abc
```

```js
const getArguments = () => {
  const {length} = process.argv
  const args = {}
  for (let i = 2; i < length; i++) {
    const [key, val] = process.argv[i].split('=')

    if (key && val) args[key] = val
  }

  return args
}

const ags = getArguments() // ags = {'---name': 'abc}
```
