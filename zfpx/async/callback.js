// 1. 示例 异步执行顺序
let fs = require("fs");
console.log("开始");
fs.readFile("./asyncIntro.js", "utf8", (err, data) => {
  if (err) {
    console.log('err :', err);
  } else {
    console.log('data :', data);
  }
})
console.log("结束");  // 打印顺序：开始 => 结束 => err(读文件是一个异步操作)

// 2. 回调地狱 =》 比如模板为template.txt;数据为data.txt
fs.readFile("./template.txt", "UTF8", (err, template) => {
  fs.readFile("./data.txt", "UTF8", (err, data1) => {
    fs.readFile("./data.txt", "UTF8", (err, data2) => {
      fs.readFile("./data.txt", "UTF8", (err, data3) => {
        fs.readFile("./data.txt", "UTF8", (err, data4) => {
          console.log(`${template} - ${data4}`);
        })
      })
    })
  })
})
// 3. 解决方案
let eventEmitter = require("events");
let eve = new eventEmitter(); // eve.on 注册监听；eve.emit 发射事件
let html = {}; // target
fs.readFile("./template", "utf8", (err, template) => {
  eve.emit("ready", "template", template); // 注册监听事件名称；key；value
});
fs.readFile("./data.txt", "UTF8", (err, data) => {
  eve.emit("ready", "data", data); // 注册监听事件名称；key；value
});
eve.on("ready",(key, value) => {
  html[key] = value;
  if (Object.keys(html).length === 2) {
    console.log('html :', html);
  }
});