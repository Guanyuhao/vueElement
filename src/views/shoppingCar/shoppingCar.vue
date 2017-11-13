<template>

    <div class="shoppingCar">
         <header>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <h1>{{title}}</h1>
                    </div>
                    </el-col>
            </el-row>
        </header>
        <section>
            <good-list :callback="changeTitle"></good-list>
            <car></car>
        </section>
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
        return {
            title:'1',
            changeTitle:function(me){
                console.log(me.title++)
            }
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>

  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    text-align: center;
    min-height: 100px;
    line-height: 100px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>