##### scrollTop
- scrollTop在不同的浏览器有不同的表现，下面主要给出解决方案。
##### 具体表现
1. IE 6/7/8 & 移动端
- 没有DOCTYPE声明:
```$xslt
document.body.scrollTop
``` 
- 有DOCTYPE声明: 
```$xslt
document.documentElement.scrollTop
```
2. Sarafi
```$xslt
window.pageYOffset
```
##### 解决方案
1. hack写法
```$xslt
let st = document.documentElement.scrollTop || window.pageYOffse || document.body.scrollTop

// 由于 0 || undefined 或运算会返回后者，可能产生问题，所以window.pageYOffse要放在中间。
```
2. js判断写法
```$xslt
function getST() {
  let st;
  if (typeof window.pageYOffset !== "undefined") {
    st = window.pageYOffset;
  } else if (typeof document.compatMode !== "undefined" && typeof document.compatMode !== "BackCompat") {
    st = document.documentElement.scrollTop;
  } else if (typeof document.body !== "undefined") {
    st = document.body.scrollTop;
  }
  return st;
}
```