# 1. ES6/7编译

## 1.1 安装依赖包

```js
// install
npm install babel-loader babel-core babel-preset-env babel-preset-stage-0 babel-preset-react -D
```

### 1.2 配置webpack.config.js

```js
module: {
  rules: [
    {
      test: /\.js$/,
      use: {
        loader: "babel-loader",
        query: {
          presets: ["env", "stage-0", "react"]
        }
      }
    }
  ]
}
```

### 1.3 创建ES.js

```js
export default "Robin";
```

### 1.4 main.js

```js
import name from "./ES";
console.log(name);
```