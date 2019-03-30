// 函数

// ES5
function ajax(url, method, dataType) {
  if (typeof url === "undefined") {
    throw new Error("url不能为空");
  }
  method = method ? method : "GET";
}

// ES6默认值
function ajax1(url = new Error("url不能为空"), method = "GET", dataType = "json") {
  console.log(url); // /user
  console.log(method); // GET
  console.log(dataType); // json
}
ajax1("/user");

// 展开操作符

function sum(prefix, a, b) {
  return prefix + (a + b);
}
console.log(sum("$", 1, 2));

function sum1(prefix, ...rest) {
  let arr = [...rest];
  let sum = prefix + arr.reduce((prev, next) => {
    return prev + next;
  }, 0);
  return sum;
}

console.log(sum1("$", 1, 2, 3, 4, 5, 6));

// reduce/filter/map……