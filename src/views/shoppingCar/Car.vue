<template>
        <div class="car">
            <el-table
                :data="tableData6"
                border
                show-summary
                style="width: 100%; margin-top: 20px">
                <el-table-column
                prop="id"
                label="ID"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="商品名称">
                </el-table-column>
                <el-table-column
                prop="amount1"
                label="价格（元）">
                </el-table-column>
                <el-table-column
                prop="amount3"
                label="数量（个）">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                   
                    </template>
                </el-table-column>
            </el-table>
        </div>
</template>

<script>
export default {
    name: 'car',
    data: function() {	
        return {
        tableData6: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount3: 10
        }]
      }   
    },
    created(){
        this.$eventBus.$on('mappingCar',function(index){console.log(index)})
    },
    methods: {
        getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
      handleDelete(index,row){
            this.tableData6.splice(index,1)
      },
      handleEdit(index,row){

      }
    }
}
</script>

<style scoped>

</style>   