<template>
  <div>
      <h2>Icon组件</h2>
      <Icon v-for="(item,i) in types" :key="i" :type="item"/>
  </div>
</template>

<script>
import Icon, {types} from './index'


export default {
    components:{
        Icon
    },
    data(){
        return{
            types
        }
    }
}
</script>

<style>
    .iconfont{
        display: inline-block;
        font-size: 40px;
    }
</style>