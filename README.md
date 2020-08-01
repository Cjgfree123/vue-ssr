## 介绍 (vue ssr)

技术: vue + express

运行

```

后端服务 (服务端渲染)
nodemon node-server.js
__________________

客户端(开发环境)
npm run client:dev

客户端(生产环境)
npm run client:build

服务端(生产环境)
npm run server:build
________________
```

## 目录

public
    |_index.html 客户端
    |_index.ssr.html 服务端

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

## 原理

```
// 1. 安装vue-ssr(服务端渲染的包)
let VueServerRenderer = require("vue-server-renderer");
// 2. 加载打包后的服务端js和template文件
let serverBundle = fs.readFileSync("./dist/server.bundle.js", "utf8");
let template = fs.readFileSync("./dist/index.ssr.html", "utf8");
// 3.创建渲染函数render
let render = VueServerRenderer.createBundleRenderer(serverBundle, {
    template, // ssr文件
});

// 4.把服务端页面，挂载到路由上
app.get("/", async (req, res) => {
    // 把渲染成功的字符串, 扔给客户端。 只是返回一个字符串，并没有实际vue功能
    let context = {
        url: req.url,
    };

    await render.renderToString(context, function (err, data) {
        if(err) throw err;
        res.send(data);
    });
});
```

## 遇见问题

1.报错: clean-webpack-plugin 不是构造函数  

解决: 

```
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    ...
    plugins: [
            new CleanWebpackPlugin({}) // options只能对象
    ]
}
```

https://juejin.im/post/5cfe0f435188256073337e42 【参考】

2. 如下，entry中键值(client), 将会对应output文件名name ( [name].bundle.js ),如:client.bundle.js

```
entry:{
    client: path.resolve(__dirname, "../src/client.entry.js"),
},
```

即: webpack: output中 [name]名字，取决于entry: { k: v }中的k.

3. （待解决）

命中路由，但是视图没有显示?

4. 问题: 使用vuex,如果 服务端操作了store,但是客户端没有同步操作，导致看到的store是旧的数据。

解决:

必须判断，仅仅允许在服务端操作store。

5. 一般，刷新页面才会走服务端，正常切换tab与页面会走客户端。

如果需要路由即走客户端，又走服务端？

解决: mounted + asyncData

6. 

npm run build:server // 打包出新的包

nodemon node-server.js // 渲染出新的页面

