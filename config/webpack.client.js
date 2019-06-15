let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let merge = require("webpack-merge");
let base = require("./webpack.base");

module.exports = merge(base, {
    mode:"development", // 客户端，也需要区分 本地/生产环境
    // 入口文件
    entry: path.resolve(__dirname, "../src/entry-client.js"),
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "../public/index.html"),
        }),
    ],
});