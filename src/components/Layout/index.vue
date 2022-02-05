<template>
  <div class="layout-container">
      <div class="left hidden-xs-only">
        <slot  name="left"></slot>
      </div>
      <div class="main hidden-xs-only">
          <slot name="main"></slot>
      </div>
      <div class="main phone hidden-sm-and-up">
          <slot name="main"></slot>
      </div>
      <div class="right hidden-xs-only">
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layout-container{
    width: 100%;
    height: 100%;
    display: flex;
    .left,.right{
        flex: 0 0 auto;
        overflow: hidden;
    }
    .main{
        flex: 1 1 auto;
        overflow: hidden;
        &.phone{
            height: calc(100% - 60px);
        }
    }
   
}
</style>