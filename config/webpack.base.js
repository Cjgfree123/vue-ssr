let path = require('path');
let webpack = require("webpack");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let VueLoaderPlugin = require('vue-loader/lib/plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin'); //引入清除文件插件

module.exports = {
    mode:"production",
    // 出口文件
    output:{
        filename:'[name].bundle.js',// 分成client server
        path:path.resolve(__dirname,"../dist")
    },
    // 管理模块
    module:{
        rules:[
            {
                test:/\.js/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env'],
                        plugins:[
                            "@babel/plugin-syntax-dynamic-import",
                        ]
                     },
                },
                exclude:/node_modules/,
            },
            {test:/\.css$/,use:['vue-style-loader','css-loader']},
            {test:/\.vue$/,use:'vue-loader'}
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),//实例化，参数为目录
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
           filename:"index.html",
           template: path.join(__dirname,"../public/index.html"),
        }),
        // 热替换
        new webpack.HotModuleReplacementPlugin(),
    ],
    // 开启本地服务器
    devServer: {
        host: 'localhost',
        port: 4000,
        open: true,
        hot: true // 还需要配置一个插件 HotModuleReplacementPlugin
    },
    performance: {
        // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
        hints: "warning",
        // 开发环境设置较大防止警告
        // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
        maxEntrypointSize: 5000000, 
        // 最大单个资源体积，默认250000 (bytes)
        maxAssetSize: 3000000
    }
}