/*
* [x1, x2, x3].filter(item => {
*   return condition;
* })
*
* condition[Boolean]
* return => if(condition === true) arr.push(item);
* */

let arr = [1, 2, 3, 4, 5, 6];  // define the variable
let result = arr.filter(item => {
  return item%2 === 0;  // condition: item%2 === 0;if(condition) result.push(item);
});
console.log(result); // [ 2, 4, 6 ]