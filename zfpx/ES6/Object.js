// 1. 对象的属性名如果和对象的变量名一致的话，可以合二为一
let name = "Robin";
let age = 26;
let obj = { name, age };
console.log(obj); // { name: 'Robin', age: 26 }

// 2. setPrototypeOf
let obj1 = { name: 1 };
let obj3 = {};
// let obj3 = { __proto: obj1 };
Object.setPrototypeOf(obj3, obj1);
// obj3.__proto__ = obj1;
console.log(obj3.name); // 1

// 3. super => 指向原型链父级
let obj2 = {
  getFood() {
    return "milk";
  }
};
let obj4 = {
  __proto__: obj2,
  getFood() {
    return "banana" + ' and ' + super.getFood();
  }
};
console.log(obj4.getFood()); // banana and milk

// 4. assign 将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
// 第一个参数是目标对象，后面的参数是源对象
let obj5 = { name: 2 };
let obj6 = Object.assign({}, obj5);
console.log(obj6); // { name: 2 }
// 如果参数只有一个，则直接返回此参数。
const obj7 = { a: 1 };
let obj8 = Object.assign(obj7);
console.log(obj8); // { a: 1 }
//如果参数不是对象，会默认转化成对象
let obj9 = Object.assign(2);
console.log(obj9); // [Number: 2]
console.log(typeof obj9); // object
// 浅拷贝，如果源对象的某个属性是对象，那么目标对象拷贝到的是这个对象的引用。
let obj10 = {name: {first: "Du", second: "Chengwu"}};
console.log(JSON.parse(JSON.stringify(obj10))); // 深拷贝

// 5. is
// 解决：== 会自动转换数据类型；=== NaN不等于本身
console.log(Object.is("foo", "foo")); // true
console.log(Object.is({}, {})); // false
console.log(Object.is(+0, -0)); // false
console.log(Object.is(NaN, NaN)); // true