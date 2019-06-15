import createApp from "./app";

let {app} = createApp();

app.$mount("#app");

export default ()=>{

}

// 服务端每次调用该函数，将会产生一个新的app实例