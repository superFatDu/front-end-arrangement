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

## 1.2 事件代理

