<template>
    <div class="processingCen">
        <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%">
            <el-table-column
            type="index"
            width="50">
            </el-table-column>
            <el-table-column
            property="date"
            label="日期"
            width="120">
            </el-table-column>
            <el-table-column
            property="name"
            label="姓名"
            width="120">
            </el-table-column>
            <el-table-column
            property="address"
            label="地址">
            </el-table-column>
        </el-table>
        <div class="block">
            <span class="demonstration"></span>
            <el-pagination
                layout="prev, pager, next"
                :total="50"
                 @current-change="pagehandle">
            </el-pagination>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <rect x="50" y="20" width="150" height="150"
  style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;
  stroke-opacity:0.9"/>
</svg>
    </div>
    
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
        ],
        currentRow: null
      }
    },

    methods: {
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      pagehandle(val) {
        console.log(`当前页: ${val}`);
        let _this = this;
        let Timer = setTimeout(function() {

          _this.tableData = [
            
            {
              date: '2016-05-02',
              name: `当前页${val}`,
              address: '上海市普陀区金沙江路 1518 弄'
            }
        ]

        }, 0);
        
      }
    }
  }
</script>