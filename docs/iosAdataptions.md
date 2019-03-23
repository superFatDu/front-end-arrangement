##### 移动端开发遇到的一些需要适配处理的问题
1. input输入框ios点击确定后内容不复原
```$xslt
export function iosBack() {
  let els = document.querySelectorAll("input");
  for (let i = 0; i < els.length; i++) {
    els[i].addEventListenner("blur", function() {
      window.scroll(0, 0);  // IOS的input框失去焦点，让window的scrollX/scrollY都回归0
    })
  }
}
```