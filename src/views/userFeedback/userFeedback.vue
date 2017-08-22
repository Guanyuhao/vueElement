<template>

    <div class="userfeedback">
        <u-editor></u-editor>
    </div>

</template>

<script>
import uEditor from './vueUeditor'
console.log(uEditor)
export default {
    components:{
        uEditor
    },
    name: 'userFeedback',
    data: function() {	
        return {}
    },
    methods: {}
}
</script>

<style scoped>

</style>