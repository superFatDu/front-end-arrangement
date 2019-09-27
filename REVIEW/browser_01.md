# 1 浏览器知识总结01

## 1.1 事件机制

### 1.1.1 事件触发三阶段

![js_event](./img/js_event-process.png)

- 红色代表捕获阶段：**window**往事件触发处传播，遇到注册的捕获事件会触发。
- 蓝色代表目标阶段：传播到事件触发处时触发注册的事件。
- 绿色代表冒泡阶段：从事件触发处往**window**传播，遇到注册的冒泡事件会触发

### 1.1.2 注册事件

> element.addEventListener(event, function, useCapture)

```js
/**
 * addEventListener
 * @param event {String} 指定事件名称
 * @param function {Funtion} 事件触发执行的函数
 * @param useCapture {Boolean} 事件在捕获阶段还是冒泡阶段，默认false(冒泡阶段)
*/
element.addEventListener(event, function, useCapture)
```

### 1.1.3 event.stopPropagation()和event.stopImmediatePropagation()和event.preventDefault()

- event.stopPropagation()用于阻止冒泡,但是不会阻止相同事件的其他侦听器被调用。
- event.stopImmediatePropagation用于阻止冒泡，并且阻止相同事件的其他侦听器被调用。
- event.preventDefault()用于阻止默认事件。

```js
// event.stopImmediatePropagation()
<!DOCTYPE html>
<html>
    <head>
        <style>
            p { height: 30px; width: 150px; background-color: #ccf; }
            div {height: 30px; width: 150px; background-color: #cfc; }
        </style>
    </head>
    <body>
        <div>
            <p>paragraph</p>
        </div>
        <script>
            const p = document.querySelector('p')
            p.addEventListener("click", (event) => {
              alert("我是p元素上被绑定的第一个监听函数");
            }, false);

            p.addEventListener("click", (event) => {
              alert("我是p元素上被绑定的第二个监听函数");
              event.stopImmediatePropagation();
              // 执行stopImmediatePropagation方法,阻止click事件冒泡,并且阻止p元素上绑定的其他click事件的事件监听函数的执行.
            }, false);

            p.addEventListener("click",(event) => {
              alert("我是p元素上被绑定的第三个监听函数");
              // 该监听函数排在上个函数后面，该函数不会被执行
            }, false);

            document.querySelector("div").addEventListener("click", (event) => {
              alert("我是div元素,我是p元素的上层元素");
              // p元素的click事件没有向上冒泡，该函数不会被执行
            }, false);
        </script>
    </body>
</html>
```

## 1.2 事件委托(事件代理)

![event_proxy](./img/event_proxy.webp)

### 1.2.1 原理

- 事件委托利用的是事件冒泡的原理，将事件注册在事件目标（事件源）的上层级。当事件目标（事件源）触发事件后会向上冒泡，然后执行注册的事件。

### 1.2.2 好处

1. 效率高，管理的函数变少了，不必为每一个元素都添加监听函数。
2. 可以方便地动态添加和修改元素，不需要因为元素的改动修改绑定的事件。
3. JavaScript和DOM节点之间的关联变少了，这样降低了因为循环而带来的内存泄漏的发生概率。

### 1.2.3 例子

```js
// html
<div id="parent">
  <div>
    <ul>
      <li>111</li>
      <li>222</li>
      <li>333</li>
      <li>444</li>
    </ul>
  </div>
</div>

// js
let eleParent = document.getElementById("parent");
eleParent.onmouseover = ev => {
  ev = ev || window.event;
  let eleTarget = ev.srcElement || ev.target;
  if (eleTarget.nodeName.toLowerCase() === "li") {
    eleTarget.style["color"] = "red";
  }
};
eleParent.onmouseout = ev => {
  ev = ev || window.event;
  let eleTarget = ev.srcElement || ev.target;
  if (eleTarget.nodeName.toLowerCase() === "li") {
    eleTarget.style["color"] = "#333333";
  }
}
```

## 1.3 跨域
