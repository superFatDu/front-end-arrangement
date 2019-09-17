# JavaScript知识总结

## 1.1 Event Loop

### 1.1.1 进程和线程

> 这两个名词都是CPU工作时间片的一个描述。进程描述了CPU在运行指令及加载和保存上下文所需的时间，放在应用上来说就是一个程序。线程是进程中更小单位，描述了执行一段指令所需的时间。

- 比如打开一个浏览器的Tab页，这就是一个进程，一个进程可以包含多个线程，比如渲染线程，JS引擎线程，HTTP请求线程等等。（注：JS引擎线程运行时可能会阻塞UI渲染，所以JS引擎线程和渲染线程时互斥的。）

### 1.1.2 执行栈（execution stack）

> 可以把执行栈理解为一个存储函数调用的栈结构，遵循FILO(先进后出)。

```js
function foo(b) {
  var a = 5;
  return a * b + 10;
}
function bar(x) {
  var y = 3;
  return foo(x * y);
}
console.log(bar(6));
```

![execution_stack](./img/execution_stack.gif)

### 1.1.3 event loop

1. 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数。
2. 当指定的事情完成时，Event Table会将这个函数移入Event Queue。
3. 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。
4. 上述过程会不断重复，也就是常说的Event Loop(事件循环)。

**NOTE: 在 ES6 规范中，microtask 称为 jobs，macrotask 称为 task。**

![event_loop](./img/event_loop1.webp)

![event_loop](./img/event_loop.jpg)

### 1.1.4 Task Queue

> 见上一篇js_base_04.js。

```js
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')

// script start => async2 end => Promise => script end => promise1 => promise2 => async1 end => setTimeout
```

1. 首先先来解释下上述代码的 async 和 await 的执行顺序。当我们调用 async1 函数时，会马上输出 async2 end，并且函数返回一个 Promise，接下来在遇到 await的时候会就让出线程开始执行 async1 外的代码，所以我们完全可以把 await 看成是让出线程的标志。
2. 然后当同步代码全部执行完毕以后，就会去执行所有的异步代码，那么又会回到 await 的位置执行返回的 Promise 的 resolve 函数，这又会把 resolve 丢到微任务队列中，接下来去执行 then 中的回调，当两个 then 中的回调全部执行完毕以后，又会回到 await 的位置处理返回值，这时候你可以看成是 Promise.resolve(返回值).then()，然后 await 后的代码全部被包裹进了 then 的回调中，所以 console.log('async1 end') 会优先执行于 setTimeout。
3. **重点：await让出线程/Promise.then时微任务队列优先于setTimeout宏任务队列。**

**NOTE: 新的浏览器中的输出会不同，await快于微任务队列。**

![task-queue](./img/task_queue.png)

### 1.1.4.1 总结

- 首先执行同步代码，这属于宏任务
- 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
- 执行所有微任务
- 当执行完所有微任务后，如有必要会渲染页面
- 然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数

1. 微任务：process.nextTick ，promise ，MutationObserver。
2. 宏任务：script ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering。
3. **这里很多人会有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了 script ，浏览器会先执行一个宏任务，接下来有异步代码的话才会先执行微任务。**

## 1.2 Node Event Loop
