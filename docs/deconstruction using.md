# 解构用途

## 1.1 交换变量

```js
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a); // 2
console.log(b); // 1
```

## 1.2 访问数组中的元素

```js
const colors = [];
const [firstColor = "white"] = colors;
console.log(firstColor); // white
// 当只想访问第二个元素时
const [, secondColor = "black"] = colors;
console.log(secondColor); // black
```

## 1.3 不可变操作

```js
const arr = [1, 2, 3];
const [, ...temptArr] = arr;
console.log(temptArr); // [2, 3]
console.log(arr); // [1, 2, 3]
```

## 1.4 解构动态属性

```js
function greet(obj, nameProp) {
  const { [nameProp]: name = "Unknown" } = obj;
  return `Hello,${name}`;
}

console.log(greet({name: "Batman"}, "name")); // Hello,Batman
console.log(greet({}, "name")); // Hello,Unknown
```

## 1.5 解构 iterables

> 许多原生基本类型和对象都是可迭代的: array, string, typed arrays, set 和 map。

```js
const lastName = {
  list: [
    {name: "Du"},
    {name: "Li"}
  ],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.list.length) {
          const value = this.list[index++].name;
          return { value, done: false }
        }
        return { done: true }
      }
    }
  }
}

const [nameOne, nameTwo] = lastName;
console.log(nameOne); // Du
console.log(nameTwo); // Li
```
