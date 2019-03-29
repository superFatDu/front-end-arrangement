// 解构 等号两边的结构类似
let arr = [1, 2, 3];
let [a, b, c] = arr;
console.log(a, b, c); // 1 2 3

let arr2 = [{name: "Robin", age: 22}, [1, 3], 4];
let [{name, age}, [d, e], f] = arr2;
console.log(name, age, d, e, f); // Robin, 22, 1, 3, 4