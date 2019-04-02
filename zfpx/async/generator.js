/**
 * 生成器是一个函数，可以用来生成迭代器。
 * 生成器函数和普通函数不一样，普通函数是一旦调用一定会执行完，但是生成器函数中间可以暂停。
 * 生成器函数的特点：需要加*
 */
// 1.1 生成器函数不会立即执行，他会返回一个迭代器，没调用一次next()会返回一个对象。
function *go() { // 返回是一个Generator对象
  console.log('开始');
  let stop1 = yield "a"; // 实现了输入和输出，本次的输出放在yield后面，下次的输入放在yield前面。
  console.log("stop1");
  let stop2  = yield stop1;
  console.log("regoing");
  return stop2;
}
let goIter = go();
// goIter.next(); // 开始
// goIter.next(); // stop1
// goIter.next(); // regoing

// let r1 =goIter.next();
// console.log(r1); // { value: 'a', done: false }
// let r2 =goIter.next();
// console.log(r2); // { value: undefined, done: false }
// let r3 =goIter.next();
// console.log(r3); // { value: undefined, done: true }

let r1 =goIter.next();
console.log(r1); // { value: 'a', done: false }
let r2 = goIter.next("下车吃饭"); // next()传参就是给上一个yield赋值，yield表达式本身没有返回值，他只是一个输出标识符。
console.log(r2); // { value: '下车吃饭', done: false }
let r3 = goIter.next("到了，出去浪");
console.log(r3); // { value: '到了，出去浪', done: true }