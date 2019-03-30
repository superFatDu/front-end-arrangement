/*
* var 1. 可以重复声明;2. 不能定义常量;3. 不支持块级作用域
* let and const
*/

// 1. 不能重复声明
let a = 20;
/* let a = 30; // 'a' has already been declared */

// 2. 可以定义常量
const PI = 3.14;
/* PI = 222; // Assignment to constant variable */
const USER = {name: "super"};
/* USER = "ASDF"; // Assignment to constant variable */
USER.name = "Robin"; // 常量的值不能改变，但是如果常量的值是一个引用类型，则值里的属性却可以改变。

// 支持块级作用域
// 以前JS只有两个作用域:1.全局作用域；2.函数作用域。
// 现在只要是{}包起来的就是一个作用域
{
  let x = 2;
}
/* console.log(x); // x is not defined */

// ES6
for(let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
// ES5
var _loop = function _loop(i) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
};
for(var i = 0; i < 3; i++) {
  _loop(i);
}