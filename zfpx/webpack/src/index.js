console.log("hello");
// npx 可以直接运行node_modules/.bin目录下的命令
// 通过配置package.json中的script "build": "webpack --mode development"

// 可以在js里，在入口文件中加载css文件
// 因为css并不是js模块，所以需要loader工具转换。
// 配置webpack.config.js文件中module

require("./index.css");

// ERROR in ./src/index.css 1:0
// Module parse failed: Unexpected token (1:0)
// You may need an appropriate loader to handle this file type.