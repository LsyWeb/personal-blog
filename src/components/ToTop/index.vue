<template>
  <div @click="handleClick" v-show="show" class="to-top-container">
      TOP
  </div>
</template>

<script>
export default {
    data(){
        return {
            show:false
        }
    },
    created(){
        this.$bus.$on('mainScroll',this.handleScroll);
    },
    destroyed(){
        this.$bus.$off('mainScroll',this.handleScroll);
    },
    methods:{
        handleScroll(dom){
            if(!dom){
                this.show = false;
                return;
            }
            this.show = dom.scrollTop >= 500;
        },
        handleClick(){
            this.$bus.$emit('scrollToTop',0);
            // 事件总线：让可以滚动的元素，都可以注册这个事件
        }
    }
}
</script>

<style lang='less' scopend>
@import "~@/styles/var.less";
.to-top-container{
    width: 50px;
    height: 50px;
    background: @primary;
    position: fixed;
    bottom: 50px;
    right: 50px;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
}
</style>