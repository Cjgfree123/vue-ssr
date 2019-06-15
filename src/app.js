import Vue from "vue";
import App from "./App.vue";

// 为了兼容服务端，要把Vue({})构造函数，改造成函数形式

// 创建Vue实例的函数
export default () => {
    let app = new Vue({
        render:(h) => h(App),
    });
    return {app};
}