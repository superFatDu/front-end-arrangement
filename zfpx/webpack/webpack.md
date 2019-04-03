# webpack

## 1.在项目中安装webpack(不需要全局安装)

```bash
npm install webpack webpack-cli -D
```

## 2.入口文件

```bash
./src/index.js
```

## 3.打包文件夹

```bash
./dist
```

## 4.配置

```js
// 1. 新建文件 =》 webpack.config.js
// 2. 内容如下：
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"), // 文件输出路径必须是绝对路径
    filename: "bundle.js"
  },
  module: {

  },
  plugins: [],
  devSever: {

  }
}
```

## 5.打包方式

### 1. npx

```js
// npx可以直接运行node_modules/.bin目录下的命令

$ npx webpack
```

### 2. package.json

```js
// 1. 生成package.json
$ npm init => package.json

// 2. 配置
"scripts": {
  "build": "webpack --mode development"
}

// 3. 打包
$ npm run build
```