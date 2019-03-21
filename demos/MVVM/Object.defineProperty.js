// vue 数据劫持 + 发布订阅者模式
// Object.defineProperty 不兼容IE8-

let obj = {};
Object.defineProperty(obj, "data", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "This is a test"
});
console.log(obj.data);

// 可以配置getter和setter，但是不能要writable/value 属性。

Object.defineProperty(obj, "data1", {
  configurable: true,
  enumerable: true,
  get() { // 获取obj.data1时，调用get()方法
    return "This is a test,too"
  },
  set(value) { // 赋值obj.xx = "xxx"时调用set()方法
    console.log(value);
  }
});
console.log(obj.data1); // 调用get()方法
obj.data1 = "superFatDu"; // 调用set()方法