function shallowCopy(obj) {
  let shallowObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) shallowObj[key] = obj[key];
  }
  return shallowObj;
}

let objList = {
  name: "九三",
  age: 26,
  gender: "male"
}

let result = shallowCopy(objList);
console.log(result);

result["work"] = "fed";
console.log(result);
console.log(objList);



let a = {
  age: undefined,
  sex: Symbol('male'),
  jobs: function() {},
  name: 'yck'
}
let b = JSON.parse(JSON.stringify(a))
console.log(b)



function addCalculator() {
  let a = 1;
  return function() {
    a += 1;
    return a;
  }
}

let add = addCalculator();
console.log(add());
console.log(add());
console.log(add());
console.log("------------------------------------------------");
let obj = {
  _id: undefined,
  set id(value) {
    this._id = value;
  },
  get id() {
    return this._id;
  }
};
obj.id = 5;
console.log(obj.id);

console.log("------------------------------------------------");

let proxy = new Proxy({}, {
  get: function(target, propertyKey, receiver) {
    console.log(`getting ${propertyKey}`);
    return Reflect.get(target, propertyKey, receiver);
  },
  set: function(target, propertyKey, value, receiver) {
    console.log(`setting ${propertyKey}`);
    return Reflect.set(target, propertyKey, value, receiver);
  }
});
proxy.name = "cHeNg5";
proxy.name;
console.log(proxy);


