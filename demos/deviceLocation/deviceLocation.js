/**
 * getDeviceLocation
 * 
 * @description 使用高德地图api获取当前坐标
 * @param data.position.lng {Number} 经度longitude
 * @param data.position.lat {Number} 纬度latitude
 * @author duchengwu@ccx.cn
 */
(function getDeviceLocation() {
  // 1. 动态添加script引入高德地图JS API并指定加载的回调函数
  var url = 'https://webapi.amap.com/maps?v=1.4.14&key=d43baeff269f211bcd43b299ee04b9fb&callback=showDeviceLocation';
  var jsapi = document.createElement('script');
  jsapi.charset = 'utf-8';
  jsapi.src = url;
  document.head.appendChild(jsapi);

  // 2. JS API主题资源加载完毕自动调用回调函数
  window.showDeviceLocation = function() {
    var mapObj = new AMap.Map('');
    mapObj.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0           //定位结果缓存0毫秒，默认：0
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
    });
    function onComplete(data) {
      console.log(`当前坐标为：(${data.position.lng}:${data.position.lat})`);
    }
  }
})();