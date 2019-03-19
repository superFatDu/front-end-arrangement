/**
 * BubbleSort 冒泡排序
 * @constructor
 */
function BubbleSort() {
  let arr = [5, 4, 3, 2, 1];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      let temp = arr[j];
      if (arr[j] > arr[j+1]) {
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
    console.log(arr);
  }
}
BubbleSort();