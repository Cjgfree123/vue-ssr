## 介绍

运行

```
node server.js
```

## 安装模块

```
npm install  webpack webpack-cli babel-loader @babel/preset-env @babel/core vue vue-template-compiler vue-loader vue-style-loader css-loader html-webpack-plugin webpack-merge webpack-dev-server -D
```

模块说明:

* webpack需要的: webpack webpack-cli
    * 合并webpack: webpack-merge configureWebpack
    * 本地静态服务，自动刷新: webpack-dev-server HotModuleReplacementPlugin(webpack内置插件)
      （备注: 安装 webpack-dev-server之后，npx webpack-dev-server, 即可看到浏览器自动打开，并加装构建后的html文件。）

* 处理es6/7语法的: babel-loader @babel/preset-env @babel/core

* 处理编译vue模板的: vue vue-template-compiler vue-loader 
   * 因为vue的执行会调用vue-template-compiler，所以 vue-template-compiler 、 vue 两个模块，版本必须一致
   * vue-template-compiler 编译vue中template模板

* 处理样式: vue-style-loader css-loader
    * 因为普通style-loader不支持服务端渲染，此时vue提供功能一致的 vue-style-loader插件

* 处理html: html-webpack-plugin

