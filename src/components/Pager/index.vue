<template>

  <div class="page-container" v-if="pageNumber > 1">
      <a  @click="handleClick(1)" :class="{disabled : current == 1}">|&lt;&lt;</a>
      <a  @click="handleClick(current - 1)" :class="{disabled : current == 1}">&lt;&lt;</a>
      <a  @click="handleClick(n)"
        v-for="(n,i) in numbers"
        :key="i" 
        :class="{active: n == current}">
        {{n}}</a>
      <a  @click="handleClick(current + 1)" :class="{disabled : current == pageNumber}">&gt;&gt;</a>
      <a  @click="handleClick(pageNumber)" :class="{disabled : current == pageNumber}">&gt;&gt;|</a>
  </div>
</template>

<script>
export default {
    props:{
        current:{//当前页数
            type:Number,
            default:1
        },
        total:{//全部数据
            type:Number,
            default:100
        },
        limit:{//每页的数据量
            type:Number,
            default:10
        },
        visibleNumber:{
            type:Number,
            default:10
        }
    },
    computed:{
        // 总页数
        pageNumber(){
            return Math.ceil( this.total / this.limit );
        },
        // 得到显示的最小数字
        pageMin(){
            let min = this.current - Math.floor(this.visibleNumber / 2);
            if (min < 1){
                min = 1;
            }
            return min;
        },
        pageMax(){
            let max = this.pageMin + (this.visibleNumber - 1);
            if(max > this.pageNumber){
                max = this.pageNumber;
            }
            return max;
        },
        // 显示的数组列表
        numbers(){
            let nums = [];
            for(let i = this.pageMin; i <= this.pageMax; i++){
                nums.push(i);
            }
            return nums;
        }
    },
    methods:{
        handleClick(newPage){
            if(newPage <= 1){
                newPage = 1;
            }
            if(newPage >= this.pageNumber){
                newPage = this.pageNumber
            }
            if(newPage == this.current){
                return
            }
            // 抛出一个事件
            this.$emit('pageChange',newPage);
        }
    }
}
</script>

<style lang='less' scoped>
@import '~@/styles/var.less';
.page-container{
    display: flex;
    justify-content: center;
    margin: 20px 0;
    a{
        margin: 0 6px;
        color: @primary;
        cursor: pointer;
        &.disabled{
            color: @lightWords;
        }
        &.active{
            color: @words;
            font-weight: bold;
        }
    }
}
</style>

