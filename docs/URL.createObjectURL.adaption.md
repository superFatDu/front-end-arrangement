# 1. URL.createObjectURL兼容性处理

- window.URL.createObjectURL()可以直接生成blob:开头的链接，该链接产生于浏览器端，不会占用服务器资源。

## 1.1 IE/Edge和其他浏览器的差异性

- 生成的blob:链接，你不能把它加到一个<a></a>节点上。

- 不能直接在浏览器地址栏打开访问，并且得到“Error: 拒绝访问。

## 1.2 生成的bolb链接格式差异

- chrome和firefox生成的带有当前域名的标准blob:链接形式。

```js
blob:http://www.xx.com:78728782347239749238749238749239847
```

- IE/Edge生成的不带域名的非标准blob:链接形式。

```js
blob:7908374983279482793472934793274923874932847
```

## 1.3 解决方式

- Blob URL is not supported by IE/Edge due to security restrictions。

- IE/Edge had it's own API for creating and downloading file,which is called msSaveOrOpenBlob()。

- cross-browser solution:

```js
// solution
let blobShow = (content, fileName) => {
  let blobFile = new Blob([content]);
  /**
  * 判断是否支持window.navigator && window.navigator.msSaveOrOpenBlob
  * @return {boolean}
  */
  if(window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blobFile, fileName);
  } else {
    let url = window.URL.createObjectURL(blobFile);
    let ele = `<img src=${url} alt=${fileName} />`;
    // TODO
    document.appendChild(ele);
  }
}
```