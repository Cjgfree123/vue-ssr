let path = require('path');
let webpack = require("webpack");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // 入口文件
    entry:'./src/app.js',
    // 出口文件
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname)
    },
    // 管理模块
    module:{
        rules:[
            {
                test:/\.js/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                     },
                },
                exclude:/node_modules/,
            },
            {test:/\.css$/,use:['vue-style-loader','css-loader']},
            {test:/\.vue$/,use:'vue-loader'}
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
           filename:"index.html",
           template: path.resolve(__dirname,"public/index.html"),
        }),
        // 热替换
        new webpack.HotModuleReplacementPlugin(),
    ],
    // 开启本地服务器
    devServer: {
        contentBase: path.resolve(__dirname,"public/index.html"),//对外提供的访问内容的路径, //不设置的话，默认是当前执行的目录，一般是项目根目录。会在项目根目录查找index.html文件。
        host: 'localhost',
        port: 4000,
        open: true,
        hot: true // 还需要配置一个插件 HotModuleReplacementPlugin
    },
}