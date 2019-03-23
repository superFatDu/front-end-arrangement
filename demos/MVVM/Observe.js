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
let vue = new Vue({
  data: {
    a: 1
  }
});

console.log(vue.$options.data);
vue.$data.a = {a: 2};
console.log(vue.$data.a);
console.log(vue.a.a);