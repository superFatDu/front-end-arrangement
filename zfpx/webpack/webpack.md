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
  devSever: { // 配置服务器，预览打包后的文件

  }
}
```

## 5.打包方式

### 1. npx

```js
// npx可以直接运行node_modules/.bin目录下的命令
// 由于没有配置 --mode development，所以打包的输出文件很干净

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

// 3. 打包，由于配置了 --mode development，所以打包输出文件很多的注释
$ npm run build
```

## 6. output

```js
Hash: 750993dc20af5979aa5f
Version: webpack 4.29.6
Time: 441ms
Built at: 2019-04-03 12:20:34
            Asset      Size  Chunks             Chunk Names
bundle_webpack.js  23.5 KiB    main  [emitted]  main
Entrypoint main = bundle_webpack.js
[./node_modules/css-loader/dist/cjs.js!./src/index.css] 213 bytes {main} [built]
[./src/index.css] 1.06 KiB {main} [built]
[./src/index.js] 211 bytes {main} [built]
    + 3 hidden modules
```

## 7. 配置webpack-server

### 1. 安装依赖webpack-dev-serve

```baxh
// install
$ npm install webpack-dev-server -D
```

### 2. webpack.config.js

```js
devServer: {
  contentBase: "./dist", // 静态目录
  host: "localhost",
  port: 8080,
  compress: true // 是否压缩
}
```

### 3. webpack.json

```js
"scripts": {
  "build": "webpack --mode development",
  "dev": "webpack-dev-server --open --mode development"
}
```

### 4. 启动

```bash
// start up
$ npm run dev
```

## 8. 将打包输出文件添加到模板文件中

### 1. 安装依赖 html-webpack-plugin

```bash
// install
$ npm install html-webpack-plugin -D
```

### 2. 配置webpack.config.js

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
plugins: [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "index.html", // 路径是打包输出绝对路径下
    title: "webpack",
    hash: true, // 在资源后加上hash值，防止缓存
    minify: {
      removeAttributeQuotes: true // 压缩
    }
  })
]
```

### 3. 重新打包后

```js
// webpack
$ npm run build

// ./dist目录下多出一个index.html文件
<body>
  <div class=app>
    <span>This is a test page.</span>
  </div>
  <script type=text/javascript src=bundle_webpack.js?89e996844e15665a20f8></script>
</body>

// 运行服务器
$ npm run dev
```

## 9. 支持图片

### 1. 为了方便调试，更换入口文件为main.js

```js
let src = require("./src/image/avator.jpg");
let img = new Image();
img.src = src;
document.body.appendChild(img);
```

### 2. 设置webpack.config.js

```js
// 1. 图片需要loader
module: {
  rules: [
    {
      // file-loader解析图片地址，把图片从源位置拷贝到目标位置并修改原引用位置
      test: /\.(png|jpg|gif|svg|bmp)/,
      use: "file-loader"
    }
  ]
}
```

### 3. 使用

#### 3.1 直接打包插入

```js
let src = require("./src/image/avator.jpg");
let img = new Image();
img.src = src;
document.body.appendChild(img);
```

#### 3.2 背景图片

```css
.avator {
  width: 50px;
  height: 50px;
  background: url("./image/avator.jpg") no-repeat;
  background-size: cover;
}
```

#### 3.3 img标签插入

##### 3.3.1 需要引入依赖html-withimg-loader

```bash
// install
$ npm install html-withimg-loader -D
```

##### 3.3.2 配置webpack.config.js

```js
const HtmlWithImgLoader = require("html-withimg-loader");
module: {
  rules: [
    {
      test: /\.(html|htm)/,
      loader: "html-withimg-loader"
    }
  ]
}
```

## 10. less/sass支持

### 10.1 创建less/sass文件

```bash
touch less.less
touch sass.scss
```

### 10.2 安装依赖

```bash
// install
npm install less less-loader node-sass sass-loader -D
```

### 10.3 配置webpack.config.js

```js
module: {
  rules: [
    {
      test: /\.less$/,
      loader: ["style-loader", "css-loader", "less-loader"]
    },
     {
      test: /\.scss$/,
      loader: ["style-loader", "css-loader", "sass-loader"]
    }
  ]
}
```

### 10.4 其他需求

 1. 有的时候希望把页面中的css文件单独来出来保存加载
 2. plugin: extract-text-webpack-plugin

#### 10.4.1 安装依赖

```bash
// install
$ npm install extract-text-webpack-plugin -D
```

#### 10.4.2 配置webpack.config.js

```js
// 新建各自的提取实例
let cssExtract = new ExtractTextWebpackPlugin("css.css");
let lessExtract = new ExtractTextWebpackPlugin("less.css");
let sassExtract = new ExtractTextWebpackPlugin("sass.css");

// 将实例放到plugin中
plugin: [
  cssExtract,
  lessExtract,
  sassExtract
]

// 修改module.rules
module: {
  rules: [
    {
      test: /\.css$/,
      loader: cssExtract.extract({
        use: ["css-loader"]
      })
    },
    {
      test: /\.less$/,
      loader: cssExtract.extract({
        use: ["css-loader", "less-loader"]
      })
    },
    {
      test: /\.scss$/,
      loader: cssExtract.extract({
        use: ["css-loader", "sass-loader"]
      })
    }
  ]
}
```

#### 10.4.3 坑

1. DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead => plugin不支持webpack4

2. 解决方法

```bash
// install next version
$ npm install extract-text-webpck-plugin@next
```