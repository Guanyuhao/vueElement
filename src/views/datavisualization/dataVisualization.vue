<template>
    <div>
        <tree :data="tree" :node-text="name" layoutType="euclidean" ></tree>

    </div>
</template>
<script>
import {tree} from 'vued3tree'

export default {
  components: {
    tree
  },
  data() {
    return {
      tree: {
        name: "father",
        children:[{
          name: "son1",
          children:[ {name: "grandson",children:[ {name: "grandson"}, {name: "grandson2"}]}, {name: "grandson2"}
          ]
        },{
          name: "son2",
          children:[ {name: "grandson3"}, {name: "grandson4"}]
        }]
      }
    }
  }
}
</script>

