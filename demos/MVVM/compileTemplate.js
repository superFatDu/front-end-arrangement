// 此在observe.js的基础上书写,增加编译模块。

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
  for(let key in data) {
    let val = data[key];
    observe(val);
    Object.defineProperty(data, key, {
      enumerable: true, // 可以枚举
      get() {
        return val;
      },
      set(newVal) {
        if (newVal === val) {
          // 值没有改变，不做操作
          return;
        }
        val = newVal; // 重新赋值
        observe(newVal);
      }
    })
  }
}
