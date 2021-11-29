<template>
  <div class="test">
      <Contact />
  </div>
</template>

<script>
import Contact from './index';
import '@/styles/global.less';
export default {
    components:{
        Contact
    }
}
</script>

<style>
.test{
    width: 300px;
    background: #333;
}
</style>