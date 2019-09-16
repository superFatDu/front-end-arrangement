// 1. 定义三个Promise的三个状态
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
// 2. Promise函数
/*
* 简易Promise
* @param executor 回调函数(resolve, reject) => {}
*/
function MyPromise(executor) {
  const that = this; // 代码可能会异步，用于正确获取this对象
  that.state = PENDING; // Promise的初始状态是pending
  that.value = null; // 用于接受resolve/reject传入的值
  that.resolvedCallbacks = []; // 保存then的回调
  that.rejectedCallbacks = []; // 保存then的回调
  // resolve函数
  function resolve(value) {
    if (that.state === PENDING) {
      that.state = RESOLVED;
      that.value = value;
      that.resolvedCallbacks.map(cb => cb(that.value));
    }
  }
  // reject函数
  function reject(value) {
    if (that.state === PENDING) {
      that.state = REJECTED;
      that.value = value;
      that.rejectedCallbacks.map(cb => cb(that.value));
    }
  }
  // 执行Promise中传入的函数（回调函数）
  try {
    executor(resolve, reject); // 把resolve/reject当参数传递给回调函数
  } catch (error) {
    reject(error);
  }
}
// Promise链
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
  if (that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled);
    that.rejectedCallbacks.push(onRejected);
  }
  if (that.state === RESOLVED) {
    onFulfilled(that.value);
  } 
  if (that.state === REJECTED) {
    onRejected(that.value);
  }
}
module.exports = MyPromise;