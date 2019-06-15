import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default ()=>{
    let router = new VueRouter({
        mode:"history",
        routes:[
            {
                path:"/",
                component:()=>import("./components/Bar.vue"),
            },
            {
                path:"/foo",
                component: ()=>import("./components/Foo.vue")
            }
        ]
    });
    return router;
};