```$xslt
let multiArr = [[1, 45], 2, 777, [9, 234234, [23423, [234, 122]]]];
let multiArrResult = Array.from(new Set(multiArr.flat(Infinity))).sort((a, b) => a -b);
console.log(multiArrResult);
// 问题
TypeError: arr.flat is not a function
// 原因
兼容性差，所以可以可以自己封装
```
##### 1. Array.prototype.flat
```$xslt
Array.prototype.flat = function(depth) {
  if (!Number(depth) || Number(depth) < 0) {
    return this;
  }
  let arr = [];
  this.forEach(item => {
    if (Array.isArray(item)) {
      arr = arr.concat(item.flat(depth--));
    } else {
      arr.push(item);
    }
  })
  return arr;
}
```
##### 2. 测试
```$xslt
const arr = [1, [2, [3, 'a', [4]]]]
console.log(arr.flat('dsdsadf'));  // [1, [2, [3, 'a', [4]]]]
console.log(arr.flat(-32)); // [1, [2, [3, 'a', [4]]]]
console.log(arr.flat(0));   // [1, [2, [3, 'a', [4]]]]
console.log(arr.flat('1'));   // [1, 2, [3, 'a', [4]]]
console.log(arr.flat('2'));    // [1, 2, 3, 'a', [4]]
console.log(arr.flat(3));       // [1, 2, 3, 'a', 4]
console.log(arr.flat(Infinity));     // [1, 2, 3, 'a', 4]
console.log(arr.flat('Infinity'));   // [1, 2, 3, 'a', 4]
```
##### 3. 采坑
- this问题，当向Array的原型中添加方法的时候，不能使用箭头函数（箭头函数的this指向当前的执行上下文），所以
使用的时候回报错。
```
TypeError: this.forEach is not a function
```