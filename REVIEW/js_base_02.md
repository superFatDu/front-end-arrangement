# JavaScript基础知识

## 2.1 ==与===

> ==比对的是值，===比对的是值和类型。==在比对之前如果类型不同会进行类型转换。

### 2.1.1 ==的判断流程

```js
1. 首先判断两者的类型是否相同，相同进行===比较。
// 类型不同时，会进行类型转换
2. 如果一个为null，一个为undefined，返回true。
3. 如果一个为字符串，一个数值，那么在比较之前调用Number()函数将字符串转换成数值。
4. 如果任一值值布尔值，则在比较之前调用Number()函数先转换成数值。
5. 如果一个是对象，另一个是数值或者字符串，先将其转换成基础类型的值在比较。
```

![equal](./img/equal.jpg)

### 2.1.2 练习

```js
// [] == []
1. 两者类型相同，则进行===比较。
2. []的地址与[]的地址不同，故返回false。

// [] == ![]
1. ![] -> false
2. 触发条件4，Number(false) -> 0。
3. 触发条件5，[].toString() -> ""。
4. 触发条件3，Number("") -> 0。
5. 0 == 0，返回true。
```

### 2.1.3 ===

> 严格比较，值和类型都必须相同。

## 2.2 深浅拷贝

### 2.2.1 浅拷贝

> 浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。

```js
let obj = {
  a: 2
};
let objCopy = obj;
objCopy.a = 3;
console.log(obj.a); // 3

// 对象与复制的对象共享一块内存，无论谁改变，都会影响值。
```

![浅拷贝](./img/qCopy.jpg)

### 2.2.2 深拷贝

> 深拷贝是拷贝一个一模一样的对象，并新开辟内存空间存储，不共享内存，独立存在。

```js
let obj = {
  a: 2
};
let objCopy = JSON.parse(JSON.stringify(obj));
objCopy.a = 3;
console.log(obj.a); // 2

// objCopy始新开辟的内存空间，他的指针不指向obj的指针地址。
```
![深复制](./img/deepClone.jpg)

### 2.2.3 实现

#### 2.2.3.1 浅拷贝实现

```js
function shallowCopy(obj) {
  let shallowObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) shallowObj[key] = obj[key];
  }
  return shallowObj;
}
```

#### 2.2.3.2 深拷贝实现

```js
// 如果没有特殊的数据解构
JSON.parse(JSON.stringify(obj));

// 缺点：
// 1. 会忽略undefined
// 2. 会忽略symbol
// 3. 不能序列化函数
// 4. 不能解决循环引用的对象

let a = {
  age: undefined,
  sex: Symbol("male"),
  jobs: function() {},
  name: "cHeNg5"
}
let b = JSON.parse(JSON.stringify(a))
console.log(b) // {name: "cHeNg5"} => 引发上述问题
```

```js
// 自己实现气来还是很困难的，有很多的边界需要处理,推荐：
Lodash.js

let deepObj = [{"a": 1}, {"b": 2}];
let deepCopy = _.cloneDeep(deepObj);
console.log(deepObj[0] === deepCopy[0]); // false => 深拷贝
```

## 2.3 原型

### 2.3.1 普通对象和函数对象

> 通过new Function()创建的对象都是函数对象，其他的额就是普通对象。

```js
let f1 = new Function();
let f2 = function() {};
function f3() {};

let o1 = {};
let o2 = new Object();
let o3 = new f3();

console.log(typeof f1/f2/f3); // function
console.log(typeof o1/o2/o3); // object
```

### 2.3.2 原型

![proto](./img/proto.png)

```js
function Person() {}

let person = new Person();
```

- 虽然不推荐直接使用，每个对象都有__proto__属性，他指向原型对象。

- person.\__proto__ —> Person.prototype

> 原型其实也是一个对象，它包含了很多的函数。所以我们可以通过__proto__找到一个原型对象。

**原型链通过__proto__链接**

- 一个原型对象的constructor属性指向构造函数。Person.prototype.constructor = Person。

![prototyp](./img/prototype.png)

### 2.3.3 总结

1. Object 是所有对象的爸爸，所有对象都可以通过 \__proto__ 找到它
2. Function 是所有函数的爸爸，所有函数都可以通过 \__proto__ 找到它
3. 函数的 prototype 是一个对象
4. 对象的 \__proto__ 属性指向原型， \__proto__ 将对象和原型连接起来组成了原型链

## 2.4 Proxy

[Proxy梯子](https://github.com/superFatDu/front-end-arrangement/blob/master/zfpx/ES6/Proxy.js)

### 2.4.1 Reflect
