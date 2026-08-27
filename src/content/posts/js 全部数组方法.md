---
title: js 全部数组方法
date: 2022-12-25 19:51:50
updated: 2022-12-25 21:17:09
tags:
  - js
permalink: /2022/12/25/js%20%E5%85%A8%E9%83%A8%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95/
---
# 创建

## 方法一：new Array

```javascript
// 创建数组
new Array()

// 一个数值参数，创建一个初始长度为指定数值的空数组
new Array(20); 

// 如果传入一个非数值的参数或者参数个数大于 1，则表示创建一个包含指定元素的数组。
new Array('20');                  // ['20'] 
new Array("lily","lucy","Tom");   // ['lily', 'lucy', 'Tom']
```

## 方法二：Array.of

```javascript
// ES6 Array.of 创建一个包含所有传入参数的数组，而不管参数的数量与类型
Array.of()                        // []
Array.of(20)                      // [20]
Array.of('20')                    // ['20']
Array.of("lily","lucy","Tom")     // ['lily', 'lucy', 'Tom']
```

# 可迭代对象或者类数组对象转换成数组

可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）

只要是部署了 Iterator 接口的数据结构，Array.from()都能将其转为数组。

类数组的对象：length 属性

## 方法一：Array.from

```javascript
Array.from('hello') // ['h', 'e', 'l', 'l', 'o']
// NodeList 集合
const ps = document.querySelectorAll('p');
Array.from(ps)

// arguments 对象
function foo() {
  const args = Array.from(arguments);
}

Array.from({ length: 3 }); // [ undefined, undefined, undefined ]
```

Array.from的第二个参数，map

```javascript
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);
```

Array.from的第三个参数，绑定this

如果map()函数里面用到了this关键字，还可以传入Array.from()的第三个参数，用来绑定this。

## 方法二：…

```javascript
[...'hello'] // ['h', 'e', 'l', 'l', 'o']
// NodeList对象
[...document.querySelectorAll('div')]

// arguments对象
function foo() {
  const args = [...arguments];
}
```

# 筛选

```javascript
// 检查数组中符合条件的所有元素。 不修改原数组， 返回符所有符合条件的元素数组
filter()

// ES6 返回匹配的值，不修改原数组 ，返回通过测试的第一个元素的值或undefined
find(fn(item, index, arr), this)

// 检测当前值在数组中第一次出现的位置索引，不修改原数组，返回下标或-1
// c1: 必须。查找的元素
// c2: 可选。开始检索的位置，默认0
indexOf(c1, c2)

// 检测当前值在数组中最后一次出现的位置索引，不修改原数组，返回下标或-1
// c1: 必须。查找的元素
// c2: 可选。开始检索的位置，默认0
lastIndexOf(c1, c2)

// ES6 返回匹配位置的索引，不修改原数组 ，返回通过测试的第一个元素的下标或-1
findIndex(fn(item, index, arr), this)

// 判断数组中每一项都是否满足条件，不修改原数组，返回true false
every(fn(item, index, arr), this)

//判断数组中是否存在满足条件的项，不修改原数组，返回true false
some(fn(item, index, arr), this)

// 判断一个数组是否包含一个指定的值，不修改原数组，返回true false
includes(value)
```

# 其他

```plaintext
join()：用指定的分隔符将数组每一项拼接为字符串，不修改原数组，

-------------------------------
unshift()：向数组的开头添加一个或更多元素,修改原数组 并返回新的长度

push()：向数组的末尾添加新元素，修改原数组，返回push内容

pop()：删除数组的最后一项，修改原数组，返回删除内容

shift()：删除数组的第一项，修改原数组，返回删除内容

-------------------------------
slice(c1, c2)：选取数组的一部分，不修改原数组，并返回一个新数组。
    c1: 可选。起始下标，负数从数组的倒数第几个元素开始提取,
    c2: 可选。结束的下标，默认length - 1

splice(c1, c2, ...c3)：添加或删除,改变原数组,返回的被删除的元素的数组
    c1: 必需。规定从何处添加/删除元素
    c2: 可选。删除多少元素。必须是数字，可以是 "0"。 默认length - 1
    c3: 可选。要添加到数组的新元素

-------------------------------
fill(c1, c2, c3): ES6 固定值替换数组的元素, 修改原数组, 返回修改后的数组
    c1: 必需。要替换的值。 
    c2: 可选。开始替换位置。
    c3: 可选。停止填充位置 (默认为 array.length)
    
-------------------------------
sort()：对数组的元素进行排序

reverse()：对数组进行倒序

forEach()：ES5 及以下循环遍历数组每一项

map()：ES6 循环遍历数组每一项

copyWithin():用于从数组的指定位置拷贝元素到数组的另一个指定位置中

toLocaleString()、toString():将数组转换为字符串

flat()、flatMap()：扁平化数组

entries() 、keys() 、values():遍历数组

concat()：用于连接两个或多个数组
```

# 参考文档

[参考文档](https://www.runoob.com/jsref/jsref-obj-array.html)
