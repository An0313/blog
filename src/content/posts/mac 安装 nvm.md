---
title: mac 安装 nvm
date: 2023-01-17 14:17:50
updated: 2023-01-17 14:23:27
tags:
  - 运维
  - node
permalink: /2023/01/17/mac%20%E5%AE%89%E8%A3%85%20nvm/
---
> 卸载node

```plaintext
brew install nvm 
```

```plaintext
echo "source $(brew --prefix nvm)/nvm.sh" >> .bash_profile
```

修改 .bash_profile 文件

```plaintext
vim .bash_profile
```

```plaintext
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# 解决关闭终端后nvm、node、npm命令失效
source ~/.bash_profile 
```
