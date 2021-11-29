<template>
<div class="test">
<Layout>
      <template v-slot:left>
          <div class="left">左边区域</div>
      </template>
      <template v-slot:main>
          <div class="main">中间区域</div>
      </template>
      <template v-slot:right>
          <div class="right">右边区域</div>
      </template>
  </Layout>
</div>
  
</template>

<script>
import Layout from './index'
export default {
    components:{
        Layout
    }
}
</script>

<style lang="less" scoped>
.test{
    width: 80%;
    height: 1000px;
    margin: 0 auto;
    border: 2px solid #000;
    .left{
        width: 250px;
        height: 100%;
        background: red;
    }
    .main{
        width: 100%;
        height: 100%;
        background: blue;
    }
    .right{
        width: 150px;
        height: 100%;
        background: teal;
    }
}
</style>