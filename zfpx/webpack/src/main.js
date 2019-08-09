// 一下内容调试图片打包
let src = require("./image/avator.jpg");
let img = new Image();
img.src = src;
document.body.appendChild(img);

require("./index.css");
require("./less.less");
require("./sass.scss");

// 一下内容测试ES
// import name from "./ES.js";
// console.log('name :', name);
// let getName = () => name;
// console.log(getName());