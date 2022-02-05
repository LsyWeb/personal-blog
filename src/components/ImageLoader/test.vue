<template>
  <div class="test">
      <ImageLoader src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
       placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100" 
       />
  </div>
</template>

<script>
import ImageLoader from './index';
export default {
    components:{
        ImageLoader
    }
}
</script>

<style scoped>
    .test{
        width: 500px;
        height: 500px;
        position: relative;
    }
</style>