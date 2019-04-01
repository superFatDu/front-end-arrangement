/*
 * Iterator是一种接口，为各种不同的数据结构提供统一的访问机制。
 *
 * 1.创建一个指针对象，指向当前数据结构的起始位置。
 * 2.第一次调用只针对象的next()方法，可以将指针指向数据结构的第一个成员。
 * 3.第二次调用只针对想的next()方法，指针就指向数据结构的第二个成员。
 * 4.不断调用指针对象的next()方法，直到它指向数据结构的结束位置。
 */

 // 1. 模拟next()方法

 let target = mockIterator(['a', 'b', 'c']);
 function mockIterator(tar) {
   let nextIdx = 0;
   return {
     next: function() {
       return nextIdx < tar.length
       ? { value: tar[nextIdx++], done: false }
       : { value: undefined, done: true } 
     }
   };
 }
 console.log(target.next()); // { value: 'a', done: false }
 console.log(target.next()); // { value: 'b', done: false }
 console.log(target.next()); // { value: 'c', done: false }
 console.log(target.next()); // { value: undefined, done: true }

 // 2. 原生具备Iterator接口的数据结构 Array/Map/Set/String/TypedArray/arguments/Nodelist

 let arr = ['a', 'b', 'c'];
 // let iter = arr[Symbol.iterator]();
 let iter = arr.entries(); // 效果与上相同
 console.log('iter1 :', iter.next()); // iter1 : { value: 'a', done: false }
 console.log('iter2 :', iter.next()); // iter2 : { value: 'b', done: false }
 console.log('iter3 :', iter.next()); // iter3 : { value: 'c', done: false }
 console.log('iter4 :', iter.next()); // iter4 : { value: undefined, done: true }
 console.log('iter5 :', iter.next()); // iter5 : { value: undefined, done: true }

 // 3. 调用场合
 // 3.1 解构赋值
 let set1 = new Set().add("a").add("b").add("c");
 let [x, y] = set1;
 console.log('x-y :', `${x}-${y}`); // a b
 // 3.2 扩展运算符（...）
 let str1 = "hello Robin";
 console.log('str1 :', [...str1]); // str1 : [ 'h', 'e', 'l', 'l', 'o', ' ', 'R', 'o', 'b', 'i', 'n' ]
 // 3.3 yield*
 // 3.4 for of/Array.from()/Map()/Set()/Promise.all()/Promise.race()……

 // 4. 字符串
 let str2 = "superFatDu";
 let strIter = str2[Symbol.iterator]();
 console.log('strIter :', strIter.next()); // strIter : { value: 's', done: false }
 console.log('strIter :', strIter.next()); // strIter : { value: 'u', done: false }
 console.log('strIter :', strIter.next()); // strIter : { value: 'p', done: false }
 console.log('strIter :', strIter.next()); // strIter : { value: 'e', done: false }
 console.log('strIter :', strIter.next()); // strIter : { value: 'r', done: false }