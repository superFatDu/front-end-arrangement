// 实现
const PENDING = "pending"; // 初始态
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
function Promise(executor) {
  let self = this; // 先缓存当前promise实例
  self.status = PENDING; // 设置状态
  // 定义存放成功的回调数组
  self.onResolvedCallbacks = [];
  // 定义存放失败的回调数组
  self.onRejectedCallbacks = [];
  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED;
      self.value = value; // 成功后会得到一个不能改变的值
      // 调用所有成功的回调
      console.log("resolve:",self);
      self.onResolvedCallbacks.forEach(cb => cb(self.value));
    }
  };
  function reject(reason) {
    if  (self.status === PENDING) {
      self.status = REJECTED;
      self.value = reason; // 失败后会得到一个不能改变的值
      // 调用所有失败的回调
      self.onRejectedCallbacks.forEach(cb => cb(self.value));
    }
  };
  // 异常捕获
  try {
    executor(resolve, reject); 
  } catch (error) {
    reject(error);
  }
}
// then() => 用来接受成功的值或者失败的原因
Promise.prototype.then = function(onFulfilled, onRejected) {
  let self = this;
  // 判断then()的回调是否是函数，如果不是就把成功值或者失败原因抛向后一个then()
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
  onRejected = typeof onRejected === "function" ? onRejected: reason => { throw reason };
  // 如果是挂起(异步的时候走这个)
  if (self.status === PENDING) {
    self.onResolvedCallbacks.push(onFulfilled);
    self.onRejectedCallbacks.push(onRejected);
  }
  // 处理成功或者失败的回调(同步的时候走这个)
  if (self.status === FULFILLED) {
    let x = onFulfilled(self.value);
  }
  if (self.status === REJECTED) {
    let x = onRejected(self.value);
  }
};

module.exports = Promise;