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
}