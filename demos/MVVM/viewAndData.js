// 此在compileTemplate.js的基础上书写,增加数据响应模块。
// 要数据改变，只能实在compile()中的node.textContent = text.replace(reg, val)做文章。

// vm.$options
function Vue(options = {}) {
  this.$options = options;
  // this.$data
  let data = this.$data = this.$options.data;
  // 下面是观察data里面数据的observe方法
  observe(data);
  // 将data代理到this
  for (let key in data) {
    Object.defineProperty(this, key, {
      enumerable: true,
      get() {
        return this.$data[key];
      },
      set(newVal) {
        this.$data[key] = newVal;
      }
    })
  }
  // 编译模板
  compile(this.$options.el, this);
}
function compile(el, vm) {
  // el表示编译控制的范围
  vm.$el = document.querySelector(el);
  let fragment = document.createDocumentFragment();
  let child;
  while (child = vm.$el.firstChild) {
    fragment.appendChild(child); // 将el中的内容移入到内存中
    // fragment => #text/p/#text/p/#text
  }
  replace(fragment);
  function replace(fragment) {
    Array.from(fragment.childNodes).forEach(node => {
      let text = node.textContent;
      let reg = /^\{\{(.*)\}\}$/;
      if (node.nodeType === 3 && reg.test(text)) {
        let arr = RegExp.$1.split(".");
        let val = vm;
        arr.forEach(key => {
          val = val[key];
        });
        //node.textContent = val;
        // 这里是数据响应的逻辑
        new Watcher(vm, RegExp.$1, function (newVal) {
          node.textContent = text.replace(reg, newVal);
        });
        node.textContent = text.replace(reg, val);
      }
      if (node.childNodes) {
        replace(node);
      }
    })
  }
  vm.$el.appendChild(fragment);
}
// 观察对象给对象添加Object.defineProperty
function observe(data) {
  if (typeof data !== "object") return ;
  return new Observe(data);
}
// 主要的逻辑
function Observe(data) {
  let dep = new Dep();
  for(let key in data) {
    let val = data[key];
    observe(val);
    Object.defineProperty(data, key, {
      enumerable: true, // 可以枚举
      get() {
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set(newVal) {
        debugger
        if (newVal === val) {
          // 值没有改变，不做操作
          return;
        }
        val = newVal; // 重新赋值
        observe(newVal);
        dep.notify();
      }
    })
  }
}
// 发布订阅视图与响应数据改变
function Dep() {
  this.subs = [];
}
Dep.prototype.addSub = function (sub) { // 添加到订阅
  this.subs.push(sub);
};
Dep.prototype.notify = function () { // 发布订阅
  this.subs.forEach(sub => {
    sub.implement();
  })
};
function Watcher(vm, exp, fn) { // Watcher是一个构造函数 通过其创建的实例都有update方法
  this.fn = fn;
  this.vm = vm;
  this.exp = exp;
  debugger
  Dep.target = this;
  let val = vm;
  let arr = exp.split(".");
  arr.forEach(function (k) {
    val = val[k];
  });
  Dep.target = null;
}
Watcher.prototype.implement = function () { // Watcher上的update方法指向传入的函数本身，执行update()相当于执行fn()
  let val = this.vm;
  let arr = this.exp.split(".");
  arr.forEach(function (k) {
    val = val[k];
  });
  this.fn(val);
};