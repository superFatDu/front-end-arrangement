# React总结

## 1. 搭环境

> 此处默认各位都是有那么一点前端开发经验的，所以Node自行安装。

### 1.1 脚手架

- 官方推荐 => create-react-app

```bash
// install
$ npm install -g create-react-app
```

### 1.2 起项目

#### 1.2.1 package.json

```bash
// setting
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

#### 1.2.2 start

```bash
// start
$ npm run start
```

#### 1.2.3 打包

```bash
// start
$ npm run build
```

## 2. 项目结构

```
|public
|----|favicon.ico
|----|index.html
|dist
|src 
|----|common
|    |pages
|    |statics
|    |----|img
|    |    |iconfont
|    |store
|    |----|index.js
|    |    |reducer.js
|    |    |actionTypes.js
|    |    |actionCreators.js
|    |App.js
|    |index.js
|package.json
|README.md
```

## 3. 入口文件

- /src/index

- 指定渲染的文件以及渲染的文件插入的DOM节点（document.getElementById('root')）。

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

## 4. 渲染的入口文件

- /src/App.js

- 路由/全局样式/派发store……

```js
import React, { Component } from 'react';
import { GlobalStyle, RouteStyle } from "./style";
import { FontGlobal } from "./statics/iconfont/iconfont";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";
import store from "./store"

class App extends Component {
  render() {
    const providerStyle = {
      width: "100%",
      height: "100%"
    };
    return (
      <Provider store={store}>
        <div style={providerStyle}>
          <GlobalStyle />
          <FontGlobal />
          <BrowserRouter>
            <RouteStyle>
              <Route path="/" exact component={Home} />
              <Route path="/detail" exact component={Detail} />
            </RouteStyle>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
```

### 4.1 路由

- 依赖包 => react-router-dom

#### 4.1.1 install

```
$ npm i react-router-dom -S
```

#### 4.1.2 路由表

```
import { BrowserRouter, Route } from "react-router-dom";

<BrowserRouter>
  <Route path="/" exact component={Home} />
  <Route path="/detail" exact component={Detail} />
</BrowserRouter>
```

- exact精确匹配path路径。

- component表示当前路径加载组件。

#### 4.1.3 路由传参

##### 4.1.3.1 通配符

- 刷新页面参数不会丢失，但很丑

```
// Route
<Route path='/path/:name' component={}/>

// Link组件
<Link to="/path/xxx"></Link>

// 取参
this.props.match.params.name
```

##### 4.1.3.2 query

- 好看但会丢失参数

```
// Route
<Route path='/path' component={}/>

// Link组件
<Link to="{{ pathname: "/path", query: "queryValue" }}></Link>

// 取参
this.props.location.query
```

##### 4.1.3.3 state

- 同query

```
// Route
<Route path='/path' component={}/>

// Link组件
<Link to="{{ pathname: "/path", state: "stateValue" }}></Link>

// 取参
this.props.location.state
```

#### 4.1.4 路由跳转

##### 4.1.4.1 Link

```
<Line to="/path"></Link>
```

##### 4.1.4.2 history.push

```
this.props.history.push({ pathname:' /user', ……})
```

### 4.2 样式

- 依赖包 => styled-components

- 将页面中的标签等用js封装成样式的组件。

#### 4.2.1 全局样式

```
// 1. 导出GlobalStyle
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html {
  width: 100%;
  height: 100%;
}
`;

// 2. 在渲染入口文件中添加
<Provider>
  <div style={providerStyle}>
    <GlobalStyle />
    <FontGlobal />
    <BrowserRouter>
      <RouteStyle>
        <Route path="/" exact component={Home} />
        <Route path="/detail" exact component={Detail} />
      </RouteStyle>
    </BrowserRouter>
  </div>
</Provider>
```

#### 4.2.2 局部样式

```js
import styled from "styled-components";

export const Img = styled.img.attrs({
  src: xxx
})`
  width: 100px;
  height: 100px;
`;

// 导入使用
<Img/>
```

### 4.3 派发store

```
import { Provicer } from "react-redux";
import store from "./store"

<Provicer store={store}>
  // 组件内都能接收到store
</Provicer>
```

#### 4.3.1 组件内接收

```
import { connect } "react-redux";

class Header extends Component {
  render() {
    return (
      <div onClick={this.props.handleDispach}>Hello</div>
      this.props.login
        ? <div>Logout</div>
        : <div>Login</div>
    )
  }
}

const mapStateToProps = (state) => ({
  // 映射store里面的值
  login: state.get("login")
});

const mapDispatchToProps = (dispatch) => {
  return {
    // 接受挂载在props上的方法  
    handleDispach() {
      // TODO
      dispatch(action);
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Heacer);
```

## 5. redux

- 依赖包 => redux/react-redux/redux-thunk/immutable/redux-immutable

### 5.1 redux

- 用于构建store实例

```
import { createStore ,applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
```

### 5.2 react-redux

- 用于派发store，在页面中映射state数据等。

- 如上4.3.

### 5.3 redux-thunk

- 同过redux的中间件使用thunk。

- 用于在actionCreator.js中返回一个函数。

- 异步数据的处理。

```js
// 1. 普通数据
export const handleSwitchList = (value) => ({
  type: actionTypes.SWITCH_LIST,
  value
});

// 2. 异步数据 =》 提供dispatch方法将action传给页面供用户调用。
// mapDispatchToProps(dispatch)会派发action。
export const handleRecommendList = () => {
  return (dispatch) => {
    axios.get("/api/recommendList.json").then(res => {
      res = res.data.data;
      dispatch(handleRecomList(res));
    }).catch(err => {
      throw Error(err);
    })
  }
};
```

### 5.4 immutable

- 用于将数据结构变成immutable形式，强制修改会报错。

```js
// reducer.js
import { fromJS } from "immutable";

const defaultState = fromJS({
  value: xxxx
}) 

export default (state, action) => {
  if (action.type ==="xxx") {
    return state.set("value", state.get("value"));
  }
}
```

### 5.5 redux-immutable

- 用于将多个reducer合并。

```js
import { combineReducers } from "redux-immutable";
import { reducer as headerReducer } from "../common/header/store";
import { reducer as homeReducer } from "../pages/home/store";
import { reducer as loginReducer} from "../pages/login/store";

export default combineReducers({
  header: headerReducer,
  home: homeReducer,
  login: loginReducer
})
```

## 6. 动画

- 依赖包 => react-transition-group

- 具体上GitHub

## 7. 生命周期函数

- [官网](https://www.reactjs.org/)