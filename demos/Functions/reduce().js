/*
* [x1, x2, x3].reduce(fn) = fn(fn(x1, x2), x3)
* fn = (prev, next) => return logic computation.
* */

// compute the sum
let arr = [1, 2, 3, 4, 5];  // define the variable
let sum = (prev, next) => prev + next;  //define the callback
let arrSum = arr.reduce(sum);
console.log(arrSum);  // 15

// Note: When compute the sum like this: [{price: 30, name: "xx"},{price: 40, name: "yy"}],
// cuz the first prev doesn't have the property "price",so we usually init the first prev like below


let arr1 = [{price: 30, name: "xx"},{price: 40, name: "yy"}];
let sums = arr1.reduce((prev, next) => {
  return prev + next.price;
}, 0); // reduce(callback, init-prev),there is 0
console.log(sums);  // 70