<template>
  <div>
    <h1>Pager组件</h1>
    <Pager :current="current" :total="40" @pageChange="handlePageChange"/>
  </div>
</template>

<script>
import Pager from './index'

export default {
  components:{
    Pager
  },
  data(){
    return {
      current:1,

    }
  },
  methods:{
    handlePageChange(newPage){
      console.log('页码改变了',newPage)
      this.current = newPage;
    }
  }
};
</script>

<style scoped>


</style>