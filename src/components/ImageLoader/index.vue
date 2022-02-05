<template>
<div class="image-loader-container">
  <img
    class="placeholder"
    :src="placeholder"
    v-if="!show"
  />
  <img class="origin" :src="src" @load="load" :style="{opacity:originOpacity,transition:`${durction}ms`}">
</div>
  
</template>

<script>
export default {
  data() {
    return {
      originLoaded: false,//原图是否加载完毕
      show: false,//是否所有都完成了
    };
  },
  props: {
    // 原始图片的路径
    src: {
      type: String,
      required: true,
    },
    // 原始图片加载完成前的占位图片
    placeholder: {
      type: String,
      required: true,
    },
    // 原始图片加载完成后，切换到原始图经过的毫秒数
    durction: {
      type: Number,
      required: false,
      default: 500,
    },
  },
  computed:{
    originOpacity(){
      return this.originLoaded ? 1: 0;
    }
  },
  methods: {
    load() {
      this.originLoaded = true;
      setTimeout(() => {
        this.show = true;
        this.$emit('load')
      }, this.durction);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img{
    .self-fill();
    object-fit: cover;
  }
  .placeholder{
    filter: blur(2vw);
  }
  .origin{
    opacity: 0;
  }
}
</style>