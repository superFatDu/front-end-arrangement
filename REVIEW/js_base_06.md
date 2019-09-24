# JavaScript知识总结

## 1 call&apply&bind

### 1.1 call&apply

> call和apply都是为了解决改变this的指向，作用都是相同的，只是传参不同。除了第一个参数外，call接受一个参数列表，apply接受一个参数数组。

```js
let a = {
  value: 1
};
function getValue(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}
getValue.call(a, "cHeNg5", 26);
getValue.apply(a, ["cHeNg5", 26]);
```

#### 1.1.1 call实现

```js
Function.prototype.myCall = function(context) {
  context = context || window;
  context.fn = this; // 这里的this指的是调用者，比如如下的getValue(name, age)

  let args = [...arguments].slice(1);
  let result = context.fn([...args]); // 返回调用者函数，比如如下的getValue([...args])

  delete context.fn;
  return result;
}
```

#### 1.1.2 apply实现 

```js
Function.prototype.myApply = function(context) {
  context = context || window;
  context.fn = this;

  let result;

  // 判断是否存在第二个参数，如果存在，就将第二个参数展开
  if(arguments[1]) {
    result =  context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }

  delete context.fn;
  return result;
}
```

### 1.2 bind

> bind 和其他两个方法作用也是一致的，只是该方法会返回一个函数。

- call/apply返回的是一个值，bind返回的是一个函数。

#### 1.2.1 bind实现

```js
Function.prototype.myBind = function(context) {
  if (typeof this !== "function") {
    throw new TypeError("TypeEroor");
  }
  let _this = this;
  let args = [...arguments].slice(1);
  return function F() {
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat([...arguments]));
  }
}
```

## 2. new

### 2.1 调用new

1. 生成了一个新的对象。
2. 链接到原型。
3. 绑定this。
4. 返回新的对象。

### 2.2 new实现

```js
function create() {
  let obj = {};
  let con = [].shift.call(arguments);
  obj.__proto__ = con.prototype;
  let result = con.apply.call(obj, arguments);
  return result instanceof Object ? result : obj;
}
// 1. 创建一个空对象
// 2. 获取构造函数
// 3. 这是空对象的原型
// 4. 绑定this并执行构造函数
// 5. 确保返回值为对象
```

### 2.3 通过new的方式创建对象和通过字面量创建有什么区别

1. 字面量创建对象，不会调用Object构造函数，简洁可读性能好。
2. new Object()方式创建对象本质上是方法调用，涉及到在proto链中遍历寻找该方法，之后又会产生调用该方法的堆栈调用信息，方法调用结束，又要释放堆栈，浪费性能。
3. 能通过字面量定义的对象，不推荐调用Object构造方法定义。

### 2.4 其他

```js
// function就是语法糖
function foo() {}
foo = new Function();

let obj = {name: "Robin"}
obj = new Object()
```