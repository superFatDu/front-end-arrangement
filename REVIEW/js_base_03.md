# JavaScript基础知识

## 1.1 原型继承和Class继承

> 首先需要明确的一点是，其实在JS中并不存在类，class只是语法糖，其本质还是函数。

```js
class Person{}
console.log(Person instanceof Function); // true
```

### 1.1.1 原型继承之寄生组合继承

```js
function Sup(name) {
  this.name = name;
}
Sup.prototype.sayHi = function() {
  console.log(`Hey,${this.name}`);
}
function Sub(name) {
  Sup.call(this, name);
}
// 方式1
Sub.prototype = Object.create(Sup.prototype);
Sub.prototype.constructor = Sub;
// 方式2
Sub.prototype = Object.create(Sup.prototype, {
  constructor: {
    value: Sub,
    enumerable: false,
    writable: true,
    configurable: true
  }
})
let sub = new Sub("Robin");
sub.sayHi(); // Hey,Robin
```

### 1.1.2 Class继承

> Class实现继承的核心在于使用extends表明当前类继承自那个父类，并且在子类的构造函数中调用super()函数，其实就是Parent.call(this.value)的变异。

```js
class Sup {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(`Hey,${this.name}`);
  }
}
class Sub extends Sup {
  constructor(name) {
    super(name);
    this.name = name;
  }
}
let sub = new Sub("cHeNg5");
sub.sayHi(); // Hey,cHeNg5
```

## 1.2 模块化

> 模块化是指解决一个复杂问题时自顶向下逐层把系统划分成若干模块的过程，有多种属性，分别反映其内部特性。百度百科中，模块化的定义是：模块化是一种处理复杂系统分解为更好的可管理模块的方式。

### 1.2.1 提出问题

- 不同的js文件，彼此依赖，变量问题，书写顺序问题，命名冲突问题……

```js
<script type="text/javascript" src="a.js"></script>
<script type="text/javascript" src="b.js"></script>
<script type="text/javascript" src="c.js"></script>
<script type="text/javascript" src="d.js"></script>
<script type="text/javascript" src="e.js"></script>
```

### 1.2.2 模块化的意义

1. 实现js文件的异步加载，避免网页失去响应。
2. 管理模块之间的依赖性，便于代码的管理和维护。
3. 封闭作用域，避免污染全局变量，以及避免命名冲突。

### 1.2.3 模块化的实现

1. IIFE(立即调用函数表达式)
2. CommonJS
3. AMD
4. CMD
5. ES Module

#### 1.2.3.1 IIFE

> 在早期，使用立即执行函数实现模块化是最常见的手段，通过函数作用域避免命名冲突，污染全局作用域等问题。比如jQuery。

```js
(function(glabalVariable) {
  // TODO
})(glabalVariable)

let module = (function() {
  function fn1() {}
  function fn2() {}
  return {
    fn1,
    fn2
  };
})()
module.fn1();
module.fn2();
```

#### 1.2.3.2 CommonJS

> CommonJS最早是在Node使用，现在依然被广泛使用，比如Webpack。但是目前在Node中的模块化管理已经和CommonJS有一些区别了。CommonJS规范规定，每个模块内部，module变量代表当前模块，这个变量是一个对象，他的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性，require方法用于加载模块。

- module的实现

```js
let module = {
  id: "xxxxx",
  exports: {}
}
let exports = module.exports; // 这就是module.exports和exports用法相似的原因

// 注意不能对exports单独赋值，因为exports和module.exports拥有相同的内存地址
```

- 例子

```js
// a.js
module.exports = {
  a: 1
}
// or
exports.a = 1;

// b.js
let rModule = require("./a.js");
rModule.a; // 1
```

- module.exports(exports)和require成对使用，一个导出，一个引入。

#### 1.2.3.3 AMD&CMD

> 这两者现在已经很少见了。

1. AMD(Asynchronous Module Definition, 异步模块定义)。

```js
define(id?, dependencies?, factory)

// myModule.js
define(['dependencies'], function() { // AMD推崇依赖前置，所以define中引入所以依赖['depencencies']
  let name = "Robin";
  function printName() {
    console.log(name);
  }
  return {
    printName: printName
  }
})

// require.js

require(['myModule'], function(my) {
  my.printName();
})
```

2. CMD(Common Module Definition, 通用模块定义)。

```js
define(id?, deps?, factory)

// myModule.js
define(function(require, exports, module) {
  // CMD推崇就近依赖
  let $ = require("./b")
  // 方式1
  exports.foo = $.baz();
  exports.doSomething = function() {};

  // 方式2
  module.exports = {
    foo: $.baz(),
    doSomething: function() {}
  };

  // 方式3
  return {
    foo: $.baz(),
    doSomething: function() {}
  }
})

// require.js
seajs.use(['myModule.js'], function(my) {
  my.foo;
  my.doSomething();
})
```

3. AMD&CMD总结

- AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块。
- CMD推崇就近依赖，只有在用到某个模块的时候再去require。

```
1. AMD在加载完成定义（define）好的模块就会立即执行，所有执行完成后，遇到require才会执行主逻辑。（提前加载）
2. 通俗来说：
AMD在加载完成定义（define）好的模块就会立即执行，所有执行完成后，遇到require才会执行主逻辑。（提前加载）
CMD在加载完成定义（define）好的模块，仅仅是下载不执行，在遇到require才会执行对应的模块。（按需加载）
3. AMD用户体验好，因为没有延迟，CMD性能好，因为只有用户需要的时候才执行。
```

#### 1.2.3.4 ES Module

```js
// export.js
let m = 1;
export default m;
export { m };

// import.js
import m from "export.js";
console.log(m);
import { m as mm } from "export.js";
console.log(mm);
```

### 1.2.4 webpack与ES Module

```js
// a.js
export default function() {
  console.log("Module A");
}

// index.js
import A from "./a.js";
A();

// index.html
<html>
  <head></head>
  <body>
    <script type="text/javascript" src="./index.js"></script>
  </body>
</html>

// 运行时
Uncaught SyntaxError: Unexpected token import
```

> 原因是：目前我们的前端开发，浏览器还不支持模块化，想要实现模块化功能，需要借助webpack等构建化工具。

```js
// webpack配置
let path = require("path");
module.export = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js"
  }
}

// index.html
<html>
  <head></head>
  <body>
    <script type="text/javascript" src="./main.js"></script>
  </body>
</html>

// 运行时
Module A
```

[模块化梯子](https://blog.csdn.net/iiichigo/article/details/82937768)