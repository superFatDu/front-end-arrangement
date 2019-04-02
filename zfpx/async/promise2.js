// import Promise from './Promise';
let Promise = require("./Promise.js");

let myP = new Promise((resolve, reject) => {
  setTimeout(() => {
    let num = Math.random();
    if (num < 0.5) {
      resolve(num);
    } else {
      reject("error");
    }
  })
});
myP.then(res => {
  console.log(res);
}, err => {
  console.log(err);
});