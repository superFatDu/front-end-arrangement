/*
* Currying is a Function,which changes the Function with several arguments to a Function that accepts
* a single argument,and then return a Function that can handle the rest arguments.
*
* fn(a, b) => fn(a)(b)
*
* Note:Currying's running process is to collect the arguments,and handle them at the final return.
* */

/*
* Getting Sum
*
* The function currying accepts a function sum,which can handle the arguments a and b,
* at last,a two-arguments function changes to a single-argument function.
* */

// function: sum(x, y)
function sum(a, b) {
  return a + b;
}
// function currying(fn)
function currying(fn) {
  return function (a) {
    return function (b) {
      return fn(a, b)
    }
  }
}
// realization
let carriedSum = currying(sum);
console.log(carriedSum(1)(2));  // 3

/*
* common template
*
* The process of collecting arguments
* */
// 简单实现，参数只能从右到左传递
function createCurry(func, args) {

  let arity = func.length;
  args = args || [];

  return function() {
    let _args = [].slice.call(arguments);
    [].push.apply(_args, args);

    // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
    if (_args.length < arity) {
      return createCurry.call(this, func, _args);
    }

    // 参数收集完毕，则执行func
    return func.apply(this, _args);
  }
}

function check(reg, targetString) {
  return reg.test(targetString);
}

let _check = createCurry(check);
let checkPhone = _check(/^1[34578]\d{9}$/);
let checkEmail = _check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);
// handler
checkPhone("145675666");
checkEmail("12345678@163.com");

// There is a error,and the example just is a example.