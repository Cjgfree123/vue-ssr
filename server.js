let Vue = require("vue");
let express = require("express");
let app = express();
let fs = require("fs");

// 1.vue提供的服务端渲染的包
let VueServerRenderer = require("vue-server-renderer");

// 2.创建vue实例
let vm = new Vue({
    template:'<div>hello world</div>'
});
// 3.加载需要渲染的整体html模板
let template = fs.readFileSync('./index.html','utf8');

// 4.创建渲染函数
let render = VueServerRenderer.createRenderer({
    template,
});

app.get("/",(req,res)=>{
    // 潜藏bug: render.renderToString默认返回promise，但是采用promise写法，会导致问题：有时候，会不去加载部分js文件
    render.renderToString(vm,function(err,html){
        res.send(html);
    })
});

app.listen(3001,()=>{
    console.log("app listen at 3001");
});