# 1. Vue组件间通信方式

## 1.1 概述

实际开发工作中，Vue总会组件化开发，这个时候，组件与组件之间的通信方式就很重要了，通常使用如下选择：props/emit;EventBus;vuex……

### 1.1.1 props/emit

> 这是使用很广泛很重要的一个方法，父组件向子组件传值的时候子组件使用props接受，由于单向数据流的原因，子组件向父组件传值只能通过时间触发，则使用emit事件。

```js
// 父组件
<template>
  <div class="sup-page">
    <sub-page :propVal="propVal" @emitSupPage="getEmitSub"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      propVal: "test prop value"
    }
  },
  methods: {
    getEmitSub() {
      console.log(info, "get info from sub page")
    }
  }
}
</script>


// 子组件
<template>
  <div class="sub-page">
    {{propVal}}
    <button type="button" @click="emitSupPage">Click</button>
  </div>
</template>
<script>
export default {
  props: {
    propVal: {
      type: String,
      required: true,
      default: "test prop value"
    }
  },
  methods: {
    emitSupPage() {
      this.$emit("emitSupPage", payload); // 通过emit向上传递，第二个参数可以是任何类型的值
    }
  }
}
</script>
```

### 1.1.2 EventBus

> 事件总线的方式用于比较简单的场景，但是却很便捷有效。EventBus原理就是新建一个Vue实例。

```js
//event-bus.js
import Vue from "vue"
import default new Vue()

//page1.vue
import EventBus from "event-bus.js"
EventBus.$emit("emitEvent", payload)

//page2.vue
import EventBus from "event-bus.js"
EventBus.$on("emitEvent", payload => {
  // TODO
})
```

### 1.1.3 Vuex

> Vuex是Vue周边一个大的生态系统，一句两句话肯定是说不完的，最好的还是查阅官方文档,下面是简单的应用。

```js
//index.js => 入口文件，导出实例
import Vue from "vue"
import Vuex from "vuex"
import state from "./state"
import actions from "./actions"
import mutations from "./mutations"
Vue.use(Vuex)
export default new Vuex.Store({state, actions, mutations})

// state.js => 初始化数据
let userStatus = 0;
try {
  if (sesseionStorage.userStatus) {
    userStatus = SessionStorage.userStatus
  }
} catch (e) {
  // TODO
}
export default { userStatus }

// actions.js => 接受视图层dispatch过来的事件（this.$store.dispatch(event, payload)）
export default {
  changeStatus({ commit }, param) {
    // handle logic operation
    commit("changeStatus", param) // 传递事件到mutations.js
  }
}

// mutations.js => 接受actions.js传递的事件，处理改变视图层
export default {
  changeStatus(state, param) {
    state.userStatus = param;
    sessionStorage.userStatus = param;
  }
}
```

### 1.1.4 $attrs/$listeners

> props对于父子组件间的通信很好，但是如果层级过多，依旧使用props就会显得很臃肿，$attrs/$listeners就是很好的一个应用。

```js
// 父组件
<template>
  <div class="sup-page">
    <son-page :propVal="propVal" @emitListeners="emitListeners"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      propVal: "test-prop"
    }
  },
  methods: {
    emitListeners(val) {
      // TODO
    }
  }
}
</script>

// 子组件
<template>
  <div class="son-page">
    <sub-page v-bind="$attrs" v-on="$listeners" />
  </div>
</template>
<script>
export default {
  name: "son-page"
}
</script>

// 孙组件
<template>
  <div class="son-page">
    <button type="button" @click="emitListeners">Click</button>
  </div>
</template>
<script>
export default {
  created() {
    console.log(this.$attrs) // {propVal: "test-prop"}
  },
  methods: {
    emitListeners() {
      this.$listeners.emitListeners("click")
    }
  }
}
</script>
```

### 1.1.5 provide/inject

> provide/inject成对使用的，只要上一级声明了provide，无论子组件有多深都可以通过inject访问到provide的值。

```js
// 上一级
export default {
  provide() {
    return {
      target: this.baseTarget
    }
  },
  data() {
    return {
      baseTarget: "xxxx"
    }
  }
}

// 下一级
export default {
  inject: ["target"]
}
```