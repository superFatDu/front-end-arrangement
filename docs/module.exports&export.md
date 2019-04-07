> 首先，我们要明白一个前提，那就是CommonJS模块规范与ES模块规范是不同的概念

### 1. CommonJs

#### 1.1 概念

- Node应用由模块组成，采用CommonJS模块规范。
- 1. 根据规范，每个文件就是一个模块，有自己单独的作用域。在一个文件里面定义变量，函数，类等都是私有的，对其他的文件不可见。
  2. 根据规范，每个模块内部，module白能量代表当前模块。这个变量是一个对象，它的exports属性（module.exports）是对外的接口。
  3. module.exports用于输出文件定义内容，require用于加载模块。
  
#### 1.2 实例
  
##### 1.2.1 module.exports

```js
// example.js
let x = 5;
let addX = (value) => {
    return x + value;
}
module.exports.x = x;
module.exports.addX = addX;
```

##### 1.2.2 require

```js
let requireTest = require(./example.js);
let x = requireTest.x;
let addX = requireTest.addX(3);
console.log(x); // 5
console.log(addx); // 8
```

#### 1.3 exports与module.exports

- Node为每个模块提供了一个exports变量，指向module.exports。这如同在每个模块的头部添加如下代码：

```js
let exports = module.exports;
```

- module.exports才是真正的接口，exports只不过是它的一个辅助工具。　最终返回给调用的是module.exports而不是exports。
所有的exports收集到的属性和方法，都赋值给了Module.exports。

### 2. ES6模块规范

#### 2.1 概念

- 不同于CommonJS,ES6使用的是export和import来导出和导入模块。
- export命令规定的是对外的接口，必须与模块内部的变量建立意义对应关系。

#### 2.2 实例

##### 2.2.1 export

```js
let firstName = "Chengwu";
let lastName = "Du";
export { firstName, lastName }
```

##### 2.2.2 export意义对应实例

```js
// one
export const PI = "3.1415926";

// two
let name = "Robin";
export { name }

// three
let n = "Robin";
export { n as name }
```

##### 2.2.3 import

```js
import { firstName, lastName } from "./export.js";
let name = firstName + lastName;
console.log(name); // Chengwu Du
```

#### 2.3 export default

```js
export defalut function() {
    return "Robin";
}
```

##### 2.3.1 export default与export区别

- 在一个文件或者模块中，export和import可以有多个，但是export default却仅有一个。
- 通过export方式导出，再导入时需要加{}，按需加载。但是export default不需要。
- 输出单个模块时使用export default，多个模块时使用export。
- 不要同时使用。