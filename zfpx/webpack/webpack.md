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