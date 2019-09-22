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