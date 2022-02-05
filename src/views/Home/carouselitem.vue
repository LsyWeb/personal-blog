<template>
  <div class="carousel-item-container" 
    ref="container" 
    @mousemove="handleMove"
    @mouseleave="handleLeave"  
  >
    <div class="carousel-img" ref="image" :style=" imgPosition ">
      <ImageLoader
        @load="showWords"
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
      />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="des" ref="des">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: ["carousel"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWidth: 0, //title文字的宽度
      desWidth: 0, //des文字的宽度
      containerSize: null, //外层容器的尺寸
      imgSize: null, //图片的尺寸
      mouseX: 0, //鼠标的X坐标
      mouseY: 0, //鼠标的Y坐标
    };
  },
  computed: {
    imgPosition() {
      // 计算图片的位置
      if (!this.imgSize || !this.containerSize) {
        return;
      }
      const extraWidth = this.containerSize.width - this.imgSize.width; //多出的宽度
      const extraHeight = this.containerSize.height - this.imgSize.height; //多出的高度
      const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      const top = (-extraHeight / this.containerSize.height) * this.mouseY;
      return { transform: `translate(${-left}px,${-top}px)` };
    },
    center(){
      return {
        x:this.containerSize.width / 2,
        y:this.containerSize.height / 2
      }
    }
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.desWidth = this.$refs.des.clientWidth;
    this.setSize();
    // 把鼠标位置设置为 中心点
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener("resize", this.setSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },
  methods: {
    showWords() {
      // title的动画效果显示
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      //让浏览器强行渲染
      this.$refs.title.clientWidth;

      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth + "px";

      // des的动画效果显示
      this.$refs.des.style.opacity = 1;
      this.$refs.des.style.width = 0;
      //让浏览器强行渲染
      this.$refs.des.clientWidth;

      this.$refs.des.style.transition = "2s 1s";
      this.$refs.des.style.width = this.desWidth + "px";
    },
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      },
        this.imgSize = {
          width: this.$refs.image.clientWidth,
          height: this.$refs.image.clientHeight,
        };
    },
    handleMove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
      
    },
    handleLeave(){
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.carousel-item-container {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  overflow: hidden;
  // // 测试
  // width: 50%;
  // height: 40%;
  // margin: 0 auto;
  // border: 5px solid teal;
  // z-index: 222;
  .carousel-img {
    width: 110%;
    height: 110%;
    transition: 0.2s;
  }
  .title,
  .des {
    letter-spacing: 3px;
    position: absolute;
    left: 30px;
    color: #fff;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5),
      -1px 0 0 rgba(0, 0, 0, 0.5), 0 1px 0 rgba(0, 0, 0, 0.5);
    white-space: nowrap;
    overflow: hidden;
    opacity: 0;
  }
  .title {
    top: calc(50% - 20px);
    font-size: 2rem;
  }
  .des {
    top: calc(50% + 30px);
    font-size: 1.2rem;
  }
}
</style>