<template>
  <div class="home-container" 
    ref="container"
    @wheel="handleWheel"
    v-loading="loading"  
  >
    <ul class="carousel-container" 
      :style="{ marginTop }" 
      @transitionend="handleTransitionEnd"  
    >
      <li v-for="item in data" :key="item.id">
        <Carouselitem :carousel="item"/>
      </li>
    </ul>
    <div class="icon icon-up" @click="switchTo(index - 1)" v-show="index >= 1">
      <Icon type="arrowUp" />
    </div>
    <div
      class="icon icon-down"
      @click="switchTo(index + 1)"
      v-show="index < data.length - 1"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        @click="switchTo(i)"
        :class="{ active: i === index }"
        v-for="(item, i) in data"
        :key="item.id"
      ></li>
    </ul>
  </div>
</template>

<script>

import Icon from "@/components/Icon";
import Carouselitem from "./carouselitem";
import {mapState} from 'vuex';
export default {
  components: {
    Icon,
    Carouselitem,
  },
  data() {
    return {
      index: 0, //显示的图片的索引
      containerHeight: 0, //容器的高度
      switchWheel: false, //是否正在进行滚动
    };
  },
  created () {
    this.$store.dispatch('banner/fetchBanner');
  },
  mounted() {//渲染完成
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener('resize',this.handleResize);
  },
  destroyed(){//组件被销毁了    销毁监听事件
    window.removeEventListener('resize',this.handleResize);
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState('banner',['data','loading'])
  },
  
  methods: {
    switchTo(i) {
      this.index = i;
    },
    handleWheel(e) {
      // 鼠标滚轮滚动事件处理函数
      
      if (this.switchWheel) {
        return;
      }
      if (e.deltaY < -366 && this.index > 0) {
        this.switchWheel = true;
        this.index--;
      }
      if (e.deltaY > 366 && this.index < this.data.length - 1) {
        this.switchWheel = true;
        this.index++;
      }
    },
    handleTransitionEnd(){
      // 过渡结束后要把 this.switchWheel 设为 false 以便后面再次鼠标滚轮滚动
      this.switchWheel = false;
    },
    handleResize(){
      this.containerHeight = this.$refs.container.clientHeight;
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";

.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .carousel-container {
    width: 100%;
    height: 100%;
    transition: 0.5s;
    li {
      width: 100%;
      height: 100%;
    }
  }
  @iconHeight: 20px;
  .icon {
    .self-center();
    transform: translate(-50%);
    color: @gray;
    padding: 10px;
    .iconfont {
      font-size: 30px;
    }
    cursor: pointer;
    &.icon-up {
      top: @iconHeight;
      animation: jumpUp 2s infinite;
    }
    &.icon-down {
      top: auto;
      bottom: 20px;
      animation: jumpDown 2s infinite;
    }
  }
  .indicator {
    .self-center();
    transform: translateY(-50%);
    left: auto;
    right: 20px;
    li {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: @words;
      cursor: pointer;
      // border: 1px solid #fff;
      margin-bottom: 10px;
      box-sizing: border-box;
      transition: 0.5s;
      &.active {
        background: #fff;
      }
    }
  }
  @jump: 5px;
  @keyframes jumpUp {
    0% {
      transform: translate(-50%, @jump);
    }
    50% {
      transform: translate(-50%, -@jump);
    }
    100% {
      transform: translate(-50%, @jump);
    }
  }
  @keyframes jumpDown {
    0% {
      transform: translate(-50%, -@jump);
    }
    50% {
      transform: translate(-50%, @jump);
    }
    100% {
      transform: translate(-50%, -@jump);
    }
  }
}
</style>