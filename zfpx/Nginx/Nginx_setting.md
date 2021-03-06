# Nginx Practice

## 2.1  静态资源web服务

- 静态资源：一般客户端发送请求到web服务器，web服务器从内存取到响应文件，返回到客户端，客户端解析并渲染显示。

- 动态资源：一般客户端请求的动态资源，先将请求交与web容器，web容器连接数据库，数据库处理数据之后，将内容交到web服务器，web服务器返回到客户端解析渲染。

| 类型 | 种类 |
| :---| :---: |
| 浏览器渲染 | HTML,CSS,JS |
| 图片 | JPEG,GIF,PNG |
| 下载文件 | Word,Excel |

## 2.2 CDN

- CDN的全称是Content Delivery Network，即内容分发网络。

- CDN系统能够实时地根据网络流量和各节点的链接，负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。其目的是使用户可就近取得所需内容，解决Internet网络拥挤的状况，提高用户访问网站的响应速度。

## 2.3 代理

```js
location ^/api {
  proxy pass "xxx.xxx.xxx"
}
```

## 2.4 例子

```js
server {
  listen 0.0.0.0:8080;
  listen [::]:8080;
  
  server_name xxx.com
  index index.html
  
  location /subURL {
    # 别名文件目录
    alias /var/www/****;
    try_files $uri/ /subURL/index.html;
  }
  
  location /api/ {
    proxy_set_header Host $host;
    proxy_pass http://xxxx.com;
  }
}
```
