### Converting Basic Types of JavaScript
##### 1.Data Types Of JavaScript
1. Basic Data Type(6)：null、undefined、boolean、number、string、symbol
2. Reference Data Type：Object、Function、Array、Date……
##### 2.Converting functions
> valueOf() and toString() were written on the property of Object,which were oriented by every Object.
And valueOf() returns the Object itself,but toString() returns the data type.like below:
```
  let obj = {};
  console.log(obj.valueOf()); // {} => itself
  console.log(obj.toString()); // [object Object] => data type
``` 
- valueOf()
- toString()
- Symbol.toPrimitive()
```
// init a Object and rewrite the functions
let a = {
  i: 1,
  valueOf() {
    return this.i;
  },
  toString() {
    return this.i;
  },
  [Symbol.toPrimitive]() {
    return this.i;
  } 
}
```
1. valueOf() and toString()
```
alert(a); // 1 toString()
alert(+a); // 1 valueOf()
alert(""+a); // 1 valueOf()
alert(Number(a)); // 1 valueOf()
alert(String(a)); // 1 toString()
alert(a == "1"); // true valueOf()
alert(a === "1"); // false valueOf()
```
```
1. alert() accepts a string,so a calls toString()
2. +a calls toString() and a calls valueOf()
3. like 2
4. call function Number(),so a calls valueOf()
5. call function String(),so a calls toString()
6. a calls valueOf(),cuz == compare converting value,so it's true
7. a calls valueOf(),cuz === compare memory address,so it's false
```
```
// summary
1. In numeric computation(数值运算),valueOf() is high priority
2. In string computation(字符串计算),toString() is high priority.
```
2. toString() and String()
- null and undefined can't call toString(),there is a TppeError.
- null and undefined can call String() and returns like "null".
- String() can use "new" to create a new Object
```
let s = "it's a test";
let str = new String(s);
console.log(str+"_"+typeof(str)); // it's a test_string
``` 
3. Symbol.toPrimitive()
```
// 拥有 Symbol.toPrimitive 属性的对象
let obj = {
  [Symbol.toPrimitive](hint) {
    if(hint === 'number'){
      console.log('Number场景');
      return 123;
    }
    if(hint === 'string'){
      console.log('String场景');
      return 'str';
    }
    if(hint === 'default'){
      console.log('Default 场景');
      return 'default';
    }
  }
}
console.log(2*obj); // Number场景 246
console.log(3+obj); // String场景 3default
console.log(obj + "");  // Default场景 default
console.log(String(obj)); //String场景 str
```
- Note:Symbol.toPrimitive() is the highest priority.

