---
title: Vue 插件开发
date: 2018-12-19 17:57:50
tag:
- Vue2
---


##### 官方文档
[传送门](https://cn.vuejs.org/v2/guide/plugins.html)
```
// Vue.js 的插件应该有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：


MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

##### alert插件开发

1. 先写个alert组件
```
<template>
    <div class="ComAlert">
        <div class="content" v-for="(item, index) in content" :key="index">{{item}}</div>
    </div>
</template>

<script>
    export default {
        name: 'ComAlert',
        data () {
            return {
                content: [],
                timer: []
            }
        },
        created () {
        },
        methods: {
            push (text) {
                const s = 2000
                this.content.unshift(text)
                const timer = setTimeout(() => {
                    this.content.pop()
                }, s)

                this.timer.push(timer)

            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./Alert.less";
</style>
```

2. 再写个 alert.js

```
import ComAlert from './Alert.vue'

const alert = {
    install (Vue, option) {
        const Alert = Vue.extend(ComAlert)
        let $vm = new Alert({
            el: document.createElement('div')
        });
        document.body.appendChild($vm.$el);

        Vue.prototype.$_alert = (alertText = '') => {
            return $vm.push(alertText)
        }
    }
}

export default alert
```

3. mian.js 
```
import Alert from './components/Alert/Alert'

Vue.use(Alert)
```

4. 调用
```javascript 1.8
this.$_alert('提示内容')
```
