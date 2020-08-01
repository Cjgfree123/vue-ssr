import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex);

export default  ()=>{
    let store = new Vuex.Store({
        state:{
            user:"chen",
        },
        mutations:{
            SET_NAME(state){
                state.user = "jin";
            },
        },
        actions:{
            SET_NAME(){
                // 模拟获取数据
                return new Promise((resolve,rejrct)=>{
                    setTimeout(()=>{
                        // 会自动在window上挂载属性 _INITIAL_STATE_
                        commit("SET_NAME");
                        resolve();
                    },1000);
                });
            }
        }
    });

    // 判断是客户端,就允许操作store
    if(typeof window!== 'undefined' && window.__INITIAL_STATE__){
        store.replaceState(window.__INITIAL_STATE__);
    }
}