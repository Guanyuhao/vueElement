<template>
    <div class="search-big-course">
        
        <section>

            <div class="search">
                <el-input placeholder="code" >
                    <el-button slot="append" icon="search"></el-button>
                </el-input>
            </div>
            <div class="filterFul">
                
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'searchBigCourse',
    data: function() {	
        return {}
    },
    methods: {}
}
</script>

<style  lang='scss' scoped>
    .search-big-course{
       section{
           .search{
               
               width:30%;
           }
           .filterFul{
               margin-top: 20px;
               border: 1px solid #ccc;
               max-width: 800px;
               min-height: 100px; 
           }
       }
    }
</style>