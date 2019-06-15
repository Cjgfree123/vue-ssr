<template>
    <div @click="show" class="red">
        bar com
    </div>
</template>  

<script>
export default {
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