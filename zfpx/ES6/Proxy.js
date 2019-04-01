// Proxy 外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

// 1. Proxy实例 target表示要拦截的不表对象；handler表示的拦截的行为；receiver指向的是Proxy实例对象
//let proxy = new Proxy(target, handler);

// 2. 示例
let obj = new Proxy({}, {
  get: function(target, propertyKey, receiver) {
    console.log(`getting ${propertyKey}`);
    return Reflect.get(target, propertyKey, receiver);
  },
  set: function(target, propertyKey, value, receiver) {
    console.log(`setting ${value}`);
    return Reflect.set(target, propertyKey, value, receiver);
  }
});
obj.count = 1; // set console: setting count
console.log('get :', obj.count); // 1. get console: getting count 2.this console: get: 1

// 3.操作
// 3.1 get()
let person = {
  name: "Robin"
};
let proxy1 = new Proxy(person, {
  get: function(target, key) {
    if (key in target) {
      return target[key];
    } else {
      throw new Error(`Property: ${key} does not exist.`);
    }
  }
});
console.log('getName :', proxy1.name); // getName: Robin
// console.log('getAge :', proxy1.age); // age does not exist
// 3.2 set()
let validator = {
  set: function(obj, prop, value) {
    if (prop === "age") {
      if (!Number.isInteger(value)) {
        throw new TypeError("The age is not an integer");
      }
      if (value > 20) {
        throw new RangeError("The age seems invalid");
      }
    }
    obj[prop] = value;
  }
};
let person1 = new Proxy({}, validator);
// person1.age = 100; // The age seems invalid
// person1.age = "young"; // The age is not an integer
person1.age = 15;
console.log(person1.age); // 15
// 3.3 apply() => 没当执行proxy()或者调用apply()/call()会执行
let applyHandler = {
  apply: function(target, ctx, args) { // 目标对象/上下文/参数
    return Reflect.apply(...arguments) * 2;
  }
};
function sum(prev, next) {
  return prev + next;
}
let proxy3 = new Proxy(sum, applyHandler);
console.log(proxy3(1, 2));
console.log(proxy3.call(null, 1, 2));
console.log(proxy3.apply(null, [1, 2]));
// 3.4 has(target, key) target是目标对象；key是需查询的属性名

let stu1 = { name: "Robin", age: 15 };
let hasHandler = {
  has: function(target, key) {
    if (key === "age" && target[key] < 18) {
      console.log(`${target.name}未成年。`);
      return false;
    }
    return key in target;
  }
};
let proxy4  = new Proxy(stu1, hasHandler);
'age' in proxy4; // Robin未成年。
