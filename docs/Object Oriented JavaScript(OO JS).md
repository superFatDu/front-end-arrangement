# JavaScript面向对象

## 1. 什么是对象

```text
1. 对象是对单个事物的抽象。 => 一本书，一辆车，一台电视都是一个对象。

2. 对象是一个容器，封装了property(属性)和method(方法) => 属性是对象的状态，方法是对象的行为。
```

## 2. 什么是面向对象

```text
面向对象就是使用对象，我们可以直接使用它提供的功能而不用在乎内部的组成情况。
```

## 3. 类与对象的关联

```text
这就好比模具与产品的关系，类是一个抽象的概念，但是对象则是类的具体实例。比如人是一个类，那么李白，杜甫则是一个对象。
```

## 4. 面向对象的特点

### 4.1 封装

> 把抽象出的属性和对属性的方法封装在一起对外实现接口开放，说白了就是封装一个方法或是类可以传入参数，供相同功能的外界使用，来达到相同的目的，便于对代码的管理。

```js
class Package {
    constructor (animal){
        this.animal = animal
    }
    zoo (animal) {
        console.log('this is'+ this.animal)
    }s
    static private () {
        console.log('我是私有方法')
    }
}

let newPackage = new Package('大象')
newPackage.zoo()
newPackage.private() // Uncaught TypeError: newPackage.private is not a function
```

### 4.2 继承

> 继承有多种的实现方式，这里展示以种比较完善的方式，其他的方式的优缺点自行查阅。

```js
function Parent(name) {
    this.parent = name
}
Parent.prototype.say = function() {
    console.log(`${this.parent}: 你打篮球的样子像kunkun`)
}
function Child(name, parent) {
    // 将父类的构造函数绑定在子类上
    Parent.call(this, parent)
    this.child = name
}

// 1. 这一步不用Child.prototype =Parent.prototype的原因是怕共享内存，修改父类原型对象就会影响子类
// 2. 不用Child.prototype = new Parent()的原因是会调用2次父类的构造方法（另一次是call），会存在一份多余的父类实例属性
// 3. Object.create是创建了父类原型的副本，与父类原型完全隔离

Child.prototype = Object.create(Parent.prototype);
Child.prototype.say = function() {
    console.log(`${this.parent}好，我是练习时长两年半的${this.child}`);
}

// 注意记得把子类的构造指向子类本身
Child.prototype.constructor = Child;

var parent = new Parent('father');
parent.say() // father: 你打篮球的样子像kunkun

var child = new Child('cxk', 'father');
child.say() // father好，我是练习时长两年半的cxk

```

### 4.3 多态

```js
// 重载
class overload {
    init (callback) {
        if (callback === 'go') {
            console.log('我是go')
        }else if(callback === 'eat') {
            console.log('我是eat')
        }else {
            console.log('我是sprot')
        }
    }
}

var newOverload = new overload()
newOverload.init('go')
newOverload.init('eat')
newOverload.init('sprot')

// 重写
class  rewrite {
    go () {
        console.log('我在走路')
    }
    sport () {
        console.log('我在运动')
    }
}
class  rewriteSon extends rewrite{
    go () {
        console.log('我回家了')
    }
}

var newRewriteSon = new rewriteSon()
newRewriteSon.go()
newRewriteSon.sport()
```