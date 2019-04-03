const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"), // 输出的文件夹只能是绝对路径
    filename: "bundle_webpack.js"
  },
  module: {

  },
  plugins: [],
  devServer: {

  }
}