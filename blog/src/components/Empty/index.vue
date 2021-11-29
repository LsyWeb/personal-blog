<template>
    <div class="empty-container">
        <Icon type="empty" />
        <p class="content">
            {{text}}
        </p>
    </div>
</template>

<script>
import Icon from '../Icon'
export default {
    props:{
        text:{
            type:String,
            default:'无数据'
        }
    },
    components:{
        Icon
    }
}
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
    .empty-container{
        .self-center(absolute);
        color: @gray;
        text-align: center;
    }
    .iconfont{
        font-size: 72px;
    }
</style>
