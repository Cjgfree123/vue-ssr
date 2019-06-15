let base = require("./webpack.base");
let merge = require("webpack-merge");
let path = require("path");
let HWP = require("html-webpack-plugin");

module.exports = merge(base, {
    target:"node", // 打包出的结果，给node使用
    entry:{
        server: path.resolve(__dirname,"../src/server.entry.js"),
    },
    output:{
        libraryTarget:"commonjs2", // module.exports = server.entry.js 打包出的是: 服务端的入口文件
    },
    plugins:[
        // 配置服务端模板
        // 把public目录下的内容，拷贝到 dist目录下

        // 后期可以使用 dllPlugin
        new HWP({
            filename:"index.ssr.html",
            template: path.resolve(__dirname,"../public/index.ssr.html"),
            excludeChunks: [
                "server",
            ],
        }),
    ]
});
