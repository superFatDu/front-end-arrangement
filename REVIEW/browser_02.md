# 1 浏览器知识总结02

## 1.1 浏览器缓存机制

> 缓存时性能优化中简单高效的一种方式，它可以显著的减少网络请求传输带来的损耗。

- 一个数据请求的过程，可以分为网络请求，后端处理，浏览器响应三个阶段。而浏览器缓存机制可以帮助我们在第一步和第三部中性能优化。接下来从这几个方面探讨：1.缓存位置；2.缓存策略；3.实际应用场景。

### 1.1.1 缓存位置

> 各个缓存的位置有自己的优先级，当依次都没有命中的时候，才会去请求网路：

1. Service Worker
2. Memory Cache
3. Dist Cache
4. Push Cache
5. 网络请求

#### 1.1.1.1 Service Worker

> Service Worker是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。本质上充当了Web应用程序与浏览器之间的代理服务器。它旨在能够创建有效的离线体验，拦截网络请求并基于网络是否可用及更新的资源是否驻留在服务器上来采取适当的动作。他们还允许访问推送通知和后台同步API。

- 出于安全考虑，Service Workers只能由HTTPS承载，修改网络请求的能力暴露给中间人攻击会非常危险。

**注意：**

1. Service Workers优先于同类尝试（如AppCache），因为他们无法支持当操作出错时终止操作，而Service Workers可以更加细致地控制每一件事情。
2. Service Workers大量使用Promise，因为通常它们会等待响应后继续，并根据响应返回一个成功或者失败的操作。

![sw-lifecycle](./img/sw-lifecycle.png)

![sw-events](./img/sw-events.png)

![sw-fetch](./img/sw-fetch.png)

- Service Workers使用步骤：[MDN梯子](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)

1. service worker URL 通过 serviceWorkerContainer.register() 来获取和注册。
2. 如果注册成功，service worker 就在 ServiceWorkerGlobalScope 环境中运行； 这是一个特殊类型的 woker 上下文运行环境，与主运行线程（执行脚本）相独立，同时也没有访问 DOM 的能力。
3. service worker 现在可以处理事件了。
4. service worker 控制的页面打开后会尝试去安装 service worker。最先发送给 service worker 的事件是安装事件(在这个事件里可以开始进行填充 IndexDB和缓存站点资源)。这个流程同原生 APP 或者 Firefox OS APP 是一样的 — 让所有资源可离线访问。
5. 当 oninstall 事件的处理程序执行完毕后，可以认为 service worker 安装完成了。
6. 下一步是激活。当 service worker 安装完成后，会接收到一个激活事件(activate event)。 onactivate 主要用途是清理先前版本的service worker 脚本中使用的资源。
7. Service Worker 现在可以控制页面了，但仅是在 register()  成功后的打开的页面。也就是说，页面起始于有没有 service worker ，且在页面的接下来生命周期内维持这个状态。所以，页面不得不重新加载以让 service worker 获得完全的控制。

- 例子

```js
// app.js（入口文件）：注册
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw-test/sw.js', { scope: '/sw-test' })
    .then(function(reg) {
      console.log('service worker 注册成功')
    })
    .catch(function(err) {
      console.log('service worker 注册失败')
    })
}

// sw.js：安装/激活 =》 install事件会在安装完成之后触发。
this.addEventListener('install', function(event) {
  event.waitUntil( // 确保SW在waitUntil()里面的代码执行完毕前安装完成
    caches.open('v1').then(funtion(cache) { // 创建一个名叫v1的新的缓存
      return cache.addAll([ // 想要缓存的资源的列表
        '/sw-test/',
        '/sw-test/index.html',
        '/sw-test/app.js',
        '/sw-test/style.css'
      ])
    })
  )
})

// 拦截所有请求事件
// 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据
this.addEventListener('fetch', funtion(event) {
  event.responseWith( // 劫持HTTP响应
    // 对网络请求的资源和 cache 里可获取的资源进行匹配，查看是否缓存中有相应的资源
    caches.match(event.request).then(function(res) {
      if (res) {
        // TODO
      }
      console.log('fetch source')
    })
  )
})
```