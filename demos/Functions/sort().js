/*
* [x1, x2, x3].sort()
*
* The theory of sort() to order the number array is firstly to change items to string,
* and then sort.
* */

let arr = [2, 10, 4, 5];
arr.sort();
console.log(arr);  // [10, 2, 4, 5]

// Note: The ASCAII value of "10" is smaller than "2".

/*
*optimized method
* Using traditional compare
* */
arr.sort((x ,y) => {
    if (x > y) return 1;
    if (x < y) return -1;
    return 0;
});
console.log(arr);

 /*
 * Set()
 * new Set(arr)
 * return unique value arr and sorted.
 * */
 let result = new Set(arr);
console.log(...result);
