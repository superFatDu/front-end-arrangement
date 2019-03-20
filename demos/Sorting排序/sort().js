// 1. 例导
let arr  = [4, 1000, 67, 600];
let arrResult = arr.sort();
console.log(arrResult); // [ 1000, 4, 600, 67]
// 1.1 NOTE: sort()方法默认的是Unicode编码排序，而且是正序，所以结果如上。

// 2. 改进
arrResult = arr.sort((a, b) => {
  return a - b;
});
console.log(arrResult); // [ 4, 67, 600, 1000 ]
arrResult = arr.sort((a, b) => {
  return b -a;
});
console.log(arrResult); // [ 1000, 600, 67, 4 ]

// 3. compareFn
function compareFn(a, b) {
  return a - b; // return b -a;
}

// 4. 原理 => 冒泡排序
let arr1 = [4, 790, 12, 1, 1000, 67, 600];
function compareFn(arr) {
  let len = arr.length;
  for(let i = 0; i < len; i++) {
    for(let j = 0; j < len - 1 - i; j++) {
      let temp;
      if(arr[j] > arr[j+1]) {
        temp = arr[j+1];
        arr[j+1] = arr[j];
        arr[j] = temp;
      }
    }
    console.log(arr);
  }
}
compareFn(arr1);

// 5. 总结: sort()其实就是语法糖，在底层用的还是冒泡排序。

