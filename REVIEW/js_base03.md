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