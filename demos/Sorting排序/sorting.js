let arr = [5, 4, 3, 2, 1];
/**
 * 冒泡排序 相邻两个元素比较大小，每次比较得到一个最大值放在最后
 * @param {Array} arr
 * @constructor
 */
function BubbleSort(arr) {
  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr.length - 1 - i; j++) {
      let temp;
      if (arr[j] > arr[j+1]) {
        temp = arr[j+1];
        arr[j+1] = arr[j];
        arr[j] = temp;
      }
    }
    console.log(arr);
  }
}
// BubbleSort(arr);
// [ 4, 3, 2, 1, 5 ]
// [ 3, 2, 1, 4, 5 ]
// [ 2, 1, 3, 4, 5 ]
// [ 1, 2, 3, 4, 5 ]
// [ 1, 2, 3, 4, 5 ]

/**
 * 选择排序 外层确定要选择的arr[i]，通过内层的比较，暂时保存最小值的坐标，最后交换i和j的位置。
 * @param {Array} arr
 * @constructor
 */
function SelectSort(arr) {
  let minIdx, temp;
  for(let i = 0; i < arr.length - 1; i++) {
    minIdx = i;
    for(let j = i + 1; j < arr.length; j++) {
      if(arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
    console.log(arr);
  }
}
// SelectSort(arr);
// [ 1, 2, 3, 4, 5 ]
// [ 1, 2, 3, 4, 5 ]
// [ 1, 2, 3, 4, 5 ]
// [ 1, 2, 3, 4, 5 ]

/**
 * 插入排序 外层i确定要排序的位置，然后那这个值于前面已经排好序的arr作比较，如果前一个数比当前的数大，则把被比较的数后移一个位置直到被比较的数比目标数小。
 * @param arr
 * @constructor
 */
function InsertSort(arr) {
  let len = arr.length;
  let prevIdx, currentKey;
  for(let i = 1; i < len; i++) {
    prevIdx = i - 1;
    currentKey = arr[i];
    while (prevIdx >= 0 && arr[prevIdx] > currentKey) {
      arr[prevIdx + 1] = arr[prevIdx];
      prevIdx --;
    }
    arr[prevIdx + 1] = currentKey;
    console.log(arr);
  }
}
// InsertSort(arr);
// [ 4, 5, 3, 2, 1 ]
// [ 3, 4, 5, 2, 1 ]
// [ 2, 3, 4, 5, 1 ]
// [ 1, 2, 3, 4, 5 ]

function QuickSort(arr) {
  // TODO
}
QuickSort(arr);