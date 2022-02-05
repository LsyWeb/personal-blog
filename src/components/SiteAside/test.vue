<template>
<div class="test">
  <SiteAside />
</div>
  
</template>

<script>
import SiteAside from './index';
import '@/styles/global.less';
export default {
    components:{
        SiteAside
    }
}
</script>

<style>
.test{
  width: 250px;
  height: 100vh;
}
</style>