---
title: js 注释规范
date: 2023-01-28 13:04:50
updated: 2023-01-28 13:38:32
tags:
  - js
permalink: /2023/01/28/js%E6%B3%A8%E9%87%8A/
---
## @param

标记提供函数参数的名称、类型和描述

### 别名

- @arg
- @argument

### 语法

@param []  []

### 示例

```javascript
/**
 * @param {string} somebody Somebody's name.
 */
function sayHello(somebody) {
  alert('Hello ' + somebody);
}
```

## @description

标记允许提供正在记录一般说明

### 别名

- @desc

### 语法

@description

### 示例

如果在注释开始的地方添加描述

```javascript
/**
 * Add two numbers.
 */
function add(a, b) {
  return a + b;
}
```

通过使用 @description 标签添加的描述可放在任意地方

```javascript
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @description Add two numbers.
 */
function add(a, b) {
  return a + b;
}
```

## @returns

标记记录函数返回的值

### 别名

- @return

### 语法

@return [{type}] [description]

### 示例

返回值的类型:

```javascript
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
  return a + b;
}
```

返回值的类型和描述:

```javascript
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number} Sum of a and b
 */
function sum(a, b) {
  return a + b;
}
```

返回多类型的值:

```javascript
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @param {boolean} retArr If set to true, the function will return an array
 * @returns {(number|Array)} Sum of a and b or an array that contains a, b and the sum of a and b.
 */
function sum(a, b, retArr) {
  if (retArr) {
    return [a, b, a + b];
  }
  return a + b;
}
```

返回 Promise:

```javascript
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {Promise} Promise object represents the sum of a and b
 */
function sumAsync(a, b) {
  return new Promise(function(resolve, reject) {
    resolve(a + b);
  });
}
```

## @class

将函数标记为构造函数

### 别名

- @constructor

### 语法

@class [ ]

### 示例

```javascript
/**
 * Creates a new Person.
 * @class
 */
function Person() {}

var p = new Person();
```

## @deprecated

标签指明一个标识在代码中已经被弃用。

### 语法

@deprecated []

### 示例

可以单独使用的 @deprecated 标签，或包括一些文本，来详细说明为什么要弃用。

```javascript
/**
 * @deprecated since version 2.0
 */
function old() {}
```

## @link

内联标记创建指向指定的 namepath 或 URL 的链接

### 别名

- @linkcode
- @linkplain

### 语法

{@link namepathOrURL}

[link text]{@link namepathOrURL}

{@link namepathOrURL|link text}

{@link namepathOrURL link text (after the first space)}

### 示例

```javascript
/**
 * See {@link MyClass} and [MyClass's foo property]{@link MyClass#foo}.
 * Also, check out {@link http://www.google.com|Google} and
 * {@link https://github.com GitHub}.
 */
function myFunction() {}
```

## 文档

[JSDoc 文档](https://www.jsdoc.com.cn/)
