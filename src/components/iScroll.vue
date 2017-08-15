<template>
  <div id="app">
    <vue-super-scroller :load-disabled="!hasNext" :on-refresh="refresh" :on-load='loadMore'>
      <li v-for="(item,index) in lists">{{item}}</li>
    </vue-super-scroller>
  </div>
</template>
 
<script>
  export default {
    name: 'iscroll',
    components: {},
    data () {
      return {
        lists: [1, 2, 3],
        hasNext: true
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.loadMore()
      })
    },
    methods: {
      getRandArr (num = 20) {
        let arr = []
        for (let i = num - 1; i >= 0; i--) {
          arr.push(Math.round(Math.random() * 100))
        }
        return arr
      },
 
      refresh (call) {
        setTimeout(() => {
          this.lists = [1, 2, 3,4,5,7,8,9,10]
          call(true)
        }, 1000)
      },
 
      loadMore () {
        setTimeout(() => {
          this.lists = this.lists.concat(this.getRandArr(20))
          if (this.lists.length > 50) {
            this.hasNext = false
          }
        }, 1000)
      }
    }
  }
</script>
 
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
 
  li {
    height: 150px;
    text-align: center;
    line-height: 150px;
    font-size: 30px;
  }
 
  li:nth-child(odd) {
    background-color: #eee
  }
</style>