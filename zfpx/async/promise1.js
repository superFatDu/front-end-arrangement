// 1. 示例
function myPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
     let num = Math.random();
     if (num < 0.5) {
       resolve(num);
     } else {
       reject("error");
     } 
    })
  })
}
let p = myPromise();
p.then(res => { // then()的回调是两个函数，一个是resolve()的callback，一个是reject()的callback。
  console.log(res);
}, error => {
  console.log(error);
})