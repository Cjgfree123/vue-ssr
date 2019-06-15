let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let merge = require("webpack-merge");
let base = require("./webpack.base");

module.exports = merge(base, {
    // 入口文件
    entry:{
        client: path.resolve(__dirname, "../src/client.entry.js"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "../public/index.html"),
        }),
    ],
});