const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

/**
 * css 单独拉出来
 * 使用plugin：ExtractTextWebpackPlugin
 */
let cssExtract = new ExtractTextWebpackPlugin("css/css.css");
let lessExtract = new ExtractTextWebpackPlugin("css/less.css");
let sassExtract = new ExtractTextWebpackPlugin("css/sass.css");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.join(__dirname, "dist"), // 输出的文件夹只能是绝对路径
    filename: "bundle_webpack.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 转换文件的正则匹配
        // loader: ["style-loader", "css-loader"] // style-loader: 把css文件变成style标签插入到head中/css-loader: 解析css文件中的url路径
        loader: cssExtract.extract({
          use: ["css-loader", "postcss-loader"]
        })
      },
      {
        test: /\.(png|jpg|gif|svg|bmp)/,
        loader: "file-loader" // file-loader解析图片地址，把图片从源位置拷贝到目标位置并修改原引用位置
        // loader: {
        //   loader: "file-loader",
        //   options: {
        //     outputPath: "images/" // 当想把图片都打包到一个包下面时使用
        //   }
        // }
        // loader: {
        //   loader: "url-loader", // 可以在文件比较小的时候，直接变成base64字符串内嵌到页面中
        //    options: {
        //    limit: 5 *1024  
        //   }
        // }
      },
      {
        test: /\.(html|htm)/,
        loader: "html-withimg-loader"
      },
      {
        test: /\.less$/,
        //loader: ["style-loader", "css-loader", "less-loader"]
        loader: lessExtract.extract({
          use: ["css-loader", "less-loader", "postcss-loader"]
        })
       
      }, 
      {
        test: /\.scss$/,
        //loader: ["style-loader", "css-loader", "sass-loader"]
        loader: sassExtract.extract({
          use: ["css-loader", "sass-loader", "postcss-loader"]
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 每次打包前首先清空dist文件夹
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 模板文件
      filename: "index.html", // 输出文件名，路径为上方的path
      title: "webpack",
      hash: true, // 在资源后加上hash值，防止缓存
      minify: {
        removeAttributeQuotes: true // 压缩
      }
    }),
    cssExtract,
    lessExtract,
    sassExtract
  ],
  devServer: {
    contentBase: "./dist",
    host: "0.0.0.0",
    port: 8080,
    compress: true, // 服务开启gzip压缩
    open: true // 自动打开本地服务器
  }
}