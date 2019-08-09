# H5提供了localStorage/sessionStorage,为什么还要使用Vuex?

## 1. 介绍

### 1.1 localStorage/sessionStorage

1. 为了解决cookie存储空间太小的问题（almost 4k）,所以加入了localStorage/sessionStorage

2. localStorage是永久性的存储。

3. sessionStorage在关闭窗口会话结束就会把存储的键值对清空。

### 1.2 vuex

1. Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

2. Vuex的状态不能持久化，页面刷新状态就会丢失。

#### 1.2.1 vuex用途

- Vue开发过程中，有一些组件并不是层级关系，不能通过props传递状态，就需要使用Vuex来集中管理这些状态，方便其他组件存取状态。

## 2. WHY

### 2.1 缺失Vuex，状态管理困难

- 其实这些状态是可以不用Vuex直接存储到localStorage/sessionStorage中，但是如果需要维护的状态太多，这个时候管理这一大堆的状态就会很尴尬了。

### 2.2 客户端的持久化应用状态
 
- 但是如果只有Vuex而没有localStorage/sessionStorage来保证客户端状态持久化，那Vuex提供的状态其他组件在一定条件下也是无福消受的，相当鸡肋。

## 3. 解决方案

- [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)

## 4. 总结

> Vuex和localStorage/sessionStorage是可以独立存在的，但如果使用Vue开发又有很多的其他组件需要同时访问的状态的话，将两者结合是很好的方案，既方便状态的集中管理，也能保证状态的持久化。