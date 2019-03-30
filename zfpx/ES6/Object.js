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
let obj5 = { name: 2 };
let obj6 = Object.assign({}, obj5);
console.log(obj6); // { name: 2 }