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

