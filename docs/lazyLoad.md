### lazyload
懒加载也叫延迟加载，指的是在长网页中延迟加载图像，当屏幕滚动到当前图像时，图像加载，提升
优化网页性能。
##### 1. 好处
1. 提升用户体验，减少一屏的图像当前请求数量，减少当前请求时间。
2. 减少无效资源的加载。
3. 防止并发数量过多，阻塞js的加载，以免影响网页的正常显示。
##### 2. 原理
将要加载的img的src属性暂时用空字符串代替，将图像的真实路径放在data-original属性中，
监听页面的scroll事件，在scroll的callback中判断懒加载的图片是否进入可视区域，如果是，
则将data-original中的值取出set到src中。
##### 3. 实现
```
// html
<div class="lazy-load">
    <img src="" data-original="./xxx.jpg" lazyload="true" />
    <img src="" data-original="./xxx.jpg" lazyload="true" />
    <img src="" data-original="./xxx.jpg" lazyload="true" />
    <img src="" data-original="./xxx.jpg" lazyload="true" />
    <img src="" data-original="./xxx.jpg" lazyload="true" />
    <img src="" data-original="./xxx.jpg" lazyload="true" />
    img * n
</div>
```
```
// script
let viewHeight = document.documentElement.clientHeight;  // 当前设备的屏高
function lazyLoad() {
    let ele = document.querySelectorAll('img[data-original][lazyload]');
    le.forEach((item, index) => {
        let rect = item.getBoundingRect();  // 获取元素相对视窗的位置
        if (item.dataset.original === "") return false;
        if (rect.bottom > 0 && rect.top < viewHeight) {  // 如果元素在可视区
            let img = new Image();
            img.src = item.dataset.original;
            img.onload = () => {
                item.src = img.src;
            }
            item.removeAttribute（"data-original"）//移除属性，下次不再遍历
            item.removeAttribute（"lazyload"）
        }
    })
}
lazyLoad();  // 渲染结束触发一次函数
document.addEventListener("scroll", lazyLoad); // 监听scroll,并在回调中调用lazyLoad();
```