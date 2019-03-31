// Set本身是一个构造函数，用来生成Set数据结构。

// 1. 使用add()添加
const s = new Set();
let arr = [1, 3, 5, 7];
arr.forEach(item => s.add(item));
for(let val of s) {
  console.log(val); // 1 3 5 7
}
// 2. 去重 Set长度关键字: size
let set = new Set([1, 3, 4, 4, 5, 4, 4, 8]);
console.log([...set]); // [ 1, 3, 4, 5, 8 ]
console.log(set.size); // 5

// 3. 操作 add()/delete()/has()/clear()
set.add(9);
console.log([...set]); // [ 1, 3, 4, 5, 8, 9 ]
set.delete(3);
console.log([...set]); // [ 1, 4, 5, 8, 9 ]
console.log(set.has(4)); // true
set.clear();
console.log([...set]); // []

// 4. 遍历操作 keys()/values()/entries()/forEach()
let set1 = new Set(["red", "green", "blue"]);
for(let item of set1.keys()) {
  console.log(item); // red green blue
}

for(let item of set1.values()) {
  console.log(item); // red green blue
}

for(let item of set1.entries()) {
  console.log(item);// [ 'red', 'red' ] [ 'green', 'green' ] [ 'blue', 'blue' ]
}

set1.forEach((val, key) => {
  console.log(`${val}---${key}`); // red---red green---green blue---blue
});


// Map提供了"值-值"的对应，是一种更完善的Hash结构实现。

// 1. 构建
let map = new Map([
    ["name", "superFatDu"],
    ["age", 25]
]);
console.log(map.get("name")); // superFatDu
// 2. size => 返回Map结构的成员总数
console.log(map.size); // 2
// 3. set(key, value)
map.set("gender", "male");
console.log([...map]); // [ [ 'name', 'superFatDu' ], [ 'age', 25 ], [ 'gender', 'male' ] ]
// 4. get(key)
console.log(map.get("name")); // superFatDu
// 5. has()
console.log(map.has("gender")); // true
console.log(map.has("num")); // false
// 6. delete()
map.delete("gender");
console.log(map.has("gender")); // false
// 7. clear()
map.clear();
console.log([...map]); // []
// 8. 遍历方法 keys()/values()/entries()/forEach()

let map1 = new Map([
  ["name", "superFatDu"],
  ["age", 25]
]);
for(let item of map1.keys()) {
  console.log(item); // name age
}

for(let item of map1.values()) {
  console.log(item); // superFatDu 25
}

for(let item of map1.entries()) {
  console.log(item); // [ 'name', 'superFatDu' ] [ 'age', 25 ]
}