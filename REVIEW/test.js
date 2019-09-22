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
//console.log(proxy);

console.log("------------------------------------------------");
function getData(callback) {
  let a = {
    name: "cHeNg5",
    age: 26
  };
  // setTimeout(function() {
  //   callback(a);
  // }, 1000);
  callback(a);
}
getData((arg) => {
  console.log(arg);
})
console.log("------------------------------------------------");
function generator1() {

}
console.log(generator1());

function* exampleYield(x) {
  yield x + 1;
  yield x + 2;
  return x + 3;
}
let exe = exampleYield(1);
// console.log(exe.next());
// console.log(exe.next());
// console.log(exe.next());
// console.log(exe.next());

for(let x of exe) {
  console.log(x);
}
console.log("-----------------------简易Promise测试-------------------------");
let MyPromise =  require('./myPromise');
function promise() {
  return new MyPromise((resolve, reject) => {
    let num = Math.random();
    if (num < 0.5) {
      resolve(num);
    } else {
      reject('num大于0.5');
    }
  })
}
promise().then(res => {
  console.log(res);
}, err => {
  console.log(err);
})

console.log("-----------------------扁平化对象-------------------------");
let temptObj = {
  obj1: {
    attr1: {
      isCheck: true,
      days: 2
    },
    attr2: {
      isCheck: false
    },
    attr3: {
      isCheck: true,
      days: 2
    }
  },
  obj2: {
    attr4: {
      isCheck: true,
      percent: 34
    },
    attr5: {
      isCheck: false
    },
    attr6: {
      isCheck: true,
      percent: 56
    }
  }
}
function objIterator(opt, init) {
  let temptArr = init;
  Object.keys(opt).forEach(item => {
    if (typeof opt[item].isCheck !== "undefined") {
      temptArr.push(opt[item]);
    } else {
      objIterator(opt[item], temptArr);
    }
  })
  return temptArr;
}

//console.log(Array.prototype.slice.call(temptObj))
let returnArr = objIterator(temptObj, []);
for(let item of returnArr) {
  if (Object.keys(item).length === 2 && item.isCheck) {
    if (item.days === "" || item.percent ==="") {
      console.log("error");
    } else {
      console.log(item);
    }
  }
}
console.log("-----------------------数组concat-------------------------");
let errorList = {
  list1: ["", "", ""],
  list2: ["", "", ""]
};
let concatList = errorList.list1.concat(errorList.list2);
console.log(concatList.join("") === "");

console.log("-----------------------call/apply-------------------------");
let yck = {
  value: 1
};
function getValue(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
  console.log(this);
  
}

Function.prototype.myCall = function (context) {
  var context = context || window
  // 给 context 添加一个属性
  // getValue.call(a, 'yck', '24') => a.fn = getValue
  context.fn = this
  // 将 context 后面的参数取出来
  var args = [...arguments].slice(1)
  // getValue.call(a, 'yck', '24') => a.fn('yck', '24')
  var result = context.fn(...args)
  // 删除 fn
  delete context.fn
  return result
}

getValue.myCall(yck, "robin", 18);


