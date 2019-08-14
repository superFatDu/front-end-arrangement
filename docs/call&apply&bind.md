# call&apply&bind

> 用于改变函数对象的this指向。

## 1.1 call

> Object.call(Object[, arg1[, arg2...]])

```js
Math.max(1, 2, 3, 4, 5);

Math.max.call(Math, 1, 2, 3, 4, 5);
```

## 1.2 apply

> Object.apply(Object, Array)

```js
Math.max(1, 2, 3, 4, 5);

let arr = [1, 2, 3, 4, 5];
Math.max.apply(Math, arr);

// call版

Math.max.call(Math, ...arr);
```

## 1.3 call与apply

```text
call与apply实质上一样的，只是传递的参数不同，call时单个的字符，apply是一个数组。
```

## 1.4 bind

> Object.call(Object[, arg1[, arg2...]])，return的是一个函数，所以不能立即执行。

```js
let a = {
  value: 1
};
function getValue() {
  console.log(this.value);
}
const getBind = getValue.bind(a);
getBind(); // 返回的是一个函数，需要再执行一次
```

## 1.5 简易实现

### 1.5.1 call

```js
/**
 * call方法思想：改变this指向，让新的对象可以执行这个方法
 * 实现思路：
 * 1、给新的对象添加一个函数（方法），并让this（也就是当前绑定的函数）指向这个函数
 * 2、执行这个函数
 * 3、执行完以后删除这个方法
 * 4、可以将执行结果返回
 */
Function.prototype.myCall = function(funcCtx) {
  // funcCtx是当前要调用函数的对象
  // this指被调用的函数
  if(typeof this != 'function') {
      throw new TypeError('Erorr')
  }
  let ctx = funcCtx || global
  let args = [...arguments].slice(1)
  // 为当前对象添加一个函数fn, 值为要已经定义的要调用的函数
  ctx.fn = this
  // 执行添加的函数fn
  var result = ctx.fn(...args)
  // 执行完以后删除
  delete ctx.fn
  return result
}
```

### 1.5.2 apply

```js
/* 思路同call */
Function.prototype.myApply = function(funcCtx) {
    if(typeof this != 'function') {
        throw new TypeError('Erorr')
    }
    let ctx = funcCtx || global

    ctx.fn = this
    let result
    if(arguments[1]) {
        result = ctx.fn(...arguments[1])
    } else {
        result = ctx.fn()
    }
    delete ctx.fn
    return result
}
```

### 1.5.3 bind

```js
/**
 * 实现思想：
 * 1、返回一个函数，其他与call, apply类似
 * 2、如果返回的函数作为构造函数，bind时指定的 this 值会失效，但传入的参数依然生效。
 */
Function.prototype.myBind = function(funcCtx) {
  let ctx = funcCtx || global
  console.log(this)
  let _this = this
  let args = [...arguments].slice(1)
  // 作为构造函数使用
  let Fbind = function() {
      let self = this instanceof Fbind ? this : ctx
      return _this.apply(self,args.concat(...arguments))
  }
  let f = function() {}
  f.prototype = this.prototype
  Fbind.prototype = new f()
  return Fbind
}
```