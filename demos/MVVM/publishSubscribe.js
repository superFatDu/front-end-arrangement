// 发布订阅模式
// 订阅池: 把所有要订阅的事件放到一个数组中
// 发布: 遍历订阅池的事件并执行
// 订阅的事件中都有一个implement方法

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
function Watcher(fn) { // Watcher是一个构造函数 通过其创建的实例都有update方法
  this.fn = fn;
}
Watcher.prototype.implement = function () { // Watcher上的update方法指向传入的函数本身，执行update()相当于执行fn()
  this.fn();
};
let watcher = new Watcher(function () {
  console.log("This is a test.")
});
let dep = new Dep();
console.log(watcher); // Watcher {fn: Function}
dep.addSub(watcher); // 将原型上有update的watcher放入到订阅池中
dep.notify(); // 发布订阅，执行watcher的update方法。
