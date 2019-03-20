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
console.log(multiArrResult);
