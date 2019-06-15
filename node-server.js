let express = require("express");
let app = express();
let Vue = require("vue");
let fs = require("fs");
let path = require("path");
let VueServerRenderer = require("vue-server-renderer");
let serverBundle = fs.readFileSync("./dist/server.bundle.js", "utf8");
let template = fs.readFileSync("./dist/index.ssr.html", "utf8");

let vm = new Vue({
    template: '<div>hello world</div>'
});

let render = VueServerRenderer.createBundleRenderer(serverBundle, {
    template, // ssr文件
});

// ?????  渲染不出来
app.get("/", (req, res) => {
    // 把渲染成功的字符串, 扔给客户端。 只是返回一个字符串，并没有实际vue功能

    let context = {
        url: req.url,
    };

    render.renderToString(context, function (err, html) {
        // console.log(err,html)
        // console.log(html)
        res.send(2)
        // res.send(html);
    });
});

app.use(express.static(path.resolve(__dirname, "dist")));

app.get("*", (req, res) => {
    let context = {
        url: req.url,
    };

    render.renderToString(context, function (err, html) {
        res.send(html);
    });
});

app.listen(4001, () => {
    console.log("serve at port 4001");
})