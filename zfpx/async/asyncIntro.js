/**
 * 在JS中，函数是一等公民，可以作为函数的返回值，也可以作为函数的参数
 */

 // 1. 判断一个参数是否是字符串
 function isString(param) {
   return Object.prototype.toString.call(param) === "[object String]";
 } 
 console.log(isString("superFatDu")); // true

 // 2. 升级一下
function whichType(type) {
  return (param) => {
    return Object.prototype.toString.call(param) === `[object ${type}]`;;
  }
}
console.log(whichType("Array")([1, 3])); // true

// 3. 异步历程
// 3.1 回调函数 =》 callback
// 3.2 事件监听
// 3.3 发布订阅
// 3.4 Promise
// 3.5 async/await