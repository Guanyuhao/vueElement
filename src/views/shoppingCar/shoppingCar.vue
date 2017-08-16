<template>

    <div class="shoppingCar">
        <good-list ></good-list>
        <car ></car>
    </div>

</template>

<script>
import Car from './Car'
import goodList from './goodList'
export default {
    components:{
        Car,goodList
    },
    name: 'shoppingCar',
    data: function() {	
        return {}
    },
    methods: {
        mappingHandel:function(index){
                console.log(index)
        }
    }
}
</script>

<style scoped>

</style>