import createApp from "./app";
import { resolve } from "dns";

// let {app} = createApp();

// app.$mount("#app");

export default (context) => {
    return new Promise((resolve, reject) => {
        let { app, router, store } = createApp();

        router.push(context.url);// 跳转到路由
        // 如果服务端启动时，直接访问/foo,返回的页面永远都是 index.html, 需要通过路由，跳转到指定路径

        // 为了防止路由中的异步逻辑, 所以采用promise形式。等到路由全部加载完成后，返回vue实例，服务端才可以渲染出完整的页面。

        // 1. 需要将当前组件中匹配到的组件(存在匹配到多个组件的情况)，找到它对应的asyncData方法，让它执行
        router.onReady(() => {
            let matchComponents = router.getMatchedComponents();
            // 服务端一旦调用，将会渲染路径匹配到的页面，并执行对应asyncData
            Promise.all(matchComponents.map(com => {
                if (matchComponents.asyncData) {
                    // nuxt
                    return matchComponents.asyncData({
                        store,
                    });
                };
            })).then(() => {
                // 把vuex中的状态，挂载在上下文中的state里
                context.state = store.state;
                console.log("状态", store)
                context.meta = app.$meta();
                resolve(app);
            });

            resolve(app);
        });
    });
}

// 服务端每次调用该函数，将会产生一个新的app实例