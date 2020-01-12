<template>
    <div @click="show">
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
</style>