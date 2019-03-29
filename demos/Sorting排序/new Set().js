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
  });
  return arr;
};

// 1. 例导
let arr = [4, 790, 12, 1, 1, 3, 4, 1000, 67, 600];
let arrResult = Array.from(new Set(arr)).sort((a, b) => a -b);
console.log(arrResult);

let multiArr = [[1, 45], 2, 777, [9, 234234, [23423, [234, 122]]]];
let multiArrResult = Array.from(new Set(multiArr.flat(Infinity))).sort((a, b) => a -b);
console.log(multiArrResult); // [ 1, 2, 9, 45, 122, 234, 777, 23423, 234234 ]

// 2. 问题
// flat()函数是一个实验室函数，存在兼容性问题，可以在Array的原型上添加方法。

// 3. new Set()去重
let arrSet = new Set(arr);
console.log(arrSet);  // Set { 4, 790, 12, 1, 3, 1000, 67, 600 }

// 4. 格式成数组 => Array.from
console.log(Array.from(arrSet));  // [ 4, 790, 12, 1, 3, 1000, 67, 600 ]
