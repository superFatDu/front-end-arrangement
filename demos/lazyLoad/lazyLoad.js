let viewHeight = document.documentElement.clientHeight;
function lazyLoad() {
  let ele = document.querySelectorAll("img[data-src][lazyload]");
  ele.forEach((item, index) => {
    let boundingRect = item.getBoundingClientRect();
    if (item.dataset.src === "") return false;
    if (boundingRect.bottom > 0 && boundingRect.top <viewHeight) {
      let img = new Image();
      img.src = item.dataset.src;
      img.onload = () => {
        item.src = img.src;
      }
      item.removeAttribute("lazyload");
      item.removeAttribute("data-src");
    }
  })
}
lazyLoad();
document.addEventListener("scroll", lazyLoad);
