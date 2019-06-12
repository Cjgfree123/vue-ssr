let Vue = require("vue");
let express = require("express");
let app = express();

// 1.vue提供的服务端渲染的包
let VueServerRenderer = require("vue-server-renderer");
// 2.创建vue实例
let vm = new Vue({
    template:'<div>hello world</div>'
});
// 3.创建渲染函数
let render = VueServerRenderer.createRenderer();

app.get("/",(req,res)=>{
    // 潜藏bug: render.renderToString默认返回promise，但是采用promise写法，会导致问题：有时候，会不去加载部分js文件
    render.renderToString(vm,function(err,html){
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Document</title>
            </head>
            <body>
                ${html}
            </body>
            </html>
        `);
    })
});

app.listen(3001,()=>{
    console.log("app listen at 3001");
});