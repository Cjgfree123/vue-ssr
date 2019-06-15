import createApp from "./app";

let {app} = createApp();

app.$mount("#app");

export default (context)=>{
    let { app,router } = createApp();
    router.push(context.url);

    // 如果服务端启动时，直接访问/foo,返回的页面永远都是 index.html
    // 需要通过路由，跳转到指定路径
    return app;
}

// 服务端每次调用该函数，将会产生一个新的app实例