<template>
    <div>
        <bar></bar>
        <foo></foo>
    </div>
</template>

<script>
import Bar from './components/Bar.vue';
import Foo from './components/Foo.vue';
export default {
    name:"App",
    components:{
        Bar,
        Foo,
    }
}
</script>
