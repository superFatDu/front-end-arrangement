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

[tizi](https://blog.csdn.net/iiichigo/article/details/82937768)