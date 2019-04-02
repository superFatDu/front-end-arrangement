// 1. 传统的JS中生成实例对象的方法都是通过构造函数。
function Constructor(x, y) {
  this.x = x;
  this.y = y;
}
Constructor.prototype.toString = function() {
  return `x: ${this.x},y: ${this.y}`;
};
let constructor = new Constructor("Robin", "Du");
console.log(constructor.toString()); // x: Robin,y: Du

// 2. ES6提供了class关键字声明类
class Constructor1 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `x: ${this.x},y: ${this.y}`;
  }
}
let constructor1 = new Constructor1("Chengwu", 'Du');
console.log(constructor1.toString()); // x: Chengwu,y: Du

// 3. 实例的属性除非显示地定义在本身，否则都定义在原型上 =》 类的方法都定义在prototype上
console.log(constructor1.hasOwnProperty("x")); // true
console.log(constructor1.hasOwnProperty("y")); // true
console.log(constructor1.hasOwnProperty("toString")); // false
console.log(constructor1.__proto__.hasOwnProperty("toString")); // true

// 4. 类的实例共享一个原型对象
let constructor2 = new Constructor1("Chengwu", "Du");
console.log(constructor1.__proto__ === constructor2.__proto__); // true
// 4.1 添加原型上的方法
Constructor1.prototype.printOOPS = function() {
  return "OOPS";
};
console.log(constructor1.printOOPS()); // OOPS
console.log(constructor2.printOOPS()); // OOPS

// 5. getter/setter
class Sup {
  constructor(tempt) {
    this._tempt = tempt;
  }
  get tempt() {
    return this._tempt;
  }
  set tempt(val) {
    if (val === this._tempt) return;
    this._tempt = val;
  }
}
let sup = new Sup("1");
sup.tempt = "123";
console.log(sup.tempt); // 123

// 6. 其他写法
// const Sup1 = class {};

// 7. 静态方法 => 使用：类名.方法名()
class Sup2 {
  static showName() {
    return "superFatDu";
  }
}
console.log(Sup2.showName()); // superFatDu
// 7.1 字类可以继承静态方法
class sup2 extends Sup2 {

}
console.log(sup2.showName()); // superFatDu
// 7.2 通过super关键字继承
class sup3 extends Sup2 {
  static showName() {
    return super.showName() + " _sub";
  }
}
console.log(sup3.showName()); // superFatDu _sub

// 8. 实例属性不仅可以定义在constructor里面，也可以定义在类的最顶层 => ES7使用会报错，如果Babel没问题
class Sup4 {
  nameD = "superFatDu";
  constructor() {

  }
  get name() {
    return this.nameD;
  }
  set name(val) {
    if (this.nameD === val) return ;
    this.nameD = val;
  }
}
let sup4 = new Sup4();
console.log(sup4.name); // Unexpected token =