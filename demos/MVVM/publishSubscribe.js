// 发布订阅-观察者模式
// 订阅池: 把所有要订阅的事件放到一个数组中
// 发布: 遍历订阅池的事件并执行
// 订阅的事件中都有一个implement方法

//发布订阅
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

// 观察者
function Watcher(fn) { // Watcher是一个构造函数，接收入参fn并存到fn
  this.fn = fn;
}
Watcher.prototype.implement = function () { // Watcher的原型上添加implement方法，执行传入的函数
  this.fn();
};
let watcher = new Watcher(function () {
  console.log("This is a test.")
});

// 实例化Dep并执行函数
let dep = new Dep();
dep.addSub(watcher); // 将原型上有implement()的watcher放入到订阅池中
dep.notify(); // 发布订阅，执行watcher的implement()方法。
