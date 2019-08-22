# 防抖&节流

## 1.1 防抖

### 1.1.1 概念

> 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

### 1.1.2 实现

```js
const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
```

### 1.1.3 适用场景

```text
1. 按钮提交：防止重复提交
2. 服务端验证场景：表单验证需要服务端配合，只执行一段连续的输入事件的最后一次，还有搜索联想词功能类似
```

## 1.2 节流

### 1.2.1 概念

> 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

### 1.2.2 实现

```js
const throttle = (fn, delay) => {
  let flag = true;
  return (...args) => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
};
```

### 1.2.3 适用场景

```text
1. 拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动
2. 缩放场景：监控浏览器resize
3. 动画场景：避免短时间内多次触发动画引起性能问题
```
