<template>
    <div @click="show" class="red">
        bar com
        {{$store.state.name}}
    </div>
</template>  

<script>
export default {
    // 因为代码都是异步，所以全部采用promise
    // 异步数据 这个方法仅仅在服务端执行,客户端运行是不会执行的
    // 规定只有，页面的级别的组件才能使用
    asyncData(){
        return this.$store.dispatch("SET_NAME");
    },
    mounted(){
        this.$store.dispatch("SET_NAME");
    },
    name:"Bar",
    methods:{
        show(){
            alert(1);
        }
    },
}
</script>

<style scoped>
    .red{
        background: red;
    }
</style>