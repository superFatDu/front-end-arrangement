/**
 * 防抖函数 单位delay时间内如果重复触发，则重新计时
 * @param fn {Function}  callback
 * @param delay {Number} 
 * @returns {Function}
 * @author superduchengwu@gmail.com
 */
const debounce = (fn, delay = 1000) => {
  let timer = 0;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}

/**
 * 节流函数 单位delay时间内只执行一次函数
 * @param fn {Function}  callback
 * @param delay {Number} 
 * @returns {Function}
 * @author superduchengwu@gmail.com
 */
const throttle = (fn, delay = 1000) => {
  let lastTime = 0;
  return (...args) => {
    let nowTime = +new Date();
    if (nowTime - lastTime > delay) {
      lastTime = nowTime;
      fn.apply(this, args);
    }
  }
}

export { debounce, throttle };
